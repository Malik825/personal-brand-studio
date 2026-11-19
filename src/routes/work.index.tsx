import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, PageIntro } from "@/components/site/Layout";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { projects } from "@/content";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Sule Malik" },
      { name: "description", content: "Selected case studies: CyLynk, Glovera, Urban Vault and A1TIPS." },
      { property: "og:title", content: "Work — Sule Malik" },
      { property: "og:description", content: "Selected case studies: CyLynk, Glovera, Urban Vault and A1TIPS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Work,
});

function Work() {
  return (
    <Page>
      <PageIntro eyebrow="Selected work" title="Products built for real businesses.">
        A selection of platforms I've engineered — from learning systems to e-commerce.
      </PageIntro>
      <section className="container-site space-y-20">
        {projects.map((p, i) => (
          <Link key={p.slug} to="/work/$slug" params={{ slug: p.slug }} className="group grid items-center gap-8 border-t border-border pt-12 lg:grid-cols-2">
            <div className={i % 2 ? "lg:order-2" : ""}><ProjectVisual project={p} /></div>
            <div>
              <p className="text-sm text-muted-foreground">{p.year} · {p.category}</p>
              <h2 className="mt-3 font-display text-5xl group-hover:text-primary">{p.title}</h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">{p.summary}</p>
              <span className="link-underline mt-8 inline-block">Read case study →</span>
            </div>
          </Link>
        ))}
      </section>
    </Page>
  );
}
