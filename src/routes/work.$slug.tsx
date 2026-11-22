import { CaseStudySkeleton } from "@/components/site/Skeletons";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Eyebrow, Page } from "@/components/site/Layout";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { FadeUp } from "@/components/motion/FadeUp";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { getProject, getProjects } from "@/content";
import { cn } from "@/lib/utils";

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
      : "https://sulemalik.com/og-image.jpg";

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
        <header className="container-site max-w-5xl mx-auto pb-12 pt-16 md:pt-20">
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
            <h1 className="mt-8 font-display text-5xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">{p.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">{p.summary}</p>
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

        {/* Full-width Screen Showcase Visual with Creative Squircle Border Radius (strictly on the image) */}
        <section className="w-full my-6 sm:my-10 md:my-14 px-3 sm:px-6 md:px-10 lg:px-14">
          <ImageReveal delay={0.05} duration={0.6}>
            <div className="w-full flex items-center justify-center">
              <ProjectVisual
                project={p}
                fit="contain"
                eager
                className="w-full max-w-[1400px] mx-auto bg-transparent"
                imageClassName="w-full h-auto block rounded-[1.75rem] sm:rounded-[2.75rem] md:rounded-[3.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.18)] ring-1 ring-foreground/10"
              />
            </div>
          </ImageReveal>
        </section>

        {/* Centered Case Study Narrative */}
        <div className="container-site max-w-5xl mx-auto mt-16 sm:mt-20 space-y-16">
          <FadeUp>
            <section id="challenge" className="grid gap-6 md:grid-cols-[1fr_2.5fr] border-b border-border pb-16">
              <Eyebrow>Challenge</Eyebrow>
              <p className="font-display text-2xl leading-snug sm:text-3xl md:text-4xl">{p.challenge}</p>
            </section>
          </FadeUp>

          <FadeUp>
            <section id="approach" className="grid gap-6 md:grid-cols-[1fr_2.5fr] border-b border-border pb-16">
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
            <section id="outcome" className="grid gap-6 md:grid-cols-[1fr_2.5fr]">
              <Eyebrow>Outcome</Eyebrow>
              <p className="text-lg leading-relaxed text-muted-foreground">{p.outcome}</p>
            </section>
          </FadeUp>
        </div>

        {/* Next Project Footer */}
        <div className="container-site max-w-5xl mx-auto mt-24 border-t border-border pt-12 pb-16">
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
      </article>
    </Page>
  );
}
