import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content";
import { cinematicEase } from "@/components/motion/variants";
import { cn } from "@/lib/utils";
import { EmailAction } from "./EmailAction";
import { GithubIcon, LinkedinIcon } from "@/components/icons/TechIcons";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/writing", label: "Writing" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // At or near top of the page
      if (currentScrollY <= 40) {
        setIsVisible(true);
        setIsFixed(false);
      } else {
        setIsFixed(true);
        // Scrolling down -> hide navbar
        if (delta > 6) {
          setIsVisible(false);
        }
        // Scrolling up ("scroll top") -> reveal navbar
        else if (delta < -6) {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isFixed
          ? isVisible
            ? "translate-y-0 border-b border-border/60 bg-background/85 backdrop-blur-md shadow-xs"
            : "-translate-y-full border-b border-transparent bg-background/85"
          : "translate-y-0 border-b-0 bg-transparent"
      )}
    >
      <div className="container-site">
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-300 ease-out",
            isFixed
              ? "py-2.5 sm:py-3"
              : "border-b border-foreground/20 py-5 sm:py-6"
          )}
        >
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
          <div className="flex items-center gap-2 sm:gap-3">
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
              <span>Let&apos;s talk</span>
              <span
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>
        <nav
          aria-label="Mobile"
          className={cn(
            "flex gap-5 overflow-x-auto text-sm md:hidden scrollbar-none transition-all duration-300",
            isFixed ? "py-1.5" : "py-2.5"
          )}
        >
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
    </header>
  );
}

export function Footer() {
  return (
    <footer className="container-site mt-24 border-t border-foreground/20 pt-10 pb-28 sm:pb-16 text-sm text-muted-foreground">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} {site.name}. {site.role}.</p>
        <div className="flex flex-wrap items-center gap-6 sm:gap-7 md:pr-48 lg:pr-56">
          <EmailAction email={site.email} variant="inline" label="Email" />
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-primary"
            aria-label="LinkedIn profile (opens in a new tab)"
          >
            <LinkedinIcon className="size-4 shrink-0" />
            <span>LinkedIn</span>
          </a>
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-primary"
              aria-label="GitHub profile (opens in a new tab)"
            >
              <GithubIcon className="size-4 shrink-0" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* WCAG 2.1 AA Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Header />
      <motion.main
        id="main-content"
        tabIndex={-1}
        className="flex-1 outline-none"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: cinematicEase }}
      >
        {children}
      </motion.main>
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
