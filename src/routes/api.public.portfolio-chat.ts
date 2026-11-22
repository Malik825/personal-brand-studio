import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/portfolio-chat")({
  server: { handlers: { POST: async ({ request }) => {
    const { handlePortfolioChat } = await import("@/lib/portfolio-chat.server");
    return handlePortfolioChat(request, process.env);
  } } },
});