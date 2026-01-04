# Jack Macklin - Jazz Guitarist Portfolio

A modern, elegant portfolio website for Jack Macklin, a Chicago-based jazz guitarist, composer, and educator.

**Live Site**: [jack.unjoe.me](https://jack.unjoe.me)

## About Jack Macklin

Jack Macklin is a rising star in the modern jazz scene. A graduate of DePaul University's Jazz Studies program, Jack has performed with notable musicians including Matt Ulery, Greg Ward, Joel Frahm, Donny McCaslin, Dave Douglas, and many others.

He leads the **Jack Macklin Trio** (with Parker Kaplan on bass and Ryan Brasley on drums) and hosts the jazz podcast **"Let's Cool One"** as part of the Alithio Network.

## Features

- **Home Page**: Hero section, trio showcase, about preview, upcoming shows, podcast highlight
- **About Page**: Full biography, career timeline, press mentions, influences
- **Music Page**: Discography, streaming links, EP details
- **Shows Page**: Upcoming performances, regular venues, booking information
- **Podcast Page**: "Let's Cool One" episodes, platform links
- **Contact Page**: Booking inquiries, social links, FAQ

## Tech Stack

- **Framework**: [Astro](https://astro.build) 5.x
- **Styling**: Custom CSS with CSS variables
- **Fonts**: Playfair Display (display), Inter (body)
- **Deployment**: Static site, ready for Cloudflare Pages

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
jack-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── music.astro
│       ├── shows.astro
│       ├── podcast.astro
│       └── contact.astro
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Design System

### Colors

- **Background**: `#0a0a0a` (deep black)
- **Accent**: `#d4a853` (warm gold/brass - jazz-inspired)
- **Text Primary**: `#f5f5f5`
- **Text Secondary**: `#a0a0a0`
- **Text Muted**: `#666666`

### Typography

- **Display Font**: Playfair Display (headings, titles)
- **Body Font**: Inter (paragraphs, UI)

## Resources

- **Official Website**: [jackmacklin.com](https://www.jackmacklin.com)
- **Instagram**: [@jack_macklin_](https://www.instagram.com/jack_macklin_/)
- **Podcast**: [Let's Cool One](https://podcasts.apple.com/us/podcast/lets-cool-one-with-jack-macklin/id1762082194)
- **Booking**: [GigSalad](https://www.gigsalad.com/jack_macklin_nashville)

## Credits

Built with love by [unjoe.me](https://unjoe.me)

---

**Last Updated**: January 2026
