import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, Page, PageIntro } from "@/components/site/Layout";
import { FadeUp } from "@/components/motion/FadeUp";
import { InfiniteMarquee } from "@/components/site/InfiniteMarquee";
import { getAbout } from "@/content";
import { philosophyMarquee } from "@/content/marquees";

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
            Engineering with the <em className="text-primary italic">whole product</em> in view.
          </>
        }
      >
        {intro}
      </PageIntro>

      {/* Philosophy marquee accent */}
      <section className="border-y border-border bg-card/30">
        <InfiniteMarquee items={philosophyMarquee} variant="philosophy" speedSeconds={40} label="Engineering philosophy" />
      </section>

      <section className="container-site divide-y divide-border border-b border-border">
        {sections.map((s, idx) => (
          <FadeUp key={s.title} delay={0.08 * idx}>
            <div className="grid gap-6 py-16 lg:grid-cols-[1fr_2fr]">
              <h2 className="font-display text-3xl md:text-4xl">{s.title}</h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          </FadeUp>
        ))}
      </section>

      <section className="container-site py-24">
        <FadeUp>
          <Eyebrow>Technical capabilities</Eyebrow>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {capabilities.map((c) => (
              <li
                key={c}
                className="rounded-full border border-foreground/20 bg-card/40 px-5 py-2.5 text-sm transition-all duration-200 hover:border-primary hover:text-primary hover:bg-card"
              >
                {c}
              </li>
            ))}
          </ul>
        </FadeUp>
      </section>
    </Page>
  );
}
