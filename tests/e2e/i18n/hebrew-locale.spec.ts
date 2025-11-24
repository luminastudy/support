import { test, expect } from '@playwright/test'
import {
  switchLanguage,
  verifyTextDirection,
  verifyLanguageAttribute,
  isLocaleInUrl,
  navigateToLocale,
  verifyNavbarContains,
  verifyFooterContains,
  waitForPageReady,
} from '../helpers/i18n-helpers'
import {
  expectedNavbarTranslations,
  expectedFooterTranslations,
  languageLabels,
} from '../fixtures/expected-translations'

test.describe('Hebrew i18n Support - Homepage and Navigation', () => {
  test.describe('English Homepage', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/')
      await waitForPageReady(page)
    })

    test('should load English homepage successfully', async ({ page }) => {
      // Verify we're on the homepage
      expect(page.url()).toContain('/support/')
      expect(page.url()).not.toContain('/he/')

      // Verify page is loaded
      await expect(page.locator('main')).toBeVisible()
    })

    test('should have correct language attributes for English', async ({
      page,
    }) => {
      // Verify language attribute
      await verifyLanguageAttribute(page, 'en-US')

      // Verify text direction
      await verifyTextDirection(page, 'ltr')
    })

    test('should display language dropdown in navbar', async ({ page }) => {
      // Check that locale dropdown exists
      const localeDropdown = page.locator('button.navbar__link').filter({
        hasText: /English|עברית/,
      })
      await expect(localeDropdown).toBeVisible()
    })

    test('should show English label in language dropdown', async ({ page }) => {
      const localeDropdown = page.locator('button.navbar__link').filter({
        hasText: languageLabels.english,
      })
      await expect(localeDropdown).toBeVisible()
    })
  })

  test.describe('Hebrew Homepage', () => {
    test.beforeEach(async ({ page }) => {
      await navigateToLocale(page, '/', 'he')
    })

    test('should load Hebrew homepage successfully', async ({ page }) => {
      // Verify we're on the Hebrew homepage
      expect(page.url()).toContain('/he/')

      // Verify page is loaded
      await expect(page.locator('main')).toBeVisible()
    })

    test('should have correct language attributes for Hebrew', async ({
      page,
    }) => {
      // Verify language attribute
      await verifyLanguageAttribute(page, 'he-IL')

      // Verify text direction is RTL
      await verifyTextDirection(page, 'rtl')
    })

    test('should have dir="rtl" attribute on html element', async ({
      page,
    }) => {
      const htmlDir = await page.locator('html').getAttribute('dir')
      expect(htmlDir, 'HTML element should have dir="rtl" for Hebrew').toBe(
        'rtl'
      )
    })

    test('should display Hebrew label in language dropdown', async ({
      page,
    }) => {
      const localeDropdown = page.locator('button.navbar__link').filter({
        hasText: languageLabels.hebrew,
      })
      await expect(localeDropdown).toBeVisible()
    })
  })

  test.describe('Language Switching', () => {
    test('should switch from English to Hebrew', async ({ page }) => {
      // Start on English homepage
      await page.goto('/')
      await waitForPageReady(page)

      // Verify we're on English
      expect(isLocaleInUrl(page, 'en')).toBe(true)
      await verifyTextDirection(page, 'ltr')

      // Switch to Hebrew
      await switchLanguage(page, languageLabels.hebrew)

      // Verify we're now on Hebrew
      expect(page.url()).toContain('/he/')
      await verifyTextDirection(page, 'rtl')
      await verifyLanguageAttribute(page, 'he-IL')
    })

    test('should switch from Hebrew to English', async ({ page }) => {
      // Start on Hebrew homepage
      await navigateToLocale(page, '/', 'he')

      // Verify we're on Hebrew
      expect(page.url()).toContain('/he/')
      await verifyTextDirection(page, 'rtl')

      // Switch to English
      await switchLanguage(page, languageLabels.english)

      // Verify we're now on English
      expect(page.url()).not.toContain('/he/')
      await verifyTextDirection(page, 'ltr')
      await verifyLanguageAttribute(page, 'en-US')
    })

    test('should maintain page context when switching languages', async ({
      page,
    }) => {
      // Start on English intro page
      await page.goto('/docs/intro')
      await waitForPageReady(page)

      // Switch to Hebrew
      await switchLanguage(page, languageLabels.hebrew)

      // Verify we're on the Hebrew version of the same page
      expect(page.url()).toContain('/he/docs/intro')
      await verifyTextDirection(page, 'rtl')
    })

    test('should update URL correctly when switching languages', async ({
      page,
    }) => {
      // Start on English
      await page.goto('/')
      await waitForPageReady(page)

      const englishUrl = page.url()

      // Switch to Hebrew
      await switchLanguage(page, languageLabels.hebrew)
      await waitForPageReady(page)

      const hebrewUrl = page.url()

      // Verify URLs are different and Hebrew contains /he/
      expect(hebrewUrl).not.toBe(englishUrl)
      expect(hebrewUrl).toContain('/he/')
    })
  })

  test.describe('Navigation Elements Translation', () => {
    test('should display translated navbar in Hebrew', async ({ page }) => {
      await navigateToLocale(page, '/', 'he')

      // Verify Documentation link is translated
      await verifyNavbarContains(page, expectedNavbarTranslations.documentation)
    })

    test('should display translated footer sections in Hebrew', async ({
      page,
    }) => {
      await navigateToLocale(page, '/', 'he')

      // Verify all footer section titles are translated
      await verifyFooterContains(
        page,
        expectedFooterTranslations.sections.documentation
      )
      await verifyFooterContains(
        page,
        expectedFooterTranslations.sections.community
      )
      await verifyFooterContains(
        page,
        expectedFooterTranslations.sections.resources
      )
    })

    test('should display translated footer links in Hebrew', async ({
      page,
    }) => {
      await navigateToLocale(page, '/', 'he')

      // Verify footer links are translated
      await verifyFooterContains(
        page,
        expectedFooterTranslations.links.gettingStarted
      )
      await verifyFooterContains(
        page,
        expectedFooterTranslations.links.forStudents
      )
      await verifyFooterContains(
        page,
        expectedFooterTranslations.links.forEducators
      )
      await verifyFooterContains(
        page,
        expectedFooterTranslations.links.forDevelopers
      )
    })

    test('should display translated copyright in Hebrew', async ({ page }) => {
      await navigateToLocale(page, '/', 'he')

      // Verify copyright is translated
      await verifyFooterContains(page, expectedFooterTranslations.copyright)
    })

    test('should keep English navbar when on English site', async ({
      page,
    }) => {
      await page.goto('/')
      await waitForPageReady(page)

      // Verify Documentation is in English
      await verifyNavbarContains(page, 'Documentation')

      // Verify Hebrew translation is NOT present
      const navbar = page.locator('nav.navbar')
      const navbarText = await navbar.textContent()
      expect(navbarText).not.toContain(expectedNavbarTranslations.documentation)
    })
  })

  test.describe('RTL Layout Verification', () => {
    test('should have RTL text alignment for Hebrew pages', async ({
      page,
    }) => {
      await navigateToLocale(page, '/docs/intro', 'he')

      // Verify RTL direction
      await verifyTextDirection(page, 'rtl')

      // Verify main content has proper direction
      const main = page.locator('main')
      await expect(main).toBeVisible()
    })

    test('should mirror navbar layout for RTL', async ({ page }) => {
      await navigateToLocale(page, '/', 'he')

      // Verify navbar is visible and properly styled
      const navbar = page.locator('nav.navbar')
      await expect(navbar).toBeVisible()

      // Verify HTML dir attribute is rtl (which triggers CSS mirroring)
      const htmlDir = await page.locator('html').getAttribute('dir')
      expect(htmlDir).toBe('rtl')
    })

    test('should mirror footer layout for RTL', async ({ page }) => {
      await navigateToLocale(page, '/', 'he')

      // Verify footer is visible
      const footer = page.locator('footer.footer')
      await expect(footer).toBeVisible()

      // Verify footer contains Hebrew text (indicating RTL rendering)
      await expect(footer).toContainText(
        expectedFooterTranslations.sections.documentation
      )
    })

    test('should have LTR layout for English pages', async ({ page }) => {
      await page.goto('/')
      await waitForPageReady(page)

      // Verify LTR direction
      await verifyTextDirection(page, 'ltr')
    })
  })

  test.describe('Browser Navigation', () => {
    test('should handle back/forward buttons correctly', async ({ page }) => {
      // Navigate to English homepage
      await page.goto('/')
      await waitForPageReady(page)

      // Switch to Hebrew
      await switchLanguage(page, languageLabels.hebrew)
      expect(page.url()).toContain('/he/')

      // Go back
      await page.goBack()
      await waitForPageReady(page)

      // Should be back on English
      expect(page.url()).not.toContain('/he/')

      // Go forward
      await page.goForward()
      await waitForPageReady(page)

      // Should be on Hebrew again
      expect(page.url()).toContain('/he/')
    })

    test('should preserve language when navigating between pages', async ({
      page,
    }) => {
      // Start on Hebrew homepage
      await navigateToLocale(page, '/', 'he')

      // Click on a documentation link in footer
      await page.click('footer a[href*="/docs/intro"]')
      await waitForPageReady(page)

      // Should still be in Hebrew
      expect(page.url()).toContain('/he/')
      await verifyTextDirection(page, 'rtl')
    })
  })
})
