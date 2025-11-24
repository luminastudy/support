/**
 * Expected Hebrew translations for test assertions
 * This file contains the expected translations from the i18n files
 * to ensure consistency and make tests more maintainable
 */

export const expectedNavbarTranslations = {
  documentation: 'תיעוד',
  github: 'GitHub',
  logoAlt: 'לוגו Lumina Study',
} as const

export const expectedFooterTranslations = {
  sections: {
    documentation: 'תיעוד',
    community: 'קהילה',
    resources: 'משאבים',
  },
  links: {
    gettingStarted: 'תחילת העבודה',
    forStudents: 'לסטודנטים',
    forEducators: 'למרצים',
    forDevelopers: 'למפתחים',
    github: 'GitHub',
    issues: 'בעיות',
    discussions: 'דיונים',
    npmPackages: 'חבילות npm',
  },
  copyright: 'כל הזכויות שמורות © 2025 Lumina Study. נבנה עם Docusaurus.',
} as const

export const expectedDocumentationPages = {
  intro: {
    path: '/docs/intro',
    hebrewPath: '/he/docs/intro',
  },
  students: {
    path: '/docs/students/browsing-courses',
    hebrewPath: '/he/docs/students/browsing-courses',
  },
  educators: {
    path: '/docs/educators/creating-courses',
    hebrewPath: '/he/docs/educators/creating-courses',
  },
  developers: {
    path: '/docs/developers/setup',
    hebrewPath: '/he/docs/developers/setup',
  },
} as const

export const languageLabels = {
  english: 'English',
  hebrew: 'עברית',
} as const

export const localeConfig = {
  defaultLocale: 'en',
  hebrewLocale: 'he',
  baseUrl: '/support/',
} as const
