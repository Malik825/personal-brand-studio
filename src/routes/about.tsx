import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, Page, PageIntro } from "@/components/site/Layout";
import { getAbout } from "@/content";

export const Route = createFileRoute("/about")({
  loader: async () => {
    return await getAbout();
  },
  head: () => ({
    meta: [
      { title: "About — Sule Malik" },
      {
        name: "description",
        content:
          "Background, engineering philosophy and technical capabilities of Sule Malik, a product-minded software engineer.",
      },
      { property: "og:title", content: "About — Sule Malik" },
      {
        property: "og:description",
        content:
          "Background, engineering philosophy and technical capabilities of Sule Malik, a product-minded software engineer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const { intro, sections, capabilities } = Route.useLoaderData();

  return (
    <Page>
      <PageIntro
        eyebrow="About"
        title={
          <>
            Engineering with the <em className="text-primary">whole product</em> in view.
          </>
        }
      >
        {intro}
      </PageIntro>
      <section className="container-site divide-y divide-border border-y border-border">
        {sections.map((s) => (
          <div key={s.title} className="grid gap-4 py-12 lg:grid-cols-[1fr_2fr]">
            <h2 className="font-display text-3xl">{s.title}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </section>
      <section className="container-site py-20">
        <Eyebrow>Technical capabilities</Eyebrow>
        <ul className="mt-8 flex flex-wrap gap-2">
          {capabilities.map((c) => (
            <li key={c} className="rounded-full border border-foreground/25 px-4 py-2">
              {c}
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
