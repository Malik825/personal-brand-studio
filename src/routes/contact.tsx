import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Eyebrow, Page } from "@/components/site/Layout";
import { FadeUp } from "@/components/motion/FadeUp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getSite } from "@/content";
import { contactCopy, type HelpServiceIcon } from "@/content/contact";
import { submitContactInquiry } from "@/server/inquiry";
import { trackEvent } from "@/lib/analytics/posthog";
import { buildPageMeta, PERSON_ID, SITE_URL } from "@/lib/seo";
import { GithubIcon, LinkedinIcon } from "@/components/icons/TechIcons";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Copy,
  Globe,
  Layers,
  LayoutGrid,
  Mail,
  MessageSquare,
  Send,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  loader: async () => {
    return { site: await getSite() };
  },
  head: () => {
    const seo = buildPageMeta({
      title: "Contact Sule Malik | Websites, Products & Engineering",
      description:
        "Contact Sule Malik to discuss a business website, custom web application, digital product, or software engineering opportunity.",
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
            name: "Contact Sule Malik | Websites, Products & Engineering",
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

interface SubmittedInquiry {
  name: string;
  email: string;
  company?: string | undefined;
  serviceType: string;
  timeline: string;
}

function HelpIcon({ icon }: { icon: HelpServiceIcon }) {
  switch (icon) {
    case "globe":
      return <Globe className="size-4" aria-hidden="true" />;
    case "layout-grid":
      return <LayoutGrid className="size-4" aria-hidden="true" />;
    case "layers":
      return <Layers className="size-4" aria-hidden="true" />;
    case "wrench":
      return <Wrench className="size-4" aria-hidden="true" />;
    case "briefcase":
      return <Briefcase className="size-4" aria-hidden="true" />;
  }
}

export function Contact() {
  const { site } = Route.useLoaderData();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<SubmittedInquiry | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form interactive state
  const [selectedService, setSelectedService] = useState<string>(SERVICE_OPTIONS[0]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>(TIMELINE_OPTIONS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const contactEmail = site.email || "abdulmaliksuleman75@gmail.com";
  const linkedinUrl = site.linkedin || contactCopy.profiles.linkedinUrl;
  const githubUrl = site.github || contactCopy.profiles.githubUrl;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      // fallback
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedCompany = company.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setError(contactCopy.form.validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await submitContactInquiry({
        data: {
          name: trimmedName,
          email: trimmedEmail,
          company: trimmedCompany || undefined,
          serviceType: selectedService,
          timeline: selectedTimeline,
          message: trimmedMessage,
        },
      });
      trackEvent("contact_form_submitted", {
        service_type: selectedService,
        timeline: selectedTimeline,
        has_company: Boolean(trimmedCompany),
      });
      setSubmittedInquiry({
        name: trimmedName,
        email: trimmedEmail,
        company: trimmedCompany || undefined,
        serviceType: selectedService,
        timeline: selectedTimeline,
      });
      setModalOpen(true);
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setSelectedService(SERVICE_OPTIONS[0]);
      setSelectedTimeline(TIMELINE_OPTIONS[0]);
    } catch (err) {
      console.warn("[Contact] Server submission note:", err);
      setError(err instanceof Error && err.message ? err.message : contactCopy.form.submissionError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      {/* 1. Hero Section */}
      <header className="container-site pt-12 pb-14 md:pt-16 md:pb-20">
        <FadeUp>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] font-medium text-foreground backdrop-blur-sm">
              <span className="relative flex size-2 shrink-0" aria-hidden="true">
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

          <p className="mt-6 max-w-3xl text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            {contactCopy.supportingHeadline}
          </p>

          <div className="mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {contactCopy.intro.map((paragraph, idx) => (
              <p
                key={idx}
                className={idx === 2 ? "text-foreground/85 font-normal" : ""}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeUp>
      </header>

      {/* 2. How I Can Help */}
      <section
        aria-labelledby="how-i-help-heading"
        className="container-site border-t border-border/70 py-14 md:py-16"
      >
        <FadeUp delay={0.05}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>{contactCopy.howIHelp.eyebrow}</Eyebrow>
              <h2
                id="how-i-help-heading"
                className="mt-3 font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
              >
                {contactCopy.howIHelp.heading}
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {contactCopy.howIHelp.items.map((item, idx) => (
              <div
                key={item.id}
                className={`group rounded-2xl border border-border bg-card/45 p-6 backdrop-blur-sm transition-colors hover:border-foreground/20 hover:bg-card/70 ${
                  idx < 3 ? "lg:col-span-2" : "lg:col-span-3"
                }`}
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
                  <HelpIcon icon={item.icon} />
                </span>
                <h3 className="mt-4 font-display text-lg font-medium tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Main Grid: Working Together & Direct Channels vs Interactive Enquiry Form */}
      <section className="container-site grid gap-14 border-t border-border/70 pt-14 pb-20 lg:grid-cols-[1fr_1.45fr] lg:gap-16 lg:pt-16">
        {/* Left Column: Working Together, Direct Contact, Location, Profiles */}
        <FadeUp delay={0.1}>
          <div className="space-y-9">
            {/* 3. Working Together */}
            <div className="rounded-2xl border border-border/80 bg-card/35 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <Eyebrow>{contactCopy.workingTogether.eyebrow}</Eyebrow>
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageSquare className="size-3.5" aria-hidden="true" />
                </span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-foreground">
                {contactCopy.workingTogether.heading}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {contactCopy.workingTogether.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className={idx === 1 ? "text-foreground/85" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* 4. Direct Contact */}
            <div className="rounded-2xl border border-border bg-card/45 p-6 backdrop-blur-sm transition-colors hover:border-foreground/20">
              <div className="flex items-center justify-between">
                <Eyebrow>{contactCopy.directContact.eyebrow}</Eyebrow>
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="size-3.5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {contactCopy.directContact.emailLabel}
              </p>
              <button
                type="button"
                onClick={copyEmail}
                className="group mt-1.5 flex w-full items-center justify-between rounded-xl p-2 -mx-2 text-left transition-colors hover:bg-card/80 cursor-pointer"
                aria-label={`Copy email address ${contactEmail}`}
                title="Click to copy email address"
              >
                <span className="text-base font-medium tracking-tight text-foreground sm:text-lg font-mono break-all">
                  {contactEmail}
                </span>
                <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1 shrink-0 ml-2">
                  {copiedEmail ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" aria-hidden="true" />
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {contactCopy.directContact.copiedLabel}!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </span>
              </button>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <span>{contactCopy.directContact.primaryCta}</span>
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </a>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <span>{contactCopy.directContact.gmailCta}</span>
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="size-3 text-emerald-500" aria-hidden="true" />
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {contactCopy.directContact.copiedLabel}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3 text-muted-foreground" aria-hidden="true" />
                      <span>{contactCopy.directContact.copyCta}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 5. Location & Availability */}
            <div className="border-y border-border py-7">
              <div className="flex items-start gap-3.5">
                <Globe className="mt-0.5 size-4 text-primary shrink-0" aria-hidden="true" />
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
            </div>

            {/* 6. Professional Profiles */}
            <div>
              <Eyebrow>{contactCopy.profiles.eyebrow}</Eyebrow>
              <ul className="mt-4 divide-y divide-border/60">
                <li>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Sule Malik on LinkedIn (opens in a new tab)"
                    className="group flex items-center justify-between py-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <LinkedinIcon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>{contactCopy.profiles.linkedinLabel}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      <span>{contactCopy.profiles.linkedinAction}</span>
                      <ArrowUpRight
                        className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Sule Malik on GitHub (opens in a new tab)"
                    className="group flex items-center justify-between py-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <GithubIcon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>{contactCopy.profiles.githubLabel}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      <span>{contactCopy.profiles.githubAction}</span>
                      <ArrowUpRight
                        className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={contactCopy.profiles.websiteUrl}
                    aria-label="Sule Malik Website — www.sulemalik.com"
                    className="group flex items-center justify-between py-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Globe
                        className="size-4 text-muted-foreground group-hover:text-primary transition-colors"
                        aria-hidden="true"
                      />
                      <span>{contactCopy.profiles.websiteLabel}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      <span>{contactCopy.profiles.websiteAction}</span>
                      <ArrowUpRight
                        className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </FadeUp>

        {/* 7. Enquiry Form */}
        <FadeUp delay={0.15}>
          <div className="rounded-3xl border border-border bg-card/70 p-7 md:p-10 backdrop-blur-md shadow-sm">
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
                <div
                  role="alert"
                  className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs font-medium text-destructive"
                >
                  {error}
                </div>
              )}

              {/* Field 1: What brings you here? */}
              <fieldset className="space-y-3">
                <legend className="block text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">
                  {contactCopy.form.step1Label}
                </legend>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {SERVICE_OPTIONS.map((opt) => {
                    const isSelected = selectedService === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedService(opt)}
                        className={`flex items-start justify-between gap-2.5 rounded-xl border px-4 py-3 text-left text-xs leading-snug font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border bg-background/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && (
                          <Check className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Field 2: When would you like to get started? */}
              <fieldset className="space-y-3">
                <legend className="block text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">
                  {contactCopy.form.step2Label}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {TIMELINE_OPTIONS.map((t) => {
                    const isSelected = selectedTimeline === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedTimeline(t)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border bg-background/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Field 3: Your details */}
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
                      autoComplete="name"
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
                      autoComplete="email"
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
                    autoComplete="organization"
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
                    rows={5}
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
                  <Send
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    {loading ? contactCopy.form.submittingLabel : contactCopy.form.submitLabel}
                  </span>
                </button>
                <p className="mt-3 text-xs text-muted-foreground">
                  {contactCopy.form.closingNote}
                </p>
              </div>
            </form>
          </div>
        </FadeUp>
      </section>

      {/* 8. Closing Section */}
      <section className="container-site border-t border-border/70 py-16 md:py-20">
        <FadeUp delay={0.05}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              {contactCopy.closing.heading}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{contactCopy.closing.emailPrompt}</span>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-1.5 font-mono text-foreground underline underline-offset-4 transition-colors hover:text-primary break-all"
              >
                <span>{contactEmail}</span>
                <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Enquiry Confirmation Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md rounded-3xl border border-border bg-card/95 p-0 shadow-2xl backdrop-blur-xl sm:rounded-3xl overflow-hidden">
          <div className="p-7 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 360, damping: 22 }}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-600 ring-1 ring-emerald-500/25 dark:text-emerald-400"
              >
                <Check className="size-5 stroke-[2.4]" aria-hidden="true" />
              </motion.div>
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                {contactCopy.form.success.eyebrow}
              </span>
            </div>

            <DialogHeader className="space-y-2.5 text-left">
              <DialogTitle className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {contactCopy.form.success.headingPrefix}{" "}
                <em className="font-serif italic font-normal text-primary">
                  {contactCopy.form.success.headingEmphasis}
                </em>
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {contactCopy.form.success.bodyPrefix}{" "}
                <strong className="font-medium text-foreground">
                  {submittedInquiry?.name}
                </strong>
                . {contactCopy.form.success.bodyMiddle}{" "}
                <span className="font-medium text-foreground break-all">
                  {submittedInquiry?.email}
                </span>{" "}
                {contactCopy.form.success.bodySuffix}
              </DialogDescription>
            </DialogHeader>

            {submittedInquiry && (
              <div className="rounded-2xl border border-border/80 bg-background/70 p-4 space-y-2.5">
                <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                  {contactCopy.form.success.summaryHeading}
                </p>
                <dl className="grid gap-2 text-xs sm:text-sm">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted-foreground shrink-0">
                      {contactCopy.form.success.topicLabel}
                    </dt>
                    <dd className="font-medium text-foreground text-right">
                      {submittedInquiry.serviceType}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted-foreground shrink-0">
                      {contactCopy.form.success.timelineLabel}
                    </dt>
                    <dd className="font-medium text-foreground text-right">
                      {submittedInquiry.timeline}
                    </dd>
                  </div>
                  {submittedInquiry.company && (
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground shrink-0">
                        {contactCopy.form.success.companyLabel}
                      </dt>
                      <dd className="font-medium text-foreground text-right">
                        {submittedInquiry.company}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            <p className="text-xs leading-relaxed text-muted-foreground">
              {contactCopy.form.success.directFallback}{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-mono text-foreground underline underline-offset-4 transition-colors hover:text-primary break-all"
              >
                {contactEmail}
              </a>
              .
            </p>

            <div className="flex flex-col-reverse gap-2.5 pt-1 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                {contactCopy.form.success.doneLabel}
              </button>
              <Link
                to="/work"
                onClick={() => setModalOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                <span>{contactCopy.form.success.exploreWork}</span>
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Page>
  );
}
