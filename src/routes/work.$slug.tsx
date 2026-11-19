import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Eyebrow, Page } from "@/components/site/Layout";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { getProject, projects } from "@/content";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} case study — Sule Malik` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.title} case study — Sule Malik` },
          { property: "og:description", content: loaderData.summary },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Case study unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: CaseStudy,
});

function CaseStudy() {
  const p = Route.useLoaderData();
  const next = projects[(projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length];
  return (
    <Page>
      <article>
        <header className="container-site pb-12 pt-16">
          <Link to="/work" className="text-sm text-muted-foreground hover:text-foreground">← All work</Link>
          <h1 className="mt-8 font-display text-6xl tracking-tight md:text-8xl">{p.title}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">{p.summary}</p>
          <dl className="mt-12 grid gap-6 border-y border-border py-6 sm:grid-cols-3">
            <div><dt className="text-xs uppercase tracking-widest text-muted-foreground">Role</dt><dd className="mt-1">{p.role}</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-muted-foreground">Category</dt><dd className="mt-1">{p.category}</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-muted-foreground">Stack</dt><dd className="mt-1">{p.stack.join(", ")}</dd></div>
          </dl>
        </header>
        <div className="container-site"><ProjectVisual project={p} /></div>
        <div className="container-site mt-16 space-y-14">
          <section className="grid gap-4 lg:grid-cols-[1fr_2fr]"><Eyebrow>Challenge</Eyebrow><p className="font-display text-3xl leading-snug">{p.challenge}</p></section>
          <section className="grid gap-4 lg:grid-cols-[1fr_2fr]"><Eyebrow>Approach</Eyebrow>
            <ol className="space-y-4 text-lg">{p.approach.map((a, i) => <li key={a} className="flex gap-4"><span className="font-display text-primary">0{i + 1}</span>{a}</li>)}</ol>
          </section>
          <section className="grid gap-4 lg:grid-cols-[1fr_2fr]"><Eyebrow>Outcome</Eyebrow><p className="text-lg leading-relaxed text-muted-foreground">{p.outcome}</p></section>
        </div>
      </article>
      <div className="container-site mt-20 border-t border-border pt-10">
        <Link to="/work/$slug" params={{ slug: next.slug }} className="group flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Next project</span>
          <span className="font-display text-4xl group-hover:text-primary">{next.title} →</span>
        </Link>
      </div>
    </Page>
  );
}
