import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Layout";
import { PortfolioChat } from "@/components/site/PortfolioChat";
import { assistantCopy as copy } from "@/content/assistant";

export const Route = createFileRoute("/ask/$threadId")({
  head: () => ({
    meta: [
      { title: `Conversation — ${copy.metadata.title}` },
      { name: "description", content: copy.metadata.description },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: `Conversation — ${copy.metadata.title}` },
      { property: "og:description", content: copy.metadata.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ChatPage,
});
function ChatPage() {
  const { threadId } = Route.useParams();
  return <Page><section className="container-site pb-8 pt-10 md:pt-14"><h1 className="font-display text-4xl md:text-5xl">{copy.title}</h1><p className="mb-10 mt-4 text-muted-foreground">{copy.subtitle}</p><PortfolioChat key={threadId} threadId={threadId} /></section></Page>;
}