import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),

  ],
  server: {
    proxy: {
      '/api': {
        target: "https://chatapplication-3-tx0h.onrender.com",
        secure: false
      }
    }
  }
})
