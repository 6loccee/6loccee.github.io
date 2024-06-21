import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'

import webmanifest from 'astro-webmanifest'

// https://astro.build/config
export default defineConfig({
  site: 'https://6loccee.github.io',
  integrations: [
    tailwind(),
    sitemap(),
    robotsTxt(),
    webmanifest({
      name: 'Martin Aranda ─ Dev',
      short_name: 'Portfolio',
      start_url: '/',
      background_color: '#121212',
    }),
  ],
})
