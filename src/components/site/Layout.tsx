import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content";
import { cinematicEase } from "@/components/motion/variants";
import { assistantCopy } from "@/content/assistant";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/writing", label: "Writing" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <div className="container-site">
      <div className="flex items-center justify-between gap-4 border-b border-foreground/20 py-6">
        <Link
          to="/"
          className="group font-display text-2xl tracking-tight transition-transform duration-200 hover:scale-[1.01]"
        >
          Sule Malik<span className="text-primary transition-colors group-hover:text-primary/80">.</span>
        </Link>
        <nav aria-label="Main" className="hidden gap-8 text-sm md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="group relative py-1 outline-none focus-visible:text-primary"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={
                      isActive
                        ? "font-medium text-primary"
                        : "text-foreground/80 transition-colors duration-200 group-hover:text-primary"
                    }
                  >
                    {n.label}
                  </span>
                  {/* Hover underline: grows from the left, retracts to the right */}
                  <span
                    aria-hidden
                    className={
                      "absolute inset-x-0 -bottom-0.5 h-px bg-primary transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
                      (isActive
                        ? "scale-x-100"
                        : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100")
                    }
                  />
                </>
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
              );
            }}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:text-foreground cursor-pointer"
            aria-label="Open command palette"
          >
            <span>Search</span>
            <kbd className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              ⌘K
            </kbd>
          </button>
          <Link to="/contact" className="btn-solid group">
            <span>Let's talk</span>
            <span
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </div>
      <nav aria-label="Mobile" className="flex gap-5 overflow-x-auto py-3 text-sm md:hidden scrollbar-none">
        {nav.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: n.to === "/" }}
            activeProps={{ className: "text-primary font-medium" }}
            className="shrink-0 transition-colors hover:text-primary"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );

  return <header className="w-full">{content}</header>;
}

export function Footer() {
  return (
    <footer className="container-site mt-24 border-t border-foreground/20 py-10 text-sm text-muted-foreground">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <p>© {new Date().getFullYear()} {site.name}. {site.role}.</p>
        <div className="flex gap-6">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors duration-200 hover:text-primary"
          >
            Email
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-200 hover:text-primary"
          >
            LinkedIn
          </a>
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 hover:text-primary"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground/80">
      <span className="h-px w-10 bg-foreground/60" />
      {children}
    </p>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="container-site pb-16 pt-16 md:pt-24">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
        {title}
      </h1>
      {children && (
        <div className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {children}
        </div>
      )}
    </section>
  );
}
