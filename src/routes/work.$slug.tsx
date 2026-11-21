import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Eyebrow, Page } from "@/components/site/Layout";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { FadeUp } from "@/components/motion/FadeUp";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { getProject, getProjects } from "@/content";

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
  head: ({ loaderData }) => ({
    meta: loaderData?.project
      ? [
          { title: `${loaderData.project.title} case study — Sule Malik` },
          { name: "description", content: loaderData.project.summary },
          {
            property: "og:title",
            content: `${loaderData.project.title} case study — Sule Malik`,
          },
          {
            property: "og:description",
            content: loaderData.project.summary,
          },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Case study unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: CaseStudy,
});

function CaseStudy() {
  const { project: p, nextProject: next } = Route.useLoaderData();

  return (
    <Page>
      <article>
        <header className="container-site pb-12 pt-16">
          <FadeUp>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary group"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1" aria-hidden>
                ←
              </span>
              <span>All work</span>
            </Link>
            <h1 className="mt-8 font-display text-6xl tracking-tight md:text-8xl">{p.title}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">{p.summary}</p>
            <dl className="mt-12 grid gap-6 border-y border-border py-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Role</dt>
                <dd className="mt-1 font-medium">{p.role}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Category</dt>
                <dd className="mt-1 font-medium">{p.category}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Stack</dt>
                <dd className="mt-1 font-medium">{p.stack.join(", ")}</dd>
              </div>
            </dl>
          </FadeUp>
        </header>

        <div className="container-site">
          <ImageReveal delay={0.2} duration={1.1}>
            <div className="overflow-hidden rounded-xl border border-border">
              <ProjectVisual project={p} />
            </div>
          </ImageReveal>
        </div>

        <div className="container-site mt-20 space-y-16">
          <FadeUp>
            <section className="grid gap-6 lg:grid-cols-[1fr_2fr] border-b border-border pb-16">
              <Eyebrow>Challenge</Eyebrow>
              <p className="font-display text-3xl leading-snug md:text-4xl">{p.challenge}</p>
            </section>
          </FadeUp>

          <FadeUp>
            <section className="grid gap-6 lg:grid-cols-[1fr_2fr] border-b border-border pb-16">
              <Eyebrow>Approach</Eyebrow>
              <ol className="space-y-6 text-lg">
                {p.approach.map((a, i) => (
                  <li key={a} className="flex gap-4 items-baseline">
                    <span className="font-display text-2xl text-primary font-semibold">0{i + 1}</span>
                    <span className="leading-relaxed text-foreground/90">{a}</span>
                  </li>
                ))}
              </ol>
            </section>
          </FadeUp>

          <FadeUp>
            <section className="grid gap-6 lg:grid-cols-[1fr_2fr]">
              <Eyebrow>Outcome</Eyebrow>
              <p className="text-lg leading-relaxed text-muted-foreground">{p.outcome}</p>
            </section>
          </FadeUp>
        </div>
      </article>

      <div className="container-site mt-24 border-t border-border pt-12">
        <FadeUp>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group flex items-baseline justify-between py-6 rounded-lg transition-colors hover:text-primary"
          >
            <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
              Next project
            </span>
            <span className="font-display text-3xl sm:text-5xl font-medium tracking-tight flex items-center gap-3">
              <span>{next.title}</span>
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-2" aria-hidden>
                →
              </span>
            </span>
          </Link>
        </FadeUp>
      </div>
    </Page>
  );
}
