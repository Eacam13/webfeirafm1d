import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Seu arquivo HTML principal
      },
    },
    outDir: 'dist', // Diretório de saída
    assetsDir: 'assets', // Diretório para arquivos estáticos (imagens, etc.)
  },
});

