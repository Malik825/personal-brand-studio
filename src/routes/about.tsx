import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import portrait from "@/assets/profile.webp";
import { Eyebrow, Page } from "@/components/site/Layout";
import { FadeUp } from "@/components/motion/FadeUp";
import { InfiniteMarquee } from "@/components/site/InfiniteMarquee";
import { cinematicEase } from "@/components/motion/variants";
import { getAbout, getSite } from "@/content";
import { philosophyMarquee } from "@/content/marquees";
import { getTechIcon } from "@/components/icons/TechIcons";
import {
  ArrowRight,
  MapPin,
  Globe,
  Layers,
  Sparkles,
  Bot,
  LineChart,
  Search,
  Compass,
  Smartphone,
  CheckCircle2,
  Terminal,
  LayoutGrid,
  ChevronRight,
  Activity,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const [about, site] = await Promise.all([getAbout(), getSite()]);
    return { about, site };
  },
  head: () => ({
    meta: [
      { title: "About — Sule Malik" },
      {
        name: "description",
        content:
          "Background, engineering philosophy, and technical capabilities of Sule Malik, a product-minded software engineer based in Asante Mampong, Ghana.",
      },
      { property: "og:title", content: "About — Sule Malik" },
      {
        property: "og:description",
        content:
          "Background, engineering philosophy, and technical capabilities of Sule Malik, a product-minded software engineer.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sulemalik.com/about" },
      { property: "og:image", content: "https://sulemalik.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About — Sule Malik" },
      {
        name: "twitter:description",
        content:
          "Background, engineering philosophy, and technical capabilities of Sule Malik, a product-minded software engineer.",
      },
      { name: "twitter:image", content: "https://sulemalik.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sulemalik.com/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": "https://sulemalik.com/about#webpage",
          url: "https://sulemalik.com/about",
          name: "About Sule Malik — Product-Minded Software Engineer",
          description:
            "Background, engineering philosophy, and technical capabilities of Sule Malik, a product-minded software engineer based in Asante Mampong, Ghana.",
          mainEntity: {
            "@type": "Person",
            "@id": "https://sulemalik.com/#person",
            name: "Sule Malik",
            jobTitle: "Product-Minded Software Engineer",
            url: "https://sulemalik.com",
            image: "https://sulemalik.com/og-image.png",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Asante Mampong",
              addressRegion: "Ashanti Region",
              addressCountry: "GH",
            },
            sameAs: [
              "https://www.linkedin.com/in/abdulmalik-suleman-14a8501a9/",
              "https://github.com/malik825",
            ],
            knowsAbout: [
              "React",
              "Next.js",
              "Angular",
              "TypeScript",
              "React Native",
              "Node.js",
              "Express",
              "Supabase",
              "PostgreSQL",
              "MongoDB",
              "AEO (Answer Engine Optimization)",
              "GEO (Generative Engine Optimization)",
              "Product Analytics",
            ],
          },
        }),
      },
    ],
  }),
  component: About,
});

function formatBioParagraph(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function About() {
  const { about, site } = Route.useLoaderData();
  const shouldReduceMotion = useReducedMotion();

  const bioParagraphs =
    about.bio && about.bio.length > 0
      ? about.bio
      : [
          about.intro || "",
          ...(Array.isArray(about.sections)
            ? about.sections.map((s) => s.body)
            : []),
        ].filter(Boolean);

  const principles = about.principles || [
    {
      number: "01",
      title: "Clarity Over Cleverness",
      tagline: "Architecture that outlasts trends",
      body: "Good software is clear before it is clever. I favor simple architectures, explicit data flows, and modular components that are effortless to refactor, because real products evolve much faster than rigid plans.",
    },
    {
      number: "02",
      title: "Product-Led Problem Solving",
      tagline: "Code as a business lever",
      body: "Before writing code, I obsess over who the feature is for and what measurable success looks like. That context shapes every trade-off: what to build first, what to simplify, and what to leave out.",
    },
    {
      number: "03",
      title: "Craft & Micro-Interactions",
      tagline: "The tactile user experience",
      body: "Motion and responsiveness aren't cosmetic additions; they are communication. Fluid 60fps gestures, optimistic updates, and instant visual feedback turn utility into delightful, trustworthy software.",
    },
    {
      number: "04",
      title: "Autonomous Collaboration",
      tagline: "Async rigor across time zones",
      body: "Experienced in remote-first environments across GMT, EST, and CET. High agency means clear written documentation, continuous visibility, and taking end-to-end ownership from concept to production.",
    },
  ];

  const capabilityGroups = about.capabilityGroups || [
    {
      category: "Frontend Development",
      items: [
        "React, Next.js, Angular",
        "TypeScript, JavaScript",
        "React Native (Expo)",
        "Tailwind CSS",
        "TanStack Query, Router",
      ],
    },
    {
      category: "Backend & Data",
      items: [
        "Node.js, Express",
        "Supabase, PostgreSQL",
        "MongoDB",
        "REST APIs, GraphQL",
        "Authentication & API Integration",
      ],
    },
    {
      category: "Tools & Practices",
      items: [
        "Git & GitHub",
        "Vercel",
        "Responsive Design",
        "Performance Optimization",
        "State Management",
        "Component Architecture",
      ],
    },
  ];

  const learningTopics = about.learningTopics || [];

  const [selectedTopicId, setSelectedTopicId] = useState<string>("ai");
  const [viewLayout, setViewLayout] = useState<"interactive" | "bento">("interactive");
  const activeTopic = learningTopics.find((t) => t.id === selectedTopicId) || learningTopics[0];

  function getTopicIcon(category: string, title: string) {
    const t = (category + " " + title).toLowerCase();
    if (t.includes("ai") || t.includes("agent") || t.includes("intelligence")) {
      return <Bot className="size-4 text-primary" />;
    }
    if (t.includes("analytic") || t.includes("growth") || t.includes("telemetry")) {
      return <LineChart className="size-4 text-primary" />;
    }
    if (t.includes("seo") || t.includes("search")) {
      return <Search className="size-4 text-primary" />;
    }
    if (t.includes("aeo") || t.includes("geo") || t.includes("discovery") || t.includes("engine")) {
      return <Compass className="size-4 text-primary" />;
    }
    if (t.includes("native") || t.includes("mobile")) {
      return <Smartphone className="size-4 text-primary" />;
    }
    return <Sparkles className="size-4 text-primary" />;
  }

  return (
    <Page>
      {/* ================= EDITORIAL PROFILE HERO ================= */}
      <section className="container-site pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center xl:gap-16">
          <div>
            <FadeUp>
              <Eyebrow>About / Profile</Eyebrow>
              <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] leading-[1.08] tracking-tight text-foreground">
                Engineering with the{" "}
                <em className="text-primary italic">whole product</em> in view.
              </h1>
            </FadeUp>

            <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
              {bioParagraphs.map((para, idx) => (
                <FadeUp key={idx} delay={0.06 * (idx + 1)}>
                  <p>{formatBioParagraph(para)}</p>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/work" className="btn-solid group">
                  <span>View my work</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </Link>
                <Link to="/contact" className="btn-outline group">
                  <span>Start a conversation</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Architectural Portrait Showcase & Dossier */}
          <FadeUp delay={0.15}>
            <div className="relative mx-auto w-full max-w-md lg:max-w-[460px]">
              {/* Outer Editorial Mount Card */}
              <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/40 p-3 sm:p-4 shadow-2xl backdrop-blur-sm">
                {/* Image Frame with Tight Architectural Headshot Crop */}
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] w-full bg-muted/20 border border-border/60">
                  <motion.img
                    src={portrait}
                    alt="Sule Malik — Product-minded software engineer"
                    width={960}
                    height={1280}
                    initial={shouldReduceMotion ? false : { scale: 1.25 }}
                    animate={{ scale: 1.2 }}
                    transition={{ duration: 1.2, ease: cinematicEase }}
                    className="h-full w-full object-cover object-[center_14%] contrast-[1.03] saturate-[0.92]"
                  />
                  {/* Subtle vignette scrim */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"
                    aria-hidden
                  />

                  {/* Architectural Figure Badge */}
                  <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white/90">
                    Fig. 01 / Portrait
                  </div>
                  <div className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-white/90 flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    UTC+0
                  </div>
                </div>

                {/* Telemetry Snapshot Footer */}
                <div className="mt-3.5 space-y-2.5 px-2 pb-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-foreground">
                      <MapPin className="size-3.5 text-primary" />
                      <span className="font-mono text-xs">{site?.location || "Asante Mampong, Ghana"}</span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">GMT / EST / CET</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/60 pt-2.5 text-xs text-muted-foreground">
                    <span className="font-mono text-[11px]">Availability</span>
                    <span className="font-mono text-[11px] text-foreground font-medium flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-primary" />
                      Open for opportunities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ================= PHILOSOPHY MARQUEE ================= */}
      <section className="border-y border-border bg-card/30">
        <InfiniteMarquee
          items={philosophyMarquee}
          variant="philosophy"
          speedSeconds={38}
          label="Engineering philosophy"
        />
      </section>

      {/* ================= OPERATING PRINCIPLES (01 - 04) ================= */}
      <section className="container-site py-20 sm:py-28 border-b border-border">
        <FadeUp>
          <div className="max-w-2xl">
            <Eyebrow>Operating Principles</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground">
              How I architect, code & collaborate.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground">
              The foundational convictions that guide how I make trade-offs, solve technical challenges, and ship user-facing products.
            </p>
          </div>
        </FadeUp>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {principles.map((p, idx) => (
            <FadeUp key={p.number} delay={0.08 * idx}>
              <div className="group relative h-full rounded-3xl border border-border/80 bg-card/30 p-8 sm:p-10 transition-all duration-300 hover:bg-card/60 hover:border-border hover:shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-border/60 pb-5 mb-6">
                    <span className="font-mono text-sm font-semibold text-primary">
                      {p.number}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                      Principle
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-normal text-foreground group-hover:text-primary transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-primary/80">
                    {p.tagline}
                  </p>
                  <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                    {p.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ================= STRUCTURED CAPABILITIES MATRIX ================= */}
      <section className="container-site py-20 sm:py-28 border-b border-border">
        <FadeUp>
          <div className="max-w-2xl">
            <Eyebrow>Technical Skills</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground">
              Depth across the stack.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground">
              Specialized in high-fidelity user interfaces, gesture-driven mobile applications, and resilient edge backends.
            </p>
          </div>
        </FadeUp>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {capabilityGroups.map((group, idx) => (
            <FadeUp key={group.category} delay={0.08 * idx}>
              <div className="h-full rounded-3xl border border-border/80 bg-card/30 p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-6">
                    <Sparkles className="size-3.5" />
                    <span>{group.category}</span>
                  </div>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm sm:text-base font-medium text-foreground/90 py-1"
                      >
                        {getTechIcon(item, "size-4 shrink-0") || (
                          <span className="size-1.5 rounded-full bg-primary shrink-0" />
                        )}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ================= CONTINUOUS LEARNING & ACTIVE EXPLORATION ================= */}
      {learningTopics.length > 0 && (
        <section className="container-site py-20 sm:py-28 border-b border-border">
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <Eyebrow>Continuous Research & Exploration</Eyebrow>
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active Lab
                  </span>
                </div>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground">
                  Things I enjoy learning & researching.
                </h2>
                <p className="mt-3 text-base sm:text-lg text-muted-foreground">
                  Beyond shipping client and SaaS features, I dedicate focused engineering cycles to emerging paradigms—connecting architectural rigor to product intelligence, discovery, and tactile craft.
                </p>
              </div>

              {/* View Layout Switcher (Interactive Lab Console vs Bento Matrix) */}
              <div className="flex items-center gap-1.5 self-start md:self-end rounded-full border border-border/80 bg-card/40 p-1 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setViewLayout("interactive")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                    viewLayout === "interactive"
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Interactive Console View"
                >
                  <Terminal className="size-3.5" />
                  <span>Lab Console</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewLayout("bento")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                    viewLayout === "bento"
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Bento Grid View"
                >
                  <LayoutGrid className="size-3.5" />
                  <span>Bento Matrix</span>
                </button>
              </div>
            </div>
          </FadeUp>

          {/* ================= VIEW 1: INTERACTIVE LAB CONSOLE ================= */}
          {viewLayout === "interactive" && activeTopic && (
            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
              {/* Left Selector Docket (5 topics) */}
              <div className="flex flex-col gap-2.5 lg:col-span-5">
                {/* Mobile scrollable strip */}
                <div className="flex lg:hidden overflow-x-auto pb-2 gap-2 no-scrollbar">
                  {learningTopics.map((topic) => {
                    const isSelected = activeTopic.id === topic.id;
                    return (
                      <button
                        key={topic.id || topic.title}
                        type="button"
                        onClick={() => setSelectedTopicId(topic.id || "ai")}
                        className={`shrink-0 flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-mono transition-colors border ${
                          isSelected
                            ? "bg-primary/15 border-primary/40 text-primary font-medium"
                            : "bg-card/40 border-border/70 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {getTopicIcon(topic.category, topic.title)}
                        <span>{topic.badge}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Desktop vertical stack */}
                <div className="hidden lg:flex flex-col gap-2.5">
                  {learningTopics.map((topic) => {
                    const isSelected = activeTopic.id === topic.id;
                    return (
                      <button
                        key={topic.id || topic.title}
                        type="button"
                        onClick={() => setSelectedTopicId(topic.id || "ai")}
                        className={`group text-left rounded-2xl border p-4 transition-all duration-200 cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? "border-primary/50 bg-primary/5"
                            : "border-border/70 bg-card/30 hover:border-border hover:bg-card/60"
                        }`}
                      >
                        {/* Active vertical accent bar */}
                        {isSelected && (
                          <motion.div
                            layoutId="activeTopicGlow"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                            transition={{ duration: 0.25 }}
                          />
                        )}

                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-xs text-primary font-semibold">
                              {topic.number || "01"}
                            </span>
                            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                              {topic.category}
                            </span>
                          </div>
                          {topic.status && (
                            <span className="text-[10px] font-mono text-muted-foreground/80 flex items-center gap-1">
                              <span
                                className={`size-1.5 rounded-full ${
                                  isSelected ? "bg-emerald-400 animate-pulse" : "bg-muted-foreground/50"
                                }`}
                              />
                              {topic.status}
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <p
                            className={`font-display text-lg tracking-tight transition-colors ${
                              isSelected ? "text-primary font-medium" : "text-foreground group-hover:text-primary"
                            }`}
                          >
                            {topic.title}
                          </p>
                          <ChevronRight
                            className={`size-4 transition-transform duration-200 ${
                              isSelected
                                ? "text-primary translate-x-1"
                                : "text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Live Stage Deep-Dive */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTopic.id || activeTopic.title}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: cinematicEase }}
                    className="relative rounded-3xl border border-border/80 bg-card/40 p-7 sm:p-9 backdrop-blur-md overflow-hidden"
                  >
                    {/* Ambient glow accent behind active topic */}
                    <div
                      className="absolute -top-24 -right-24 size-64 rounded-full bg-primary/10 blur-3xl pointer-events-none"
                      aria-hidden
                    />

                    {/* Top Dossier Meta Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
                          EXP // {activeTopic.number || "01"}
                        </span>
                        <span className="text-muted-foreground/40">·</span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                          {getTopicIcon(activeTopic.category, activeTopic.title)}
                          <span>{activeTopic.category}</span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-mono font-medium text-primary">
                        <span className="size-1.5 rounded-full bg-primary" />
                        {activeTopic.badge}
                      </span>
                    </div>

                    {/* Main Headline */}
                    <h3 className="mt-6 font-display text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-foreground leading-snug">
                      {activeTopic.title}
                    </h3>

                    {/* Architectural Why Callout */}
                    {activeTopic.whyItMatters && (
                      <div className="mt-5 rounded-2xl border-l-2 border-primary bg-primary/[0.04] p-4 text-xs sm:text-sm text-foreground/90 font-sans leading-relaxed">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-primary font-semibold mb-1">
                          The Engineering Why
                        </p>
                        <p className="text-muted-foreground">{activeTopic.whyItMatters}</p>
                      </div>
                    )}

                    {/* Detailed Technical Description */}
                    <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground font-sans">
                      {activeTopic.description}
                    </p>

                    {/* Subgrid: Focus Points & Tools */}
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 border-t border-border/60 pt-6">
                      {/* Left: Active Exploration Takeaways */}
                      <div>
                        <p className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold flex items-center gap-1.5 mb-3">
                          <CheckCircle2 className="size-3.5 text-primary" />
                          <span>Key Focus Areas</span>
                        </p>
                        <ul className="space-y-2">
                          {(activeTopic.takeaways || []).map((t) => (
                            <li
                              key={t}
                              className="flex items-start gap-2 text-xs text-muted-foreground font-sans leading-relaxed"
                            >
                              <span className="text-primary font-bold mt-0.5">›</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Experiment & Tool Stack */}
                      <div>
                        <p className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold flex items-center gap-1.5 mb-3">
                          <Zap className="size-3.5 text-primary" />
                          <span>Tooling & Protocols</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {(activeTopic.tools || [
                            "Vercel AI SDK",
                            "Model Context Protocol",
                            "LangChain",
                            "Deterministic Grounding",
                          ]).map((tool) => (
                            <span
                              key={tool}
                              className="rounded-full border border-border/70 bg-card/70 px-2.5 py-1 text-[11px] font-mono text-foreground/80 hover:border-primary/40 transition-colors"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: BENTO MATRIX ================= */}
          {viewLayout === "bento" && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {learningTopics.map((topic, idx) => {
                const isFlagship = idx === 0;
                return (
                  <FadeUp key={topic.title} delay={0.06 * idx}>
                    <div
                      className={`group relative h-full rounded-3xl border border-border/80 bg-card/30 p-7 sm:p-8 transition-all duration-300 hover:bg-card/60 hover:border-border flex flex-col justify-between ${
                        isFlagship
                          ? "sm:col-span-2 lg:col-span-2 bg-gradient-to-br from-card/60 via-card/30 to-primary/[0.04]"
                          : ""
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-5">
                          <div className="flex items-center gap-2">
                            {getTopicIcon(topic.category, topic.title)}
                            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                              {topic.number} · {topic.category}
                            </span>
                          </div>
                          <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-mono font-medium text-primary">
                            {topic.badge}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl sm:text-3xl font-normal text-foreground group-hover:text-primary transition-colors leading-snug">
                          {topic.title}
                        </h3>

                        {topic.whyItMatters && (
                          <p className="mt-3 text-xs font-mono text-primary/85 leading-relaxed">
                            "{topic.whyItMatters}"
                          </p>
                        )}

                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-sans">
                          {topic.description}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-border/50 pt-4 space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {(topic.tools || []).slice(0, 4).map((tool) => (
                            <span
                              key={tool}
                              className="rounded-full bg-card/80 border border-border/60 px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ================= REMOTE COLLABORATION MATRIX ================= */}
      <section className="container-site py-20 sm:py-28 border-b border-border">
        <FadeUp>
          <Eyebrow>Collaboration & Availability</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground">
            Built for remote-first teams.
          </h2>
        </FadeUp>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FadeUp delay={0.05}>
            <div className="rounded-2xl border border-border/70 bg-card/20 p-6 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                Primary Base
              </span>
              <p className="font-display text-xl text-foreground font-medium">
                Asante Mampong
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                Kumasi, Ghana (UTC+0)
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-border/70 bg-card/20 p-6 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                Timezone Overlap
              </span>
              <p className="font-display text-xl text-foreground font-medium">
                GMT, CET & EST
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                Flexible sync hours
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="rounded-2xl border border-border/70 bg-card/20 p-6 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                Primary Tooling
              </span>
              <p className="font-display text-xl text-foreground font-medium">
                React 19 & TypeScript
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                Supabase & React Native
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="rounded-2xl border border-border/70 bg-card/20 p-6 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                Engagement Types
              </span>
              <p className="font-display text-xl text-foreground font-medium">
                Full-Time & Advisory
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                Select contract builds
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ================= CLOSING CTA SUITE ================= */}
      <section className="container-site py-24 sm:py-32 text-center">
        <FadeUp>
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Next Steps
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
            Ready to build something <em className="text-primary italic">exceptional?</em>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Explore live production case studies or reach out directly to discuss opportunities, consulting, or engineering collaboration.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/work" className="btn-solid group">
              <span>Explore Selected Work</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="btn-outline group">
              <span>Get in touch</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeUp>
      </section>
    </Page>
  );
}
