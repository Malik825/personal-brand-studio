import { useState } from "react";
import { ArticleSkeleton } from "@/components/site/Skeletons";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page } from "@/components/site/Layout";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { FadeUp } from "@/components/motion/FadeUp";
import { formatDate, getArticle, getArticles, getProject, site } from "@/content";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { getOptimizedImageUrl, getSanitySrcSet } from "@/lib/images";
import {
  Check,
  Copy,
  Share2,
  Tag,
  Clock,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Bookmark,
  ExternalLink,
  MessageSquare,
  ListTree,
  Quote,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export const Route = createFileRoute("/writing/$slug")({
  loader: async ({ params }) => {
    const [article, allArticles] = await Promise.all([
      getArticle(params.slug),
      getArticles(),
    ]);

    if (!article) throw notFound();

    const relatedProject = article.relatedProjectSlug
      ? await getProject(article.relatedProjectSlug)
      : null;

    const related = (allArticles || [])
      .filter((a) => a.slug !== article.slug)
      .slice(0, 2);

    return { article, related, relatedProject };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    const pageTitle = a?.seoTitle
      ? a.seoTitle.includes("Sule Malik")
        ? a.seoTitle
        : `${a.seoTitle} — Sule Malik`
      : `${a?.title} — Sule Malik`;
    const metaDescription = a?.seoDescription || a?.excerpt || "";
    const imageUrl = a?.image
      ? a.image.startsWith("http")
        ? a.image
        : `https://sulemalik.com${a.image}`
      : "https://sulemalik.com/og-image.png";

    return {
      meta: a
        ? [
            { title: pageTitle },
            { name: "description", content: metaDescription },
            { property: "og:title", content: pageTitle },
            { property: "og:description", content: metaDescription },
            { property: "og:type", content: "article" },
            { property: "og:url", content: `https://sulemalik.com/writing/${a.slug}` },
            { property: "og:image", content: imageUrl },
            { property: "og:image:alt", content: a.title },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: pageTitle },
            { name: "twitter:description", content: metaDescription },
            { name: "twitter:image", content: imageUrl },
            { name: "article:published_time", content: a.date },
            { name: "article:author", content: a.author?.name || "Sule Malik" },
            { name: "article:section", content: a.topic },
          ]
        : [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }],
      links: a ? [{ rel: "canonical", href: `https://sulemalik.com/writing/${a.slug}` }] : [],
      scripts: a
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": a.title,
                "description": metaDescription,
                "image": [imageUrl],
                "datePublished": a.date,
                "dateModified": a.date,
                "author": {
                  "@type": "Person",
                  "name": a.author?.name || "Sule Malik",
                  "url": "https://sulemalik.com",
                },
                "publisher": {
                  "@type": "Person",
                  "name": "Sule Malik",
                  "url": "https://sulemalik.com",
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://sulemalik.com/writing/${a.slug}`,
                },
              }),
            },
          ]
        : [],
    };
  },
  component: ArticlePage,
  pendingComponent: ArticleSkeleton,
});

function ArticlePage() {
  const { article: a, related, relatedProject } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);

  const wordCount = a.sections
    ? a.sections.reduce((acc, s) => acc + s.paragraphs.join(" ").split(/\s+/).length, 0)
    : (a.body || []).join(" ").split(/\s+/).length;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`"${a.title}" by @${site.name}`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Page>
      <ReadingProgress />

      <div className="container-site max-w-7xl pt-10 sm:pt-14 pb-24">
        {/* Mobile / Top Header Breadcrumb */}
        <div className="mb-8 flex items-center justify-between border-b border-border/50 pb-4">
          <Link
            to="/writing"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground group"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden />
            <span>Writing / Essays</span>
          </Link>
          <Link
            to="/writing"
            search={{ topic: a.topic }}
            className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-0.5 text-xs font-mono font-medium text-primary hover:bg-primary/20 hover:border-primary/40 transition-all cursor-pointer"
            title={`View all essays in ${a.topic}`}
          >
            {a.topic}
          </Link>
        </div>

        {/* 3-Column Editorial Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[14rem_1fr] xl:grid-cols-[15rem_minmax(0,1fr)_18rem] gap-10 xl:gap-14 items-start">
          
          {/* ================= LEFT STICKY RAIL (Metadata, Navigation, ToC) ================= */}
          <aside className="hidden lg:block sticky top-28 space-y-8 text-xs font-mono">
            {/* Author Capsule */}
            <div className="rounded-2xl border border-border/70 bg-card/40 p-4 space-y-3">
              <div className="flex items-center gap-2.5">
                {a.author?.image ? (
                  <img
                    src={getOptimizedImageUrl(a.author.image, 160, 80)}
                    alt={a.author.name}
                    className="size-8 rounded-full object-cover border border-primary/25 shadow-xs"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary font-bold text-[11px] border border-primary/20">
                    {a.author?.name ? a.author.name.slice(0, 2).toUpperCase() : "SM"}
                  </div>
                )}
                <div>
                  <p className="font-sans font-semibold text-foreground text-xs leading-none">
                    {a.author?.name || site.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {a.author?.role || site.role}
                  </p>
                </div>
              </div>
              <div className="space-y-1.5 border-t border-border/50 pt-2.5 text-[11px] text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Published:</span>
                  <span className="text-foreground">{formatDate(a.date)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Reading:</span>
                  <span className="text-foreground">{a.readingTime} read</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Volume:</span>
                  <span className="text-foreground">{wordCount} words</span>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            {a.sections && a.sections.length > 0 && (
              <div className="rounded-2xl border border-border/70 bg-card/30 p-4">
                <p className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-muted-foreground text-[10px] mb-3">
                  <ListTree className="size-3 text-primary" />
                  <span>Table of Contents</span>
                </p>
                <nav className="space-y-1.5">
                  {a.sections.map((sec, idx) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="group flex items-start gap-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="text-primary/70 shrink-0 mt-0.5">0{idx + 1}.</span>
                      <span className="line-clamp-2 leading-snug group-hover:underline underline-offset-4">
                        {sec.title}
                      </span>
                    </a>
                  ))}
                  {a.takeaways && a.takeaways.length > 0 && (
                    <a
                      href="#key-takeaways"
                      className="group flex items-start gap-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground border-t border-border/40 pt-2 mt-2"
                    >
                      <Sparkles className="size-3 text-primary shrink-0 mt-0.5" />
                      <span className="line-clamp-1 leading-snug group-hover:underline underline-offset-4">
                        Key Takeaways
                      </span>
                    </a>
                  )}
                </nav>
              </div>
            )}

            {/* Quick Share Pills */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold px-1">
                Share Essay
              </p>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center justify-between rounded-lg border border-border/70 bg-card/40 px-3 py-2 text-[11px] text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                    <span>{copied ? "Copied Link" : "Copy Link"}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">⌘C</span>
                </button>
                <button
                  type="button"
                  onClick={shareOnTwitter}
                  className="flex items-center justify-between rounded-lg border border-border/70 bg-card/40 px-3 py-2 text-[11px] text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                >
                  <span>Twitter / X</span>
                  <ArrowUpRight className="size-3 opacity-60" />
                </button>
                <button
                  type="button"
                  onClick={shareOnLinkedIn}
                  className="flex items-center justify-between rounded-lg border border-border/70 bg-card/40 px-3 py-2 text-[11px] text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="size-3 opacity-60" />
                </button>
              </div>
            </div>
          </aside>

          {/* ================= CENTER COLUMN (Main Editorial Body) ================= */}
          <article className="min-w-0 max-w-3xl">
            {/* Header Standfirst & Title */}
            <header className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Bookmark className="size-3.5 text-primary" />
                <span>Field Note & Architectural Essay</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-normal tracking-tight text-foreground leading-[1.12]">
                {a.title}
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed text-foreground/80 font-sans border-l-2 border-primary/40 pl-5 italic">
                {a.excerpt}
              </p>

              {/* Mobile / Tablet Telemetry Row */}
              <div className="flex lg:hidden flex-wrap items-center justify-between gap-3 border-y border-border/60 py-3 text-xs font-mono text-muted-foreground">
                <span>{formatDate(a.date)}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {a.readingTime} read
                </span>
                <span>·</span>
                <span>{wordCount} words</span>
              </div>
            </header>

            {/* Feature Cover Image */}
            {a.image && (
              <figure className="my-10 overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 shadow-sm aspect-[16/9] bg-muted/20">
                <img
                  src={getOptimizedImageUrl(a.image, 1200, 80)}
                  srcSet={getSanitySrcSet(a.image)}
                  sizes="(max-width: 1024px) 100vw, 840px"
                  alt={a.title}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </figure>
            )}

            {/* Structured Sections or Fallback Paragraphs */}
            {a.sections && a.sections.length > 0 ? (
              <div className="mt-10 space-y-14">
                {a.sections.map((sec, secIdx) => (
                  <section key={sec.id} id={sec.id} className="scroll-mt-28 space-y-5">
                    <h2 className="group flex items-baseline gap-2 font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground border-b border-border/40 pb-3">
                      <span className="text-xs font-mono text-primary/70 mr-1">0{secIdx + 1}.</span>
                      <span>{sec.title}</span>
                      <a
                        href={`#${sec.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-sm font-mono"
                        aria-label={`Link to ${sec.title}`}
                      >
                        #
                      </a>
                    </h2>

                    <div className="space-y-6 text-base sm:text-lg leading-[1.85] text-foreground/90 font-sans">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p
                          key={pIdx}
                          className={
                            secIdx === 0 && pIdx === 0
                              ? "first-letter:text-5xl first-letter:font-display first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:text-primary leading-[1.85]"
                              : "leading-[1.85]"
                          }
                        >
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Section Callout Box */}
                    {sec.callout && (
                      <aside className="my-6 rounded-2xl border border-primary/25 bg-primary/[0.04] p-5 sm:p-6">
                        <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                          <span className="size-1.5 rounded-full bg-primary" />
                          <span>{sec.callout.label}</span>
                        </div>
                        <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
                          {sec.callout.text}
                        </p>
                      </aside>
                    )}

                    {/* Section Pull Quote */}
                    {sec.quote && (
                      <blockquote className="my-8 rounded-2xl border-l-4 border-primary bg-card/30 p-6 sm:p-7 shadow-xs">
                        <Quote className="size-6 text-primary/40 mb-2" />
                        <p className="font-display text-xl sm:text-2xl text-foreground italic leading-snug">
                          "{sec.quote}"
                        </p>
                        <cite className="mt-3 block text-xs font-mono text-muted-foreground not-italic">
                          — Sule Malik, Engineering Note
                        </cite>
                      </blockquote>
                    )}
                  </section>
                ))}
              </div>
            ) : (
              /* Fallback for articles with flat body paragraphs */
              <div className="mt-10 space-y-7 text-base sm:text-lg leading-[1.85] text-foreground/90 font-sans">
                {(a.body || []).map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "first-letter:text-5xl first-letter:font-display first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:text-primary leading-[1.85]"
                        : "leading-[1.85]"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Key Takeaways Section */}
            {a.takeaways && a.takeaways.length > 0 && (
              <section id="key-takeaways" className="scroll-mt-28 mt-16 rounded-3xl border border-primary/30 bg-primary/[0.03] p-7 sm:p-9 shadow-sm">
                <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-widest font-semibold mb-5">
                  <Sparkles className="size-4" />
                  <span>Executive Takeaways & Heuristics</span>
                </div>
                <ul className="space-y-4">
                  {a.takeaways.map((item, i) => (
                    <li key={i} className="flex gap-3 text-base sm:text-lg text-foreground/90 items-start">
                      <span className="font-mono text-primary font-bold text-sm shrink-0 pt-0.5">
                        ✓
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tags */}
            {a.tags && a.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2 pt-6 border-t border-border/60">
                <span className="text-xs font-mono text-muted-foreground mr-1">Filed under:</span>
                {a.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/30 px-2.5 py-1 text-xs font-mono text-muted-foreground"
                  >
                    <Tag className="size-3" />
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Author Bio Box */}
            <div className="mt-16 rounded-3xl border border-border/80 bg-card/40 p-6 sm:p-8 md:p-9 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5 border-b border-border/60">
                <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                  {a.author?.image && (
                    <img
                      src={getOptimizedImageUrl(a.author.image, 160, 80)}
                      alt={a.author.name}
                      className="size-14 sm:size-16 rounded-2xl object-cover border border-border/80 shadow-xs shrink-0"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-medium">
                      Written by
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl font-medium text-foreground">
                      {a.author?.name || "Sule Malik"}
                    </h4>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">
                      {a.author?.role || "Software Engineer"}{a.author?.location ? ` · ${a.author.location}` : ""}
                    </p>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-opacity hover:opacity-90 shrink-0 self-start sm:self-center"
                >
                  Start a conversation →
                </Link>
              </div>

              <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                {a.author?.bio ||
                  "Product-minded software engineer specializing in React 19, TypeScript, React Native, and high-performance web systems."}
              </p>
            </div>
          </article>

          {/* ================= RIGHT STICKY RAIL (Contextual Case Study & AI Probe) ================= */}
          <aside className="hidden xl:block sticky top-28 space-y-6">
            {/* Connected Production Case Study */}
            {relatedProject ? (
              <div className="rounded-2xl border border-border/80 bg-card/40 p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
                  <Layers className="size-3" />
                  <span>Production Case Study</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-border/60 aspect-[16/10] bg-muted/20">
                  <ProjectVisual project={relatedProject} eager={false} className="border-0" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>{relatedProject.category}</span>
                    {relatedProject.metric && (
                      <span className="text-primary font-bold">{relatedProject.metric.value}</span>
                    )}
                  </div>
                  <h4 className="font-display text-lg font-medium text-foreground mt-1 leading-snug">
                    {relatedProject.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {relatedProject.summary}
                  </p>
                </div>
                <Link
                  to="/work/$slug"
                  params={{ slug: relatedProject.slug }}
                  className="inline-flex w-full items-center justify-center gap-1 rounded-lg border border-border/70 bg-background/80 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <span>Explore Case Study</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            ) : null}

            {/* AI Assistant Probe Card */}
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.03] p-4 space-y-3">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
                <MessageSquare className="size-3" />
                <span>Interactive AI Dossier</span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">
                Have architectural questions about this essay? Ask the assistant about Sule's specific engineering trade-offs.
              </p>
              <Link
                to="/ask"
                search={{ q: `What are Sule Malik's architectural principles in "${a.title}"?` }}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary/10 border border-primary/25 py-2 text-xs font-mono font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                <Sparkles className="size-3" />
                <span>Query Portfolio AI</span>
              </Link>
            </div>

            {/* Editorial Restraint Note */}
            <div className="rounded-2xl border border-border/50 p-4 text-[11px] text-muted-foreground leading-relaxed">
              <p className="italic">
                "Writing is engineering for human cognition — refining complexity into simple, durable mental models."
              </p>
            </div>
          </aside>
        </div>

        {/* Read Next Recommendations Footer */}
        {related.length > 0 && (
          <footer className="mt-24 border-t border-border/70 pt-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Continue Reading
                </span>
                <h3 className="font-display text-2xl font-normal text-foreground mt-1">
                  Further Field Notes & Essays
                </h3>
              </div>
              <Link to="/writing" className="text-xs font-mono text-primary hover:underline">
                View all essays →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to="/writing/$slug"
                  params={{ slug: rel.slug }}
                  className="group block rounded-2xl border border-border/70 bg-card/30 p-6 transition-all hover:bg-card/60 hover:border-border hover:shadow-md"
                >
                  {rel.image && (
                    <div className="relative mb-4 overflow-hidden rounded-xl border border-border/60 aspect-[16/9] bg-muted/20">
                      <img
                        src={getOptimizedImageUrl(rel.image, 600, 75)}
                        srcSet={getSanitySrcSet(rel.image)}
                        sizes="(max-width: 768px) 100vw, 360px"
                        alt={rel.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3">
                    <span className="rounded bg-muted/40 px-2 py-0.5 border border-border/40 text-[10px]">
                      {rel.topic}
                    </span>
                    <span>{rel.readingTime} read</span>
                  </div>
                  <h4 className="font-display text-xl font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                    {rel.title}
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {rel.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary">
                    <span>Read essay</span>
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </footer>
        )}
      </div>
    </Page>
  );
}
