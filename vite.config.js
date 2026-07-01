import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    port: 5173,
  },
  // App multi-página: una entrada por idioma. Cada HTML es una URL indexable
  // aparte (/ para español, /en/ para inglés) con su propio SEO.
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        en: resolve(root, 'en/index.html'),
      },
    },
  },
});
