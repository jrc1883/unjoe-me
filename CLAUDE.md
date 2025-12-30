# unjoe.me - Personal Portfolio & Blog

Personal website for Joseph Cannon built with Astro, deployed to Cloudflare Pages.

**Location in Monorepo:** `apps/unjoe-portfolio/`
**Parent Project:** ElShaddai Monorepo (`../../`)
**Workspace Package:** Uses `@elshaddai/portfolio-ui` shared UI components

## Monorepo Context

This project lives in the ElShaddai monorepo alongside 9 other applications. Key considerations:

- **Working Directory**: Always work from `apps/unjoe-portfolio/`
- **Shared Packages**: Can import from `@elshaddai/portfolio-ui` (configured in `astro.config.mjs`)
- **Dependencies**: Managed via pnpm workspace (install from monorepo root or app directory)
- **Documentation**: App-specific docs here, monorepo docs at `../../.workspace/`
- **Build Commands**: Run from app directory or use `pnpm --filter unjoe-portfolio <command>` from root

---

## Development Tool: PopKit

This project uses **PopKit** - Joseph's Claude Code plugin for development workflows. Always leverage PopKit commands when available:

- `/popkit:issue create` - Create issues with proper templates
- `/popkit:issue list` - View open issues
- `/popkit:dev work #N` - Start working on an issue
- `/popkit:git commit` - Commit with conventional format
- `/popkit:git pr` - Create pull requests
- `/popkit:assess all` - Run code quality assessments

**PopKit Bug Reports**: If PopKit commands fail or behave unexpectedly, create a bug report at `github.com/jrc1883/popkit` using proper issue format.

---

## Content Inbox Workflow

This project uses a **branch-based content inbox** for ideas generated from Claude Code Web (Research Preview) or Claude Android app.

### How It Works

1. **Claude Code Web/Android** creates a branch with a research document
   - These environments can only create branches (sandbox mode)
   - Documents land as markdown files (e.g., `INBOX_idea_name.md`)
   - Format: Research, blog ideas, feature concepts, etc.

2. **User** squash-merges the branch (or local Claude picks up the branch)

3. **Local Claude Code** processes the document:
   - Read the inbox document
   - Create a GitHub Issue using `/popkit:issue create`
   - Use appropriate template (feature, research, etc.)
   - Apply proper labels
   - Delete or archive the inbox document after issue creation

4. **Work on issues** from anywhere (local, web, Android)

### For Claude Code Web/Android (Research Preview)

**PRIMARY WORKFLOW: Create Blog Post Directly via PR**

When Joseph asks you to create a blog post (especially from voice-to-text on mobile):

1. **Create a new branch** named `content/<topic-slug>`
   - Example: `content/ai-agents-in-manufacturing`

2. **Create the blog post file** at `src/content/blog/<topic-slug>.md`
   - Use kebab-case for filename
   - Example: `src/content/blog/ai-agents-in-manufacturing.md`

3. **Write the blog post** with this exact frontmatter structure:
   ```markdown
   ---
   title: "Compelling Title That Promises Value"
   description: "1-2 sentence SEO-friendly description"
   pubDate: 2025-12-30
   ---

   ## Introduction

   Hook the reader with a compelling opening...

   ## Main Content

   Well-structured sections with clear headings...

   ## Conclusion

   Wrap up with key takeaways...
   ```

4. **Commit the file** with message: `feat: add blog post about <topic>`

5. **Open a Pull Request** to `main` branch:
   - Title: `New Blog Post: <Title>`
   - Description: Brief summary of the post content and why it's valuable

6. **Joseph will review the PR** on GitHub (mobile or desktop) and merge when ready

7. **Cloudflare auto-deploys** to unjoe.me after merge

**Content Guidelines for Blog Posts:**
- **Voice & Tone:** Professional but conversational, like Joseph talking to peers
- **Perspective:** First-person ("I built this", "In my experience")
- **Depth:** Provide actionable insights, not just surface-level observations
- **Length:** 600-1500 words (don't pad, but be thorough)
- **Structure:** Clear H2/H3 headings, bullets for lists, code blocks where relevant
- **SEO:** Descriptive title, good meta description, natural keyword usage

**FALLBACK WORKFLOW: Content Inbox (for ideas not ready for full post)**

If the content is rough notes or needs more development:

1. Create a new branch named `inbox/<topic-slug>`
2. Create a markdown file at repo root: `INBOX_<descriptive_name>.md`
3. Include in the document:
   - **Title**: Clear, actionable title
   - **Type**: blog-idea | feature | research | bug | improvement
   - **Summary**: 2-3 sentence overview
   - **Details**: Full research, notes, or content
   - **Suggested Labels**: Any relevant labels for the eventual issue

Example format:
```markdown
# INBOX: Blog Post About X

**Type:** blog-idea
**Suggested Labels:** content, blog

## Summary
Brief description of the blog post idea.

## Details
Full research, outline, key points, sources, etc.
```

Local Claude Code will process inbox items into issues or blog posts.

### For Local Claude Code

When you see an `INBOX_*.md` file in the repo root:

1. Read and understand the content
2. Create a GitHub Issue: `/popkit:issue create "<title>" --template <type>`
3. Ensure PopKit Guidance section is filled appropriately
4. Once issue is created, delete the inbox file
5. Commit: `chore: process inbox item into issue #N`

---

## Content Generation from Claude Discussions

### Using Claude Code Desktop Discussions

When Joseph has a discussion in Claude Code Desktop that contains valuable content for blog posts:

**Option 1: Direct Content Extraction**
1. **Export Discussion**: Ask user to copy/paste relevant discussion content
2. **Create Draft Post**:
   - Create new file: `src/content/blog/draft-<topic-slug>.md`
   - Add frontmatter with `draft: true` (if content collections support drafts)
   - Extract key insights, structure them into sections
   - Rewrite in blog post voice (more polished, less conversational)
3. **Refine & Polish**:
   - Add introduction that hooks the reader
   - Organize content with clear headings
   - Add examples, code snippets, or diagrams
   - Write a conclusion with takeaways
4. **Review Cycle**:
   - Run `/popkit:assess all` to check quality
   - Ask user for feedback on structure/tone
   - Iterate until ready to publish
5. **Publish**:
   - Remove `draft: true` from frontmatter
   - Set `pubDate` to today's date
   - Commit with `/popkit:git commit`

**Option 2: Issue-Based Workflow**
1. **Create Blog Idea Issue**:
   - Use `/popkit:issue create "Blog: <title>" --template blog-idea`
   - In issue description:
     - **Source**: "Discussion in Claude Code Desktop"
     - **Key Points**: Bullet list of main discussion insights
     - **Target Audience**: Who would benefit from this?
     - **Outline**: Proposed structure/sections
2. **Work on Issue**:
   - Use `/popkit:dev work #<issue-number>`
   - Create the blog post file
   - Write the content
   - Close issue when published

**Option 3: Content Inbox (for Web/Android)**
- If discussion happens in Claude Web/Android, follow Content Inbox Workflow above
- Create `INBOX_blog_<topic>.md` on a branch
- Local Claude processes into issue or direct blog post

### Blog Post Content Template

```markdown
---
title: "Compelling Title That Promises Value"
description: "1-2 sentence hook that makes reader want to click"
pubDate: 2025-12-30
heroImage: "/images/blog/<slug>.jpg"  # optional
tags: ["engineering", "ai", "leadership"]  # optional, if supported
---

## Introduction

Hook the reader with a problem, question, or compelling statement.

## Main Content

Organized into clear sections with H2/H3 headings.

### Code Examples (if applicable)

\`\`\`typescript
// Well-commented code examples
const example = "that demonstrate the concept";
\`\`\`

## Key Takeaways

- Bullet point summary
- Actionable insights
- What reader should remember

## Conclusion

Tie it together, reinforce value, call to action (if appropriate).
```

### Content Quality Checklist

Before publishing any blog post:
- [ ] **Clear Value**: Does this teach something or solve a problem?
- [ ] **Original Perspective**: What unique insight does Joseph bring?
- [ ] **Well-Structured**: Clear flow from intro → content → conclusion
- [ ] **Scannable**: Good use of headings, bullets, code blocks
- [ ] **Proofread**: No typos, good grammar, conversational but professional tone
- [ ] **SEO-Friendly**: Descriptive title, meta description, proper headings
- [ ] **Links Work**: All external links tested
- [ ] **Images Optimized**: If using images, properly sized and credited

### Content Ideas Sources

Track content ideas from:
1. **Discussions in Claude Code Desktop** (primary source for this workflow)
2. **Work experiences** at Mars Inc., Navy, etc.
3. **Technical explorations** with PopKit, OPTIMUS, Genesis, etc.
4. **Leadership lessons** from engineering management
5. **AI/automation insights** from building multi-agent systems
6. **Industry trends** Joseph observes and has opinions on

When an idea surfaces in discussion:
- **Quick Capture**: Note it in an issue immediately
- **Expand Later**: Don't interrupt current work, come back to flesh it out
- **Batch Content Creation**: Dedicate time blocks for writing multiple posts

---

## Project Overview

A modern, dark-themed portfolio website inspired by maximelbv.com featuring:
- Hero section with personal introduction
- Projects/portfolio showcase
- Blog/articles section (markdown-based)
- About page with career highlights

## Tech Stack

- **Framework**: Astro 5.x (static site generator)
- **Styling**: Tailwind CSS 4.x
- **Deployment**: Cloudflare Pages
- **Content**: Markdown/MDX for blog posts

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Cloudflare Pages (via git push)
git push origin main
```

## Project Structure

```
# Located at: apps/unjoe-portfolio/
src/
├── components/     # Reusable Astro components
├── content/        # Blog posts (markdown)
│   └── blog/       # Blog post collection
├── layouts/        # Page layouts
├── pages/          # Route pages
│   ├── index.astro # Homepage
│   ├── about.astro # About page
│   ├── blog/       # Blog listing & posts
│   └── projects/   # Projects showcase
└── styles/         # Global CSS
```

## Content Management

Blog posts are written in Markdown and stored in `src/content/blog/`.

### Creating a new post:
1. Create `src/content/blog/my-post.md`
2. Add frontmatter (title, description, pubDate)
3. Write content in Markdown

### Frontmatter template:
```yaml
---
title: "Post Title"
description: "Brief description"
pubDate: 2025-12-13
heroImage: "/images/post-hero.jpg"  # optional
---
```

## Design System

- **Theme**: Dark mode with blue accents
- **Colors**:
  - Background: #0a0a0b (primary), #111113 (secondary)
  - Text: #fafafa (primary), #a1a1aa (secondary)
  - Accent: #3b82f6 (blue)
- **Typography**: System fonts (system-ui stack)

## Deployment

Connected to Cloudflare Pages via GitHub. Push to `main` triggers automatic deployment.

**Domain**: unjoe.me

## Owner

Joseph Cannon - jrc1883 on GitHub
