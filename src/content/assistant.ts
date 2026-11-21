import { experience, projects, site } from "./index";

export const aboutSections: ReadonlyArray<{ t: string; b: string }> = [
  { t: "Background", b: "I'm a software engineer who has spent my career building customer-facing web products — SaaS platforms, booking systems, e-commerce and subscription services. I work mostly on the frontend and product layer, where engineering decisions meet real users." },
  { t: "Engineering philosophy", b: "Good software is clear before it is clever. I favour simple architectures, readable code and components that are easy to change, because products always evolve faster than anyone plans." },
  { t: "Product-oriented problem solving", b: "Before writing code I want to understand who the feature is for and what success looks like. That context shapes the trade-offs: what to build first, what to simplify and what to leave out." },
  { t: "Distributed teams", b: "I'm used to working remotely with designers, product managers and engineers across time zones. That means clear written communication, ownership of outcomes and keeping work visible." },
];
export const capabilities = ["React", "Next.js", "Angular", "TypeScript", "Component systems", "State management", "API integration", "Responsive & accessible UI", "Performance", "Headless CMS"];

export const assistantCopy = {
  name: "Portfolio companion",
  initials: "SM",
  nav: "Ask Sule’s portfolio",
  title: "A closer look at my work.",
  subtitle: "Experience, decisions, and the projects behind them.",
  welcome: "What would you like to know?",
  suggestions: ["What did Sule build for CyLynk?", "Which projects use Next.js?", "How does Sule approach product engineering?"],
  placeholder: "Ask about my experience or a project…",
  thinking: "Thinking…",
  reasoning: "Answer notes",
  newChat: "New conversation",
  conversations: "Conversations",
  deleteChat: "Delete conversation",
  copy: "Copy answer",
  copied: "Copied",
  send: "Send question",
  stop: "Stop answer",
  loading: "Opening conversation…",
  missing: "This conversation isn’t saved in this browser.",
  storageError: "Your browser couldn’t save this conversation. It will remain available until you leave this page.",
  error: "The answer couldn’t be completed. Please try a new question.",
  stopped: "Answer stopped.",
  invalidRequest: "Please send a text question about the portfolio.",
  unavailable: "Portfolio answers are currently unavailable.",
  configurationError: "AI access isn’t configured for this portfolio.",
  metadata: { title: "Ask the portfolio — Sule Malik", description: "Ask questions about Sule Malik’s engineering experience, project decisions and technical work." },
} as const;

export function portfolioGrounding() {
  return {
    profile: { name: site.name, role: site.role, location: site.location, stack: site.stack, url: "/about" },
    background: aboutSections,
    capabilities,
    experience,
    projects: projects.map(({ tone: _tone, outcome: _outcome, ...project }) => ({ ...project, url: `/work/${project.slug}`, results: "Detailed results have not been published." })),
    contact: { url: "/contact", status: "Email and LinkedIn are placeholders and are not verified contact details." },
  };
}