import type { Article, Experience, Project } from "./types";
export type * from "./types";

export const site = {
  name: "Sule Malik",
  role: "Product-minded software engineer",
  email: "hello@sulemalik.com",
  linkedin: "https://www.linkedin.com/in/sulemalik",
  location: "Available for remote work worldwide",
  stack: ["React", "Next.js", "Angular", "TypeScript"],
};

export const projects: Project[] = [
  {
    slug: "cylynk", title: "CyLynk", category: "SaaS & LMS platform", year: "2025", role: "Frontend & product engineering",
    summary: "A learning management and SaaS platform built for organisations that need to deliver structured training at scale.",
    stack: ["Angular", "TypeScript", "REST APIs"], tone: "ink",
    challenge: "Course authors, learners and administrators each needed very different views of the same content, without the product feeling like three separate tools.",
    approach: ["Mapped the core journeys for each role before designing any screens.", "Built a shared component library so dashboards, course views and admin tools stayed consistent.", "Structured state around course progress to keep the learner experience fast and predictable."],
    outcome: "A cohesive platform foundation that the team can extend with new course types and reporting features. Detailed results to be added.",
  },
  {
    slug: "glovera", title: "Glovera", category: "Beauty booking & business platform", year: "2024", role: "Product engineering",
    summary: "A booking and business management platform helping beauty professionals manage appointments, services and clients.",
    stack: ["Next.js", "React", "TypeScript"], tone: "rose",
    challenge: "Booking needed to feel effortless for clients while giving business owners real control over availability, services and staff.",
    approach: ["Designed a short, mobile-first booking flow with clear service and time selection.", "Built business-side tools for managing schedules and service menus.", "Focused on performance so pages load quickly on mobile connections."],
    outcome: "A booking experience shaped around both sides of the marketplace. Detailed results to be added.",
  },
  {
    slug: "urban-vault", title: "Urban Vault", category: "E-commerce", year: "2024", role: "Frontend engineering",
    summary: "An e-commerce storefront focused on clean product presentation and a frictionless path to checkout.",
    stack: ["React", "Next.js", "TypeScript"], tone: "sand",
    challenge: "The brand needed a storefront that felt premium while staying fast and easy to manage as the catalogue grew.",
    approach: ["Built reusable product, collection and cart components.", "Kept the checkout path short with clear feedback at each step.", "Optimised images and rendering for quick browsing."],
    outcome: "A maintainable storefront ready for catalogue growth. Detailed results to be added.",
  },
  {
    slug: "a1tips", title: "A1TIPS", category: "Subscription platform", year: "2023", role: "Full product build",
    summary: "A subscription platform delivering sports analytics and insights to paying members.",
    stack: ["React", "TypeScript", "Payments"], tone: "navy",
    challenge: "Members needed timely, easy-to-read insights, and the business needed a reliable subscription flow behind it.",
    approach: ["Designed data-dense views that stay readable on small screens.", "Built the subscription and membership journey end to end.", "Separated content from presentation so insights could be published quickly."],
    outcome: "A subscription product that balances content delivery with business needs. Detailed results to be added.",
  },
];

export const articles: Article[] = [
  {
    slug: "product-thinking-for-engineers", title: "Product thinking is an engineering skill", topic: "Product", date: "2026-10-02", readingTime: "6 min",
    excerpt: "Why understanding the problem behind a ticket makes you a better engineer — and how to practise it.",
    body: ["Placeholder article. Most tickets describe a solution. The best engineering work often starts by asking which problem that solution is meant to solve.", "When engineers understand the user and the business goal, they make better trade-offs: what to build first, what to simplify, and what to leave out entirely.", "This article will explore practical habits for building that understanding into everyday engineering work."],
  },
  {
    slug: "component-libraries-that-last", title: "Building component libraries that last", topic: "Engineering", date: "2026-08-14", readingTime: "8 min",
    excerpt: "Notes on designing shared UI components that teams actually want to use and extend.",
    body: ["Placeholder article. A component library succeeds when it makes the right thing the easy thing.", "This piece will cover naming, composition, documentation and how to evolve components without breaking the products that depend on them."],
  },
  {
    slug: "working-across-time-zones", title: "Shipping well across time zones", topic: "Collaboration", date: "2026-06-21", readingTime: "5 min",
    excerpt: "What distributed teams taught me about writing, ownership and asynchronous decisions.",
    body: ["Placeholder article. Distributed work rewards clear writing and clear ownership.", "This article will share practices for keeping momentum when your teammates are asleep while you work."],
  },
];

export const experience: Experience[] = [
  { period: "Present", role: "Software Engineer", org: "Independent & product teams", note: "Building SaaS, e-commerce and subscription products with React, Next.js and Angular." },
  { period: "Previously", role: "Frontend Engineer", org: "Distributed product teams", note: "Shipped customer-facing features in collaboration with designers, product managers and backend engineers." },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const formatDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
