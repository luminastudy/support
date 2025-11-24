# Lumina Study Support Documentation

This website is the official support and documentation site for Lumina Study, built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
pnpm install
```

## Local Development

```bash
pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Using PM2 (Process Manager)

For persistent development server management:

```bash
# Start the dev server with PM2
pnpm pm2:start

# View logs
pnpm pm2:logs

# Check status
pnpm pm2:status

# Monitor resources
pnpm pm2:monit

# Restart server
pnpm pm2:restart

# Stop server
pnpm pm2:stop

# Remove from PM2
pnpm pm2:delete
```

PM2 keeps the server running in the background and automatically restarts it if it crashes. Logs are stored in `logs/` directory.

## Build

```bash
pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Code Quality

This project includes comprehensive code quality tools:

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Spell check (English and Hebrew support)
pnpm spell

# Find unused code
pnpm knip

# Type check
pnpm typecheck
```

## Deployment

The site is automatically deployed to GitHub Pages on every push to the main branch via GitHub Actions.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
