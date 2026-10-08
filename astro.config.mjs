// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages: https://angelicojohn.github.io/angelico-portfolio/
// Internal links/images go through src/lib/url.ts so the base is applied everywhere.
export default defineConfig({
  site: 'https://angelicojohn.github.io',
  base: '/angelico-portfolio',
  integrations: [sitemap({ filter: (page) => !page.includes('/astro') })],
  // The Astro page was merged into the homepage; keep old links working.
  redirects: { '/astro': '/angelico-portfolio/' },
});
