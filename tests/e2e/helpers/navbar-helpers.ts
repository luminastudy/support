import { Page, expect, Locator } from '@playwright/test'

/**
 * Helper functions for navbar and logo testing
 */

/**
 * Get the navbar logo element (viewport-aware)
 * Note: Docusaurus renders two logo instances (main navbar + mobile sidebar)
 * This function returns the appropriate one based on context
 * @param page - Playwright page object
 * @returns Locator for the logo container
 */
export function getNavbarLogo(page: Page): Locator {
  // Use more specific selector to target main navbar logo
  // This avoids strict mode violations from multiple matches
  return page.locator('nav.navbar .navbar__logo').first()
}

/**
 * Get the navbar logo image element (viewport-aware)
 * Note: Docusaurus renders two logo instances (main navbar + mobile sidebar)
 * This function returns the appropriate one based on context
 * @param page - Playwright page object
 * @returns Locator for the logo image
 */
export function getNavbarLogoImage(page: Page): Locator {
  // Use more specific selector to target main navbar logo image
  // This avoids strict mode violations from multiple matches
  return page.locator('nav.navbar .navbar__logo img').first()
}

/**
 * Get the navbar brand link (logo + title container)
 * Note: Docusaurus renders two brand links (main navbar + mobile sidebar)
 * This function returns the appropriate one based on context
 * @param page - Playwright page object
 * @returns Locator for the brand link
 */
export function getNavbarBrand(page: Page): Locator {
  // Use more specific selector to target main navbar brand link
  // This avoids strict mode violations from multiple matches
  return page.locator('nav.navbar .navbar__brand').first()
}

/**
 * Get the navbar element
 * @param page - Playwright page object
 * @returns Locator for the navbar
 */
export function getNavbar(page: Page): Locator {
  return page.locator('nav.navbar')
}

/**
 * Verify logo is visible in navbar
 * Note: Docusaurus has two logos (main navbar + mobile sidebar)
 * This verifies at least one is visible on the page
 * @param page - Playwright page object
 */
export async function verifyLogoVisible(page: Page) {
  // Check that at least one logo container exists and is visible
  // Use count to verify presence without strict mode issues
  const logoCount = await page.locator('.navbar__logo').count()
  expect(
    logoCount,
    'At least one navbar logo container should exist'
  ).toBeGreaterThan(0)

  // Verify at least one logo image is visible
  const visibleLogos = page.locator('.navbar__logo img').locator('visible=true')
  await expect(
    visibleLogos.first(),
    'At least one navbar logo image should be visible'
  ).toBeVisible()
}

/**
 * Verify logo image loads successfully
 * @param page - Playwright page object
 */
export async function verifyLogoImageLoaded(page: Page) {
  const logoImage = getNavbarLogoImage(page)

  // Wait for image to be visible
  await expect(logoImage).toBeVisible()

  // Check that image has loaded (naturalWidth > 0 means image loaded successfully)
  const isLoaded = await logoImage.evaluate((img: HTMLImageElement) => {
    return img.complete && img.naturalWidth > 0
  })

  expect(isLoaded, 'Logo image should be fully loaded').toBe(true)
}

/**
 * Get logo image dimensions
 * @param page - Playwright page object
 * @returns Object with width, height, and naturalWidth, naturalHeight
 */
export async function getLogoImageDimensions(page: Page) {
  const logoImage = getNavbarLogoImage(page)

  return await logoImage.evaluate((img: HTMLImageElement) => {
    return {
      width: img.width,
      height: img.height,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }
  })
}

/**
 * Get logo container computed styles
 * @param page - Playwright page object
 * @returns Object with relevant CSS properties
 */
export async function getLogoContainerStyles(page: Page) {
  const logo = getNavbarLogo(page)

  return await logo.evaluate((el: HTMLElement) => {
    const styles = window.getComputedStyle(el)
    return {
      height: styles.height,
      width: styles.width,
      display: styles.display,
      overflow: styles.overflow,
    }
  })
}

/**
 * Verify logo has correct alt text
 * @param page - Playwright page object
 * @param expectedAltText - Expected alt attribute value
 */
export async function verifyLogoAltText(page: Page, expectedAltText: string) {
  const logoImage = getNavbarLogoImage(page)
  const altText = await logoImage.getAttribute('alt')

  expect(altText, `Logo should have alt text: ${expectedAltText}`).toBe(
    expectedAltText
  )
}

/**
 * Verify logo is clickable and links to homepage
 * Note: Handles dual-brand-link scenario (main navbar + mobile sidebar)
 * @param page - Playwright page object
 * @param expectedHref - Expected href attribute (default: '/support/')
 */
export async function verifyLogoLinksToHome(
  page: Page,
  expectedHref: string = '/support/'
) {
  // Check that at least one brand link exists
  const brandLinkCount = await page.locator('.navbar__brand').count()
  expect(
    brandLinkCount,
    'At least one navbar brand link should exist'
  ).toBeGreaterThan(0)

  // Get href from first visible brand link
  const brandLink = getNavbarBrand(page)
  const href = await brandLink.getAttribute('href')
  expect(href, `Logo should link to homepage: ${expectedHref}`).toContain(
    expectedHref
  )
}

/**
 * Click logo and verify navigation to homepage
 * @param page - Playwright page object
 * @param expectedUrl - Expected URL after clicking (can be regex or string)
 */
export async function clickLogoAndVerifyNavigation(
  page: Page,
  expectedUrl: string | RegExp = /\/support\/$/
) {
  const brandLink = getNavbarBrand(page)

  // Click the logo
  await brandLink.click()

  // Wait for navigation
  await page.waitForLoadState('networkidle')

  // Verify URL
  if (typeof expectedUrl === 'string') {
    expect(page.url()).toContain(expectedUrl)
  } else {
    expect(page.url()).toMatch(expectedUrl)
  }
}

/**
 * Verify logo height is within expected range for 2rem
 * @param page - Playwright page object
 * Note: 2rem can compute to different pixel values depending on root font-size
 * Docusaurus uses 18.4px root font size, making 2rem = 36.8px
 * Default browser is 16px, making 2rem = 32px
 */
export async function verifyLogoHeight(page: Page) {
  const styles = await getLogoContainerStyles(page)
  const heightValue = parseFloat(styles.height)

  // 2rem should be between 30px and 40px depending on root font-size
  expect(
    heightValue,
    `Logo container height should be between 30-40px (2rem), got ${styles.height}`
  ).toBeGreaterThanOrEqual(30)
  expect(
    heightValue,
    `Logo container height should be between 30-40px (2rem), got ${styles.height}`
  ).toBeLessThanOrEqual(40)
}

/**
 * Verify logo maintains aspect ratio
 * @param page - Playwright page object
 */
export async function verifyLogoAspectRatio(page: Page) {
  const dimensions = await getLogoImageDimensions(page)

  // Calculate aspect ratios
  const displayedAspectRatio = dimensions.width / dimensions.height
  const naturalAspectRatio = dimensions.naturalWidth / dimensions.naturalHeight

  // Allow for small floating point differences
  const tolerance = 0.01
  const difference = Math.abs(displayedAspectRatio - naturalAspectRatio)

  expect(
    difference,
    `Logo should maintain natural aspect ratio. Displayed: ${displayedAspectRatio.toFixed(
      2
    )}, Natural: ${naturalAspectRatio.toFixed(2)}`
  ).toBeLessThan(tolerance)
}

/**
 * Verify logo does not overflow navbar
 * @param page - Playwright page object
 */
export async function verifyLogoDoesNotOverflow(page: Page) {
  const logo = getNavbarLogo(page)
  const navbar = getNavbar(page)

  const logoBounds = await logo.boundingBox()
  const navbarBounds = await navbar.boundingBox()

  expect(logoBounds, 'Logo should have valid bounding box').not.toBeNull()
  expect(navbar, 'Navbar should have valid bounding box').not.toBeNull()

  if (logoBounds && navbarBounds) {
    // Check that logo is within navbar bounds
    const isWithinBounds =
      logoBounds.y >= navbarBounds.y &&
      logoBounds.y + logoBounds.height <= navbarBounds.y + navbarBounds.height

    expect(
      isWithinBounds,
      'Logo should be fully contained within navbar vertically'
    ).toBe(true)
  }
}

/**
 * Verify logo image source path
 * @param page - Playwright page object
 * @param expectedPath - Expected path in src attribute (e.g., '/support/img/logo.svg')
 */
export async function verifyLogoSource(page: Page, expectedPath: string) {
  const logoImage = getNavbarLogoImage(page)
  const src = await logoImage.getAttribute('src')

  expect(src, `Logo src should contain path: ${expectedPath}`).toContain(
    expectedPath
  )
}

/**
 * Get viewport dimensions
 * @param page - Playwright page object
 * @returns Object with viewport width and height
 */
export async function getViewportSize(page: Page) {
  return page.viewportSize()
}

/**
 * Set viewport size for responsive testing
 * @param page - Playwright page object
 * @param width - Viewport width
 * @param height - Viewport height
 */
export async function setViewportSize(
  page: Page,
  width: number,
  height: number
) {
  await page.setViewportSize({ width, height })
}

/**
 * Common viewport sizes for responsive testing
 */
export const viewportSizes = {
  desktop: { width: 1280, height: 720, name: 'Desktop' },
  tablet: { width: 768, height: 1024, name: 'Tablet' },
  mobile: { width: 375, height: 667, name: 'Mobile' },
  smallMobile: { width: 320, height: 568, name: 'Small Mobile' },
} as const

/**
 * Wait for navbar to be visible and ready
 * Note: Uses viewport-aware logo detection
 * @param page - Playwright page object
 */
export async function waitForNavbarReady(page: Page) {
  const navbar = getNavbar(page)
  await expect(navbar).toBeVisible()

  // Wait for at least one logo to be visible (handles dual-logo scenario)
  const visibleLogos = page.locator('.navbar__logo img').locator('visible=true')
  await expect(visibleLogos.first()).toBeVisible()

  // Wait for network to be idle
  await page.waitForLoadState('networkidle')
}
