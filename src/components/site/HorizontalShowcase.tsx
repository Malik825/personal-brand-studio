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
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
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
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-sm border border-border bg-card">
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
    <div className={alwaysVisible ? "py-20" : "py-20 lg:hidden"}>
      <div className="container-site">
        <Eyebrow>{showcaseCopy.eyebrow}</Eyebrow>
        <p className="mt-6 max-w-xl font-display text-4xl leading-tight md:text-5xl">{showcaseCopy.title}</p>
        <p className="mt-4 text-sm text-muted-foreground">{showcaseCopy.mobileHint}</p>
      </div>

      <ul
        aria-label={showcaseCopy.eyebrow}
        className="scrollbar-none mt-10 flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto px-5 pb-4 md:scroll-pl-20 md:px-20"
      >
        {projects.map((p, i) => (
          <li key={p.slug} className="w-[82vw] max-w-md shrink-0 snap-start">
            <Link to="/work/$slug" params={{ slug: p.slug }} className="group block">
              <div className="overflow-hidden rounded-sm">
                <ProjectVisual project={p} className="border-0" />
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="text-primary">{pad(i + 1)}</span> · {p.category}
              </p>
              <h3 className="mt-2 font-display text-3xl tracking-tight transition-colors group-hover:text-primary">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="container-site mt-6">
        <Link to="/work" className="link-underline group inline-flex items-center gap-2">
          {showcaseCopy.allWork} ({projects.length})
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
