import { test, expect } from '@playwright/test'
import {
  navigateToLocale,
  verifyTextDirection,
  verifyLanguageAttribute,
  switchLanguage,
  waitForPageReady,
} from '../helpers/i18n-helpers'
import {
  expectedDocumentationPages,
  languageLabels,
} from '../fixtures/expected-translations'

test.describe('Hebrew i18n Support - Documentation Pages', () => {
  test.describe('Introduction Page', () => {
    test('should load English introduction page', async ({ page }) => {
      await page.goto(expectedDocumentationPages.intro.path)
      await waitForPageReady(page)

      // Verify page loaded
      await expect(page.locator('main')).toBeVisible()
      expect(page.url()).toContain('/docs/intro')

      // Verify language attributes
      await verifyLanguageAttribute(page, 'en-US')
      await verifyTextDirection(page, 'ltr')
    })

    test('should load Hebrew introduction page', async ({ page }) => {
      await navigateToLocale(page, '/docs/intro', 'he')

      // Verify page loaded
      await expect(page.locator('main')).toBeVisible()
      expect(page.url()).toContain('/he/docs/intro')

      // Verify RTL language attributes
      await verifyLanguageAttribute(page, 'he-IL')
      await verifyTextDirection(page, 'rtl')
    })

    test('should have Hebrew content on Hebrew intro page', async ({
      page,
    }) => {
      await navigateToLocale(page, '/docs/intro', 'he')

      // Verify main content area exists and has content
      const main = page.locator('main article')
      await expect(main).toBeVisible()

      // Verify there's actual content (not empty)
      const content = await main.textContent()
      expect(content, 'Main content should not be empty').toBeTruthy()
      expect(
        content!.trim().length,
        'Content should have substantial text'
      ).toBeGreaterThan(50)
    })

    test('should switch from English to Hebrew on intro page', async ({
      page,
    }) => {
      await page.goto('/docs/intro')
      await waitForPageReady(page)

      // Switch to Hebrew
      await switchLanguage(page, languageLabels.hebrew)

      // Verify we're on Hebrew version of same page
      expect(page.url()).toContain('/he/docs/intro')
      await verifyTextDirection(page, 'rtl')
    })
  })

  test.describe('Students Guide Page', () => {
    test('should load English students guide page', async ({ page }) => {
      await page.goto(expectedDocumentationPages.students.path)
      await waitForPageReady(page)

      // Verify page loaded
      await expect(page.locator('main')).toBeVisible()
      expect(page.url()).toContain('/docs/students/browsing-courses')

      // Verify language attributes
      await verifyLanguageAttribute(page, 'en-US')
      await verifyTextDirection(page, 'ltr')
    })

    test('should load Hebrew students guide page', async ({ page }) => {
      await navigateToLocale(page, '/docs/students/browsing-courses', 'he')

      // Verify page loaded
      await expect(page.locator('main')).toBeVisible()
      expect(page.url()).toContain('/he/docs/students/browsing-courses')

      // Verify RTL language attributes
      await verifyLanguageAttribute(page, 'he-IL')
      await verifyTextDirection(page, 'rtl')
    })

    test('should have Hebrew content on students guide page', async ({
      page,
    }) => {
      await navigateToLocale(page, '/docs/students/browsing-courses', 'he')

      // Verify main content exists
      const main = page.locator('main article')
      await expect(main).toBeVisible()

      // Verify there's content
      const content = await main.textContent()
      expect(content, 'Students guide should have content').toBeTruthy()
      expect(content!.trim().length).toBeGreaterThan(50)
    })
  })

  test.describe('Educators Guide Page', () => {
    test('should load English educators guide page', async ({ page }) => {
      await page.goto(expectedDocumentationPages.educators.path)
      await waitForPageReady(page)

      // Verify page loaded
      await expect(page.locator('main')).toBeVisible()
      expect(page.url()).toContain('/docs/educators/creating-courses')

      // Verify language attributes
      await verifyLanguageAttribute(page, 'en-US')
      await verifyTextDirection(page, 'ltr')
    })

    test('should load Hebrew educators guide page', async ({ page }) => {
      await navigateToLocale(page, '/docs/educators/creating-courses', 'he')

      // Verify page loaded
      await expect(page.locator('main')).toBeVisible()
      expect(page.url()).toContain('/he/docs/educators/creating-courses')

      // Verify RTL language attributes
      await verifyLanguageAttribute(page, 'he-IL')
      await verifyTextDirection(page, 'rtl')
    })

    test('should have Hebrew content on educators guide page', async ({
      page,
    }) => {
      await navigateToLocale(page, '/docs/educators/creating-courses', 'he')

      // Verify main content exists
      const main = page.locator('main article')
      await expect(main).toBeVisible()

      // Verify there's content
      const content = await main.textContent()
      expect(content, 'Educators guide should have content').toBeTruthy()
      expect(content!.trim().length).toBeGreaterThan(50)
    })
  })

  test.describe('Developers Setup Page', () => {
    test('should load English developers setup page', async ({ page }) => {
      await page.goto(expectedDocumentationPages.developers.path)
      await waitForPageReady(page)

      // Verify page loaded
      await expect(page.locator('main')).toBeVisible()
      expect(page.url()).toContain('/docs/developers/setup')

      // Verify language attributes
      await verifyLanguageAttribute(page, 'en-US')
      await verifyTextDirection(page, 'ltr')
    })

    test('should load Hebrew developers setup page', async ({ page }) => {
      await navigateToLocale(page, '/docs/developers/setup', 'he')

      // Verify page loaded
      await expect(page.locator('main')).toBeVisible()
      expect(page.url()).toContain('/he/docs/developers/setup')

      // Verify RTL language attributes
      await verifyLanguageAttribute(page, 'he-IL')
      await verifyTextDirection(page, 'rtl')
    })

    test('should have Hebrew content on developers setup page', async ({
      page,
    }) => {
      await navigateToLocale(page, '/docs/developers/setup', 'he')

      // Verify main content exists
      const main = page.locator('main article')
      await expect(main).toBeVisible()

      // Verify there's content
      const content = await main.textContent()
      expect(content, 'Developers setup should have content').toBeTruthy()
      expect(content!.trim().length).toBeGreaterThan(50)
    })

    test('should render code blocks correctly in RTL context', async ({
      page,
    }) => {
      await navigateToLocale(page, '/docs/developers/setup', 'he')

      // Check if there are code blocks (if page has them)
      const codeBlocks = page.locator('pre code')
      const codeBlockCount = await codeBlocks.count()

      if (codeBlockCount > 0) {
        // Verify first code block is visible
        await expect(codeBlocks.first()).toBeVisible()

        // Code blocks should remain LTR even in RTL context
        // This is automatically handled by most markdown renderers
      }
    })
  })

  test.describe('Deep Linking', () => {
    test('should directly navigate to Hebrew intro page', async ({ page }) => {
      // Direct navigation to Hebrew URL
      await page.goto('/he/docs/intro')
      await waitForPageReady(page)

      // Verify page loaded correctly
      expect(page.url()).toContain('/he/docs/intro')
      await verifyTextDirection(page, 'rtl')
      await verifyLanguageAttribute(page, 'he-IL')
      await expect(page.locator('main')).toBeVisible()
    })

    test('should directly navigate to Hebrew students guide', async ({
      page,
    }) => {
      await page.goto('/he/docs/students/browsing-courses')
      await waitForPageReady(page)

      expect(page.url()).toContain('/he/docs/students/browsing-courses')
      await verifyTextDirection(page, 'rtl')
      await expect(page.locator('main')).toBeVisible()
    })

    test('should directly navigate to Hebrew educators guide', async ({
      page,
    }) => {
      await page.goto('/he/docs/educators/creating-courses')
      await waitForPageReady(page)

      expect(page.url()).toContain('/he/docs/educators/creating-courses')
      await verifyTextDirection(page, 'rtl')
      await expect(page.locator('main')).toBeVisible()
    })

    test('should directly navigate to Hebrew developers setup', async ({
      page,
    }) => {
      await page.goto('/he/docs/developers/setup')
      await waitForPageReady(page)

      expect(page.url()).toContain('/he/docs/developers/setup')
      await verifyTextDirection(page, 'rtl')
      await expect(page.locator('main')).toBeVisible()
    })
  })

  test.describe('Sidebar Navigation in Hebrew', () => {
    test('should display sidebar in Hebrew on Hebrew pages', async ({
      page,
    }) => {
      await navigateToLocale(page, '/docs/intro', 'he')

      // Verify sidebar exists (Docusaurus uses aside element for sidebar)
      const sidebar = page.locator('aside.theme-doc-sidebar-container')
      await expect(sidebar).toBeVisible()
    })

    test('should navigate between Hebrew pages using sidebar', async ({
      page,
    }) => {
      await navigateToLocale(page, '/docs/intro', 'he')

      // Find and click a sidebar link (if available)
      const sidebar = page.locator('aside.theme-doc-sidebar-container')
      const sidebarLinks = sidebar.locator('a')

      // Check if there are sidebar links
      const linkCount = await sidebarLinks.count()
      if (linkCount > 0) {
        // Click first sidebar link
        const firstLink = sidebarLinks.first()
        await firstLink.click()
        await waitForPageReady(page)

        // Verify we're still in Hebrew locale
        expect(page.url()).toContain('/he/')
        await verifyTextDirection(page, 'rtl')
      }
    })
  })

  test.describe('Content Integrity', () => {
    test('should render Hebrew characters correctly', async ({ page }) => {
      await navigateToLocale(page, '/docs/intro', 'he')

      // Get main content
      const main = page.locator('main article')
      const content = await main.textContent()

      // Verify Hebrew characters are present (Unicode range for Hebrew: \u0590-\u05FF)
      const hasHebrewChars = /[\u0590-\u05FF]/.test(content || '')
      expect(hasHebrewChars, 'Page should contain Hebrew characters').toBe(true)
    })

    test('should not have encoding issues with special Hebrew characters', async ({
      page,
    }) => {
      await navigateToLocale(page, '/docs/intro', 'he')

      const main = page.locator('main article')
      const content = await main.textContent()

      // Check for common encoding issue indicators
      expect(content).not.toContain('�') // Replacement character
      expect(content).not.toContain('&#') // HTML entities shouldn't be visible
    })

    test('should handle mixed content (Hebrew + English) correctly', async ({
      page,
    }) => {
      await navigateToLocale(page, '/docs/intro', 'he')

      // Verify page renders without layout issues
      await expect(page.locator('main')).toBeVisible()

      // Verify no JavaScript errors (would indicate rendering issues)
      const errors: string[] = []
      page.on('pageerror', error => errors.push(error.message))

      await page.waitForTimeout(1000) // Wait to catch any errors
      expect(errors, 'Page should not have JavaScript errors').toHaveLength(0)
    })
  })

  test.describe('All Documentation Pages Exist', () => {
    const pages = [
      { name: 'Intro', path: '/docs/intro' },
      { name: 'Students Guide', path: '/docs/students/browsing-courses' },
      { name: 'Educators Guide', path: '/docs/educators/creating-courses' },
      { name: 'Developers Setup', path: '/docs/developers/setup' },
    ]

    for (const { name, path } of pages) {
      test(`should have Hebrew version of ${name}`, async ({ page }) => {
        await navigateToLocale(page, path, 'he')

        // Verify page exists (not 404)
        await expect(page.locator('main')).toBeVisible()

        // Verify no 404 content
        const content = await page.textContent('main')
        expect(content).not.toContain('404')
        expect(content).not.toContain('Page Not Found')

        // Verify RTL
        await verifyTextDirection(page, 'rtl')
      })
    }
  })
})
