# Blog Post Creation Template

**For Claude Code Web (Research Preview) and AI Assistants**

This template ensures blog posts are created in the correct MDX format for unjoe.me with proper frontmatter and structure.

---

## File Location

Create new blog posts in:
```
src/content/blog/your-post-slug.mdx
```

**File naming convention:**
- Use lowercase kebab-case
- Be descriptive but concise
- Example: `agent-ready-manifesto.mdx`, `building-family-os.mdx`

---

## MDX Frontmatter Template

Every blog post MUST start with YAML frontmatter enclosed in `---`:

```yaml
---
title: "Your Post Title"
description: "A compelling 1-2 sentence description of the post (used for SEO and previews)"
pubDate: 'Jan 15 2025'
heroImage: '/images/blog/your-post-slug-hero.jpg'
heroImageAlt: 'Description of the hero image for accessibility'
heroImagePrompt: 'Detailed AI image generation prompt for DALL-E (optional, for future image generation)'
tags: ['tag1', 'tag2', 'tag3']
draft: true
---
```

### Frontmatter Field Definitions

| Field | Required | Format | Description |
|-------|----------|--------|-------------|
| `title` | ✅ Yes | String | Post title (will appear as H1) |
| `description` | ✅ Yes | String | SEO description, 1-2 sentences |
| `pubDate` | ✅ Yes | 'Month DD YYYY' | Publication date (e.g., 'Jan 15 2025') |
| `heroImage` | ❌ No | Path string | Path to hero image (starts with `/images/blog/`) |
| `heroImageAlt` | ❌ No | String | Alt text for hero image (important for accessibility) |
| `heroImagePrompt` | ❌ No | String | Prompt for AI image generation (optional) |
| `tags` | ✅ Yes | Array of strings | Relevant tags (lowercase kebab-case) |
| `draft` | ❌ No | Boolean | `true` for drafts (default: false) |

### Series Posts (Optional)

For multi-part series, add these fields:

```yaml
series: 'Series Name'
seriesPart: 1
seriesTotal: 10
```

---

## Content Guidelines

### Markdown Formatting

After frontmatter, write content in Markdown/MDX:

```mdx
# Main Post Title (optional, will use frontmatter title)

## Introduction

Your opening paragraph should hook the reader...

## Section Heading

Regular paragraphs with **bold**, *italic*, and `code` formatting.

### Subsection

- Bullet points
- For lists
- And ideas

1. Numbered lists
2. For sequential items
3. Or rankings

## Code Examples

\`\`\`javascript
// Code blocks with syntax highlighting
function example() {
  return "Hello World";
}
\`\`\`

## Blockquotes

> Important callouts or quotes
> Can span multiple lines

## Links and Images

[Link text](https://example.com)

![Image alt text](/images/blog/image.jpg)
```

### Astro Components (Advanced)

You can use custom Astro components:

```mdx
<Ref bible="Matthew 2:13-15">Matthew 2:13-15</Ref>

<Ref href="/blog/other-post">related post</Ref>

<Callout type="info" title="Note">
Important information here
</Callout>
```

**Callout types:** info, warning, success, note, historical

---

## Tag Guidelines

Use existing tags when possible. Common tags:

**Technical:**
- `ai-development`
- `developer-experience`
- `claude-code`
- `engineering`
- `architecture`

**Leadership/Career:**
- `leadership`
- `career`
- `navy`
- `philosophy`

**Personal/Family:**
- `family-tech`
- `faith`
- `preparedness`

**Projects:**
- `projects`
- `popkit`
- `genesis`
- `daniel-son`

---

## Complete Example

```mdx
---
title: "Building a Family OS: Why I Created Genesis"
description: "How 21 years in the Navy taught me that families need systems thinking just as much as organizations do."
pubDate: 'Dec 15 2025'
heroImage: '/images/blog/building-family-os-hero.jpg'
heroImageAlt: 'Modern family using digital tools together'
tags: ['family-tech', 'projects', 'leadership', 'genesis']
draft: true
---

# Building a Family OS: Why I Created Genesis

After two decades of managing complex naval systems, I realized my family deserved the same level of operational excellence I brought to my job.

## The Problem

Most families operate reactively...

## The Solution

I built Genesis - a family operating system that brings military-grade organization to civilian life.

### Key Features

1. **Shared Calendar** - Everyone knows the plan
2. **Task Management** - Chores and responsibilities
3. **Document Repository** - Important papers, always accessible

## How It Works

\`\`\`typescript
// Example of family task automation
const familySchedule = {
  monday: ['School pickup: 3pm', 'Dinner: 6pm'],
  tuesday: ['Soccer practice: 4pm']
};
\`\`\`

## Lessons Learned

The biggest insight? **Systems thinking applies everywhere**...

---

*This post is part of my journey sharing how naval leadership principles translate to civilian life and family management.*
```

---

## Checklist Before Creating PR

When you create a new blog post in a branch:

- [ ] File is in `src/content/blog/` directory
- [ ] File name uses kebab-case and ends with `.mdx`
- [ ] Frontmatter includes all required fields (title, description, pubDate, tags)
- [ ] `draft: true` is set (unless explicitly ready to publish)
- [ ] Tags use existing tags when possible
- [ ] Content is well-structured with clear headings
- [ ] Code blocks include language identifier for syntax highlighting
- [ ] Links and images use proper paths
- [ ] Hero image path is correct (or omitted if none)
- [ ] Description is compelling and under 160 characters (SEO)

---

## Draft Workflow

1. **Create:** Set `draft: true` in frontmatter
2. **Review:** Post appears at http://localhost:4323/drafts in development
3. **Approve:** Change `draft: false` when ready to publish
4. **Deploy:** Push to `main` branch to go live

---

## Common Mistakes to Avoid

❌ **Don't:**
- Use spaces in file names (`my post.mdx` ❌)
- Forget the frontmatter `---` delimiters
- Use absolute URLs for internal links
- Mix quote styles in YAML (`'` vs `"`)
- Create generic descriptions ("This is a blog post about...")

✅ **Do:**
- Use kebab-case file names (`my-post.mdx` ✅)
- Include descriptive, specific frontmatter
- Use relative paths for internal links
- Be consistent with quote style
- Write compelling descriptions that make people want to read

---

## Questions?

If Claude Code Web encounters issues:
1. Check this template
2. Review existing posts in `src/content/blog/` for examples
3. Verify frontmatter syntax with a YAML validator
4. Ensure file is saved as `.mdx` not `.md`

---

**Last Updated:** January 1, 2026
**Maintained By:** Joseph Cannon
