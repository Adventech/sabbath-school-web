# Architecture Guide

This document describes the technical architecture of the Sabbath School Web application, a Vue.js application serving multiple branded sites from a single codebase.

## Table of Contents

- [Overview](#overview)
- [Multi-Site Architecture](#multi-site-architecture)
- [Component Hierarchy](#component-hierarchy)
- [State Management](#state-management)
- [API Layer](#api-layer)
- [Plugin System](#plugin-system)
- [Block System](#block-system)
- [Theme System](#theme-system)
- [Internationalization](#internationalization)

## Overview

Sabbath School Web is built with Vue 3 and the Composition API. The architecture is designed around several key principles:

1. **Multi-site from single codebase** - One deployment serves multiple branded sites
2. **Modular block system** - Content is rendered through composable block components
3. **Plugin-based features** - Bible integration, highlighting, and menus are implemented as Vue plugins
4. **Persisted state** - User preferences and authentication persist across sessions

### Technology Stack

```
Frontend Framework:  Vue 3.2+ (Composition API)
Build Tool:          Vite 2.9
State Management:    Pinia 2.0 with persistence
Routing:             Vue Router 4.0
Styling:             TailwindCSS 3.4
HTTP Client:         Axios 0.27
PDF Viewer:          PSPDFKit 2022.2
Video Player:        Video.js 8.17
Event Bus:           mitt 3.0
```

## Multi-Site Architecture

### Site Detection

The application determines which site to serve based on the hostname at runtime. This detection happens in two places:

#### App Component Selection (`src/main.js`)

```javascript
const getApp = async function () {
    return window.location.hostname.includes(VITE_APP_SSPM_INVERSE_HOST)
        ? await import('@/InVerseApp.vue')
        : window.location.hostname.includes(VITE_APP_SSPM_ABSG_HOST)
            ? await import('@/ABSGApp.vue')
            : await import('@/App.vue')
}
```

#### Route Selection (`src/router/index.js`)

```javascript
const getRoutes = function () {
    return window.location.hostname.includes(VITE_APP_SSPM_INVERSE_HOST)
        ? inverseroutes
        : window.location.hostname.includes(VITE_APP_SSPM_ABSG_HOST)
            ? absgroutes
            : routes
}
```

### Site Configurations

| Site | App Component | Routes | Description |
|------|---------------|--------|-------------|
| Main | `App.vue` | `routes` | Primary Sabbath School lessons |
| ABSG | `ABSGApp.vue` | `absgroutes` | Adult Bible Study Guide |
| InVerse | `InVerseApp.vue` | `inverseroutes` | InVerse Bible study |
| AIJ Babies | `App.vue` | `routes` | Uses AIJ-specific headers |
| AIJ Beginner | `App.vue` | `routes` | Uses AIJ-specific headers |

### File Organization by Site

```bash
src/
├── App.vue                     # Main site shell
├── ABSGApp.vue                 # ABSG site shell
├── InVerseApp.vue              # InVerse site shell
│
├── components/
│   ├── Header.vue              # Main site header
│   ├── HeaderAIJBabies.vue     # AIJ Babies header
│   ├── HeaderAIJBeginner.vue   # AIJ Beginner header
│   ├── ABSG/                   # ABSG-specific components
│   │   ├── ABSGHeader.vue
│   │   ├── ABSGFooter.vue
│   │   └── ...
│   └── InVerse/                # InVerse-specific components
│       ├── InVerseHeader.vue
│       ├── InVerseFooter.vue
│       └── ...
│
└── views/
    ├── Read.vue                # Main site lesson reader
    ├── ABSG/                   # ABSG views
    │   ├── ABSGHome.vue
    │   ├── ABSGDocument.vue
    │   └── ...
    └── InVerse/                # InVerse views
        ├── InVerseHome.vue
        ├── InVerseDocument.vue
        └── ...
```

## Component Hierarchy

### Main Application Flow

```
App.vue / ABSGApp.vue / InVerseApp.vue
│
├── Header Component (site-specific)
│   ├── LanguageButton
│   ├── LoginButton
│   └── Navigation
│
├── <RouterView>
│   └── View Components (route-specific)
│       ├── Content Components
│       └── Block Components (recursive)
│
└── Footer Component (site-specific)
```

### Key Views

| View | Route | Purpose |
|------|-------|---------|
| `Quarterlies.vue` | `/:lang` | List of available quarterlies |
| `Lessons.vue` | `/:lang/:quarter` | Lessons in a quarterly |
| `Read.vue` | `/:lang/:quarter/:lesson/:day?` | Lesson content reader |
| `Resource.vue` | `/resources/:lang/:type/:name` | Resource overview |
| `Document.vue` | `/resources/.../document/:segment?` | Document viewer |

### Component Communication Patterns

1. **Props and Events** - Standard parent-child communication
2. **Pinia Stores** - Cross-component state sharing
3. **Event Bus (mitt)** - Decoupled component communication

```javascript
// Event bus setup (main.js)
const emitter = mitt()
app.config.globalProperties.emitter = emitter

// Emitting events
this.emitter.emit('bible-click', { verse: 'John 3:16' })
this.emitter.emit('segment-click', segmentIndex)

// Listening to events
this.emitter.on('auth-logged-in', () => { /* handle login */ })
this.emitter.on('segment-click', (index) => { /* scroll to segment */ })
```

## State Management

### Pinia Stores

The application uses Pinia for state management with the persistence plugin.

#### Auth Store (`src/stores/auth.js`)

Manages user authentication state:

```javascript
export const authStore = defineStore({
  id: 'auth',
  state: () => ({
    account: null,
    token: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    setAuth(account, token) {
      this.account = account
      this.token = token
    },
    logout() {
      this.account = null
      this.token = null
    }
  },
  persist: true
})
```

#### Language Store (`src/stores/language.js`)

Manages the current language/locale:

```javascript
export const languageStore = defineStore({
  id: 'language',
  state: () => ({
    code: 'en',
  }),
  persist: true
})
```

#### Theme Store (`src/plugins/Theme/ThemeStore.js`)

Manages the visual theme:

```javascript
const THEME_COLOR = {
  LIGHT: 'light',
  SEPIA: 'sepia',
  DARK: 'dark'
}

export const themeStore = defineStore({
  id: 'theme',
  state: () => ({
    color: THEME_COLOR.LIGHT,
  }),
  getters: {
    getClassList: (state) => `theme theme--${state.color}`
  },
  persist: true
})
```

### Persistence

State is persisted to `localStorage` using `pinia-plugin-persistedstate`. Persisted stores include:

- Authentication (account and token)
- Language preference
- Theme preference
- Reader options (font size, typeface)

## API Layer

### Axios Instances

Four Axios instances handle different API requirements:

| Instance | Auth | Base URL | Purpose |
|----------|------|----------|---------|
| `$api` | No | `VITE_APP_API_HOST` | Public content (v2) |
| `$apiResources` | No | `VITE_APP_API_RESOURCES_HOST` | Public resources (v3) |
| `$apiAuth` | Yes | `VITE_APP_API_HOST` | User data (v2) |
| `$apiAuthResources` | Yes | `VITE_APP_API_RESOURCES_HOST` | User resources (v3) |

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Authentication Flow                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. User Login                                                  │
│     │                                                           │
│     ▼                                                           │
│  2. Store token in Pinia (persisted to localStorage)            │
│     │                                                           │
│     ▼                                                           │
│  3. Request interceptor adds x-ss-auth-access-token header      │
│     │                                                           │
│     ▼                                                           │
│  4. API Request                                                 │
│     │                                                           │
│     ├──► Success (200) ──► Continue                             │
│     │                                                           │
│     └──► 401 Unauthorized                                       │
│          │                                                      │
│          ▼                                                      │
│     5. Response interceptor calls /auth/refresh                 │
│          │                                                      │
│          ├──► Success ──► Update token ──► Retry request        │
│          │                                                      │
│          └──► Failure ──► Logout user                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Request Interceptor

```javascript
// Added to $apiAuth and $apiAuthResources
axios.interceptors.request.use((config) => {
  const token = authStore().token
  if (token) {
    config.headers['x-ss-auth-access-token'] = token
  }
  return config
})
```

### Response Interceptor

```javascript
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newToken = await refreshToken()
      if (newToken) {
        error.config.headers['x-ss-auth-access-token'] = newToken
        return axios.request(error.config)
      }
    }
    return Promise.reject(error)
  }
)
```

## Plugin System

### Overview

The application uses Vue plugins for modular feature implementation:

```javascript
// Plugin registration (main.js)
app.use(Highlighter)   // Text highlighting
app.use(ContextMenu)   // Context menus
app.use(Bible)         // Bible verse integration
```

### Bible Plugin (`src/plugins/Bible/`)

Handles Bible verse links within content.

**Directive-based approach:**

```javascript
vue.directive('bible-links', {
  mounted(el, binding) {
    el.addEventListener('click', (event) => {
      const link = event.target.closest('a')
      if (link?.classList.contains('resource-link-sspm-bible')) {
        vue.config.globalProperties.emitter.emit('bible-click', {
          verse: link.dataset.verse,
          // ... additional context
        })
        event.preventDefault()
      }
    })
  }
})
```

**Usage in templates:**

```vue
<div v-bible-links v-html="content"></div>
```

### Highlighter Plugin (`src/plugins/Highlighter/`)

Provides text highlighting functionality with HTML-aware positioning.

**Key methods:**

| Method | Purpose |
|--------|---------|
| `getHighlightForElement()` | Get selection range within element |
| `applyHighlights()` | Apply highlight markers to text |
| `clearHighlights()` | Remove all highlights |

**Usage:**

```javascript
// Get current selection
const highlight = this.$highlighter.getHighlightForElement(element)

// Apply stored highlights
this.$highlighter.applyHighlights(element, highlights)
```

### Context Menu Plugin (`src/plugins/ContextMenu/`)

Provides right-click context menu functionality for content interactions.

### Theme Plugin (`src/plugins/Theme/`)

Manages visual themes with Pinia integration and TailwindCSS variants.

## Block System

### Overview

Content in the Resources section is rendered through a modular block system. Each block type maps to a Vue component.

### Block.vue - Dynamic Renderer

`src/components/Resources/Blocks/Block.vue` is the central component that:

1. Maps block types to Vue components
2. Applies styles from document configuration
3. Handles user interactions
4. Renders nested child blocks recursively

### Block Type Mapping

```javascript
const blocks = {
  'paragraph':       { component: Paragraph, on: { highlight, completion } },
  'heading':         { component: Heading },
  'list':            { component: List },
  'list-item':       { component: ListItem, on: { highlight } },
  'blockquote':      { component: Blockquote },
  'collapse':        { component: Collapse },
  'image':           { component: Image },
  'video':           { component: Video },
  'audio':           { component: Audio },
  'question':        { component: Question, on: { answered } },
  'poll':            { component: Poll },
  'appeal':          { component: Appeal, on: { appeal } },
  'multiple-choice': { component: MultipleChoice, on: { choice } },
  'checklist':       { component: Checklist, on: { checked } },
  'excerpt':         { component: Excerpt },
  'story':           { component: Story },
  'table':           { component: Table },
  'table-row':       { component: TableRow },
  'carousel':        { component: Carousel },
  'reference':       { component: Reference },
  'hr':              { component: Hr },
}
```

### Dependency Injection Pattern

Document context is shared with all block descendants through Vue's provide/inject:

**Provider (Document.vue):**

```javascript
provide() {
  return {
    getDocument: () => this.document,
    getDocumentUserInput: () => this.documentUserInput,
    getDefaultStyles: () => this.document?.defaultStyles,
    getStyle: () => this.document?.style,
  }
}
```

**Consumer (Block.vue):**

```javascript
inject: ['getStyle', 'getDefaultStyles', 'getDocument', 'getDocumentUserInput']
```

### Styling System

Block styles are computed from document configuration:

```javascript
// BlockStyle.js utilities
BlockStyle.getElementStyle(style?.blocks, 'block', block)   // Block-level styles
BlockStyle.getElementStyle(style?.blocks, 'wrapper', block) // Wrapper styles
BlockStyle.getTextStyle(style?.blocks, '', block)           // Text styles
```

### Interactive Blocks

Some blocks handle user input that is saved to the API:

| Block | User Input | API Endpoint |
|-------|------------|--------------|
| Paragraph | Highlights | `/resources/user/input/highlights/{docId}/{blockId}` |
| Question | Answers | `/resources/user/input/question/{docId}/{blockId}` |
| Appeal | Responses | `/resources/user/input/appeal/{docId}/{blockId}` |
| MultipleChoice | Selections | `/resources/user/input/multiple-choice/{docId}/{blockId}` |
| Checklist | Checked items | `/resources/user/input/checklist/{docId}/{blockId}` |

## Theme System

### TailwindCSS Theme Variants

Custom TailwindCSS variants enable theme-aware styling:

```javascript
// tailwind.config.js
addVariant('theme-light', '.theme.theme--light &')
addVariant('theme-sepia', '.theme.theme--sepia &')
addVariant('theme-dark', '.theme.theme--dark &')
```

### Usage in Templates

```html
<div class="
  theme-light:bg-white theme-light:text-gray-900
  theme-sepia:bg-amber-50 theme-sepia:text-amber-900
  theme-dark:bg-gray-900 theme-dark:text-gray-100
">
  Themed content
</div>
```

### Theme Application

The theme class is applied to a parent element:

```vue
<div :class="themeStore().getClassList">
  <!-- .theme.theme--light, .theme.theme--sepia, or .theme.theme--dark -->
  <RouterView />
</div>
```

## Internationalization

### Language Support

88 languages are defined in `src/locales.js`, including:

- Western languages (English, Spanish, French, German, etc.)
- Asian languages (Chinese, Japanese, Korean, etc.)
- RTL languages (Arabic, Persian, Hebrew)
- Many others

### RTL Support

RTL (Right-to-Left) direction is automatically applied for Arabic, Persian, and Hebrew:

```javascript
// In App.vue
const dir = computed(() => {
  return ['ar', 'fa', 'he'].includes(languageStore().code) ? 'rtl' : 'auto'
})
```

```vue
<div :dir="dir">
  <!-- Content automatically adjusts for RTL -->
</div>
```

### Language in Routes

Language is part of the route structure:

```
/:lang/quarterlies                    # List quarterlies
/:lang/quarterlies/:quarter           # Lessons in quarterly
/:lang/quarterlies/:quarter/:lesson   # Lesson content
```

The language store synchronizes with the route parameter.
