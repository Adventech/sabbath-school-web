# Sabbath School Web

A multi-site Vue.js web application for the Sabbath School Personal Ministries (SSPM) platform, providing multi-language Bible study lessons, resources, and multimedia content for the Seventh-day Adventist Church.

## Features

- **Multi-Language Support** - 88 languages with RTL support for Arabic, Persian, and Hebrew
- **Multi-Site Architecture** - Single codebase serving multiple branded sites
- **Bible Integration** - Interactive Bible verse lookup with context menus
- **Text Annotation** - Highlighting and commenting on lesson content
- **Multimedia Resources** - Audio and video content integration
- **PDF Documents** - Native PDF viewing support
- **Theme System** - Light, sepia, and dark themes
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Offline Capabilities** - Persisted state for offline reading

## Sites Served

| Site | URL | Description |
|------|-----|-------------|
| Sabbath School | sabbath-school.adventech.io | Primary lesson platform |
| ABSG | absg.sspmadventist.org | Adult Bible Study Guide |
| InVerse | inverse.sspmadventist.org | InVerse Bible study |
| AIJ Babies | babies.aliveinjesus.info | Babies curriculum |
| AIJ Beginner | beginner.aliveinjesus.info | Beginner curriculum |

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Vue.js | 3.2+ |
| Build Tool | Vite | 2.9 |
| State Management | Pinia | 2.0 |
| Routing | Vue Router | 4.0 |
| Styling | TailwindCSS | 3.4 |
| HTTP Client | Axios | 0.27 |
| PDF Viewer | PSPDFKit | 2022.2 |
| Video Player | Video.js | 8.17 |
| Markdown | marked / markdown-it | 9.0 / 13.0 |

## Quick Start

### Prerequisites

- Node.js 16+
- Yarn (package manager)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sabbath-school-web

# Install dependencies
yarn install
```

### Development

```bash
# Start development server with hot reload
yarn dev

# The app will be available at http://localhost:5173
```

### Building

```bash
# Production build
yarn build

# Staging build
yarn build --mode stage

# Preview production build
yarn preview
```

## Project Structure

```
sabbath-school-web/
├── src/
│   ├── main.js              # App bootstrap, API setup, plugins
│   ├── App.vue              # Main app shell
│   ├── ABSGApp.vue          # ABSG site shell
│   ├── InVerseApp.vue       # InVerse site shell
│   ├── locales.js           # Language definitions (88 languages)
│   │
│   ├── router/              # Vue Router configuration
│   │   └── index.js         # Multi-site route selection
│   │
│   ├── stores/              # Pinia stores
│   │   ├── auth.js          # Authentication state
│   │   └── language.js      # Language/locale state
│   │
│   ├── plugins/             # Vue plugins
│   │   ├── Bible/           # Bible verse integration
│   │   ├── Highlighter/     # Text highlighting
│   │   ├── ContextMenu/     # Context menu system
│   │   └── Theme/           # Theme management
│   │
│   ├── components/          # Vue components
│   │   ├── Resources/       # Resource display
│   │   │   ├── Blocks/      # Content block types (20+)
│   │   │   └── Style/       # Style utilities
│   │   ├── ABSG/            # ABSG-specific components
│   │   ├── InVerse/         # InVerse-specific components
│   │   └── Reader/          # Lesson reader components
│   │
│   ├── views/               # Route-level views
│   │   ├── ABSG/            # ABSG views
│   │   └── InVerse/         # InVerse views
│   │
│   └── assets/              # Static assets
│       ├── fonts/           # Custom fonts
│       └── img/             # Images and icons
│
├── public/                  # Static public files
├── .env                     # Default environment
├── .env.stage               # Staging environment
├── .env.production          # Production environment
├── tailwind.config.js       # TailwindCSS configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies and scripts
```

## Environment Configuration

| Variable | Description |
|----------|-------------|
| `VITE_APP_API_HOST` | Main API base URL |
| `VITE_APP_API_RESOURCES_HOST` | Resources API base URL |
| `VITE_APP_SSPM_ABSG_HOST` | ABSG hostname pattern |
| `VITE_APP_SSPM_INVERSE_HOST` | InVerse hostname pattern |
| `VITE_APP_AIJ_BABIES_HOST` | AIJ Babies hostname pattern |
| `VITE_APP_AIJ_BEGINNER_HOST` | AIJ Beginner hostname pattern |

## Deployment

- **Stage Branch** deploys to `sabbath-school-stage.adventech.io`
- **Master Branch** deploys to `sabbath-school.adventech.io`

Deployments are automated via GitHub Actions to AWS S3 with CloudFront invalidation.

## Documentation

- [Architecture Guide](docs/ARCHITECTURE.md) - Technical architecture details
- [API Reference](docs/API.md) - API endpoints and data formats
- [Contributing Guide](CONTRIBUTING.md) - How to contribute

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on the development process, coding standards, and how to submit pull requests.

## License

Proprietary - Seventh-day Adventist Church
