import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/stevia',
  server: {
    port: 3000,
    host: "localhost",
    hmr: { 
	clientPort: 3000,
	overlay: false 
    }
  },
  build: {
    rollupOptions: {
      input: {
	main: resolve(__dirname, 'index.html'),
	nested: resolve(__dirname, 'nested/index.html')
      }
    }
  }
});


