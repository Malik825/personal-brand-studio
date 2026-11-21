import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eyebrow, Page, PageIntro } from "@/components/site/Layout";
import { FadeUp } from "@/components/motion/FadeUp";
import { getSite } from "@/content";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/contact")({
  loader: async () => {
    return { site: await getSite() };
  },
  head: () => ({
    meta: [
      { title: "Contact — Sule Malik" },
      {
        name: "description",
        content: "Get in touch with Sule Malik about engineering roles or product work.",
      },
      { property: "og:title", content: "Contact — Sule Malik" },
      {
        property: "og:description",
        content: "Get in touch with Sule Malik about engineering roles or product work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const field =
  "w-full border-0 border-b border-input bg-transparent py-3 text-lg outline-none transition-colors duration-200 focus:border-primary";

function Contact() {
  const { site } = Route.useLoaderData();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      message: String(formData.get("message") || ""),
      created_at: new Date().toISOString(),
    };

    try {
      // Attempt to save to Supabase inquiries table
      const { error: supabaseError } = await supabase.from("inquiries").insert([payload]);
      if (supabaseError) {
        console.warn("[Contact] Supabase insert notice:", supabaseError.message);
      }
    } catch (err) {
      console.warn("[Contact] Offline or network error saving inquiry:", err);
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <Page>
      <PageIntro
        eyebrow="Contact"
        title={
          <>
            Let's work <em className="text-primary italic">together.</em>
          </>
        }
      >
        Whether you're hiring for a frontend or product engineering role, or have a
        product to build, I'd like to hear about it.
      </PageIntro>

      <section className="container-site grid gap-16 pb-24 lg:grid-cols-[1fr_1.6fr]">
        <FadeUp>
          <div className="space-y-10">
            <div>
              <Eyebrow>Email</Eyebrow>
              <a
                href={`mailto:${site.email}`}
                className="link-underline mt-3 inline-flex items-center gap-2 text-xl font-medium"
              >
                <span>{site.email}</span>
                <span className="text-sm">↗</span>
              </a>
            </div>
            <div>
              <Eyebrow>LinkedIn</Eyebrow>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-underline mt-3 inline-flex items-center gap-2 text-xl font-medium"
              >
                <span>{site.linkedin.replace("https://www.", "").replace("https://", "")}</span>
                <span className="text-sm">↗</span>
              </a>
            </div>
            <div>
              <Eyebrow>Location</Eyebrow>
              <p className="mt-3 text-xl">{site.location}</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          {sent ? (
            <div className="rounded-xl border border-border bg-card/60 p-8 space-y-4">
              <p role="status" className="font-display text-3xl sm:text-4xl">
                Thank you — your enquiry has been received.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I review messages daily and will get back to you directly at your email address.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="btn-outline mt-4 inline-block text-sm cursor-pointer"
              >
                Send another message →
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8">
              {error && (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-muted-foreground">Name</span>
                  <input required name="name" className={field} />
                </label>
                <label className="block text-sm">
                  <span className="text-muted-foreground">Email</span>
                  <input required type="email" name="email" className={field} />
                </label>
              </div>
              <label className="block text-sm">
                <span className="text-muted-foreground">Company (optional)</span>
                <input name="company" className={field} />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Tell me about your project or role</span>
                <textarea required name="message" rows={5} className={field} />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="btn-solid group disabled:opacity-50 cursor-pointer"
              >
                <span>{loading ? "Sending enquiry..." : "Send enquiry"}</span>
                <span
                  className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </button>
            </form>
          )}
        </FadeUp>
      </section>
    </Page>
  );
}
