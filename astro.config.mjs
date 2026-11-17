// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Public URL, used for canonical links, sitemap and social cards. SITE_URL can override it (e.g. for previews).
  site: process.env.SITE_URL ?? 'https://browserwall.org',
  // /quiz.html instead of /quiz/index.html: Cloudflare Pages serves it as /quiz (clean URLs, no trailing slash).
  build: { format: 'file' },
});
