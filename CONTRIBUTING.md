# Contributing to Sabbath School Web

Thank you for your interest in contributing to the Sabbath School Web project. This guide will help you understand the development process and coding standards.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [Project Architecture](#project-architecture)
- [Coding Standards](#coding-standards)
- [Git Workflow](#git-workflow)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Getting Help](#getting-help)

## Code of Conduct

This project is maintained by the Seventh-day Adventist Church technology team. Contributors are expected to maintain a respectful and professional environment. Discrimination, harassment, or inappropriate behavior will not be tolerated.

## Development Setup

### Prerequisites

- **Node.js** 16 or higher
- **Yarn** package manager (not npm)
- A modern web browser with developer tools

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sabbath-school-web

# Install dependencies (always use yarn)
yarn install

# Start development server
yarn dev
```

The development server will start at `http://localhost:5173` with hot module replacement.

### Environment Configuration

The project uses three environment files:

| File | Purpose | API Target |
|------|---------|------------|
| `.env` | Local development | Stage API |
| `.env.stage` | Staging builds | Stage API |
| `.env.production` | Production builds | Production API |

For local development, the default `.env` file is typically sufficient.

### Testing Multi-Site Locally

The application serves different sites based on hostname. To test different sites locally:

1. **Main Site** - Default at `localhost`
2. **ABSG Site** - Modify your `/etc/hosts` to point the ABSG hostname to localhost
3. **InVerse Site** - Modify your `/etc/hosts` to point the InVerse hostname to localhost

## Project Architecture

### Multi-Site System

This codebase serves multiple branded sites from a single deployment:

```
Main App (App.vue)          → Default hostname
ABSG App (ABSGApp.vue)      → VITE_APP_SSPM_ABSG_HOST
InVerse App (InVerseApp.vue) → VITE_APP_SSPM_INVERSE_HOST
AIJ Sites (App.vue + headers) → VITE_APP_AIJ_*_HOST
```

Site detection occurs in:
- `src/main.js` - App component selection
- `src/router/index.js` - Route configuration selection

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/components/` | Reusable Vue components |
| `src/views/` | Route-level page components |
| `src/stores/` | Pinia state stores |
| `src/plugins/` | Vue plugin modules |
| `src/router/` | Vue Router configuration |
| `src/assets/` | Static assets (fonts, images) |

### Component Organization

- **Shared components** go in `src/components/`
- **Site-specific components** go in `src/components/{SiteName}/`
- **Block components** go in `src/components/Resources/Blocks/`

## Coding Standards

### Vue Component Structure

All components use the Vue 3 Composition API with `<script setup>` syntax:

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/stores/storeName'
import ComponentName from '@/components/ComponentName.vue'

// Reactive state
let variableName = ref('value')

// Computed properties
const computedValue = computed(() => {
  return someLogic
})

// Functions - use const with function expression
const functionName = function () {
  // implementation
}

// Lifecycle hooks
onMounted(() => {
  // setup logic
})
</script>

<template>
  <!-- Template markup -->
</template>
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HeaderAIJBabies.vue` |
| Component files | PascalCase | `ReaderOptions.vue` |
| Variables | camelCase | `lessonData` |
| Functions | camelCase | `fetchQuarterlies` |
| CSS classes | kebab-case | `lesson-card` |
| Store files | lowercase | `auth.js` |

### Function Declaration Style

Use the `const` with function expression pattern:

```javascript
// Preferred
const fetchData = function () {
  // implementation
}

// Also acceptable for arrow functions in callbacks
const items = data.map((item) => item.name)
```

### Pinia Store Pattern

```javascript
import { defineStore } from 'pinia'

export const storeName = defineStore({
  id: 'storeName',
  state: () => ({
    property: null,
  }),
  getters: {
    getterName: (state) => {
      return state.property
    }
  },
  actions: {
    actionName(param) {
      this.property = param
    }
  },
  persist: true  // Enable persistence if needed
})
```

### CSS and Styling

- Use **TailwindCSS** utility classes as the primary styling method
- Use custom theme variants for theme-aware styling:
  - `theme-light:bg-white`
  - `theme-sepia:bg-amber-50`
  - `theme-dark:bg-gray-900`
- Use component-scoped SCSS only when Tailwind is insufficient

### Import Aliases

Use the `@/` alias for imports from the `src/` directory:

```javascript
// Preferred
import ComponentName from '@/components/ComponentName.vue'

// Avoid
import ComponentName from '../../../components/ComponentName.vue'
```

### Code Quality Guidelines

- Remove all `console.log` statements before committing (unless intentional debugging)
- Document complex functions with comments explaining the purpose
- Keep components focused on a single responsibility
- Avoid deeply nested code - refactor when nesting exceeds 3 levels

## Git Workflow

### Branch Strategy

- **master** - Production deployments
- **stage** - Staging deployments and integration testing
- **feature/*** - New features
- **fix/*** - Bug fixes

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add multi-language PDF support
fix: resolve RTL text alignment in Reader
refactor: simplify block rendering logic
docs: update API documentation
```

Prefixes:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `style:` - Styling changes
- `chore:` - Maintenance tasks

### Creating a Feature Branch

```bash
# Update your local stage branch
git checkout stage
git pull origin stage

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes, then commit
git add .
git commit -m "feat: description of your feature"

# Push to remote
git push origin feature/your-feature-name
```

## Testing Guidelines

### Current Testing Approach

**Note:** This project does not currently have automated testing configured. All testing is manual.

### Manual Testing Checklist

Before submitting a pull request, verify:

- [ ] **Build succeeds** - Run `yarn build` without errors
- [ ] **Browser testing** - Test in Chrome, Firefox, and Safari
- [ ] **Responsive design** - Test on mobile, tablet, and desktop viewports
- [ ] **Theme support** - Test with light, sepia, and dark themes
- [ ] **RTL languages** - If text changes, test with Arabic, Persian, or Hebrew
- [ ] **Multi-site** - Verify changes work on all applicable sites (Main, ABSG, InVerse)

### Build Verification

Always verify the build succeeds before submitting:

```bash
yarn build
```

## Pull Request Process

### Before Submitting

1. Ensure your code follows the [Coding Standards](#coding-standards)
2. Complete the [Manual Testing Checklist](#manual-testing-checklist)
3. Update documentation if you changed functionality
4. Rebase your branch on the latest `stage` branch

### Submitting a Pull Request

1. Push your branch to the remote repository
2. Create a pull request targeting the `stage` branch
3. Fill out the PR template with:
   - Description of changes
   - Testing performed
   - Screenshots (for UI changes)
   - Related issues (if any)
4. Request review from maintainers

### Review Process

- At least one maintainer must approve the PR
- Address all review comments
- Keep the PR focused - avoid unrelated changes
- Squash commits before merging if requested

### After Merging

- Delete your feature branch
- Verify the changes deploy successfully to staging
- Monitor for any reported issues

## Getting Help

### Documentation

- [Architecture Guide](docs/ARCHITECTURE.md) - Technical architecture details
- [API Reference](docs/API.md) - API endpoints and data formats
- [CLAUDE.md](CLAUDE.md) - Quick reference for AI assistants

### Communication

For questions or issues:

1. Check existing documentation and code comments
2. Search for similar issues in the issue tracker
3. Create a new issue with detailed information
4. Tag appropriate maintainers for visibility

### Useful Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
