import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, PageIntro } from "@/components/site/Layout";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { FadeUp } from "@/components/motion/FadeUp";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { getProjects } from "@/content";

export const Route = createFileRoute("/work/")({
  loader: async () => {
    return { projects: await getProjects() };
  },
  head: () => ({
    meta: [
      { title: "Work — Sule Malik" },
      {
        name: "description",
        content: "Selected case studies: CyLynk, Glovera, Urban Vault, A1TIPS, DerivConnect, Roam, and more.",
      },
      { property: "og:title", content: "Work — Sule Malik" },
      {
        property: "og:description",
        content: "Selected case studies: CyLynk, Glovera, Urban Vault, A1TIPS, DerivConnect, Roam, and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Work,
});

function Work() {
  const { projects } = Route.useLoaderData();

  return (
    <Page>
      <PageIntro eyebrow="Selected work" title="Products built for real businesses.">
        A selection of platforms I've engineered — from learning systems to e-commerce and mobile applications.
      </PageIntro>
      <section className="container-site space-y-24 pb-24">
        {projects.map((p, i) => (
          <FadeUp key={p.slug} delay={0.1}>
            <Link
              to="/work/$slug"
              params={{ slug: p.slug }}
              className="group grid items-center gap-10 border-t border-border pt-14 lg:grid-cols-2"
            >
              <div className={i % 2 ? "lg:order-2" : ""}>
                <ImageReveal delay={0.15}>
                  <div className="overflow-hidden rounded-xl border border-border shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:border-primary/30">
                    <ProjectVisual project={p} />
                  </div>
                </ImageReveal>
              </div>
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {p.year} · {p.category}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight transition-colors duration-200 group-hover:text-primary">
                  {p.title}
                </h2>
                <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary/80 px-3 py-1 text-xs text-foreground/80 font-normal"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-4">
                  <span className="link-underline inline-flex items-center gap-2 font-medium">
                    <span>Read case study</span>
                    <span
                      className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </FadeUp>
        ))}
      </section>
    </Page>
  );
}
