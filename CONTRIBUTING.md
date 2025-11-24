# Contributing to Lumina Study Support Documentation

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Getting Started

1. **Fork the repository** and clone it locally
2. **Install dependencies**: `pnpm install`
3. **Create a branch** for your changes: `git checkout -b feature/your-feature-name`

## Development Workflow

### Prerequisites

- Node.js >= 20.0.0
- pnpm (latest version)

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Build the site
pnpm build
```

### Development Commands

- `pnpm start` - Start development server with live reload
- `pnpm build` - Build the static site
- `pnpm serve` - Serve the built site locally
- `pnpm lint` - Check code quality
- `pnpm lint:fix` - Fix linting issues
- `pnpm format` - Format code
- `pnpm format:check` - Check formatting
- `pnpm spell` - Check spelling
- `pnpm knip` - Find unused files, dependencies, and exports
- `pnpm typecheck` - Check TypeScript types

### PM2 Process Management

For persistent development server management:

- `pnpm pm2:start` - Start dev server with PM2
- `pnpm pm2:stop` - Stop the dev server
- `pnpm pm2:restart` - Restart the dev server
- `pnpm pm2:delete` - Remove from PM2
- `pnpm pm2:logs` - View server logs
- `pnpm pm2:monit` - Monitor resource usage
- `pnpm pm2:status` - Check server status

PM2 is useful for:

- Running the dev server in the background
- Automatic restart on crashes
- Centralized log management
- Resource monitoring

## Making Changes

### Code Style

This project uses:

- **TypeScript** for type safety
- **ESLint** with `eslint-config-agent` for linting
- **Prettier** for code formatting
- **cspell** for spell checking (English and Hebrew support)

The codebase follows these conventions:

- Use TypeScript for configuration files
- Follow Docusaurus best practices
- Write clear, descriptive documentation

### Documentation Guidelines

- Use clear, concise language
- Include code examples where appropriate
- Keep documentation up-to-date with code changes
- Support both English and Hebrew content
- Use proper markdown formatting

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types**:

- `feat`: New feature or documentation
- `fix`: Bug fix or correction
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples**:

```
docs(tutorial): add authentication guide
fix(config): correct base URL configuration
feat(blog): add new blog post about best practices
```

### Git Hooks

This project uses Husky for git hooks:

- **Pre-commit**: Runs lint-staged (lints, formats, and spell-checks staged files)
- **Commit-msg**: Validates commit message format using commitlint (enforces conventional commits)
- **Pre-push**: Runs full validation (lint, format, spell, knip, typecheck, build)

These hooks ensure code quality and consistent commit messages before commits and pushes.

**Important**: Commit messages must follow the conventional commits format or they will be rejected.

## Submitting Changes

### Pull Request Process

1. **Update your fork** with the latest changes from main:

   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Rebase your branch** (if needed):

   ```bash
   git checkout your-branch
   git rebase main
   ```

3. **Run all checks locally**:

   ```bash
   pnpm lint
   pnpm format:check
   pnpm spell
   pnpm knip
   pnpm typecheck
   pnpm build
   ```

4. **Push your changes**:

   ```bash
   git push origin your-branch
   ```

5. **Open a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description of what changed and why
   - Reference to any related issues
   - Screenshots (if UI changes)

### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Write clear, descriptive PR titles and descriptions
- Link related issues using "Fixes #123" or "Closes #123"
- Ensure CI passes (tests, linting, formatting)
- Respond to review feedback promptly
- Keep commits clean and well-organized

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the bug
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Environment**: Browser, OS, Node.js version
- **Screenshots**: If applicable

### Documentation Requests

When requesting documentation improvements, please include:

- **Topic**: What needs to be documented?
- **Why**: Why is this documentation needed?
- **Target audience**: Who is this for?
- **Suggested content**: If you have ideas for content structure

## Questions?

- Check existing issues and discussions
- Read the Docusaurus documentation
- Open a new issue with the "question" label

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and beginners
- Focus on constructive feedback
- Assume good intentions

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

---

Thank you for contributing to Lumina Study! 🎉
