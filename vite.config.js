import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: ['**/node_modules/**', '**/dist/**'],
    }),
  ],
  server: {
    open: true,
    hmr: {
      overlay: true,
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          redux: ['redux', 'react-redux', 'redux-thunk'],
        },
      },
    },
  },
});
