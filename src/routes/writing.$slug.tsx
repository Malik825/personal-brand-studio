import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page } from "@/components/site/Layout";
import { formatDate, getArticle } from "@/content";

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
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
      <article className="container-site max-w-3xl pt-16">
        <Link to="/writing" className="text-sm text-muted-foreground hover:text-foreground">← All writing</Link>
        <p className="mt-10 text-sm uppercase tracking-widest text-primary">{a.topic}</p>
        <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">{a.title}</h1>
        <p className="mt-6 text-sm text-muted-foreground">{formatDate(a.date)} · {a.readingTime} read</p>
        <div className="mt-12 space-y-6 border-t border-border pt-12 text-lg leading-[1.8]">
          {a.body.map((p) => <p key={p}>{p}</p>)}
        </div>
      </article>
    </Page>
  );
}
