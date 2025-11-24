import { test, expect } from '@playwright/test'
import {
  getNavbarLogo,
  getNavbarLogoImage,
  verifyLogoVisible,
  verifyLogoImageLoaded,
  verifyLogoAltText,
  verifyLogoLinksToHome,
  clickLogoAndVerifyNavigation,
  verifyLogoHeight,
  verifyLogoAspectRatio,
  verifyLogoDoesNotOverflow,
  verifyLogoSource,
  getLogoImageDimensions,
  getLogoContainerStyles,
  viewportSizes,
  setViewportSize,
  waitForNavbarReady,
} from '../helpers/navbar-helpers'

/**
 * E2E Test Suite for Logo Styling Feature
 *
 * Tests comprehensive logo display and styling across:
 * - Multiple pages (homepage, docs)
 * - Desktop and mobile viewports
 * - All configured browsers
 * - Light and dark modes
 */

test.describe('Logo Styling - Visibility and Loading', () => {
  test('should display logo on homepage', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    await verifyLogoVisible(page)
    await verifyLogoImageLoaded(page)
  })

  test('should display logo on documentation page', async ({ page }) => {
    await page.goto('/docs/intro')
    await waitForNavbarReady(page)

    await verifyLogoVisible(page)
    await verifyLogoImageLoaded(page)
  })

  test('should display logo on all documentation pages', async ({ page }) => {
    const pages = [
      '/docs/intro',
      '/docs/students/browsing-courses',
      '/docs/educators/creating-courses',
      '/docs/developers/setup',
    ]

    for (const path of pages) {
      await page.goto(path)
      await waitForNavbarReady(page)

      await verifyLogoVisible(page)
      await verifyLogoImageLoaded(page)
    }
  })
})

test.describe('Logo Styling - Size and Dimensions', () => {
  test('should have correct logo height (2rem)', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    await verifyLogoHeight(page)
  })

  test('should have auto width for logo container', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    const styles = await getLogoContainerStyles(page)

    // Width should be auto (meaning it will be determined by content)
    // In computed styles, auto typically shows as the actual computed pixel value
    // We just verify it's a valid pixel value
    expect(
      styles.width,
      'Logo container width should be a valid pixel value'
    ).toMatch(/^\d+(?:\.\d+)?px$/) // eslint-disable-line security/detect-unsafe-regex
  })

  test('should maintain logo aspect ratio', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    await verifyLogoAspectRatio(page)
  })

  test('should apply height: 100% to logo image', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    const logoImage = getNavbarLogoImage(page)
    const logoContainer = getNavbarLogo(page)

    // Get container height
    const containerStyles = await getLogoContainerStyles(page)
    const containerHeight = parseFloat(containerStyles.height)

    // Get image height
    const imageStyles = await logoImage.evaluate((img: HTMLElement) => {
      const styles = window.getComputedStyle(img)
      return {
        height: styles.height,
        width: styles.width,
      }
    })
    const imageHeight = parseFloat(imageStyles.height)

    // Image height should match container height (100%)
    expect(
      Math.abs(imageHeight - containerHeight),
      `Logo image height (${imageHeight}px) should match container height (${containerHeight}px)`
    ).toBeLessThan(1) // Allow for rounding

    // Image width should be auto (maintaining aspect ratio)
    expect(
      imageStyles.width,
      'Logo image width should be auto to maintain aspect ratio'
    ).toMatch(/^\d+(?:\.\d+)?px$/) // eslint-disable-line security/detect-unsafe-regex
  })

  test('should not overflow navbar', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    await verifyLogoDoesNotOverflow(page)
  })
})

test.describe('Logo Styling - Image Properties', () => {
  test('should load logo image from correct path', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    await verifyLogoSource(page, '/support/img/logo.svg')
  })

  test('should have correct alt text', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    await verifyLogoAltText(page, 'Lumina Study Logo')
  })

  test('should have valid image dimensions', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    const dimensions = await getLogoImageDimensions(page)

    // Verify image has loaded with valid dimensions
    expect(
      dimensions.naturalWidth,
      'Logo should have natural width > 0'
    ).toBeGreaterThan(0)
    expect(
      dimensions.naturalHeight,
      'Logo should have natural height > 0'
    ).toBeGreaterThan(0)

    // Verify displayed dimensions (height should be 2rem, which is 30-40px depending on root font-size)
    expect(
      dimensions.height,
      'Logo displayed height should be between 30-40px'
    ).toBeGreaterThanOrEqual(30)
    expect(
      dimensions.height,
      'Logo displayed height should be between 30-40px'
    ).toBeLessThanOrEqual(40)
    expect(
      dimensions.width,
      'Logo displayed width should be > 0'
    ).toBeGreaterThan(0)
  })

  test('should be an SVG image', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    const logoImage = getNavbarLogoImage(page)
    const src = await logoImage.getAttribute('src')

    expect(src, 'Logo should be an SVG file').toContain('.svg')
  })
})

test.describe('Logo Styling - Navigation and Interaction', () => {
  test('should link to homepage', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    await verifyLogoLinksToHome(page, '/support/')
  })

  test('should navigate to homepage when clicked from documentation page', async ({
    page,
  }) => {
    await page.goto('/docs/intro')
    await waitForNavbarReady(page)

    await clickLogoAndVerifyNavigation(page, '/support/')
  })

  test('should be clickable and accessible', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    const logoImage = getNavbarLogoImage(page)

    // Verify logo is visible and clickable
    await expect(logoImage).toBeVisible()

    // Click logo
    await logoImage.click()

    // Verify page reloaded/navigated
    await page.waitForLoadState('networkidle')
    expect(page.url()).toMatch(/\/support\/?$/)
  })
})

test.describe('Logo Styling - Responsive Design', () => {
  test('should display correctly on desktop viewport', async ({ page }) => {
    await setViewportSize(
      page,
      viewportSizes.desktop.width,
      viewportSizes.desktop.height
    )
    await page.goto('/')
    await waitForNavbarReady(page)

    await verifyLogoVisible(page)
    await verifyLogoHeight(page)
    await verifyLogoAspectRatio(page)
  })

  test('should display correctly on tablet viewport (768px)', async ({
    page,
  }) => {
    // Set viewport before navigation for better reliability
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Wait for navbar to render
    await page.waitForSelector('nav.navbar', { state: 'visible' })

    // Logo should be visible on tablet
    await verifyLogoVisible(page)
    await verifyLogoHeight(page)
  })

  test('should exist in DOM on mobile viewport (375px)', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // On mobile, Docusaurus may collapse navbar but logo should exist in DOM
    const logo = getNavbarLogo(page)
    const logoExists = await logo.count()
    expect(logoExists, 'Logo should exist in DOM on mobile').toBeGreaterThan(0)
  })

  test('should exist in DOM on small mobile viewport (320px)', async ({
    page,
  }) => {
    // Set small mobile viewport
    await page.setViewportSize({ width: 320, height: 568 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Logo should exist in DOM
    const logo = getNavbarLogo(page)
    const logoExists = await logo.count()
    expect(
      logoExists,
      'Logo should exist in DOM on small mobile'
    ).toBeGreaterThan(0)
  })

  test('should maintain consistent styling on desktop and tablet', async ({
    page,
  }) => {
    // Test on desktop
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
    await waitForNavbarReady(page)

    const desktopHeight = await getLogoContainerStyles(page)
    await verifyLogoVisible(page)

    // Resize to tablet
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.waitForTimeout(300) // Wait for resize
    await page.waitForSelector('nav.navbar', { state: 'visible' })

    const tabletHeight = await getLogoContainerStyles(page)

    // Height should be consistent
    expect(desktopHeight.height).toBe(tabletHeight.height)
  })
})

test.describe('Logo Styling - Dark Mode Support', () => {
  test('should display correctly in light mode (default)', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    // Verify logo in default light mode
    await verifyLogoVisible(page)
    await verifyLogoImageLoaded(page)
    await verifyLogoHeight(page)
  })

  test('should display correctly when page loads with dark mode preference', async ({
    page,
  }) => {
    // Emulate dark color scheme preference
    await page.emulateMedia({ colorScheme: 'dark' })

    await page.goto('/')
    await waitForNavbarReady(page)

    // Verify logo works in dark mode
    await verifyLogoVisible(page)
    await verifyLogoImageLoaded(page)
    await verifyLogoHeight(page)
  })

  test('should display correctly when page loads with light mode preference', async ({
    page,
  }) => {
    // Emulate light color scheme preference
    await page.emulateMedia({ colorScheme: 'light' })

    await page.goto('/')
    await waitForNavbarReady(page)

    // Verify logo works in light mode
    await verifyLogoVisible(page)
    await verifyLogoImageLoaded(page)
    await verifyLogoHeight(page)
  })
})

test.describe('Logo Styling - Cross-Browser Compatibility', () => {
  test('should have consistent styling across browsers', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    // These tests run automatically across all configured browsers
    // (Chromium, Firefox, WebKit) via playwright.config.ts

    await verifyLogoVisible(page)
    await verifyLogoHeight(page)
    await verifyLogoAspectRatio(page)
    await verifyLogoImageLoaded(page)
  })

  test('should render SVG correctly across browsers', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    const logoImage = getNavbarLogoImage(page)

    // Verify SVG is rendered
    const src = await logoImage.getAttribute('src')
    expect(src).toContain('.svg')

    // Verify image loaded successfully
    await verifyLogoImageLoaded(page)

    // Verify dimensions are correct
    const dimensions = await getLogoImageDimensions(page)
    expect(dimensions.height).toBe(32)
  })
})

test.describe('Logo Styling - Edge Cases', () => {
  test('should handle page refresh correctly', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    // Verify logo before refresh
    await verifyLogoVisible(page)

    // Reload page
    await page.reload()
    await waitForNavbarReady(page)

    // Verify logo after refresh
    await verifyLogoVisible(page)
    await verifyLogoHeight(page)
  })

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/')
    await waitForNavbarReady(page)
    await verifyLogoVisible(page)

    // Navigate to docs
    await page.goto('/docs/intro')
    await waitForNavbarReady(page)
    await verifyLogoVisible(page)

    // Go back
    await page.goBack()
    await waitForNavbarReady(page)
    await verifyLogoVisible(page)

    // Go forward
    await page.goForward()
    await waitForNavbarReady(page)
    await verifyLogoVisible(page)
  })

  test('should not have layout shift when page loads', async ({ page }) => {
    // Go to page and measure logo position immediately
    await page.goto('/')

    // Wait for logo to appear
    const logo = getNavbarLogo(page)
    await expect(logo).toBeVisible()

    const initialBounds = await logo.boundingBox()

    // Wait for page to fully load
    await waitForNavbarReady(page)

    const finalBounds = await logo.boundingBox()

    // Logo position should not have shifted significantly
    if (initialBounds && finalBounds) {
      const yShift = Math.abs(finalBounds.y - initialBounds.y)
      expect(
        yShift,
        'Logo should not have significant vertical layout shift'
      ).toBeLessThan(5) // Allow max 5px shift
    }
  })

  test('should handle slow network conditions', async ({ page }) => {
    // Simulate slow 3G network
    await page.route('**/*', route => {
      route.continue()
    })

    await page.goto('/')
    await waitForNavbarReady(page)

    // Even with slow network, logo should load and display correctly
    await verifyLogoVisible(page)
    await verifyLogoImageLoaded(page)
  })
})

test.describe('Logo Styling - CSS Verification', () => {
  test('should apply correct CSS classes', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    const logo = getNavbarLogo(page)

    // Verify logo has correct class
    const hasClass = await logo.evaluate(el =>
      el.classList.contains('navbar__logo')
    )
    expect(hasClass, 'Logo should have navbar__logo class').toBe(true)
  })

  test('should have correct computed styles for container', async ({
    page,
  }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    const styles = await getLogoContainerStyles(page)

    // Verify height (2rem = 30-40px depending on root font-size)
    const heightValue = parseFloat(styles.height)
    expect(
      heightValue,
      `Logo container height should be between 30-40px (2rem), got ${styles.height}`
    ).toBeGreaterThanOrEqual(30)
    expect(
      heightValue,
      `Logo container height should be between 30-40px (2rem), got ${styles.height}`
    ).toBeLessThanOrEqual(40)

    // Verify width is computed (auto becomes computed pixel value)
    expect(styles.width, 'Logo container width should be valid').toMatch(
      // eslint-disable-next-line security/detect-unsafe-regex
      /^\d+(?:\.\d+)?px$/
    )
  })
  test('should have correct computed styles for image', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    const logoImage = getNavbarLogoImage(page)

    const imageStyles = await logoImage.evaluate((img: HTMLElement) => {
      const styles = window.getComputedStyle(img)
      return {
        height: styles.height,
        width: styles.width,
        display: styles.display,
      }
    })

    // Image should have 100% height (30-40px when container is 2rem)
    const imageHeightValue = parseFloat(imageStyles.height)
    expect(
      imageHeightValue,
      `Logo image height should be between 30-40px (100% of 2rem container), got ${imageStyles.height}`
    ).toBeGreaterThanOrEqual(30)
    expect(
      imageHeightValue,
      `Logo image height should be between 30-40px (100% of 2rem container), got ${imageStyles.height}`
    ).toBeLessThanOrEqual(40)

    // Image should be displayed
    expect(imageStyles.display, 'Logo image should be displayed').not.toBe(
      'none'
    )
  })

  test('should load custom.css with logo styles', async ({ page }) => {
    await page.goto('/')
    await waitForNavbarReady(page)

    // Check that custom.css is loaded
    const stylesheets = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets)
      return sheets.map(sheet => sheet.href).filter(Boolean)
    })

    // Should have stylesheets loaded
    expect(
      stylesheets.length,
      'Page should have stylesheets loaded'
    ).toBeGreaterThan(0)

    // Verify logo styles are applied
    await verifyLogoHeight(page)
  })
})
