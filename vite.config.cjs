import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'src/pages/product/product.html'),
        cart: resolve(__dirname, 'src/pages/cart/cart.html'),
      }
    }
  },
  base: "/orinoco/",
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@images': resolve(__dirname, 'src/images'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
});