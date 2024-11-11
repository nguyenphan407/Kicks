import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/ config plugins
export default defineConfig({
  plugins: [react()],
  server:{port:5173}
})
