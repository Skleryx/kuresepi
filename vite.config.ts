import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/fatsecret': {
        target: 'https://platform.fatsecret.com/rest/server.api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/fatsecret/, ''),
      },
      '/api/token': {
        target: 'https://oauth.fatsecret.com/connect/token',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/token/, ''),
      }
    }
  }
})
