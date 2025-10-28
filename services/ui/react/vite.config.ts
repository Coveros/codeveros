/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  envPrefix: 'REACT_APP_',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    include: [
      'src/**/__tests__/**/*.(ts|tsx)',
      'src/**/*.(test|spec).(ts|tsx)',
    ],
    coverage: {
      include: ['src/**/*.(ts|tsx)'],
      exclude: ['src/**/*.d.ts', 'src/main.tsx', 'src/vite-env.d.ts'],
    },
  },
});
