import { createPinia, setActivePinia, Store, Pinia } from 'pinia'
import { vi } from 'vitest'

/**
 * Setup a fresh Pinia instance for store testing
 */
export function setupStoreTesting(): Pinia {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}

/**
 * Reset store state to initial values
 */
export function resetStore(store: Store): void {
  store.$reset()
}

/**
 * Create a mock auth store state
 */
export function createMockAuthState(overrides: Record<string, unknown> = {}) {
  return {
    displayName: null,
    email: null,
    photo: null,
    token: null,
    spiToken: null,
    ...overrides
  }
}

/**
 * Create a mock language store state
 */
export function createMockLanguageState(overrides: Record<string, unknown> = {}) {
  return {
    code: 'en',
    ...overrides
  }
}

/**
 * Create a mock theme store state
 */
export function createMockThemeState(overrides: Record<string, unknown> = {}) {
  return {
    color: 'light',
    font: 'sans',
    size: 'medium',
    ...overrides
  }
}

/**
 * Mock localStorage for persisted state testing
 */
export function mockPersistedState(key: string, state: Record<string, unknown>): void {
  const mockStorage = vi.spyOn(Storage.prototype, 'getItem')
  mockStorage.mockImplementation((storageKey: string) => {
    if (storageKey === key) {
      return JSON.stringify(state)
    }
    return null
  })
}

/**
 * Clear persisted state mocks
 */
export function clearPersistedStateMocks(): void {
  vi.restoreAllMocks()
}

/**
 * Assert store action was called with specific parameters
 */
export function assertActionCalled(
  actionSpy: ReturnType<typeof vi.fn>,
  expectedArgs?: unknown[]
): void {
  expect(actionSpy).toHaveBeenCalled()
  if (expectedArgs) {
    expect(actionSpy).toHaveBeenCalledWith(...expectedArgs)
  }
}

/**
 * Create a mock for async store actions
 */
export function createAsyncActionMock<T>(resolvedValue: T): ReturnType<typeof vi.fn> {
  return vi.fn().mockResolvedValue(resolvedValue)
}

/**
 * Create a mock for failing async store actions
 */
export function createFailingAsyncActionMock(error: Error): ReturnType<typeof vi.fn> {
  return vi.fn().mockRejectedValue(error)
}

/**
 * Wait for store state to change
 */
export async function waitForStoreChange<T>(
  store: Store,
  getter: () => T,
  expectedValue: T,
  timeout = 1000
): Promise<void> {
  const startTime = Date.now()

  while (Date.now() - startTime < timeout) {
    if (getter() === expectedValue) {
      return
    }
    await new Promise(resolve => setTimeout(resolve, 10))
  }

  throw new Error(`Store state did not change to expected value within ${timeout}ms`)
}

/**
 * Create a spy on store action
 */
export function spyOnStoreAction(store: Store, actionName: string): ReturnType<typeof vi.fn> {
  const action = store[actionName as keyof typeof store]
  if (typeof action !== 'function') {
    throw new Error(`Action "${actionName}" not found on store`)
  }
  return vi.spyOn(store, actionName as keyof typeof store)
}
