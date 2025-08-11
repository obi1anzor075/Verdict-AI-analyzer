// vite.config.ts
import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.config.js';

// Если ты используешь TypeScript в модулях — добавь "ts" расширения
// и можно указать alias для src, чтобы импортировать проще

export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // CRXJS сам найдёт entry points из manifest, но можно явно прописать
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
      '@': '/src', // позволяет писать import from '@/content/utils'
    },
  },
});
