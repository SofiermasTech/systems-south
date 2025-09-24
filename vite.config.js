import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
    },
  },
  server: {
    mimeTypes: {
      js: 'application/javascript',
    },
    fs: {
      allow: ['.'],
    },
    proxy: {
      '/api': {
        target: 'https://api.stage.provodok.shop',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Убираем /api из пути
      },
    },
  },
})
