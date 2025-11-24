---
sidebar_position: 2
---

# Updating Blocks Schema

## Automation

- **Husky hooks** automatically update `exports` field when you commit new schema versions
- **CI/CD** automatically publishes to npm when it detects version changes
- You only need to: create schema versions, update version number, and commit

## Update Process

### 1. Update the Block Schema Package

```bash
cd /path/to/block  # @lumina-study/block-schema repository

# Create new schema version (maintain backward compatibility)
mkdir -p schema/v0.3
cp schema/v0.2/block.schema.json schema/v0.3/block.schema.json
# Edit schema/v0.3/block.schema.json with your changes

# Test and commit
pnpm test
# Update version in package.json (patch/minor/major)
git add schema/v0.3/ package.json
git commit -m "feat: add schema v0.3 with [describe changes]"
git push
```

### 2. Update Dependent Packages

Update order (respect dependency chains):

**Tier 1:** `blocks-graph`, `block-store`, `support`
**Tier 2:** `@lumina/client`, `courses-manager-client`

```bash
cd /path/to/[package]
pnpm update @lumina-study/block-schema
pnpm build && pnpm test
# Update version in package.json
git add package.json pnpm-lock.yaml
git commit -m "chore: update @lumina-study/block-schema to vX.X.X"
git push
```

### 3. Update VSCode Extension

```bash
cd /path/to/vscode-lumina
pnpm update @lumina-study/blocks-graph
pnpm build
# Test: F5 in VSCode → open lumina.json file
# Update version in package.json
git add package.json pnpm-lock.yaml
git commit -m "chore: update @lumina-study/blocks-graph to vX.X.X"
git push
```

## Verification

- [ ] CI/CD pipeline completed
- [ ] Schema package published on [npm](https://www.npmjs.com/package/@lumina-study/block-schema)
- [ ] All dependent packages updated
- [ ] VSCode extension preview works
- [ ] Client applications work
