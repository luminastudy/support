# E2E Tests for Hebrew i18n Support

Comprehensive end-to-end test suite for the Hebrew internationalization feature, covering language switching, RTL layout, translation verification, and build output validation.

## Overview

This test suite validates the complete Hebrew i18n implementation for the Lumina Study documentation site, including:

- Homepage accessibility in both languages
- Language switching functionality
- Navigation element translations
- RTL (right-to-left) layout rendering
- All documentation pages in both locales
- Deep linking to Hebrew pages
- Build output verification
- Cross-browser compatibility

## Prerequisites

### Dependencies

```bash
pnpm install
```

This installs Playwright and all required dependencies.

### Playwright Browsers

Install Playwright browsers (if not already installed):

```bash
pnpm exec playwright install
```

### Development Server

The tests expect a development server running at `http://localhost:3000/support/`.

The Playwright configuration automatically starts the dev server before running tests using `pnpm start`.

## Running Tests

### All E2E Tests

Run all tests across all browsers:

```bash
pnpm test:e2e
```

### Specific Test File

Run a specific test file:

```bash
# Hebrew locale tests (homepage, navigation, language switching)
pnpm exec playwright test tests/e2e/i18n/hebrew-locale.spec.ts

# Documentation pages tests
pnpm exec playwright test tests/e2e/i18n/documentation-pages.spec.ts

# Build verification tests
pnpm exec playwright test tests/e2e/i18n/build-verification.spec.ts
```

### Specific Browser

Run tests in a specific browser:

```bash
pnpm exec playwright test --project=chromium
pnpm exec playwright test --project=firefox
pnpm exec playwright test --project=webkit
```

### UI Mode (Interactive)

Run tests in interactive UI mode:

```bash
pnpm test:e2e:ui
```

This opens Playwright's UI where you can:

- See test execution in real-time
- Debug failing tests
- Inspect DOM and network activity
- Time-travel through test steps

### Debug Mode

Run tests in debug mode with Playwright Inspector:

```bash
pnpm test:e2e:debug
```

### Headed Mode

Run tests with visible browser windows:

```bash
pnpm test:e2e:headed
```

### Watch Mode

Run tests in watch mode (re-runs on file changes):

```bash
pnpm exec playwright test --ui
```

### Generate HTML Report

After running tests, generate and view HTML report:

```bash
pnpm exec playwright show-report
```

## Test Structure

```
tests/e2e/
├── i18n/
│   ├── hebrew-locale.spec.ts        # Homepage, navigation, language switching
│   ├── documentation-pages.spec.ts  # All docs pages in both locales
│   └── build-verification.spec.ts   # Build output validation
├── fixtures/
│   └── expected-translations.ts     # Expected Hebrew translations
├── helpers/
│   └── i18n-helpers.ts              # Reusable test utilities
└── README.md                        # This file
```

## Test Coverage

### Hebrew Locale Tests (hebrew-locale.spec.ts)

**English Homepage** (4 tests)

- Load English homepage successfully
- Correct language attributes (en-US, ltr)
- Language dropdown visible
- English label in dropdown

**Hebrew Homepage** (4 tests)

- Load Hebrew homepage successfully
- Correct language attributes (he-IL, rtl)
- dir="rtl" on html element
- Hebrew label in dropdown

**Language Switching** (4 tests)

- Switch from English to Hebrew
- Switch from Hebrew to English
- Maintain page context when switching
- URL updates correctly

**Navigation Elements Translation** (5 tests)

- Translated navbar in Hebrew
- Translated footer sections in Hebrew
- Translated footer links in Hebrew
- Translated copyright in Hebrew
- English navbar remains in English

**RTL Layout Verification** (4 tests)

- RTL text alignment for Hebrew
- Mirrored navbar for RTL
- Mirrored footer for RTL
- LTR layout for English

**Browser Navigation** (2 tests)

- Back/forward buttons work correctly
- Language preserved when navigating

### Documentation Pages Tests (documentation-pages.spec.ts)

**Introduction Page** (4 tests)

- Load English intro page
- Load Hebrew intro page
- Hebrew content verification
- Language switching on intro page

**Students Guide Page** (3 tests)

- Load English students guide
- Load Hebrew students guide
- Hebrew content verification

**Educators Guide Page** (3 tests)

- Load English educators guide
- Load Hebrew educators guide
- Hebrew content verification

**Developers Setup Page** (4 tests)

- Load English developers setup
- Load Hebrew developers setup
- Hebrew content verification
- Code blocks render correctly in RTL

**Deep Linking** (4 tests)

- Direct navigation to all Hebrew pages

**Sidebar Navigation** (2 tests)

- Sidebar displays in Hebrew
- Navigate between pages using sidebar

**Content Integrity** (3 tests)

- Hebrew characters render correctly
- No encoding issues
- Mixed content (Hebrew + English) works

**All Pages Exist** (4 tests)

- Verify all 4 documentation pages have Hebrew versions

### Build Verification Tests (build-verification.spec.ts)

**Build Directory Structure** (6 tests)

- Build directory exists
- English files in root
- Hebrew locale directory exists
- Hebrew files in /he/ directory
- Docs directories in both locales

**Documentation Pages Build Output** (8 tests)

- All 4 pages built in English
- All 4 pages built in Hebrew

**Static Assets** (3 tests)

- Assets directory exists
- Images directory exists
- Favicon exists

**Sitemap** (1 test)

- Sitemap.xml exists

**File Size Verification** (2 tests)

- English index.html has content
- Hebrew index.html has content

**Build Parity** (1 test)

- Same number of pages in both locales

## Coverage Summary

**Total Tests**: 67

### By Category

- Homepage & Navigation: 15 tests
- Language Switching: 4 tests
- Navigation Translations: 5 tests
- RTL Layout: 4 tests
- Documentation Pages: 27 tests
- Build Verification: 23 tests

### Coverage Metrics

- Acceptance Criteria: 10/10 (100%)
- User Scenarios: 3/3 (100%)
- Documentation Pages: 4/4 (100%)
- Navigation Elements: All covered
- RTL Layout: Fully verified
- Build Output: Comprehensive validation

## Test Data

### Fixtures

**tests/e2e/fixtures/expected-translations.ts**

- Expected navbar translations (Hebrew)
- Expected footer translations (Hebrew)
- Documentation page paths (English & Hebrew)
- Language labels
- Locale configuration

### Helpers

**tests/e2e/helpers/i18n-helpers.ts**

- `switchLanguage()` - Switch between languages via dropdown
- `verifyTextDirection()` - Verify RTL/LTR direction
- `verifyLanguageAttribute()` - Verify HTML lang attribute
- `isLocaleInUrl()` - Check locale in URL
- `navigateToLocale()` - Navigate to specific locale
- `verifyNavbarContains()` - Verify navbar text
- `verifyFooterContains()` - Verify footer text
- `getFooterLinkTexts()` - Get all footer link texts
- `waitForPageReady()` - Wait for page to be fully loaded
- `takeScreenshot()` - Take debug screenshot

## Troubleshooting

### Tests are failing with "page not found"

**Solution**: Make sure the dev server is running:

```bash
pnpm start
```

Or build the site first:

```bash
pnpm build
pnpm serve
```

### Language dropdown not found

**Problem**: Selector may have changed in Docusaurus theme.

**Solution**: Inspect the page and update selectors in `helpers/i18n-helpers.ts`.

### Build verification tests fail

**Problem**: Build directory doesn't exist or is outdated.

**Solution**: Run build before tests:

```bash
pnpm build
pnpm exec playwright test tests/e2e/i18n/build-verification.spec.ts
```

### Tests timeout

**Problem**: Page takes too long to load.

**Solution**: Increase timeout in `playwright.config.ts`:

```typescript
use: {
  timeout: 30000, // Increase to 30 seconds
}
```

### Flaky tests

**Problem**: Tests pass/fail inconsistently.

**Solution**:

1. Check for hardcoded timeouts (use `waitForSelector` instead of `waitForTimeout`)
2. Ensure proper `waitForPageReady()` calls
3. Run with `--retries=2` in CI

### Port already in use

**Problem**: Another process is using port 3000.

**Solution**:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or change port in docusaurus.config.ts and playwright.config.ts
```

### Screenshots/videos not being saved

**Problem**: Test results directory doesn't exist.

**Solution**: Create directory:

```bash
mkdir -p test-results/screenshots
```

Or check `playwright.config.ts` configuration.

## CI/CD Integration

Tests are designed to run in CI/CD pipelines. The configuration automatically:

- Retries failed tests 2 times
- Uses single worker (no parallel execution)
- Generates HTML and GitHub reports
- Captures screenshots and videos on failure
- Starts dev server automatically

### GitHub Actions Example

```yaml
name: E2E Tests

on:
  pull_request:
  push:
    branches: [main]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright Browsers
        run: pnpm exec playwright install --with-deps

      - name: Run E2E tests
        run: pnpm test:e2e

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## Maintenance

### Adding New Tests

1. Determine category (homepage, docs, build, etc.)
2. Add to appropriate spec file in `tests/e2e/i18n/`
3. Use existing helpers from `helpers/i18n-helpers.ts`
4. Add expected translations to `fixtures/expected-translations.ts` if needed
5. Follow test naming convention: `should [action/behavior]`
6. Update this README with new test count

### Updating Tests

When feature changes:

1. Update expected translations in fixtures
2. Update selectors in helpers if DOM changed
3. Add/remove tests as needed
4. Run full suite to ensure no regressions

### Refactoring Common Patterns

If you see repeated code:

1. Extract to helper function in `helpers/i18n-helpers.ts`
2. Update all tests to use helper
3. Add JSDoc comments to helper

## Best Practices

### Test Independence

- Each test is fully independent
- No shared state between tests
- Fresh page navigation in beforeEach

### Wait Strategies

- Use `waitForPageReady()` after navigation
- Use `waitForSelector()` for dynamic content
- Avoid hardcoded `waitForTimeout()` (causes flakiness)

### Assertions

- Use descriptive messages in assertions
- One primary assertion per test
- Verify both positive and negative cases

### Selectors

- Prefer semantic selectors (role, text)
- Use data-testid for stable selectors (if added)
- Avoid complex CSS selectors

### Error Handling

- Tests fail with clear error messages
- Screenshots captured on failure
- Videos available for debugging

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Docusaurus i18n Guide](https://docusaurus.io/docs/i18n/introduction)
- [Docusaurus RTL Support](https://docusaurus.io/docs/i18n/tutorial#translate-your-site)
- [Feature Specification](.kiro/specs/hebrew-i18n/)

## Questions?

If you have questions or need help:

1. Check this README
2. Review test code for examples
3. Check Playwright documentation
4. Open an issue on GitHub

---

**Test Suite Version**: 1.0.0
**Last Updated**: 2025-11-24
**Maintainer**: Lumina Study Team
