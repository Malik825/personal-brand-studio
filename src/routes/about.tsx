import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, Page, PageIntro } from "@/components/site/Layout";

const sections = [
  { t: "Background", b: "I'm a software engineer who has spent my career building customer-facing web products — SaaS platforms, booking systems, e-commerce and subscription services. I work mostly on the frontend and product layer, where engineering decisions meet real users." },
  { t: "Engineering philosophy", b: "Good software is clear before it is clever. I favour simple architectures, readable code and components that are easy to change, because products always evolve faster than anyone plans." },
  { t: "Product-oriented problem solving", b: "Before writing code I want to understand who the feature is for and what success looks like. That context shapes the trade-offs: what to build first, what to simplify and what to leave out." },
  { t: "Distributed teams", b: "I'm used to working remotely with designers, product managers and engineers across time zones. That means clear written communication, ownership of outcomes and keeping work visible." },
];
const caps = ["React", "Next.js", "Angular", "TypeScript", "Component systems", "State management", "API integration", "Responsive & accessible UI", "Performance", "Headless CMS"];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sule Malik" },
      { name: "description", content: "Background, engineering philosophy and technical capabilities of Sule Malik, a product-minded software engineer." },
      { property: "og:title", content: "About — Sule Malik" },
      { property: "og:description", content: "Background, engineering philosophy and technical capabilities of Sule Malik, a product-minded software engineer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Page>
      <PageIntro eyebrow="About" title={<>Engineering with the <em className="text-primary">whole product</em> in view.</>}>
        I sit between engineering, product and design — and I build software that works for the people using it and the business behind it.
      </PageIntro>
      <section className="container-site divide-y divide-border border-y border-border">
        {sections.map((s) => (
          <div key={s.t} className="grid gap-4 py-12 lg:grid-cols-[1fr_2fr]">
            <h2 className="font-display text-3xl">{s.t}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{s.b}</p>
          </div>
        ))}
      </section>
      <section className="container-site py-20">
        <Eyebrow>Technical capabilities</Eyebrow>
        <ul className="mt-8 flex flex-wrap gap-2">
          {caps.map((c) => <li key={c} className="rounded-full border border-foreground/25 px-4 py-2">{c}</li>)}
        </ul>
      </section>
    </Page>
  );
}
