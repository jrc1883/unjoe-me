# Hero Image Prompt Template

**For generating consistent, high-quality blog post hero images using DALL-E 3**

---

## Core Framework

Every hero image prompt should follow this structure:

```
[SUBJECT/CONCEPT] + [VISUAL STYLE] + [SPECIFIC ELEMENTS] + [COMPOSITION] + [TECHNICAL SPECS]
```

---

## 1. SUBJECT/CONCEPT (What to show)

**For Technical/Code Topics:**
- Specific file/folder names (not generic)
- Exact hierarchy and relationships
- Real-world examples from your stack

**For Conceptual Topics:**
- Concrete visual metaphor
- Recognizable symbols/icons
- Clear before/after if applicable

**Examples:**
- ✅ "Repository structure showing: `.github/workflows/`, `src/components/`, `CLAUDE.md`, `package.json`"
- ❌ "A well-organized codebase"

---

## 2. VISUAL STYLE (Consistent aesthetic)

**Your Brand Style:**
```
Modern, minimalist technical illustration with:
- Dark navy blue background (#0a0a0b to #1a1a2e gradient)
- Glowing electric blue accents (#3b82f6, #60a5fa)
- Clean geometric shapes (rounded rectangles, connecting lines)
- Subtle depth with shadows and highlights
- Professional tech aesthetic (think VS Code dark theme meets Apple design)
```

**Lighting/Atmosphere:**
- Soft blue glow emanating from key elements
- Subtle shadows for depth (not harsh)
- Hint of ambient light on edges
- No harsh gradients (smooth transitions)

---

## 3. SPECIFIC ELEMENTS (The Details)

### For Repository/File Structure Images:

**Folder Representation:**
```
Folders as:
- 3D rounded rectangle boxes with subtle depth
- Electric blue outline glow
- Dark translucent fill showing depth
- Folder icon in top-left corner
- Name label in clean sans-serif font (Inter or similar)
```

**File Representation:**
```
Files as:
- Flat rounded rectangles (less depth than folders)
- File-type icon (document, code, config)
- Blue accent line on left edge
- Filename in monospace font (Fira Code or similar)
- Extension clearly visible (.md, .js, .json)
```

**Connections/Hierarchy:**
```
Show relationships with:
- Thin electric blue connecting lines (not arrows unless showing flow)
- Tree structure branches (parent to children)
- Subtle glow where lines connect to elements
- Clear visual hierarchy (parent larger, indented children)
```

### For Conceptual/Workflow Images:

**Process Flow:**
```
Represent steps as:
- Numbered hexagons or rounded squares
- Left-to-right flow (Western reading direction)
- Arrows showing direction with glow effect
- Each step labeled clearly
- 3-5 steps maximum for clarity
```

**Before/After Comparisons:**
```
Split screen composition:
- LEFT: "Before" - chaotic, red/orange warning tones
- RIGHT: "After" - organized, green/blue success tones
- Clear dividing line (vertical, subtle glow)
- Same elements shown, different arrangements
- Visual cues: checkmarks (after), warning icons (before)
```

---

## 4. COMPOSITION (Layout & Balance)

**Layout Guidelines:**
```
Aspect Ratio: 16:9 (1792x1024 for DALL-E 3)
Orientation: Landscape (horizontal)
Safe Zones: Keep important elements away from edges

Typical Layouts:

1. CENTERED DIAGRAM
   - Main subject in center 60% of frame
   - Supporting elements radially around it
   - Breathing room (not cramped)

2. LEFT-WEIGHTED
   - Main concept on left 40%
   - Supporting details on right 60%
   - Good for hierarchy/flow diagrams

3. SPLIT COMPARISON
   - 50/50 left-right split
   - Before (left) vs After (right)
   - Center divider line
```

**Visual Balance:**
- No single element dominates >40% of space
- Equal visual weight on left/right
- Key concept clearly identifiable in 3 seconds
- Not too busy (5-8 main elements max)

---

## 5. TECHNICAL SPECS (Always Include)

```
Technical requirements:
- Aspect ratio: 16:9 landscape
- Resolution: 1792x1024 (DALL-E 3 landscape HD)
- No text smaller than would be readable at 800px width
- High contrast for readability
- No gradients that cause banding
- Clean edges (not blurry or oversharpened)
```

---

## Complete Prompt Template

### For Repository Structure Posts:

```
A modern, minimalist technical diagram showing a well-organized repository structure on a dark navy blue background (#0a0a0b to #1a1a2e gradient).

SPECIFIC FILES AND FOLDERS (shown as 3D rounded rectangles with electric blue glow):
- Root folder: "my-project/" (top-level, larger)
  - ".github/" folder containing:
    - "workflows/" subfolder with "ci.yml" file icon
    - "PULL_REQUEST_TEMPLATE.md" file icon
  - "src/" folder containing:
    - "components/" subfolder
    - "utils/" subfolder
    - "main.ts" file with TypeScript icon
  - "CLAUDE.md" file with document icon (highlighted with brighter glow)
  - "README.md" file with document icon
  - "package.json" file with config icon

VISUAL STYLE:
- Folders: 3D rounded rectangles with blue outline glow, dark translucent fill
- Files: Flat rounded rectangles with file-type icons and blue left-edge accent
- Connections: Thin electric blue lines showing tree hierarchy
- Font: Clean sans-serif for folders, monospace for filenames
- Subtle shadows for depth
- Soft blue glow on key elements (CLAUDE.md highlighted brightest)

COMPOSITION:
- Tree structure flowing top-to-bottom or left-to-right
- Clear parent-child relationships via connecting lines
- Centered in frame with breathing room
- Most important file (CLAUDE.md) visually prominent

TECHNICAL:
- 16:9 landscape aspect ratio
- High contrast for readability
- Professional tech aesthetic
- Clean, precise edges
```

### For Conceptual/Workflow Posts:

```
A modern, minimalist illustration showing [SPECIFIC WORKFLOW/CONCEPT] on a dark navy blue background.

SPECIFIC ELEMENTS:
[List exactly what to show - be concrete, not abstract]
Example:
- Step 1 (left): Developer at laptop with code on screen
- Arrow with "AI Assistant" label pointing right
- Step 2 (center): Claude Code interface reviewing pull request
- Arrow with "Automated Tests" label pointing right
- Step 3 (right): Green checkmark indicating approved merge

VISUAL STYLE:
- Dark navy blue background with subtle gradient
- Electric blue (#3b82f6) accents and highlights
- Glowing elements for emphasis
- Minimal, clean geometric shapes
- Professional tech aesthetic

COMPOSITION:
- Left-to-right flow
- 3-5 main steps/elements
- Clear directional arrows between steps
- Centered with balanced spacing
- Important elements have subtle glow

TECHNICAL:
- 16:9 landscape (1792x1024)
- High contrast
- No text smaller than readable at 800px width
```

### For Abstract/Metaphor Posts:

```
A modern, minimalist conceptual illustration representing [CLEAR METAPHOR] on a dark navy blue background.

VISUAL METAPHOR:
[Describe the specific metaphor clearly]
Example: "A tangled ball of yarn on the left (representing chaotic code) transforming into a neatly organized skein on the right (representing organized repository), connected by a smooth flowing line showing the transformation"

SPECIFIC ELEMENTS:
- LEFT: [Describe chaos/problem state]
- CENTER: [Describe transformation/solution]
- RIGHT: [Describe organized/success state]

VISUAL STYLE:
[Same as above - maintain brand consistency]

COMPOSITION:
- Split layout or transformation flow
- Clear visual progression
- Symbolic but not abstract
- Immediately understandable concept

TECHNICAL:
[Same technical specs]
```

---

## Prompt Writing Checklist

Before finalizing any hero image prompt:

- [ ] **Specific**: Named exact files/folders/elements (not generic terms)
- [ ] **Complete**: Included all 5 sections (Subject, Style, Elements, Composition, Technical)
- [ ] **Consistent**: Matches brand aesthetic (dark blue, electric blue glow)
- [ ] **Actionable**: DALL-E can visualize everything described
- [ ] **Concise**: Under 500 words (DALL-E has limits)
- [ ] **Readable**: Key elements visible at thumbnail size
- [ ] **Balanced**: Not too busy, not too empty (5-8 main elements)
- [ ] **Accurate**: If showing code/files, they're real examples from your work

---

## Common Pitfalls to Avoid

❌ **Too Generic:**
- "A well-organized codebase" → WHAT files? WHICH structure?
- "Modern tech aesthetic" → BE SPECIFIC about colors, style

❌ **Too Abstract:**
- "Representing AI understanding" → SHOW the actual mechanism
- "Symbolizing efficiency" → USE concrete before/after comparison

❌ **Too Busy:**
- Showing 20+ files → Pick 5-8 most important
- Multiple competing focal points → ONE clear subject

❌ **Inconsistent Style:**
- Mixing illustration styles (realistic + abstract)
- Different color schemes per image
- Varying levels of detail

✅ **Good Example:**
"Repository structure tree showing SPECIFIC files: root folder 'my-app/' containing '.github/workflows/ci.yml', 'src/components/', 'CLAUDE.md' (highlighted with bright blue glow), 'package.json'. Folders as 3D rounded rectangles with blue outline, files as flat rectangles with icons. Tree structure with connecting lines. Dark navy background (#0a0a0b), electric blue accents (#3b82f6). 16:9 landscape."

---

## Model-Specific Tuning

Different AI image models have different strengths. You may need to adjust prompts:

**OpenAI DALL-E 3** (Recommended):
- ✅ Excellent at technical diagrams and UI mockups
- ✅ Good with specific file/folder structures
- ✅ Handles text labels well at reasonable sizes
- ✅ Consistent brand colors with hex codes
- ⚠️ Sometimes adds extra creative elements - be very explicit about "exactly" and "only"
- **Tip**: Use "technical diagram" and "minimalist" to reduce artistic interpretation

**Google Gemini (Alternative)**:
- ✅ Good at artistic interpretation and abstract concepts
- ✅ Interesting visual metaphors
- ⚠️ Less precise with technical diagrams
- ⚠️ More variation between generations
- ⚠️ May interpret "blue" differently without hex codes
- **Tip**: May need to emphasize "realistic" and provide more visual references

**Adjusting Prompts for Different Models:**
- DALL-E: Can be more concise, trusts structure
- Gemini: May need more visual description, less technical jargon
- Both: Always specify hex colors for consistency

## Testing Your Prompts

**Before generating images:**

1. **Read it aloud** - Does it paint a clear picture?
2. **Sketch it** - Can you roughly draw what it should look like?
3. **Check specificity** - Are files/folders named exactly?
4. **Verify brand consistency** - Dark blue bg, electric blue accents?
5. **Count elements** - 15-25 items for dense technical diagrams? Not overcrowded?

**After first generation:**

1. **Regenerate 2-3 times** - How much variation? (Should be minimal)
2. **Check at thumbnail size** - Still clear and readable?
3. **Verify accuracy** - Do file names match your actual project?
4. **Brand alignment** - Matches site aesthetic?

---

## Version History

- v1.0 (2026-01-01): Initial framework based on unjoe.me blog needs
- Based on successful OpenAI DALL-E 3 generations
- Optimized for technical content (code, repositories, workflows)

---

**Next Steps:**
1. Use this template to improve all 10 Agent-Ready Development series prompts
2. Test with manual generation (2-3 images)
3. Refine template based on results
4. Once consistent, automate for batch generation
