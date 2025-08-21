import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      clientPort: 443
    },
    allowedHosts: [
      '.replit.dev',
      '.repl.co',
      '.replit.app',
      '4ef4d465-a88a-4080-bff6-4f6f333e80c3-00-73cwbqv5a0l1.sisko.replit.dev'
    ]
  }
})
