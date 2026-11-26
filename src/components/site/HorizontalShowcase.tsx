import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { Project } from "@/content";
import { showcaseCopy } from "@/content/marquees";
import { ProjectVisual } from "./ProjectVisual";
import { Eyebrow } from "./Layout";
import { cinematicEase } from "@/components/motion/variants";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Selected-work showcase.
 * - lg+ (and motion allowed): the section pins while vertical scroll drives
 *   horizontal travel. Travel distance is measured from the real track width,
 *   so the last panel always lands flush and the page never jumps.
 * - Mobile / reduced motion: a native, snap-aligned horizontal swipe list.
 */
export function HorizontalShowcase({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="selected-work-heading" className="relative border-t border-border">
      <h2 id="selected-work-heading" className="sr-only">
        {showcaseCopy.eyebrow}
      </h2>
      {!reduce && <PinnedTrack projects={projects} />}
      <SwipeTrack projects={projects} alwaysVisible={!!reduce} />
    </section>
  );
}

function PinnedTrack({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    const id = requestAnimationFrame(() => {
      measure();
    });
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(measure);
    });
    ro.observe(track);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // Light smoothing so wheel steps glide rather than stutter.
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const x = useTransform(progress, (v) => -v * distance);
  const imageShift = useTransform(progress, [0, 1], ["-5%", "5%"]);

  return (
    <div
      ref={sectionRef}
      className="relative hidden lg:block"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex h-full w-max will-change-transform">
          {/* Intro panel */}
          <div className="flex h-full w-[40vw] shrink-0 flex-col justify-center pl-20 pr-16">
            <Eyebrow>{showcaseCopy.eyebrow}</Eyebrow>
            <p className="mt-8 font-display text-5xl leading-[1.02] tracking-tight xl:text-6xl">
              {showcaseCopy.title}
            </p>
            <p className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-px w-10 bg-foreground/40" />
              {showcaseCopy.hint} · {pad(projects.length)}
            </p>
          </div>

          {projects.map((p, i) => (
            <Panel key={p.slug} project={p} index={i} total={projects.length} imageShift={imageShift} />
          ))}

          {/* Outro panel */}
          <div className="flex h-full w-[34vw] shrink-0 items-center justify-center border-l border-border">
            <Link to="/work" className="group font-display text-6xl tracking-tight transition-colors hover:text-primary xl:text-7xl">
              {showcaseCopy.allWork}{" "}
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                →
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="pointer-events-none absolute inset-x-20 bottom-10 flex items-center gap-6" aria-hidden>
          <div className="relative h-px flex-1 bg-foreground/15">
            <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({
  project: p,
  index,
  total,
  imageShift,
}: {
  project: Project;
  index: number;
  total: number;
  imageShift: MotionValue<string>;
}) {
  return (
    <article className="flex h-full w-[68vw] shrink-0 flex-col justify-center border-l border-border px-14 py-20 xl:w-[60vw]">
      <Link
        to="/work/$slug"
        params={{ slug: p.slug }}
        className="group flex h-full max-h-[78vh] flex-col justify-center gap-8 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-8 focus-visible:ring-offset-background"
      >
        <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>
            <span className="text-primary">{pad(index + 1)}</span> / {pad(total)}
          </span>
          <span>
            {p.category} · {p.year}
          </span>
        </div>

        {/* Image with inner parallax */}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-border bg-card">
          <motion.div style={{ x: imageShift }} className="absolute inset-y-0 -left-[6%] -right-[6%]">
            <ProjectVisual project={p} fill />
          </motion.div>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-end gap-10">
          <div>
            <span className="block font-display text-5xl leading-none tracking-tight transition-colors duration-300 group-hover:text-primary xl:text-6xl">
              {p.title}
            </span>
            <p className="mt-4 line-clamp-2 max-w-xl leading-relaxed text-muted-foreground">
              {p.summary}
            </p>
          </div>
          <span className="flex items-center gap-2 whitespace-nowrap text-sm font-medium">
            {showcaseCopy.cta}
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5" aria-hidden>
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

function SwipeTrack({ projects, alwaysVisible }: { projects: Project[]; alwaysVisible: boolean }) {
  return (
    <div className={alwaysVisible ? "py-16 md:py-20" : "py-16 md:py-20 lg:hidden"}>
      <div className="container-site">
        <Eyebrow>{showcaseCopy.eyebrow}</Eyebrow>
        <p className="mt-6 max-w-xl font-display text-4xl leading-tight md:text-5xl">{showcaseCopy.title}</p>
        <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
          {projects.length} Selected Case Studies
        </p>
      </div>

      <ol className="container-site mt-10 lg:grid lg:grid-cols-2 lg:gap-8">
        {projects.map((p, i) => (
          <li
            key={p.slug}
            // Sticky stacking: each card settles slightly lower than the last,
            // so earlier cards peek out above like a deck. Pure CSS — scroll stays native.
            className="sticky pb-6 lg:static lg:pb-0"
            style={{ top: `${16 + i * 10}px` }}
          >
            <Link
              to="/work/$slug"
              params={{ slug: p.slug }}
              className="group block rounded-3xl border border-border bg-card p-2.5 outline-none transition-colors duration-300 hover:border-foreground/25 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="overflow-hidden rounded-2xl">
                <ProjectVisual project={p} eager={i === 0} className="border-0" />
              </div>
              <div className="space-y-2 px-2 pb-2 pt-4">
                <p className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span>
                    <span className="font-semibold text-primary">{pad(i + 1)}</span> · {p.category}
                  </span>
                  <span>{p.year}</span>
                </p>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-display text-2xl tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                    {p.title}
                  </h3>
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-sm transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="container-site mt-4">
        <Link to="/work" className="link-underline group inline-flex items-center gap-2 text-sm font-medium">
          {showcaseCopy.allWork} ({projects.length})
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
