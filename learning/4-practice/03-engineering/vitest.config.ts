import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.ts'],
      coverage: {
        provider: 'v8',
        include: ['src/domain/**/*.ts', 'src/services/**/*.ts'],
        reporter: ['text', 'json-summary'],
      },
    },
  }),
)
