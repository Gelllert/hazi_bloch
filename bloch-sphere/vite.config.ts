import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/hazi_bloch/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png'], // A public mappában lévő ikonod
      manifest: {
        name: 'Bloch-gömb Kvantumszimulátor',
        short_name: 'Bloch-gömb',
        description: 'Interaktív 1-qubites kvantumállapot és kapu szimulátor',
        theme_color: '#020617',
        background_color: '#020617',
        display: 'standalone', // Külön ablakban, böngésző címsor nélkül indul
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