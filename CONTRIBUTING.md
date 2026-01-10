# Contributing to sabbath-school-web

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/sabbath-school-web.git
   cd sabbath-school-web
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn dev
   ```

## Testing Requirements

All contributions must include appropriate tests. We use **Vitest** for unit/component tests and **Playwright** for E2E tests.

### Running Tests

```bash
# Run unit tests before committing
yarn test:unit

# Run tests in watch mode during development
yarn test:watch

# Check test coverage
yarn test:coverage

# Run E2E tests (requires build)
yarn build && yarn test:e2e
```

### Writing Tests

#### Unit Tests (Stores, Utilities)

Place unit tests in `tests/unit/` following the source structure.

```typescript
// tests/unit/stores/example.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useExampleStore } from '@/stores/example'

describe('useExampleStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should have correct initial state', () => {
    const store = useExampleStore()
    expect(store.someValue).toBe('expected')
  })
})
```

#### Component Tests

Place component tests in `tests/component/` following the source structure.

```typescript
// tests/component/blocks/MyComponent.spec.ts
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(MyComponent, {
      props: { title: 'Test' }
    })
    expect(wrapper.text()).toContain('Test')
  })
})
```

#### E2E Tests

Place E2E tests in `tests/e2e/`.

```typescript
// tests/e2e/feature.spec.ts
import { test, expect } from '@playwright/test'

test('user can navigate to content', async ({ page }) => {
  await page.goto('/en')
  await expect(page.locator('header')).toBeVisible()
})
```

### Test Patterns

#### Mocking APIs

Use MSW handlers in `tests/mocks/handlers/`:

```typescript
// tests/mocks/handlers/myapi.ts
import { http, HttpResponse } from 'msw'

export const myApiHandlers = [
  http.get('*/api/endpoint', () => {
    return HttpResponse.json({ data: 'mocked' })
  })
]
```

#### Testing with Provide/Inject

Many components use Vue's provide/inject. Use the helper pattern:

```typescript
const wrapper = shallowMount(Component, {
  global: {
    provide: {
      getDocument: () => mockDocument,
      getStyle: () => mockStyle
    }
  }
})
```

### Coverage Requirements

- **New code**: Must have tests covering the main functionality
- **Bug fixes**: Should include a test that would have caught the bug
- **Target**: 70% line coverage for new features

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** with appropriate tests

3. **Run tests locally**
   ```bash
   yarn test:unit
   ```

4. **Commit with descriptive messages**
   ```bash
   git commit -m "Add: description of feature"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **PR Requirements**
   - Tests pass in CI
   - Code follows existing patterns
   - Documentation updated if needed

## Code Style

- Follow existing code patterns in the codebase
- Use Vue 3 Composition API patterns
- Keep components focused and single-purpose
- Write self-documenting code with clear variable names

## File Structure

```
tests/
├── unit/           # Unit tests for stores, utilities
├── component/      # Vue component tests
├── e2e/            # Playwright E2E tests
├── a11y/           # Accessibility tests
├── mocks/
│   ├── handlers/   # MSW API mock handlers
│   └── server.ts   # MSW server configuration
├── setup/
│   └── vitest.setup.ts  # Global test setup
└── utils/
    ├── test-helpers.ts  # Common test utilities
    └── fixtures/        # Test data fixtures
```

## Getting Help

- Check existing tests for examples
- Review [docs/TESTING.md](docs/TESTING.md) for detailed testing documentation
- Open an issue for questions

## CI/CD

Pull requests automatically run:
- Unit tests with coverage
- E2E tests
- Accessibility tests

All checks must pass before merging.
