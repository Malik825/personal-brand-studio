import { ArticleListSkeleton } from "@/components/site/Skeletons";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, PageIntro } from "@/components/site/Layout";
import { FadeUp } from "@/components/motion/FadeUp";
import { formatDate, getArticles } from "@/content";

export const Route = createFileRoute("/writing/")({
  loader: async () => {
    return { articles: await getArticles() };
  },
  head: () => ({
    meta: [
      { title: "Writing — Sule Malik" },
      {
        name: "description",
        content:
          "Essays on software engineering, product thinking and building with distributed teams.",
      },
      { property: "og:title", content: "Writing — Sule Malik" },
      {
        property: "og:description",
        content:
          "Essays on software engineering, product thinking and building with distributed teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Writing,
  pendingComponent: ArticleListSkeleton,
});

function Writing() {
  const { articles } = Route.useLoaderData();

  return (
    <Page>
      <PageIntro eyebrow="Writing" title="Notes on engineering and product." />
      <section className="container-site divide-y divide-border border-y border-border pb-16">
        {articles.map((a, idx) => (
          <FadeUp key={a.slug} delay={0.06 * idx}>
            <Link
              to="/writing/$slug"
              params={{ slug: a.slug }}
              className="group grid gap-4 py-10 px-2 -mx-2 rounded-lg transition-colors duration-200 hover:bg-card/40 md:grid-cols-[12rem_1fr_auto] md:items-baseline"
            >
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {formatDate(a.date)}
              </span>
              <div>
                <h2 className="font-display text-3xl font-medium tracking-tight transition-colors duration-200 group-hover:text-primary">
                  {a.title}
                </h2>
                <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">{a.excerpt}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                <span>
                  {a.topic} · {a.readingTime}
                </span>
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </div>
            </Link>
          </FadeUp>
        ))}
      </section>
    </Page>
  );
}
