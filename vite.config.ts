import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'],

  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://api.prokerala.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //     '/api/token': {
  //       target: 'https://api.prokerala.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/token/, '/token'),
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         // Add other headers as needed
  //       },
  //     },
  //   },
  // },

  build: {
    outDir: 'dist', // Ensure the output directory is 'dist'
  },
});