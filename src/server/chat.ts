import { createServerFn } from "@tanstack/react-start";
import { projectsData, articlesData, experienceData, aboutContent, siteConfig } from "@/content/providers/static";

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
      `• **Frontend**: React 19, Next.js, Angular, TypeScript, Tailwind CSS, Motion / Framer Motion\n` +
      `• **Mobile**: React Native, Expo, NativeWind, Gesture Handler, Reanimated\n` +
      `• **Architecture & State**: TanStack Start & Router, React Query, Zustand, Redux Toolkit\n` +
      `• **Backend & Data**: Supabase (PostgreSQL, RLS, Edge Functions, Realtime), Node.js, GraphQL, Sanity.io CMS\n` +
      `• **Engineering Standards**: Strict TypeScript types, accessible design systems, resilient error boundaries, and zero-compromise Core Web Vitals.`
    );
  }

  // Roam project
  if (q.includes("roam") || q.includes("mobile app") || q.includes("travel")) {
    const roam = projectsData.find((p) => p.slug === "roam");
    return (
      `**Roam — Mobile Stay & Travel Exploration App**\n\n` +
      `• **Role**: ${roam?.role ?? "Mobile & frontend engineering"}\n` +
      `• **Stack**: React Native, Expo, NativeWind, TypeScript, Clerk, PostHog\n` +
      `• **Challenge**: Delivering a smooth 60fps native experience across iOS and Android with complex gesture interactions and offline-resilient auth state.\n` +
      `• **Key Outcome**: Frictionless stay discovery and booking journeys with biometric persistence and unified design tokens.`
    );
  }

  // Life Compass project
  if (q.includes("life compass") || q.includes("compass") || q.includes("tracker") || q.includes("productivity")) {
    const lc = projectsData.find((p) => p.slug === "life-compass");
    return (
      `**Life Compass — Personal OS & Developer Productivity Dashboard**\n\n` +
      `• **Role**: ${lc?.role ?? "Product engineering & architecture"}\n` +
      `• **Stack**: React 19, TanStack Start, TypeScript, Tailwind CSS, Supabase, Recharts\n` +
      `• **Challenge**: Consolidating fragmented trackers (goals, learning hours, habit consistency, finance) into a single cohesive dashboard without cognitive overload.\n` +
      `• **Key Outcome**: Modular tracking widgets with weekly review aggregation, Supabase RLS, and real-time syncing.`
    );
  }

  // Sushi Craft project
  if (q.includes("sushi") || q.includes("sushi craft") || q.includes("omakase") || q.includes("restaurant")) {
    const sc = projectsData.find((p) => p.slug === "sushi-craft");
    return (
      `**Sushi Craft — Omakase Dining & Table Reservation System**\n\n` +
      `• **Role**: ${sc?.role ?? "Frontend engineering & UI craft"}\n` +
      `• **Stack**: Next.js 15, TypeScript, Tailwind CSS, Motion, Radix UI\n` +
      `• **Key Outcome**: An immersive editorial dining portal with real-time seat slot selection, multi-course pairing guides, and fluid menu animations.`
    );
  }

  // DerivConnect project
  if (q.includes("deriv") || q.includes("trading") || q.includes("derivconnect") || q.includes("fintech")) {
    const dc = projectsData.find((p) => p.slug === "derivconnect");
    return (
      `**DerivConnect — Multi-Asset Trading Terminal**\n\n` +
      `• **Role**: ${dc?.role ?? "Full-stack engineering & real-time systems"}\n` +
      `• **Stack**: React, TypeScript, WebSockets, Tailwind CSS, lightweight-charts\n` +
      `• **Key Outcome**: High-throughput tick processing with sub-50ms render latency, resilient connection recovery, and customizable charting workspaces.`
    );
  }

  // Projects general
  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("case stud")) {
    const list = projectsData
      .map((p) => `• **${p.title}** (${p.year}) — ${p.category} [${p.stack.slice(0, 3).join(", ")}]`)
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
      .map((e) => `• **${e.role}** at ${e.company} (${e.period})\n  ${e.summary}`)
      .join("\n\n");
    return (
      `**Career Summary**\n\n${exp}\n\n` +
      `Sule specializes in bridging design and product engineering—translating intricate business requirements and design intent into robust, accessible, 60fps applications.`
    );
  }

  // Philosophy & approach
  if (q.includes("philosophy") || q.includes("approach") || q.includes("values") || q.includes("how do you work")) {
    return (
      `**Engineering Philosophy**\n\n` +
      `*“Think deeply. Build intentionally. Ship thoughtfully.”*\n\n` +
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
      `• **Email**: [${siteConfig.email}](mailto:${siteConfig.email})\n` +
      `• **Location**: Remote-first / Global\n` +
      `• **Get in touch**: Fill out the [Contact Form](/contact) or connect via [LinkedIn](${siteConfig.socials.linkedin}).`
    );
  }

  // Sanity / Content architecture
  if (q.includes("sanity") || q.includes("cms") || q.includes("content")) {
    return (
      `This portfolio features a decoupled, Sanity-ready content architecture:\n\n` +
      `• All site copy and data are typed via the \`ContentProvider\` interface.\n` +
      `• The active provider switches smoothly between static local data and live Sanity.io Content Lake queries.\n` +
      `• Zero UI components or routes hardcode content, making CMS migration completely seamless.`
    );
  }

  // Default helpful overview
  return (
    `Hello! I'm Sule Malik's portfolio assistant. I can answer questions about:\n\n` +
    `• **Engineering Stack**: React 19, React Native, TypeScript, TanStack Start, Supabase, Tailwind CSS\n` +
    `• **Featured Projects**: Roam (mobile travel app), Life Compass (personal OS), Sushi Craft, DerivConnect\n` +
    `• **Experience & Background**: Engineering roles, design system craft, and production leadership\n` +
    `• **Availability & Contact**: Hiring availability, contract collaboration, and direct contact details\n\n` +
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
    const hfToken = process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;
    const grokKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    const systemPrompt = `You are the digital portfolio assistant for Sule Malik, a product-minded software engineer based globally.
Your task is to answer inquiries from prospective clients, engineering leaders, and recruiters accurately, warmly, and concisely.

Context about Sule Malik:
- Philosophy: "Think deeply. Build intentionally. Ship thoughtfully."
- Core Tech Stack: React 19, React Native, TypeScript, TanStack Start, Next.js, Angular, Tailwind CSS, Supabase (PostgreSQL, RLS, Realtime), Node.js, Sanity.io CMS.
- Key Projects:
  1. Roam: Cross-platform mobile stay booking app built with React Native, Expo, NativeWind, Clerk, PostHog.
  2. Life Compass: Personal OS and engineering metrics dashboard built with React 19, TanStack Start, Supabase, Recharts.
  3. Sushi Craft: Omakase dining reservation platform built with Next.js 15, Radix UI, Motion.
  4. DerivConnect: High-throughput real-time trading terminal built with WebSockets, lightweight-charts, React.
  5. Urban Vault: Minimalist architectural e-commerce store with fluid cart transitions.
  6. A1 Tips: Real-time football prediction and sports analytics engine with interactive probability modeling.
- Availability: Open to select full-time product engineering opportunities, contract roles, and technical advisory.
- Contact: Email is ${siteConfig.email}. LinkedIn is ${siteConfig.socials.linkedin}. GitHub is ${siteConfig.socials.github}.

Guidelines:
- Keep answers concise (1-3 brief paragraphs or bullet points).
- Adopt an articulate, polite, engineering-competent tone (editorial and refined, matching the website's Swiss aesthetic).
- Use Markdown formatting with links and bolding where helpful.
- If asked about something completely outside Sule's work or skills, politely steer back to Sule's engineering background.`;

    const formattedMessages = [
      ...history.map((h) => ({
        role: h.role,
        content: h.content,
      })),
      { role: "user" as const, content: message },
    ];

    // 1. Try Hugging Face Serverless API (Free tier) if configured
    if (hfToken && hfToken.startsWith("hf_") && !hfToken.includes("your-")) {
      try {
        const { createOpenAI } = await import("@ai-sdk/openai");
        const { generateText } = await import("ai");

        const hf = createOpenAI({
          baseURL: "https://router.huggingface.co/v1",
          apiKey: hfToken,
        });

        const { text } = await generateText({
          model: hf("Qwen/Qwen2.5-72B-Instruct"),
          system: systemPrompt,
          messages: formattedMessages,
          maxTokens: 500,
          temperature: 0.3,
        });

        return {
          reply: text,
          source: "huggingface",
        };
      } catch (err) {
        console.warn("[ChatServerFn] Hugging Face call failed, falling back to next provider:", err);
      }
    }

    // 2. Try Groq (Free tier with ultra-fast Llama 3.3 70B) if configured
    if (groqKey && groqKey.startsWith("gsk_") && !groqKey.includes("your-")) {
      try {
        const { createOpenAI } = await import("@ai-sdk/openai");
        const { generateText } = await import("ai");

        const groq = createOpenAI({
          baseURL: "https://api.groq.com/openai/v1",
          apiKey: groqKey,
        });

        const { text } = await generateText({
          model: groq("llama-3.3-70b-versatile"),
          system: systemPrompt,
          messages: formattedMessages,
          maxTokens: 600,
          temperature: 0.3,
        });

        return {
          reply: text,
          source: "groq",
        };
      } catch (err) {
        console.warn("[ChatServerFn] Groq call failed, falling back to next provider:", err);
      }
    }

    // 3. Try Grok AI (xAI) if configured
    if (grokKey && grokKey.length > 10 && !grokKey.includes("your-")) {
      try {
        const { createOpenAI } = await import("@ai-sdk/openai");
        const { generateText } = await import("ai");

        const xai = createOpenAI({
          baseURL: "https://api.x.ai/v1",
          apiKey: grokKey,
        });

        const { text } = await generateText({
          model: xai("grok-2-latest"),
          system: systemPrompt,
          messages: formattedMessages,
          maxTokens: 600,
          temperature: 0.3,
        });

        return {
          reply: text,
          source: "grok",
        };
      } catch (err) {
        console.warn("[ChatServerFn] Grok call failed, attempting fallback:", err);
      }
    }

    // 4. Try OpenAI if configured
    if (openAiKey && openAiKey.startsWith("sk-") && !openAiKey.includes("your-")) {
      try {
        const { createOpenAI } = await import("@ai-sdk/openai");
        const { generateText } = await import("ai");

        const openai = createOpenAI({ apiKey: openAiKey });

        const { text } = await generateText({
          model: openai("gpt-4o-mini"),
          system: systemPrompt,
          messages: formattedMessages,
          maxTokens: 500,
          temperature: 0.3,
        });

        return {
          reply: text,
          source: "openai",
        };
      } catch (err) {
        console.warn("[ChatServerFn] OpenAI call failed, falling back to knowledge base:", err);
      }
    }

    // 5. Fallback: fast, instant knowledge base response
    const reply = answerFromKnowledgeBase(message);
    return {
      reply,
      source: "knowledge-base",
    };
  });
