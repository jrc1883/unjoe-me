# Draft Preview System - Quick Start Guide

## What's Been Set Up

✅ **Draft Mode System**
- Posts marked with `draft: true` only show in development
- Prominent orange warning banner on draft posts
- Draft posts filtered out of production builds

✅ **Part 1 Converted**
- "The Agent-Ready Repository Manifesto" converted to MDX
- Marked as draft
- Ready for preview at localhost

## Viewing Draft Posts

### Start the Development Server

```bash
cd apps/unjoe-portfolio
npm run dev
```

The server will start on **http://localhost:4321** (default Astro port)

### Where to Find Drafts

1. **Blog Index**: http://localhost:4321/blog
   - Draft posts appear in the list (only in dev mode)
   - No special indicator on the index

2. **Draft Post**: http://localhost:4321/blog/agent-ready-01-manifesto
   - **Sticky orange banner** at top: "DRAFT POST"
   - Banner pulses to draw attention
   - Banner only shows in development mode

## Current Status

### ✅ Ready for Review

- **Part 1**: agent-ready-01-manifesto.mdx
  - Status: Draft
  - Hero Image: Placeholder (needs generation)
  - Content: Complete
  - Format: MDX with proper frontmatter

### ⏳ Needs Hero Image

The post includes a hero image prompt in frontmatter:
```yaml
heroImagePrompt: 'A modern, minimalist illustration of a well-organized
code repository structure, with clean geometric shapes representing folders
and files, glowing subtle blue highlights showing AI comprehension, dark
background, professional tech aesthetic, 16:9 aspect ratio'
```

**Options for generating the image:**

1. **OpenAI DALL-E 3** (Recommended - you have API key)
   - Use the prompt from frontmatter
   - Generate at 1792x1024 (16:9 landscape)
   - Save to: `public/images/blog/agent-ready-01-hero.jpg`

2. **Stock Photo** (Quick alternative)
   - Search Unsplash for "code structure" or "repository architecture"
   - Download and save to `public/images/blog/agent-ready-01-hero.jpg`
   - Add attribution if required

3. **Leave Placeholder** (For now)
   - Site will use fallback gradient
   - Works fine for drafting/review

## Testing Checklist

- [ ] Start dev server: `npm run dev`
- [ ] Visit blog index: http://localhost:4321/blog
- [ ] Confirm draft appears in list
- [ ] Click on Part 1 draft
- [ ] **Verify orange draft banner appears** at top
- [ ] Banner should say "DRAFT POST" with warning icon
- [ ] Scroll through content to check formatting
- [ ] Check series metadata displays correctly
- [ ] Try building for production: `npm run build`
- [ ] Confirm draft is NOT in production build

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

### Option A: Review Draft First
1. Start dev server
2. Review Part 1 at localhost
3. Decide if format/structure works
4. Then generate hero images for all 10 parts

### Option B: Generate Images Now
1. Use OpenAI DALL-E API script (can create one)
2. Generate all 10 hero images
3. Update posts with actual images
4. Review complete posts

### Option C: Publish Part 1 as Test
1. Change `draft: false` in frontmatter
2. Commit and push
3. See how it looks in production
4. Iterate on remaining posts

## Converting Remaining 9 Posts

Once you approve Part 1's format, I can:
1. **Batch convert** all 9 remaining posts to MDX
2. **Update all internal links** between posts
3. **Add series navigation** component (optional)
4. **Generate all hero images** (or use placeholders)
5. Mark all as drafts for your review

**Estimated time**: 2-3 hours for full conversion

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
- **Hero Images**: `public/images/blog/agent-ready-##-hero.jpg`
- **Draft Banner Component**: `src/components/DraftBanner.astro`
- **Blog Index**: `src/pages/blog/index.astro`
- **Post Layout**: `src/layouts/BlogPost.astro`

---

**Questions or Issues?**
- Check the dev server console for build errors
- Hero image 404s are expected (using fallback gradient)
- Draft banner should pulse with orange background
