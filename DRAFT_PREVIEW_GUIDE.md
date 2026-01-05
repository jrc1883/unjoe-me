# Draft Preview System - Quick Start Guide

## What's Been Set Up

✅ **Draft Mode System**
- Posts marked with `draft: true` only show in development
- Prominent orange warning banner on draft posts
- Orange draft badges on blog index (dev mode only)
- Draft posts filtered out of production builds

✅ **Dedicated Drafts Page**
- Access all drafts at `/drafts` in development mode
- Shows draft count and warning indicators
- Lists all drafts with metadata (title, description, date, series info)
- Redirects to home in production

✅ **Draft Indicators**
- Sticky banner on individual draft post pages
- Badge on blog index for draft posts (dev mode)
- Clear visual warnings throughout

## Viewing Draft Posts

### Start the Development Server

```bash
cd apps/unjoe-portfolio
npm run dev
```

The server will start on **http://localhost:4321** (default Astro port)

### Where to Find Drafts

1. **Drafts Page**: http://localhost:4323/drafts (NEW!)
   - Dedicated page showing all drafts in one place
   - Draft count and warning indicators
   - Easy access without clicking individual links
   - Dev-only (redirects to home in production)

2. **Blog Index**: http://localhost:4323/blog
   - Draft posts appear in the list (only in dev mode)
   - **Orange "DRAFT" badge** appears next to draft post titles

3. **Individual Draft Posts**: Click any draft from the list
   - **Sticky orange banner** at top: "DRAFT POST"
   - Banner pulses to draw attention
   - Banner only shows in development mode

## Current Status

### ✅ Draft System Complete

- Dedicated `/drafts` page for easy review
- Draft badges on blog index
- Sticky banners on individual draft posts
- All draft indicators only show in development mode
- Production builds filter out drafts completely

### 📝 Content Status

**Weak PopKit series posts have been removed** per user feedback. These posts came from a generic prompt without proper context and storytelling.

**Keeping**: Quality posts with deep context:
- "When Compassion Becomes a Weapon" (Mary/Joseph nativity post)
- All other original blog posts

## Testing Checklist

- [x] Start dev server: `npm run dev`
- [x] Visit drafts page: http://localhost:4323/drafts
- [x] Visit blog index: http://localhost:4323/blog
- [x] Confirm draft badges appear on draft posts
- [x] Click on a draft post
- [x] **Verify orange draft banner appears** at top
- [x] Banner says "DRAFT POST" with warning icon
- [ ] Try building for production: `npm run build`
- [ ] Confirm drafts are NOT in production build

## Production vs Development Behavior

### Development Mode (`npm run dev`)
- All posts visible (published + drafts)
- Draft banner appears on draft posts
- Perfect for reviewing unpublished content

### Production Build (`npm run build`)
- Only published posts included
- Drafts completely excluded from build
- Draft pages return 404 in production

## Next Steps

### Writing New Content

When creating new blog posts:
1. Create MDX file in `src/content/blog/`
2. Add `draft: true` to frontmatter
3. Start dev server to preview at `/drafts`
4. Review and iterate
5. When ready, change `draft: false` and commit
6. Push to deploy to production

### Hero Images

For posts needing hero images:
1. **OpenAI DALL-E**: Use API key to generate images from prompts
2. **Stock Photos**: Use Unsplash/Pexels with attribution
3. **Placeholders**: Site uses fallback gradient if no hero image

## Commands Reference

```bash
# Start development server
npm run dev

# Build for production (drafts excluded)
npm run build

# Preview production build
npm run preview

# Check for TypeScript errors
npm run type-check
```

## File Locations

- **Draft Posts**: `src/content/blog/*.mdx` (with `draft: true`)
- **Drafts Page**: `src/pages/drafts.astro`
- **Hero Images**: `public/images/blog/`
- **Draft Banner Component**: `src/components/DraftBanner.astro`
- **Blog Index**: `src/pages/blog/index.astro` (with draft badges)
- **Blog Slug Page**: `src/pages/blog/[...slug].astro`
- **Post Layout**: `src/layouts/BlogPost.astro` (includes DraftBanner)

---

**Questions or Issues?**
- Check the dev server console for build errors
- Hero image 404s are expected (using fallback gradient)
- Draft banner should pulse with orange background
