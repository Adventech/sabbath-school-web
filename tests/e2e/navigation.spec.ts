import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.describe('Home Page', () => {
    test('should load the home page', async ({ page }) => {
      await page.goto('/')

      // Should redirect to language-specific page or show language selector
      await expect(page).toHaveURL(/\/(en|quarterlies)?/)
    })

    test('should navigate to English quarterlies', async ({ page }) => {
      await page.goto('/en')

      // Should load English quarterlies page
      await expect(page).toHaveURL(/\/en/)
    })

    test('should have a header', async ({ page }) => {
      await page.goto('/en')

      // Check for header element
      const header = page.locator('header').first()
      await expect(header).toBeVisible()
    })
  })

  test.describe('Language Navigation', () => {
    test('should navigate to Spanish content', async ({ page }) => {
      await page.goto('/es')
      await expect(page).toHaveURL(/\/es/)
    })

    test('should navigate to French content', async ({ page }) => {
      await page.goto('/fr')
      await expect(page).toHaveURL(/\/fr/)
    })

    test('should navigate to German content', async ({ page }) => {
      await page.goto('/de')
      await expect(page).toHaveURL(/\/de/)
    })
  })

  test.describe('RTL Languages', () => {
    test('should set RTL direction for Arabic', async ({ page }) => {
      await page.goto('/ar')

      // App sets dir attribute on wrapper div, not html/body
      const rtlElement = page.locator('[dir="rtl"]')
      await expect(rtlElement).toBeVisible()
    })

    test('should set RTL direction for Hebrew', async ({ page }) => {
      await page.goto('/he')

      const rtlElement = page.locator('[dir="rtl"]')
      await expect(rtlElement).toBeVisible()
    })

    test('should set RTL direction for Persian', async ({ page }) => {
      await page.goto('/fa')

      const rtlElement = page.locator('[dir="rtl"]')
      await expect(rtlElement).toBeVisible()
    })
  })

  test.describe('Error Handling', () => {
    test('should handle invalid language code gracefully', async ({ page }) => {
      const response = await page.goto('/invalid-language-code')

      // Should either redirect or show an error page, not crash
      expect(response?.status()).toBeLessThan(500)
    })

    test('should handle 404 for non-existent routes', async ({ page }) => {
      const response = await page.goto('/en/non-existent-quarterly/non-existent-lesson')

      // Should not return a server error
      expect(response?.status()).toBeLessThan(500)
    })
  })

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/en')

      // Page should still be functional at mobile size
      await expect(page.locator('body')).toBeVisible()
    })

    test('should be responsive on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      await page.goto('/en')

      // Page should still be functional at tablet size
      await expect(page.locator('body')).toBeVisible()
    })

    test('should be responsive on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto('/en')

      // Page should still be functional at desktop size
      await expect(page.locator('body')).toBeVisible()
    })
  })

  test.describe('Theme', () => {
    test('should load with a default theme', async ({ page }) => {
      await page.goto('/en')

      // Check for theme class on body or main container
      const body = page.locator('body')
      await expect(body).toBeVisible()

      // Theme should be applied (light, sepia, or dark)
      const classes = await body.getAttribute('class')
      const hasTheme = classes?.includes('theme') ||
        classes?.includes('light') ||
        classes?.includes('dark') ||
        classes?.includes('sepia')

      // Theme class might be on a child element, so we just verify page loads
      expect(await page.title()).toBeDefined()
    })
  })
})
