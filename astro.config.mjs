import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.memobaut.de',
  integrations: [
    tailwind({
      config: { applyBaseStyles: false }
    }),
    sitemap()
  ],
  build: {
    inlineStylesheets: 'never' // CSP compliance
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
