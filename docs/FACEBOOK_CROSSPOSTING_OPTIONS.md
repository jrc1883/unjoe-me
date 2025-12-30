# Facebook Cross-Posting Options for unjoe.me

## Overview
This document explores options for cross-posting blog content from unjoe.me to the AutoJoe Facebook page (https://www.facebook.com/profile.php?id=61575191910525).

## Option 1: Manual Share Button (Simplest)

Add a "Share to Facebook" button on each blog post that pre-fills a Facebook post with the blog content.

### Implementation
Add social share buttons to `src/layouts/BlogPost.astro`:

```astro
<!-- After the article content, before </div> closing tag -->
<div class="share-buttons">
  <h3>Share this article</h3>
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://unjoe.me' + Astro.url.pathname)}`}
    target="_blank"
    rel="noopener noreferrer"
    class="share-button facebook"
  >
    Share on Facebook
  </a>
  <a
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://unjoe.me' + Astro.url.pathname)}&text=${encodeURIComponent(title)}`}
    target="_blank"
    rel="noopener noreferrer"
    class="share-button twitter"
  >
    Share on X
  </a>
  <a
    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://unjoe.me' + Astro.url.pathname)}`}
    target="_blank"
    rel="noopener noreferrer"
    class="share-button linkedin"
  >
    Share on LinkedIn
  </a>
</div>
```

**Pros**:
- Simple, no API required
- Works immediately
- User has full control over what gets posted

**Cons**:
- Manual process each time
- Limited customization of Facebook post
- No automation

---

## Option 2: Facebook Graph API - Automated Posting

Use Facebook's Graph API to automatically post to the AutoJoe page when a new blog post is published.

### Requirements
1. Facebook Page Access Token (from Facebook Developer Portal)
2. Page ID for AutoJoe
3. Webhook or GitHub Action to trigger on new blog posts

### Implementation Steps

#### 1. Get Facebook Access Token
```bash
# Go to: https://developers.facebook.com/tools/explorer/
# Select your AutoJoe page
# Grant permissions: pages_manage_posts, pages_read_engagement
# Generate Page Access Token
# Convert to long-lived token (60 days)
```

#### 2. Create GitHub Action
`.github/workflows/facebook-post.yml`:
```yaml
name: Post to Facebook

on:
  push:
    branches: [main]
    paths:
      - 'src/content/blog/*.md'

jobs:
  post-to-facebook:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Detect new blog post
        id: detect
        run: |
          # Logic to detect new/updated blog posts
          # Extract title, description, URL

      - name: Post to Facebook
        env:
          FB_PAGE_ID: ${{ secrets.FB_PAGE_ID }}
          FB_ACCESS_TOKEN: ${{ secrets.FB_ACCESS_TOKEN }}
        run: |
          curl -X POST "https://graph.facebook.com/v18.0/${FB_PAGE_ID}/feed" \
            -F "message=New blog post: $TITLE - $DESCRIPTION" \
            -F "link=$POST_URL" \
            -F "access_token=${FB_ACCESS_TOKEN}"
```

**Pros**:
- Fully automated
- Posts immediately when blog goes live
- Can customize post format

**Cons**:
- Requires Facebook Developer setup
- Access tokens expire (60 days for long-lived)
- More complex setup

---

## Option 3: Claude Code Script - AI-Powered Formatting

Create a Claude Code script that formats blog posts for Facebook, including generating meta prompts for images (as you mentioned).

### Concept
Based on your mention of "project documentation that would create meta prompts for image generation and format really nicely":

```typescript
// scripts/format-for-facebook.ts

interface BlogPost {
  title: string;
  description: string;
  content: string;
  url: string;
}

async function formatForFacebook(post: BlogPost) {
  // 1. Generate Facebook post text
  const fbPost = `
📝 New on unjoe.me:

${post.title}

${post.description}

Read more: ${post.url}

#${generateHashtags(post)}
  `.trim();

  // 2. Generate image meta prompt for AI image generation
  const imagePrompt = generateImagePrompt(post);

  // 3. Return formatted output
  return {
    postText: fbPost,
    imagePrompt: imagePrompt,
    suggestedPostTime: getBestPostTime(),
  };
}

function generateImagePrompt(post: BlogPost): string {
  // AI-powered analysis of post content to create image generation prompt
  // Could use Claude API to analyze post and suggest visual themes
  return `
    Professional blog header image for article titled "${post.title}"
    Style: Dark theme, minimalist, tech-focused
    Elements: [AI analyzes content and suggests visual elements]
    Mood: [Based on article tone]
    Aspect ratio: 1200x630 (Facebook optimal)
  `.trim();
}

function generateHashtags(post: BlogPost): string[] {
  // Extract key themes from post
  // Return relevant hashtags
}
```

**Usage**:
```bash
# Run script after publishing
pnpm format-facebook --post "when-compassion-becomes-a-weapon"

# Output:
# ✓ Facebook post text copied to clipboard
# ✓ Image prompt saved to clipboard
# ✓ Ready to paste into Facebook!
```

**Pros**:
- Leverages AI for better formatting
- Can generate image prompts for Midjourney/DALL-E
- Flexible and customizable
- No API dependencies

**Cons**:
- Still requires manual posting to Facebook
- Need to run script each time

---

## Option 4: Zapier/Make.com Integration

Use no-code automation platforms to bridge RSS feed → Facebook.

### Setup
1. Add RSS feed to unjoe.me (already exists at `/rss.xml`)
2. Create Zapier workflow:
   - Trigger: New item in RSS feed
   - Action: Post to Facebook Page

**Pros**:
- No coding required
- Reliable automation
- Easy to modify

**Cons**:
- Monthly cost ($20-30/mo for Zapier)
- Less customization than custom script

---

## Recommendation

### For AutoJoe Page - Start with Option 1 + Option 3

**Phase 1 (Immediate)**:
- Add social share buttons to blog posts (Option 1)
- Gives you manual control for now

**Phase 2 (Next Session)**:
- Create Claude Code script for Facebook formatting (Option 3)
- Include image prompt generation based on post content
- Makes posting to Facebook quick and polished

**Phase 3 (Later - If Needed)**:
- Implement Facebook Graph API automation (Option 2)
- Only if posting frequently enough to justify automation

### Why This Approach?
1. **Quick win**: Share buttons work today
2. **AI-powered**: Leverages Claude for better Facebook formatting
3. **Flexible**: Can add automation later if posting volume increases
4. **Cost-effective**: No ongoing subscriptions

---

## Image Generation Integration

Based on your mention of image generation prompts, here's how that could work:

### Workflow
1. **Write blog post** → Publish to unjoe.me
2. **Run Claude script**:
   ```bash
   pnpm facebook-format --post "when-compassion-becomes-a-weapon"
   ```
3. **Script output**:
   ```
   === FACEBOOK POST ===
   📝 New on unjoe.me:

   When Compassion Becomes a Weapon

   How a Christmas story about refugees became rhetorical manipulation—
   and what gets sacrificed when emotion overrides truth.

   Read more: https://unjoe.me/blog/when-compassion-becomes-a-weapon/

   #Theology #Politics #CriticalThinking #Immigration

   === IMAGE GENERATION PROMPT ===
   Professional blog header for article about emotional manipulation in
   political rhetoric. Dark minimalist style. Visual metaphor: a heart
   shaped like a weapon or shield. Color palette: deep blues, subtle
   reds, black background. Text overlay: "When Compassion Becomes a Weapon".
   Clean typography, modern feel. 1200x630px for Facebook.

   === COPIED TO CLIPBOARD ===
   ✓ Post text ready to paste
   ✓ Image prompt ready for Midjourney/DALL-E
   ```
4. **Generate image** in Midjourney/DALL-E using prompt
5. **Post to Facebook** with generated image + formatted text

### Advanced: AI Analysis of Post Content
The script could use Claude API to:
- Analyze post tone and themes
- Suggest relevant hashtags
- Generate multiple image prompt variations
- Recommend best posting time based on content type
- Create thread versions for X/Twitter

---

## Next Steps

1. **Today**: Add social share buttons to BlogPost.astro
2. **This Week**: Create Facebook formatting script
3. **Document**: Add to CLAUDE.md as a skill/workflow
4. **Consider**: Facebook Graph API if posting daily

## Related Files
- `src/layouts/BlogPost.astro` - Add share buttons here
- `src/pages/rss.xml.js` - RSS feed (already exists)
- `.github/workflows/` - GitHub Actions (if automating)
- `scripts/` - Custom formatting scripts
