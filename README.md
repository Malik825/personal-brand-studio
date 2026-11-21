# Personal Brand Studio

Sule Malik's personal brand website — a portfolio showcasing projects, writing and professional background.

Built with [TanStack Start](https://tanstack.com/start), React 19, Tailwind CSS 4, TypeScript, and [Sanity.io](https://sanity.io).

## Development

```sh
# Install dependencies
npm install      # or: bun install

# Start web app dev server
npm run dev

# Build web app for production
npm run build

# Run unit tests
npm run test
```

## Sanity Studio & Content Management

The project is connected to Sanity project `wcfopvjq` (dataset: `production`).

### Running the Studio locally
```sh
cd studio
npm run dev
```
Studio will open at `http://localhost:3333`.

### Deploying the Studio to the web
```sh
cd studio
npm run deploy
```

### Seeding initial content to Sanity
To seed the site's initial projects, articles, experience, and about content into your Sanity dataset:
```sh
SANITY_AUTH_TOKEN="your_token_from_sanity_manage" npm run seed:sanity
```

## Content Architecture

Data access is abstracted through `src/content/index.ts` using the `ContentProvider` interface:
- **`SanityContentProvider`** (`src/content/providers/sanity.ts`): Queries live content via GROQ with automatic fallback to static data.
- **`StaticContentProvider`** (`src/content/providers/static.ts`): Fallback/offline data.

Routes load data asynchronously in TanStack route loaders (`Route.useLoaderData()`), keeping the UI completely decoupled from the data layer.

## Project Structure

```
studio/          # Isolated Sanity v3 Studio (schemas, structure, vision)
scripts/         # Database seeding and utility scripts
src/
  content/       # Provider pattern, GROQ queries, types
  components/
    site/        # Page layout, visual palettes
    ui/          # Design system components
  routes/        # TanStack file-based routes
  lib/           # Utilities and SSR handling
  assets/        # Asset metadata
public/          # Static assets (images, favicon, fonts)
```
