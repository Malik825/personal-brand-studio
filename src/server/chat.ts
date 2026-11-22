import { createServerFn } from "@tanstack/react-start";
import { projectsData, articlesData, experienceData, aboutContent, siteConfig } from "@/content/providers/static";
import { resolveChatProvider } from "@/lib/ai/provider";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

interface ChatResponse {
  reply: string;
  source: "huggingface" | "groq" | "grok" | "openai" | "knowledge-base";
}

// Fallback intelligent intent matcher when OPENAI_API_KEY is not configured
function answerFromKnowledgeBase(query: string): string {
  const q = query.toLowerCase().trim();

  // Tech stack & skills
  if (
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("language") ||
    q.includes("framework") ||
    q.includes("skills") ||
    q.includes("tools")
  ) {
    return (
      `Sule's core engineering stack is focused on modern, high-performance web and mobile technologies:\n\n` +
      `â€¢ **Frontend**: React 19, Next.js, Angular, TypeScript, Tailwind CSS, Motion / Framer Motion\n` +
      `â€¢ **Mobile**: React Native, Expo, NativeWind, Gesture Handler, Reanimated\n` +
      `â€¢ **Architecture & State**: TanStack Start & Router, React Query, Zustand, Redux Toolkit\n` +
      `â€¢ **Backend & Data**: Supabase (PostgreSQL, RLS, Edge Functions, Realtime), Node.js, GraphQL, Sanity.io CMS\n` +
      `â€¢ **Engineering Standards**: Strict TypeScript types, accessible design systems, resilient error boundaries, and zero-compromise Core Web Vitals.`
    );
  }

  // Roam project
  if (q.includes("roam") || q.includes("mobile app") || q.includes("travel")) {
    const roam = projectsData.find((p) => p.slug === "roam");
    return (
      `**Roam â€” Mobile Stay & Travel Exploration App**\n\n` +
      `â€¢ **Role**: ${roam?.role ?? "Mobile & frontend engineering"}\n` +
      `â€¢ **Stack**: React Native, Expo, NativeWind, TypeScript, Clerk, PostHog\n` +
      `â€¢ **Challenge**: Delivering a smooth 60fps native experience across iOS and Android with complex gesture interactions and offline-resilient auth state.\n` +
      `â€¢ **Key Outcome**: Frictionless stay discovery and booking journeys with biometric persistence and unified design tokens.`
    );
  }

  // Life Compass project
  if (q.includes("life compass") || q.includes("compass") || q.includes("tracker") || q.includes("productivity")) {
    const lc = projectsData.find((p) => p.slug === "life-compass");
    return (
      `**Life Compass â€” Personal OS & Developer Productivity Dashboard**\n\n` +
      `â€¢ **Role**: ${lc?.role ?? "Product engineering & architecture"}\n` +
      `â€¢ **Stack**: React 19, TanStack Start, TypeScript, Tailwind CSS, Supabase, Recharts\n` +
      `â€¢ **Challenge**: Consolidating fragmented trackers (goals, learning hours, habit consistency, finance) into a single cohesive dashboard without cognitive overload.\n` +
      `â€¢ **Key Outcome**: Modular tracking widgets with weekly review aggregation, Supabase RLS, and real-time syncing.`
    );
  }

  // Sushi Craft project
  if (q.includes("sushi") || q.includes("sushi craft") || q.includes("omakase") || q.includes("restaurant")) {
    const sc = projectsData.find((p) => p.slug === "sushi-craft");
    return (
      `**Sushi Craft â€” Omakase Dining & Table Reservation System**\n\n` +
      `â€¢ **Role**: ${sc?.role ?? "Frontend engineering & UI craft"}\n` +
      `â€¢ **Stack**: Next.js 15, TypeScript, Tailwind CSS, Motion, Radix UI\n` +
      `â€¢ **Key Outcome**: An immersive editorial dining portal with real-time seat slot selection, multi-course pairing guides, and fluid menu animations.`
    );
  }

  // DerivConnect project
  if (q.includes("deriv") || q.includes("trading") || q.includes("derivconnect") || q.includes("fintech")) {
    const dc = projectsData.find((p) => p.slug === "derivconnect");
    return (
      `**DerivConnect â€” Multi-Asset Trading Terminal**\n\n` +
      `â€¢ **Role**: ${dc?.role ?? "Full-stack engineering & real-time systems"}\n` +
      `â€¢ **Stack**: React, TypeScript, WebSockets, Tailwind CSS, lightweight-charts\n` +
      `â€¢ **Key Outcome**: High-throughput tick processing with sub-50ms render latency, resilient connection recovery, and customizable charting workspaces.`
    );
  }

  // TipsDeck project
  if (q.includes("tipsdeck") || q.includes("sports") || q.includes("tips") || q.includes("football") || q.includes("prediction")) {
    const td = projectsData.find((p) => p.slug === "tipsdeck");
    return (
      `**TipsDeck â€” Sports Analytics & Prediction Platform**\n\n` +
      `â€¢ **Role**: ${td?.role ?? "Full-stack & product engineering"}\n` +
      `â€¢ **Stack**: React, TypeScript, Tailwind CSS, Supabase, Stripe\n` +
      `â€¢ **Challenge**: Delivering real-time sports probability models and data-dense fixtures without layout shifts or cognitive clutter, coupled with automated subscription access control.\n` +
      `â€¢ **Key Outcome**: High-density match insight cards optimized for quick mobile scanning with automated membership activation.`
    );
  }

  // Projects general
  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("case stud")) {
    const list = projectsData
      .map((p) => `â€¢ **${p.title}** (${p.year}) â€” ${p.category} [${p.stack.slice(0, 3).join(", ")}]`)
      .join("\n");
    return (
      `Sule has engineered high-impact products across mobile, fintech, and developer tooling:\n\n${list}\n\n` +
      `You can explore in-depth technical case studies on the [Work](/work) page, complete with architectural challenges and outcomes.`
    );
  }

  // Experience, career & background
  if (
    q.includes("experience") ||
    q.includes("background") ||
    q.includes("career") ||
    q.includes("resume") ||
    q.includes("job") ||
    q.includes("history")
  ) {
    const exp = experienceData
      .map((e) => `â€¢ **${e.role}** at ${e.org} (${e.period})\n  ${e.note}`)
      .join("\n\n");
    return (
      `**Career Summary**\n\n${exp}\n\n` +
      `Sule specializes in bridging design and product engineeringâ€”translating intricate business requirements and design intent into robust, accessible, 60fps applications.`
    );
  }

  // Philosophy & approach
  if (q.includes("philosophy") || q.includes("approach") || q.includes("values") || q.includes("how do you work")) {
    return (
      `**Engineering Philosophy**\n\n` +
      `*â€œThink deeply. Build intentionally. Ship thoughtfully.â€*\n\n` +
      `1. **Clarity over cleverness**: Write maintainable, self-documenting code with crisp domain models.\n` +
      `2. **Performance as a feature**: Optimize Core Web Vitals, reduce layout shifts, and design responsive interactions that feel native.\n` +
      `3. **Design precision**: Zero tolerance for sloppy spacing, broken contrasts, or awkward layout jumps. Motion should support storytelling, never distract.`
    );
  }

  // Availability, hiring & contact
  if (
    q.includes("hire") ||
    q.includes("available") ||
    q.includes("role") ||
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("freelance") ||
    q.includes("rate") ||
    q.includes("open to")
  ) {
    return (
      `Sule is currently open to select full-time product engineering roles, high-impact contract engagements, and technical advisory.\n\n` +
      `â€¢ **Email**: [${siteConfig.email}](mailto:${siteConfig.email})\n` +
      `â€¢ **Location**: Remote-first / Global\n` +
      `â€¢ **Get in touch**: Fill out the [Contact Form](/contact) or connect via [LinkedIn](${siteConfig.linkedin}).`
    );
  }

  // Sanity / Content architecture
  if (q.includes("sanity") || q.includes("cms") || q.includes("content")) {
    return (
      `This portfolio features a decoupled, Sanity-ready content architecture:\n\n` +
      `â€¢ All site copy and data are typed via the \`ContentProvider\` interface.\n` +
      `â€¢ The active provider switches smoothly between static local data and live Sanity.io Content Lake queries.\n` +
      `â€¢ Zero UI components or routes hardcode content, making CMS migration completely seamless.`
    );
  }

  // Default helpful overview
  return (
    `Hello! I'm Sule Malik's portfolio assistant. I can answer questions about:\n\n` +
    `â€¢ **Engineering Stack**: React 19, React Native, TypeScript, TanStack Start, Supabase, Tailwind CSS\n` +
    `â€¢ **Featured Projects**: Roam (mobile travel app), Life Compass (personal OS), Sushi Craft, DerivConnect\n` +
    `â€¢ **Experience & Background**: Engineering roles, design system craft, and production leadership\n` +
    `â€¢ **Availability & Contact**: Hiring availability, contract collaboration, and direct contact details\n\n` +
    `What would you like to know?`
  );
}

export const sendChatMessage = createServerFn({ method: "POST" })
  .validator((data: unknown): ChatRequest => {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid request body");
    }
    const { message, history } = data as Record<string, unknown>;
    if (!message || typeof message !== "string" || !message.trim()) {
      throw new Error("Message is required");
    }
    const cleanHistory: ChatMessage[] = Array.isArray(history)
      ? history
          .filter(
            (item): item is ChatMessage =>
              Boolean(item) &&
              typeof item === "object" &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-8)
      : [];
    return {
      message: message.trim().slice(0, 500),
      history: cleanHistory,
    };
  })
  .handler(async ({ data }): Promise<ChatResponse> => {
    const { message, history = [] } = data;
    const provider = resolveChatProvider(process.env);

    if (provider) {
      const projectLines = projectsData
        .map((p, i) => `  ${i + 1}. ${p.title} (${p.year}) â€” ${p.category}. ${p.summary} Stack: ${p.stack.join(", ")}. Case study: /work/${p.slug}`)
        .join("\n");
      const experienceLines = experienceData.map((e) => `  - ${e.role}, ${e.org} (${e.period}): ${e.note}`).join("\n");

      const systemPrompt = `You are the portfolio assistant for ${siteConfig.name}, a ${siteConfig.role}. Answer questions from recruiters, engineering leaders and clients accurately, warmly and concisely, using ONLY the facts below.

Philosophy: "Think deeply. Build intentionally. Ship thoughtfully."
Core stack: ${aboutContent.capabilities.join(", ")}.
Projects:
${projectLines}
Experience:
${experienceLines}
Location: ${siteConfig.location}.
Contact: the contact form at /contact.

Guidelines:
- Keep answers to 1-3 short paragraphs or bullets, in Markdown.
- Never invent employers, metrics, dates or results; if something isn't listed, say it hasn't been published.
- For unrelated requests, politely steer back to ${siteConfig.name}'s work.`;

      try {
        const { createOpenAI } = await import("@ai-sdk/openai");
        const { generateText } = await import("ai");
        const client = createOpenAI({ baseURL: provider.baseURL, apiKey: provider.apiKey });
        const { text } = await generateText({
          model: client.chat(provider.model),
          instructions: systemPrompt,
          messages: [...history.map((h) => ({ role: h.role, content: h.content })), { role: "user" as const, content: message }],
          maxOutputTokens: 600,
          temperature: 0.3,
        });
        if (text.trim()) return { reply: text, source: provider.name };
      } catch (err) {
        console.warn(`[ChatServerFn] ${provider.name} call failed, falling back to knowledge base:`, err);
      }
    }

    // Fallback: instant built-in knowledge base response.
    return { reply: answerFromKnowledgeBase(message), source: "knowledge-base" };
  });
