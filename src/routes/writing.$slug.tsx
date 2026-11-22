import { useState } from "react";
import { ArticleSkeleton } from "@/components/site/Skeletons";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page } from "@/components/site/Layout";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { FadeUp } from "@/components/motion/FadeUp";
import { formatDate, getArticle, getArticles, site } from "@/content";
import { Check, Copy, Share2, Tag, Clock, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/writing/$slug")({
  loader: async ({ params }) => {
    const [article, allArticles] = await Promise.all([
      getArticle(params.slug),
      getArticles(),
    ]);

    if (!article) throw notFound();

    const related = allArticles
      .filter((a) => a.slug !== article.slug)
      .slice(0, 2);

    return { article, related };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    return {
      meta: a
        ? [
            { title: `${a.title} — Sule Malik` },
            { name: "description", content: a.excerpt },
            { property: "og:title", content: `${a.title} — Sule Malik` },
            { property: "og:description", content: a.excerpt },
            { property: "og:type", content: "article" },
            { property: "og:url", content: `https://sulemalik.com/writing/${a.slug}` },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: `${a.title} — Sule Malik` },
            { name: "twitter:description", content: a.excerpt },
          ]
        : [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }],
    };
  },
  component: ArticlePage,
  pendingComponent: ArticleSkeleton,
});

function ArticlePage() {
  const { article: a, related } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);

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
      <article className="container-site max-w-3xl pt-14 sm:pt-20 pb-24">
        {/* Navigation & Topic */}
        <FadeUp>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/writing"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-muted-foreground transition-colors hover:text-foreground group"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden />
              <span>Back to all essays</span>
            </Link>
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-mono font-medium text-primary">
              {a.topic}
            </span>
          </div>

          <h1 className="mt-8 font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground leading-[1.12]">
            {a.title}
          </h1>

          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-muted-foreground font-sans">
            {a.excerpt}
          </p>

          {/* Author & Publication Details */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border/70 py-4 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20">
                SM
              </div>
              <div>
                <span className="font-medium text-foreground block">Sule Malik</span>
                <span className="text-[11px] text-muted-foreground">Product Engineer</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span>{formatDate(a.date)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {a.readingTime} read
              </span>
            </div>
          </div>
        </FadeUp>

        {/* Article Body */}
        <div className="mt-12 space-y-7 text-lg sm:text-xl leading-[1.85] text-foreground/90 font-sans">
          {a.body.map((p, idx) => (
            <FadeUp key={idx} delay={0.04 * Math.min(idx, 5)}>
              <p className={idx === 0 ? "first-letter:text-4xl first-letter:font-display first-letter:font-semibold first-letter:float-left first-letter:mr-2.5 first-letter:text-primary leading-[1.9]" : ""}>
                {p}
              </p>
            </FadeUp>
          ))}
        </div>

        {/* Key Takeaways Section */}
        {a.takeaways && a.takeaways.length > 0 && (
          <FadeUp delay={0.2}>
            <div className="mt-14 rounded-3xl border border-primary/25 bg-primary/[0.03] p-7 sm:p-9">
              <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-widest font-semibold mb-4">
                <Sparkles className="size-4" />
                <span>Key Takeaways</span>
              </div>
              <ul className="space-y-3.5">
                {a.takeaways.map((item, i) => (
                  <li key={i} className="flex gap-3 text-base sm:text-lg text-foreground/90 items-start">
                    <span className="font-mono text-primary font-bold text-sm shrink-0 pt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
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

        {/* Share & Engage Action Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card/40 p-5">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Share2 className="size-3.5" />
            <span>Share this essay</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-mono text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-500" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={shareOnTwitter}
              className="inline-flex items-center rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-mono text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Twitter / X
            </button>
            <button
              type="button"
              onClick={shareOnLinkedIn}
              className="inline-flex items-center rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-mono text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              LinkedIn
            </button>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="mt-14 rounded-3xl border border-border/80 bg-muted/20 p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              About the author
            </span>
            <h4 className="mt-1 font-display text-2xl font-medium text-foreground">
              Sule Malik
            </h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md">
              Product-minded software engineer specializing in React 19, TypeScript, React Native, and high-performance web systems.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90 shrink-0"
          >
            Get in touch →
          </Link>
        </div>

        {/* Read Next Recommendations */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-border/70 pt-14">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Read next in writing
              </span>
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
          </div>
        )}
      </article>
    </Page>
  );
}
