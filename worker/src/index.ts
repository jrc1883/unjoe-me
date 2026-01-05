/**
 * Cloudflare Worker for Event Creation Form
 *
 * This worker receives form submissions from /create-event and:
 * 1. Validates the event data
 * 2. Generates a markdown file
 * 3. Creates a GitHub branch
 * 4. Commits the file via GitHub API
 * 5. Creates a Pull Request
 * 6. Returns the PR URL to the user
 */

import { Octokit } from '@octokit/rest';

interface Env {
  GITHUB_TOKEN: string;
  EVENT_FORM_PASSWORD: string;
}

interface EventFormData {
  title: string;
  date: string;
  venue: string;
  location: string;
  address?: string;
  description?: string;
  ticketUrl?: string;
  ticketType?: string;
  featured: boolean;
  eventType: string;
  displayDate?: string;
  time?: string;
  customImage?: File;
}

/**
 * Generate a URL-friendly slug from text
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate markdown file content from event data
 */
function generateMarkdown(data: EventFormData): string {
  const frontmatter: string[] = [
    '---',
    `title: "${data.title}"`,
    `date: "${data.date}"`,
    `venue: "${data.venue}"`,
    `location: "${data.location}"`,
  ];

  if (data.address) {
    frontmatter.push(`address: "${data.address}"`);
  }

  if (data.description) {
    frontmatter.push(`description: "${data.description.replace(/"/g, '\\"')}"`);
  }

  if (data.ticketUrl) {
    frontmatter.push(`ticketUrl: "${data.ticketUrl}"`);
  }

  if (data.ticketType) {
    frontmatter.push(`ticketType: "${data.ticketType}"`);
  }

  frontmatter.push(`featured: ${data.featured}`);
  frontmatter.push(`eventType: "${data.eventType}"`);

  if (data.displayDate) {
    frontmatter.push(`displayDate: "${data.displayDate}"`);
  }

  if (data.time) {
    frontmatter.push(`time: "${data.time}"`);
  }

  frontmatter.push('---');
  frontmatter.push('');

  if (data.description) {
    frontmatter.push(data.description);
  } else {
    frontmatter.push('Details coming soon.');
  }

  return frontmatter.join('\n');
}

/**
 * Main worker handler
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle OPTIONS request for CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      // Parse form data
      const formData = await request.formData();

      // Extract and validate required fields
      const title = formData.get('title') as string;
      const date = formData.get('date') as string;
      const venue = formData.get('venue') as string;
      const location = formData.get('location') as string;

      if (!title || !date || !venue || !location) {
        return new Response('Missing required fields: title, date, venue, location', {
          status: 400,
          headers: corsHeaders,
        });
      }

      // Build event data object
      const eventData: EventFormData = {
        title,
        date,
        venue,
        location,
        address: formData.get('address') as string || undefined,
        description: formData.get('description') as string || undefined,
        ticketUrl: formData.get('ticketUrl') as string || undefined,
        ticketType: formData.get('ticketType') as string || undefined,
        featured: formData.get('featured') === 'on',
        eventType: formData.get('eventType') as string || 'upcoming',
        displayDate: formData.get('displayDate') as string || undefined,
        time: formData.get('time') as string || undefined,
        customImage: formData.get('customImage') as File || undefined,
      };

      // Generate markdown content
      const markdown = generateMarkdown(eventData);

      // Initialize Octokit with GitHub token
      const octokit = new Octokit({ auth: env.GITHUB_TOKEN });

      // GitHub repository configuration
      const owner = 'jrc1883';
      const repo = 'elshaddai';
      const baseBranch = 'main';

      // Generate branch and file names
      const datePrefix = eventData.date.split('T')[0]; // YYYY-MM-DD
      const venueSlug = slugify(eventData.venue);
      const branchName = `event/${datePrefix}-${venueSlug}`;

      const titleSlug = slugify(eventData.title);
      const fileName = `${titleSlug}.md`;
      const filePath = `apps/jack-portfolio/src/content/events/${fileName}`;

      // Get the SHA of the base branch
      const { data: refData } = await octokit.git.getRef({
        owner,
        repo,
        ref: `heads/${baseBranch}`,
      });

      const baseSha = refData.object.sha;

      // Create a new branch
      try {
        await octokit.git.createRef({
          owner,
          repo,
          ref: `refs/heads/${branchName}`,
          sha: baseSha,
        });
      } catch (error: any) {
        // Branch might already exist, that's okay
        if (!error.message?.includes('already exists')) {
          throw error;
        }
      }

      // Create/update the file in the new branch
      // First check if file already exists
      let existingFileSha: string | undefined;
      try {
        const { data: existingFile } = await octokit.repos.getContent({
          owner,
          repo,
          path: filePath,
          ref: branchName,
        });

        if ('sha' in existingFile) {
          existingFileSha = existingFile.sha;
        }
      } catch (error: any) {
        // File doesn't exist, which is expected for new events
        if (error.status !== 404) {
          throw error;
        }
      }

      // Commit the file
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: filePath,
        message: `feat: add event ${eventData.title}`,
        content: Buffer.from(markdown).toString('base64'),
        branch: branchName,
        ...(existingFileSha ? { sha: existingFileSha } : {}),
      });

      // Create Pull Request
      const { data: pr } = await octokit.pulls.create({
        owner,
        repo,
        title: `New Event: ${eventData.title}`,
        head: branchName,
        base: baseBranch,
        body: `## New Event Submission

**Event:** ${eventData.title}
**Date:** ${eventData.displayDate || eventData.date}
**Time:** ${eventData.time || 'TBD'}
**Venue:** ${eventData.venue}
**Location:** ${eventData.location}
${eventData.featured ? '\n⭐ **FEATURED EVENT**\n' : ''}

${eventData.description ? `### Description\n\n${eventData.description}\n\n` : ''}

---

🤖 Auto-generated from event creation form at /create-event

**Preview Deploy:** Cloudflare Pages will create a preview deploy automatically.

### Review Checklist
- [ ] Event details are accurate
- [ ] Date and time are correct
- [ ] Venue and location are properly formatted
- [ ] Description is appropriate
${eventData.ticketUrl ? '- [ ] Ticket URL works correctly' : ''}
${eventData.featured ? '- [ ] Featured event status is warranted' : ''}

### Next Steps
1. Review the changes in the Files Changed tab
2. Check the preview deploy (link will appear in comments)
3. Merge when ready to publish
`,
      });

      // Return success response with PR URL
      return new Response(
        JSON.stringify({
          success: true,
          pr_url: pr.html_url,
          pr_number: pr.number,
          branch: branchName,
          message: 'Event submitted successfully! Joseph will review and publish it.',
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error: any) {
      console.error('Error creating event:', error);

      return new Response(
        JSON.stringify({
          success: false,
          error: error.message || 'Unknown error occurred',
          details: error.toString(),
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }
  },
};
