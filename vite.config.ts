import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { writeSitemap } from './scripts/generate-sitemap';

function sitemapAutoGeneratorPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap-generator',
    buildStart() {
      try {
        writeSitemap();
      } catch (err) {
        console.warn('[Sitemap Plugin] Error generating public sitemap during buildStart:', err);
      }
    },
    closeBundle() {
      try {
        writeSitemap();
      } catch (err) {
        console.warn('[Sitemap Plugin] Error generating dist sitemap during closeBundle:', err);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), sitemapAutoGeneratorPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
