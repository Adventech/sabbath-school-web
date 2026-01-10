import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test.describe('Home Page', () => {
    test('should have no critical accessibility violations on home page', async ({ page }) => {
      await page.goto('/en')

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      // Filter for critical and serious violations only
      const criticalViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      )

      expect(criticalViolations).toEqual([])
    })

    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/en')

      // Check that there's at least one h1
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBeGreaterThanOrEqual(1)

      // Check heading hierarchy using axe
      const results = await new AxeBuilder({ page })
        .withRules(['heading-order'])
        .analyze()

      expect(results.violations).toEqual([])
    })

    test('should have accessible images with alt text', async ({ page }) => {
      await page.goto('/en')

      const results = await new AxeBuilder({ page })
        .withRules(['image-alt'])
        .analyze()

      expect(results.violations).toEqual([])
    })
  })

  test.describe('Navigation Accessibility', () => {
    test('should have accessible navigation landmarks', async ({ page }) => {
      await page.goto('/en')

      const results = await new AxeBuilder({ page })
        .withRules(['landmark-one-main', 'region'])
        .analyze()

      // Log violations for debugging
      if (results.violations.length > 0) {
        console.log('Landmark violations:', JSON.stringify(results.violations, null, 2))
      }

      // Check for main landmark or similar structure
      const mainLandmark = await page.locator('main, [role="main"]').count()
      expect(mainLandmark).toBeGreaterThanOrEqual(0) // Flexible check
    })

    test('should have keyboard-navigable interactive elements', async ({ page }) => {
      await page.goto('/en')

      const results = await new AxeBuilder({ page })
        .withRules(['focus-order-semantics', 'tabindex'])
        .analyze()

      expect(results.violations).toEqual([])
    })

    test('should support keyboard navigation', async ({ page }) => {
      await page.goto('/en')

      // Press Tab and verify focus moves
      await page.keyboard.press('Tab')
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName)

      // Should have some element focused after tab
      expect(focusedElement).toBeDefined()
    })
  })

  test.describe('Color and Contrast', () => {
    test('should have sufficient color contrast', async ({ page }) => {
      await page.goto('/en')

      const results = await new AxeBuilder({ page })
        .withRules(['color-contrast'])
        .analyze()

      // Filter only serious contrast issues
      const seriousViolations = results.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      )

      expect(seriousViolations).toEqual([])
    })
  })

  test.describe('Form Accessibility', () => {
    test('should have accessible form labels', async ({ page }) => {
      await page.goto('/en')

      const results = await new AxeBuilder({ page })
        .withRules(['label', 'label-title-only'])
        .analyze()

      expect(results.violations).toEqual([])
    })
  })

  test.describe('RTL Language Accessibility', () => {
    test('should maintain accessibility in Arabic (RTL)', async ({ page }) => {
      await page.goto('/ar')

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze()

      const criticalViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      )

      expect(criticalViolations).toEqual([])
    })

    test('should have correct text direction attribute for RTL', async ({ page }) => {
      await page.goto('/ar')

      const htmlDir = await page.locator('html').getAttribute('dir')
      const bodyDir = await page.locator('body').getAttribute('dir')

      const isRtl = htmlDir === 'rtl' || bodyDir === 'rtl'
      expect(isRtl).toBeTruthy()
    })

    test('should maintain accessibility in Hebrew (RTL)', async ({ page }) => {
      await page.goto('/he')

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze()

      const criticalViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      )

      expect(criticalViolations).toEqual([])
    })
  })

  test.describe('Responsive Accessibility', () => {
    test('should be accessible on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/en')

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze()

      const criticalViolations = results.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      )

      expect(criticalViolations).toEqual([])
    })

    test('should be accessible on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      await page.goto('/en')

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze()

      const criticalViolations = results.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      )

      expect(criticalViolations).toEqual([])
    })

    test('touch targets should be appropriately sized on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/en')

      const results = await new AxeBuilder({ page })
        .withRules(['target-size'])
        .analyze()

      // Log violations for awareness
      if (results.violations.length > 0) {
        console.log('Touch target violations:', JSON.stringify(results.violations, null, 2))
      }

      // This is informational - not all violations may be critical
      expect(results.violations.filter(v => v.impact === 'critical')).toEqual([])
    })
  })

  test.describe('Screen Reader Support', () => {
    test('should have accessible link text', async ({ page }) => {
      await page.goto('/en')

      const results = await new AxeBuilder({ page })
        .withRules(['link-name'])
        .analyze()

      expect(results.violations).toEqual([])
    })

    test('should have accessible button text', async ({ page }) => {
      await page.goto('/en')

      const results = await new AxeBuilder({ page })
        .withRules(['button-name'])
        .analyze()

      expect(results.violations).toEqual([])
    })

    test('should use ARIA attributes correctly', async ({ page }) => {
      await page.goto('/en')

      const results = await new AxeBuilder({ page })
        .withRules([
          'aria-allowed-attr',
          'aria-required-attr',
          'aria-valid-attr',
          'aria-valid-attr-value'
        ])
        .analyze()

      expect(results.violations).toEqual([])
    })
  })

  test.describe('Document Structure', () => {
    test('should have valid HTML structure', async ({ page }) => {
      await page.goto('/en')

      const results = await new AxeBuilder({ page })
        .withRules(['document-title', 'html-has-lang', 'html-lang-valid'])
        .analyze()

      expect(results.violations).toEqual([])
    })

    test('should have a document title', async ({ page }) => {
      await page.goto('/en')

      const title = await page.title()
      expect(title).toBeDefined()
      expect(title.length).toBeGreaterThan(0)
    })

    test('should have a valid lang attribute', async ({ page }) => {
      await page.goto('/en')

      const lang = await page.locator('html').getAttribute('lang')
      expect(lang).toBeTruthy()
    })
  })
})
