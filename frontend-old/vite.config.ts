import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  // Load env vars based on the current mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');
  
  // Default WebSocket URL for development
  const defaultWsUrl = 'http://localhost:5001';
  const wsUrl = env.VITE_WS_URL || defaultWsUrl;
  
  console.log(`🌐 Using WebSocket URL: ${wsUrl}`);
  
  return {
    define: {
      'import.meta.env.VITE_WS_URL': JSON.stringify(wsUrl)
    },
    server: {
      proxy: {
        // API proxy
        '/api': {
          target: 'http://localhost:5001',
          changeOrigin: true,
          secure: false,
          rewrite: (path: string) => path,
          configure: (proxy: any) => {
            proxy.on('error', (err: Error) => {
              console.error('Proxy error:', err);
            });
            // @ts-ignore - proxyReq is used in the callback
            proxy.on('proxyReq', (_proxyReq: any, req: any) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes: any, req: any) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          }
        },
        // WebSocket proxy
        '/socket.io': {
          target: 'http://localhost:5001',
          ws: true,
          changeOrigin: true,
          secure: false,
          // Don't rewrite the path for WebSocket connections
          // This is important for Socket.IO to work correctly
          rewrite: (path: string) => path,
          // Configure WebSocket upgrade
          configure: (proxy: any) => {
            proxy.on('upgrade', (req: any, socket: any, head: any) => {
              console.log('Upgrading to WebSocket connection');
              // @ts-ignore - The ws method exists on the proxy object
              proxy.ws(req, socket, head, { target: 'ws://localhost:5001' });
            });
          }
        }
      },
      host: '0.0.0.0',
      port: 5173,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      devOptions: {
        enabled: true, // Enable PWA in development
        type: 'module',
        navigateFallback: 'index.html',
        suppressWarnings: true, // Suppress dev warnings
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot}'],
        // Don't fail on missing files in development
        dontCacheBustURLsMatching: /^\w*\.[a-f0-9]{8}\./,
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // 4MB
        mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Green World Holidays',
        short_name: 'Green World',
        description: 'Travel Packages & Tours Worldwide',
        theme_color: '#4CAF50',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/?source=pwa',
        orientation: 'portrait',
        categories: ['travel', 'tourism', 'holidays'],
        id: '/?source=pwa',
        lang: 'en-US',
        dir: 'ltr',
        prefer_related_applications: false,
        related_applications: [],
        icons: [
          {
            src: '/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
};
});
