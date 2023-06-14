import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cryptic-hollows-63599/', // Agrega esta línea con el nombre de tu aplicación
  plugins: [react()],
  server: {
    port: 3000,
  }
})