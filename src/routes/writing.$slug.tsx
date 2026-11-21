import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page } from "@/components/site/Layout";
import { FadeUp } from "@/components/motion/FadeUp";
import { formatDate, getArticle } from "@/content";

export const Route = createFileRoute("/writing/$slug")({
  loader: async ({ params }) => {
    const article = await getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Sule Malik` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const a = Route.useLoaderData();
  return (
    <Page>
      <article className="container-site max-w-3xl pt-16 pb-24">
        <FadeUp>
          <Link
            to="/writing"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary group"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1" aria-hidden>
              ←
            </span>
            <span>All writing</span>
          </Link>
          <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-primary">{a.topic}</p>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">{a.title}</h1>
          <p className="mt-6 text-sm text-muted-foreground">
            {formatDate(a.date)} · {a.readingTime} read
          </p>
        </FadeUp>

        <div className="mt-12 space-y-6 border-t border-border pt-12 text-lg leading-[1.8] text-foreground/90">
          {a.body.map((p, idx) => (
            <FadeUp key={idx} delay={0.06 * Math.min(idx, 4)}>
              <p>{p}</p>
            </FadeUp>
          ))}
        </div>
      </article>
    </Page>
  );
}
