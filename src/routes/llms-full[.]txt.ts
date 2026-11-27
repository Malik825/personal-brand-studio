import { createFileRoute } from "@tanstack/react-router";
import { getAbout, getArticles, getProjects, getSite } from "@/content";

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: async () => {
        const [about, site, projects, articles] = await Promise.all([
          getAbout(),
          getSite(),
          getProjects(),
          getArticles(),
        ]);

        const bio = (about.bio && about.bio.length > 0)
          ? about.bio.join("\n\n")
          : about.intro;

        const capabilities = (about.capabilityGroups || []).map((g) => {
          return `### ${g.category}\n${g.items.map((i) => `- ${i}`).join("\n")}`;
        }).join("\n\n");

        const learning = (about.learningTopics || []).map((t, idx) => {
          return `${idx + 1}. **${t.title}**\n   - Category: ${t.category}\n   - Why It Matters: ${t.whyItMatters || "Core growth area"}\n   - Deep Dive: ${t.description}\n   - Focus Areas: ${(t.takeaways || []).join(", ")}\n   - Tools & Protocols: ${(t.tools || []).join(", ")}`;
        }).join("\n\n");

        const projectDetails = projects.map((p, idx) => {
          return `### ${idx + 1}. ${p.title} (${p.year})
- Category: ${p.category}
- Case Study: https://www.sulemalik.com/work/${p.slug}
- Live Application: ${p.url || "N/A"}
- GitHub Repository: ${p.githubUrl || "N/A"}
- Role: ${p.role}
- Stack: ${(p.stack || []).join(", ")}
- Primary Metric: ${p.metric ? `${p.metric.value} — ${p.metric.label}` : "Production Quality"}
- Summary: ${p.summary}
- Architectural Challenge: ${p.challenge}
- Engineering Approach:
${(p.approach || []).map((step) => `  - ${step}`).join("\n")}
- Measurable Outcome: ${p.outcome}`;
        }).join("\n\n---\n\n");

        const articleDetails = articles.map((a, idx) => {
          return `### ${idx + 1}. ${a.title}
- URL: https://www.sulemalik.com/writing/${a.slug}
- Topic: ${a.topic} · Reading Time: ${a.readingTime} · Published: ${a.date}
- Excerpt: ${a.excerpt}
- Key Takeaways:
${(a.takeaways || []).map((t) => `  - ${t}`).join("\n")}`;
        }).join("\n\n---\n\n");

        const text = `# ${site.name} — Complete Engineering Knowledge Corpus (Extended)
> Automated deep context feed for LLMs and AI Answer Engines.
> Generated dynamically from the live portfolio data layer.

## Biographical Profile & Identity
- Name: ${site.name}
- Role: ${site.role}
- Primary Base: ${site.location} (UTC+0)
- Working Hours Overlap: GMT, EST, CET (flexible synchronous hours for distributed teams)
- Direct Email: ${site.email}
- Website: https://www.sulemalik.com
- Contact Form: https://www.sulemalik.com/contact
- LinkedIn: ${site.linkedin}
- GitHub: ${site.github || "https://github.com/malik825"}

### Narrative
${bio}

---

## Technical Skills Matrix
${capabilities}

---

## Active Research & Continuous Learning Domains
${learning}

---

## In-Depth Case Studies (${projects.length} Total Production Works)

${projectDetails}

---

## Technical Architecture Essays (${articles.length} Deep Dives)

${articleDetails}

---

## Operating Principles
1. **Clarity Over Cleverness**: Code is read ten times more often than it is written. Simple architectures, explicit types, and clean data flows outlast trends.
2. **Product-Led Problem Solving**: Understand the human and economic context before writing code. That context informs what to build, what to simplify, and what to leave out.
3. **Craft & Micro-Interactions**: Motion and responsiveness are communication, not decoration. Fluid gestures and instant visual feedback cultivate user trust.
4. **Autonomous Collaboration**: Take ownership from initial planning to production rollout. Keep work visible with clear documentation and proactive communication.
`;

        return new Response(text, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
