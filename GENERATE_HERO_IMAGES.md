# Hero Image Generation Guide

**Quick reference for generating hero images for the Agent-Ready Development series**

---

## Current Status

✅ **All 10 prompts ready** - Highly detailed and specific
✅ **Template framework created** - Use for future blog posts
✅ **Brand consistency defined** - Dark navy + electric blue aesthetic

---

## How to Generate Images

### Option 1: OpenAI DALL-E 3 (Recommended)

**Via ChatGPT Plus:**
1. Open ChatGPT (https://chat.openai.com)
2. Start new chat with DALL-E 3
3. Copy the `heroImagePrompt` from the blog post frontmatter
4. Paste and send
5. Download the generated image (1792x1024)
6. Save to: `public/images/blog/agent-ready-0N-hero.jpg`
7. Refresh localhost to see it

**Via OpenAI API (future automation):**
```bash
# Not implemented yet - manual for now
# Future: npm run generate-hero-images
```

### Option 2: Google Gemini (Alternative)

1. Go to Google AI Studio
2. Use "Generate Image" with Gemini
3. Same prompt process as DALL-E
4. May need to regenerate 2-3 times for best result

---

## Where to Find Prompts

Each blog post has the prompt in its frontmatter:

```bash
# Example: View prompt for Post 01
head -10 src/content/blog/agent-ready-01-manifesto.mdx | grep heroImagePrompt
```

Or just open the `.mdx` file and look for the `heroImagePrompt:` field (line 6-7).

---

## Image Specifications

**Required:**
- **Aspect Ratio**: 16:9 landscape
- **Resolution**: 1792x1024 (DALL-E 3 HD landscape)
- **Format**: JPEG or PNG
- **Location**: `public/images/blog/agent-ready-0N-hero.jpg`

**File Naming:**
- Post 01: `agent-ready-01-hero.jpg`
- Post 02: `agent-ready-02-hero.jpg`
- ...
- Post 10: `agent-ready-10-hero.jpg`

---

## Testing Process (Recommended)

**Start with Posts 1-3:**
1. Generate hero images for posts 1, 2, and 3
2. Check consistency (should look like they're from same series)
3. Verify brand alignment (dark navy bg, electric blue accents)
4. Test readability at thumbnail size
5. **If satisfied:** Generate remaining 7 images
6. **If adjustments needed:** Update template, regenerate

---

## Regeneration Tips

If an image doesn't match expectations:

**Too Abstract?**
- Add more specific file/folder names to prompt
- Request "realistic technical diagram" style
- Emphasize "exactly as shown" and "only these elements"

**Wrong Colors?**
- Emphasize "dark navy blue background (#0a0a0b)"
- Emphasize "electric blue accents (#3b82f6)"
- DALL-E handles hex codes well, Gemini may need 2-3 tries

**Too Busy?**
- Current prompts show ~20 items per side (dense but readable)
- If too crowded, reduce to 15 items
- Emphasize "minimalist" and "clean" and "readable at thumbnail size"

**Not Technical Enough?**
- Add "technical diagram" or "software architecture diagram"
- Request "VS Code dark theme aesthetic"
- Be more explicit: "tree structure with connecting lines"

**Model Differences:**
- **OpenAI DALL-E 3**: Better for technical accuracy, file structures, UI mockups
- **Google Gemini**: More artistic, may need more regenerations for consistency
- Use whichever gives you the best results for your aesthetic

---

## Workflow

```
┌─────────────────────────────────────┐
│ 1. Copy heroImagePrompt from MDX    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 2. Paste into ChatGPT/DALL-E 3      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 3. Download 1792x1024 image         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 4. Save to public/images/blog/      │
│    as agent-ready-0N-hero.jpg       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 5. Refresh localhost:4323/drafts    │
│    to see image on post             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 6. Regenerate if needed (2-3 tries) │
└─────────────────────────────────────┘
```

---

## Quality Checklist

Before accepting a generated image:

- [ ] **Brand Colors**: Dark navy background, electric blue accents?
- [ ] **Specificity**: Shows actual file/folder names from prompt?
- [ ] **Readability**: Clear at thumbnail size (400px width)?
- [ ] **Consistency**: Matches style of other images in series?
- [ ] **Accuracy**: Correctly represents the blog post topic?
- [ ] **Technical**: 16:9 aspect ratio, HD resolution?
- [ ] **Clean**: No blur, artifacts, or distortion?

---

## Current Prompts Summary

| Post | Topic | Key Visual Elements |
|------|-------|---------------------|
| 01 | Manifesto | Split-screen: chaotic vs organized repo |
| 02 | Foundation Files | README, CLAUDE.md, CONTRIBUTING as pillars |
| 03 | Branch Protection | GitHub PR with CI checks, protected branch |
| 04 | Issue Templates | GitHub issue forms (Bug/Feature) |
| 05 | Milestones | Project board with Kanban columns, v2.0 milestone |
| 06 | Documentation | Layered docs feeding AI context processor |
| 07 | Hooks | Pre-commit workflow with validation checks |
| 08 | Monorepo | apps/, packages/, Turborepo pipeline |
| 09 | Human-AI Workflow | 6-stage collaboration loop (Issue #47) |
| 10 | PopKit | Command center orchestrating 7 practices |

---

## Fallback (If No Images)

The site works perfectly without hero images:
- Shows branded gradient fallback
- Still looks professional
- Can add images later

**So don't stress if generation takes time!**

---

## Next Steps

1. **Test with Post 01-03** - Generate 3 images manually
2. **Review results** - Check consistency and quality
3. **Refine prompts if needed** - Update template based on learnings
4. **Generate remaining 7** - Complete the series
5. **Future automation** - Once prompts are proven, automate

---

## Questions?

- Prompt too long for ChatGPT? → Shorten by removing technical specs section
- Image doesn't match? → Try 2-3 regenerations before editing prompt
- Need different style? → Update `HERO_IMAGE_PROMPT_TEMPLATE.md` first

---

**Last Updated:** January 1, 2026
