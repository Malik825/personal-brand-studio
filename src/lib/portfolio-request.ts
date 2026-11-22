import { z } from "zod";
export const portfolioRequestSchema = z.object({
  threadId: z.string().uuid(),
  messages: z.array(z.object({
    id: z.string().min(1).max(200),
    role: z.enum(["user", "assistant"]),
    parts: z.array(z.object({ type: z.string(), text: z.string().max(20000).optional() }).passthrough()).max(30),
  })).min(1).max(100),
}).superRefine((data, ctx) => {
  const last = data.messages.at(-1);
  const text = last?.parts.filter(p => p.type === "text").map(p => p.text || "").join("") || "";
  if (last?.role !== "user" || !text.trim() || text.length > 2000) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid question" });
  if (data.messages.some(m => m.parts.some(p => !["text", "reasoning", "step-start"].includes(p.type)))) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Only text conversations are supported" });
  if (JSON.stringify(data).length > 150000) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Conversation is too long" });
});