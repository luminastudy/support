import { existsSync, statSync, readdirSync } from 'fs'
import { join } from 'path'
import { test, expect } from '@playwright/test'

/**
 * Build verification tests
 * These tests verify that the build output includes both locales
 * and that static files are generated correctly
 *
 * Note: These tests should run after a build has been completed
 * Run `pnpm build` before running these tests
 */

test.describe('Hebrew i18n Support - Build Verification', () => {
  const buildDir = join(process.cwd(), 'build')

  test.describe('Build Directory Structure', () => {
    test('should have build directory', () => {
      const exists = existsSync(buildDir)
      expect(
        exists,
        'Build directory should exist. Run `pnpm build` first.'
      ).toBe(true)
    })

    test('should have English site files in root build directory', () => {
      // Check for English index.html
      const englishIndex = join(buildDir, 'index.html')
      const exists = existsSync(englishIndex)
      expect(exists, 'English index.html should exist in /build/').toBe(true)
    })

    test('should have Hebrew locale directory', () => {
      const hebrewDir = join(buildDir, 'he')
      const exists = existsSync(hebrewDir)
      expect(exists, 'Hebrew directory /build/he/ should exist').toBe(true)

      if (exists) {
        const stats = statSync(hebrewDir)
        expect(stats.isDirectory(), '/build/he/ should be a directory').toBe(
          true
        )
      }
    })

    test('should have Hebrew site files in he directory', () => {
      const hebrewIndex = join(buildDir, 'he', 'index.html')
      const exists = existsSync(hebrewIndex)
      expect(exists, 'Hebrew index.html should exist in /build/he/').toBe(true)
    })

    test('should have docs directory in root build', () => {
      const docsDir = join(buildDir, 'docs')
      const exists = existsSync(docsDir)
      expect(exists, 'Docs directory should exist in /build/docs/').toBe(true)
    })

    test('should have docs directory in Hebrew build', () => {
      const hebrewDocsDir = join(buildDir, 'he', 'docs')
      const exists = existsSync(hebrewDocsDir)
      expect(exists, 'Docs directory should exist in /build/he/docs/').toBe(
        true
      )
    })
  })

  test.describe('Documentation Pages Build Output', () => {
    test('should have English intro page', () => {
      const introPath = join(buildDir, 'docs', 'intro', 'index.html')
      const exists = existsSync(introPath)
      expect(exists, 'English intro page should be built').toBe(true)
    })

    test('should have Hebrew intro page', () => {
      const introPath = join(buildDir, 'he', 'docs', 'intro', 'index.html')
      const exists = existsSync(introPath)
      expect(exists, 'Hebrew intro page should be built').toBe(true)
    })

    test('should have English students guide', () => {
      const studentsPath = join(
        buildDir,
        'docs',
        'students',
        'browsing-courses',
        'index.html'
      )
      const exists = existsSync(studentsPath)
      expect(exists, 'English students guide should be built').toBe(true)
    })

    test('should have Hebrew students guide', () => {
      const studentsPath = join(
        buildDir,
        'he',
        'docs',
        'students',
        'browsing-courses',
        'index.html'
      )
      const exists = existsSync(studentsPath)
      expect(exists, 'Hebrew students guide should be built').toBe(true)
    })

    test('should have English educators guide', () => {
      const educatorsPath = join(
        buildDir,
        'docs',
        'educators',
        'creating-courses',
        'index.html'
      )
      const exists = existsSync(educatorsPath)
      expect(exists, 'English educators guide should be built').toBe(true)
    })

    test('should have Hebrew educators guide', () => {
      const educatorsPath = join(
        buildDir,
        'he',
        'docs',
        'educators',
        'creating-courses',
        'index.html'
      )
      const exists = existsSync(educatorsPath)
      expect(exists, 'Hebrew educators guide should be built').toBe(true)
    })

    test('should have English developers setup', () => {
      const devsPath = join(
        buildDir,
        'docs',
        'developers',
        'setup',
        'index.html'
      )
      const exists = existsSync(devsPath)
      expect(exists, 'English developers setup should be built').toBe(true)
    })

    test('should have Hebrew developers setup', () => {
      const devsPath = join(
        buildDir,
        'he',
        'docs',
        'developers',
        'setup',
        'index.html'
      )
      const exists = existsSync(devsPath)
      expect(exists, 'Hebrew developers setup should be built').toBe(true)
    })
  })

  test.describe('Static Assets', () => {
    test('should have assets directory', () => {
      const assetsDir = join(buildDir, 'assets')
      const exists = existsSync(assetsDir)
      expect(exists, 'Assets directory should exist').toBe(true)
    })

    test('should have img directory', () => {
      const imgDir = join(buildDir, 'img')
      const exists = existsSync(imgDir)
      expect(exists, 'Image directory should exist').toBe(true)
    })

    test('should have favicon', () => {
      const favicon = join(buildDir, 'img', 'favicon.ico')
      const exists = existsSync(favicon)
      expect(exists, 'Favicon should exist').toBe(true)
    })
  })

  test.describe('Sitemap', () => {
    test('should have sitemap.xml', () => {
      const sitemap = join(buildDir, 'sitemap.xml')
      const exists = existsSync(sitemap)
      expect(exists, 'Sitemap should exist').toBe(true)
    })
  })

  test.describe('File Size Verification', () => {
    test('English index.html should have content', () => {
      const englishIndex = join(buildDir, 'index.html')
      if (existsSync(englishIndex)) {
        const stats = statSync(englishIndex)
        expect(
          stats.size,
          'English index.html should not be empty'
        ).toBeGreaterThan(0)
        expect(
          stats.size,
          'English index.html should be substantial'
        ).toBeGreaterThan(1000)
      }
    })

    test('Hebrew index.html should have content', () => {
      const hebrewIndex = join(buildDir, 'he', 'index.html')
      if (existsSync(hebrewIndex)) {
        const stats = statSync(hebrewIndex)
        expect(
          stats.size,
          'Hebrew index.html should not be empty'
        ).toBeGreaterThan(0)
        expect(
          stats.size,
          'Hebrew index.html should be substantial'
        ).toBeGreaterThan(1000)
      }
    })
  })

  test.describe('Build Parity', () => {
    test('should have same number of docs pages in both locales', () => {
      const englishDocsDir = join(buildDir, 'docs')
      const hebrewDocsDir = join(buildDir, 'he', 'docs')

      if (existsSync(englishDocsDir) && existsSync(hebrewDocsDir)) {
        // Count index.html files recursively
        const countHtmlFiles = (dir: string): number => {
          let count = 0
          const items = readdirSync(dir)

          for (const item of items) {
            const itemPath = join(dir, item)
            const stats = statSync(itemPath)

            if (stats.isDirectory()) {
              count += countHtmlFiles(itemPath)
            } else if (item === 'index.html') {
              count++
            }
          }

          return count
        }

        const englishCount = countHtmlFiles(englishDocsDir)
        const hebrewCount = countHtmlFiles(hebrewDocsDir)

        expect(
          hebrewCount,
          `Hebrew should have same number of pages as English. English: ${englishCount}, Hebrew: ${hebrewCount}`
        ).toBe(englishCount)
      }
    })
  })
})
