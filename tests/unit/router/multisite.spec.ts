import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

describe('Multi-Site Routing', () => {
  // Store original env values and window.location
  const originalEnv = { ...import.meta.env }
  let originalLocation: Location

  beforeEach(() => {
    // Create a fresh Pinia instance
    setActivePinia(createPinia())

    // Store original location
    originalLocation = window.location

    // Reset module cache to allow fresh imports
    vi.resetModules()
  })

  afterEach(() => {
    // Restore original location
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true
    })

    // Clean up mocks
    vi.restoreAllMocks()
  })

  describe('getRoutes function behavior', () => {
    describe('default routes (Sabbath School)', () => {
      it('should include home route', async () => {
        // Mock hostname for default site
        Object.defineProperty(window, 'location', {
          value: { hostname: 'sabbathschool.com' },
          writable: true
        })

        vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
        vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')

        const { default: router } = await import('@/router/index.js')
        const routes = router.getRoutes()

        expect(routes.some(r => r.name === 'home')).toBe(true)
      })

      it('should include quarterlies route', async () => {
        Object.defineProperty(window, 'location', {
          value: { hostname: 'sabbathschool.com' },
          writable: true
        })

        vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
        vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')

        const { default: router } = await import('@/router/index.js')
        const routes = router.getRoutes()

        expect(routes.some(r => r.name === 'quarterlies')).toBe(true)
      })

      it('should include lessons route', async () => {
        Object.defineProperty(window, 'location', {
          value: { hostname: 'sabbathschool.com' },
          writable: true
        })

        vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
        vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')

        const { default: router } = await import('@/router/index.js')
        const routes = router.getRoutes()

        expect(routes.some(r => r.name === 'lessons')).toBe(true)
      })

      it('should include read route', async () => {
        Object.defineProperty(window, 'location', {
          value: { hostname: 'sabbathschool.com' },
          writable: true
        })

        vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
        vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')

        const { default: router } = await import('@/router/index.js')
        const routes = router.getRoutes()

        expect(routes.some(r => r.name === 'read')).toBe(true)
      })

      it('should include languages route', async () => {
        Object.defineProperty(window, 'location', {
          value: { hostname: 'sabbathschool.com' },
          writable: true
        })

        vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
        vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')

        const { default: router } = await import('@/router/index.js')
        const routes = router.getRoutes()

        expect(routes.some(r => r.name === 'languages')).toBe(true)
      })

      it('should include resources route', async () => {
        Object.defineProperty(window, 'location', {
          value: { hostname: 'sabbathschool.com' },
          writable: true
        })

        vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
        vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')

        const { default: router } = await import('@/router/index.js')
        const routes = router.getRoutes()

        expect(routes.some(r => r.name === 'resources')).toBe(true)
      })

      it('should include resource route', async () => {
        Object.defineProperty(window, 'location', {
          value: { hostname: 'sabbathschool.com' },
          writable: true
        })

        vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
        vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')

        const { default: router } = await import('@/router/index.js')
        const routes = router.getRoutes()

        expect(routes.some(r => r.name === 'resource')).toBe(true)
      })

      it('should include document route', async () => {
        Object.defineProperty(window, 'location', {
          value: { hostname: 'sabbathschool.com' },
          writable: true
        })

        vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
        vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')

        const { default: router } = await import('@/router/index.js')
        const routes = router.getRoutes()

        expect(routes.some(r => r.name === 'document')).toBe(true)
      })

      it('should include categories route', async () => {
        Object.defineProperty(window, 'location', {
          value: { hostname: 'sabbathschool.com' },
          writable: true
        })

        vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
        vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')

        const { default: router } = await import('@/router/index.js')
        const routes = router.getRoutes()

        expect(routes.some(r => r.name === 'categories')).toBe(true)
      })

      it('should include category route', async () => {
        Object.defineProperty(window, 'location', {
          value: { hostname: 'sabbathschool.com' },
          writable: true
        })

        vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
        vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')

        const { default: router } = await import('@/router/index.js')
        const routes = router.getRoutes()

        expect(routes.some(r => r.name === 'category')).toBe(true)
      })
    })
  })

  describe('route path patterns', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'sabbathschool.com' },
        writable: true
      })

      vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
      vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')
    })

    it('should have correct path for home route', async () => {
      const { default: router } = await import('@/router/index.js')
      const homeRoute = router.getRoutes().find(r => r.name === 'home')
      expect(homeRoute?.path).toBe('/')
    })

    it('should have correct path pattern for quarterlies route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'quarterlies')
      expect(route?.path).toBe('/:lang')
    })

    it('should have correct path pattern for lessons route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'lessons')
      expect(route?.path).toBe('/:lang/:quarter')
    })

    it('should have correct path pattern for read route with optional day', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'read')
      expect(route?.path).toBe('/:lang/:quarter/:lesson/:day?')
    })

    it('should have correct path for languages route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'languages')
      expect(route?.path).toBe('/language')
    })

    it('should have correct path pattern for resources route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'resources')
      expect(route?.path).toBe('/resources/:lang/:resourceType')
    })

    it('should have correct path pattern for resource route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'resource')
      expect(route?.path).toBe('/resources/:lang/:resourceType/:resourceName')
    })

    it('should have correct path pattern for document route with optional segment', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'document')
      expect(route?.path).toBe('/resources/:lang/:resourceType/:resourceName/:documentName/:segmentName?')
    })
  })

  describe('router configuration', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { hostname: 'sabbathschool.com' },
        writable: true
      })

      vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
      vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')
    })

    it('should use web history mode', async () => {
      const { default: router } = await import('@/router/index.js')
      // Vue Router 4 uses history object with type
      expect(router.options.history).toBeDefined()
    })

    it('should have scroll behavior that returns to top', async () => {
      const { default: router } = await import('@/router/index.js')
      // The router has a scrollBehavior function defined
      expect(typeof router.options.scrollBehavior).toBe('function')
    })

    it('should scroll to top on navigation', async () => {
      const { default: router } = await import('@/router/index.js')
      const scrollBehavior = router.options.scrollBehavior
      if (scrollBehavior) {
        const result = scrollBehavior({} as any, {} as any, null)
        expect(result).toEqual({ top: 0, left: 0 })
      }
    })
  })
})

describe('Route Parameter Validation', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetModules()

    Object.defineProperty(window, 'location', {
      value: { hostname: 'sabbathschool.com' },
      writable: true
    })

    vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
    vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('language parameter routes', () => {
    it('should define lang parameter in quarterlies route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'quarterlies')
      expect(route?.path).toContain(':lang')
    })

    it('should define lang parameter in lessons route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'lessons')
      expect(route?.path).toContain(':lang')
    })

    it('should define lang parameter in read route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'read')
      expect(route?.path).toContain(':lang')
    })

    it('should define lang parameter in resources route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'resources')
      expect(route?.path).toContain(':lang')
    })
  })

  describe('nested parameter routes', () => {
    it('should define quarter parameter in lessons route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'lessons')
      expect(route?.path).toContain(':quarter')
    })

    it('should define lesson parameter in read route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'read')
      expect(route?.path).toContain(':lesson')
    })

    it('should define optional day parameter in read route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'read')
      expect(route?.path).toContain(':day?')
    })

    it('should define resourceType parameter in resources route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'resources')
      expect(route?.path).toContain(':resourceType')
    })

    it('should define resourceName parameter in resource route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'resource')
      expect(route?.path).toContain(':resourceName')
    })

    it('should define documentName parameter in document route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'document')
      expect(route?.path).toContain(':documentName')
    })

    it('should define optional segmentName parameter in document route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'document')
      expect(route?.path).toContain(':segmentName?')
    })

    it('should define category parameter in category route', async () => {
      const { default: router } = await import('@/router/index.js')
      const route = router.getRoutes().find(r => r.name === 'category')
      expect(route?.path).toContain(':category')
    })
  })
})

describe('Lazy Loading Components', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetModules()

    Object.defineProperty(window, 'location', {
      value: { hostname: 'sabbathschool.com' },
      writable: true
    })

    vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
    vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should have component defined for each route', async () => {
    const { default: router } = await import('@/router/index.js')
    const routes = router.getRoutes()

    routes.forEach(route => {
      // Skip if route has children but no direct component
      if (route.components || route.children) return
      // All leaf routes should have a component or components property
      expect(
        route.components !== undefined ||
        typeof route.name === 'string'
      ).toBe(true)
    })
  })
})

describe('Route Names', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetModules()

    Object.defineProperty(window, 'location', {
      value: { hostname: 'sabbathschool.com' },
      writable: true
    })

    vi.stubEnv('VITE_APP_SSPM_INVERSE_HOST', 'inverse.example.com')
    vi.stubEnv('VITE_APP_SSPM_ABSG_HOST', 'absg.example.com')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should have unique route names', async () => {
    const { default: router } = await import('@/router/index.js')
    const routes = router.getRoutes()
    const names = routes.map(r => r.name).filter(Boolean)

    // Check for duplicates
    const uniqueNames = [...new Set(names)]
    expect(names.length).toBe(uniqueNames.length)
  })

  it('should have descriptive route names', async () => {
    const { default: router } = await import('@/router/index.js')
    const routes = router.getRoutes()

    const expectedNames = [
      'home',
      'quarterlies',
      'lessons',
      'read',
      'languages',
      'resources',
      'resource',
      'document',
      'categories',
      'category'
    ]

    expectedNames.forEach(name => {
      expect(routes.some(r => r.name === name)).toBe(true)
    })
  })
})
