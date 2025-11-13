import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.memobaut.de',
  trailingSlash: 'ignore', // Handle both /page and /page/ URLs
  integrations: [
    tailwind({
      config: { applyBaseStyles: false }
    }),
    sitemap()
  ],
  build: {
    inlineStylesheets: 'never', // CSP compliance
    format: 'directory' // Ensures clean URLs (page/index.html)
  },
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  }
});
