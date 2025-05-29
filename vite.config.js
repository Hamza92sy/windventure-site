import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        packages: resolve(__dirname, 'pages/packages.html'),
        rental: resolve(__dirname, 'pages/rental.html'),
        excursions: resolve(__dirname, 'pages/excursions.html'),
        contact: resolve(__dirname, 'pages/contact.html'),
      }
    }
  },
  server: {
    open: true,
    port: 3000
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './')
    }
  }
});