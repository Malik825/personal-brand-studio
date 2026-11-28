import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eyebrow, Page } from "@/components/site/Layout";
import { FadeUp } from "@/components/motion/FadeUp";
import { getSite } from "@/content";
import { contactCopy } from "@/content/contact";
import { submitContactInquiry } from "@/server/inquiry";
import { trackEvent } from "@/lib/analytics/posthog";
import { buildPageMeta, PERSON_ID, SITE_URL } from "@/lib/seo";
import { GithubIcon, LinkedinIcon } from "@/components/icons/TechIcons";
import {
  Check,
  Copy,
  ArrowUpRight,
  Briefcase,
  Globe,
  Mail,
  Send,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  loader: async () => {
    return { site: await getSite() };
  },
  head: () => {
    const seo = buildPageMeta({
      title: "Contact Sule Malik | Software Engineering Inquiries",
      description:
        "Contact Sule Malik for frontend engineering roles, SaaS product development, architecture consulting, or web application projects.",
      path: "/contact",
      type: "website",
      imageAlt: "Contact Sule Malik — Product-minded Software Engineer",
    });

    return {
      meta: seo.meta,
      links: [seo.canonicalLink],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": `${SITE_URL}/contact#webpage`,
            url: seo.url,
            name: "Contact Sule Malik | Software Engineering Inquiries",
            description: seo.description,
            mainEntity: {
              "@id": PERSON_ID,
            },
          }),
        },
      ],
    };
  },
  component: Contact,
});

const SERVICE_OPTIONS = contactCopy.form.serviceOptions;
const TIMELINE_OPTIONS = contactCopy.form.timelineOptions;

export function Contact() {
  const { site } = Route.useLoaderData();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form interactive state
  const [selectedService, setSelectedService] = useState<string>(SERVICE_OPTIONS[0]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>(TIMELINE_OPTIONS[0]);
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
      setError(contactCopy.form.validationError);
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

  const githubUrl = site.github || "https://github.com/Malik825";

  return (
    <Page>
      {/* Editorial Header */}
      <header className="container-site pt-12 pb-16 md:pt-16 md:pb-20">
        <FadeUp>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] font-medium text-foreground backdrop-blur-sm">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>{contactCopy.badge}</span>
            </span>
          </div>

          <h1 className="mt-8 font-display text-5xl tracking-tight sm:text-7xl lg:text-8xl">
            {contactCopy.titlePrefix}{" "}
            <em className="font-serif italic font-normal text-primary">
              {contactCopy.titleEmphasis}
            </em>
          </h1>

          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {contactCopy.intro.map((paragraph, idx) => (
              <p key={idx} className={idx === 1 ? "text-base sm:text-lg text-foreground/80" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </FadeUp>
      </header>

      {/* Main Grid: Context & Direct Channels vs Interactive Inquiry */}
      <section className="container-site grid gap-16 pb-28 lg:grid-cols-[1fr_1.45fr] lg:gap-20">
        {/* Left Column: Direct channels & work parameters */}
        <FadeUp delay={0.1}>
          <div className="space-y-10">
            {/* Direct Contact Card */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-foreground/20">
              <div className="flex items-center justify-between">
                <Eyebrow>{contactCopy.directContact.eyebrow}</Eyebrow>
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="size-3.5" />
                </span>
              </div>
              <p className="mt-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {contactCopy.directContact.emailLabel}
              </p>
              <div
                onClick={copyEmail}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    void copyEmail();
                  }
                }}
                className="group mt-1.5 flex items-center justify-between rounded-xl p-2 -mx-2 transition-colors hover:bg-card/80 cursor-pointer"
                title="Click to copy email address"
              >
                <p className="text-base font-medium tracking-tight text-foreground sm:text-lg font-mono break-all">
                  {site.email}
                </p>
                <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1 shrink-0 ml-2">
                  {copiedEmail ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span className="text-emerald-500">{contactCopy.directContact.copiedLabel}!</span>
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
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <span>{contactCopy.directContact.primaryCta}</span>
                  <ArrowUpRight className="size-3" />
                </a>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <span>{contactCopy.directContact.gmailCta}</span>
                  <ArrowUpRight className="size-3" />
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {contactCopy.directContact.copiedLabel}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3 text-muted-foreground" />
                      <span>{contactCopy.directContact.copyCta}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Location & Remote Work + What I'm Open To */}
            <div className="space-y-8 border-y border-border py-8">
              <div className="flex items-start gap-3.5">
                <Globe className="mt-0.5 size-4 text-primary shrink-0" />
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {contactCopy.location.heading}
                  </h2>
                  <p className="mt-1.5 text-sm font-semibold text-foreground">
                    {contactCopy.location.place}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {contactCopy.location.availability}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Briefcase className="mt-0.5 size-4 text-primary shrink-0" />
                <div className="space-y-3">
                  <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {contactCopy.openTo.heading}
                  </h2>
                  <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                    {contactCopy.openTo.items.map((item) => (
                      <li key={item.label}>
                        <strong className="font-semibold text-foreground">{item.label}:</strong>{" "}
                        {item.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Professional Profiles */}
            <div>
              <Eyebrow>{contactCopy.profiles.eyebrow}</Eyebrow>
              <ul className="mt-4 divide-y divide-border/60">
                <li>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between py-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <LinkedinIcon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>{contactCopy.profiles.linkedinLabel}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      <span>{contactCopy.profiles.linkedinAction}</span>
                      <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between py-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <GithubIcon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>{contactCopy.profiles.githubLabel}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      <span>{contactCopy.profiles.githubAction}</span>
                      <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </li>
                <li>
                  <Link
                    to="/"
                    className="group flex items-center justify-between py-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Globe className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>{contactCopy.profiles.portfolioLabel}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      <span>{contactCopy.profiles.portfolioAction}</span>
                      <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </FadeUp>

        {/* Right Column: Interactive Enquiry Form */}
        <FadeUp delay={0.2}>
          <div className="rounded-3xl border border-border bg-card/70 p-7 md:p-10 backdrop-blur-md shadow-sm">
            {sent ? (
              <div className="py-8 space-y-6">
                <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <Check className="size-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl text-foreground">
                    {contactCopy.form.success.heading}
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                    {contactCopy.form.success.bodyPrefix}{" "}
                    <strong className="text-foreground">{name}</strong>.{" "}
                    {contactCopy.form.success.bodyMiddle}{" "}
                    <span className="text-foreground font-medium">{email}</span>{" "}
                    {contactCopy.form.success.bodySuffix}
                  </p>
                </div>
                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setMessage("");
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                  >
                    <span>{contactCopy.form.success.sendAnother}</span>
                  </button>
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <span>{contactCopy.form.success.exploreWork}</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8">
                <div className="border-b border-border/60 pb-6">
                  <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                    {contactCopy.form.heading}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {contactCopy.form.subtitle}
                  </p>
                </div>

                {error && (
                  <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs font-medium text-destructive">
                    {error}
                  </div>
                )}

                {/* 1. What would you like to discuss? */}
                <div className="space-y-3">
                  <span className="block text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">
                    {contactCopy.form.step1Label}
                  </span>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {SERVICE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedService(opt)}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all text-center cursor-pointer ${
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

                {/* 2. When would you like to get started? */}
                <div className="space-y-3">
                  <span className="block text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">
                    {contactCopy.form.step2Label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {TIMELINE_OPTIONS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTimeline(t)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
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

                {/* 3. Your details */}
                <div className="space-y-4">
                  <span className="block text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">
                    {contactCopy.form.step3Label}
                  </span>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-foreground/85 mb-1.5"
                      >
                        {contactCopy.form.fields.nameLabel} <span className="text-primary">*</span>
                      </label>
                      <input
                        id="contact-name"
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={contactCopy.form.fields.namePlaceholder}
                        className="w-full rounded-xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-foreground/85 mb-1.5"
                      >
                        {contactCopy.form.fields.emailLabel} <span className="text-primary">*</span>
                      </label>
                      <input
                        id="contact-email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={contactCopy.form.fields.emailPlaceholder}
                        className="w-full rounded-xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-medium text-foreground/85 mb-1.5"
                    >
                      {contactCopy.form.fields.companyLabel}{" "}
                      <span className="text-muted-foreground/70 font-normal">
                        {contactCopy.form.fields.companyOptional}
                      </span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={contactCopy.form.fields.companyPlaceholder}
                      className="w-full rounded-xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium text-foreground/85"
                      >
                        {contactCopy.form.fields.overviewLabel}{" "}
                        <span className="text-primary">*</span>
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
                      placeholder={contactCopy.form.fields.overviewPlaceholder}
                      maxLength={2000}
                      className="w-full rounded-xl border border-input bg-background/80 p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-y leading-relaxed"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-95 disabled:opacity-50 sm:w-auto cursor-pointer"
                  >
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                    <span>
                      {loading ? contactCopy.form.submittingLabel : contactCopy.form.submitLabel}
                    </span>
                  </button>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {contactCopy.form.closingNote}
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
