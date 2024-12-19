import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/ config plugins
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['laravel-echo'],
  },
  server:{port:5173}
})
