## Project rules
- All site copy and data live in src/content (typed); UI components never hardcode content, so a CMS (Sanity.io) can replace the data source later.
- The public portfolio and assistant work signed-out; Cloud is used only for secure AI calls, not visitor accounts or chat storage.
- Static assets (images, fonts) go in public/; asset JSON in src/assets/ references paths under public/.

## Content architecture (Sanity-ready)
- The assistant loads grounding through the same content provider as portfolio pages on each request; this keeps answers current with Sanity content.
- Browser conversations use AI SDK UIMessage records keyed by `/ask/$threadId`, with no accounts or server transcript storage; this isolates history across navigation and reload.
- Stream AI Gateway calls through a public same-origin server endpoint, with validated text-only history and server-held prompts and credentials; this preserves signed-out access safely.
- Data access is abstracted behind `src/content/index.ts` using the `ContentProvider` interface in `src/content/types.ts`.
- Routes load dynamic content through route loaders calling `getSite()`, `getProjects()`, `getProject(slug)`, `getArticles()`, `getArticle(slug)`, `getExperience()`, and `getAbout()`.
- Active provider defaults to `StaticContentProvider` in `src/content/providers/static.ts` and switches to `SanityContentProvider` in `src/content/providers/sanity.ts`. No route or UI component needs to change.
