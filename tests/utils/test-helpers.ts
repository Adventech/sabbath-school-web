import { mount, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia, Pinia } from 'pinia'
import { Component } from 'vue'
import { vi } from 'vitest'

/**
 * Creates a fresh Pinia instance for each test
 */
export function createTestPinia(): Pinia {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}

/**
 * Mount options with common defaults for this project
 */
export interface MountOptions {
  props?: Record<string, unknown>
  slots?: Record<string, string | Component>
  provide?: Record<string, unknown>
  pinia?: Pinia
  shallow?: boolean
}

/**
 * Create a wrapper with project-specific defaults
 */
export function createWrapper<T extends Component>(
  component: T,
  options: MountOptions = {}
): VueWrapper<InstanceType<T>> {
  const pinia = options.pinia ?? createTestPinia()

  return mount(component, {
    props: options.props,
    slots: options.slots,
    shallow: options.shallow ?? false,
    global: {
      plugins: [pinia],
      provide: options.provide,
      stubs: {
        'router-link': {
          template: '<a :href="to"><slot /></a>',
          props: ['to']
        },
        'router-view': true,
        teleport: true
      }
    }
  }) as VueWrapper<InstanceType<T>>
}

/**
 * Default provide values for Document/Block components
 */
export function getDocumentProvide(overrides: Record<string, unknown> = {}) {
  return {
    getDocument: () => ({
      id: 'test-doc-1',
      title: 'Test Document',
      type: 'lesson',
      style: { blocks: {} },
      defaultStyles: {}
    }),
    getDocumentUserInput: () => ({
      highlights: [],
      answers: {},
      checklist: {},
      appeals: {}
    }),
    getDefaultStyles: () => ({}),
    getStyle: () => ({}),
    ...overrides
  }
}

/**
 * Wait for a number of milliseconds (useful for async operations)
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Wait for Vue to process all pending updates
 */
export async function flushPromises(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 0))
}

/**
 * Create a mock router for testing
 */
export function createMockRouter() {
  return {
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: {
      value: {
        path: '/',
        params: {},
        query: {},
        meta: {},
        name: 'home'
      }
    },
    beforeEach: vi.fn(),
    afterEach: vi.fn(),
    getRoutes: vi.fn(() => []),
    hasRoute: vi.fn(() => false),
    resolve: vi.fn(),
    addRoute: vi.fn(),
    removeRoute: vi.fn(),
    isReady: vi.fn(() => Promise.resolve())
  }
}

/**
 * Create a mock route object
 */
export function createMockRoute(overrides: Record<string, unknown> = {}) {
  return {
    path: '/',
    params: {},
    query: {},
    meta: {},
    name: 'home',
    fullPath: '/',
    hash: '',
    matched: [],
    redirectedFrom: undefined,
    ...overrides
  }
}

/**
 * Helper to assert element exists in wrapper
 */
export function assertExists(wrapper: VueWrapper, selector: string, message?: string): void {
  const element = wrapper.find(selector)
  if (!element.exists()) {
    throw new Error(message ?? `Element "${selector}" not found`)
  }
}

/**
 * Helper to get text content of an element
 */
export function getText(wrapper: VueWrapper, selector: string): string {
  const element = wrapper.find(selector)
  return element.exists() ? element.text() : ''
}

/**
 * Trigger a custom event on a wrapper element
 */
export async function triggerCustomEvent(
  wrapper: VueWrapper,
  eventName: string,
  detail?: unknown
): Promise<void> {
  const element = wrapper.element
  const event = new CustomEvent(eventName, { detail })
  element.dispatchEvent(event)
  await flushPromises()
}

/**
 * Mock window.location for multi-site testing
 */
export function mockWindowLocation(hostname: string, pathname = '/'): void {
  Object.defineProperty(window, 'location', {
    value: {
      hostname,
      pathname,
      href: `https://${hostname}${pathname}`,
      origin: `https://${hostname}`,
      protocol: 'https:',
      host: hostname,
      search: '',
      hash: ''
    },
    writable: true
  })
}

/**
 * Reset window.location mock
 */
export function resetWindowLocation(): void {
  Object.defineProperty(window, 'location', {
    value: {
      hostname: 'localhost',
      pathname: '/',
      href: 'http://localhost/',
      origin: 'http://localhost',
      protocol: 'http:',
      host: 'localhost',
      search: '',
      hash: ''
    },
    writable: true
  })
}
