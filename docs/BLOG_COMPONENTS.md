# Blog Component Library

Professional, reusable components for creating beautiful blog posts in Astro.

## Components

### BlogHero
Enhanced blog post header with gradient backgrounds, hero images, and animated typography.

**Props:**
- `title` (string) - Post title
- `description` (string) - Post description/excerpt
- `pubDate` (Date) - Publication date
- `heroImage?` (string) - Optional hero image path
- `gradient?` ('purple' | 'blue' | 'red' | 'green' | 'gold' | 'neutral') - Gradient theme

**Usage:**
```astro
---
import BlogHero from '../../components/blog/BlogHero.astro';

const { title, description, pubDate, heroImage } = Astro.props;
---

<BlogHero
  title={title}
  description={description}
  pubDate={new Date(pubDate)}
  heroImage={heroImage}
  gradient="blue"
/>
```

**Gradient Themes:**
- `purple` - Purple gradient (philosophy, deep thinking posts)
- `blue` - Blue gradient (default, technical posts)
- `red` - Red gradient (controversial, critical posts)
- `green` - Green gradient (growth, family posts)
- `gold` - Gold gradient (leadership, achievements)
- `neutral` - Gray gradient (neutral, factual posts)

---

### DropCap
Large first letter for paragraph openings (Medium/magazine style).

**Props:**
- `variant?` ('default' | 'accent' | 'gradient') - Styling variant

**Usage:**
```mdx
<DropCap>I</DropCap> grew up in a Christian family. We went to church and Sunday school every week...
```

**Variants:**
- `default` - Matches text color (subtle)
- `accent` - Uses theme accent color (prominent)
- `gradient` - Gradient effect (modern, eye-catching)

**Example:**
```mdx
import DropCap from '../../components/blog/DropCap.astro';

<DropCap variant="accent">T</DropCap>he word of God must enter the mind and heart to bring life, health, and fruit.
```

---

### PullQuote
Sidebar quote component for highlighting key passages.

**Props:**
- `attribution?` (string) - Citation/source (e.g., "Romans 13:4")
- `side?` ('left' | 'right') - Which side to float (default: 'right')

**Usage:**
```mdx
<PullQuote attribution="Romans 13:4">
  For he is God's servant for your good.
</PullQuote>
```

**Behavior:**
- **Desktop (>1024px)**: Floats to the side, extends into margin
- **Mobile (<1024px)**: Full width, no float
- **Hover effect**: Border highlights, shadow appears

**Advanced Example:**
```mdx
<PullQuote side="left" attribution="John Adams, 1776">
  "Facts are stubborn things; and whatever may be our wishes, our inclinations, or the dictates of our passion, they cannot alter the state of facts and evidence."
</PullQuote>
```

---

### Ref (Tooltip System)
Smart reference component with interactive tooltips. See [Smart Tooltip System docs](../docs/plans/smart-tooltip-system.md).

**Types:**
- Bible verses
- Internal post cross-references
- External links
- Term definitions
- Custom tooltips

**Usage:**
```mdx
import Ref from '../../components/Ref.astro';

<!-- Bible verse -->
<Ref bible="Matthew 2:13-15">Matthew 2:13-15</Ref>

<!-- Internal link -->
<Ref href="/blog/navy-leadership-lessons">my Navy experience</Ref>

<!-- Term definition -->
<Ref term="Imago Dei" definition="Latin for 'Image of God'—the biblical teaching that all humans reflect God's nature">Imago Dei</Ref>

<!-- Custom tooltip -->
<Ref tooltip="This is a quick note">hover for details</Ref>
```

---

### Callout
Highlighted boxes for important information.

**Types:**
- `info` - General information (blue)
- `warning` - Warnings/cautions (yellow)
- `success` - Positive notes (green)
- `note` - General notes (gray)
- `historical` - Historical context (brown)

**Usage:**
```mdx
import Callout from '../../components/Callout.astro';

<Callout type="info" title="Important Note">
This is critical information the reader should know.
</Callout>
```

---

## Complete Post Example

```mdx
---
title: "When Compassion Becomes a Weapon"
description: "How emotional manipulation overrides truth"
pubDate: 'Dec 30 2025'
tags: ['philosophy', 'critical-thinking']
heroImage: '/images/blog/compassion-weapon-hero.jpg'
---

import Ref from '../../components/Ref.astro';
import Callout from '../../components/Callout.astro';
import DropCap from '../../components/blog/DropCap.astro';
import PullQuote from '../../components/blog/PullQuote.astro';

<DropCap>A</DropCap> friend posted something on Facebook that I couldn't ignore.

<PullQuote attribution="Facebook Post">
"Christ is present in every migrant and refugee. Can we make room for Him?"
</PullQuote>

The message was clear: **If you support border enforcement, you're slamming the door on Jesus.**

This is <Ref term="compassion as a weapon" definition="Using emotional appeals to bypass critical thinking and shut down legitimate debate">compassion as a weapon</Ref>. And it's devastatingly effective.

<Callout type="historical" title="The Actual Nativity Story">
<Ref bible="Luke 2:1-7">Luke 2:1-7</Ref> records that Mary and Joseph traveled to Bethlehem for a Roman census—not fleeing persecution.
</Callout>

Read more about my <Ref href="/blog/elshaddai-philosophy">faith-driven approach to work</Ref>.
```

---

## Styling & Theming

All components use CSS custom properties for theming:

```css
--text-primary: Main text color
--text-secondary: Body text color
--text-muted: De-emphasized text
--bg-primary: Primary background
--bg-secondary: Secondary background
--bg-tertiary: Tertiary background
--border: Border color
--accent: Theme accent color
--accent-hover: Accent hover state
```

Components automatically adapt to light/dark mode via `prefers-color-scheme`.

---

## Typography

Blog posts use Medium-inspired typography:

- **Body font**: 21px (1.3125rem)
- **Line height**: 1.58
- **Prose width**: 850px (wider for better horizontal space)
- **Paragraph spacing**: 2em
- **List spacing**: 0.5em

---

## Responsive Behavior

| Component | Desktop (>1024px) | Mobile (<1024px) |
|-----------|-------------------|------------------|
| **BlogHero** | 400px min-height | 350px min-height |
| **DropCap** | 4.5rem font | 3.5rem font |
| **PullQuote** | Floats to side, extends into margin | Full width, no float |
| **TooltipSidebar** | Right sidebar (280px) | Hidden (future: floating tooltip) |

---

## Future: ElShaddai UI Library

These components are the foundation for **@elshaddai/ui** - a reusable component library for Astro sites.

**Planned structure:**
```
packages/
└── ui/
    ├── components/
    │   ├── blog/        # BlogHero, DropCap, PullQuote
    │   ├── interactive/ # Ref, TooltipSidebar
    │   ├── layout/      # Callout, containers
    │   └── typography/  # Headings, text styles
    ├── styles/
    │   ├── themes/      # Light, dark, custom themes
    │   └── tokens/      # Design tokens (colors, spacing, etc.)
    └── package.json
```

**Usage across sites:**
```bash
# In any Astro project
pnpm add @elshaddai/ui

# In your post
import { BlogHero, DropCap, PullQuote } from '@elshaddai/ui/blog';
import { Ref, Callout } from '@elshaddai/ui';
```

---

## License

Private - ElShaddai ecosystem components for personal/friend use.
