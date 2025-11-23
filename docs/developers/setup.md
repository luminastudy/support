---
sidebar_position: 1
---

# Developer Setup

Get started with developing for the Lumina Study platform.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** >=18.0.0 (use `.nvmrc` for version management)
- **pnpm** >=10.0.0 (strictly enforced - npm/yarn are blocked)
- **Docker & Docker Compose** (for local database)
- **Git** for version control

### Installing pnpm

```bash
# Install pnpm globally
npm install -g pnpm

# Or use corepack (recommended)
corepack enable
corepack prepare pnpm@10 --activate
```

## Project Structure

Lumina Study is a **polyglot monorepo** containing:

- **Applications** - Client, courses platform, support site
- **Libraries** - Published npm packages (@lumina-study scope)
- **Tools** - VS Code extension, utilities
- **Content** - Course packages

## Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd luminastudy
```

### 2. Install Dependencies

```bash
# Install all dependencies across all packages
pnpm install
```

### 3. Choose Your Focus

#### Student Platform (Client)

```bash
cd client
pnpm dev  # Start on http://localhost:5173
```

#### Courses Platform

```bash
cd courses

# Start infrastructure
pnpm docker:up       # PostgreSQL + Redis

# Run migrations
pnpm db:migrate

# Start all services
pnpm dev
# - Frontend: http://localhost:3000
# - Backend: http://localhost:3001
# - API Docs: http://localhost:3001/api
```

#### Blocks Graph Library

```bash
cd blocks-graph
pnpm build
pnpm storybook  # Component development
```

## Development Workflow

### Spec-Driven Development

Lumina uses **Kiro-style AI-DLC** (AI Development Life Cycle):

```bash
# Initialize new feature spec
/kiro:spec-init "feature description"

# Generate requirements
/kiro:spec-requirements feature-name

# Design phase
/kiro:spec-design feature-name

# Generate tasks
/kiro:spec-tasks feature-name

# Implementation
/kiro:spec-impl feature-name

# Check status
/kiro:spec-status feature-name
```

### Code Quality

```bash
# Linting
pnpm lint
pnpm lint:fix

# Type checking
pnpm type-check

# Testing
pnpm test
pnpm test:watch
pnpm test:coverage

# Formatting
pnpm format
pnpm format:check

# Visual regression (UI components)
pnpm loki:test
pnpm loki:update
```

## Architecture

### Domain-Driven Design

The client follows DDD principles:

```
domain/
├── services/          # Business logic (framework-agnostic)
│   ├── Service.ts
│   └── Service.spec.ts
├── hooks/            # React integration layer
│   └── useService.ts
├── components/       # Presentation components
└── types/           # Domain types
```

### Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
- **Backend**: NestJS, Prisma, PostgreSQL, Redis
- **State**: Redux Toolkit, RTK Query
- **Testing**: Vitest, Playwright, Loki
- **Build**: Vite, esbuild, Rollup

## Common Tasks

### Adding Dependencies

```bash
# Add to specific package
pnpm --filter @lumina/client add package-name

# Add to workspace root
pnpm add -w package-name
```

### Running Tests

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Visual regression
pnpm loki:test
```

### Database Operations

```bash
cd courses

# Prisma Studio (GUI)
pnpm db:studio

# Reset database
pnpm db:reset

# Generate Prisma client
pnpm db:generate
```

### SDK Generation

```bash
cd courses

# Generate OpenAPI spec from NestJS
pnpm openapi:generate

# Generate TypeScript SDK
pnpm sdk:generate

# Do both
pnpm sdk:sync
```

## Package Development

### Publishing to npm

Packages under `@lumina-study` can be published:

```bash
# Build package
pnpm build

# Run release (uses release-it)
pnpm release patch   # 0.1.0 -> 0.1.1
pnpm release minor   # 0.1.0 -> 0.2.0
pnpm release major   # 0.1.0 -> 1.0.0
```

### Local Package Development

Use workspace protocol for local development:

```json
{
  "dependencies": {
    "@lumina-study/blocks-graph": "workspace:*"
  }
}
```

## Troubleshooting

### Port Conflicts

```bash
# Check what's using a port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### pnpm Issues

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall everything
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Docker Issues

```bash
# Restart containers
pnpm docker:restart

# Clean and restart
pnpm docker:clean
pnpm docker:up
```

## Next Steps

Additional developer documentation will be added soon covering architecture, APIs, and package details. For now, explore the codebase and refer to individual package READMEs.
