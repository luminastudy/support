# E2E Testing Quick Start Guide

Quick reference for running e2e tests for the Hebrew i18n feature.

## Installation

```bash
# Install dependencies (if not already installed)
pnpm install

# Install Playwright browsers (if not already installed)
pnpm exec playwright install
```

## Run All Tests

```bash
# Run all e2e tests across all browsers
pnpm test:e2e
```

This will:

- Automatically start the dev server at `http://localhost:3000/support/`
- Run all tests in Chromium, Firefox, and WebKit
- Generate an HTML report
- Capture screenshots and videos on failure

## Run Specific Tests

### By Test File

```bash
# Hebrew locale tests (homepage, navigation, language switching)
pnpm exec playwright test tests/e2e/i18n/hebrew-locale.spec.ts

# Documentation pages tests
pnpm exec playwright test tests/e2e/i18n/documentation-pages.spec.ts

# Build verification tests
pnpm exec playwright test tests/e2e/i18n/build-verification.spec.ts
```

### By Browser

```bash
# Run all tests in Chromium only
pnpm test:e2e:chromium

# Run all tests in Firefox only
pnpm test:e2e:firefox

# Run all tests in WebKit only
pnpm test:e2e:webkit
```

### By Test Name

```bash
# Run tests matching a specific pattern
pnpm exec playwright test -g "should switch from English to Hebrew"

# Run all language switching tests
pnpm exec playwright test -g "Language Switching"
```

## Interactive Testing

### UI Mode (Recommended for Development)

```bash
pnpm test:e2e:ui
```

This opens an interactive UI where you can:

- Select which tests to run
- Watch tests execute in real-time
- Time-travel through test steps
- Inspect DOM and network calls
- Debug failing tests

### Debug Mode

```bash
pnpm test:e2e:debug
```

Opens Playwright Inspector for step-by-step debugging.

### Headed Mode

```bash
pnpm test:e2e:headed
```

Runs tests with visible browser windows (useful for watching tests run).

## View Test Results

### HTML Report

After running tests, view the HTML report:

```bash
pnpm exec playwright show-report
```

This opens a browser with:

- Test results summary
- Failed test details
- Screenshots and videos
- Traces for debugging

### Terminal Output

Test results are automatically displayed in the terminal after running tests.

## Common Commands

```bash
# Run all tests
pnpm test:e2e

# Run tests in UI mode (recommended)
pnpm test:e2e:ui

# Run specific test file
pnpm exec playwright test tests/e2e/i18n/hebrew-locale.spec.ts

# Run tests in headed mode (see browser)
pnpm test:e2e:headed

# Run tests in debug mode
pnpm test:e2e:debug

# View HTML report
pnpm exec playwright show-report

# List all tests
pnpm exec playwright test --list

# Run tests matching pattern
pnpm exec playwright test -g "Hebrew"
```

## Test Structure

The test suite includes 67 tests across 3 files:

1. **hebrew-locale.spec.ts** (27 tests)
   - Homepage accessibility
   - Language switching
   - Navigation translations
   - RTL layout
   - Browser navigation

2. **documentation-pages.spec.ts** (24 tests)
   - All documentation pages in both locales
   - Deep linking
   - Sidebar navigation
   - Content integrity

3. **build-verification.spec.ts** (16 tests)
   - Build directory structure
   - Documentation pages build output
   - Static assets
   - Build parity

## Troubleshooting

### Port 3000 already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill
```

### Dev server won't start

```bash
# Start manually before running tests
pnpm start

# In another terminal
pnpm exec playwright test --config=playwright.config.ts
```

### Tests are slow

```bash
# Run on fewer browsers
pnpm exec playwright test --project=chromium

# Run with more workers (if you have CPU cores)
pnpm exec playwright test --workers=5
```

### Want to see what's happening

```bash
# Use headed mode
pnpm test:e2e:headed

# Or use UI mode
pnpm test:e2e:ui
```

## Next Steps

For more detailed information, see:

- [Full README](./README.md) - Complete documentation
- [Playwright Documentation](https://playwright.dev)
- Test files in `tests/e2e/i18n/`

## Quick Tips

- Use UI mode (`pnpm test:e2e:ui`) for development
- Run specific tests to save time
- Check HTML report for detailed failure analysis
- Screenshots and videos are captured on failure
- Tests automatically start/stop the dev server

Happy testing!
