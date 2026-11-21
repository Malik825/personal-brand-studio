import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eyebrow, Page, PageIntro } from "@/components/site/Layout";
import { getSite } from "@/content";

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
  "w-full border-0 border-b border-input bg-transparent py-3 text-lg outline-none focus:border-primary";

function Contact() {
  const { site } = Route.useLoaderData();
  const [sent, setSent] = useState(false);
  // UI only: wire this to a form handler later.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Page>
      <PageIntro
        eyebrow="Contact"
        title={
          <>
            Let's work <em className="text-primary">together.</em>
          </>
        }
      >
        Whether you're hiring for a frontend or product engineering role, or have a
        product to build, I'd like to hear about it.
      </PageIntro>
      <section className="container-site grid gap-16 lg:grid-cols-[1fr_1.6fr]">
        <div className="space-y-8">
          <div>
            <Eyebrow>Email</Eyebrow>
            <a href={`mailto:${site.email}`} className="link-underline mt-3 inline-block text-xl">
              {site.email}
            </a>
          </div>
          <div>
            <Eyebrow>LinkedIn</Eyebrow>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-underline mt-3 inline-block text-xl"
            >
              {site.linkedin.replace("https://www.", "").replace("https://", "")}
            </a>
          </div>
          <div>
            <Eyebrow>Location</Eyebrow>
            <p className="mt-3 text-xl">{site.location}</p>
          </div>
        </div>
        {sent ? (
          <p role="status" className="font-display text-3xl">
            Thank you — your message is noted. I'll be in touch soon.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <label className="block text-sm">
                Name
                <input required name="name" className={field} />
              </label>
              <label className="block text-sm">
                Email
                <input required type="email" name="email" className={field} />
              </label>
            </div>
            <label className="block text-sm">
              Company (optional)
              <input name="company" className={field} />
            </label>
            <label className="block text-sm">
              Tell me about your project
              <textarea required name="message" rows={5} className={field} />
            </label>
            <button type="submit" className="btn-solid">
              Send enquiry →
            </button>
          </form>
        )}
      </section>
    </Page>
  );
}
