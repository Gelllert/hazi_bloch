import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/hazi_bloch/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png'],
      manifest: {
        name: 'Bloch-gömb Kvantumszimulátor',
        short_name: 'Bloch-gömb',
        start_url: '/hazi_bloch/',
        scope: '/hazi_bloch/',
        display: 'standalone',
        theme_color: '#020617',
        background_color: '#020617',
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});