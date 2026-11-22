import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, RotateCcw, ArrowUpRight } from "lucide-react";
import { sendChatMessage } from "@/server/chat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: "huggingface" | "groq" | "grok" | "openai" | "knowledge-base";
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hello! I'm Sule's portfolio assistant. You can ask me anything about Sule's engineering stack, architecture, projects, or availability.",
    source: "knowledge-base",
  },
];

const SUGGESTED_PROMPTS = [
  "What is Sule's core tech stack?",
  "Tell me about the Roam mobile app",
  "How does Life Compass handle data?",
  "Is Sule open to new roles?",
];

export function AssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await sendChatMessage({
        data: {
          message: query,
          history,
        },
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: res.reply,
        source: res.source,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I apologize, but I encountered an error while retrieving that answer. You can always reach out directly to Sule at maliksule08@gmail.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const latestSource = messages[messages.length - 1]?.source;

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-expanded={isOpen}
          aria-label="Toggle portfolio assistant"
          className="group flex items-center gap-2.5 rounded-full border border-border bg-card/90 px-4 py-2.5 text-xs font-medium text-foreground backdrop-blur-md transition-colors hover:border-foreground/30 hover:bg-card shadow-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <Sparkles className="size-3.5 text-primary transition-transform duration-300 group-hover:rotate-12" />
          <span className="tracking-wide">Ask Sule&apos;s Assistant</span>
        </motion.button>
      </div>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 z-50 flex h-[580px] w-[calc(100vw-2rem)] max-w-[420px] flex-col rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-xl sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="size-3.5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">Sule&apos;s Assistant</h3>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    {latestSource === "huggingface"
                      ? "Hugging Face AI online"
                      : latestSource === "groq"
                      ? "Groq AI online"
                      : latestSource === "grok"
                      ? "Grok AI online"
                      : latestSource === "openai"
                      ? "GPT-4o online"
                      : "Knowledge base online"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <RotateCcw className="size-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  aria-label="Close assistant"
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-xs leading-relaxed">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground font-medium rounded-br-sm"
                        : "bg-muted/60 text-foreground border border-border/50 rounded-bl-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap space-y-2">
                      {m.content.split("\n\n").map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl bg-muted/60 px-3.5 py-2.5 border border-border/50">
                    <span className="size-1.5 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.3s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.15s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-foreground/40" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompt Chips (only shown if few messages) */}
            {messages.length <= 2 && !isLoading && (
              <div className="border-t border-border/40 px-3 py-2 flex flex-wrap gap-1.5 bg-muted/20">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    <span>{prompt}</span>
                    <ArrowUpRight className="size-2.5 opacity-60" />
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="border-t border-border/70 p-3 bg-card"
            >
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about stack, projects, or roles..."
                  disabled={isLoading}
                  className="w-full rounded-xl border border-input bg-background/70 px-3.5 py-2 pr-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="absolute right-1.5 rounded-lg bg-primary p-1.5 text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-30"
                >
                  <Send className="size-3" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
