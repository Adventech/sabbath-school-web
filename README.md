# sabbath-school-web

A Vue.js web application for Sabbath School Bible Study resources, supporting 88+ languages with RTL support.

## Getting Started

### Prerequisites

- Node.js 20+
- Yarn package manager

### Installation

```bash
# Install dependencies
yarn install
```

### Development

```bash
# Start development server with hot-reload
yarn dev
```

### Build

```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

## Testing

This project uses **Vitest** for unit/component testing and **Playwright** for E2E testing.

### Quick Commands

```bash
# Run unit tests
yarn test:unit

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run E2E tests
yarn build && yarn test:e2e

# Run E2E tests with browser UI
yarn test:e2e:ui
```

### Test Structure

```
tests/
├── unit/           # Unit tests (stores, utilities)
├── component/      # Vue component tests
├── e2e/            # End-to-end tests (Playwright)
├── a11y/           # Accessibility tests
├── mocks/          # MSW API mocks
├── setup/          # Test configuration
└── utils/          # Test helpers and fixtures
```

### Coverage

- Target: 70% line coverage
- Reports: `./coverage/` directory after running `yarn test:coverage`

For detailed testing documentation, see [docs/TESTING.md](docs/TESTING.md).

## Project Structure

```
src/
├── components/     # Vue components
│   └── Resources/
│       └── Blocks/ # 20+ content block types
├── stores/         # Pinia state management
├── views/          # Page components
├── router/         # Vue Router configuration
├── plugins/        # Custom plugins (Bible, Highlighter)
└── locales/        # Internationalization
```

## Features

- **Multi-language Support**: 88+ languages including RTL (Arabic, Hebrew, Persian)
- **Multi-site Architecture**: Hostname-based routing for different applications
- **Block-based Content**: 20+ content block types (paragraphs, questions, media, etc.)
- **User Features**: Highlighting, notes, reading progress
- **Accessibility**: WCAG 2.1 AA compliance target

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for new functionality
4. Ensure all tests pass (`yarn test:unit`)
5. Commit your changes
6. Push to your branch
7. Open a Pull Request

## License

See LICENSE file for details.
