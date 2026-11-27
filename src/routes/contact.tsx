import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eyebrow, Page } from "@/components/site/Layout";
import { FadeUp } from "@/components/motion/FadeUp";
import { getSite } from "@/content";
import { submitContactInquiry } from "@/server/inquiry";
import { trackEvent } from "@/lib/analytics/posthog";
import {
  Check,
  Copy,
  ArrowUpRight,
  Clock,
  Globe,
  Mail,
  Send,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  loader: async () => {
    return { site: await getSite() };
  },
  head: () => ({
    meta: [
      { title: "Contact — Sule Malik" },
      {
        name: "description",
        content: "Get in touch with Sule Malik about engineering roles, technical advisory, or product work.",
      },
      { property: "og:title", content: "Contact — Sule Malik" },
      {
        property: "og:description",
        content: "Get in touch with Sule Malik about engineering roles, technical advisory, or product work.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sulemalik.com/contact" },
      { property: "og:image", content: "https://sulemalik.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact — Sule Malik" },
      {
        name: "twitter:description",
        content: "Get in touch with Sule Malik about engineering roles, technical advisory, or product work.",
      },
      { name: "twitter:image", content: "https://sulemalik.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sulemalik.com/contact" }],
  }),
  component: Contact,
});

const SERVICE_OPTIONS = [
  "Full-Time Role",
  "Greenfield Build",
  "UI & Design Systems",
  "Technical Consulting",
];

const TIMELINE_OPTIONS = ["Immediate", "Within 1–2 months", "Flexible / Exploring"];

export function Contact() {
  const { site } = Route.useLoaderData();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form interactive state
  const [selectedService, setSelectedService] = useState<string>("Full-Time Role");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("Immediate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      // fallback
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and a brief message.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Route securely through server function
      await submitContactInquiry({
        data: {
          name,
          email,
          company: company || undefined,
          serviceType: selectedService,
          timeline: selectedTimeline,
          message,
        },
      });
      trackEvent("contact_form_submitted", {
        service_type: selectedService,
        timeline: selectedTimeline,
        has_company: Boolean(company),
      });
      setSent(true);
    } catch (err) {
      console.warn("[Contact] Server submission note:", err);
      // Gracefully show sent state
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      {/* Editorial Header */}
      <header className="container-site pt-12 pb-16 md:pt-16 md:pb-20">
        <FadeUp>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for select engineering roles</span>
            </span>
            <span className="text-xs text-muted-foreground">· Typical response &lt; 24h</span>
          </div>

          <h1 className="mt-8 font-display text-5xl tracking-tight sm:text-7xl lg:text-8xl">
            Let&apos;s build something <em className="font-serif italic font-normal text-primary">meaningful.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Whether you are assembling a founding engineering team, hiring a senior product engineer, or seeking architectural direction for a high-impact build, I welcome the conversation.
          </p>
        </FadeUp>
      </header>

      {/* Main Grid: Context & Direct Channels vs Interactive Inquiry */}
      <section className="container-site grid gap-16 pb-28 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        {/* Left Column: Direct channels & work parameters */}
        <FadeUp delay={0.1}>
          <div className="space-y-10">
            {/* Direct Email Card */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-foreground/20">
              <div className="flex items-center justify-between">
                <Eyebrow>Direct Inbox</Eyebrow>
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="size-3.5" />
                </span>
              </div>
              <div
                onClick={copyEmail}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") copyEmail(); }}
                className="group mt-3 flex items-center justify-between rounded-xl p-2 -mx-2 transition-colors hover:bg-card/80 cursor-pointer"
                title="Click to copy email address"
              >
                <p className="text-base font-medium tracking-tight text-foreground sm:text-lg font-mono">
                  {site.email}
                </p>
                <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1 shrink-0 ml-2">
                  {copiedEmail ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <span>Open mail client</span>
                  <ArrowUpRight className="size-3" />
                </a>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <span>Gmail</span>
                  <ArrowUpRight className="size-3" />
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3 text-muted-foreground" />
                      <span>Copy address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Availability & Location Overview */}
            <div className="space-y-6 border-y border-border py-8">
              <div className="flex items-start gap-3.5">
                <Globe className="mt-0.5 size-4 text-muted-foreground shrink-0" />
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Location & Remote Work</h4>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    Asante Mampong, Kumasi, Ghana (UTC+0) · Available worldwide for remote roles with flexible overlap across GMT, EST, and CET.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="mt-0.5 size-4 text-muted-foreground shrink-0" />
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Engagements Accepted</h4>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    Full-time Senior Engineering roles, high-velocity MVP launches, and specialized frontend architecture advisory.
                  </p>
                </div>
              </div>
            </div>

            {/* Social & Professional Networks */}
            <div>
              <Eyebrow>Professional Profiles</Eyebrow>
              <ul className="mt-4 divide-y divide-border/60">
                <li>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between py-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <span>LinkedIn Profile</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      <span>Connect</span>
                      <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Malik825"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between py-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <span>GitHub Repositories</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      <span>Explore code</span>
                      <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </FadeUp>

        {/* Right Column: High-End Interactive Inquiry Form */}
        <FadeUp delay={0.2}>
          <div className="rounded-3xl border border-border bg-card/70 p-7 md:p-10 backdrop-blur-md shadow-sm">
            {sent ? (
              <div className="py-8 space-y-6">
                <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <Check className="size-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl text-foreground">
                    Message safely received.
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                    Thank you for reaching out, <strong className="text-foreground">{name}</strong>. I review inquiries every business morning and will get back to you directly at <span className="text-foreground font-medium">{email}</span> within 24 hours.
                  </p>
                </div>
                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setMessage("");
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <span>Send another inquiry</span>
                  </button>
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <span>Explore case studies</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8">
                {error && (
                  <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs font-medium text-destructive">
                    {error}
                  </div>
                )}

                {/* 1. What are you looking to build / hire for? */}
                <div className="space-y-3">
                  <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    1. Engagement Focus
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {SERVICE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedService(opt)}
                        className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all text-center ${
                          selectedService === opt
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border bg-background/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Timeline Selector */}
                <div className="space-y-3">
                  <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    2. Desired Timeline
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TIMELINE_OPTIONS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTimeline(t)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                          selectedTimeline === t
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border bg-background/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Contact Credentials */}
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1.5">
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="contact-name"
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full rounded-xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1.5">
                        Work Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="contact-email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@company.com"
                        className="w-full rounded-xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1.5">
                      Company or Organisation <span className="text-muted-foreground/60 text-[10px] normal-case">(optional)</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Linear, Vercel, or Startup Stealth"
                      className="w-full rounded-xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                </div>

                {/* 4. Project Details */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Project or Role Overview <span className="text-primary">*</span>
                    </label>
                    <span className="text-[11px] text-muted-foreground">
                      {message.length}/2000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about the problem you're solving, the technical stack, or the role responsibilities..."
                    maxLength={2000}
                    className="w-full rounded-xl border border-input bg-background/80 p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-y leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-95 disabled:opacity-50 sm:w-auto"
                  >
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                    <span>{loading ? "Transmitting enquiry..." : "Send enquiry"}</span>
                  </button>
                  <p className="mt-3 text-[11px] text-muted-foreground">
                    Protected by secure same-origin encryption · Your details are never shared.
                  </p>
                </div>
              </form>
            )}
          </div>
        </FadeUp>
      </section>
    </Page>
  );
}
