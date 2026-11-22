import { useState } from "react";
import type { Project } from "@/content";
import { cn } from "@/lib/utils";

/**
 * Project image, or an abstract interface placeholder when no image exists.
 * `fill` makes it fill its parent instead of using a fixed 4:3 frame.
 */
export function ProjectVisual({
  project,
  className,
  fill = false,
  eager = false,
}: {
  project: Project;
  className?: string;
  fill?: boolean;
  eager?: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const frame = fill ? "h-full w-full" : "aspect-[4/3] border border-foreground/10";

  if (project.image && !imageError) {
    return (
      <div className={cn("tone-" + project.tone, "relative overflow-hidden bg-muted/40", frame, className)}>
        <img
          src={project.image}
          alt={project.title}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div className={cn("tone-" + project.tone, "relative overflow-hidden bg-muted/30", frame, className)} aria-hidden>
      <div className="absolute inset-[8%] flex flex-col gap-[6%] rounded-sm bg-[var(--tone-surface)] p-[5%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
        <div className="flex gap-1.5">
          <span className="size-1.5 rounded-full bg-[var(--tone-line)]" />
          <span className="size-1.5 rounded-full bg-[var(--tone-line)]" />
          <span className="size-1.5 rounded-full bg-[var(--tone-line)]" />
        </div>
        <div className="h-[8%] w-1/2 bg-[var(--tone-line)]" />
        <div className="grid flex-1 grid-cols-3 gap-[4%]">
          <div className="col-span-2 bg-[var(--tone-line)] opacity-60" />
          <div className="flex flex-col gap-[8%]">
            <div className="flex-1 bg-[var(--tone-accent)]" />
            <div className="flex-1 bg-[var(--tone-line)] opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
}
