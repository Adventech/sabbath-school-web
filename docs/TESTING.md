# Testing Guide for sabbath-school-web

Comprehensive testing documentation for the Sabbath School web application.

## Current Status

✅ **Phase 1 Complete** - Testing infrastructure is fully operational.

| Metric | Status |
|--------|--------|
| **Unit Tests** | 81 tests passing |
| **E2E Tests** | Configured and ready |
| **Accessibility Tests** | Configured with axe-core |
| **CI/CD** | GitHub Actions workflow active |
| **Coverage Target** | 70% threshold set |

## Quick Start

```bash
# Run all unit tests
yarn test:unit

# Run tests in watch mode (development)
yarn test:watch

# Run tests with coverage report
yarn test:coverage

# Open Vitest UI for interactive testing
yarn test:ui

# Run E2E tests (auto-builds before running)
yarn test:e2e

# Run E2E tests with UI
yarn test:e2e:ui

# Run E2E tests in headed mode (see browser)
yarn test:e2e:headed

# Run full CI test suite
yarn test:ci

# Install Playwright browsers (required first time)
yarn playwright install
```

## Testing Stack

| Layer | Framework | Version | Purpose |
|-------|-----------|---------|---------|
| **Unit Testing** | Vitest | ^4.0.16 | Fast, native Vite integration |
| **Component Testing** | Vue Test Utils | ^2.4.6 | Vue 3 Composition API support |
| **E2E Testing** | Playwright | ^1.57.0 | Multi-browser, multi-site testing |
| **API Mocking** | MSW | ^2.12.7 | Network-level mocking |
| **Coverage** | @vitest/coverage-v8 | ^4.0.16 | V8-based accuracy |
| **Accessibility** | @axe-core/playwright | ^4.11.0 | WCAG compliance |
| **Test Environment** | happy-dom | ^20.1.0 | Fast DOM simulation |

## Coverage Targets

| Category | Target | Focus Areas |
|----------|--------|-------------|
| **Stores** | 95% | auth.js, language.js, theme |
| **Block Components** | 85% | All 22 block types |
| **Plugins** | 85% | Bible, Highlighter, ContextMenu |
| **Views** | 70% | Document, Resource, Read |
| **API Layer** | 90% | Interceptors, token refresh |

## Priority Matrix

### Critical (Test First)
1. **Auth Store + Token Refresh** - Auth failure = broken app
2. **Block Rendering System** - 20+ recursive block types
3. **Multi-site Routing** - Hostname-based site selection
4. **Axios Interceptors** - 401 handling, auto-refresh
5. **Language/RTL Support** - 88 languages

### Quick Wins (2-4 hours each)
- Store state management tests
- Router guard tests
- Locales validation
- Environment variable loading

### Complex (Defer or Simplify)
- PDF rendering (PSPDFKit) - Mock entirely
- Video playback (Video.js) - Mock at component level
- Google/Apple Sign-In - Mock external scripts
- Rangy selection - Create abstraction layer

## Installation

```bash
# Install testing dependencies
yarn add -D vitest @vue/test-utils @vitest/coverage-v8 @vitest/ui happy-dom msw @playwright/test @testing-library/vue vitest-axe @pinia/testing @axe-core/playwright
```

## Package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:ci": "vitest run --coverage && playwright test"
  }
}
```

## Directory Structure

```bash
tests/
├── setup/
│   ├── vitest.setup.ts       # Global test setup
│   └── msw.setup.ts          # MSW server setup
├── utils/
│   ├── test-helpers.ts       # Common utilities
│   ├── store-helpers.ts      # Pinia mocking
│   └── fixtures/
│       ├── blocks.ts         # Block test data
│       └── documents.ts      # Document test data
├── mocks/
│   ├── handlers/
│   │   ├── auth.ts           # Auth API handlers
│   │   └── resources.ts      # Resources API handlers
│   └── server.ts             # MSW server config
├── unit/
│   ├── stores/
│   │   ├── auth.spec.ts
│   │   └── language.spec.ts
│   ├── plugins/
│   │   ├── bible.spec.ts
│   │   └── highlighter.spec.ts
│   └── router/
│       └── multisite.spec.ts
├── component/
│   ├── blocks/
│   │   ├── Block.spec.ts
│   │   ├── Paragraph.spec.ts
│   │   └── Question.spec.ts
│   └── views/
│       └── Document.spec.ts
├── integration/
│   └── block-system.spec.ts
├── a11y/
│   └── accessibility.spec.ts
└── e2e/
    ├── auth.spec.ts
    ├── navigation.spec.ts
    └── multi-site.spec.ts
```

## Configuration Files

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    include: ['tests/**/*.spec.{js,ts}'],
    exclude: ['tests/e2e/**', 'node_modules'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{js,ts,vue}'],
      exclude: ['src/main.js', 'src/locales.js'],
      thresholds: {
        global: { branches: 70, functions: 70, lines: 70, statements: 70 }
      }
    },
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

### playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['junit', { outputFile: 'test-results/junit.xml' }]],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } }
  ],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI
  }
})
```

### tests/setup/vitest.setup.ts

```typescript
import { vi, beforeAll, afterAll, afterEach } from 'vitest'
import { config } from '@vue/test-utils'
import { server } from '../mocks/server'

// Start MSW server
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Vue Test Utils global config
config.global.mocks = {
  $api: { get: vi.fn(), post: vi.fn() },
  $apiAuth: { get: vi.fn(), post: vi.fn() },
  $apiResources: { get: vi.fn(), post: vi.fn() },
  $apiAuthResources: { get: vi.fn(), post: vi.fn() },
  emitter: { on: vi.fn(), off: vi.fn(), emit: vi.fn() },
  $highlighter: {
    getHighlightForElement: vi.fn(),
    applyHighlights: vi.fn(),
    clearHighlights: vi.fn()
  }
}

config.global.stubs = {
  'router-link': { template: '<a><slot /></a>' },
  'router-view': true
}

// Mock environment variables
vi.stubEnv('VITE_APP_API_HOST', 'https://api.example.com')
vi.stubEnv('VITE_APP_API_RESOURCES_HOST', 'https://resources.example.com')
vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')
```

## Key Testing Patterns

### Testing Pinia Stores

```typescript
import { setActivePinia, createPinia } from 'pinia'
import { authStore } from '@/stores/auth'

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('returns true for isLoggedIn when displayName is set', () => {
    const store = authStore()
    store.displayName = 'John'
    expect(store.isLoggedIn).toBe(true)
  })
})
```

### Testing Block Components with Provide/Inject

```typescript
import { mount } from '@vue/test-utils'
import Block from '@/components/Resources/Blocks/Block.vue'

const createWrapper = (block) => {
  return mount(Block, {
    props: { block, parent: null },
    global: {
      provide: {
        getDocument: () => ({ id: 'doc-1' }),
        getDocumentUserInput: () => [],
        getDefaultStyles: () => ({}),
        getStyle: () => ({})
      }
    }
  })
}

it('renders paragraph block', () => {
  const wrapper = createWrapper({
    id: 'p-1', type: 'paragraph', text: 'Test', items: []
  })
  expect(wrapper.exists()).toBe(true)
})
```

### Testing Multi-Site Routing

```typescript
describe('Multi-Site Routing', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('uses InVerse routes for inverse hostname', async () => {
    vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
    Object.defineProperty(window, 'location', {
      value: { hostname: 'inverse.example.com' },
      writable: true
    })

    const { default: router } = await import('@/router/index.js')
    expect(router.getRoutes().some(r => r.path === '/teach')).toBe(true)
  })
})
```

### E2E Tests with Playwright

```typescript
import { test, expect } from '@playwright/test'

test('should navigate to quarterly lessons', async ({ page }) => {
  await page.goto('/en')
  await expect(page.getByRole('heading')).toBeVisible()
})

test('RTL languages have correct direction', async ({ page }) => {
  await page.goto('/ar')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
})
```

### Accessibility Testing

```typescript
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home page passes accessibility audit', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  expect(results.violations).toEqual([])
})
```

## Implementation Roadmap

| Phase | Duration | Focus | Deliverables |
|-------|----------|-------|--------------|
| **Phase 1** | Week 1-2 | Foundation | Infrastructure, stores, CI/CD |
| **Phase 2** | Week 3-4 | Core Components | Blocks, plugins |
| **Phase 3** | Week 5-6 | Views & Integration | Document, Resource, API |
| **Phase 4** | Week 7-8 | E2E & Polish | Cross-browser, RTL, a11y |

### Phase 1: Foundation ✅ COMPLETE
- [x] Install and configure Vitest
- [x] Set up MSW for API mocking
- [x] Create test setup files
- [x] Write auth store tests (18 tests)
- [x] Write language store tests (31 tests)
- [x] Configure CI/CD pipeline
- [x] Block.vue component tests (32 tests)
- [x] E2E navigation tests
- [x] Accessibility test setup

### Phase 2: Core Components (In Progress)
- [x] Block.vue component tests
- [ ] All 22 block type individual tests
- [ ] Bible plugin tests
- [ ] Highlighter plugin tests
- [ ] ContextMenu plugin tests
- [ ] Theme store tests

### Phase 3: Views & Integration
- [ ] Document.vue tests
- [ ] Resource.vue tests
- [ ] API interceptor tests
- [ ] Router integration tests
- [ ] Multi-site routing tests

### Phase 4: E2E & Polish
- [x] E2E navigation test suite
- [x] Cross-browser testing (CI configured)
- [x] RTL language testing
- [x] Accessibility testing setup
- [ ] Additional E2E scenarios
- [x] Documentation

## CI/CD Integration

### .github/workflows/test.yml

```yaml
name: Test Suite

on:
  push:
    branches: [stage, master]
  pull_request:
    branches: [stage]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'
      - run: yarn install
      - run: yarn test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'
      - run: yarn install
      - run: npx playwright install --with-deps
      - run: yarn build
      - run: yarn test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Rangy/jQuery mocking | Create abstraction layer, stub at module level |
| PSPDFKit testing | Mock library entirely |
| Multi-site testing | Use environment variables, separate test configs |
| Token refresh races | Dedicated integration tests with MSW |
| Snapshot fragility | Use specific assertions over snapshots |

## Success Metrics

- **Unit Tests**: 80% line coverage
- **Component Tests**: 70% line coverage
- **E2E Tests**: 5-10 critical user journey scenarios
- **Accessibility**: WCAG 2.1 AA compliance
- **CI/CD**: All tests run on every PR
