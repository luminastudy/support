import { Page, expect } from '@playwright/test'

/**
 * Helper functions for i18n testing
 */

/**
 * Switch to a specific language using the locale dropdown
 * @param page - Playwright page object
 * @param language - Language label to switch to ('English' or 'עברית')
 */
export async function switchLanguage(page: Page, language: string) {
  // Find and click the locale dropdown button
  const localeDropdown = page
    .locator('button.navbar__link')
    .filter({ hasText: /English|עברית/ })
  await localeDropdown.click()

  // Wait for dropdown menu to appear
  await page.waitForSelector('.dropdown__menu', { state: 'visible' })

  // Click the language option
  const languageOption = page
    .locator('.dropdown__menu a')
    .filter({ hasText: language })
  await languageOption.click()

  // Wait for navigation to complete
  await page.waitForLoadState('networkidle')
}

/**
 * Verify that the page has the correct RTL direction
 * @param page - Playwright page object
 * @param expectedDirection - Expected direction ('rtl' or 'ltr')
 */
export async function verifyTextDirection(
  page: Page,
  expectedDirection: 'rtl' | 'ltr'
) {
  const htmlElement = page.locator('html')
  const dir = await htmlElement.getAttribute('dir')
  expect(dir, `HTML dir attribute should be ${expectedDirection}`).toBe(
    expectedDirection
  )
}

/**
 * Verify that the page has the correct language attribute
 * @param page - Playwright page object
 * @param expectedLang - Expected language code ('en-US' or 'he-IL')
 */
export async function verifyLanguageAttribute(
  page: Page,
  expectedLang: string
) {
  const htmlElement = page.locator('html')
  const lang = await htmlElement.getAttribute('lang')
  expect(lang, `HTML lang attribute should be ${expectedLang}`).toBe(
    expectedLang
  )
}

/**
 * Check if the current URL contains a specific locale prefix
 * @param page - Playwright page object
 * @param locale - Locale prefix to check ('en' or 'he')
 */
export function isLocaleInUrl(page: Page, locale: 'en' | 'he'): boolean {
  const url = page.url()
  if (locale === 'en') {
    // English is default, so it should NOT have /he/ prefix
    return !url.includes('/he/')
  } else {
    // Hebrew should have /he/ prefix
    return url.includes('/he/')
  }
}

/**
 * Navigate to a specific page in a specific locale
 * @param page - Playwright page object
 * @param path - Path relative to base URL (e.g., '/docs/intro')
 * @param locale - Locale ('en' or 'he')
 */
export async function navigateToLocale(
  page: Page,
  path: string,
  locale: 'en' | 'he'
) {
  const localePath = locale === 'he' ? `/he${path}` : path
  await page.goto(localePath)
  await page.waitForLoadState('networkidle')
}

/**
 * Get the current locale from the URL
 * @param page - Playwright page object
 * @returns 'en' or 'he'
 */
export function getCurrentLocale(page: Page): 'en' | 'he' {
  const url = page.url()
  return url.includes('/he/') ? 'he' : 'en'
}

/**
 * Verify that navbar contains expected text
 * @param page - Playwright page object
 * @param expectedText - Text that should be in navbar
 */
export async function verifyNavbarContains(page: Page, expectedText: string) {
  const navbar = page.locator('nav.navbar')
  await expect(
    navbar,
    `Navbar should contain text: ${expectedText}`
  ).toContainText(expectedText)
}

/**
 * Verify that footer contains expected text
 * @param page - Playwright page object
 * @param expectedText - Text that should be in footer
 */
export async function verifyFooterContains(page: Page, expectedText: string) {
  const footer = page.locator('footer.footer')
  await expect(
    footer,
    `Footer should contain text: ${expectedText}`
  ).toContainText(expectedText)
}

/**
 * Get all footer link texts
 * @param page - Playwright page object
 * @returns Array of footer link texts
 */
export async function getFooterLinkTexts(page: Page): Promise<string[]> {
  const footer = page.locator('footer.footer')
  const links = footer.locator('a')
  const count = await links.count()
  const texts: string[] = []

  for (let i = 0; i < count; i++) {
    const text = await links.nth(i).textContent()
    if (text) {
      texts.push(text.trim())
    }
  }

  return texts
}

/**
 * Verify that the page is fully loaded and ready for testing
 * @param page - Playwright page object
 */
export async function waitForPageReady(page: Page) {
  // Wait for network to be idle
  await page.waitForLoadState('networkidle')

  // Wait for navbar to be visible
  await page.waitForSelector('nav.navbar', { state: 'visible' })

  // Wait for main content to be visible
  await page.waitForSelector('main', { state: 'visible' })
}

/**
 * Take a screenshot with a descriptive name
 * @param page - Playwright page object
 * @param name - Screenshot name
 */
export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({
    path: `test-results/screenshots/${name}.png`,
    fullPage: true,
  })
}
