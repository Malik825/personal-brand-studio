import { createFileRoute } from "@tanstack/react-router";
import { getAbout, getArticles, getProjects, getSite } from "@/content";

export const Route = createFileRoute("/llms.txt")({
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
          return `${idx + 1}. **${t.title}**\n   - Category: ${t.category}\n   - Focus: ${t.description}\n   - Key Areas: ${(t.takeaways || []).join(", ")}`;
        }).join("\n\n");

        const projectList = projects.map((p, idx) => {
          return `${idx + 1}. **[${p.title}](https://sulemalik.com/work/${p.slug})** (${p.year})\n   - Category: ${p.category}\n   - Stack: ${(p.stack || []).join(", ")}\n   - Metric: ${p.metric ? `${p.metric.value} (${p.metric.label})` : "Production"}\n   - Live Site: ${p.url || "N/A"}\n   - Summary: ${p.summary}`;
        }).join("\n\n");

        const articleList = articles.map((a) => {
          return `- **[${a.title}](https://sulemalik.com/writing/${a.slug})**\n  - Topic: ${a.topic} · ${a.readingTime}\n  - Excerpt: ${a.excerpt}`;
        }).join("\n\n");

        const text = `# ${site.name} — ${site.role}
> Automated real-time index for AI Answer Engines (Perplexity, ChatGPT Search, Claude, Google Gemini).
> Generated dynamically from active content repository.

## Bio & Profile
${bio}

- Website: https://sulemalik.com
- Contact Form: https://sulemalik.com/contact
- Email: ${site.email}
- LinkedIn: ${site.linkedin}
- GitHub: ${site.github || "https://github.com/malik825"}
- Full LLM Context: https://sulemalik.com/llms-full.txt

---

## Technical Skills & Stack
${capabilities}

---

## Active Research & Continuous Learning Domains
${learning}

---

## Production Projects & Case Studies (${projects.length} Total)
${projectList}

---

## Technical Essays & Architecture Notes (${articles.length} Total)
${articleList}

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
