import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { site } from "@/content";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/writing", label: "Writing" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="container-site">
      <div className="flex items-center justify-between gap-4 border-b border-foreground/20 py-6">
        <Link to="/" className="font-display text-2xl tracking-tight">Sule Malik<span className="text-primary">.</span></Link>
        <nav aria-label="Main" className="hidden gap-8 text-sm md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} activeProps={{ className: "text-primary" }} className="hover:text-primary">{n.label}</Link>
          ))}
        </nav>
        <Link to="/contact" className="btn-solid">Let's talk <span aria-hidden>→</span></Link>
      </div>
      <nav aria-label="Mobile" className="flex gap-5 overflow-x-auto py-3 text-sm md:hidden">
        {nav.map((n) => <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} activeProps={{ className: "text-primary" }}>{n.label}</Link>)}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="container-site mt-24 border-t border-foreground/20 py-10 text-sm text-muted-foreground">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <p>© {new Date().getFullYear()} {site.name}. {site.role}.</p>
        <div className="flex gap-6">
          <a href={`mailto:${site.email}`} className="hover:text-foreground">Email</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (<><Header /><main>{children}</main><Footer /></>);
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em]"><span className="h-px w-10 bg-foreground/60" />{children}</p>;
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="container-site pb-16 pt-16 md:pt-24">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">{title}</h1>
      {children && <div className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div>}
    </section>
  );
}
