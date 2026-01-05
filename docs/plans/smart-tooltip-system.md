# Smart Tooltip System - Architecture & Implementation Plan

## Overview

A generic, reusable tooltip system for rich contextual previews on hover. Supports multiple content types: Bible verses, external links, internal posts, definitions, and custom content.

## Design Philosophy

1. **Generic First**: Build once, use everywhere
2. **Progressive Enhancement**: Works without JS (basic links), enhanced with JS
3. **Responsive**: Adapts to desktop (sidebar) vs mobile (floating tooltip)
4. **Accessible**: Keyboard navigation, ARIA labels, screen reader friendly
5. **Future-Proof**: Easy to add new content types

---

## Component API

### Basic Usage

```mdx
<!-- Bible verse -->
<Ref bible="Matthew 2:13-15">Matthew 2:13-15</Ref>

<!-- External article with preview -->
<Ref href="https://example.com/article" preview="auto">external article</Ref>

<!-- Internal post reference -->
<Ref href="/blog/navy-leadership">my leadership post</Ref>

<!-- Definition/term -->
<Ref term="Imago Dei" definition="The theological concept that humans are made in the image of God">Imago Dei</Ref>

<!-- Custom tooltip content -->
<Ref tooltip="This appears on hover">hover me</Ref>
```

### Component Props

```typescript
interface RefProps {
  // Content source (mutually exclusive)
  bible?: string;          // Bible reference: "Book Chapter:Verse-Verse"
  href?: string;           // URL (internal or external)
  term?: string;           // Term being defined
  tooltip?: string;        // Custom tooltip text

  // Optional modifiers
  preview?: 'auto' | 'manual' | string;  // For external links
  definition?: string;     // Definition text for terms
  translation?: 'ESV' | 'NIV' | 'NASB';  // Bible translation

  // Styling
  variant?: 'default' | 'subtle' | 'emphasized';

  // Children (link text)
  children: ReactNode;
}
```

---

## Content Type Handlers

### 1. Bible References

**Input:** `<Ref bible="Romans 13:1-4">Romans 13:1-4</Ref>`

**Build-time Processing:**
1. Parse reference using regex: `/([1-3]?\s?[A-Z][a-z]+)\s+(\d+):(\d+)(?:-(\d+))?/`
2. Fetch verse text from ESV API
3. Cache result in component data attribute
4. Store translation/passage info

**Runtime Display:**
```
┌─────────────────────────┐
│ Romans 13:1-4 (ESV)     │
├─────────────────────────┤
│ Let every person be     │
│ subject to the          │
│ governing authorities.  │
│ For there is no...      │
│                         │
│ [Read Full Chapter →]   │
└─────────────────────────┘
```

**Future: Genesis API Integration**
```typescript
// Phase 1: ESV API (external)
const verse = await fetchESV(reference);

// Phase 2: Genesis API (your own)
const verse = await fetch('https://genesis.yourdomain.com/api/bible', {
  body: JSON.stringify({ reference, translation })
});
```

### 2. External Link Previews

**Input:** `<Ref href="https://example.com" preview="auto">article</Ref>`

**Build-time Processing:**
1. Fetch URL and extract OpenGraph tags
2. Extract: title, description, image, site name
3. Cache preview data
4. Fallback to manual preview if fetch fails

**Runtime Display:**
```
┌───────────────────────────────┐
│ [Image Preview]               │
│ Article Title                 │
│ Brief description from meta   │
│ tags or manual override...    │
│                               │
│ example.com                   │
└───────────────────────────────┘
```

### 3. Internal Post References

**Input:** `<Ref href="/blog/navy-leadership">my post</Ref>`

**Build-time Processing:**
1. Look up post by slug
2. Extract: title, description, tags, reading time
3. Generate preview card

**Runtime Display:**
```
┌───────────────────────────────┐
│ Navy Leadership Lessons       │
│ 5 min read • Leadership       │
│                               │
│ What 21 years of naval        │
│ service taught me about...    │
│                               │
│ [Read Post →]                 │
└───────────────────────────────┘
```

### 4. Term Definitions

**Input:** `<Ref term="Imago Dei" definition="...">Imago Dei</Ref>`

**Runtime Display:**
```
┌───────────────────────────────┐
│ Imago Dei                     │
├───────────────────────────────┤
│ The theological concept that  │
│ humans are made in the image  │
│ of God (Genesis 1:27)         │
└───────────────────────────────┘
```

### 5. Custom Tooltips

**Input:** `<Ref tooltip="Custom content">hover</Ref>`

**Runtime Display:**
```
┌─────────────────┐
│ Custom content  │
└─────────────────┘
```

---

## Positioning Strategy

### Desktop (>1024px): Sidebar Panel

**Layout:**
```
┌─────────────────────────┬──────────────────┐
│                         │                  │
│   Blog Content          │   Tooltip Panel  │
│   Lorem ipsum...        │   (Fixed right)  │
│                         │                  │
│   Hover over -->        │  ┌────────────┐  │
│   Romans 13:1-4         │  │ Romans     │  │
│   ...and it appears     │  │ 13:1-4     │  │
│                         │  │            │  │
│                         │  │ [Verse     │  │
│                         │  │  text]     │  │
│                         │  └────────────┘  │
└─────────────────────────┴──────────────────┘
          720px max           280px
```

**Implementation:**
- Sidebar: `position: fixed; right: 0; top: 100px;`
- Content fades in when hovering over any `<Ref>` element
- Sidebar stays visible when mouse moves to it
- Closes when mouse leaves both reference AND sidebar

### Mobile/Tablet (<1024px): Floating Tooltip

**Layout:**
```
┌─────────────────────────┐
│   Blog Content          │
│   Lorem ipsum...        │
│                         │
│   Hover/tap on -->      │
│   Romans 13:1-4         │
│   ┌──────────────────┐  │
│   │ Romans 13:1-4    │  │ <- Tooltip
│   │ [Verse text...]  │  │
│   └──────────────────┘  │
└─────────────────────────┘
```

**Implementation:**
- Tooltip positioned using Floating UI
- Smart positioning (never off-screen)
- Tap to show, tap outside to hide
- Larger touch targets (44px minimum)

---

## Technical Architecture

### Component Structure

```
src/components/
├── Ref.astro                  # Main component
├── tooltips/
│   ├── TooltipContainer.astro # Shared tooltip wrapper
│   ├── BibleTooltip.astro     # Bible verse display
│   ├── LinkTooltip.astro      # External link preview
│   ├── PostTooltip.astro      # Internal post preview
│   ├── TermTooltip.astro      # Definition display
│   └── CustomTooltip.astro    # Generic tooltip
└── sidebar/
    └── TooltipSidebar.astro   # Desktop sidebar panel
```

### Data Flow

```
Build Time:
1. MDX processes <Ref> components
2. Ref.astro determines content type
3. Fetches external data (API calls, post lookups)
4. Renders with data-* attributes for runtime

Runtime:
1. JavaScript detects hover on <Ref>
2. Reads data-* attributes
3. Populates sidebar/tooltip
4. Handles show/hide with fade animations
5. Manages keyboard navigation
```

### State Management

```typescript
// Global tooltip state
const TooltipManager = {
  activeRef: null,           // Currently hovered <Ref> element
  activeContent: null,       // Tooltip content data
  position: 'sidebar',       // 'sidebar' or 'floating'
  isHoveringTooltip: false,  // Mouse over tooltip

  show(ref, content) { ... },
  hide() { ... },
  updatePosition() { ... }
};
```

---

## Bible API Integration

### Phase 1: ESV API (Current)

**Setup:**
```bash
# .env
ESV_API_KEY=your_key_here
```

**Build-time fetch:**
```typescript
// src/utils/bible-api.ts
export async function fetchVerse(reference: string, translation = 'ESV') {
  const response = await fetch('https://api.esv.org/v3/passage/text/', {
    params: {
      q: reference,
      'include-headings': false,
      'include-footnotes': false
    },
    headers: {
      'Authorization': `Token ${import.meta.env.ESV_API_KEY}`
    }
  });

  const data = await response.json();
  return {
    reference,
    translation,
    text: data.passages[0],
    copyright: 'ESV Bible (The Holy Bible, English Standard Version®)'
  };
}
```

### Phase 2: Genesis API (Future)

**Setup:**
```typescript
// src/utils/bible-api.ts
export async function fetchVerse(reference: string, translation = 'ESV') {
  // Use Genesis API when available
  if (import.meta.env.USE_GENESIS_API === 'true') {
    return fetchFromGenesis(reference, translation);
  }

  // Fallback to ESV API
  return fetchFromESV(reference, translation);
}

async function fetchFromGenesis(reference: string, translation: string) {
  const response = await fetch('https://genesis.yourdomain.com/api/bible', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reference, translation })
  });

  return response.json();
}
```

**Benefits of Genesis Integration:**
- No rate limits (your own API)
- Multiple translations controlled by you
- Consistent with your broader ecosystem
- Can add custom features (cross-references, commentary)

---

## External Link Preview

### OpenGraph Fetching

```typescript
// src/utils/link-preview.ts
export async function fetchLinkPreview(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Parse OpenGraph tags
    const og = {
      title: extractTag(html, 'og:title'),
      description: extractTag(html, 'og:description'),
      image: extractTag(html, 'og:image'),
      siteName: extractTag(html, 'og:site_name'),
      url: url
    };

    return og;
  } catch (error) {
    console.warn(`Failed to fetch preview for ${url}:`, error);
    return null;
  }
}

function extractTag(html: string, property: string): string | null {
  const regex = new RegExp(`<meta property="${property}" content="([^"]*)"`, 'i');
  const match = html.match(regex);
  return match ? match[1] : null;
}
```

### Caching Strategy

```typescript
// Cache previews to avoid repeated fetches
const PREVIEW_CACHE_FILE = '.cache/link-previews.json';

export async function getCachedPreview(url: string) {
  const cache = await readCache();

  // Return cached if less than 7 days old
  if (cache[url] && Date.now() - cache[url].timestamp < 7 * 24 * 60 * 60 * 1000) {
    return cache[url].data;
  }

  // Fetch fresh
  const preview = await fetchLinkPreview(url);

  // Cache for next time
  cache[url] = {
    data: preview,
    timestamp: Date.now()
  };
  await writeCache(cache);

  return preview;
}
```

---

## Styling & Animation

### CSS Variables

```css
:root {
  --tooltip-bg: var(--card-bg);
  --tooltip-border: var(--border);
  --tooltip-text: var(--text-secondary);
  --tooltip-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --tooltip-max-width: 320px;
  --sidebar-width: 280px;
}
```

### Animations

```css
/* Fade in */
@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tooltip-enter {
  animation: tooltipFadeIn 250ms ease-out;
}

/* Fade out */
@keyframes tooltipFadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
}

.tooltip-exit {
  animation: tooltipFadeOut 200ms ease-in;
}
```

### Link Styling

```css
/* Reference links */
.ref-link {
  color: var(--accent);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: rgba(59, 130, 246, 0.4);
  text-underline-offset: 3px;
  cursor: help;
  transition: all 0.2s ease;
}

.ref-link:hover {
  text-decoration-style: solid;
  text-decoration-color: var(--accent);
}

.ref-link.active {
  text-decoration-style: solid;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 3px;
  padding: 0 2px;
}
```

---

## Accessibility

### ARIA Labels

```html
<a
  class="ref-link"
  role="button"
  aria-describedby="tooltip-{id}"
  aria-expanded="false"
  tabindex="0"
>
  Romans 13:1-4
</a>

<div
  id="tooltip-{id}"
  role="tooltip"
  aria-live="polite"
  hidden
>
  <!-- Tooltip content -->
</div>
```

### Keyboard Navigation

- **Tab**: Navigate between references
- **Enter/Space**: Show/hide tooltip
- **Escape**: Close active tooltip
- **Arrow keys**: Navigate within tooltip (if interactive)

### Screen Readers

- Announce tooltip content when activated
- Provide "skip to content" option
- Alt text for preview images

---

## Implementation Phases

### MVP (Week 2-3)

**Scope:**
- Generic `<Ref>` component
- Bible verse tooltips (ESV API)
- Basic external link tooltips
- Desktop sidebar only
- Single translation (ESV)

**Deliverables:**
1. ✅ Ref.astro component
2. ✅ BibleTooltip.astro
3. ✅ TooltipSidebar.astro
4. ✅ Basic hover detection
5. ✅ Fade in/out animations
6. ✅ ESV API integration

**Testing:**
- Update "when-compassion-becomes-a-weapon" post with `<Ref>` components
- Verify tooltips appear correctly
- Test hover interactions

### Phase 2 (Week 4)

**Scope:**
- Mobile/tablet floating tooltips
- Internal post references
- Term definitions
- Multiple Bible translations

**Deliverables:**
1. ✅ Responsive tooltip positioning (Floating UI)
2. ✅ PostTooltip.astro
3. ✅ TermTooltip.astro
4. ✅ Translation selector
5. ✅ Touch interactions

### Phase 3 (Month 2)

**Scope:**
- Genesis API integration
- Enhanced external link previews (images)
- Click-to-pin tooltips
- Copy/share functionality

**Deliverables:**
1. ✅ Genesis API adapter
2. ✅ Image previews for links
3. ✅ Sticky tooltip mode
4. ✅ Copy verse button
5. ✅ Share functionality

### Phase 4 (Month 3+)

**Scope:**
- Cross-references within Bible verses
- Commentary integration
- Search within tooltips
- Personalization (preferred translation)

---

## File Structure

```
src/
├── components/
│   ├── Ref.astro                      # Main component
│   ├── tooltips/
│   │   ├── TooltipContainer.astro
│   │   ├── BibleTooltip.astro
│   │   ├── LinkTooltip.astro
│   │   ├── PostTooltip.astro
│   │   ├── TermTooltip.astro
│   │   └── CustomTooltip.astro
│   └── sidebar/
│       └── TooltipSidebar.astro
├── utils/
│   ├── bible-api.ts                   # Bible verse fetching
│   ├── link-preview.ts                # OpenGraph fetching
│   ├── post-lookup.ts                 # Internal post queries
│   └── tooltip-manager.ts             # Runtime state management
├── scripts/
│   └── tooltip-interactions.ts        # Client-side JS
└── styles/
    └── tooltips.css                   # Tooltip styling

.cache/
└── link-previews.json                 # Preview cache

.env
├── ESV_API_KEY=...
└── USE_GENESIS_API=false
```

---

## Usage Examples

### 1. Bible-Heavy Post

```mdx
---
title: "Immigration and Christian Ethics"
---

<Ref bible="Matthew 22:37-40">The greatest commandment</Ref> calls us to love
God and neighbor. But what does that mean for national borders?

<Ref bible="Romans 13:1-7">Paul's teaching on government authority</Ref> must
be balanced with <Ref bible="Acts 5:29">Peter's declaration</Ref> that we obey
God rather than men when they conflict.
```

### 2. Research-Heavy Post

```mdx
---
title: "AI Safety Challenges"
---

As <Ref href="https://alignmentforum.org/article" preview="auto">this article</Ref>
argues, alignment is harder than we think. I explored this in
<Ref href="/blog/ai-alignment-thoughts">my previous post</Ref> where I discussed
the <Ref term="alignment problem" definition="The challenge of ensuring AI systems pursue intended goals">alignment problem</Ref>.
```

### 3. Mixed Content Post

```mdx
---
title: "Leadership Lessons from Navy Service"
---

During my time as a <Ref term="Senior Chief" definition="E-8 rank in US Navy">Senior Chief</Ref>,
I learned that <Ref bible="Proverbs 27:17">iron sharpens iron</Ref>. This principle,
which I also discuss in <Ref href="/blog/team-building">my team building post</Ref>,
aligns with <Ref href="https://hbr.org/leadership" preview="auto">modern leadership research</Ref>.
```

---

## Performance Considerations

### Build-time Optimizations

1. **Parallel fetching**: Fetch all verses/previews concurrently
2. **Caching**: Cache Bible verses and link previews
3. **Lazy loading**: Only fetch when content type is used
4. **Error boundaries**: Graceful fallbacks for failed fetches

### Runtime Optimizations

1. **Debounce hover**: 300ms delay before showing tooltip
2. **Intersection observer**: Only activate tooltips in viewport
3. **Preload on hover**: Start loading tooltip content on hover intent
4. **CSS containment**: Isolate tooltip rendering

---

## Security Considerations

1. **API keys**: Store in .env, never commit
2. **XSS prevention**: Sanitize all external content
3. **CORS**: Handle cross-origin link previews safely
4. **Rate limiting**: Respect API rate limits
5. **Content validation**: Validate Bible references before fetching

---

## Monitoring & Analytics

### Metrics to Track

1. **Tooltip usage**: Which references get hovered most
2. **Content types**: Bible vs links vs posts
3. **Conversion**: Tooltip hover → click-through
4. **Performance**: Build time impact of fetching
5. **Errors**: Failed API calls, broken links

### Implementation

```typescript
// Track tooltip interactions
function trackTooltip(type: string, action: string, reference: string) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('Tooltip', {
      props: { type, action, reference }
    });
  }
}

// Usage
trackTooltip('bible', 'show', 'Romans 13:1-4');
trackTooltip('link', 'click', 'https://example.com');
```

---

## Future Enhancements

### 1. Smart Context

Detect context and show relevant info:
- Bible verse → Show cross-references
- Historical term → Show timeline
- Technical term → Show related concepts

### 2. Personalization

Remember user preferences:
- Preferred Bible translation
- Auto-expand on hover vs click
- Tooltip vs sidebar preference

### 3. Collaborative Features

- Share tooltip with note
- Annotate verses
- Create custom collections

### 4. Advanced Bible Features

- Compare translations side-by-side
- Show original Greek/Hebrew
- Link to commentary
- Display cross-references
- Show historical context

---

## Success Criteria

**MVP Success:**
- ✅ 5+ Bible references working in one post
- ✅ Smooth animations (60fps)
- ✅ <500ms build time increase
- ✅ Accessible via keyboard
- ✅ Responsive (desktop + mobile)

**Long-term Success:**
- 📊 20%+ of readers interact with tooltips
- 📊 <0.1% error rate on API calls
- 📊 Positive user feedback
- 📊 Increased time on page
- 📊 More cross-linking between posts

---

## Questions to Resolve

1. **Genesis API timing**: When will it be ready?
2. **Multiple translations**: ESV only or add NIV, NASB?
3. **External link quota**: How many link previews per build?
4. **Sidebar position**: Always right, or configurable?
5. **Mobile UX**: Floating tooltip or bottom sheet?

---

## Next Steps

1. ✅ Get user approval on architecture
2. ✅ Set up ESV API key
3. ✅ Build Ref.astro component (MVP)
4. ✅ Implement BibleTooltip.astro
5. ✅ Add hover detection JavaScript
6. ✅ Test with one post
7. ✅ Iterate based on feedback

---

**Last Updated:** 2025-12-30
**Status:** Architecture Design Complete - Ready for Implementation
