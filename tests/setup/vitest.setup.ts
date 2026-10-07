import { vi, beforeAll, afterAll, afterEach } from 'vitest'
import { config } from '@vue/test-utils'
import { server } from '../mocks/server'

// Start MSW server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' })
})

// Reset handlers after each test (important for test isolation)
afterEach(() => {
  server.resetHandlers()
})

// Close server after all tests
afterAll(() => {
  server.close()
})

// Vue Test Utils global configuration
config.global.mocks = {
  // Mock Axios instances used in components
  $api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() }
    }
  },
  $apiAuth: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() }
    }
  },
  $apiResources: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() }
    }
  },
  $apiAuthResources: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() }
    }
  },

  // Mock event emitter (mitt)
  emitter: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
    all: new Map()
  },

  // Mock highlighter plugin
  $highlighter: {
    getHighlightForElement: vi.fn(),
    applyHighlights: vi.fn(),
    clearHighlights: vi.fn(),
    removeHighlight: vi.fn()
  },

  // Mock Bible plugin
  $bible: {
    getVerse: vi.fn(),
    parseReference: vi.fn()
  }
}

// Global stubs for router components
config.global.stubs = {
  'router-link': {
    template: '<a :href="to"><slot /></a>',
    props: ['to']
  },
  'router-view': {
    template: '<div data-testid="router-view"><slot /></div>'
  },
  teleport: true
}

// Mock environment variables
vi.stubEnv('VITE_APP_API_HOST', 'https://api.example.com')
vi.stubEnv('VITE_APP_API_RESOURCES_HOST', 'https://resources.example.com')
vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')
vi.stubEnv('VITE_APP_SSPM_AIJ_BABIES_HOST', 'babies.example.com')
vi.stubEnv('VITE_APP_SSPM_AIJ_BEGINNER_HOST', 'beginner.example.com')
vi.stubEnv('VITE_APP_GOOGLE_CLIENT_ID', 'mock-google-client-id')
vi.stubEnv('VITE_APP_APPLE_CLIENT_ID', 'mock-apple-client-id')

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
})

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn()
}

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
})

// Mock scrollTo
window.scrollTo = vi.fn()

// Mock getSelection for highlighter tests
Object.defineProperty(window, 'getSelection', {
  writable: true,
  value: vi.fn().mockReturnValue({
    toString: () => '',
    getRangeAt: vi.fn(),
    removeAllRanges: vi.fn(),
    addRange: vi.fn(),
    rangeCount: 0
  })
})

// Suppress console errors during tests (optional, remove for debugging)
// vi.spyOn(console, 'error').mockImplementation(() => {})
// vi.spyOn(console, 'warn').mockImplementation(() => {})
