import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { Project } from "@/content";
import { ProjectVisual } from "./ProjectVisual";
import { Eyebrow } from "./Layout";
import { cinematicEase } from "@/components/motion/variants";

interface HorizontalProjectsProps {
  projects: Project[];
}

export function HorizontalProjects({ projects }: HorizontalProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate percentage to slide across based on project count
  // e.g. 8 projects, cards take ~60vw each
  const totalSlides = Math.min(projects.length, 6);
  const slideDistance = totalSlides > 1 ? (totalSlides - 1) * 70 : 0;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${slideDistance}%`]);
  const progressPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const displayProjects = projects.slice(0, 6);

  return (
    <section className="relative border-t border-border bg-card/40">
      {/* ================= DESKTOP PINNED HORIZONTAL SCROLL ================= */}
      <div
        ref={containerRef}
        className="hidden lg:block relative"
        style={{
          // Pin height proportional to number of slides so scroll pace feels natural
          height: `${totalSlides * 90}vh`,
        }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden py-12">
          {/* Header & Section Title */}
          <div className="container-site flex items-end justify-between">
            <div>
              <Eyebrow>Selected Work</Eyebrow>
              <h2 className="mt-3 font-display text-4xl leading-tight xl:text-5xl">
                Building real solutions for modern businesses.
              </h2>
            </div>
            <div className="flex items-center gap-6">
              {/* Progress Bar & Counter */}
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">01</span>
                <div className="relative h-1 w-28 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary rounded-full"
                    style={{ width: progressPercent }}
                  />
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  0{totalSlides}
                </span>
              </div>
              <Link
                to="/work"
                className="link-underline text-sm font-medium hover:text-primary transition-colors"
              >
                All projects ({projects.length}) →
              </Link>
            </div>
          </div>

          {/* Horizontal Project Track */}
          <div className="my-auto overflow-hidden pl-12 xl:pl-20">
            {shouldReduceMotion ? (
              <div className="flex gap-10 overflow-x-auto py-6">
                {displayProjects.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            ) : (
              <motion.div
                style={{ x }}
                className="flex gap-12 will-change-transform py-4"
              >
                {displayProjects.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Bottom helper cue */}
          <div className="container-site flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-primary" />
              Scroll to explore projects horizontally
            </span>
            <span>Hover card to interact · Click to read case study</span>
          </div>
        </div>
      </div>

      {/* ================= MOBILE NATIVE HORIZONTAL SWIPE ================= */}
      <div className="block lg:hidden py-16 container-site">
        <div className="flex flex-col gap-4">
          <Eyebrow>Selected Work</Eyebrow>
          <h2 className="font-display text-3xl leading-tight">
            Building real solutions for modern businesses.
          </h2>
          <p className="text-sm text-muted-foreground">
            Swipe to explore selected platforms and engineering case studies.
          </p>
        </div>

        {/* Native Touch Horizontal Carousel */}
        <div className="mt-8 -mx-5 flex gap-5 overflow-x-auto px-5 pb-6 pt-2 snap-x snap-mandatory scrollbar-none">
          {displayProjects.map((p) => (
            <div key={p.slug} className="w-[84vw] max-w-md shrink-0 snap-center">
              <ProjectCard project={p} isMobile />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Showing {displayProjects.length} of {projects.length} projects
          </span>
          <Link to="/work" className="link-underline text-sm font-medium">
            View full index →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, isMobile = false }: { project: Project; isMobile?: boolean }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: p.slug }}
      className={`group relative flex flex-col justify-between rounded-xl border border-border/80 bg-background/90 p-6 md:p-8 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md ${
        isMobile ? "w-full" : "w-[65vw] max-w-3xl shrink-0"
      }`}
    >
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        {/* Project Visual Container with micro-scale on hover */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-card">
          <ProjectVisual
            project={p}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Info Column */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{p.category}</span>
              <span>{p.year}</span>
            </div>

            <h3 className="mt-3 font-display text-2xl md:text-3xl font-medium tracking-tight group-hover:text-primary transition-colors">
              {p.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {p.summary}
            </p>

            {/* Stack Tags */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-foreground/80 font-normal"
                >
                  {tech}
                </span>
              ))}
              {p.stack.length > 3 && (
                <span className="rounded-full bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground">
                  +{p.stack.length - 3}
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            <span>Explore case study</span>
            <span
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
              aria-hidden
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
