# unjoe.me - Personal Portfolio & Blog

Personal website for Joseph Cannon ([@jrc1883](https://github.com/jrc1883)) built with Astro 5.x and deployed to Cloudflare Pages.

**Live Site:** [unjoe.me](https://unjoe.me)

## About This Project

Modern, dark-themed portfolio and blog showcasing:
- Engineering leadership experience (21+ years)
- AI/automation projects (PopKit, OPTIMUS, Genesis)
- Technical writing and thought leadership
- Navy veteran background and career journey

**Inspiration:** Visual design inspired by [maximelbv.com](https://maximelbv.com) with bento grid layout.

## Monorepo Location

This project lives in the ElShaddai monorepo:

```
elshaddai/
└── apps/
    └── unjoe-portfolio/  ← You are here
```

**Shared Dependencies:**
- `@elshaddai/portfolio-ui` - Shared UI components (workspace package)
- Configured in `astro.config.mjs` with Vite alias

## Tech Stack

- **Framework:** Astro 5.x (static site generation + islands architecture)
- **Styling:** Tailwind CSS 4.x
- **Content:** Content Collections (Markdown/MDX)
- **Deployment:** Cloudflare Pages (auto-deploy from `main`)
- **Integrations:**
  - `@astrojs/mdx` - MDX support for rich blog posts
  - `@astrojs/sitemap` - XML sitemap generation
  - `@astrojs/rss` - RSS feed for blog
  - `@astrojs/cloudflare` - Cloudflare Pages adapter

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm 9.15.9 (monorepo package manager)

### Development

```bash
# From this directory (apps/unjoe-portfolio/)
npm run dev
# → http://localhost:4321

# Or from monorepo root
pnpm --filter unjoe-portfolio dev
```

### Build

```bash
# From this directory
npm run build

# Preview production build
npm run preview
```

### Deployment

Automatic deployment via Cloudflare Pages:
```bash
git push origin main
```

Connected to unjoe.me domain via Cloudflare DNS.

## Project Structure

```
src/
├── assets/          # Images, fonts, static assets
├── components/      # Astro components
│   ├── cards/      # Bento grid card components
│   ├── BaseHead.astro
│   ├── Header.astro
│   ├── Footer.astro
│   └── ...
├── content/         # Content Collections
│   └── blog/       # Blog posts (Markdown/MDX)
│       ├── building-a-family-os.md
│       ├── navy-leadership-lessons.md
│       └── ...
├── layouts/         # Page layouts
│   └── BlogPost.astro
├── pages/           # File-based routing
│   ├── index.astro       # Homepage (bento grid)
│   ├── about.astro       # About page
│   ├── blog/             # Blog listing & [slug]
│   ├── projects/         # Projects showcase
│   └── rss.xml.js        # RSS feed
├── scripts/         # Client-side JavaScript
│   └── expandable-cards.js
├── styles/          # Global CSS
│   └── global.css
├── consts.ts        # Site constants (title, social links, etc.)
└── content.config.ts # Content Collections schema
```

## Content Management

### Creating a Blog Post

1. Create new file in `src/content/blog/<slug>.md`
2. Add frontmatter:

```markdown
---
title: "Your Compelling Post Title"
description: "1-2 sentence description for SEO and previews"
pubDate: 2025-12-30
heroImage: "/images/blog/hero.jpg"  # Optional
---

Your content here in Markdown...
```

3. Write content using Markdown or MDX
4. Commit and push to `main` to publish

**See CLAUDE.md** for comprehensive content generation workflows, including how to create blog posts from Claude Code discussions.

## Design System

**Theme:** Dark mode with blue accents

**Colors:**
- Background: `#0a0a0b` (primary), `#111113` (secondary)
- Cards: `#18181b` (default), `#1f1f23` (hover)
- Text: `#fafafa` (primary), `#a1a1aa` (secondary), `#71717a` (muted)
- Accent: `#3b82f6` (blue)
- Border: `#27272a`

**Typography:**
- System font stack (`system-ui, sans-serif`)
- Responsive scaling with `clamp()` for headings

**Layout:**
- Bento grid (CSS Grid, 4 columns, responsive)
- Max-width: 1000px for content sections
- 1rem gap/padding standard

## Development Workflow

This project uses **PopKit** for enhanced development:

```bash
# View issues
/popkit:issue list

# Work on an issue
/popkit:dev work #123

# Commit changes
/popkit:git commit

# Create pull request
/popkit:git pr

# Run assessments
/popkit:assess all
```

See **CLAUDE.md** for complete PopKit integration guide.

## Content Workflows

### From Claude Discussions → Blog Posts

**CLAUDE.md** documents three workflows:

1. **Direct Content Extraction** (Desktop) - Copy discussion, create draft, polish, publish
2. **Issue-Based Workflow** (Desktop) - Create blog idea issue, work on it, close when published
3. **PR-Based Workflow** (Web/Mobile) - Claude creates blog post on branch, opens PR, Joseph reviews and merges

### Mobile Content Creation (The Magic!)

**From Claude Web or Android app:**

1. Voice-to-text your idea or topic
2. Tell Claude: "Create a blog post about [topic] for unjoe.me"
3. Claude creates:
   - New branch: `content/<topic-slug>`
   - Blog post file: `src/content/blog/<topic-slug>.md`
   - Pull request to `main`
4. **Review PR on GitHub** (phone or desktop):
   - See markdown diff in "Files changed"
   - Comment if revisions needed
   - Approve when ready
5. **Merge PR** → Cloudflare auto-deploys to unjoe.me (1-2 min)

**Why This Works:**
- Claude Web/Android work in sandbox mode (can create branches but not push to main)
- Your GitHub repo requires PR reviews for main branch
- PR workflow provides quality control
- No local development needed for content creation
- Perfect for capturing ideas on-the-go

### Content Quality Standards

Before publishing:
- [ ] Clear value proposition
- [ ] Original perspective from Joseph's experience
- [ ] Well-structured with proper headings
- [ ] Scannable (bullets, code blocks, visual hierarchy)
- [ ] Proofread and SEO-optimized
- [ ] Links tested, images optimized

## Known Issues & Plans

- **Bento Portfolio Redesign**: Comprehensive plan in `docs/plans/2025-12-14-bento-portfolio-redesign.md`
- **Current Status**: Basic Astro blog template customized, bento design planned but not fully implemented

## Contributing

This is a personal portfolio, but if you find issues:
1. Open an issue in the ElShaddai monorepo
2. Or contact Joseph directly

## License

Copyright © 2025 Joseph Cannon. All rights reserved.

## Links

- **Live Site:** [unjoe.me](https://unjoe.me)
- **GitHub:** [@jrc1883](https://github.com/jrc1883)
- **LinkedIn:** [josephcannon](https://www.linkedin.com/in/josephcannon/)
- **X/Twitter:** [@iamautojoe](https://x.com/iamautojoe)
- **Email:** joseph.cannon@outlook.com

---

Built with ❤️ using Astro, Tailwind, and Claude Code (with PopKit).
