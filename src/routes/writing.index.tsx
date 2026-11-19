import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, PageIntro } from "@/components/site/Layout";
import { articles, formatDate } from "@/content";

export const Route = createFileRoute("/writing/")({
  head: () => ({
    meta: [
      { title: "Writing — Sule Malik" },
      { name: "description", content: "Essays on software engineering, product thinking and building with distributed teams." },
      { property: "og:title", content: "Writing — Sule Malik" },
      { property: "og:description", content: "Essays on software engineering, product thinking and building with distributed teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Writing,
});

function Writing() {
  return (
    <Page>
      <PageIntro eyebrow="Writing" title="Notes on engineering and product." />
      <section className="container-site divide-y divide-border border-y border-border">
        {articles.map((a) => (
          <Link key={a.slug} to="/writing/$slug" params={{ slug: a.slug }} className="group grid gap-3 py-10 md:grid-cols-[12rem_1fr_auto] md:items-baseline">
            <span className="text-sm text-muted-foreground">{formatDate(a.date)}</span>
            <div>
              <h2 className="font-display text-3xl group-hover:text-primary">{a.title}</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">{a.excerpt}</p>
            </div>
            <span className="text-sm text-muted-foreground">{a.topic} · {a.readingTime}</span>
          </Link>
        ))}
      </section>
    </Page>
  );
}
