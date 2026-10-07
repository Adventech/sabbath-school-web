import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: fileURLToPath(new URL('..', import.meta.url)),
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.spec.{js,ts}'],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      include: [
        'src/stores/language.js',
        'src/plugins/Theme/ThemeStore.js'
      ],
      reportsDirectory: 'tests/coverage',
      reporter: ['text', 'json-summary', 'lcov'],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url)),
      pinia: fileURLToPath(new URL('./node_modules/pinia/dist/pinia.mjs', import.meta.url))
    }
  }
})
