import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  // One client per request: a module-level QueryClient leaks cached data between SSR requests.
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Preload route bundles and loader data on hover/focus for instant 0ms SPA transitions
    defaultPreload: "intent",
    defaultPreloadDelay: 50,
    // Prevent skeleton flickers on quick client navigations (only show if loading exceeds 800ms)
    defaultPendingMs: 800,
    defaultPendingMinMs: 500,
    defaultPreloadStaleTime: 30_000,
  });

  return router;
};
