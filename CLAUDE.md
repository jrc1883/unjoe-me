# unjoe.me - Personal Portfolio & Blog

Personal website for Joseph Cannon built with Astro, deployed to Cloudflare Pages.

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

When creating content in this repo from a sandboxed environment:

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

### For Local Claude Code

When you see an `INBOX_*.md` file in the repo root:

1. Read and understand the content
2. Create a GitHub Issue: `/popkit:issue create "<title>" --template <type>`
3. Ensure PopKit Guidance section is filled appropriately
4. Once issue is created, delete the inbox file
5. Commit: `chore: process inbox item into issue #N`

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
