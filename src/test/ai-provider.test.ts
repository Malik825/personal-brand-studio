import { describe, expect, it } from "vitest";
import { resolveChatProvider } from "@/lib/ai/provider";

describe("AI provider resolution", () => {
  it("returns nothing when no usable key is configured", () => {
    expect(resolveChatProvider({})).toBeUndefined();
    expect(resolveChatProvider({ HF_TOKEN: "", GROQ_API_KEY: "gsk_your-key" })).toBeUndefined();
  });
  it("prefers Hugging Face, then Groq, then OpenAI", () => {
    const all = { HF_TOKEN: "hf_abc123", GROQ_API_KEY: "gsk_abc123", OPENAI_API_KEY: "sk-abc123" };
    expect(resolveChatProvider(all)?.name).toBe("huggingface");
    expect(resolveChatProvider({ ...all, HF_TOKEN: undefined })?.name).toBe("groq");
    expect(resolveChatProvider({ OPENAI_API_KEY: "sk-abc123" })?.name).toBe("openai");
  });
  it("allows the model to be overridden via env", () => {
    expect(resolveChatProvider({ GROQ_API_KEY: "gsk_abc", GROQ_MODEL: "llama-3.1-8b-instant" })?.model).toBe("llama-3.1-8b-instant");
  });
});
