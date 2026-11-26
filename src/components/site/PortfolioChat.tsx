import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, Copy, MessageCircle, Plus, Trash2 } from "lucide-react";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageAction, MessageActions, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { assistantCopy as copy } from "@/content/assistant";
import { createThread, deleteThread, readThreads, updateThread, type PortfolioThread } from "@/lib/chat-history";
import { trackEvent } from "@/lib/analytics/posthog";

export function PortfolioChat({ threadId }: { threadId: string }) {
  const [threads, setThreads] = useState<PortfolioThread[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { setThreads(readThreads()); setReady(true); }, [threadId]);
  const thread = threads.find(t => t.id === threadId);
  const refresh = useCallback(() => setThreads([...readThreads()]), []);
  if (!ready) return <p className="py-12 text-muted-foreground">{copy.loading}</p>;
  return <ChatWindow key={threadId} threadId={threadId} thread={thread} threads={threads} refresh={refresh} />;
}

function ChatWindow({ threadId, thread, threads, refresh }: { threadId: string; thread: PortfolioThread | undefined; threads: PortfolioThread[]; refresh: () => void }) {
  const navigate = useNavigate();
  const input = useRef<HTMLTextAreaElement>(null);
  const initialThread = useRef(thread);
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState("");
  const [storageError, setStorageError] = useState(false);
  const [copiedId, setCopiedId] = useState("");
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/public/portfolio-chat", body: { threadId } }), [threadId]);
  const { messages, sendMessage, status, stop, clearError } = useChat({
    id: threadId, messages: thread?.messages || [], transport,
    onError: error => { setNotice(error.message || copy.error); },
  });
  const busy = status === "submitted" || status === "streaming";
  useEffect(() => {
    if (initialThread.current) {
      setStorageError(!updateThread(threadId, messages));
      refresh();
    }
  }, [messages, threadId, refresh]);
  useEffect(() => { if (!document.querySelector('[role="dialog"]')) input.current?.focus(); }, [status]);
  useEffect(() => () => { void stop(); }, [stop]);

  const newConversation = () => {
    const next = createThread();
    void navigate({ to: "/ask/$threadId", params: { threadId: next.id } });
  };
  const remove = (id: string) => {
    deleteThread(id);
    if (id === threadId) {
      const next = readThreads()[0] ?? createThread();
      void navigate({ to: "/ask/$threadId", params: { threadId: next.id } });
    } else refresh();
  };
  const submit = (text: string) => {
    if (busy || !thread || !text.trim()) return;
    if (text.length > 2000) { setNotice(copy.questionTooLong); return; }
    trackEvent("assistant_message_sent", {
      query_length: text.length,
      thread_id: threadId,
      surface: "dedicated_page",
    });
    setNotice(""); clearError(); setDraft("");
    void sendMessage({ text: text.trim() });
    input.current?.focus();
  };
  const last = messages.at(-1);
  const waiting = busy && (last?.role !== "assistant" || !last.parts.some(p => p.type === "text" && p.text));

  return (
    <TooltipProvider>
      <div className="grid min-w-0 border-y border-border md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="border-b border-border py-5 md:border-b-0 md:border-r md:pr-5">
          <Button variant="outline" className="w-full justify-start" onClick={newConversation} disabled={busy}><Plus />{copy.newChat}</Button>
          <p className="mb-3 mt-7 text-xs uppercase text-muted-foreground">{copy.conversations}</p>
          <div className="flex max-h-40 gap-2 overflow-auto md:max-h-[560px] md:flex-col">
            {threads.map(t => <div key={t.id} className="flex min-w-[170px] items-center gap-1 md:min-w-0">
              <Button variant={t.id === threadId ? "secondary" : "ghost"} className="min-w-0 flex-1 justify-start" disabled={busy} asChild>
                <Link to="/ask/$threadId" params={{ threadId: t.id }}><MessageCircle className="shrink-0" /><span className="truncate">{t.title}</span></Link>
              </Button>
              <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon-sm" aria-label={copy.deleteChat} disabled={busy} onClick={() => remove(t.id)}><Trash2 /></Button></TooltipTrigger><TooltipContent>{copy.deleteChat}</TooltipContent></Tooltip>
            </div>)}
          </div>
        </aside>
        <div className="flex h-[min(740px,85dvh)] min-h-[420px] min-w-0 flex-col md:pl-7">
          <div className="flex items-center gap-3 border-b border-border py-4">
            <img src="/favicon.svg" alt="" className="size-9" />
            <p className="text-sm font-medium">{copy.name}</p>
          </div>
          <Conversation>
            <ConversationContent className="px-1 py-8">
              {!thread ? <p>{copy.missing}</p> : messages.length === 0 ? <div className="py-6 sm:py-12">
                <h2 className="font-display text-3xl">{copy.welcome}</h2>
                <div className="mt-7 flex flex-col items-start gap-2">
                  {copy.suggestions.map(q => <Button key={q} variant="ghost" className="h-auto max-w-full justify-start whitespace-normal text-left" onClick={() => submit(q)}><ArrowUp className="rotate-45 shrink-0" />{q}</Button>)}
                </div>
              </div> : messages.map(m => <Message key={m.id} from={m.role}>
                <MessageContent className={m.role === "user" ? "group-[.is-user]:bg-foreground group-[.is-user]:text-background" : "w-full leading-relaxed"}>
                  {m.parts.map((part, i) => part.type === "text" ? <MessageResponse key={i} isAnimating={busy && m.id === last?.id}>{part.text}</MessageResponse> : part.type === "reasoning" && part.text ? <Reasoning key={i} defaultOpen={false} isStreaming={busy && m.id === last?.id}><ReasoningTrigger>{copy.reasoning}</ReasoningTrigger><ReasoningContent>{part.text}</ReasoningContent></Reasoning> : null)}
                </MessageContent>
                {m.role === "assistant" && !busy && m.parts.some(p => p.type === "text" && p.text) && <MessageActions><MessageAction tooltip={copiedId === m.id ? copy.copied : copy.copy} onClick={() => {
                  void navigator.clipboard.writeText(m.parts.filter(p => p.type === "text").map(p => p.text).join("\n")).then(() => setCopiedId(m.id)).catch(() => setCopiedId(""));
                }}><Copy /></MessageAction></MessageActions>}
              </Message>)}
              {waiting && <Message from="assistant"><Shimmer>{copy.thinking}</Shimmer></Message>}
            </ConversationContent>
            <ConversationScrollButton aria-label="Scroll to latest answer" />
          </Conversation>
          {notice && <p role="alert" className="mb-3 text-sm text-destructive">{notice}</p>}
          {storageError && <p role="alert" className="mb-3 text-sm text-destructive">{copy.storageError}</p>}
          <div className="border-t border-border py-4">
            <PromptInput onSubmit={({ text }) => submit(text)} maxFiles={0}>
              <PromptInputTextarea ref={input} value={draft} onChange={e => setDraft(e.target.value)} placeholder={copy.placeholder} aria-label={copy.placeholder} maxLength={2000} readOnly={busy || !thread} className="min-h-20" />
              <PromptInputFooter className="justify-end"><PromptInputSubmit status={status} aria-label={busy ? copy.stop : copy.send} disabled={!thread || (!busy && !draft.trim())} onStop={() => { void stop(); setNotice(copy.stopped); }} className="size-9" /></PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}