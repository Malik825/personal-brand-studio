import { useRef, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { Project } from "@/content";
import { ProjectVisual } from "./ProjectVisual";
import { Eyebrow } from "./Layout";
import { FadeUp } from "@/components/motion/FadeUp";
import { cinematicEase } from "@/components/motion/variants";

/**
 * Editorial project index: numbered rows with a cursor-following image
 * preview on pointer devices (lg+). On small screens each row shows an
 * inline thumbnail instead, so no hover is required.
 */
export function SelectedWork({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.6 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section className="border-t border-border bg-card/40">
      <div className="container-site py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <FadeUp>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-6 max-w-xl font-display text-4xl leading-tight md:text-5xl">
              Building real solutions for modern businesses.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link to="/work" className="link-underline group inline-flex items-center gap-2">
              <span>All projects ({projects.length})</span>
              <span
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </Link>
          </FadeUp>
        </div>

        <div
          ref={listRef}
          onMouseMove={onMove}
          onMouseLeave={() => setActive(null)}
          className="relative mt-14 border-t border-foreground/20"
        >
          <ul>
            {projects.map((p, i) => (
              <FadeUp key={p.slug} as="li" delay={Math.min(i, 5) * 0.05} yOffset={16}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-foreground/20 py-6 outline-none transition-colors duration-300 focus-visible:bg-background/60 md:grid-cols-[4rem_1fr_14rem_5rem_2rem] md:py-8"
                >
                  <span className="font-display text-sm text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="flex items-center gap-4">
                    <span className="block w-20 shrink-0 overflow-hidden rounded-md lg:hidden">
                      <ProjectVisual project={p} />
                    </span>
                    <span className="font-display text-2xl tracking-tight transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-primary md:text-4xl xl:text-5xl">
                      {p.title}
                    </span>
                  </span>

                  <span className="hidden text-sm text-muted-foreground md:block">
                    {p.category}
                  </span>
                  <span className="hidden text-sm text-muted-foreground md:block">{p.year}</span>
                  <span
                    className="justify-self-end text-lg transition-transform duration-300 ease-out group-hover:-rotate-45 group-hover:text-primary"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </FadeUp>
            ))}
          </ul>

          {/* Floating preview — desktop pointer devices only, decorative */}
          {!reduce && (
            <motion.div
              aria-hidden
              style={{ x: springX, y: springY }}
              className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
            >
              <AnimatePresence>
                {active !== null && projects[active] && (
                  <motion.div
                    key={projects[active].slug}
                    initial={{ opacity: 0, scale: 0.92, clipPath: "inset(12% 12% 12% 12%)" }}
                    animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: cinematicEase }}
                    className="absolute w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-border xl:w-96"
                  >
                    <ProjectVisual project={projects[active]} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
