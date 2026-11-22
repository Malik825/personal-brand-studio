import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { openInitialThread } from "@/lib/chat-history";
import { assistantCopy as copy } from "@/content/assistant";
import { Page } from "@/components/site/Layout";

export const Route = createFileRoute("/ask/")({
  head: () => ({ meta: [
    { title: copy.metadata.title }, { name: "description", content: copy.metadata.description },
    { property: "og:title", content: copy.metadata.title }, { property: "og:description", content: copy.metadata.description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: OpenChat,
});
function OpenChat() {
  const navigate = useNavigate();
  useEffect(() => { const thread = openInitialThread(); void navigate({ to: "/ask/$threadId", params: { threadId: thread.id }, replace: true }); }, [navigate]);
  return <Page><div className="container-site py-20">{copy.loading}</div></Page>;
}