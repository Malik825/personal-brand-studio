import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";

/**
 * Server-only AI provider resolution. Keys live in server env vars (Vercel
 * project settings / local .env) and never reach the browser.
 *
 * Priority: Hugging Face (free) → Groq (free) → OpenAI. All three expose an
 * OpenAI-compatible Chat Completions API, so one code path serves them all.
 */
export type ChatProvider = { name: "huggingface" | "groq" | "openai"; baseURL: string; apiKey: string; model: string };

type Env = Record<string, string | undefined>;

const usable = (v: string | undefined, prefix: string) => !!v && v.startsWith(prefix) && !v.includes("your-");

export function resolveChatProvider(env: Env): ChatProvider | undefined {
  const hf = env["HF_TOKEN"] || env["HUGGINGFACE_API_KEY"];
  if (usable(hf, "hf_")) {
    return { name: "huggingface", baseURL: "https://router.huggingface.co/v1", apiKey: hf!, model: env["HF_MODEL"] || "Qwen/Qwen2.5-72B-Instruct" };
  }
  const groq = env["GROQ_API_KEY"];
  if (usable(groq, "gsk_")) {
    return { name: "groq", baseURL: "https://api.groq.com/openai/v1", apiKey: groq!, model: env["GROQ_MODEL"] || "llama-3.3-70b-versatile" };
  }
  const openai = env["OPENAI_API_KEY"];
  if (usable(openai, "sk-")) {
    return { name: "openai", baseURL: "https://api.openai.com/v1", apiKey: openai!, model: env["OPENAI_MODEL"] || "gpt-4o-mini" };
  }
  return undefined;
}

/** Streams a Chat Completions call and records any upstream HTTP failure. */
export function createChatCompletionsCall(
  request: Request,
  provider: ChatProvider,
  messages: ModelMessage[],
  instructions: string,
) {
  let failure: { status: number; message: string } | undefined;
  let resolveUpstream: () => void = () => {};
  const upstreamReady = new Promise<void>(resolve => { resolveUpstream = resolve; });

  const client = createOpenAI({
    baseURL: provider.baseURL,
    apiKey: provider.apiKey,
    fetch: async (input, init) => {
      try {
        const response = await fetch(input, init);
        if (!response.ok) {
          const body = (await response.clone().json().catch(() => null)) as { message?: string; error?: { message?: string } | string } | null;
          const detail = typeof body?.error === "string" ? body.error : body?.error?.message || body?.message;
          console.warn(`[portfolio-chat] ${provider.name} ${response.status}: ${detail ?? "unknown error"}`);
          failure = { status: response.status, message: "Portfolio answers are currently unavailable." };
        }
        return response;
      } catch (error) {
        failure = { status: 503, message: "Portfolio answers are currently unavailable." };
        throw error;
      } finally {
        resolveUpstream();
      }
    },
  });

  const result = streamText({
    model: client.chat(provider.model),
    instructions,
    maxRetries: 0,
    temperature: 0.3,
    maxOutputTokens: 700,
    messages,
    abortSignal: request.signal,
  });

  return { result, waitForUpstream: () => upstreamReady, getFailure: () => failure };
}
