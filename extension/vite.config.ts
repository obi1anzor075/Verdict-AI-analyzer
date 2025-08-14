// vite.config.ts
import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.config.js';


export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        background: 'src/background/background.js',
        content: 'src/content/content.init.js',
      },
    },
  },
    optimizeDeps: {
    include: ['libphonenumber-js']
  },
  resolve: {
    alias: {
      '@': '/src', /
    },
  },
});
