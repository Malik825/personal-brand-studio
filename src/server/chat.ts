import { createServerFn } from "@tanstack/react-start";
import { projectsData, experienceData, aboutContent, siteConfig } from "@/content/providers/static";
import { resolveChatProvider } from "@/lib/ai/provider";
import { answerFromKnowledgeBase } from "@/lib/ai/knowledge";

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
        .map((p, i) => `  ${i + 1}. ${p.title} (${p.year}) — ${p.category}. ${p.summary} Stack: ${p.stack.join(", ")}. Case study: /work/${p.slug}`)
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
