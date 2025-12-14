# unjoe.me - Personal Portfolio & Blog

Personal website for Joseph Cannon built with Astro, deployed to Cloudflare Pages.

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
