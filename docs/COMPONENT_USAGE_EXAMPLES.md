# Component Usage Examples

Real-world examples showing how to use the new component library structure in your blog posts.

---

## Table of Contents

1. [SimpleBlogLayout Template](#simpleblogayout-template)
2. [BlogHero Component](#bloghero-component)
3. [AuthorBio Component](#authorbio-component)
4. [DropCap Component](#dropcap-component)
5. [PullQuote Component](#pullquote-component)
6. [Ref Component (Tooltips)](#ref-component-tooltips)
7. [Callout Component](#callout-component)
8. [Migration Guide](#migration-guide)
9. [Design Token Usage](#design-token-usage)

---

## SimpleBlogLayout Template

The easiest way to create a new blog post with all features included.

### Basic Usage

**File:** `src/content/blog/my-new-post.mdx`

```mdx
---
layout: ../../layouts/templates/SimpleBlogLayout.astro
title: "My Blog Post Title"
description: "A compelling description that appears in the hero"
pubDate: 'Jan 15 2026'
heroImage: '/images/blog/my-post-hero.jpg'
gradient: 'blue'  # optional: blue, purple, green, orange, red, teal
tags: ['technology', 'web-development']
---

Your content starts here...
```

### With Custom Author Override

```mdx
---
layout: ../../layouts/templates/SimpleBlogLayout.astro
title: "Guest Post Title"
description: "A guest author's perspective"
pubDate: 'Jan 15 2026'
author:
  name: 'Guest Author'
  title: 'Software Engineer at Big Tech'
  bio: 'Passionate about web performance and accessibility.'
  avatar: '/images/guest-avatar.jpg'
  links:
    github: 'https://github.com/guestauthor'
    website: 'https://guestauthor.com'
---

Guest author content...
```

### What You Get Automatically

- ✅ Header with navigation
- ✅ BlogHero with gradient or hero image
- ✅ Medium-style typography (850px prose width, 21px font)
- ✅ AuthorBio at end of post
- ✅ TooltipSidebar for all `<Ref>` components
- ✅ Footer
- ✅ Responsive design (mobile-friendly)

---

## BlogHero Component

Enhanced blog post headers with gradient backgrounds or hero images.

### With Hero Image

```mdx
---
title: "When Compassion Becomes a Weapon"
description: "How a Christmas story about refugees became rhetorical manipulation"
pubDate: 'Dec 30 2025'
heroImage: '/images/blog/compassion-weapon-hero.jpg'
---
```

**Result:** Image displayed full-width with title and description overlaid.

### With Gradient Background (No Image)

```mdx
---
title: "The Philosophy of Faith-Driven Work"
description: "Building software that serves eternal purposes"
pubDate: 'Jan 5 2026'
gradient: 'purple'  # Choose from: blue, purple, green, orange, red, teal
---
```

**Result:** Beautiful gradient background with subtle dot pattern and centered title.

### Gradient Options

| Gradient | Use Case | Visual |
|----------|----------|--------|
| `blue` | Default, professional, technical content | Blue to indigo |
| `purple` | Creative, spiritual, philosophical | Purple to pink |
| `green` | Growth, nature, sustainability | Green to emerald |
| `orange` | Energy, passion, urgency | Orange to red |
| `red` | Bold, critical thinking, warnings | Red to rose |
| `teal` | Calm, trustworthy, medical/health | Teal to cyan |

---

## AuthorBio Component

Author information block that appears at the end of blog posts.

### Default Author (Joseph Cannon)

SimpleBlogLayout uses these defaults if no author is specified:

```astro
author = {
  name: 'Joseph Cannon',
  title: 'Senior Chief Petty Officer (Ret.), Software Engineer',
  bio: 'Veteran of 21 years naval service, now building software that serves families and communities. Passionate about clear thinking, biblical wisdom, and systems that work.',
  avatar: '/images/avatar.jpg',
  links: {
    github: 'https://github.com/jrc1883',
    email: 'contact@unjoe.me'
  }
}
```

### Custom Author

```mdx
---
layout: ../../layouts/templates/SimpleBlogLayout.astro
author:
  name: 'Jane Smith'
  title: 'Technical Writer'
  bio: 'Explaining complex systems in simple terms.'
  avatar: '/images/jane-avatar.jpg'
  links:
    twitter: 'https://twitter.com/janesmith'
    linkedin: 'https://linkedin.com/in/janesmith'
    website: 'https://janesmith.dev'
    email: 'jane@example.com'
---
```

### Available Links

- `github`: GitHub profile
- `twitter`: Twitter/X profile
- `linkedin`: LinkedIn profile
- `email`: Email address (creates mailto link)
- `website`: Personal website

**Note:** All links are optional. Only included links will display as icons.

---

## DropCap Component

Magazine-style large first letter for paragraph openings.

### Basic Usage

```mdx
import DropCap from '../../components/blocks/DropCap.astro';

<DropCap>T</DropCap>he first paragraph of your blog post starts here with a beautiful drop cap...
```

### Variants

**Default** (standard styling):
```mdx
<DropCap>I</DropCap>n the beginning...
```

**Accent** (blue accent color):
```mdx
<DropCap variant="accent">T</DropCap>his is important...
```

**Gradient** (gradient fill):
```mdx
<DropCap variant="gradient">W</DropCap>hen you want something fancy...
```

### Styling Tips

- Use on first paragraph of article for traditional magazine feel
- Works best with single uppercase letter
- Automatically floats left and wraps text
- Responsive (smaller on mobile)

---

## PullQuote Component

Sidebar quote component for highlighting key passages.

### Float Right (Default)

```mdx
import PullQuote from '../../components/blocks/PullQuote.astro';

<PullQuote attribution="C.S. Lewis">
You can't go back and change the beginning, but you can start where you are and change the ending.
</PullQuote>
```

### Float Left

```mdx
<PullQuote side="left" attribution="Martin Luther King Jr.">
The time is always right to do what is right.
</PullQuote>
```

### Without Attribution

```mdx
<PullQuote>
This is a key insight from the article worth highlighting.
</PullQuote>
```

### Styling Behavior

- Desktop: Floats left/right, 280px wide, with text wrap
- Mobile (<768px): Full-width block, no float
- Blue left border accent
- Italic typography

---

## Ref Component (Tooltips)

Smart tooltip reference system for Bible verses, terms, and cross-references.

### Bible Verse References

```mdx
import Ref from '../../components/interactive/Ref.astro';

Jesus taught us to <Ref bible="Matthew 5:44">love our enemies</Ref>.
```

**Result:** Tooltip shows full ESV text of Matthew 5:44 (fetched at build time).

### Term Definitions

```mdx
The concept of <Ref term="Imago Dei" definition="Latin for 'Image of God'—the biblical teaching that all humans reflect God's nature and possess intrinsic worth (Genesis 1:27).">Imago Dei</Ref> is foundational.
```

### Internal Cross-References

```mdx
See my post on <Ref href="/blog/elshaddai-philosophy">faith-driven work</Ref> for more.
```

### External Links

```mdx
Check out <Ref href="https://example.com" external>this resource</Ref>.
```

### Custom Tooltips

```mdx
The <Ref tooltip="This is any custom content you want to display">technical term</Ref> requires explanation.
```

### Multiple References in One Sentence

```mdx
Biblical <Ref term="justice" definition="Fair treatment according to law, distinct from mercy or compassion">justice</Ref> requires <Ref bible="Deuteronomy 16:19">impartiality</Ref>, <Ref bible="Deuteronomy 1:16-17">due process</Ref>, and <Ref bible="Romans 13:1-7">respect for law</Ref>.
```

---

## Callout Component

Highlighted info boxes for important notes.

### Types

**Info** (blue, default):
```mdx
import Callout from '../../components/layout/Callout.astro';

<Callout type="info" title="Intended Audience">
This post is for Christians who want to think clearly about immigration without being guilt-tripped.
</Callout>
```

**Warning** (orange):
```mdx
<Callout type="warning" title="Common Mistake">
Don't confuse correlation with causation in this data.
</Callout>
```

**Success** (green):
```mdx
<Callout type="success" title="Biblical Compassion">
Real compassion is treating every person with dignity while maintaining wise boundaries.
</Callout>
```

**Note** (gray):
```mdx
<Callout type="note" title="Technical Detail">
This implementation uses the ESV API for real-time verse fetching.
</Callout>
```

**Historical** (sepia):
```mdx
<Callout type="historical" title="The Actual Nativity Story">
Luke 2:1-7 records that Mary and Joseph traveled to Bethlehem for a Roman census...
</Callout>
```

---

## Migration Guide

### Old Structure → New Structure

**Before:**
```mdx
import Ref from '../../components/Ref.astro';
import Callout from '../../components/Callout.astro';
import TooltipSidebar from '../../components/sidebar/TooltipSidebar.astro';
```

**After:**
```mdx
import Ref from '../../components/interactive/Ref.astro';
import Callout from '../../components/layout/Callout.astro';
import TooltipSidebar from '../../components/interactive/TooltipSidebar.astro';
```

### Component Locations

| Component | Old Path | New Path |
|-----------|----------|----------|
| Ref | `components/Ref.astro` | `components/interactive/Ref.astro` |
| TooltipSidebar | `components/sidebar/TooltipSidebar.astro` | `components/interactive/TooltipSidebar.astro` |
| Callout | `components/Callout.astro` | `components/layout/Callout.astro` |
| BlogHero | `components/BlogHero.astro` | `components/blocks/BlogHero.astro` |
| DropCap | `components/DropCap.astro` | `components/blocks/DropCap.astro` |
| PullQuote | `components/PullQuote.astro` | `components/blocks/PullQuote.astro` |
| AuthorBio | *(new)* | `components/blocks/AuthorBio.astro` |

### Layouts

| Layout | Old Path | New Path |
|--------|----------|----------|
| BlogPost | `layouts/BlogPost.astro` | `layouts/BlogPost.astro` *(updated imports)* |
| SimpleBlogLayout | *(new)* | `layouts/templates/SimpleBlogLayout.astro` |

---

## Design Token Usage

### Spacing Scale

Use CSS variables for consistent spacing:

```css
/* Component spacing example */
.my-component {
  padding: var(--space-xl);        /* 32px */
  margin-bottom: var(--space-2xl);  /* 48px */
  gap: var(--space-md);             /* 16px */
}
```

Available spacing tokens:
- `--space-xs`: 4px
- `--space-sm`: 8px
- `--space-md`: 16px
- `--space-lg`: 24px
- `--space-xl`: 32px
- `--space-2xl`: 48px
- `--space-3xl`: 64px

### Border Radius

```css
.card {
  border-radius: var(--radius-lg);  /* 12px */
}

.button {
  border-radius: var(--radius-full);  /* 9999px - pill shape */
}
```

Available radius tokens:
- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 16px
- `--radius-full`: 9999px

### Shadows

```css
.card {
  box-shadow: var(--shadow-lg);
}

.card:hover {
  box-shadow: var(--shadow-xl);
}
```

Available shadow tokens:
- `--shadow-sm`: Subtle elevation
- `--shadow-md`: Standard card shadow
- `--shadow-lg`: Prominent elevation
- `--shadow-xl`: Maximum depth

### Color System

```css
.custom-component {
  background: var(--bg-primary);     /* Main background */
  color: var(--text-primary);        /* Main text */
  border: 1px solid var(--border);   /* Border color */
}

.custom-component:hover {
  background: var(--bg-secondary);
  color: var(--accent);
}
```

Available color tokens:
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--accent`, `--accent-hover`
- `--border`
- `--card-bg`, `--card-hover`

---

## Complete Example: Full Blog Post

Putting it all together:

```mdx
---
layout: ../../layouts/templates/SimpleBlogLayout.astro
title: "Building Faith-Driven Software"
description: "How biblical principles shape my approach to engineering and product development"
pubDate: 'Jan 20 2026'
heroImage: '/images/blog/faith-driven-software.jpg'
gradient: 'purple'
tags: ['philosophy', 'software', 'faith']
---

import DropCap from '../../components/blocks/DropCap.astro';
import PullQuote from '../../components/blocks/PullQuote.astro';
import Ref from '../../components/interactive/Ref.astro';
import Callout from '../../components/layout/Callout.astro';

<Callout type="info" title="Who This Is For">
This post is for developers who want to integrate their faith with their craft—not compartmentalize them.
</Callout>

<DropCap>T</DropCap>wenty-one years in the Navy taught me that mission clarity drives execution excellence. The same principle applies to software engineering.

<PullQuote attribution="Colossians 3:23">
Whatever you do, work heartily, as for the Lord and not for men.
</PullQuote>

When I build software, I'm not just solving technical problems—I'm stewarding the <Ref term="Imago Dei" definition="Latin for 'Image of God'—the biblical teaching that all humans reflect God's nature and possess intrinsic worth (Genesis 1:27).">image of God</Ref> in users and teammates.

## The Principle of Stewardship

The Bible teaches faithful stewardship in <Ref bible="Matthew 25:14-30">the parable of the talents</Ref>. This applies directly to:

- **Code quality** - Writing maintainable, well-tested code honors God
- **Team dynamics** - <Ref bible="Philippians 2:3-4">Treating teammates with humility</Ref>
- **User experience** - Serving users with excellence reflects God's character

<Callout type="success" title="Key Insight">
Faith-driven software isn't about adding Bible verses to your UI—it's about bringing biblical wisdom to every technical and human decision.
</Callout>

## Practical Applications

1. **Design for human flourishing** - Not just engagement metrics
2. **Build with integrity** - No dark patterns, no deception
3. **Prioritize people** - Over profits and productivity alone

For more on this philosophy, see my post on <Ref href="/blog/elshaddai-philosophy">ElShaddai: The God Who Provides</Ref>.

---

*Senior Chief Petty Officer (Ret.), now building software that serves families and communities. 21 years of naval service taught me that clear thinking and biblical wisdom aren't opposites—they're partners.*
```

---

## Tips for Friends Using This System

### Getting Started

1. **Use SimpleBlogLayout** for new posts - it's the easiest entry point
2. **Start simple** - Just frontmatter + content, add components later
3. **Add tooltips gradually** - Start with Bible verses, expand to terms
4. **Customize the author bio** once, reuse everywhere

### Component Combinations

**For theological posts:**
- Use `<Ref bible="...">` for Scripture references
- Use `<Callout type="historical">` for biblical context
- Use `<Ref term="...">` for theological terms

**For technical posts:**
- Use `<Callout type="note">` for technical details
- Use `<PullQuote>` for key insights
- Use `<Ref href="...">` for documentation links

**For opinion/philosophy posts:**
- Use `<DropCap>` on opening paragraph
- Use `<PullQuote>` for memorable quotes
- Use `<Callout type="info">` for audience targeting

### Asset Management

**Images:**
- Hero images: `public/images/blog/post-name-hero.jpg`
- Avatar: `public/images/avatar.jpg`
- Inline images: `public/images/blog/post-name-figure-1.jpg`

**Optimal sizes:**
- Hero: 1200×600px (2:1 ratio)
- Avatar: 200×200px (square)

---

## Questions?

Check out:
- `docs/BLOG_COMPONENTS.md` - Component API reference
- `docs/webcore-ui-analysis.md` - Architecture decisions
- `src/layouts/templates/SimpleBlogLayout.astro` - Template source

Happy blogging! 🎉
