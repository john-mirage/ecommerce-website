/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  base: "/orinoco/",
  resolve: {
    alias: {
      '@api': resolve(__dirname, 'src/api'),
      '@components': resolve(__dirname, 'src/components'),
      '@images': resolve(__dirname, 'src/images'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
});