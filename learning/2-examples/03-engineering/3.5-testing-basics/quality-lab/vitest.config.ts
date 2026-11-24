import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/domain.ts', 'src/service.ts', 'src/TaskButton.ts'],
      reporter: ['text', 'json-summary'],
      thresholds: { statements: 80, branches: 75, functions: 80, lines: 80 },
    },
  },
})
