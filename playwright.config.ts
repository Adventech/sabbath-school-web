import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for E2E testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory - includes both e2e and a11y tests
  testDir: './tests',

  // Ignore Vitest tests (unit and component tests use Vitest, not Playwright)
  testIgnore: ['**/unit/**', '**/component/**'],

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Number of parallel workers
  // CI: Use 2 workers per job (each browser runs in separate job)
  // Local: Use default (half of CPU cores)
  workers: process.env.CI ? 2 : undefined,

  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:4173',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Capture screenshot on failure
    screenshot: 'only-on-failure',

    // Record video on failure
    video: 'on-first-retry',

    // Timeout for each action
    actionTimeout: 10000,

    // Navigation timeout
    navigationTimeout: 30000
  },

  // Configure projects for major browsers
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },

    // Mobile browsers
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] }
    },

    // Tablet
    {
      name: 'tablet',
      use: { ...devices['iPad (gen 7)'] }
    }
  ],

  // Run your local dev server before starting the tests
  // In CI, build is pre-built and downloaded as artifact, so just run preview
  // Locally, build first then preview
  webServer: {
    command: process.env.CI ? 'yarn preview' : 'yarn build && yarn preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 180000,
    stdout: 'pipe',
    stderr: 'pipe'
  },

  // Global timeout for each test
  timeout: 30000,

  // Expect timeout
  expect: {
    timeout: 5000
  },

  // Output folder for test artifacts
  outputDir: 'test-results/playwright'
})
