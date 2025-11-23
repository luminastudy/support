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
]
