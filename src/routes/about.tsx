import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import portrait from "@/assets/profile.png";
import { Eyebrow, Page } from "@/components/site/Layout";
import { FadeUp } from "@/components/motion/FadeUp";
import { InfiniteMarquee } from "@/components/site/InfiniteMarquee";
import { cinematicEase } from "@/components/motion/variants";
import { getAbout, getSite } from "@/content";
import { philosophyMarquee } from "@/content/marquees";
import { ArrowRight, MapPin, Globe, Layers, Sparkles } from "lucide-react";

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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

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
      category: "Frontend & Mobile",
      items: ["React 19", "React Native (Expo)", "TypeScript", "Next.js", "TanStack Start", "Tailwind CSS"],
    },
    {
      category: "Architecture & Performance",
      items: ["Design Systems", "Web Vitals Optimization", "Headless CMS", "State Machines", "Offline-Resilient Sync"],
    },
    {
      category: "Data & Cloud Infrastructure",
      items: ["Supabase (PostgreSQL)", "Edge Functions", "REST & GraphQL APIs", "Paystack", "Webhooks & Automation"],
    },
  ];

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
                  <p>{para}</p>
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

          {/* Architectural Portrait Showcase */}
          <FadeUp delay={0.15}>
            <div className="relative mx-auto w-full max-w-md lg:max-w-[480px]">
              <div className="overflow-hidden portrait-editorial aspect-[4/5] w-full shadow-2xl ring-1 ring-border/80 bg-muted/20">
                <motion.img
                  src={portrait}
                  alt="Sule Malik"
                  width={960}
                  height={1280}
                  initial={shouldReduceMotion ? false : { scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.1, ease: cinematicEase }}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Location & Status Floating Badge */}
              <div className="absolute -bottom-4 sm:-bottom-5 left-4 right-4 sm:left-6 sm:right-6 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md p-4 shadow-lg flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-mono font-medium text-foreground truncate">
                      {site?.location || "Asante Mampong, Kumasi, Ghana"}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Remote Worldwide · GMT/EST/CET
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-mono font-medium text-primary shrink-0">
                  <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                  Active
                </span>
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
            <Eyebrow>Technical Capabilities</Eyebrow>
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
                        <span className="size-1.5 rounded-full bg-primary shrink-0" />
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
