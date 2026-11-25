import { CaseStudySkeleton } from "@/components/site/Skeletons";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Eyebrow, Page } from "@/components/site/Layout";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { FadeUp } from "@/components/motion/FadeUp";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { getProject, getProjects } from "@/content";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ params }) => {
    const [project, allProjects] = await Promise.all([
      getProject(params.slug),
      getProjects(),
    ]);

    if (!project) throw notFound();

    const currentIndex = allProjects.findIndex((x) => x.slug === project.slug);
    const nextProject =
      allProjects[(currentIndex + 1) % allProjects.length] ?? project;

    return { project, nextProject };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const imageUrl = p?.image
      ? p.image.startsWith("http")
        ? p.image
        : `https://sulemalik.com${p.image}`
      : "https://sulemalik.com/og-image.png";

    return {
      meta: p
        ? [
            { title: `${p.title} case study — Sule Malik` },
            { name: "description", content: p.summary },
            {
              property: "og:title",
              content: `${p.title} case study — Sule Malik`,
            },
            {
              property: "og:description",
              content: p.summary,
            },
            { property: "og:type", content: "article" },
            { property: "og:url", content: `https://sulemalik.com/work/${p.slug}` },
            { property: "og:image", content: imageUrl },
            { property: "og:image:alt", content: `${p.title} preview` },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: `${p.title} case study — Sule Malik` },
            { name: "twitter:description", content: p.summary },
            { name: "twitter:image", content: imageUrl },
          ]
        : [{ title: "Case study unavailable" }, { name: "robots", content: "noindex" }],
      links: p ? [{ rel: "canonical", href: `https://sulemalik.com/work/${p.slug}` }] : [],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                "name": p.title,
                "headline": `${p.title} Case Study`,
                "description": p.summary,
                "image": imageUrl,
                "url": `https://sulemalik.com/work/${p.slug}`,
                "author": {
                  "@type": "Person",
                  "name": "Sule Malik",
                  "url": "https://sulemalik.com",
                },
              }),
            },
          ]
        : [],
    };
  },
  component: CaseStudy,
  pendingComponent: CaseStudySkeleton,
});

function CaseStudy() {
  const { project: p, nextProject: next } = Route.useLoaderData();

  return (
    <Page>
      <ReadingProgress />
      <article>
        {/* Centered Editorial Header */}
        <header className="container-site max-w-5xl mx-auto pb-10 pt-14 md:pt-20">
          <FadeUp>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-muted-foreground transition-colors hover:text-foreground group"
              >
                <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1" aria-hidden>
                  ←
                </span>
                <span>Back to all work</span>
              </Link>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center rounded-full border border-border/80 bg-muted/40 px-3 py-0.5 text-xs font-mono text-muted-foreground">
                  {p.year}
                </span>
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                  {p.category}
                </span>
              </div>
            </div>

            <h1 className="mt-8 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.08]">
              {p.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed text-muted-foreground font-sans">
              {p.summary}
            </p>

            {/* Live Website & Source Code Actions */}
            {(p.url || p.githubUrl) && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-solid inline-flex items-center gap-2 group shadow-sm"
                    aria-label={`Visit live website for ${p.title} (opens in a new tab)`}
                  >
                    <span>Visit live website</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-4 py-2 text-xs font-medium text-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-card group"
                    aria-label={`View source code for ${p.title} on GitHub (opens in a new tab)`}
                  >
                    <span>View source code</span>
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-muted-foreground group-hover:text-foreground" />
                  </a>
                )}
              </div>
            )}

            {/* Elevated Metadata Matrix */}
            <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border/70 py-6 sm:grid-cols-4">
              <div>
                <dt className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Role</dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{p.role}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Timeline</dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{p.year}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Discipline</dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{p.category}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Technologies</dt>
                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="inline-block rounded border border-border/50 bg-muted/40 px-1.5 py-0.5 text-[11px] font-mono text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </FadeUp>
        </header>

        {/* Refined Case Study Visual Showcase (Well-proportioned, not oversized, image-only radius) */}
        <section className="container-site max-w-5xl mx-auto my-8 sm:my-12">
          <ImageReveal delay={0.05} duration={0.6}>
            <div className="flex items-center justify-center">
              <ProjectVisual
                project={p}
                fit="contain"
                eager
                className="w-full max-w-4xl mx-auto bg-transparent"
                imageClassName="w-full h-auto block rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.14)] ring-1 ring-foreground/10"
              />
            </div>
          </ImageReveal>
        </section>

        {/* Elevated Case Study Narrative */}
        <div className="container-site max-w-5xl mx-auto mt-16 sm:mt-20 space-y-20">
          <FadeUp>
            <section id="challenge" className="grid gap-6 md:grid-cols-[1fr_2.5fr] border-b border-border/70 pb-16">
              <div>
                <Eyebrow>01 / Challenge</Eyebrow>
                <span className="text-xs text-muted-foreground font-mono mt-1 block">The core problem</span>
              </div>
              <div>
                <p className="font-display text-2xl leading-snug sm:text-3xl md:text-4xl text-foreground font-normal">
                  {p.challenge}
                </p>
              </div>
            </section>
          </FadeUp>

          <FadeUp>
            <section id="approach" className="grid gap-6 md:grid-cols-[1fr_2.5fr] border-b border-border/70 pb-16">
              <div>
                <Eyebrow>02 / Approach</Eyebrow>
                <span className="text-xs text-muted-foreground font-mono mt-1 block">Architecture & execution</span>
              </div>
              <div className="space-y-6">
                <ol className="grid gap-4 sm:gap-5">
                  {p.approach.map((a, i) => (
                    <li
                      key={a}
                      className="group relative flex gap-4 sm:gap-6 items-start p-5 sm:p-6 rounded-2xl border border-border/60 bg-muted/20 transition-colors hover:bg-muted/40"
                    >
                      <span className="font-mono text-sm text-primary font-semibold shrink-0 pt-0.5">
                        0{i + 1}
                      </span>
                      <p className="leading-relaxed text-foreground/90 text-base sm:text-lg">
                        {a}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </FadeUp>

          <FadeUp>
            <section id="outcome" className="grid gap-6 md:grid-cols-[1fr_2.5fr]">
              <div>
                <Eyebrow>03 / Impact</Eyebrow>
                <span className="text-xs text-muted-foreground font-mono mt-1 block">Results & delivery</span>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-primary/[0.03] p-6 sm:p-8">
                <p className="text-lg sm:text-xl leading-relaxed text-foreground/90 font-sans">
                  {p.outcome}
                </p>
              </div>
            </section>
          </FadeUp>
        </div>

        {/* Elevated Next Project & Conversation Section */}
        <div className="container-site max-w-5xl mx-auto mt-24 border-t border-border/70 pt-12 pb-20">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-border/50">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Interested in similar architecture?
                </span>
                <p className="mt-1 text-base text-foreground font-medium">
                  Have a product or web application in mind? Let's discuss scope and timelines.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Get in touch →
              </Link>
            </div>

            <Link
              to="/work/$slug"
              params={{ slug: next.slug }}
              className="group mt-12 block p-6 sm:p-8 rounded-2xl border border-border/60 bg-muted/20 transition-all hover:bg-muted/40 hover:border-border"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Next Case Study
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {next.year} · {next.category}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {next.title}
                </h3>
                <span
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                  aria-hidden
                >
                  →
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl line-clamp-1">
                {next.summary}
              </p>
            </Link>
          </FadeUp>
        </div>
      </article>
    </Page>
  );
}
