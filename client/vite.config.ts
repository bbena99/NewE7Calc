import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{'/api/v1':'http://localhost:3000/',},
    https:true,
    port:4200
  },
  plugins: [react(),mkcert()],
})
