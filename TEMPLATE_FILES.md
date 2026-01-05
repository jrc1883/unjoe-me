# Artist Portfolio Template - File Contents

Complete file contents for the minimal artist portfolio template.

---

## Configuration Files

### `.env.example`

```env
# Artist Information
ARTIST_NAME=Jane Doe
ARTIST_TAGLINE=Visual Artist & Photographer
ARTIST_BIO=I create compelling visual stories through photography and mixed media art.
ARTIST_LOCATION=Brooklyn, NY

# Contact & Social
EMAIL=hello@janedoe.com
PHONE=+1-555-0123
INSTAGRAM_USERNAME=janedoe
INSTAGRAM_ACCESS_TOKEN=
FACEBOOK_URL=
LINKEDIN_URL=
TWITTER_URL=

# Site Configuration
SITE_URL=https://janedoe.art
SITE_DESCRIPTION=Portfolio of Jane Doe - Visual Artist specializing in abstract photography and mixed media.

# Contact Form (Choose one)
# Option 1: Cloudflare
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=

# Option 2: Formspree
FORMSPREE_ENDPOINT=

# Optional: Analytics
GOOGLE_ANALYTICS_ID=
FATHOM_SITE_ID=

# Feature Flags
ENABLE_BLOG=true
ENABLE_INSTAGRAM=true
ENABLE_SHOP=false
```

---

### `src/config.ts`

```typescript
// Configuration loaded from environment variables
// This makes customization easy without editing code

export const SITE_CONFIG = {
  // Artist Info
  name: import.meta.env.ARTIST_NAME || 'Your Name',
  tagline: import.meta.env.ARTIST_TAGLINE || 'Visual Artist',
  bio: import.meta.env.ARTIST_BIO || 'Artist bio goes here',
  location: import.meta.env.ARTIST_LOCATION || 'Location',

  // Contact
  email: import.meta.env.EMAIL || 'hello@example.com',
  phone: import.meta.env.PHONE || '',

  // Social Links
  social: {
    instagram: import.meta.env.INSTAGRAM_USERNAME || '',
    facebook: import.meta.env.FACEBOOK_URL || '',
    linkedin: import.meta.env.LINKEDIN_URL || '',
    twitter: import.meta.env.TWITTER_URL || '',
  },

  // Site Meta
  url: import.meta.env.SITE_URL || 'https://example.com',
  description: import.meta.env.SITE_DESCRIPTION || 'Artist portfolio',

  // Features
  features: {
    blog: import.meta.env.ENABLE_BLOG === 'true',
    instagram: import.meta.env.ENABLE_INSTAGRAM === 'true',
    shop: import.meta.env.ENABLE_SHOP === 'true',
  },

  // Instagram
  instagram: {
    username: import.meta.env.INSTAGRAM_USERNAME || '',
    accessToken: import.meta.env.INSTAGRAM_ACCESS_TOKEN || '',
  },
};

// Navigation items (customize based on enabled features)
export const NAV_ITEMS = [
  { label: 'Portfolio', href: '/portfolio' },
  SITE_CONFIG.features.blog && { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  SITE_CONFIG.features.shop && { label: 'Shop', href: '/shop' },
].filter(Boolean);
```

---

### `src/content.config.ts`

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Portfolio/Artwork Collection
const portfolio = defineCollection({
  loader: glob({ base: './src/content/portfolio', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    medium: z.string(), // Oil on Canvas, Photography, Mixed Media, etc.
    year: z.number(),
    category: z.string(), // Painting, Photography, Sculpture, etc.

    // Display
    featured: z.boolean().default(false),
    images: z.array(z.object({
      src: image(),
      alt: z.string(),
      caption: z.string().optional(),
    })),

    // Optional metadata
    tags: z.array(z.string()).default([]),
    price: z.string().optional(), // "$500", "Available upon request"
    available: z.boolean().default(true),
    dimensions: z.string().optional(), // "24x36 inches"
    edition: z.string().optional(), // "Limited edition of 25"

    // SEO
    slug: z.string().optional(),
  }),
});

// Blog Collection (optional)
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { portfolio, blog };
```

---

## Core Components

### `src/components/Header.astro`

```astro
---
import { SITE_CONFIG, NAV_ITEMS } from '../config';
---

<header class="site-header">
  <div class="container">
    <a href="/" class="logo">
      {SITE_CONFIG.name}
    </a>

    <nav class="desktop-nav">
      {NAV_ITEMS.map(item => (
        <a href={item.href} class="nav-link">{item.label}</a>
      ))}
    </nav>

    <button class="mobile-menu-toggle" aria-label="Toggle menu">
      <span class="hamburger"></span>
    </button>
  </div>

  <nav class="mobile-nav">
    {NAV_ITEMS.map(item => (
      <a href={item.href} class="mobile-nav-link">{item.label}</a>
    ))}
  </nav>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #e5e5e5;
    z-index: 100;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111;
    text-decoration: none;
    letter-spacing: -0.02em;
  }

  .desktop-nav {
    display: flex;
    gap: 2rem;
  }

  .nav-link {
    color: #555;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav-link:hover {
    color: #111;
  }

  .mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
  }

  .mobile-nav {
    display: none;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 2rem;
    border-top: 1px solid #e5e5e5;
  }

  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }

    .mobile-menu-toggle {
      display: block;
    }

    .mobile-nav.open {
      display: flex;
    }
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    toggle?.addEventListener('click', () => {
      mobileNav?.classList.toggle('open');
    });
  });
</script>
```

---

### `src/components/Footer.astro`

```astro
---
import { SITE_CONFIG } from '../config';

const currentYear = new Date().getFullYear();
---

<footer class="site-footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h3>{SITE_CONFIG.name}</h3>
        <p>{SITE_CONFIG.tagline}</p>
      </div>

      <div class="footer-section">
        <h4>Connect</h4>
        <div class="social-links">
          {SITE_CONFIG.social.instagram && (
            <a href={`https://instagram.com/${SITE_CONFIG.social.instagram}`} target="_blank" rel="noopener">
              Instagram
            </a>
          )}
          {SITE_CONFIG.social.facebook && (
            <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener">
              Facebook
            </a>
          )}
          {SITE_CONFIG.email && (
            <a href={`mailto:${SITE_CONFIG.email}`}>
              Email
            </a>
          )}
        </div>
      </div>

      <div class="footer-section">
        <h4>Portfolio</h4>
        <nav>
          <a href="/portfolio">View Work</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.</p>
      <p>Built with <a href="https://astro.build" target="_blank">Astro</a></p>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background: #111;
    color: #999;
    padding: 3rem 0 1.5rem;
    margin-top: 4rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .footer-section h3,
  .footer-section h4 {
    color: #fff;
    margin-bottom: 1rem;
  }

  .footer-section nav,
  .social-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-section a {
    color: #999;
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-section a:hover {
    color: #fff;
  }

  .footer-bottom {
    border-top: 1px solid #333;
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
  }

  .footer-bottom a {
    color: #999;
    text-decoration: none;
  }

  .footer-bottom a:hover {
    color: #fff;
  }
</style>
```

---

### `src/components/PortfolioGrid.astro`

```astro
---
interface Props {
  items: any[];
  columns?: number;
}

const { items, columns = 3 } = Astro.props;
---

<div class="portfolio-grid" data-columns={columns}>
  {items.map(item => (
    <a href={`/portfolio/${item.slug}`} class="portfolio-item">
      <div class="image-wrapper">
        <img
          src={item.data.images[0].src.src}
          alt={item.data.images[0].alt}
          loading="lazy"
        />
        <div class="overlay">
          <h3>{item.data.title}</h3>
          <p>{item.data.medium} • {item.data.year}</p>
        </div>
      </div>
    </a>
  ))}
</div>

<style>
  .portfolio-grid {
    display: grid;
    gap: 2rem;
    margin: 2rem 0;
  }

  .portfolio-grid[data-columns="2"] {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }

  .portfolio-grid[data-columns="3"] {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .portfolio-grid[data-columns="4"] {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .portfolio-item {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .image-wrapper {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 8px;
    background: #f5f5f5;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .portfolio-item:hover img {
    transform: scale(1.05);
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    color: white;
    padding: 2rem 1.5rem 1.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .portfolio-item:hover .overlay {
    opacity: 1;
  }

  .overlay h3 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
  }

  .overlay p {
    margin: 0;
    font-size: 0.875rem;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .portfolio-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
  }
</style>
```

---

### `src/components/ContactForm.astro`

```astro
---
import { SITE_CONFIG } from '../config';

const formEndpoint = import.meta.env.FORMSPREE_ENDPOINT || '/api/contact';
---

<form class="contact-form" action={formEndpoint} method="POST">
  <div class="form-group">
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required />
  </div>

  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required />
  </div>

  <div class="form-group">
    <label for="subject">Subject</label>
    <input type="text" id="subject" name="subject" />
  </div>

  <div class="form-group">
    <label for="message">Message *</label>
    <textarea id="message" name="message" rows="6" required></textarea>
  </div>

  <div class="form-group">
    <label>
      <input type="checkbox" name="interested" value="purchase" />
      Interested in purchasing artwork
    </label>
  </div>

  <div class="form-group">
    <label>
      <input type="checkbox" name="interested" value="commission" />
      Interested in commissioning a piece
    </label>
  </div>

  <button type="submit" class="submit-btn">Send Message</button>

  <div class="form-status" style="display: none;"></div>
</form>

<style>
  .contact-form {
    max-width: 600px;
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }

  .form-group input[type="text"],
  .form-group input[type="email"],
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
  }

  .form-group input[type="text"]:focus,
  .form-group input[type="email"]:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #111;
  }

  .form-group input[type="checkbox"] {
    margin-right: 0.5rem;
  }

  .submit-btn {
    background: #111;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .submit-btn:hover {
    background: #333;
  }

  .form-status {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 4px;
  }

  .form-status.success {
    background: #d4edda;
    color: #155724;
  }

  .form-status.error {
    background: #f8d7da;
    color: #721c24;
  }
</style>

<script>
  const form = document.querySelector('.contact-form') as HTMLFormElement;
  const status = document.querySelector('.form-status') as HTMLDivElement;

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.style.display = 'block';
        status.className = 'form-status success';
        status.textContent = 'Thank you! Your message has been sent.';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      status.style.display = 'block';
      status.className = 'form-status error';
      status.textContent = 'Sorry, there was an error. Please try again.';
    }
  });
</script>
```

---

### `src/components/InstagramFeed.astro`

```astro
---
import { SITE_CONFIG } from '../config';

const { username, accessToken } = SITE_CONFIG.instagram;
const limit = 6;

let posts = [];

if (accessToken) {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}&limit=${limit}`
    );
    const data = await response.json();
    posts = data.data || [];
  } catch (error) {
    console.error('Instagram feed error:', error);
  }
}
---

{posts.length > 0 && (
  <section class="instagram-feed">
    <h2>
      <a href={`https://instagram.com/${username}`} target="_blank" rel="noopener">
        @{username} on Instagram
      </a>
    </h2>

    <div class="instagram-grid">
      {posts.map(post => (
        <a href={post.permalink} target="_blank" rel="noopener" class="instagram-post">
          <img
            src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
            alt={post.caption?.substring(0, 100) || 'Instagram post'}
            loading="lazy"
          />
        </a>
      ))}
    </div>
  </section>
)}

<style>
  .instagram-feed {
    margin: 4rem 0;
  }

  .instagram-feed h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .instagram-feed h2 a {
    color: inherit;
    text-decoration: none;
  }

  .instagram-feed h2 a:hover {
    color: #E4405F; /* Instagram brand color */
  }

  .instagram-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .instagram-post {
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 8px;
    display: block;
  }

  .instagram-post img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .instagram-post:hover img {
    transform: scale(1.1);
  }
</style>
```

---

## Page Templates

### `src/pages/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../layouts/Layout.astro';
import PortfolioGrid from '../components/PortfolioGrid.astro';
import InstagramFeed from '../components/InstagramFeed.astro';
import { SITE_CONFIG } from '../config';

const featuredWork = (await getCollection('portfolio'))
  .filter(item => item.data.featured)
  .sort((a, b) => b.data.year - a.data.year)
  .slice(0, 6);

const latestBlog = SITE_CONFIG.features.blog
  ? (await getCollection('blog'))
      .filter(post => !post.data.draft)
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .slice(0, 3)
  : [];
---

<Layout title={SITE_CONFIG.name} description={SITE_CONFIG.description}>
  <!-- Hero Section -->
  <section class="hero">
    <h1>{SITE_CONFIG.name}</h1>
    <p class="tagline">{SITE_CONFIG.tagline}</p>
    <p class="bio">{SITE_CONFIG.bio}</p>

    <div class="hero-cta">
      <a href="/portfolio" class="btn btn-primary">View Portfolio</a>
      <a href="/contact" class="btn btn-secondary">Get in Touch</a>
    </div>
  </section>

  <!-- Featured Work -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <h2>Featured Work</h2>
        <a href="/portfolio" class="see-all">View All →</a>
      </div>

      <PortfolioGrid items={featuredWork} columns={3} />
    </div>
  </section>

  <!-- Instagram Feed -->
  {SITE_CONFIG.features.instagram && (
    <div class="container">
      <InstagramFeed />
    </div>
  )}

  <!-- Latest Blog Posts -->
  {SITE_CONFIG.features.blog && latestBlog.length > 0 && (
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Latest Articles</h2>
          <a href="/blog" class="see-all">View All →</a>
        </div>

        <div class="blog-grid">
          {latestBlog.map(post => (
            <a href={`/blog/${post.slug}`} class="blog-card">
              {post.data.heroImage && (
                <img src={post.data.heroImage.src} alt={post.data.heroImageAlt || post.data.title} />
              )}
              <div class="blog-card-content">
                <h3>{post.data.title}</h3>
                <p>{post.data.description}</p>
                <time>{post.data.pubDate.toLocaleDateString()}</time>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )}
</Layout>

<style>
  .hero {
    text-align: center;
    padding: 6rem 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .hero h1 {
    font-size: 4rem;
    font-weight: 700;
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
  }

  .tagline {
    font-size: 1.5rem;
    color: #666;
    margin: 0 0 1.5rem;
  }

  .bio {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #555;
    margin: 0 0 2rem;
  }

  .hero-cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .btn {
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-primary {
    background: #111;
    color: white;
  }

  .btn-primary:hover {
    background: #333;
  }

  .btn-secondary {
    border: 2px solid #111;
    color: #111;
  }

  .btn-secondary:hover {
    background: #111;
    color: white;
  }

  .section {
    padding: 4rem 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .section-header h2 {
    font-size: 2rem;
    margin: 0;
  }

  .see-all {
    color: #666;
    text-decoration: none;
    font-weight: 500;
  }

  .see-all:hover {
    color: #111;
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .blog-card {
    text-decoration: none;
    color: inherit;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s;
  }

  .blog-card:hover {
    transform: translateY(-4px);
  }

  .blog-card img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }

  .blog-card-content {
    padding: 1.5rem;
    background: #f9f9f9;
  }

  .blog-card h3 {
    margin: 0 0 0.5rem;
  }

  .blog-card p {
    color: #666;
    margin: 0 0 1rem;
  }

  .blog-card time {
    font-size: 0.875rem;
    color: #999;
  }
</style>
```

---

### `src/pages/portfolio/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import PortfolioGrid from '../../components/PortfolioGrid.astro';

const allWork = (await getCollection('portfolio'))
  .sort((a, b) => b.data.year - a.data.year);

// Get unique categories
const categories = [...new Set(allWork.map(item => item.data.category))];

// Get unique years
const years = [...new Set(allWork.map(item => item.data.year))].sort((a, b) => b - a);
---

<Layout title="Portfolio" description="View my portfolio of artwork">
  <div class="container">
    <header class="page-header">
      <h1>Portfolio</h1>
      <p>A collection of my work spanning {years.length} years</p>
    </header>

    <!-- Filters -->
    <div class="filters">
      <button class="filter-btn active" data-filter="all">All Work</button>
      {categories.map(category => (
        <button class="filter-btn" data-filter={category}>{category}</button>
      ))}
    </div>

    <!-- Portfolio Grid -->
    <PortfolioGrid items={allWork} columns={3} />
  </div>
</Layout>

<style>
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .page-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .page-header h1 {
    font-size: 3rem;
    margin: 0 0 1rem;
  }

  .page-header p {
    font-size: 1.25rem;
    color: #666;
  }

  .filters {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .filter-btn {
    padding: 0.5rem 1.5rem;
    border: 1px solid #ddd;
    border-radius: 999px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .filter-btn:hover,
  .filter-btn.active {
    background: #111;
    color: white;
    border-color: #111;
  }
</style>

<script>
  // Simple filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter items (implement based on data attributes)
      // This is a placeholder - you'd add data-category to each item
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
</script>
```

---

### `src/pages/portfolio/[...slug].astro`

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';

export async function getStaticPaths() {
  const portfolioEntries = await getCollection('portfolio');
  return portfolioEntries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<Layout title={entry.data.title} description={entry.data.description}>
  <article class="artwork-detail">
    <!-- Image Gallery -->
    <div class="gallery">
      {entry.data.images.map((image, index) => (
        <div class="gallery-item">
          <img
            src={image.src.src}
            alt={image.alt}
            data-index={index}
          />
          {image.caption && <p class="caption">{image.caption}</p>}
        </div>
      ))}
    </div>

    <!-- Artwork Info -->
    <div class="artwork-info">
      <div class="container">
        <header>
          <h1>{entry.data.title}</h1>
          <p class="meta">
            {entry.data.medium} • {entry.data.year}
            {entry.data.dimensions && ` • ${entry.data.dimensions}`}
          </p>
        </header>

        <div class="content">
          <Content />
        </div>

        {entry.data.tags.length > 0 && (
          <div class="tags">
            {entry.data.tags.map(tag => (
              <span class="tag">{tag}</span>
            ))}
          </div>
        )}

        {(entry.data.price || !entry.data.available) && (
          <div class="purchase-info">
            {entry.data.price && <p class="price">{entry.data.price}</p>}
            {entry.data.available ? (
              <a href="/contact" class="btn btn-primary">Inquire About This Piece</a>
            ) : (
              <p class="sold">Sold</p>
            )}
          </div>
        )}

        <div class="navigation">
          <a href="/portfolio" class="back-link">← Back to Portfolio</a>
        </div>
      </div>
    </div>
  </article>
</Layout>

<style>
  .artwork-detail {
    min-height: 100vh;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    padding: 2rem;
    background: #f9f9f9;
  }

  .gallery-item img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    cursor: zoom-in;
  }

  .caption {
    text-align: center;
    color: #666;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }

  .artwork-info {
    padding: 4rem 2rem;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .artwork-info h1 {
    font-size: 2.5rem;
    margin: 0 0 0.5rem;
  }

  .meta {
    color: #666;
    font-size: 1.125rem;
    margin: 0 0 2rem;
  }

  .content {
    font-size: 1.125rem;
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .tag {
    background: #f0f0f0;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    font-size: 0.875rem;
    color: #666;
  }

  .purchase-info {
    background: #f9f9f9;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 2rem;
  }

  .price {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem;
  }

  .sold {
    color: #999;
    font-style: italic;
  }

  .btn {
    display: inline-block;
    padding: 1rem 2rem;
    background: #111;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: background 0.2s;
  }

  .btn:hover {
    background: #333;
  }

  .back-link {
    color: #666;
    text-decoration: none;
  }

  .back-link:hover {
    color: #111;
  }
</style>
```

---

### `src/pages/about.astro`

```astro
---
import Layout from '../layouts/Layout.astro';
import { SITE_CONFIG } from '../config';

const education = [
  "MFA in Photography, School of Visual Arts, 2020",
  "BFA in Fine Arts, Rhode Island School of Design, 2015",
];

const exhibitions = [
  { year: 2024, title: "Solo Exhibition", venue: "Gallery X, New York" },
  { year: 2023, title: "Group Show", venue: "Art Basel Miami" },
  { year: 2022, title: "Emerging Artists", venue: "Local Gallery" },
];

const awards = [
  "Emerging Artist Award, 2023",
  "Best in Show, Photo Festival, 2022",
];
---

<Layout title="About" description={`About ${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`}>
  <div class="about-page">
    <!-- Hero Section with Photo -->
    <section class="about-hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-image">
            <img src="/images/profile.jpg" alt={SITE_CONFIG.name} />
          </div>
          <div class="hero-text">
            <h1>{SITE_CONFIG.name}</h1>
            <p class="tagline">{SITE_CONFIG.tagline}</p>
            {SITE_CONFIG.location && (
              <p class="location">📍 {SITE_CONFIG.location}</p>
            )}
          </div>
        </div>
      </div>
    </section>

    <!-- Artist Statement -->
    <section class="section">
      <div class="container-narrow">
        <h2>Artist Statement</h2>
        <div class="statement">
          <p>{SITE_CONFIG.bio}</p>

          <p>
            My work explores the intersection of light, color, and emotion.
            Through photography and mixed media, I aim to capture fleeting moments
            and transform them into lasting visual narratives.
          </p>

          <p>
            Each piece is a meditation on the beauty of impermanence and the
            power of perspective. I invite viewers to slow down, look closely,
            and find their own meaning in the work.
          </p>
        </div>
      </div>
    </section>

    <!-- Education -->
    {education.length > 0 && (
      <section class="section section-gray">
        <div class="container-narrow">
          <h2>Education</h2>
          <ul class="list">
            {education.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    )}

    <!-- Exhibitions -->
    {exhibitions.length > 0 && (
      <section class="section">
        <div class="container-narrow">
          <h2>Exhibitions</h2>
          <div class="timeline">
            {exhibitions.map(item => (
              <div class="timeline-item">
                <span class="year">{item.year}</span>
                <div class="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )}

    <!-- Awards -->
    {awards.length > 0 && (
      <section class="section section-gray">
        <div class="container-narrow">
          <h2>Awards & Recognition</h2>
          <ul class="list">
            {awards.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    )}

    <!-- CTA -->
    <section class="section">
      <div class="container-narrow cta">
        <h2>Interested in working together?</h2>
        <p>I'm available for commissions, exhibitions, and collaborations.</p>
        <a href="/contact" class="btn btn-primary">Get in Touch</a>
      </div>
    </section>
  </div>
</Layout>

<style>
  .about-hero {
    padding: 4rem 2rem;
    background: #f9f9f9;
  }

  .hero-content {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 3rem;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
  }

  .hero-image img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 8px;
  }

  .hero-text h1 {
    font-size: 3rem;
    margin: 0 0 0.5rem;
  }

  .tagline {
    font-size: 1.5rem;
    color: #666;
    margin: 0 0 1rem;
  }

  .location {
    color: #999;
    margin: 0;
  }

  .section {
    padding: 4rem 2rem;
  }

  .section-gray {
    background: #f9f9f9;
  }

  .container-narrow {
    max-width: 800px;
    margin: 0 auto;
  }

  .section h2 {
    font-size: 2rem;
    margin: 0 0 2rem;
    text-align: center;
  }

  .statement p {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: #555;
  }

  .list {
    list-style: none;
    padding: 0;
  }

  .list li {
    padding: 1rem 0;
    border-bottom: 1px solid #e5e5e5;
    font-size: 1.125rem;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 2rem;
  }

  .year {
    font-weight: 600;
    color: #999;
  }

  .timeline-content h3 {
    margin: 0 0 0.5rem;
  }

  .timeline-content p {
    margin: 0;
    color: #666;
  }

  .cta {
    text-align: center;
  }

  .cta h2 {
    margin-bottom: 1rem;
  }

  .cta p {
    font-size: 1.125rem;
    color: #666;
    margin: 0 0 2rem;
  }

  .btn {
    display: inline-block;
    padding: 1rem 2rem;
    background: #111;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: background 0.2s;
  }

  .btn:hover {
    background: #333;
  }

  @media (max-width: 768px) {
    .hero-content {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .timeline-item {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }
</style>
```

---

### `src/pages/contact.astro`

```astro
---
import Layout from '../layouts/Layout.astro';
import ContactForm from '../components/ContactForm.astro';
import { SITE_CONFIG } from '../config';
---

<Layout title="Contact" description={`Get in touch with ${SITE_CONFIG.name}`}>
  <div class="contact-page">
    <div class="container">
      <header class="page-header">
        <h1>Get in Touch</h1>
        <p>Interested in purchasing artwork, commissioning a piece, or collaborating? I'd love to hear from you.</p>
      </header>

      <div class="contact-grid">
        <!-- Contact Form -->
        <div class="form-section">
          <h2>Send a Message</h2>
          <ContactForm />
        </div>

        <!-- Contact Info -->
        <div class="info-section">
          <h2>Contact Information</h2>

          {SITE_CONFIG.email && (
            <div class="contact-item">
              <h3>Email</h3>
              <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
            </div>
          )}

          {SITE_CONFIG.phone && (
            <div class="contact-item">
              <h3>Phone</h3>
              <a href={`tel:${SITE_CONFIG.phone}`}>{SITE_CONFIG.phone}</a>
            </div>
          )}

          {SITE_CONFIG.location && (
            <div class="contact-item">
              <h3>Location</h3>
              <p>{SITE_CONFIG.location}</p>
            </div>
          )}

          <div class="contact-item">
            <h3>Follow</h3>
            <div class="social-links">
              {SITE_CONFIG.social.instagram && (
                <a href={`https://instagram.com/${SITE_CONFIG.social.instagram}`} target="_blank" rel="noopener">
                  Instagram
                </a>
              )}
              {SITE_CONFIG.social.facebook && (
                <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener">
                  Facebook
                </a>
              )}
            </div>
          </div>

          <div class="contact-item">
            <h3>Hours</h3>
            <p>
              Studio visits by appointment only.<br />
              I typically respond within 24-48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</Layout>

<style>
  .contact-page {
    padding: 4rem 2rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .page-header h1 {
    font-size: 3rem;
    margin: 0 0 1rem;
  }

  .page-header p {
    font-size: 1.25rem;
    color: #666;
    max-width: 700px;
    margin: 0 auto;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 4rem;
  }

  .form-section h2,
  .info-section h2 {
    margin: 0 0 2rem;
    font-size: 1.5rem;
  }

  .contact-item {
    margin-bottom: 2rem;
  }

  .contact-item h3 {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #999;
    margin: 0 0 0.5rem;
  }

  .contact-item a {
    color: #111;
    text-decoration: none;
  }

  .contact-item a:hover {
    text-decoration: underline;
  }

  .contact-item p {
    color: #555;
    margin: 0;
  }

  .social-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
</style>
```

---

## Layout

### `src/layouts/Layout.astro`

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { SITE_CONFIG } from '../config';

interface Props {
  title: string;
  description?: string;
}

const { title, description = SITE_CONFIG.description } = Astro.props;
const fullTitle = `${title} | ${SITE_CONFIG.name}`;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- SEO -->
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <meta name="author" content={SITE_CONFIG.name} />

    <!-- Open Graph -->
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={SITE_CONFIG.url} />
    <meta property="og:image" content={`${SITE_CONFIG.url}/images/og-image.jpg`} />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={`${SITE_CONFIG.url}/images/og-image.jpg`} />

    <!-- Fonts (optional - customize as needed) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>

<style is:global>
  :root {
    /* Colors - Customize these! */
    --color-primary: #111;
    --color-secondary: #f9f9f9;
    --color-accent: #666;
    --color-text: #333;
    --color-text-muted: #666;
    --color-border: #e5e5e5;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    color: var(--color-text);
    line-height: 1.6;
  }

  body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  a {
    color: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
  }
</style>
```

---

## Content Examples

### Portfolio Item Example: `src/content/portfolio/sunset-series.md`

```markdown
---
title: "Sunset Series"
description: "A collection of abstract sunset photographs capturing the ephemeral beauty of twilight"
medium: "Photography"
year: 2024
category: "Photography"
featured: true
images:
  - src: "../../assets/portfolio/sunset-1.jpg"
    alt: "Vibrant orange and pink sunset over water"
    caption: "Golden Hour Reflections"
  - src: "../../assets/portfolio/sunset-2.jpg"
    alt: "Silhouette of trees against twilight sky"
    caption: "Twilight Silhouettes"
  - src: "../../assets/portfolio/sunset-3.jpg"
    alt: "Abstract close-up of sunset colors"
    caption: "Color Study No. 1"
tags: ["photography", "abstract", "nature", "sunset", "landscape"]
price: "$500 - $1,200"
available: true
dimensions: "Various sizes available: 16x20 to 30x40 inches"
edition: "Limited edition prints of 25"
---

## About This Series

The Sunset Series explores the fleeting beauty of twilight through abstract photography. Each image captures a unique moment when day transitions to night, revealing unexpected colors and compositions in the sky.

## Inspiration

I've always been fascinated by how sunsets create a daily spectacle that we often overlook. This series is an invitation to pause and appreciate these natural performances.

## Process

Shot over the course of six months at various locations, each photograph was carefully composed to emphasize color, light, and atmosphere over literal representation. Post-processing enhanced the natural vibrancy while maintaining the authentic feel of each moment.

## Available Formats

- **Fine Art Prints**: Museum-quality archival prints on premium paper
- **Canvas**: Gallery-wrapped canvas ready to hang
- **Metal Prints**: Modern aluminum prints with vivid colors

Contact me to discuss sizing, framing, and custom print options.
```

---

### Blog Post Example: `src/content/blog/my-creative-process.md`

```markdown
---
title: "Behind the Scenes: My Creative Process"
description: "A peek into how I create my abstract photography, from concept to final print"
pubDate: 2025-01-15
heroImage: "../../assets/blog/process-hero.jpg"
heroImageAlt: "Artist working in studio with photography equipment"
tags: ["process", "photography", "tips", "behind-the-scenes"]
---

## Introduction

People often ask me: "How do you create your photographs?" Today I want to pull back the curtain and share my creative process from initial concept to final print.

## Step 1: Finding Inspiration

I start by observing. Sometimes it's a particular quality of light, a color combination, or an unexpected composition. I keep a notebook (both physical and digital) where I jot down ideas and visual references.

## Step 2: Planning the Shoot

Once I have a concept, I plan the logistics:
- Location scouting
- Time of day (golden hour is my favorite)
- Weather conditions
- Equipment needed

## Step 3: The Shoot

When I'm on location, I enter a state of creative flow. I might take hundreds of shots, experimenting with:
- Different angles and perspectives
- Various focal lengths
- Multiple exposures
- Creative use of depth of field

## Step 4: Selection

This is perhaps the hardest part. I review all images and narrow down to the strongest candidates. I look for:
- Emotional impact
- Composition
- Technical quality
- Uniqueness

## Step 5: Post-Processing

In Lightroom and Photoshop, I enhance the natural beauty of the image without over-processing. My goal is to amplify the feeling I experienced when taking the shot.

## Step 6: Printing

The final step is creating the physical print. I work with a master printer to ensure each piece meets my standards for color accuracy, sharpness, and archival quality.

## Conclusion

Every piece is a journey from initial spark to final artwork. It's a process I never tire of, and each series teaches me something new about seeing and capturing the world.

Want to see the results? Check out my [portfolio](/portfolio).
```

---

## Package.json

```json
{
  "name": "artist-portfolio",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/cloudflare": "^12.0.0",
    "@astrojs/mdx": "^4.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "astro": "^5.0.0",
    "sharp": "^0.34.0"
  }
}
```

---

## Astro Config

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  integrations: [mdx(), sitemap()],
  adapter: cloudflare(),
});
```

---

## Directory Structure

```
artist-portfolio/
├── public/
│   ├── favicon.svg
│   ├── images/
│   │   ├── profile.jpg       # Artist photo
│   │   └── og-image.jpg      # Social media preview
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── portfolio/        # Artwork images
│   │   └── blog/             # Blog post images
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PortfolioGrid.astro
│   │   ├── ContactForm.astro
│   │   └── InstagramFeed.astro
│   ├── content/
│   │   ├── portfolio/        # Portfolio markdown files
│   │   └── blog/             # Blog markdown files
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── portfolio/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   ├── config.ts
│   └── content.config.ts
├── .env.example
├── .gitignore
├── astro.config.mjs
├── package.json
└── README.md
```

This is everything you need to create a complete artist portfolio!
