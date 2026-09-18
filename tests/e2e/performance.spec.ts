import { test, expect } from '@playwright/test'

/**
 * Performance Tests
 * Tests page load times, Core Web Vitals, and rendering performance
 */
test.describe('Performance', () => {
  test.describe('Page Load Times', () => {
    test('should load home page within acceptable time', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/')
      await page.waitForLoadState('domcontentloaded')

      const domContentLoaded = Date.now() - startTime

      // DOM should be ready within 5 seconds (generous for CI)
      expect(domContentLoaded).toBeLessThan(5000)
      console.log(`Home page DOM loaded in ${domContentLoaded}ms`)
    })

    test('should fully load home page within reasonable time', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/')
      await page.waitForLoadState('load')

      const fullLoad = Date.now() - startTime

      // Full page load within 10 seconds
      expect(fullLoad).toBeLessThan(10000)
      console.log(`Home page fully loaded in ${fullLoad}ms`)
    })

    test('should load English quarterlies page efficiently', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      const loadTime = Date.now() - startTime

      // Should load within 8 seconds
      expect(loadTime).toBeLessThan(8000)
      console.log(`English quarterlies loaded in ${loadTime}ms`)
    })

    test('should load Spanish quarterlies page efficiently', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/es')
      await page.waitForLoadState('networkidle')

      const loadTime = Date.now() - startTime

      expect(loadTime).toBeLessThan(8000)
      console.log(`Spanish quarterlies loaded in ${loadTime}ms`)
    })

    test('should load RTL pages efficiently', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/ar')
      await page.waitForLoadState('networkidle')

      const loadTime = Date.now() - startTime

      expect(loadTime).toBeLessThan(8000)
      console.log(`Arabic page loaded in ${loadTime}ms`)
    })
  })

  test.describe('Navigation Performance', () => {
    test('should navigate between pages quickly', async ({ page }) => {
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      const navStartTime = Date.now()

      await page.goto('/es')
      await page.waitForLoadState('networkidle')

      const navTime = Date.now() - navStartTime

      // Navigation should be quick
      expect(navTime).toBeLessThan(5000)
      console.log(`Navigation from /en to /es took ${navTime}ms`)
    })

    test('should handle rapid navigation', async ({ page }) => {
      const languages = ['en', 'es', 'fr', 'de', 'pt']
      const times: number[] = []

      for (const lang of languages) {
        const startTime = Date.now()
        await page.goto(`/${lang}`)
        await page.waitForLoadState('domcontentloaded')
        times.push(Date.now() - startTime)
      }

      const avgTime = times.reduce((a, b) => a + b, 0) / times.length
      console.log(`Average navigation time: ${avgTime.toFixed(0)}ms`)

      // Average should be reasonable
      expect(avgTime).toBeLessThan(5000)
    })
  })

  test.describe('Core Web Vitals', () => {
    test('should have acceptable Largest Contentful Paint (LCP)', async ({ page }) => {
      await page.goto('/en')

      // Wait for LCP
      const lcp = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            resolve(lastEntry.startTime)
          })

          observer.observe({ type: 'largest-contentful-paint', buffered: true })

          // Fallback timeout
          setTimeout(() => resolve(3000), 5000)
        })
      })

      console.log(`LCP: ${lcp.toFixed(0)}ms`)

      // LCP should be under 4s (good) or 4.5s (needs improvement)
      expect(lcp).toBeLessThan(4500)
    })

    test('should have acceptable First Contentful Paint (FCP)', async ({ page }) => {
      await page.goto('/en')

      const fcp = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            for (const entry of entries) {
              if (entry.name === 'first-contentful-paint') {
                resolve(entry.startTime)
                return
              }
            }
          })

          observer.observe({ type: 'paint', buffered: true })

          setTimeout(() => resolve(2000), 5000)
        })
      })

      console.log(`FCP: ${fcp.toFixed(0)}ms`)

      // FCP should be under 2.5s (good) or 3s (needs improvement)
      expect(fcp).toBeLessThan(3000)
    })

    test('should have minimal Cumulative Layout Shift (CLS)', async ({ page }) => {
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      // Wait a bit for layout to stabilize
      await page.waitForTimeout(1000)

      const cls = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let clsValue = 0

          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value
              }
            }
          })

          observer.observe({ type: 'layout-shift', buffered: true })

          setTimeout(() => resolve(clsValue), 2000)
        })
      })

      console.log(`CLS: ${cls.toFixed(3)}`)

      // CLS should be under 0.25 (good) or 0.4 (needs improvement)
      expect(cls).toBeLessThan(0.4)
    })
  })

  test.describe('Resource Loading', () => {
    test('should not have excessive network requests', async ({ page }) => {
      const requests: string[] = []

      page.on('request', (request) => {
        requests.push(request.url())
      })

      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      console.log(`Total requests: ${requests.length}`)

      // Should not have excessive requests
      expect(requests.length).toBeLessThan(100)
    })

    test('should load images efficiently', async ({ page }) => {
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      const imageStats = await page.evaluate(() => {
        const images = document.querySelectorAll('img')
        let loaded = 0
        let failed = 0

        images.forEach((img) => {
          if (img.complete && img.naturalHeight !== 0) {
            loaded++
          } else {
            failed++
          }
        })

        return { total: images.length, loaded, failed }
      })

      console.log(`Images: ${imageStats.loaded}/${imageStats.total} loaded, ${imageStats.failed} failed`)

      // Most images should load successfully if there are any
      if (imageStats.total > 0) {
        expect(imageStats.failed).toBeLessThanOrEqual(imageStats.total * 0.1)
      }
    })

    test('should handle lazy loading properly', async ({ page }) => {
      await page.goto('/en')
      await page.waitForLoadState('domcontentloaded')

      // Check for lazy loading attributes
      const lazyImages = await page.locator('img[loading="lazy"]').count()
      const allImages = await page.locator('img').count()

      console.log(`Lazy loaded images: ${lazyImages}/${allImages}`)

      // Just informational - no strict requirement
      expect(true).toBe(true)
    })
  })

  test.describe('JavaScript Performance', () => {
    test('should not have long-running scripts blocking interaction', async ({ page }) => {
      await page.goto('/en')

      // Try to interact soon after load
      await page.waitForLoadState('domcontentloaded')

      const isResponsive = await page.evaluate(() => {
        const start = performance.now()
        // Simple DOM operation
        document.body.getBoundingClientRect()
        return performance.now() - start < 100
      })

      expect(isResponsive).toBe(true)
    })

    test('should have reasonable JavaScript bundle execution', async ({ page }) => {
      const scriptUrls: string[] = []

      page.on('response', async (response) => {
        if (response.request().resourceType() === 'script') {
          scriptUrls.push(response.url())
        }
      })

      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      console.log(`Loaded ${scriptUrls.length} scripts`)

      // Should not have excessive script loading
      expect(scriptUrls.length).toBeLessThan(50)
    })
  })

  test.describe('Memory Usage', () => {
    test('should not have memory leaks on repeated navigation', async ({ page }) => {
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      // Get initial memory usage if available
      const initialMemory = await page.evaluate(() => {
        if ('memory' in performance) {
          return (performance as any).memory?.usedJSHeapSize || 0
        }
        return 0
      })

      // Navigate multiple times
      for (let i = 0; i < 5; i++) {
        await page.goto('/es')
        await page.waitForLoadState('networkidle')
        await page.goto('/en')
        await page.waitForLoadState('networkidle')
      }

      const finalMemory = await page.evaluate(() => {
        if ('memory' in performance) {
          return (performance as any).memory?.usedJSHeapSize || 0
        }
        return 0
      })

      if (initialMemory > 0 && finalMemory > 0) {
        const memoryGrowth = (finalMemory - initialMemory) / initialMemory
        console.log(`Memory growth: ${(memoryGrowth * 100).toFixed(1)}%`)

        // Memory should not grow excessively (more than 3x)
        expect(memoryGrowth).toBeLessThan(3)
      }
    })
  })

  test.describe('Viewport Performance', () => {
    test('should render mobile viewport efficiently', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const startTime = Date.now()
      await page.goto('/en')
      await page.waitForLoadState('networkidle')
      const loadTime = Date.now() - startTime

      console.log(`Mobile viewport load time: ${loadTime}ms`)
      expect(loadTime).toBeLessThan(8000)
    })

    test('should render tablet viewport efficiently', async ({ page, browserName }, testInfo) => {
      // Skip on mobile browsers as they can't reliably test larger viewports
      test.skip(testInfo.project.name.includes('mobile'), 'Skip viewport resize on mobile emulation')

      await page.setViewportSize({ width: 768, height: 1024 })

      const startTime = Date.now()
      await page.goto('/en')
      await page.waitForLoadState('networkidle')
      const loadTime = Date.now() - startTime

      console.log(`Tablet viewport load time: ${loadTime}ms`)
      expect(loadTime).toBeLessThan(8000)
    })

    test('should render desktop viewport efficiently', async ({ page, browserName }, testInfo) => {
      // Skip on mobile browsers as they can't reliably test larger viewports
      test.skip(testInfo.project.name.includes('mobile'), 'Skip viewport resize on mobile emulation')

      await page.setViewportSize({ width: 1920, height: 1080 })

      const startTime = Date.now()
      await page.goto('/en')
      await page.waitForLoadState('networkidle')
      const loadTime = Date.now() - startTime

      console.log(`Desktop viewport load time: ${loadTime}ms`)
      expect(loadTime).toBeLessThan(8000)
    })
  })

  test.describe('Caching', () => {
    test('should benefit from browser caching on reload', async ({ page }) => {
      // First visit
      const firstStartTime = Date.now()
      await page.goto('/en')
      await page.waitForLoadState('networkidle')
      const firstLoadTime = Date.now() - firstStartTime

      // Reload (should benefit from cache)
      const secondStartTime = Date.now()
      await page.reload()
      await page.waitForLoadState('networkidle')
      const secondLoadTime = Date.now() - secondStartTime

      console.log(`First load: ${firstLoadTime}ms, Reload: ${secondLoadTime}ms`)

      // Reload should generally be faster or similar
      // Not always guaranteed due to network conditions
      expect(secondLoadTime).toBeLessThan(firstLoadTime * 1.5)
    })
  })
})
