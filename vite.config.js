import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import gzipPlugin from 'rollup-plugin-gzip';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    gzipPlugin(),
    viteImagemin({
      gifsicle: { interlaced: true },
      optipng: { optimizationLevel: 5 },
      svgo: { plugins: [{ removeViewBox: false }] },
      mozjpeg: { quality: 50 },
      pngquant: { quality: [0.45, 0.60] },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000, 
  },
  server: {
    port: 8100,
  },
  preview: {
    port: 8200, // Set the port for preview
  },
});
