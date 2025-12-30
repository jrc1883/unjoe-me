// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://unjoe.me',
  integrations: [mdx(), sitemap()],
  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()],
  },
});