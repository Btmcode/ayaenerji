import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      ViteImageOptimizer({
        jpg: {
          quality: 75,
        },
        jpeg: {
          quality: 75,
        },
        png: {
          quality: 80,
        },
        webp: {
          quality: 80,
        },
      }),
    ],
    define: {
      'process.env.GOOGLE_MAPS_PLATFORM_KEY': JSON.stringify(process.env.GOOGLE_MAPS_PLATFORM_KEY || '')
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            'firebase-vendor': ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/storage'],
            'map-vendor': ['maplibre-gl'],
            'ui-vendor': ['lucide-react'],
            'utils-vendor': ['crypto-js']
          }
        }
      }
    },
    server: {
      hmr: false,
      watch: null,
    },
  };
});
