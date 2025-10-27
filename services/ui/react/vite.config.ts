/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
