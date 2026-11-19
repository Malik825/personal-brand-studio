import type { Project } from "@/content";
import { cn } from "@/lib/utils";

// Abstract interface placeholder until real project imagery is supplied via the CMS.
export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("tone-" + project.tone, "relative aspect-[4/3] overflow-hidden border border-foreground/10")} aria-hidden>
      <div className={cn("absolute inset-[8%] flex flex-col gap-[6%] rounded-sm bg-[var(--tone-surface)] p-[5%] shadow-sm", className)}>
        <div className="flex gap-1.5"><span className="size-1.5 rounded-full bg-[var(--tone-line)]" /><span className="size-1.5 rounded-full bg-[var(--tone-line)]" /><span className="size-1.5 rounded-full bg-[var(--tone-line)]" /></div>
        <div className="h-[8%] w-1/2 bg-[var(--tone-line)]" />
        <div className="grid flex-1 grid-cols-3 gap-[4%]">
          <div className="col-span-2 bg-[var(--tone-line)] opacity-60" />
          <div className="flex flex-col gap-[8%]"><div className="flex-1 bg-[var(--tone-accent)]" /><div className="flex-1 bg-[var(--tone-line)] opacity-60" /></div>
        </div>
      </div>
    </div>
  );
}
