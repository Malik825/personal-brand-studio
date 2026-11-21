---
name: sanity
description: >-
  Work with Sanity.io in this project. Use when the user asks to connect Sanity,
  configure Sanity schemas, write GROQ queries, integrate @sanity/client,
  or set up the Sanity MCP server.
---

# Sanity.io Integration Skill

This skill provides step-by-step procedures to initialize, connect, and maintain Sanity.io for Personal Brand Studio.

## Architecture Overview

The site uses a decoupled `ContentProvider` pattern:
- `src/content/types.ts`: TypeScript contracts for all models.
- `src/content/providers/static.ts`: Fallback/offline provider with static data.
- `src/content/providers/sanity.ts`: The live provider fetching from Sanity via GROQ.
- `src/content/index.ts`: Active provider selector.

Routes call async accessors (`getProjects()`, `getArticle()`, etc.) and require **zero modifications** when switching to Sanity.

---

## 1. Official Sanity MCP Setup

The agent can query and manipulate Sanity content directly via the official Sanity MCP server:

### Automatic setup (via Sanity CLI):
```bash
npx sanity@latest mcp configure
```

### Manual config (`mcp_config.json`):
Add the remote endpoint to `~/.gemini/config/mcp_config.json`:
```json
{
  "mcpServers": {
    "sanity": {
      "url": "https://mcp.sanity.io/mcp",
      "headers": {
        "Authorization": "Bearer <SANITY_API_TOKEN>"
      }
    }
  }
}
```

---

## 2. Bootstrapping Sanity Studio

To initialize a new Sanity project or studio:

```bash
npm create sanity@latest -- --template clean --output-path ./studio
```
Or deploy a hosted studio directly on `https://sanity.io/manage`.

### Reference Schemas
Reference schema definitions matching our exact TypeScript types:
- See [schemas.md](./references/schemas.md)

---

## 3. Wiring up `@sanity/client` in the Project

1. Install the client:
   ```bash
   npm install @sanity/client
   ```

2. Add environment variables to `.env`:
   ```env
   SANITY_PROJECT_ID="your_project_id"
   SANITY_DATASET="production"
   SANITY_API_VERSION="2024-01-01"
   ```

3. Update `src/content/providers/sanity.ts`:
   - Initialize `createClient(...)`.
   - Implement the methods using the GROQ queries documented in [groq-queries.md](./references/groq-queries.md).

4. Switch the active provider in `src/content/index.ts`:
   ```typescript
   import { SanityContentProvider } from "./providers/sanity";
   export const contentProvider: ContentProvider = new SanityContentProvider();
   ```

---

## 4. Rich Text (Portable Text)

When articles use rich text body blocks:
1. Install `@portabletext/react`:
   ```bash
   npm install @portabletext/react
   ```
2. Render in `src/routes/writing.$slug.tsx` with `<PortableText value={article.body} />`.
