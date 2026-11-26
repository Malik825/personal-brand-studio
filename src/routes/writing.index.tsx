import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Page, Eyebrow } from "@/components/site/Layout";
import { ArticleListSkeleton } from "@/components/site/Skeletons";
import { FadeUp } from "@/components/motion/FadeUp";
import { cinematicEase } from "@/components/motion/variants";
import { formatDate, getArticles, type Article } from "@/content";
import { getOptimizedImageUrl, getSanitySrcSet } from "@/lib/images";
import {
  Search,
  Sparkles,
  BookOpen,
  Clock,
  Tag,
  ArrowRight,
  FileText,
  Brain,
  Layers,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/writing/")({
  loader: async () => {
    return { articles: await getArticles() };
  },
  head: () => ({
    meta: [
      { title: "Writing & Field Notes — Sule Malik" },
      {
        name: "description",
        content:
          "Long-form essays on software architecture, design engineering, product thinking, and building with distributed teams by Sule Malik.",
      },
      { property: "og:title", content: "Writing & Field Notes — Sule Malik" },
      {
        property: "og:description",
        content:
          "Long-form essays on software architecture, design engineering, product thinking, and building with distributed teams by Sule Malik.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sulemalik.com/writing" },
      { property: "og:image", content: "https://sulemalik.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Writing & Field Notes — Sule Malik" },
      {
        name: "twitter:description",
        content:
          "Long-form essays on software architecture, design engineering, product thinking, and building with distributed teams by Sule Malik.",
      },
      { name: "twitter:image", content: "https://sulemalik.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sulemalik.com/writing" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": "https://sulemalik.com/writing#collection",
          url: "https://sulemalik.com/writing",
          name: "Writing & Field Notes — Sule Malik",
          description:
            "Long-form essays on software architecture, design engineering, product thinking, and building with distributed teams by Sule Malik.",
          author: {
            "@type": "Person",
            "@id": "https://sulemalik.com/#person",
            name: "Sule Malik",
          },
        }),
      },
    ],
  }),
  component: Writing,
  pendingComponent: ArticleListSkeleton,
});

function Writing() {
  const { articles } = Route.useLoaderData();
  const shouldReduceMotion = useReducedMotion();

  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Unique topics with counts
  const topics = useMemo(() => {
    const map = new Map<string, number>();
    (articles || []).forEach((a) => {
      if (a.topic) {
        map.set(a.topic, (map.get(a.topic) || 0) + 1);
      }
    });
    return [
      { name: "All", count: (articles || []).length },
      ...Array.from(map.entries()).map(([name, count]) => ({ name, count })),
    ];
  }, [articles]);

  // Total reading time calculation
  const totalMinutes = useMemo(() => {
    return (articles || []).reduce((acc, a) => {
      const mins = parseInt(a.readingTime) || 6;
      return acc + (isNaN(mins) ? 6 : mins);
    }, 0);
  }, [articles]);

  // Filtered articles
  const filtered = useMemo(() => {
    return (articles || []).filter((a) => {
      const matchesTopic = selectedTopic === "All" || a.topic === selectedTopic;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        (a.title || "").toLowerCase().includes(q) ||
        (a.excerpt || "").toLowerCase().includes(q) ||
        (a.topic || "").toLowerCase().includes(q) ||
        (Array.isArray(a.tags) && a.tags.some((t) => t.toLowerCase().includes(q)));
      return matchesTopic && matchesQuery;
    });
  }, [articles, selectedTopic, searchQuery]);

  // Featured article (only when no active search and All is selected)
  const featured = useMemo(() => {
    if (selectedTopic !== "All" || searchQuery.trim() || !(articles && articles.length > 0)) return null;
    return articles.find((a) => a.featured) || articles[0];
  }, [articles, selectedTopic, searchQuery]);

  // Remaining articles excluding featured in hero
  const remaining = useMemo(() => {
    if (!featured) return filtered;
    return filtered.filter((a) => a.slug !== featured.slug);
  }, [filtered, featured]);

  const hasActiveFilters = selectedTopic !== "All" || searchQuery.trim() !== "";

  const handleResetFilters = () => {
    setSelectedTopic("All");
    setSearchQuery("");
  };

  return (
    <Page>
      {/* ================= EDITORIAL HERO & POSITIONING ================= */}
      <section className="container-site pt-12 pb-14 sm:pt-16 sm:pb-20">
        <FadeUp>
          <Eyebrow>Writing & Field Notes / Essays</Eyebrow>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] leading-[1.08] tracking-tight text-foreground">
                Thinking on architecture, product craft &{" "}
                <em className="text-primary italic">systems.</em>
              </h1>
              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
                Long-form technical essays, architectural post-mortems, and practical field notes on engineering resilient digital products, high-fps mobile experiences, and scaling distributed teams.
              </p>
            </div>

            {/* Publication Proof-Points Matrix */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:pl-6">
              <div className="rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-primary">
                  <FileText className="size-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Archive
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl sm:text-3xl font-medium text-foreground">
                  {articles.length} Essays
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Deep technical dives
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="size-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Reading Time
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl sm:text-3xl font-medium text-foreground">
                  ~{totalMinutes} min
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Total published wisdom
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-primary">
                  <Layers className="size-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Domains
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl sm:text-3xl font-medium text-foreground">
                  {topics.length - 1} Tracks
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Arch, Mobile & Product
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="size-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Foundation
                  </span>
                </div>
                <p className="mt-2 font-display text-2xl sm:text-3xl font-medium text-foreground">
                  Production
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Tested in live software
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ================= FEATURED ESSAY COVER SPOTLIGHT ================= */}
      {featured && (
        <section className="container-site pb-14 sm:pb-20">
          <FadeUp delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-6 sm:p-10 lg:p-12 shadow-xl backdrop-blur-sm">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
                      <Sparkles className="size-3" />
                      Featured Publication
                    </span>
                    <span className="rounded-full border border-border/80 bg-background/50 px-2.5 py-0.5 text-xs font-mono text-muted-foreground">
                      {featured.topic}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {formatDate(featured.date)} · {featured.readingTime} read
                    </span>
                  </div>

                  <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground transition-colors hover:text-primary">
                    <Link to="/writing/$slug" params={{ slug: featured.slug }}>
                      {featured.title}
                    </Link>
                  </h2>

                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
                    {featured.excerpt}
                  </p>

                  {/* Takeaways snippet */}
                  {featured.takeaways && featured.takeaways.length > 0 && (
                    <div className="mt-6 space-y-2 border-l-2 border-primary/40 pl-4 py-1 text-sm">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-primary font-medium">
                        Core Takeaway
                      </p>
                      <p className="text-foreground/85 text-xs sm:text-sm">
                        "{featured.takeaways[0]}"
                      </p>
                    </div>
                  )}

                  {Array.isArray(featured.tags) && featured.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/40 px-3 py-0.5 text-[11px] font-mono text-muted-foreground"
                        >
                          <Tag className="size-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 flex items-center gap-4">
                    <Link
                      to="/writing/$slug"
                      params={{ slug: featured.slug }}
                      className="btn-solid group"
                    >
                      <span>Read Full Essay</span>
                      <span
                        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Cover Image */}
                {featured.image && (
                  <div className="relative group">
                    <Link
                      to="/writing/$slug"
                      params={{ slug: featured.slug }}
                      className="block overflow-hidden rounded-2xl border border-border/80 shadow-2xl aspect-[16/10] bg-muted/20"
                    >
                      <img
                        src={getOptimizedImageUrl(featured.image, 1000, 75)}
                        srcSet={getSanitySrcSet(featured.image)}
                        sizes="(max-width: 1024px) 100vw, 600px"
                        alt={featured.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="eager"
                        decoding="async"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </FadeUp>
        </section>
      )}

      {/* ================= STICKY TOPIC TABS & SEARCH CONTROLLER ================= */}
      <section className="sticky top-16 z-20 border-y border-border bg-background/90 backdrop-blur-md py-4 transition-colors">
        <div className="container-site">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Topic Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {topics.map((t) => {
                const isSelected = selectedTopic === t.name;
                return (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setSelectedTopic(t.name)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-mono transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-foreground text-background font-medium shadow-sm"
                        : "border border-border/70 bg-card/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    <span>{t.name}</span>
                    <span
                      className={`text-[10px] ${
                        isSelected ? "text-background/70" : "text-muted-foreground/70"
                      }`}
                    >
                      ({t.count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Instant Search Bar & Reset */}
            <div className="flex items-center gap-2">
              <div className="relative min-w-[200px] sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search essays, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-border/80 bg-card/40 pl-9 pr-7 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  title="Reset filters"
                  className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-card/40 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  <RotateCcw className="size-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ARTICLES DIRECTORY ================= */}
      <section className="container-site py-16 sm:py-24">
        {remaining.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-12 text-center max-w-md mx-auto">
            <BookOpen className="mx-auto size-8 text-muted-foreground/60 mb-3" />
            <h3 className="font-display text-xl text-foreground">No essays found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No articles match your current search query "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 btn-outline inline-flex"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border/60 border-y border-border/80">
            <AnimatePresence mode="popLayout">
              {remaining.map((a, idx) => (
                <motion.article
                  key={a.slug}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, delay: 0.04 * idx, ease: cinematicEase }}
                >
                  <Link
                    to="/writing/$slug"
                    params={{ slug: a.slug }}
                    className="group grid gap-6 py-9 sm:py-11 px-3 -mx-3 rounded-2xl transition-all duration-200 hover:bg-card/40 md:grid-cols-[11rem_1fr_auto] md:items-start"
                  >
                    {/* Column 1: Date, Topic & Thumbnail */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <span className="block text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                          {formatDate(a.date)}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-border/70 bg-card/60 px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground">
                          {a.topic}
                        </span>
                      </div>
                      {a.image && (
                        <div className="relative overflow-hidden rounded-xl border border-border/60 aspect-[16/10] bg-muted/20 w-32 md:w-full">
                          <img
                            src={getOptimizedImageUrl(a.image, 600, 75)}
                            srcSet={getSanitySrcSet(a.image)}
                            sizes="(max-width: 768px) 128px, 400px"
                            alt={a.title}
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                    </div>

                    {/* Column 2: Title, Excerpt & Tags */}
                    <div className="space-y-2.5">
                      <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                        {a.title}
                      </h3>
                      <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                        {a.excerpt}
                      </p>

                      {Array.isArray(a.tags) && a.tags.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {a.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-mono text-muted-foreground bg-muted/30 rounded px-2 py-0.5 border border-border/40"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Column 3: Reading Time & Animated Arrow */}
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors md:pt-1">
                      <Clock className="size-3" />
                      <span>{a.readingTime}</span>
                      <span
                        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                        aria-hidden
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* ================= ARCHITECTURAL DIALOGUE & AI ASSISTANT SUITE ================= */}
      <section className="container-site pb-24 sm:pb-32">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card/60 via-card/30 to-background p-8 sm:p-12 md:p-14 shadow-lg backdrop-blur-sm">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
                  Interactive Knowledge Base
                </span>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-foreground">
                  Interrogate these architectural patterns with the Portfolio Assistant.
                </h3>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl">
                  The integrated AI assistant is grounded in Sule Malik's complete writing catalog, codebase implementations, and engineering case studies. Ask it specific technical questions about 60fps gesture setups, optimistic UI rollbacks, or distributed team coordination.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link to="/ask" className="btn-solid group">
                    <Brain className="size-4 mr-2" />
                    <span>Ask AI Assistant</span>
                    <span
                      className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                  <Link to="/contact" className="btn-outline group">
                    <span>Contact Sule Directly</span>
                    <span
                      className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>

              {/* Sample Prompts Card */}
              <div className="rounded-2xl border border-border/80 bg-background/60 p-6 space-y-3 backdrop-blur-sm">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Suggested Queries
                </p>
                <div className="space-y-2 text-xs font-mono">
                  <Link
                    to="/ask"
                    className="block rounded-lg border border-border/70 bg-card/60 p-2.5 text-foreground/80 hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    "How does Sule achieve 60fps gesture physics in React Native?"
                  </Link>
                  <Link
                    to="/ask"
                    className="block rounded-lg border border-border/70 bg-card/60 p-2.5 text-foreground/80 hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    "What is Sule's strategy for optimistic UI rollbacks under WebSocket load?"
                  </Link>
                  <Link
                    to="/ask"
                    className="block rounded-lg border border-border/70 bg-card/60 p-2.5 text-foreground/80 hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    "How does Sule manage asynchronous handover across time zones?"
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </Page>
  );
}
