import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [vue()],
  test: {
    // Use happy-dom for faster tests (jsdom alternative)
    environment: 'happy-dom',

    // Enable global test APIs (describe, it, expect, etc.)
    globals: true,

    // Setup files to run before tests
    setupFiles: ['./tests/setup/vitest.setup.ts'],

    // Test file patterns
    include: ['tests/**/*.spec.{js,ts}'],

    // Exclude E2E and a11y tests (handled by Playwright)
    exclude: ['tests/e2e/**', 'tests/a11y/**', 'node_modules', 'dist'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{js,ts,vue}'],
      exclude: [
        'src/main.js',
        'src/locales.js',
        'node_modules',
        'tests',
        '**/*.d.ts',
        '**/*.spec.{js,ts}',
        '**/types/**'
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70
        }
      }
    },

    // Reporter configuration
    reporters: ['default', 'html'],

    // Output directory for HTML reports
    outputFile: {
      html: './test-results/vitest-report.html'
    },

    // Timeout for tests
    testTimeout: 10000,

    // Retry failed tests
    retry: 0,

    // Run tests in sequence when debugging
    sequence: {
      shuffle: false
    },

    // Mock clear and restore settings
    clearMocks: true,
    restoreMocks: true,

    // CSS handling
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
