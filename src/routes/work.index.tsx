import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Page, Eyebrow } from "@/components/site/Layout";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { ProjectListSkeleton } from "@/components/site/Skeletons";
import { FadeUp } from "@/components/motion/FadeUp";
import { cinematicEase } from "@/components/motion/variants";
import { getProjects, getSite, type Project } from "@/content";
import { trackEvent } from "@/lib/analytics/posthog";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowUpDown,
  Search,
  LayoutGrid,
  Rows3,
  Gauge,
  Zap,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/work/")({
  loader: async () => {
    const [projects, site] = await Promise.all([getProjects(), getSite()]);
    return { projects, site };
  },
  head: () => ({
    meta: [
      { title: "Selected Work & Systems — Sule Malik" },
      {
        name: "description",
        content:
          "Curated production systems, cross-platform mobile apps, and e-commerce platforms engineered by Sule Malik with architectural rigor and product thinking.",
      },
      { property: "og:title", content: "Selected Work & Systems — Sule Malik" },
      {
        property: "og:description",
        content:
          "Curated production systems, cross-platform mobile apps, and e-commerce platforms engineered by Sule Malik.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.sulemalik.com/work" },
      { property: "og:image", content: "https://www.sulemalik.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Selected Work & Systems — Sule Malik" },
      {
        name: "twitter:description",
        content:
          "Curated production systems, cross-platform mobile apps, and e-commerce platforms engineered by Sule Malik.",
      },
      { name: "twitter:image", content: "https://www.sulemalik.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.sulemalik.com/work" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": "https://www.sulemalik.com/work#collection",
          url: "https://www.sulemalik.com/work",
          name: "Selected Work & Systems — Sule Malik",
          description:
            "Curated production systems, cross-platform mobile apps, and e-commerce platforms engineered by Sule Malik with architectural rigor and product thinking.",
          author: {
            "@type": "Person",
            "@id": "https://www.sulemalik.com/#person",
            name: "Sule Malik",
          },
        }),
      },
    ],
  }),
  component: Work,
  pendingComponent: ProjectListSkeleton,
});

type DomainCategory = "all" | "mobile" | "saas" | "commerce" | "fintech";

const DOMAIN_FILTERS: { id: DomainCategory; label: string }[] = [
  { id: "all", label: "All Systems" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "saas", label: "SaaS & Productivity" },
  { id: "commerce", label: "E-Commerce" },
  { id: "fintech", label: "Fintech & Analytics" },
];

function matchesDomain(project: Project, domain: DomainCategory): boolean {
  if (domain === "all") return true;
  const cat = (project.category || "").toLowerCase();
  const stack = (project.stack || []).map((s) => s.toLowerCase());

  switch (domain) {
    case "mobile":
      return (
        cat.includes("mobile") ||
        stack.includes("react native") ||
        stack.includes("expo")
      );
    case "saas":
      return (
        cat.includes("saas") ||
        cat.includes("lms") ||
        cat.includes("productivity") ||
        cat.includes("booking")
      );
    case "commerce":
      return (
        cat.includes("commerce") ||
        cat.includes("restaurant") ||
        cat.includes("ordering") ||
        cat.includes("retail")
      );
    case "fintech":
      return (
        cat.includes("fintech") ||
        cat.includes("trade") ||
        cat.includes("analytics") ||
        cat.includes("prediction")
      );
    default:
      return true;
  }
}

function Work() {
  const { projects, site } = Route.useLoaderData();
  const shouldReduceMotion = useReducedMotion();

  const [activeDomain, setActiveDomain] = useState<DomainCategory>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"editorial" | "grid">("editorial");
  const [sortBy, setSortBy] = useState<"curated" | "year" | "name">("curated");

  // Extract core technology tags across projects with counts
  const tagCounts = useMemo(() => {
    const map = new Map<string, number>();
    (projects || []).forEach((p) => {
      (p.stack || []).forEach((tech) => {
        map.set(tech, (map.get(tech) || 0) + 1);
      });
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [projects]);

  // Combined filtering: Domain + Tag + Search + Reordering
  const filteredProjects = useMemo(() => {
    const list = (projects || []).filter((p) => {
      // Domain filter
      if (!matchesDomain(p, activeDomain)) return false;

      // Technology tag filter
      if (selectedTag && !(p.stack || []).includes(selectedTag)) return false;

      // Search query filter (title, summary, category, stack)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = (p.title || "").toLowerCase().includes(q);
        const inSummary = (p.summary || "").toLowerCase().includes(q);
        const inCategory = (p.category || "").toLowerCase().includes(q);
        const inStack = (p.stack || []).some((tech) => tech.toLowerCase().includes(q));
        if (!inTitle && !inSummary && !inCategory && !inStack) return false;
      }

      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === "year") {
        return parseInt(b.year) - parseInt(a.year) || (a.order ?? 999) - (b.order ?? 999);
      }
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }
      // default: curated (by order)
      return (a.order ?? 999) - (b.order ?? 999);
    });
  }, [projects, activeDomain, selectedTag, searchQuery, sortBy]);

  // Flagship spotlight project (when no filter is active, respects order)
  const flagshipProject = useMemo(() => {
    const sorted = [...projects].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    return sorted.find((p) => p.featured) || sorted[0];
  }, [projects]);

  const hasActiveFilters =
    activeDomain !== "all" || selectedTag !== null || searchQuery.trim() !== "" || sortBy !== "curated";

  const handleResetFilters = () => {
    setActiveDomain("all");
    setSelectedTag(null);
    setSearchQuery("");
    setSortBy("curated");
  };

  return (
    <Page>
      {/* ================= EDITORIAL HERO & POSITIONING ================= */}
      <section className="container-site pt-12 pb-14 sm:pt-16 sm:pb-20">
        <FadeUp>
          <Eyebrow>Selected Systems / Portfolio</Eyebrow>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] leading-[1.08] tracking-tight text-foreground">
                Architected for resilience, crafted for{" "}
                <em className="text-primary italic">growth.</em>
              </h1>
              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
                A selection of production-grade platforms, cross-platform mobile apps, and scalable digital commerce architectures I've engineered — bridging technical fidelity with measurable business outcomes.
              </p>
            </div>

            {/* Impact Metric Proof-Points Bar */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:pl-6">
              <div className="rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-primary">
                  <TrendingUp className="size-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Deployments
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl sm:text-3xl font-medium text-foreground">
                  10+ Systems
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Live across web & mobile
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-primary">
                  <Zap className="size-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Latency Target
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl sm:text-3xl font-medium text-foreground">
                  &lt; 100ms
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Sub-second interactions
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-primary">
                  <Gauge className="size-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Interaction
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl sm:text-3xl font-medium text-foreground">
                  60fps
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Fluid gestures & animations
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="size-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Execution
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl sm:text-3xl font-medium text-foreground">
                  End-to-End
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Concept to production rollout
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ================= FLAGSHIP SHOWCASE SPOTLIGHT ================= */}
      {!hasActiveFilters && flagshipProject && (
        <section className="container-site pb-14 sm:pb-20">
          <FadeUp delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-6 sm:p-10 lg:p-12 shadow-xl backdrop-blur-sm">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
                      <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                      Featured Architecture
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {flagshipProject.year} · {flagshipProject.category}
                    </span>
                    {flagshipProject.metric && (
                      <span className="inline-flex items-center rounded-full border border-foreground/15 bg-background/60 px-3 py-0.5 text-xs font-mono font-medium text-foreground">
                        {flagshipProject.metric.value} {flagshipProject.metric.label}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
                    {flagshipProject.title}
                  </h2>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
                    {flagshipProject.summary}
                  </p>

                  <div className="mt-6 space-y-2 border-l-2 border-primary/40 pl-4 py-1 text-sm text-foreground/80">
                    <p className="font-medium text-foreground">Key Technical Challenge:</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {flagshipProject.challenge}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {(flagshipProject.stack || []).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border/80 bg-background/50 px-3 py-1 text-xs text-foreground/85"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      to="/work/$slug"
                      params={{ slug: flagshipProject.slug }}
                      className="btn-solid group"
                    >
                      <span>Explore Case Study</span>
                      <span
                        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </Link>
                    {flagshipProject.url && (
                      <a
                        href={flagshipProject.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={() =>
                          trackEvent("outbound_project_clicked", {
                            project: flagshipProject.title,
                            url: flagshipProject.url,
                            section: "flagship_hero",
                          })
                        }
                        className="btn-outline inline-flex items-center gap-1.5 group"
                        aria-label={`Visit live website for ${flagshipProject.title} (opens in a new tab)`}
                      >
                        <span>Live website</span>
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Flagship Visual */}
                <div className="relative group">
                  <div className="overflow-hidden rounded-2xl border border-border/80 shadow-2xl transition-all duration-300 group-hover:border-primary/40">
                    <ProjectVisual project={flagshipProject} eager className="aspect-[16/10] sm:aspect-[4/3]" />
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </section>
      )}

      {/* ================= SMART FILTER & VIEW CONTROLLER HUB ================= */}
      <section className="sticky top-16 z-20 border-y border-border bg-background/90 backdrop-blur-md py-4 transition-colors">
        <div className="container-site">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Domain Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {DOMAIN_FILTERS.map((domain) => {
                const isActive = activeDomain === domain.id;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => {
                      setActiveDomain(domain.id);
                      trackEvent("project_filter_applied", { domain: domain.id });
                    }}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-foreground text-background shadow-sm"
                        : "border border-border/70 bg-card/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {domain.label}
                  </button>
                );
              })}
            </div>

            {/* Right Controls: Search, View Mode & Reset */}
            <div className="flex items-center gap-2.5">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name, tech..."
                  className="w-full rounded-full border border-border/80 bg-card/40 pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center rounded-full border border-border/80 bg-card/40 p-1">
                <button
                  type="button"
                  title="Editorial Split View"
                  onClick={() => setViewMode("editorial")}
                  className={`rounded-full p-1.5 transition-colors cursor-pointer ${
                    viewMode === "editorial"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Editorial Split View"
                >
                  <Rows3 className="size-3.5" />
                </button>
                <button
                  type="button"
                  title="Visual Grid View"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-full p-1.5 transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Visual Grid View"
                >
                  <LayoutGrid className="size-3.5" />
                </button>
              </div>

              {/* Sort Order Selector */}
              <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-card/40 px-2.5 py-1 text-xs text-muted-foreground">
                <ArrowUpDown className="size-3 text-muted-foreground shrink-0" />
                <label htmlFor="sort-projects" className="sr-only">
                  Sort projects
                </label>
                <select
                  id="sort-projects"
                  value={sortBy}
                  onChange={(e) => {
                    const nextSort = e.target.value as "curated" | "year" | "name";
                    setSortBy(nextSort);
                    trackEvent("project_filter_applied", { sort_by: nextSort });
                  }}
                  className="bg-transparent text-xs text-foreground focus:outline-none cursor-pointer pr-1"
                >
                  <option value="curated" className="bg-card text-foreground">
                    Curated
                  </option>
                  <option value="year" className="bg-card text-foreground">
                    Newest
                  </option>
                  <option value="name" className="bg-card text-foreground">
                    A – Z
                  </option>
                </select>
              </div>

              {/* Reset button if filtered */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  title="Reset all filters"
                  className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-card/40 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <RotateCcw className="size-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Technology Chips Sub-row */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-border/40 pt-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mr-1">
              Stack:
            </span>
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono transition-colors cursor-pointer ${
                selectedTag === null
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({projects.length})
            </button>
            {tagCounts.slice(0, 8).map(([tech, count]) => {
              const isSelected = selectedTag === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setSelectedTag(isSelected ? null : tech)}
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground font-medium"
                      : "border border-border/60 bg-card/20 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {tech} <span className="opacity-70">({count})</span>
                </button>
              );
            })}
            <span className="ml-auto text-[11px] font-mono text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length}
            </span>
          </div>
        </div>
      </section>

      {/* ================= SYSTEMS DIRECTORY LISTING ================= */}
      <section className="container-site py-16 sm:py-24">
        {filteredProjects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-12 text-center max-w-md mx-auto">
            <p className="font-display text-xl text-foreground">No systems match your criteria.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your domain filter, technology chip, or search query.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 btn-outline inline-flex"
            >
              Reset all filters
            </button>
          </div>
        ) : viewMode === "editorial" ? (
          /* ---------------- EDITORIAL SPLIT VIEW ---------------- */
          <div className="space-y-20 sm:space-y-28">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, i) => (
                <motion.article
                  key={p.slug}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: cinematicEase }}
                  className="group"
                >
                  <div
                    className={`grid items-center gap-10 border-t border-border/80 pt-12 sm:pt-16 lg:grid-cols-2 ${
                      i % 2 === 1 ? "lg:grid-flow-dense" : ""
                    }`}
                  >
                    {/* Visual Column */}
                    <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                      <Link
                        to="/work/$slug"
                        params={{ slug: p.slug }}
                        className="block overflow-hidden rounded-2xl border border-border/80 shadow-lg transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-2xl"
                      >
                        <ProjectVisual project={p} />
                      </Link>
                    </div>

                    {/* Editorial Details Column */}
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                            {p.year}
                          </span>
                          <span className="text-muted-foreground/40">·</span>
                          <span className="rounded-full border border-border bg-card/60 px-2.5 py-0.5 text-xs font-mono text-foreground/80">
                            {p.category}
                          </span>
                        </div>
                        {p.metric && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-mono font-medium text-primary">
                            <span className="size-1 rounded-full bg-primary" />
                            {p.metric.value} {p.metric.label}
                          </span>
                        )}
                      </div>

                      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                        <Link to="/work/$slug" params={{ slug: p.slug }}>
                          {p.title}
                        </Link>
                      </h2>

                      <p className="max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
                        {p.summary}
                      </p>

                      {/* Approach snapshot snippet */}
                      {p.approach && p.approach.length > 0 && (
                        <div className="border-l-2 border-border/80 pl-4 py-1 text-xs sm:text-sm text-foreground/80 font-sans space-y-1">
                          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                            Architectural Solution
                          </p>
                          <p className="text-muted-foreground line-clamp-2">
                            {p.approach[0]}
                          </p>
                        </div>
                      )}

                      {/* Technology Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {(p.stack || []).map((t) => (
                          <span
                            key={t}
                            className={`rounded-full px-3 py-1 text-xs font-mono transition-colors ${
                              selectedTag === t
                                ? "bg-primary text-primary-foreground font-medium"
                                : "bg-card/70 border border-border/70 text-foreground/80"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Link CTA */}
                      <div className="flex flex-wrap items-center gap-4 pt-3">
                        <Link
                          to="/work/$slug"
                          params={{ slug: p.slug }}
                          className="link-underline inline-flex items-center gap-2 font-medium text-foreground group-hover:text-primary transition-colors text-sm"
                        >
                          <span>Read detailed case study</span>
                          <span
                            className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                            aria-hidden
                          >
                            →
                          </span>
                        </Link>
                        {p.url && (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            onClick={() =>
                              trackEvent("outbound_project_clicked", {
                                project: p.title,
                                url: p.url,
                                view_mode: "editorial",
                              })
                            }
                            className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors py-1"
                            aria-label={`Visit live site for ${p.title} (opens in a new tab)`}
                          >
                            <span>Live site</span>
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        )}
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors py-1"
                            aria-label={`View source code for ${p.title} on GitHub (opens in a new tab)`}
                          >
                            <span>Code</span>
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* ---------------- VISUAL GRID VIEW ---------------- */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => (
                <motion.article
                  key={p.slug}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: cinematicEase }}
                  className="group flex flex-col justify-between rounded-3xl border border-border/80 bg-card/30 p-6 sm:p-7 shadow-sm transition-all duration-300 hover:bg-card/60 hover:border-border hover:shadow-xl"
                >
                  <div>
                    <Link
                      to="/work/$slug"
                      params={{ slug: p.slug }}
                      className="block overflow-hidden rounded-2xl border border-border/70 bg-muted/20"
                    >
                      <ProjectVisual project={p} className="aspect-[16/10]" />
                    </Link>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs uppercase text-muted-foreground">
                          {p.year}
                        </span>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {p.category}
                        </span>
                      </div>
                      {p.metric && (
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-mono font-medium text-primary">
                          {p.metric.value}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-3 font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                      <Link to="/work/$slug" params={{ slug: p.slug }}>
                        {p.title}
                      </Link>
                    </h2>

                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {p.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 max-w-[70%]">
                      {(p.stack || []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-card/90 border border-border/60 px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                      {(p.stack || []).length > 3 && (
                        <span className="text-[10px] font-mono text-muted-foreground py-0.5">
                          +{(p.stack || []).length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          onClick={() =>
                            trackEvent("outbound_project_clicked", {
                              project: p.title,
                              url: p.url,
                              view_mode: "grid",
                            })
                          }
                          className="inline-flex items-center gap-0.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`Visit live site for ${p.title} (opens in a new tab)`}
                        >
                          <span>Live</span>
                          <ArrowUpRight className="size-3" />
                        </a>
                      )}
                      <Link
                        to="/work/$slug"
                        params={{ slug: p.slug }}
                        className="inline-flex items-center gap-1 text-xs font-medium text-foreground group-hover:text-primary transition-colors"
                      >
                        <span>Study</span>
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* ================= ARCHITECTURAL RIGOR CALLOUT BANNER ================= */}
      <section className="border-y border-border bg-card/30 py-16 sm:py-20">
        <div className="container-site max-w-4xl text-center mx-auto">
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              Engineering Conviction
            </span>
            <blockquote className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-foreground leading-snug">
              "Great digital products aren't just visually refined — they are{" "}
              <em className="text-primary italic">resilient in production</em>, predictable under load, and built with explicit empathy for the user."
            </blockquote>
            <p className="mt-5 text-sm sm:text-base text-muted-foreground">
              Every system in this portfolio reflects end-to-end craftsmanship: from type-safe database schemas and optimistic client state to 60fps gesture physics and clean observability.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ================= CLOSING CONSULTATION & INQUIRY SUITE ================= */}
      <section className="container-site py-20 sm:py-28">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl border border-border/90 bg-gradient-to-b from-card/60 via-card/30 to-background p-8 sm:p-14 text-center">
            <Eyebrow>Let's Collaborate</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground max-w-2xl mx-auto">
              Have a product to build, scale, or modernize?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground">
              I am open to select freelance engagements, contract engineering, and high-impact full-time roles with forward-thinking product teams worldwide.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="btn-solid group">
                <span>Start a conversation</span>
                <span
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
              <Link to="/about" className="btn-outline group">
                <span>Read my background & principles</span>
                <span
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </Page>
  );
}
