import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: '../backend/src/main/resources/static'
  }, // 빌드 결과물이 생성되는 경로
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8082'
    } // proxy 설정
  }
})
