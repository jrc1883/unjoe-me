# Artist Portfolio Template

A minimal, elegant portfolio template for visual artists, photographers, and creatives. Built with Astro, deployed to Cloudflare Pages.

**Based on:** joseph-cannon-portfolio
**Simplified for:** Non-technical artists who want a stunning portfolio without complexity

---

## Features

- Portfolio/Gallery content collection for artwork
- About page with artist bio
- Contact form
- Simple blog (optional)
- Instagram feed integration
- Mobile-responsive design
- Dark/light theme support
- Fast, static site generation

---

## Quick Start Guide for Non-Technical Artists

### Prerequisites

1. **Install Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   - Follow installer instructions

2. **Install Git**
   - Download from: https://git-scm.com/
   - Follow installer instructions

3. **Create accounts:**
   - GitHub account (free): https://github.com/
   - Cloudflare account (free): https://cloudflare.com/

### Installation Steps

```bash
# 1. Download this template
git clone https://github.com/your-username/artist-portfolio-template.git my-portfolio
cd my-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Your site will be running at `http://localhost:4321`

---

## Project Structure

```
my-portfolio/
├── src/
│   ├── assets/              # Your images go here
│   │   └── portfolio/       # Artwork images
│   ├── components/          # Reusable components (don't touch)
│   ├── content/
│   │   ├── portfolio/       # Your artwork entries (.md files)
│   │   └── blog/            # Blog posts (optional)
│   ├── layouts/             # Page templates (don't touch)
│   ├── pages/
│   │   ├── index.astro      # Homepage
│   │   ├── about.astro      # About page
│   │   ├── contact.astro    # Contact form
│   │   └── portfolio/       # Portfolio gallery pages
│   └── styles/              # Global styles
├── public/                  # Static files (favicon, etc.)
├── .env                     # YOUR PERSONAL INFO (see below)
├── package.json
└── astro.config.mjs
```

---

## Customization Guide

### Step 1: Add Your Personal Info

Create a file called `.env` in the root directory:

```env
# Your Information
ARTIST_NAME=Jane Doe
ARTIST_TAGLINE=Visual Artist & Photographer
ARTIST_BIO=I create compelling visual stories through photography and mixed media art.

# Contact & Social
EMAIL=hello@janedoe.com
INSTAGRAM_USERNAME=janedoe
INSTAGRAM_ACCESS_TOKEN=your_token_here
LINKEDIN_URL=https://linkedin.com/in/janedoe
FACEBOOK_URL=https://facebook.com/janedoe.art

# Site Configuration
SITE_URL=https://janedoe.art
SITE_DESCRIPTION=Portfolio of Jane Doe - Visual Artist specializing in abstract photography and mixed media.

# Contact Form (Cloudflare integration)
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token

# Optional: Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

**IMPORTANT:** Never commit this file to Git! It's already in `.gitignore`.

### Step 2: Add Your Artwork

Create markdown files in `src/content/portfolio/`:

**Example:** `src/content/portfolio/sunset-series.md`

```markdown
---
title: "Sunset Series"
description: "A collection of abstract sunset photographs"
medium: "Photography"
year: 2024
category: "Photography"
featured: true
images:
  - src: "../../assets/portfolio/sunset-1.jpg"
    alt: "Vibrant orange and pink sunset"
  - src: "../../assets/portfolio/sunset-2.jpg"
    alt: "Silhouette against twilight sky"
  - src: "../../assets/portfolio/sunset-3.jpg"
    alt: "Golden hour reflections"
tags: ["photography", "abstract", "nature"]
price: "$500" # optional
available: true # optional
dimensions: "24x36 inches" # optional
---

## About This Series

This series explores the ephemeral beauty of sunsets through abstract photography...

## Inspiration

I was inspired by...

## Process

My process involved...
```

### Step 3: Add Your Bio

Edit `src/pages/about.astro`:

Look for the `ARTIST_INFO` section and customize:

```astro
---
const ARTIST_INFO = {
  name: import.meta.env.ARTIST_NAME,
  bio: import.meta.env.ARTIST_BIO,
  image: "/images/profile.jpg", // Add your photo to public/images/
  location: "Brooklyn, NY",
  education: [
    "MFA in Photography, School of Visual Arts, 2020",
    "BFA in Fine Arts, Rhode Island School of Design, 2015"
  ],
  exhibitions: [
    "Solo Exhibition, Gallery X, 2024",
    "Group Show, Art Basel Miami, 2023"
  ],
  awards: [
    "Emerging Artist Award, 2023",
    "Best in Show, Photo Festival, 2022"
  ]
};
---
```

### Step 4: Customize Colors & Style

Edit `src/styles/global.css`:

```css
:root {
  /* Change these colors to match your brand */
  --color-primary: #1a1a1a;      /* Dark background */
  --color-secondary: #f5f5f5;    /* Light background */
  --color-accent: #ff6b6b;       /* Your signature color */
  --color-text: #333333;         /* Text color */
  --color-text-muted: #666666;   /* Secondary text */
}
```

---

## Adding Artwork - Step by Step

### 1. Prepare Your Images

**Recommended sizes:**
- **Thumbnails:** 800x800px (square, for grid display)
- **Full images:** 1920px on longest side (high quality)
- **Format:** JPEG (best for photos), PNG (for artwork with transparency)

**Tools:**
- Photoshop, Lightroom, or free tools like GIMP
- Online resizers: TinyPNG, Squoosh.app

### 2. Add Images to Project

Place images in `src/assets/portfolio/`:

```
src/assets/portfolio/
├── sunset-1.jpg
├── sunset-2.jpg
├── abstract-series-1.jpg
├── portrait-study.jpg
└── mixed-media-collage.jpg
```

### 3. Create Markdown File

Create `src/content/portfolio/your-artwork-name.md`:

```markdown
---
title: "Your Artwork Title"
description: "Brief description for SEO and previews"
medium: "Oil on Canvas" # or Photography, Mixed Media, etc.
year: 2024
category: "Painting" # or Photography, Sculpture, etc.
featured: true # Show on homepage?
images:
  - src: "../../assets/portfolio/your-image.jpg"
    alt: "Descriptive alt text for accessibility"
tags: ["abstract", "colorful", "large-format"]
price: "$1,200" # optional
available: true # optional
dimensions: "48x60 inches" # optional
---

## About This Piece

Tell the story behind this artwork...

## Medium & Technique

Describe your process...
```

### 4. Preview Your Work

```bash
npm run dev
```

Visit `http://localhost:4321/portfolio` to see your gallery!

---

## Instagram Feed Integration

### Get Instagram Access Token

1. Go to: https://developers.facebook.com/apps/
2. Create a new app (Business type)
3. Add Instagram Basic Display
4. Follow setup wizard
5. Generate access token
6. Copy token to `.env` file

### Configure Feed

Edit `src/components/InstagramFeed.astro`:

```astro
---
const INSTAGRAM_USERNAME = import.meta.env.INSTAGRAM_USERNAME;
const ACCESS_TOKEN = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
const FEED_LIMIT = 6; // How many posts to show
---
```

The feed will automatically display on your homepage!

---

## Contact Form Setup

### Option 1: Cloudflare Forms (Recommended - Free)

1. Deploy your site to Cloudflare Pages (see deployment section)
2. In Cloudflare dashboard, go to Workers & Pages > Your Site > Functions
3. Enable Forms
4. Update `.env` with your Cloudflare credentials

### Option 2: Formspree (Easiest)

1. Sign up at https://formspree.io/ (free tier: 50 submissions/month)
2. Get your form endpoint
3. Edit `src/pages/contact.astro`:

```astro
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- form fields -->
</form>
```

### Option 3: Email Directly

Simple mailto link (no spam protection):

```astro
<a href="mailto:your@email.com?subject=Portfolio Inquiry">Contact Me</a>
```

---

## Blog (Optional)

### Create a Blog Post

Create `src/content/blog/my-first-post.md`:

```markdown
---
title: "Behind the Scenes: My Creative Process"
description: "A peek into how I create my abstract photography"
pubDate: 2025-01-15
heroImage: "../../assets/blog/process-hero.jpg"
tags: ["process", "photography", "tips"]
---

## Introduction

Today I want to share my creative process...

## Step 1: Finding Inspiration

I start by...

## Step 2: Setup

My equipment includes...

## Step 3: Shooting

When I'm on location...

## Post-Processing

Back in the studio...
```

### Hide Blog (If You Don't Want One)

Edit `src/components/Header.astro` and remove:

```astro
<a href="/blog">Blog</a>
```

---

## Deployment to Cloudflare Pages

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: My artist portfolio"

# Create repo on GitHub, then:
git remote add origin https://github.com/your-username/my-portfolio.git
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages

1. Log in to Cloudflare dashboard
2. Go to "Workers & Pages" → "Create application" → "Pages"
3. Click "Connect to Git"
4. Select your GitHub repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** Add your `.env` variables here
6. Click "Save and Deploy"

Your site will be live at `your-project.pages.dev`!

### Step 3: Custom Domain

1. In Cloudflare Pages, go to your project → "Custom domains"
2. Click "Set up a custom domain"
3. Enter your domain (e.g., `janedoe.art`)
4. Follow DNS instructions
5. Wait for SSL certificate (automatic, ~10 minutes)

---

## Development Commands

```bash
# Start development server (with live reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy (push to GitHub triggers auto-deploy)
git add .
git commit -m "Update portfolio"
git push
```

---

## Common Customizations

### Change Homepage Layout

Edit `src/pages/index.astro`:

```astro
<!-- Show 6 featured artworks instead of 3 -->
const featured = portfolioItems
  .filter(item => item.data.featured)
  .slice(0, 6); // Change this number
```

### Add New Page

Create `src/pages/exhibitions.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Exhibitions">
  <h1>Past & Upcoming Exhibitions</h1>
  <!-- Your content -->
</Layout>
```

Then add to navigation in `src/components/Header.astro`.

### Change Fonts

Edit `src/styles/global.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

:root {
  --font-heading: 'Playfair Display', serif;
  --font-body: system-ui, sans-serif;
}
```

---

## Troubleshooting

### Images Not Showing

- Check file path: `../../assets/portfolio/image.jpg`
- Verify image is in `src/assets/portfolio/`
- Check file name spelling (case-sensitive!)

### Changes Not Appearing

- Restart dev server: `Ctrl+C`, then `npm run dev`
- Clear browser cache: `Ctrl+Shift+R` (hard refresh)

### Build Errors

```bash
# Clear cache and rebuild
rm -rf dist .astro node_modules/.astro
npm install
npm run build
```

### Contact Form Not Working

- Check `.env` variables are set
- Verify Cloudflare integration is enabled
- Check browser console for errors (F12)

---

## File Templates

### Portfolio Item Template

Save as `_TEMPLATE_portfolio.md` for reference:

```markdown
---
title: ""
description: ""
medium: ""
year: 2024
category: ""
featured: false
images:
  - src: "../../assets/portfolio/"
    alt: ""
tags: []
price: ""
available: true
dimensions: ""
---

## About This Piece

## Medium & Technique

## Inspiration
```

### Blog Post Template

Save as `_TEMPLATE_blog.md` for reference:

```markdown
---
title: ""
description: ""
pubDate: 2025-01-15
heroImage: "../../assets/blog/"
tags: []
---

## Introduction

## Main Content

## Conclusion
```

---

## SEO Tips for Artists

### 1. Use Descriptive Titles

Bad: "Untitled #4"
Good: "Abstract Sunset Photography - Vibrant Orange & Pink"

### 2. Write Alt Text for Images

```markdown
alt: "Abstract sunset photograph with vibrant orange and pink hues reflecting on water"
```

### 3. Add Descriptions

Every artwork should have a description explaining:
- What it depicts
- Medium/technique
- Size/dimensions
- Your artistic intention

### 4. Use Relevant Tags

```markdown
tags: ["abstract photography", "sunset", "nature", "landscape", "wall art"]
```

### 5. Update Site Description

In `.env`:

```env
SITE_DESCRIPTION=Contemporary abstract photography and mixed media art by Jane Doe. Available for purchase and commission.
```

---

## Performance Tips

### Optimize Images

Use Squoosh.app or TinyPNG to reduce file size:
- Thumbnails: 50-100 KB
- Full images: 200-400 KB

### Lazy Loading

Images automatically lazy-load (built into Astro).

### Fast Hosting

Cloudflare Pages = free + fast global CDN!

---

## Support & Resources

### Learn More

- **Astro Docs:** https://docs.astro.build/
- **Markdown Guide:** https://www.markdownguide.org/
- **Tailwind CSS:** https://tailwindcss.com/docs

### Get Help

- GitHub Issues: https://github.com/your-username/artist-portfolio-template/issues
- Astro Discord: https://astro.build/chat

---

## What's Included

### Components

- `Header.astro` - Navigation with mobile menu
- `Footer.astro` - Footer with social links
- `PortfolioGrid.astro` - Responsive artwork grid
- `PortfolioModal.astro` - Lightbox for images
- `ContactForm.astro` - Contact form with validation
- `InstagramFeed.astro` - Instagram integration
- `SEO.astro` - Meta tags for search engines

### Pages

- `index.astro` - Homepage with featured work
- `about.astro` - Artist bio & statement
- `contact.astro` - Contact form
- `portfolio/index.astro` - Full portfolio gallery
- `portfolio/[...slug].astro` - Individual artwork pages
- `blog/index.astro` - Blog listing (optional)
- `blog/[...slug].astro` - Blog post pages (optional)

### Styles

- Dark/light theme toggle
- Responsive grid layouts
- Smooth animations
- Print-friendly styles

---

## Differences from Developer Portfolio

**Removed:**
- Events/shows section (use for musicians)
- Complex bento grid layout
- Tech stack cards
- Resume/CV functionality
- Project cards with GitHub links

**Added:**
- Portfolio/gallery content collection
- Artwork detail pages with lightbox
- Medium/dimensions/price fields
- Instagram feed integration
- Simplified navigation
- Artist-focused About page

**Simplified:**
- Environment variables for ALL personal info
- Clear folder structure
- Step-by-step guides for non-technical users
- Templates for common tasks
- No build tools to configure

---

## Next Steps

1. **Customize** your `.env` file with personal info
2. **Add** your first 3-5 artworks to `src/content/portfolio/`
3. **Update** your About page with bio
4. **Test** locally with `npm run dev`
5. **Deploy** to Cloudflare Pages
6. **Share** your new portfolio!

---

## License

MIT License - Feel free to use for personal or commercial portfolios.

---

**Built with:** Astro 5 + Tailwind CSS 4
**Deployment:** Cloudflare Pages
**Maintenance:** Static site = no backend, no database, no ongoing costs!
