# Personal Brand Studio

The personal brand website of **Sule Malik** — a central place to explore my software engineering journey, selected projects, technical writing, and professional background.

Built as a modern, content-driven web application with **TanStack Start, React 19, TypeScript, Tailwind CSS 4, and Sanity.io**.

**Live Website:** [sulemalik.com](https://www.sulemalik.com)

## Overview

Personal Brand Studio is more than a traditional developer portfolio. It is designed as a flexible publishing platform where projects, articles, professional experience, and personal information can be managed independently of the frontend.

The application uses Sanity as its content management system, with a provider-based content architecture that supports both live CMS content and static fallback data.

## Key Features

- **Content-driven portfolio:** Showcase projects, articles, professional experience, and background information.
- **Headless CMS integration:** Manage website content through Sanity Studio.
- **Decoupled content architecture:** Separate content retrieval from the presentation layer using a shared `ContentProvider` interface.
- **Static content fallback:** Maintain a fallback content source when live Sanity content is unavailable.
- **Server-side data loading:** Load route data asynchronously through TanStack Router loaders.
- **Dedicated content management studio:** Run and deploy an isolated Sanity Studio application.
- **Content seeding:** Populate the Sanity dataset with initial projects, articles, experience, and about content.

## Technology Stack

| Area | Technologies |
|---|---|
| Framework | TanStack Start |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Content Management | Sanity.io, Sanity Studio v3 |
| Data Fetching | GROQ |
| Routing & Data Loading | TanStack Router |
| Testing | Project test scripts |

## Content Architecture

Content access is abstracted through `src/content/index.ts` using a shared `ContentProvider` interface.

Two content providers are implemented:

### SanityContentProvider

Located in `src/content/providers/sanity.ts`.

- Retrieves live content from Sanity.
- Uses GROQ queries to fetch structured content.
- Supports automatic fallback to static content.

### StaticContentProvider

Located in `src/content/providers/static.ts`.

- Provides locally defined content.
- Supports fallback and offline content access.

This architecture keeps content retrieval separate from the UI and makes it easier to evolve the content source without tightly coupling it to individual pages.

## Project Structure

```text
studio/          # Isolated Sanity Studio application
scripts/         # Database seeding and utility scripts
src/
  content/       # Content providers, GROQ queries, and types
  components/
    site/        # Site layout and visual palettes
    ui/          # Reusable UI components
  routes/        # TanStack file-based routes
  lib/            # Utilities and SSR handling
  assets/         # Asset metadata
public/           # Images, favicon, fonts, and static assets
```

## Getting Started

### Prerequisites

- Node.js
- npm or Bun
- A Sanity account for CMS functionality

### Installation

Clone the repository:

```bash
git clone https://github.com/Malik825/<repository-name>.git
cd <repository-name>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Run Tests

```bash
npm run test
```

## Sanity Studio & Content Management

The project uses Sanity project ID `wcfopvjq` with the `production` dataset.

### Run Sanity Studio locally

```bash
cd studio
npm install
npm run dev
```

Studio will be available at:

```text
http://localhost:3333
```

### Deploy Sanity Studio

```bash
cd studio
npm run deploy
```

### Seed Initial Content

To populate the Sanity dataset with initial projects, articles, experience, and about content:

```bash
SANITY_AUTH_TOKEN="your_sanity_token" npm run seed:sanity
```

Keep authentication tokens private. Never commit them to the repository.

## Engineering Highlights

This project demonstrates:

- Modern React application development with TanStack Start.
- Type-safe content modelling and integration.
- Headless CMS implementation with Sanity.
- Provider-based architecture for interchangeable content sources.
- Asynchronous route-level data loading.
- Static fallback strategies for content availability.
- Separation of frontend presentation and content management.

## License

See the repository for licensing and usage information.
