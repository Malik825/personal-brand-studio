import type { UIMessage } from "ai";
import { assistantCopy } from "@/content/assistant";

export type PortfolioThread = { id: string; title: string; updatedAt: number; messages: UIMessage[] };
const key = "sule-portfolio-conversations-v1";
let memoryThreads: PortfolioThread[] = [];

export function readThreads(): PortfolioThread[] {
  if (typeof window === "undefined") return [];
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(key) || "[]");
    if (Array.isArray(value)) {
      memoryThreads = value.filter((t): t is PortfolioThread => Boolean(t && typeof t === "object" && typeof t.id === "string" && typeof t.title === "string" && typeof t.updatedAt === "number" && Array.isArray(t.messages)));
    }
  } catch { /* Use this session's copy if storage is unavailable. */ }
  return memoryThreads;
}

export function writeThreads(threads: PortfolioThread[]): boolean {
  memoryThreads = threads;
  try { window.localStorage.setItem(key, JSON.stringify(threads)); return true; }
  catch { return false; }
}

export function createThread(): PortfolioThread {
  const thread = { id: crypto.randomUUID(), title: assistantCopy.newChat, updatedAt: Date.now(), messages: [] };
  writeThreads([thread, ...readThreads()]);
  return thread;
}

export function openInitialThread(): PortfolioThread {
  return readThreads()[0] ?? createThread();
}

export function updateThread(id: string, messages: UIMessage[]): boolean {
  const firstQuestion = messages.find(m => m.role === "user")?.parts.find(p => p.type === "text");
  const title = firstQuestion?.type === "text" ? firstQuestion.text.slice(0, 52) : assistantCopy.newChat;
  return writeThreads(readThreads().map(t => t.id === id ? { ...t, title, messages, updatedAt: Date.now() } : t));
}

export function deleteThread(id: string): void {
  writeThreads(readThreads().filter(t => t.id !== id));
}