import type { ReactNode } from "react";
import { Page } from "./Layout";

// Route-level loading placeholders. TanStack Router only shows these when a
// loader is slow (pendingMs), so fast navigations never flash a skeleton.

const bar = "skeleton-shimmer rounded-sm";

function IntroSkeleton() {
  return (
    <div className="container-site pb-16 pt-16 md:pt-24" aria-hidden>
      <div className={`${bar} h-3 w-32`} />
      <div className={`${bar} mt-8 h-14 w-full max-w-3xl`} />
      <div className={`${bar} mt-4 h-14 w-2/3 max-w-2xl`} />
    </div>
  );
}

function Busy({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Page>
      <div role="status" aria-live="polite">
        <span className="sr-only">{label}</span>
        {children}
      </div>
    </Page>
  );
}

export function ProjectListSkeleton() {
  return (
    <Busy label="Loading projects">
      <IntroSkeleton />
      <div className="container-site space-y-16" aria-hidden>
        {[0, 1].map((i) => (
          <div key={i} className="grid gap-10 border-t border-border pt-14 lg:grid-cols-2">
            <div className={`${bar} aspect-[4/3] rounded-xl`} />
            <div className="space-y-4 self-center">
              <div className={`${bar} h-3 w-40`} />
              <div className={`${bar} h-12 w-2/3`} />
              <div className={`${bar} h-4 w-full max-w-md`} />
              <div className={`${bar} h-4 w-4/5 max-w-sm`} />
            </div>
          </div>
        ))}
      </div>
    </Busy>
  );
}

export function CaseStudySkeleton() {
  return (
    <Busy label="Loading case study">
      <div className="container-site max-w-5xl mx-auto">
        <IntroSkeleton />
      </div>
      <div className="w-full my-6 sm:my-10 md:my-14 border-y border-border/80" aria-hidden>
        <div className={`${bar} aspect-[16/9] w-full`} />
      </div>
    </Busy>
  );
}

export function ArticleListSkeleton() {
  return (
    <Busy label="Loading articles">
      <IntroSkeleton />
      <div className="container-site divide-y divide-border border-y border-border" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div key={i} className="grid gap-4 py-10 md:grid-cols-[12rem_1fr]">
            <div className={`${bar} h-3 w-28`} />
            <div className="space-y-3">
              <div className={`${bar} h-8 w-2/3`} />
              <div className={`${bar} h-4 w-full max-w-xl`} />
            </div>
          </div>
        ))}
      </div>
    </Busy>
  );
}

export function ArticleSkeleton() {
  return (
    <Busy label="Loading article">
      <div className="container-site max-w-3xl pt-16" aria-hidden>
        <div className={`${bar} h-3 w-24`} />
        <div className={`${bar} mt-10 h-12 w-full`} />
        <div className={`${bar} mt-3 h-12 w-3/4`} />
        <div className="mt-12 space-y-4 border-t border-border pt-12">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`${bar} h-4 ${i === 4 ? "w-2/3" : "w-full"}`} />
          ))}
        </div>
      </div>
    </Busy>
  );
}
