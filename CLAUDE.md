# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
yarn dev              # Start dev server
yarn build            # Production build
yarn build --mode stage  # Stage build

# Package management (use yarn, not npm)
yarn install
```

No linting, formatting, or test scripts are configured.

## Architecture

### Multi-Site Single Codebase

This Vue 3 application serves multiple sites from one codebase, determined by hostname at runtime:

| Site | Hostname Pattern | App Component | Routes |
|------|------------------|---------------|--------|
| Main Sabbath School | default | `App.vue` | `routes` |
| ABSG | `VITE_APP_SSPM_ABSG_HOST` | `ABSGApp.vue` | `absgroutes` |
| InVerse | `VITE_APP_SSPM_INVERSE_HOST` | `InVerseApp.vue` | `inverseroutes` |
| AIJ Babies/Beginner | `VITE_APP_AIJ_*_HOST` | `App.vue` (with AIJ headers) | `routes` |

Site detection happens in `src/main.js` (app selection) and `src/router/index.js` (route selection).

### API Layer

Four Axios instances in `src/main.js`:
- `$api` / `$apiResources` - Unauthenticated requests
- `$apiAuth` / `$apiAuthResources` - Authenticated with `x-ss-auth-access-token` header

Auth interceptors automatically refresh tokens on 401 responses via `/auth/refresh`.

### Key Patterns

**Vue Composition API**: All components use `<script setup>` syntax with Vue 3 Composition API.

**Pinia Stores**: State management with persisted state (`pinia-plugin-persistedstate`). Stores in `src/stores/`.

**Resource Blocks**: Content rendered via modular block components in `src/components/Resources/Blocks/`. The `Block.vue` wrapper handles dynamic block type rendering.

**Theme System**: TailwindCSS variants (`theme-light`, `theme-sepia`, `theme-dark`) controlled via `.theme.theme--{variant}` parent class.

**RTL Support**: Automatic RTL direction for Arabic (`ar`), Persian (`fa`), Hebrew (`he`) based on language store.

### Directory Layout

- `src/views/` - Route-level views, with `ABSG/` and `InVerse/` subdirectories for site-specific views
- `src/components/` - Shared components, with site-specific subdirectories
- `src/plugins/` - Vue plugins: Bible (verse lookup), Highlighter (text annotation), ContextMenu

## Deployment

- **stage branch** → `sabbath-school-stage.adventech.io` (uses `.env.stage`)
- **master branch** → `sabbath-school.adventech.io` (uses `.env.production`)

Builds deploy to S3 with CloudFront invalidation.
