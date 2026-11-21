import { createFileRoute, Link } from "@tanstack/react-router";
import portrait from "@/assets/profile.png";
import { Eyebrow, Page } from "@/components/site/Layout";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { getExperience, getProjects, getSite } from "@/content";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [site, projects, experience] = await Promise.all([
      getSite(),
      getProjects(),
      getExperience(),
    ]);
    return { site, projects, experience };
  },
  head: () => ({
    meta: [
      { title: "Sule Malik — Product-minded software engineer" },
      {
        name: "description",
        content:
          "I build digital products with engineering precision and product thinking. React, Next.js, Angular and TypeScript.",
      },
      { property: "og:title", content: "Sule Malik — Product-minded software engineer" },
      {
        property: "og:description",
        content:
          "I build digital products with engineering precision and product thinking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { site, projects, experience } = Route.useLoaderData();

  return (
    <Page>
      <section className="container-site grid gap-12 pb-20 pt-14 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:pt-20">
        <div>
          <Eyebrow>{site.role}</Eyebrow>
          <h1 className="mt-8 font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl xl:text-[5.5rem]">
            I build digital products with engineering precision and product{" "}
            <em className="text-primary">thinking.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed">
            I'm Sule Malik — a product-minded software engineer focused on creating scalable
            applications, thoughtful user experiences and software that solves real business
            problems.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Core technologies">
            {site.stack.map((t) => (
              <li
                key={t}
                className="rounded-full border border-foreground/25 px-4 py-1.5 text-sm"
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/work" className="btn-solid">
              View my work <span aria-hidden>→</span>
            </Link>
            <Link to="/contact" className="btn-outline">
              Let's work together <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        <figure className="relative lg:justify-self-end">
          <img
            src={portrait}
            alt="Sule Malik"
            width={960}
            height={1280}
            className="portrait-editorial aspect-[4/5] w-full object-cover"
          />
          <figcaption className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs shadow-sm">
            <span className="size-2 rounded-full bg-success" /> Open to opportunities
          </figcaption>
        </figure>
      </section>

      <section className="border-t border-border bg-card/50">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-[1fr_2.2fr]">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight">
              Building real solutions for modern businesses.
            </h2>
            <Link to="/work" className="link-underline mt-8 inline-block">
              Explore my work →
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {projects.map((p) => (
              <Link
                key={p.slug}
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group"
              >
                <ProjectVisual project={p} />
                <h3 className="mt-4 font-medium group-hover:text-primary">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 border-t border-border py-20 lg:grid-cols-[1fr_2.2fr]">
        <Eyebrow>Philosophy</Eyebrow>
        <div>
          <p className="font-display text-3xl leading-snug md:text-4xl">
            I care about turning complex ideas into simple, scalable products that people love —
            writing code with the user, the team and the business in mind.
          </p>
          <Link to="/about" className="link-underline mt-8 inline-block">
            Learn more about me →
          </Link>
        </div>
      </section>

      <section className="container-site grid gap-12 border-t border-border py-20 lg:grid-cols-[1fr_2.2fr]">
        <Eyebrow>Experience</Eyebrow>
        <ol className="divide-y border-border">
          {experience.map((e) => (
            <li key={e.role} className="grid gap-2 py-6 md:grid-cols-[8rem_1fr]">
              <span className="text-sm text-muted-foreground">{e.period}</span>
              <div>
                <p className="font-medium">
                  {e.role} · <span className="text-muted-foreground">{e.org}</span>
                </p>
                <p className="mt-1 text-muted-foreground">{e.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-site border-t border-border pt-24 text-center">
        <h2 className="mx-auto max-w-3xl font-display text-5xl leading-tight md:text-6xl">
          Have a product in mind? <em className="text-primary">Let's build it.</em>
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-solid">
            Start a conversation →
          </Link>
          <a href={`mailto:${site.email}`} className="btn-outline">
            {site.email}
          </a>
        </div>
      </section>
    </Page>
  );
}
