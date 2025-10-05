import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        budgie: resolve(__dirname, 'pages/budgie.html'),
        'funds-campaign': resolve(__dirname, 'pages/funds-campaign.html')
      },
      output: {
        manualChunks: {
          vendor: ['gsap', 'scrollmagic']
        }
      }
    },
    cssCodeSplit: true,
    minify: 'terser',
    sourcemap: false
  },
  css: {
    devSourcemap: true,
    postcss: './postcss.config.js'
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  preview: {
    port: 4173,
    open: true
  },
  optimizeDeps: {
    include: ['gsap', 'scrollmagic']
  }
})
