import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['**/*'], // Cache all assets
      manifest: {
        /* your manifest config */
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api-game\.bloque\.app\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [
          /^\/api/, // Don't fallback for API routes
          /\.(?:png|jpe?g|svg|json)$/, // Don't fallback for static assets
        ],
        offlineGoogleAnalytics: false,
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: false, // Disable SW in dev to avoid conflicts
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
