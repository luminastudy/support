# Logo Styling E2E Tests

## Quick Start

Run all logo tests:

```bash
pnpm exec playwright test tests/e2e/branding/logo-styling.spec.ts
```

Run with UI mode for interactive debugging:

```bash
pnpm exec playwright test tests/e2e/branding/logo-styling.spec.ts --ui
```

## Overview

This directory contains comprehensive end-to-end tests for the website logo styling feature. The tests validate that the Lumina Study logo displays correctly in the navbar with consistent sizing, proper aspect ratio, and correct behavior across different browsers, viewports, and locales.

## Files

- **logo-styling.spec.ts** - Main test suite (35 tests)
- **COVERAGE.md** - Detailed coverage report
- **README.md** - This file

## Test Coverage

### Summary

- **Total Tests**: 35 tests across 10 categories
- **Browsers**: Chromium, Firefox, WebKit (3 browsers)
- **Locales**: English (LTR), Hebrew (RTL) (2 locales)
- **Pages**: 10 pages tested (5 English + 5 Hebrew)
- **Viewports**: 4 sizes (320px - 1280px)
- **Themes**: Light and Dark mode

### Categories

1. **Visibility and Loading** (7 tests) - Logo appears on all pages
2. **Size and Dimensions** (5 tests) - Logo sized correctly (2rem height)
3. **Image Properties** (4 tests) - Logo image loads and has correct attributes
4. **Navigation and Interaction** (4 tests) - Logo is clickable and navigates to homepage
5. **Responsive Design** (5 tests) - Logo works on desktop, tablet, mobile
6. **RTL Support** (4 tests) - Logo displays correctly in Hebrew (RTL) layout
7. **Dark Mode Support** (3 tests) - Logo works with color scheme preferences
8. **Cross-Browser Compatibility** (2 tests) - Consistent rendering across browsers
9. **Edge Cases** (4 tests) - Handles refresh, navigation, layout shift
10. **CSS Verification** (4 tests) - CSS classes and styles applied correctly

See [COVERAGE.md](./COVERAGE.md) for detailed breakdown.

## Feature Specification

### What This Tests

The logo styling feature adds CSS rules to ensure the Lumina Study logo displays properly in the navbar:

```css
/* From src/css/custom.css */
.navbar__logo {
  height: 2rem;
  width: auto;
}

.navbar__logo img {
  height: 100%;
  width: auto;
}
```

### Requirements Covered

- Logo must display in navbar on all pages (English + Hebrew)
- Logo must have consistent size (2rem height)
- Logo must maintain aspect ratio (auto width)
- Logo must work in light and dark modes
- Logo must be visible on English and Hebrew (RTL) pages
- Logo must work on mobile and desktop viewports

## Running Tests

### All Logo Tests

```bash
pnpm exec playwright test tests/e2e/branding/logo-styling.spec.ts
```

### Specific Browser

```bash
pnpm exec playwright test tests/e2e/branding/logo-styling.spec.ts --project=chromium
pnpm exec playwright test tests/e2e/branding/logo-styling.spec.ts --project=firefox
pnpm exec playwright test tests/e2e/branding/logo-styling.spec.ts --project=webkit
```

### Specific Test

```bash
pnpm exec playwright test tests/e2e/branding/logo-styling.spec.ts -g "should display logo on English homepage"
```

### With UI Mode (Recommended for Development)

```bash
pnpm exec playwright test tests/e2e/branding/logo-styling.spec.ts --ui
```

This opens an interactive UI where you can:

- See tests execute in real-time
- Debug failing tests
- Inspect DOM and network activity
- Time-travel through test steps

### Debug Mode

```bash
pnpm exec playwright test tests/e2e/branding/logo-styling.spec.ts --debug
```

### Generate Report

```bash
pnpm exec playwright test tests/e2e/branding/logo-styling.spec.ts --reporter=html
pnpm exec playwright show-report
```

## Helper Functions

All reusable logo testing utilities are in `/tests/e2e/helpers/navbar-helpers.ts`:

### Element Getters

- `getNavbarLogo(page)` - Get logo container element
- `getNavbarLogoImage(page)` - Get logo image element
- `getNavbarBrand(page)` - Get brand link (logo + title)
- `getNavbar(page)` - Get navbar element

### Verification Functions

- `verifyLogoVisible(page)` - Verify logo is visible
- `verifyLogoImageLoaded(page)` - Verify image loaded successfully
- `verifyLogoHeight(page)` - Verify logo height (30-40px for 2rem)
- `verifyLogoAspectRatio(page)` - Verify aspect ratio maintained
- `verifyLogoAltText(page, text)` - Verify alt text
- `verifyLogoLinksToHome(page)` - Verify href to homepage
- `verifyLogoDoesNotOverflow(page)` - Verify fits in navbar
- `verifyLogoSource(page, path)` - Verify image source path

### Interaction Functions

- `clickLogoAndVerifyNavigation(page, url)` - Click logo and verify navigation

### Style Functions

- `getLogoImageDimensions(page)` - Get logo dimensions
- `getLogoContainerStyles(page)` - Get container computed styles

### Responsive Testing

- `setViewportSize(page, width, height)` - Set viewport
- `viewportSizes` - Predefined viewport sizes (desktop, tablet, mobile)
- `waitForNavbarReady(page)` - Wait for navbar to load

## Test Design Principles

### Independent Tests

Each test is fully independent:

- No shared state between tests
- Fresh page navigation in each test
- Can run in any order or in parallel

### Deterministic Waits

No hardcoded timeouts:

- Use `waitForSelector()` for elements
- Use `waitForLoadState('networkidle')` for navigation
- Use `waitForNavbarReady()` helper for navbar

### Flexible Assertions

- Logo height: 30-40px range (accommodates different root font sizes)
- Mobile: Tests existence rather than visibility (navbar collapses on mobile)
- URLs: Regex patterns for flexible matching

### Clear Error Messages

All assertions include descriptive messages:

```typescript
expect(
  dimensions.height,
  'Logo displayed height should be between 30-40px'
).toBeGreaterThanOrEqual(30)
```

## Troubleshooting

### Logo height assertion fails

**Problem**: Logo height is not within 30-40px range.

**Cause**: The 2rem height computes to different pixel values based on root font-size. Docusaurus uses 18.4px, making 2rem = 36.8px.

**Solution**: Check that `src/css/custom.css` contains:

```css
.navbar__logo {
  height: 2rem;
}
```

### Logo not visible on mobile

**Problem**: Tests fail on mobile viewports.

**Cause**: Docusaurus collapses navbar on mobile (< 768px), hiding logo in hamburger menu.

**Expected**: This is correct behavior. Tests verify logo exists in DOM but don't require visibility on mobile.

### Logo not visible after dark mode switch

**Problem**: Dark mode tests fail.

**Cause**: Runtime theme switching can cause navbar to re-render with transitions.

**Solution**: Tests now use `page.emulateMedia({ colorScheme })` to simulate user preferences, which is more reliable.

### Hebrew page navigation fails

**Problem**: Logo click navigation test fails on Hebrew pages.

**Cause**: URL pattern may include query parameters.

**Solution**: Use flexible regex: `/\/he\/?\??.*$/`

## CI/CD

Tests run automatically in CI with:

- **Browsers**: Chromium, Firefox, WebKit
- **Retries**: 2 retries on failure
- **Parallelism**: 1 worker for stability
- **Artifacts**: Screenshots and videos on failure
- **Reports**: HTML and GitHub reports

## Maintenance

### When to Update

- **Logo image changes**: Update `verifyLogoSource()` path
- **Logo size changes**: Update `verifyLogoHeight()` range
- **New pages added**: Add to visibility tests
- **New locales added**: Add to locale tests
- **Navbar structure changes**: Update selectors in helpers

### Adding New Tests

1. Determine category (visibility, size, responsive, etc.)
2. Use existing helpers from `navbar-helpers.ts`
3. Follow naming convention: `should [action/behavior]`
4. Include descriptive assertion messages
5. Update COVERAGE.md with new test

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Coverage Report](./COVERAGE.md)
- [Main E2E README](../README.md)
- [Navbar Helpers](../helpers/navbar-helpers.ts)

## Questions?

1. Check this README
2. Check [COVERAGE.md](./COVERAGE.md) for detailed info
3. Review test code for examples
4. Open an issue on GitHub

---

**Last Updated**: 2025-11-24
**Maintained by**: Lumina Study Team
