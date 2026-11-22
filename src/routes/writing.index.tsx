import { useState, useMemo } from "react";
import { ArticleListSkeleton } from "@/components/site/Skeletons";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, PageIntro } from "@/components/site/Layout";
import { FadeUp } from "@/components/motion/FadeUp";
import { formatDate, getArticles, type Article } from "@/content";
import { Search, Sparkles, BookOpen, Clock, Tag } from "lucide-react";

export const Route = createFileRoute("/writing/")({
  loader: async () => {
    return { articles: await getArticles() };
  },
  head: () => ({
    meta: [
      { title: "Writing & Blog — Sule Malik" },
      {
        name: "description",
        content:
          "Long-form essays on software architecture, design engineering, product thinking, and building with distributed teams by Sule Malik.",
      },
      { property: "og:title", content: "Writing & Blog — Sule Malik" },
      {
        property: "og:description",
        content:
          "Long-form essays on software architecture, design engineering, product thinking, and building with distributed teams by Sule Malik.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Writing,
  pendingComponent: ArticleListSkeleton,
});

function Writing() {
  const { articles } = Route.useLoaderData();
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Unique topics
  const topics = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => {
      if (a.topic) set.add(a.topic);
    });
    return ["All", ...Array.from(set)];
  }, [articles]);

  // Filtered articles
  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesTopic = selectedTopic === "All" || a.topic === selectedTopic;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.topic.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q));
      return matchesTopic && matchesQuery;
    });
  }, [articles, selectedTopic, searchQuery]);

  // Featured article (only when no active search and All is selected)
  const featured = useMemo(() => {
    if (selectedTopic !== "All" || searchQuery.trim()) return null;
    return articles.find((a) => a.featured) || articles[0];
  }, [articles, selectedTopic, searchQuery]);

  // Remaining articles excluding featured in hero
  const remaining = useMemo(() => {
    if (!featured) return filtered;
    return filtered.filter((a) => a.slug !== featured.slug);
  }, [filtered, featured]);

  return (
    <Page>
      <PageIntro
        eyebrow="Writing & Essays"
        title="Notes on architecture, product craft & engineering leadership."
      >
        Long-form thinking on building resilient digital products, crafting high-fidelity design systems, and scaling distributed engineering teams.
      </PageIntro>

      <div className="container-site pb-24">
        {/* Search & Topic Filters Bar */}
        <div className="mb-12 space-y-6 border-b border-border/70 pb-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            {/* Topic Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {topics.map((t) => {
                const isSelected = selectedTopic === t;
                const count = t === "All" ? articles.length : articles.filter((a) => a.topic === t).length;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTopic(t)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? "bg-foreground text-background font-medium shadow-sm"
                        : "border border-border/70 bg-card/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    <span>{t}</span>
                    <span className={`text-[10px] ${isSelected ? "text-background/70" : "text-muted-foreground/70"}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Instant Search Bar */}
            <div className="relative min-w-[240px] sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden />
              <input
                type="text"
                placeholder="Search essays, topics, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border/80 bg-background/80 pl-9 pr-4 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
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
          </div>
        </div>

        {/* Featured Essay Spotlight (Hero Card) */}
        {featured && (
          <FadeUp>
            <div className="mb-14">
              <Link
                to="/writing/$slug"
                params={{ slug: featured.slug }}
                className="group relative block rounded-3xl border border-border/80 bg-card/30 p-7 sm:p-10 md:p-12 transition-all hover:bg-card/60 hover:border-border hover:shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-mono font-medium text-primary">
                      <Sparkles className="size-3" />
                      Featured Essay
                    </span>
                    <span className="inline-flex items-center rounded-full border border-border/80 bg-muted/30 px-2.5 py-0.5 text-xs font-mono text-muted-foreground">
                      {featured.topic}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                    <span>{formatDate(featured.date)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {featured.readingTime} read
                    </span>
                  </div>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground group-hover:text-primary transition-colors leading-[1.12]">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
                  {featured.excerpt}
                </p>

                {featured.tags && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded border border-border/50 bg-muted/30 px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                      >
                        <Tag className="size-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  <span>Read essay</span>
                  <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </div>
              </Link>
            </div>
          </FadeUp>
        )}

        {/* Article Grid / List */}
        {remaining.length > 0 ? (
          <div className="divide-y divide-border/60 border-y border-border/70">
            {remaining.map((a, idx) => (
              <FadeUp key={a.slug} delay={0.04 * idx}>
                <Link
                  to="/writing/$slug"
                  params={{ slug: a.slug }}
                  className="group grid gap-4 py-8 sm:py-10 px-3 -mx-3 rounded-2xl transition-colors duration-200 hover:bg-card/40 md:grid-cols-[11rem_1fr_auto] md:items-baseline"
                >
                  {/* Date & Metadata */}
                  <div className="space-y-1">
                    <span className="block text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                      {formatDate(a.date)}
                    </span>
                    <span className="inline-flex items-center rounded border border-border/50 bg-muted/40 px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
                      {a.topic}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                      {a.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {a.excerpt}
                    </p>

                    {a.tags && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {a.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono text-muted-foreground/80 bg-muted/30 rounded px-1.5 py-0.5 border border-border/40"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Reading Time & Arrow */}
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors md:pt-1">
                    <Clock className="size-3" />
                    <span>{a.readingTime}</span>
                    <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto size-8 text-muted-foreground/50 mb-3" />
            <h3 className="font-display text-xl font-medium text-foreground">No articles found</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
              No essays match your current filter query "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedTopic("All");
              }}
              className="mt-5 inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-mono text-foreground hover:bg-card transition-colors cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Editorial Discussion & Subscription Card */}
        <div className="mt-20 rounded-3xl border border-border/70 bg-muted/20 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Engineering Dialogue
            </span>
            <h4 className="mt-2 font-display text-2xl font-medium text-foreground">
              Have thoughts or feedback on these ideas?
            </h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              I frequently write about frontend architecture, mobile mechanics, and software craftsmanship. Drop a message or connect on LinkedIn.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              Start a conversation →
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
}
