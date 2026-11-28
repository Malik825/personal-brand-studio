import { useState, useEffect, useMemo, Fragment } from "react";
import { ArticleSkeleton } from "@/components/site/Skeletons";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Page } from "@/components/site/Layout";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { FadeUp } from "@/components/motion/FadeUp";
import { formatDate, getArticle, getArticles, getProject, site } from "@/content";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { getOptimizedImageUrl, getSanitySrcSet } from "@/lib/images";
import { buildPageMeta, PERSON_ID, SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  Check,
  Copy,
  Tag,
  Clock,
  ArrowLeft,
  ArrowRight,
  ListChecks,
  Bot,
  Bookmark,
  MessageSquare,
  ListTree,
  Quote,
  Layers,
  ChevronDown,
  Share2,
} from "lucide-react";

/** Split any multi-paragraph strings containing blank lines or newlines into clean individual paragraphs. */
function normalizeParagraphs(items?: string[]): string[] {
  if (!Array.isArray(items)) return [];
  return items
    .flatMap((entry) =>
      typeof entry === "string"
        ? entry
            .replace(/\r\n/g, "\n")
            .split(/\n{2,}|\n/)
            .map((part) => part.trim())
        : [],
    )
    .filter(Boolean);
}

/** Strip redundant outer quotation marks so typographic pull-quotes never double-quote. */
function cleanQuote(text: string): string {
  return text.trim().replace(/^["“”'‘’]+|["“”'‘’]+$/g, "").trim();
}

/** Format reading time consistently (e.g. "6" -> "6 min read", "10 min" -> "10 min read"). */
function formatReadingTime(value?: string): string {
  if (!value) return "6 min read";
  const trimmed = value.trim();
  if (/read$/i.test(trimmed)) return trimmed;
  if (/min/i.test(trimmed)) return `${trimmed} read`;
  return `${trimmed} min read`;
}

/** Lightweight inline formatter for *italics*, **bold**, and `inline code` inside CMS paragraphs. */
function renderInlineText(text: string) {
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(tokenRegex);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="italic text-foreground/95">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={i}
          className="rounded-md border border-border/70 bg-muted/60 px-1.5 py-0.5 font-mono text-[0.86em] text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

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
    if (!a) {
      return {
        meta: [{ title: "Article Unavailable | Sule Malik" }, { name: "robots", content: "noindex" }],
        links: [],
        scripts: [],
      };
    }

    const pageTitle = a.seoTitle
      ? a.seoTitle.includes(SITE_NAME)
        ? a.seoTitle
        : `${a.seoTitle} | ${SITE_NAME}`
      : `${a.title} | ${SITE_NAME}`;
    const authorName = a.author?.name || SITE_NAME;
    const modifiedDate = a.updatedAt ? a.updatedAt.split("T")[0] : a.date;

    const seo = buildPageMeta({
      title: pageTitle,
      description: a.seoDescription || a.excerpt,
      path: `/writing/${a.slug}`,
      type: "article",
      ...(a.image ? { image: a.image } : {}),
      imageAlt: a.title,
      publishedTime: a.date,
      modifiedTime: modifiedDate,
      author: authorName,
      section: a.topic,
    });

    return {
      meta: seo.meta,
      links: [seo.canonicalLink],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: a.title,
            description: seo.description,
            image: [seo.imageUrl],
            datePublished: a.date,
            dateModified: modifiedDate,
            articleSection: a.topic,
            ...(a.tags && a.tags.length > 0 ? { keywords: a.tags.join(", ") } : {}),
            author: {
              "@id": PERSON_ID,
              "@type": "Person",
              name: authorName,
              url: SITE_URL,
            },
            publisher: {
              "@id": PERSON_ID,
              "@type": "Person",
              name: SITE_NAME,
              url: SITE_URL,
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": seo.url,
            },
          }),
        },
      ],
    };
  },
  component: ArticlePage,
  pendingComponent: ArticleSkeleton,
});

function ArticlePage() {
  const { article: a, related, relatedProject } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const normalizedSections = useMemo(
    () =>
      (a.sections || []).map((sec) => ({
        ...sec,
        paragraphs: normalizeParagraphs(sec.paragraphs),
      })),
    [a.sections],
  );

  const introParagraphs = useMemo(() => normalizeParagraphs(a.body), [a.body]);

  // Show intro paragraphs above Section 01 only when `body` is a distinct intro (not a duplicate of section 1)
  const hasDistinctIntro = useMemo(() => {
    if (normalizedSections.length === 0 || introParagraphs.length === 0) return false;
    const firstIntro = (introParagraphs[0] || "").slice(0, 45).toLowerCase();
    const firstSec = (normalizedSections[0]?.paragraphs[0] || "").slice(0, 45).toLowerCase();
    return Boolean(firstIntro) && firstIntro !== firstSec;
  }, [normalizedSections, introParagraphs]);

  const tocItems = useMemo(() => {
    const items: Array<{ id: string; label: string; number: string | null; isSpecial?: boolean }> = [];
    if (hasDistinctIntro) {
      items.push({ id: "introduction", label: "Introduction", number: "00" });
    }
    normalizedSections.forEach((sec, idx) => {
      items.push({
        id: sec.id,
        label: sec.title,
        number: String(idx + 1).padStart(2, "0"),
      });
    });
    if (a.takeaways && a.takeaways.length > 0) {
      items.push({
        id: "key-takeaways",
        label: "Key Takeaways",
        number: null,
        isSpecial: true,
      });
    }
    return items;
  }, [hasDistinctIntro, normalizedSections, a.takeaways]);

  const [activeSectionId, setActiveSectionId] = useState<string>(() => tocItems[0]?.id ?? "");

  // Keep activeSectionId in sync when navigating between articles
  useEffect(() => {
    setActiveSectionId(tocItems[0]?.id ?? "");
  }, [a.slug, tocItems]);

  // Live Scroll-Spy tracking which section is currently in view
  useEffect(() => {
    if (tocItems.length === 0) return;

    let rafId = 0;
    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // If near the very bottom of the page, highlight the last ToC item
      if (scrollY + winHeight >= docHeight - 100) {
        const lastItem = tocItems[tocItems.length - 1];
        if (lastItem) setActiveSectionId(lastItem.id);
        return;
      }

      const offset = 160;
      let currentId = tocItems[0]?.id ?? "";

      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset) {
          currentId = item.id;
        } else {
          break;
        }
      }

      setActiveSectionId(currentId);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [tocItems]);

  const activeIndex = useMemo(() => {
    const idx = tocItems.findIndex((item) => item.id === activeSectionId);
    return idx >= 0 ? idx : 0;
  }, [tocItems, activeSectionId]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSectionId(id);
      setMobileTocOpen(false);
    }
  };

  const wordCount = useMemo(() => {
    const sectionWords = normalizedSections.reduce(
      (acc, s) => acc + s.paragraphs.join(" ").split(/\s+/).filter(Boolean).length,
      0,
    );
    const introWords =
      normalizedSections.length === 0 || hasDistinctIntro
        ? introParagraphs.join(" ").split(/\s+/).filter(Boolean).length
        : 0;
    return sectionWords + introWords;
  }, [normalizedSections, introParagraphs, hasDistinctIntro]);

  const formattedReadTime = formatReadingTime(a.readingTime);

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
    const text = encodeURIComponent(`"${a.title}" by ${site.name}`);
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
        <div className="grid grid-cols-1 lg:grid-cols-[15.5rem_1fr] xl:grid-cols-[16.5rem_minmax(0,1fr)_18rem] gap-10 xl:gap-14 items-start">
          
          {/* ================= LEFT STICKY RAIL (Metadata, Scroll-Spy ToC, Share) ================= */}
          <aside className="hidden lg:flex lg:flex-col sticky top-24 max-h-[calc(100vh-7.5rem)] overflow-y-auto pr-1 space-y-5">
            {/* Compact Author & Telemetry Capsule */}
            <div className="rounded-2xl border border-border/70 bg-card/40 p-4 space-y-3.5">
              <div className="flex items-center gap-3">
                {a.author?.image ? (
                  <img
                    src={getOptimizedImageUrl(a.author.image, 160, 80)}
                    alt={a.author.name}
                    className="size-9 rounded-full object-cover border border-primary/25 shadow-xs shrink-0"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary font-bold text-xs border border-primary/20 shrink-0">
                    {a.author?.name ? a.author.name.slice(0, 2).toUpperCase() : "SM"}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-sans font-semibold text-foreground text-sm leading-tight truncate">
                    {a.author?.name || site.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    {a.author?.role || site.role}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-border/50 pt-3">
                <div>
                  <span className="block font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground/75">
                    Published
                  </span>
                  <span className="mt-0.5 block text-xs font-medium text-foreground">
                    {formatDate(a.date)}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground/75">
                    Read Time
                  </span>
                  <span className="mt-0.5 block text-xs font-medium text-foreground">
                    {formattedReadTime}
                  </span>
                </div>
                <div className="col-span-2 pt-1 flex items-center justify-between border-t border-border/40">
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground/75">
                    Volume
                  </span>
                  <span className="font-mono text-[11px] font-medium text-foreground/85">
                    {wordCount.toLocaleString()} words
                  </span>
                </div>
              </div>
            </div>

            {/* Table of Contents with Live Scroll-Spy Active Indicator */}
            {tocItems.length > 0 && (
              <div className="rounded-2xl border border-border/70 bg-card/35 p-4">
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-border/50">
                  <p className="flex items-center gap-1.5 font-mono font-semibold uppercase tracking-[0.14em] text-foreground/85 text-[10px]">
                    <ListTree className="size-3.5 text-primary" />
                    <span>On This Page</span>
                  </p>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-primary tabular-nums">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(tocItems.length).padStart(2, "0")}
                  </span>
                </div>

                <nav aria-label="Table of contents" className="relative">
                  {/* Continuous vertical progress rail */}
                  <div
                    className="pointer-events-none absolute left-[3px] top-1.5 bottom-1.5 w-[2px] rounded-full bg-border/60"
                    aria-hidden="true"
                  />

                  <ul className="space-y-0.5">
                    {tocItems.map((item, idx) => {
                      const isActive = activeSectionId === item.id;
                      const isPassed = idx < activeIndex;

                      return (
                        <li
                          key={item.id}
                          className={
                            item.isSpecial
                              ? "relative mt-2 pt-2 border-t border-border/50"
                              : "relative"
                          }
                        >
                          <a
                            href={`#${item.id}`}
                            aria-current={isActive ? "location" : undefined}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(item.id);
                            }}
                            className={`group relative flex items-start gap-2.5 rounded-r-xl pl-4 pr-2.5 py-2 transition-all duration-200 ${
                              isActive
                                ? "bg-primary/[0.09] text-foreground"
                                : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                            }`}
                          >
                            {/* Sliding Active Indicator Bar */}
                            {isActive ? (
                              <motion.span
                                layoutId="toc-active-indicator"
                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                className="absolute left-[2px] top-1.5 bottom-1.5 w-[3.5px] rounded-full bg-primary shadow-[0_0_8px_rgba(37,99,235,0.35)]"
                                aria-hidden="true"
                              />
                            ) : isPassed ? (
                              <span
                                className="absolute left-[3px] top-1.5 bottom-1.5 w-[2px] rounded-full bg-primary/35"
                                aria-hidden="true"
                              />
                            ) : null}

                            {item.isSpecial ? (
                              <ListChecks
                                className={`size-3.5 shrink-0 mt-0.5 transition-colors ${
                                  isActive ? "text-primary" : "text-primary/60 group-hover:text-primary"
                                }`}
                              />
                            ) : (
                              <span
                                className={`font-mono text-[10px] shrink-0 mt-[3px] tabular-nums transition-colors ${
                                  isActive
                                    ? "text-primary font-bold"
                                    : isPassed
                                      ? "text-primary/55 font-medium"
                                      : "text-muted-foreground/55 group-hover:text-primary/70"
                                }`}
                              >
                                {item.number}
                              </span>
                            )}

                            <span
                              className={`font-sans text-[12.5px] leading-[1.35] line-clamp-2 transition-colors ${
                                isActive
                                  ? "font-semibold text-foreground"
                                  : isPassed
                                    ? "font-normal text-foreground/70 group-hover:text-foreground"
                                    : "font-normal text-muted-foreground group-hover:text-foreground"
                              }`}
                            >
                              {item.label}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            )}

            {/* Compact Share Action Row */}
            <div className="rounded-2xl border border-border/60 bg-card/25 p-3">
              <p className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground/80 font-semibold mb-2 px-0.5">
                <Share2 className="size-3 text-primary/75" />
                <span>Share Essay</span>
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-1 rounded-lg border border-border/70 bg-background/70 px-2 py-1.5 text-[11px] font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors cursor-pointer"
                  title="Copy link to essay"
                >
                  {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button
                  type="button"
                  onClick={shareOnTwitter}
                  className="inline-flex items-center justify-center gap-1 rounded-lg border border-border/70 bg-background/70 px-2 py-1.5 text-[11px] font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors cursor-pointer"
                  title="Share on X / Twitter"
                >
                  <span>X</span>
                </button>
                <button
                  type="button"
                  onClick={shareOnLinkedIn}
                  className="inline-flex items-center justify-center gap-1 rounded-lg border border-border/70 bg-background/70 px-2 py-1.5 text-[11px] font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors cursor-pointer"
                  title="Share on LinkedIn"
                >
                  <span>LinkedIn</span>
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

              <p className="text-lg sm:text-xl leading-relaxed text-foreground/80 font-sans border-l-2 border-primary/40 pl-5">
                {renderInlineText(a.excerpt)}
              </p>

              {/* Mobile / Tablet Telemetry Row */}
              <div className="flex lg:hidden flex-wrap items-center justify-between gap-3 border-y border-border/60 py-3 text-xs font-mono text-muted-foreground">
                <span>{formatDate(a.date)}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {formattedReadTime}
                </span>
                <span>·</span>
                <span>{wordCount.toLocaleString()} words</span>
              </div>

              {/* Mobile Collapsible Table of Contents */}
              {tocItems.length > 0 && (
                <div className="lg:hidden rounded-2xl border border-border/70 bg-card/40 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileTocOpen((prev) => !prev)}
                    aria-expanded={mobileTocOpen}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-foreground cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <ListTree className="size-3.5 text-primary" />
                      <span>On This Page ({tocItems.length})</span>
                    </span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform duration-200 ${
                        mobileTocOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileTocOpen && (
                    <nav className="border-t border-border/50 px-3 py-2 space-y-0.5">
                      {tocItems.map((item) => {
                        const isActive = activeSectionId === item.id;
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(item.id);
                            }}
                            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-sans transition-colors ${
                              isActive
                                ? "bg-primary/10 text-foreground font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span className="font-mono text-[11px] text-primary/80 w-5 shrink-0">
                              {item.number ?? "★"}
                            </span>
                            <span className="leading-snug">{item.label}</span>
                          </a>
                        );
                      })}
                    </nav>
                  )}
                </div>
              )}
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

            {/* Distinct Editorial Introduction (when body introduces structured sections) */}
            {hasDistinctIntro && (
              <section id="introduction" className="scroll-mt-28 mt-10">
                <div className="space-y-5 text-[16.5px] sm:text-[17.5px] leading-[1.82] text-foreground/85 font-sans">
                  {introParagraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[3.25rem] first-letter:font-medium first-letter:leading-[0.82] first-letter:text-primary"
                          : ""
                      }
                    >
                      {renderInlineText(p)}
                    </p>
                  ))}
                </div>
                <div className="my-12 flex items-center justify-center gap-3 text-muted-foreground/40" aria-hidden="true">
                  <span className="h-px w-12 bg-border/80" />
                  <span className="font-mono text-xs tracking-[0.4em]">···</span>
                  <span className="h-px w-12 bg-border/80" />
                </div>
              </section>
            )}

            {/* Structured Sections or Fallback Paragraphs */}
            {normalizedSections.length > 0 ? (
              <div className={hasDistinctIntro ? "space-y-16" : "mt-10 space-y-16"}>
                {normalizedSections.map((sec, secIdx) => (
                  <section key={sec.id} id={sec.id} className="scroll-mt-28 space-y-6">
                    <div className="border-b border-border/50 pb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                          Section {String(secIdx + 1).padStart(2, "0")}
                        </span>
                        <a
                          href={`#${sec.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(sec.id);
                          }}
                          className="font-mono text-xs text-muted-foreground/50 hover:text-primary transition-colors"
                          aria-label={`Link to ${sec.title}`}
                        >
                          #
                        </a>
                      </div>
                      <h2 className="mt-1.5 font-display text-2xl sm:text-[1.95rem] font-medium tracking-tight text-foreground leading-[1.2]">
                        {sec.title}
                      </h2>
                    </div>

                    <div className="space-y-5 text-[16.5px] sm:text-[17.5px] leading-[1.82] text-foreground/85 font-sans">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p
                          key={pIdx}
                          className={
                            !hasDistinctIntro && secIdx === 0 && pIdx === 0
                              ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[3.25rem] first-letter:font-medium first-letter:leading-[0.82] first-letter:text-primary"
                              : ""
                          }
                        >
                          {renderInlineText(p)}
                        </p>
                      ))}
                    </div>

                    {/* Section Callout Box */}
                    {sec.callout && sec.callout.text && (
                      <aside className="my-7 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5 sm:p-6">
                        <div className="flex items-center gap-2 text-primary font-mono text-[11px] uppercase tracking-[0.15em] font-semibold mb-2.5">
                          <span className="size-1.5 rounded-full bg-primary shrink-0" />
                          <span>{sec.callout.label || "Key Insight"}</span>
                        </div>
                        <p className="text-[15px] sm:text-base text-foreground/90 leading-relaxed font-sans">
                          {renderInlineText(sec.callout.text)}
                        </p>
                      </aside>
                    )}

                    {/* Section Pull Quote */}
                    {sec.quote && (
                      <blockquote className="my-8 rounded-2xl border border-border/60 border-l-4 border-l-primary bg-card/40 p-6 sm:p-7 shadow-xs">
                        <Quote className="size-5 text-primary/45 mb-2.5" />
                        <p className="font-display text-xl sm:text-[1.4rem] text-foreground italic leading-[1.4]">
                          “{cleanQuote(sec.quote)}”
                        </p>
                        <cite className="mt-3.5 block text-xs font-mono text-muted-foreground not-italic">
                          — {a.author?.name || "Sule Malik"}, Engineering Note
                        </cite>
                      </blockquote>
                    )}
                  </section>
                ))}
              </div>
            ) : (
              /* Fallback for articles with flat body paragraphs */
              <div className="mt-10 space-y-6 text-[16.5px] sm:text-[17.5px] leading-[1.82] text-foreground/85 font-sans">
                {introParagraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[3.25rem] first-letter:font-medium first-letter:leading-[0.82] first-letter:text-primary"
                        : ""
                    }
                  >
                    {renderInlineText(p)}
                  </p>
                ))}
              </div>
            )}

            {/* Key Takeaways Section */}
            {a.takeaways && a.takeaways.length > 0 && (
              <section id="key-takeaways" className="scroll-mt-28 mt-16 rounded-3xl border border-primary/30 bg-primary/[0.03] p-7 sm:p-9 shadow-sm">
                <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-widest font-semibold mb-5">
                  <ListChecks className="size-4" />
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
                    <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground">
                      {a.author?.name || "Sule Malik"}
                    </h3>
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
                  <h3 className="font-display text-lg font-medium text-foreground mt-1 leading-snug">
                    {relatedProject.title}
                  </h3>
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
                <Bot className="size-3.5" />
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
