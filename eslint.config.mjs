import agentConfig from 'eslint-config-agent'

export default [
  ...agentConfig,
  {
    ignores: [
      'build/**',
      '.docusaurus/**',
      'node_modules/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      '.claude/**',
      '.kiro/**',
      'playwright.config.ts',
      'ecosystem.config.cjs',
    ],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      // Docusaurus uses require() for static assets
      '@typescript-eslint/no-require-imports': 'off',
      // Docusaurus JSX doesn't always need className
      'custom/jsx-classname-required': 'off',
      // Allow type definitions as needed
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
  {
    // Test files have different requirements
    files: ['**/*.spec.{ts,tsx,js,jsx}', '**/tests/**/*.{ts,tsx,js,jsx}'],
    rules: {
      // Test files don't need corresponding spec files
      'ddd/require-spec-file': 'off',
      // Test utilities/helpers can have multiple exports
      'single-export/single-export': 'off',
      // Test files need to access file system for build verification
      'security/detect-non-literal-fs-filename': 'off',
    },
  },
]
