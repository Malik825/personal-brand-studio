import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import portrait from "@/assets/profile.webp";
import portraitMobile from "@/assets/profile-mobile.webp";
import { Eyebrow, Page } from "@/components/site/Layout";
import { HorizontalShowcase } from "@/components/site/HorizontalShowcase";
import { ScrollType } from "@/components/motion/ScrollType";
import { InfiniteMarquee } from "@/components/site/InfiniteMarquee";
import { FadeUp } from "@/components/motion/FadeUp";
import { cinematicEase } from "@/components/motion/variants";
import { HomeSkeleton } from "@/components/site/Skeletons";
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
      { property: "og:url", content: "https://sulemalik.com/" },
      { property: "og:image", content: "https://sulemalik.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sule Malik — Product-minded software engineer" },
      {
        name: "twitter:description",
        content:
          "I build digital products with engineering precision and product thinking.",
      },
      { name: "twitter:image", content: "https://sulemalik.com/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://sulemalik.com/" },
      {
        rel: "preload",
        as: "image",
        href: portraitMobile,
        type: "image/webp",
        fetchpriority: "high",
        media: "(max-width: 1023px)",
      },
      {
        rel: "preload",
        as: "image",
        href: portrait,
        type: "image/webp",
        fetchpriority: "high",
        media: "(min-width: 1024px)",
      },
    ],
  }),
  component: Home,
  pendingComponent: HomeSkeleton,
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
  const ringParallaxY = useTransform(heroScroll, [0, 1], ["0%", "-45%"]);
  const portraitParallaxY = useTransform(heroScroll, [0, 1], ["0%", "8%"]);

  return (
    <Page>
      {/* ================= HERO SECTION ================= */}
      <section
        ref={heroRef}
        className="relative overflow-hidden container-site pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16"
      >
        {/* Soft decorative glow and thin parallax ring */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              style={{ y: bgParallaxY }}
              className="pointer-events-none absolute -top-24 right-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
              aria-hidden
            />
            <motion.div
              style={{ y: ringParallaxY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, delay: 0.5, ease: cinematicEase }}
              className="pointer-events-none absolute -right-24 top-1/3 -z-10 hidden size-[28rem] rounded-full border border-primary/15 lg:block"
              aria-hidden
            />
          </>
        )}

        {/* ---------------- MOBILE HERO: IMMERSIVE PORTRAIT CARD (< lg) ---------------- */}
        <div className="block lg:hidden">
          <motion.figure
            style={shouldReduceMotion ? {} : { y: portraitParallaxY }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: cinematicEase }}
            className="group relative overflow-hidden rounded-3xl min-h-[32rem] sm:min-h-[36rem] flex flex-col justify-end p-6 sm:p-9 shadow-xl border border-border/40"
          >
            <motion.img
              src={portraitMobile}
              alt="Sule Malik"
              width={640}
              height={853}
              fetchPriority="high"
              decoding="async"
              initial={shouldReduceMotion ? false : { scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: cinematicEase }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Scrim gradient for text legibility */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"
              aria-hidden
            />
            <figcaption className="relative z-10 text-white">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-white/80">
                Hi, I'm Sule
              </p>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl leading-[1.12] tracking-tight text-white">
                I build digital products with engineering precision and product{" "}
                <em className="italic">thinking.</em>
              </h1>
              <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-white/85">
                A product-minded software engineer based in Asante Mampong, Ghana — architecting
                high-performance web systems, fluid mobile apps, and scalable commerce platforms.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/work"
                  className="btn-solid bg-white text-black hover:bg-white/90 shadow-sm"
                >
                  <span>View my work</span>
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/30 backdrop-blur-sm px-4 py-2 text-xs text-white/90 transition-transform duration-200 active:scale-95 hover:border-white/60"
                >
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                  </span>
                  Open to opportunities
                </Link>
              </div>
            </figcaption>
          </motion.figure>
        </div>

        {/* ---------------- DESKTOP HERO: CLEAN EDITORIAL SPLIT (>= lg) ---------------- */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.12fr] lg:items-center lg:gap-14 xl:gap-20">
          <div>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: cinematicEase }}
            >
              <Eyebrow>{site.role}</Eyebrow>
            </motion.div>

            <h1 className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.4rem] leading-[1.12] sm:leading-[1.08] tracking-tight text-foreground">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={shouldReduceMotion ? false : { y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: cinematicEase }}
                >
                  I build digital products
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={shouldReduceMotion ? false : { y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.32, ease: cinematicEase }}
                >
                  with engineering precision
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={shouldReduceMotion ? false : { y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.44, ease: cinematicEase }}
                >
                  and product <em className="text-primary italic">thinking.</em>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.56, ease: cinematicEase }}
              className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-foreground/85"
            >
              I'm Sule Malik — a product-minded software engineer based in Asante Mampong, Ghana. I architect and engineer high-performance web systems, fluid mobile apps, and scalable digital commerce platforms that solve real business problems.
            </motion.p>

            <motion.ul
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.68, ease: cinematicEase }}
              className="mt-7 flex flex-wrap gap-2"
              aria-label="Core technologies"
            >
              {site.stack.map((t, idx) => (
                <motion.li
                  key={t}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + idx * 0.05, ease: cinematicEase }}
                  className="rounded-full border border-foreground/25 bg-background/50 px-4 py-1.5 text-sm transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  {t}
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <motion.span
                className="inline-flex"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: cinematicEase }}
              >
                <Link to="/work" className="btn-solid group">
                  <span>View my work</span>
                  <span
                    className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </motion.span>
              <motion.span
                className="inline-flex"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: cinematicEase }}
              >
                <Link to="/contact" className="btn-outline group">
                  <span>Let's work together</span>
                  <span
                    className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </motion.span>
            </div>
          </div>

          <motion.figure
            style={shouldReduceMotion ? {} : { y: portraitParallaxY }}
            className="relative w-full max-w-md sm:max-w-lg lg:max-w-[520px] xl:max-w-[580px] mx-auto lg:mx-0 lg:justify-self-end will-change-transform"
          >
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.6 }
              }
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              transition={{ duration: 1.15, delay: 0.35, ease: cinematicEase }}
              className="overflow-hidden portrait-editorial aspect-[4/5] w-full"
            >
              <motion.img
                src={portrait}
                alt="Sule Malik"
                width={960}
                height={1280}
                fetchPriority="high"
                decoding="async"
                initial={shouldReduceMotion ? false : { scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.3, delay: 0.35, ease: cinematicEase }}
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.figcaption
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.05, ease: cinematicEase }}
              className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-card/95 backdrop-blur-sm px-4 py-2 text-xs border border-border"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              <span>Open to opportunities</span>
            </motion.figcaption>
          </motion.figure>
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
              <FadeUp
                key={e.role}
                as="li"
                delay={0.08 * idx}
                className="group grid gap-2 py-7 transition-colors duration-200 hover:bg-card/40 px-2 -mx-2 rounded-lg md:grid-cols-[8rem_1fr]"
              >
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {e.period}
                </span>
                <div>
                  <p className="font-medium text-lg group-hover:text-primary transition-colors">
                    {e.role} · <span className="text-muted-foreground font-normal">{e.org}</span>
                  </p>
                  <p className="mt-1 text-muted-foreground leading-relaxed">{e.note}</p>
                </div>
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
