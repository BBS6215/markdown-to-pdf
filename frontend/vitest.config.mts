import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  // Next preserves JSX for its own compiler; SSR component tests need Vite
  // to compile it with React's automatic runtime instead.
  oxc: { jsx: { runtime: 'automatic' } },
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
    maxWorkers: 2,
    restoreMocks: true,
    environmentOptions: { jsdom: { url: 'http://localhost:3000/en' } },
  },
});
