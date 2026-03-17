import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  // Serve coughdrop dist files as static assets
  publicDir: 'public',
})
