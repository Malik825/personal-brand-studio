import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Page, PageIntro } from "@/components/site/Layout";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { ProjectListSkeleton } from "@/components/site/Skeletons";
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
  pendingComponent: ProjectListSkeleton,
});

function Work() {
  const { projects } = Route.useLoaderData();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract core technology tags across projects with counts
  const tagCounts = useMemo(() => {
    const map = new Map<string, number>();
    projects.forEach((p) => {
      p.stack.forEach((tech) => {
        map.set(tech, (map.get(tech) || 0) + 1);
      });
    });
    // Filter tags that appear in at least 1 project, sort by frequency
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [projects]);

  // Filter projects by selected technology
  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((p) => p.stack.includes(selectedTag));
  }, [projects, selectedTag]);

  return (
    <Page>
      <PageIntro eyebrow="Selected work" title="Products built for real businesses.">
        A selection of platforms I've engineered — from learning systems to e-commerce and mobile applications.
      </PageIntro>

      {/* Filterable Capability Matrix */}
      <section className="container-site pb-8">
        <div className="flex flex-col gap-3 border-y border-border py-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
            <span>Filter by technology</span>
            <span>
              Showing {filteredProjects.length} of {projects.length} projects
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedTag === null
                  ? "bg-foreground text-background"
                  : "border border-border bg-card/60 text-foreground/80 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              All ({projects.length})
            </button>
            {tagCounts.slice(0, 10).map(([tech, count]) => (
              <button
                key={tech}
                type="button"
                onClick={() => setSelectedTag(selectedTag === tech ? null : tech)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                  selectedTag === tech
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card/60 text-foreground/80 hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {tech} ({count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="container-site space-y-24 pb-24">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group grid items-center gap-10 border-t border-border pt-14 lg:grid-cols-2"
              >
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <ImageReveal delay={0.1}>
                    <div className="overflow-hidden rounded-xl border border-border transition-colors duration-300 group-hover:border-primary/40">
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
                        className={`rounded-full px-3 py-1 text-xs font-normal transition-colors ${
                          selectedTag === t
                            ? "bg-primary text-primary-foreground font-medium"
                            : "bg-secondary/80 text-foreground/80"
                        }`}
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
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </Page>
  );
}
