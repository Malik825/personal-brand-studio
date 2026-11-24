import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import portrait from "@/assets/profile.png";
import { Eyebrow, Page } from "@/components/site/Layout";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { HorizontalShowcase } from "@/components/site/HorizontalShowcase";
import { ScrollType } from "@/components/motion/ScrollType";
import { InfiniteMarquee } from "@/components/site/InfiniteMarquee";
import { FadeUp } from "@/components/motion/FadeUp";
import { cinematicEase } from "@/components/motion/variants";
import { getExperience, getProjects, getSite } from "@/content";
import { closingScrollType, philosophyMarquee, techMarquee } from "@/content/marquees";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [site, projects, experience] = await Promise.all([
      getSite(),
      getProjects(),
      getExperience(),
    ]);
    return { site, projects, experience };
  },
  head: () => ({
    meta: [
      { title: "Sule Malik — Product-minded software engineer" },
      {
        name: "description",
        content:
          "I build digital products with engineering precision and product thinking. React, Next.js, Angular and TypeScript.",
      },
      { property: "og:title", content: "Sule Malik — Product-minded software engineer" },
      {
        property: "og:description",
        content:
          "I build digital products with engineering precision and product thinking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { site, projects, experience } = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle Hero background parallax
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgParallaxY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const portraitParallaxY = useTransform(heroScroll, [0, 1], ["0%", "8%"]);

  // Featured bento tiles: Roam and Urban Vault when present, else first two projects
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const slugPicks = ["roam", "urban-vault"]
    .map((s) => bySlug.get(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const featuredProjects = slugPicks.length >= 2 ? slugPicks : projects.slice(0, 2);

  return (
    <Page>
      {/* ================= HERO: BENTO GRID ================= */}
      <section
        ref={heroRef}
        className="relative overflow-hidden container-site pb-20 pt-10 lg:pt-16"
      >
        {/* Soft decorative glow drifting behind the grid */}
        {!shouldReduceMotion && (
          <motion.div
            style={{ y: bgParallaxY }}
            className="pointer-events-none absolute -top-24 right-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
            aria-hidden
          />
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {/* ---- Portrait tile with overlaid intro ---- */}
          <motion.figure
            style={shouldReduceMotion ? {} : { y: portraitParallaxY }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: cinematicEase }}
            className="group relative overflow-hidden rounded-3xl md:col-span-2 lg:col-span-5 lg:row-span-2 min-h-[30rem] lg:min-h-[36rem]"
          >
            <img
              src={portrait}
              alt="Sule Malik"
              width={960}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            {/* Legibility scrim */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              aria-hidden
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-7 sm:p-9 text-background">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-background/80">
                Hi, I'm Sule
              </p>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.1] tracking-tight">
                I build digital products with engineering precision and product{" "}
                <em className="italic">thinking.</em>
              </h1>
              <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-background/85">
                A product-minded software engineer based in Asante Mampong, Ghana — architecting
                high-performance web systems, fluid mobile apps, and scalable commerce platforms.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span>View my work</span>
                  <span aria-hidden>→</span>
                </Link>
                <span className="inline-flex items-center gap-2 rounded-full border border-background/40 px-4 py-2 text-xs text-background/90">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                  </span>
                  Open to opportunities
                </span>
              </div>
            </figcaption>
          </motion.figure>

          {/* ---- Stat tile: projects shipped ---- */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: cinematicEase }}
            className="rounded-3xl border border-border bg-card p-7 sm:p-8 md:col-span-1 lg:col-span-3 flex flex-col justify-between"
          >
            <p className="font-display text-6xl sm:text-7xl leading-none text-primary">
              {projects.length}
            </p>
            <div className="mt-6">
              <p className="font-display text-2xl leading-tight">projects shipped</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Real products. Happy users. And counting.
              </p>
            </div>
          </motion.div>

          {/* ---- Momentum chart tile ---- */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: cinematicEase }}
            className="rounded-3xl border border-border bg-card p-7 sm:p-8 md:col-span-1 lg:col-span-4"
          >
            <div className="flex items-start justify-between">
              <p className="font-medium">Building momentum</p>
              <span className="text-muted-foreground" aria-hidden>
                ↗
              </span>
            </div>
            <MomentumChart />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground" aria-hidden>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </motion.div>

          {/* ---- Tech stack tile ---- */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: cinematicEase }}
            className="rounded-3xl bg-primary p-7 sm:p-8 text-primary-foreground md:col-span-2 lg:col-span-7"
          >
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/75">
              Tech stack
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Core technologies">
              {site.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-background px-4 py-1.5 text-sm font-medium text-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ---- Featured project tiles ---- */}
          {featuredProjects.map((p, idx) => (
            <motion.div
              key={p.slug}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.52 + idx * 0.1, ease: cinematicEase }}
              className={
                idx === 1
                  ? "rounded-3xl bg-primary p-7 sm:p-9 text-primary-foreground md:col-span-1 lg:col-span-6"
                  : "rounded-3xl border border-border bg-card p-7 sm:p-9 md:col-span-1 lg:col-span-6"
              }
            >
              <div className="group grid h-full gap-7 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-center">
                <div className="flex h-full flex-col justify-between gap-6">
                  <div>
                    <p
                      className={
                        idx === 1
                          ? "font-display text-3xl sm:text-4xl"
                          : "font-display text-3xl sm:text-4xl text-foreground"
                      }
                    >
                      {p.title}
                    </p>
                    <p
                      className={
                        idx === 1
                          ? "mt-3 text-sm sm:text-base leading-relaxed text-primary-foreground/85"
                          : "mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground"
                      }
                    >
                      {p.summary}
                    </p>
                  </div>
                  <Link
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className={
                      idx === 1
                        ? "inline-flex w-fit items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-transform duration-300 hover:-translate-y-0.5"
                        : "inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
                    }
                  >
                    <span>View project</span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
                <ProjectVisual
                  project={p}
                  className="rounded-2xl shadow-lg"
                  imageClassName="group-hover:scale-[1.03]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TECHNOLOGY MARQUEE ================= */}
      <section className="border-y border-border bg-card/30">
        <InfiniteMarquee items={techMarquee} variant="tech" speedSeconds={32} label="Technologies" />
      </section>

      {/* ================= HORIZONTAL PROJECT SHOWCASE ================= */}
      <HorizontalShowcase projects={projects} />

      {/* ================= PHILOSOPHY MARQUEE ================= */}
      <section className="border-y border-border bg-card/40">
        <InfiniteMarquee items={philosophyMarquee} variant="philosophy" reverse speedSeconds={40} label="Engineering philosophy" />
      </section>

      {/* ================= PHILOSOPHY STATEMENT SECTION ================= */}
      <section className="container-site grid gap-12 border-b border-border py-24 lg:grid-cols-[1fr_2.2fr]">
        <FadeUp>
          <Eyebrow>Philosophy</Eyebrow>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="font-display text-3xl leading-snug md:text-4xl text-foreground">
            I care about turning complex ideas into simple, scalable products that people love —
            writing code with the user, the team and the business in mind.
          </p>
          <div className="mt-8">
            <Link to="/about" className="link-underline inline-flex items-center gap-2 group">
              <span>Learn more about me</span>
              <span
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* ================= EXPERIENCE SECTION ================= */}
      <section className="container-site grid gap-12 border-b border-border py-24 lg:grid-cols-[1fr_2.2fr]">
        <FadeUp>
          <Eyebrow>Experience</Eyebrow>
        </FadeUp>
        <div>
          <ol className="divide-y divide-border border-y border-border">
            {experience.map((e, idx) => (
              <FadeUp key={e.role} delay={0.08 * idx}>
                <li className="group grid gap-2 py-7 transition-colors duration-200 hover:bg-card/40 px-2 -mx-2 rounded-lg md:grid-cols-[8rem_1fr]">
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {e.period}
                  </span>
                  <div>
                    <p className="font-medium text-lg group-hover:text-primary transition-colors">
                      {e.role} · <span className="text-muted-foreground font-normal">{e.org}</span>
                    </p>
                    <p className="mt-1 text-muted-foreground leading-relaxed">{e.note}</p>
                  </div>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= DECORATIVE SCROLL TYPE ================= */}
      <ScrollType text={closingScrollType} className="pt-20" />

      {/* ================= CALL TO ACTION SECTION ================= */}
      <section className="relative overflow-hidden container-site py-28 text-center">
        <FadeUp>
          <h2 className="mx-auto max-w-3xl font-display text-5xl leading-tight md:text-6xl">
            Have a product in mind? <em className="text-primary italic">Let's build it.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            Available for select frontend engineering roles, architectural consulting, and high-impact digital products.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-solid group">
              <span>Start a conversation</span>
              <span
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </Link>
            <a href={`mailto:${site.email}`} className="btn-outline group">
              <span>{site.email}</span>
              <span
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden
              >
                ↗
              </span>
            </a>
          </div>
        </FadeUp>
      </section>
    </Page>
  );
}

/** Small decorative line chart for the "Building momentum" bento tile. */
function MomentumChart() {
  const points = "0,84 40,66 80,72 120,44 160,52 200,24 240,8";
  return (
    <svg
      viewBox="0 0 240 96"
      className="mt-4 w-full text-primary"
      role="img"
      aria-label="Decorative upward trend line"
    >
      <defs>
        <linearGradient id="momentum-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${points} 240,96 0,96`} fill="url(#momentum-fill)" />
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.split(" ").map((pair) => {
        const [x, y] = pair.split(",");
        return <circle key={pair} cx={x} cy={y} r="3.5" fill="currentColor" />;
      })}
    </svg>
  );
}
