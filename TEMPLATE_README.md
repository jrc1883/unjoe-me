# Artist Portfolio Template - Quick Start Guide

A beautiful, minimal portfolio website for visual artists, photographers, and creatives. No coding experience required!

## What You Get

- Stunning portfolio gallery with lightbox
- Professional about page
- Contact form
- Optional blog
- Instagram feed integration
- Mobile-responsive design
- Fast, free hosting on Cloudflare Pages

## Installation (5 Minutes)

### Step 1: Install Required Software

1. **Download Node.js**: https://nodejs.org/
   - Click "Download LTS" (Long Term Support)
   - Run the installer
   - Accept all default settings
   - Restart your computer

2. **Download Git**: https://git-scm.com/
   - Click "Download for Windows/Mac"
   - Run installer
   - Accept all defaults

### Step 2: Create Your Portfolio

Open Terminal (Mac) or Command Prompt (Windows) and run:

```bash
# Download template
git clone https://github.com/your-username/artist-portfolio-template.git my-portfolio

# Go into folder
cd my-portfolio

# Install dependencies (takes 2-3 minutes)
npm install

# Start the site
npm run dev
```

Visit `http://localhost:4321` in your browser - your site is running!

## Customization (15 Minutes)

### 1. Add Your Personal Info

Create a file called `.env` in the main folder (copy from `.env.example`):

```env
ARTIST_NAME=Your Name
ARTIST_TAGLINE=Visual Artist & Photographer
ARTIST_BIO=Brief description of your work
ARTIST_LOCATION=Your City, State

EMAIL=your@email.com
INSTAGRAM_USERNAME=yourhandle

SITE_URL=https://yourname.art
SITE_DESCRIPTION=Portfolio of Your Name - Visual Artist
```

Save the file. Refresh your browser. Your info appears!

### 2. Add Your First Artwork

1. Put image in `src/assets/portfolio/` folder
   - Recommended size: 1920px on longest side
   - Name it something simple: `sunset-1.jpg`

2. Create `src/content/portfolio/my-first-piece.md`:

```markdown
---
title: "Sunset at the Beach"
description: "A vibrant sunset photograph"
medium: "Photography"
year: 2024
category: "Photography"
featured: true
images:
  - src: "../../assets/portfolio/sunset-1.jpg"
    alt: "Beautiful sunset with orange and pink sky"
tags: ["photography", "sunset", "nature"]
price: "$500"
available: true
dimensions: "24x36 inches"
---

## About This Piece

I captured this sunset on a trip to California...

## Inspiration

The colors were so vibrant that...
```

3. Save and refresh - your artwork appears on the homepage!

### 3. Update Your About Page

Edit `src/pages/about.astro`:

- Add your photo to `public/images/profile.jpg`
- Update the education, exhibitions, and awards lists
- Customize the artist statement

### 4. Change Colors

Edit `src/layouts/Layout.astro` and find the `:root` section:

```css
:root {
  --color-primary: #111;        /* Change to your brand color */
  --color-secondary: #f9f9f9;
  --color-accent: #666;
}
```

## Adding More Artwork

For each piece:

1. Add image to `src/assets/portfolio/`
2. Create markdown file in `src/content/portfolio/`
3. Use this template:

```markdown
---
title: ""
description: ""
medium: ""
year: 2024
category: ""
featured: false
images:
  - src: "../../assets/portfolio/your-image.jpg"
    alt: ""
tags: []
price: ""
available: true
---

## About This Piece

## Inspiration
```

## Deploy to the Internet (Free!)

### Option 1: Cloudflare Pages (Recommended)

1. Create GitHub account: https://github.com/
2. Create new repository (name it anything)
3. In your terminal:

```bash
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

4. Go to https://dash.cloudflare.com/
5. Sign up for free account
6. Click "Workers & Pages" → "Create" → "Pages"
7. Connect to GitHub
8. Select your repository
9. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
10. Add environment variables (copy from your `.env` file)
11. Click "Deploy"

Your site is live at `your-project.pages.dev`!

### Custom Domain

1. Buy domain at Namecheap, GoDaddy, etc.
2. In Cloudflare Pages, click "Custom domains"
3. Add your domain
4. Update nameservers at your domain registrar
5. Wait 10 minutes - done!

## Common Tasks

### Add Blog Post

Create `src/content/blog/my-post.md`:

```markdown
---
title: "My Creative Process"
description: "How I create my artwork"
pubDate: 2025-01-15
heroImage: "../../assets/blog/process.jpg"
tags: ["process", "tips"]
---

## Introduction

Today I want to share...
```

### Hide Blog (If You Don't Want One)

In `.env` file:

```env
ENABLE_BLOG=false
```

### Add Instagram Feed

1. Get Instagram Access Token:
   - Go to https://developers.facebook.com/apps/
   - Create app
   - Add Instagram Basic Display
   - Generate token

2. Add to `.env`:

```env
INSTAGRAM_USERNAME=yourhandle
INSTAGRAM_ACCESS_TOKEN=your_token_here
ENABLE_INSTAGRAM=true
```

### Contact Form Setup

**Easy way (Formspree):**

1. Sign up at https://formspree.io/ (free)
2. Get your form endpoint
3. Add to `.env`:

```env
FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_ID
```

## File Organization

```
my-portfolio/
├── public/              # Static files (don't change often)
│   └── images/          # Put your profile photo here
├── src/
│   ├── assets/
│   │   ├── portfolio/   # PUT YOUR ARTWORK IMAGES HERE
│   │   └── blog/        # Blog post images
│   ├── components/      # Don't touch (unless you know CSS)
│   ├── content/
│   │   ├── portfolio/   # CREATE MARKDOWN FILES HERE
│   │   └── blog/        # Blog markdown files
│   ├── layouts/         # Where to change colors/fonts
│   └── pages/           # Main pages (home, about, contact)
├── .env                 # YOUR PERSONAL INFO GOES HERE
└── package.json         # Project config (don't edit)
```

## Help & Troubleshooting

### Images Not Showing?

- Check file path in markdown: `../../assets/portfolio/image.jpg`
- Make sure image is actually in that folder
- File names are case-sensitive!

### Changes Not Appearing?

- Stop the server (Ctrl+C)
- Run `npm run dev` again
- Hard refresh browser (Ctrl+Shift+R)

### Site Won't Start?

```bash
# Delete and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Need More Help?

- Check `ARTIST_PORTFOLIO_TEMPLATE.md` for detailed guide
- Check `TEMPLATE_FILES.md` for all code examples
- Ask in GitHub Issues

## What's Different from Other Portfolios?

### Made for Non-Technical Artists

- All personal info in ONE file (`.env`)
- Clear folder structure
- Markdown for content (not HTML)
- Step-by-step guides
- No complex build tools

### Artist-Specific Features

- Portfolio content collection (not "projects")
- Medium, dimensions, price fields
- Multiple images per artwork
- Instagram integration
- Purchase inquiry system
- Exhibition/awards sections

### Not Included (Because You Don't Need It)

- Database
- User accounts
- E-commerce (use Shopify/Etsy for that)
- Complex admin panel
- Analytics (add Google Analytics if needed)

## Customization Ideas

### Change Fonts

In `src/layouts/Layout.astro`:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
```

Then in the `<style>` section:

```css
html {
  font-family: 'Playfair Display', serif;
}
```

### Change Grid Layout

In `src/components/PortfolioGrid.astro`:

```astro
<PortfolioGrid items={items} columns={4} />
<!-- Change to 2, 3, or 4 columns -->
```

### Add New Page

1. Create `src/pages/exhibitions.astro`
2. Copy structure from `about.astro`
3. Customize content
4. Add link in `src/components/Header.astro`

## Features Checklist

- [ ] Personal info updated in `.env`
- [ ] Profile photo added
- [ ] 3-5 artworks added
- [ ] About page customized
- [ ] Contact form configured
- [ ] Instagram connected (optional)
- [ ] Colors customized
- [ ] Tested on mobile
- [ ] Deployed to internet
- [ ] Custom domain connected

## Next Steps

1. Add more artwork (aim for 10-15 pieces minimum)
2. Write artist statement
3. Add blog posts about your process
4. Connect social media
5. Share with friends/collectors!

## Credits

Built with:
- Astro (static site generator)
- Tailwind CSS (styling)
- Cloudflare Pages (hosting)

Template based on joseph-cannon-portfolio, simplified for artists.

## License

MIT - Use freely for your personal portfolio!

---

Questions? Create an issue on GitHub or email support@example.com

Happy creating!
