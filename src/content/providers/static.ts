import type {
  AboutContent,
  Article,
  ContentProvider,
  Experience,
  Project,
  SiteConfig,
} from "../types";

export const siteConfig: SiteConfig = {
  name: "Sule Malik",
  role: "Product-minded software engineer",
  email: "hello@sulemalik.com",
  linkedin: "https://www.linkedin.com/in/sulemalik",
  location: "Available for remote work worldwide",
  stack: ["React", "React Native", "Next.js", "Angular", "TypeScript"],
};

export const aboutContent: AboutContent = {
  intro:
    "I sit between engineering, product and design — and I build software that works for the people using it and the business behind it.",
  sections: [
    {
      title: "Background",
      body: "I'm a software engineer who has spent my career building customer-facing web products — SaaS platforms, booking systems, e-commerce and subscription services. I work mostly on the frontend and product layer, where engineering decisions meet real users.",
    },
    {
      title: "Engineering philosophy",
      body: "Good software is clear before it is clever. I favour simple architectures, readable code and components that are easy to change, because products always evolve faster than anyone plans.",
    },
    {
      title: "Product-oriented problem solving",
      body: "Before writing code I want to understand who the feature is for and what success looks like. That context shapes the trade-offs: what to build first, what to simplify and what to leave out.",
    },
    {
      title: "Distributed teams",
      body: "I'm used to working remotely with designers, product managers and engineers across time zones. That means clear written communication, ownership of outcomes and keeping work visible.",
    },
  ],
  capabilities: [
    "React",
    "React Native",
    "Next.js",
    "Angular",
    "TypeScript",
    "Component systems",
    "State management",
    "API integration",
    "Responsive & accessible UI",
    "Performance",
    "Headless CMS",
  ],
};

export const projectsData: Project[] = [
  {
    slug: "roam",
    title: "Roam",
    category: "Mobile travel & stay platform",
    year: "2025",
    role: "Mobile & frontend engineering",
    summary:
      "A cross-platform mobile stay booking and travel exploration application with fluid gesture-driven navigation and real-time reservation workflows.",
    stack: ["React Native", "Expo", "NativeWind", "TypeScript", "Clerk", "PostHog"],
    tone: "sand",
    challenge:
      "Delivering a 60fps native feel across iOS and Android with complex gesture interactions, shared element transitions, and offline-resilient auth state.",
    approach: [
      "Engineered fluid screen transitions and bottom-sheet filters using React Native Reanimated and Gesture Handler.",
      "Implemented secure biometric and session persistence via Clerk and Expo SecureStore.",
      "Unified the design token system using NativeWind and Tailwind CSS for rapid styling consistency.",
    ],
    outcome:
      "A responsive, production-ready mobile application delivering frictionless stay discovery and booking journeys across both iOS and Android.",
    image: "/images/roam.jpg",
  },
  {
    slug: "life-compass",
    title: "Life Compass",
    category: "Personal OS & developer productivity",
    year: "2025",
    role: "Product engineering & architecture",
    summary:
      "A comprehensive personal operating system tracking engineering goals, learning progress, financial metrics, and daily reflection habits.",
    stack: ["React 19", "TanStack Start", "TypeScript", "Tailwind CSS", "Supabase", "Recharts"],
    tone: "navy",
    challenge:
      "Consolidating fragmented trackers (goals, learning hours, habit consistency, finance) into a single cohesive dashboard without cognitive overload.",
    approach: [
      "Structured modular tracking widgets with weekly review aggregation and habit consistency indicators.",
      "Implemented Supabase Row-Level Security and real-time syncing for daily evening check-ins.",
      "Built data visualization modules with Recharts to correlate learning time with project output.",
    ],
    outcome:
      "A centralized personal development dashboard empowering structured daily reflection and measurable long-term career progression.",
    image: "/images/life-compass.jpg",
  },
  {
    slug: "sushi-craft",
    title: "Sushi Craft",
    category: "Restaurant & online ordering platform",
    year: "2024",
    role: "Full-stack engineering",
    summary:
      "An artisanal culinary storefront and online ordering platform featuring interactive menu curation, cart drawer management, and live order tracking.",
    stack: ["SvelteKit", "Svelte 5", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    tone: "ink",
    challenge:
      "Balancing rich visual motion and high-fidelity food presentation with immediate checkout response times and zero-latency cart updates.",
    approach: [
      "Architected state-driven order flows using Svelte 5 runes and SvelteKit server endpoints for instant transitions.",
      "Designed an administrative dashboard for real-time inventory management, menu reordering, and live order tracking.",
      "Optimized heavy culinary asset pipelines with responsive images and clean typographic hierarchy.",
    ],
    outcome:
      "A performant dining and e-commerce experience combining editorial food presentation with seamless cart-to-kitchen workflows.",
    image: "/images/sushi.png",
  },
  {
    slug: "cylynk",
    title: "CyLynk",
    category: "SaaS & LMS platform",
    year: "2025",
    role: "Frontend & product engineering",
    summary:
      "A learning management and SaaS platform built for organisations that need to deliver structured training at scale.",
    stack: ["Angular", "TypeScript", "REST APIs"],
    tone: "ink",
    challenge:
      "Course authors, learners and administrators each needed very different views of the same content, without the product feeling like three separate tools.",
    approach: [
      "Mapped the core journeys for each role before designing any screens.",
      "Built a shared component library so dashboards, course views and admin tools stayed consistent.",
      "Structured state around course progress to keep the learner experience fast and predictable.",
    ],
    outcome:
      "A cohesive platform foundation that the team can extend with new course types and reporting features. Detailed results to be added.",
  },
  {
    slug: "derivconnect",
    title: "DerivConnect",
    category: "Fintech & trade replication platform",
    year: "2024",
    role: "Full-stack & product engineering",
    summary:
      "An automated trade copying and account management platform linking Deriv MT5 broker accounts directly to master signal execution with real-time risk controls.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Deriv API", "Supabase"],
    tone: "rose",
    challenge:
      "Traders frequently missed manual trade signals due to execution delays and slippage, while managing multi-tier subscriptions and automated account replication without requiring client-side VPS setups was complex.",
    approach: [
      "Engineered a high-speed copier bridge interfacing with Deriv broker accounts to replicate trades in milliseconds without client VPS.",
      "Built member and administrative portals featuring automated checkout, risk-controlled lot sizing, and account connection status monitoring.",
      "Designed high-contrast, scannable editorial dashboards focused on performance transparency and capital protection.",
    ],
    outcome:
      "Delivered a seamless automated trade replication platform supporting active client connections with zero manual copy lag and robust subscription handling.",
    image: "/images/derivconnect.png",
  },
  {
    slug: "glovera",
    title: "Glovera",
    category: "Beauty booking & business platform",
    year: "2024",
    role: "Product engineering",
    summary:
      "A booking and business management platform helping beauty professionals manage appointments, services and clients.",
    stack: ["Next.js", "React", "TypeScript"],
    tone: "rose",
    challenge:
      "Booking needed to feel effortless for clients while giving business owners real control over availability, services and staff.",
    approach: [
      "Designed a short, mobile-first booking flow with clear service and time selection.",
      "Built business-side tools for managing schedules and service menus.",
      "Focused on performance so pages load quickly on mobile connections.",
    ],
    outcome:
      "A booking experience shaped around both sides of the marketplace. Detailed results to be added.",
  },
  {
    slug: "urban-vault",
    title: "Urban Vault",
    category: "E-commerce",
    year: "2024",
    role: "Frontend engineering",
    summary:
      "An e-commerce storefront focused on clean product presentation and a frictionless path to checkout.",
    stack: ["React", "Next.js", "TypeScript"],
    tone: "sand",
    challenge:
      "The brand needed a storefront that felt premium while staying fast and easy to manage as the catalogue grew.",
    approach: [
      "Built reusable product, collection and cart components.",
      "Kept the checkout path short with clear feedback at each step.",
      "Optimised images and rendering for quick browsing.",
    ],
    outcome:
      "A maintainable storefront ready for catalogue growth. Detailed results to be added.",
    image: "/images/urban-vault.jpg",
  },
  {
    slug: "a1tips",
    title: "A1TIPS",
    category: "Subscription platform",
    year: "2023",
    role: "Full product build",
    summary:
      "A subscription platform delivering sports analytics and insights to paying members.",
    stack: ["React", "TypeScript", "Payments"],
    tone: "navy",
    challenge:
      "Members needed timely, easy-to-read insights, and the business needed a reliable subscription flow behind it.",
    approach: [
      "Designed data-dense views that stay readable on small screens.",
      "Built the subscription and membership journey end to end.",
      "Separated content from presentation so insights could be published quickly.",
    ],
    outcome:
      "A subscription product that balances content delivery with business needs. Detailed results to be added.",
    image: "/images/a1tips.png",
  },
];

export const articlesData: Article[] = [
  {
    slug: "product-thinking-for-engineers",
    title: "Product thinking is an engineering skill",
    topic: "Product",
    date: "2026-10-02",
    readingTime: "6 min",
    excerpt:
      "Why understanding the problem behind a ticket makes you a better engineer — and how to practise it.",
    body: [
      "Most tickets describe a solution. The best engineering work often starts by asking which problem that solution is meant to solve.",
      "When engineers understand the user and the business goal, they make better trade-offs: what to build first, what to simplify, and what to leave out entirely.",
      "This article explores practical habits for building that understanding into everyday engineering work.",
    ],
  },
  {
    slug: "component-libraries-that-last",
    title: "Building component libraries that last",
    topic: "Engineering",
    date: "2026-08-14",
    readingTime: "8 min",
    excerpt:
      "Notes on designing shared UI components that teams actually want to use and extend.",
    body: [
      "A component library succeeds when it makes the right thing the easy thing.",
      "This piece covers naming, composition, documentation and how to evolve components without breaking the products that depend on them.",
    ],
  },
  {
    slug: "working-across-time-zones",
    title: "Shipping well across time zones",
    topic: "Collaboration",
    date: "2026-06-21",
    readingTime: "5 min",
    excerpt:
      "What distributed teams taught me about writing, ownership and asynchronous decisions.",
    body: [
      "Distributed work rewards clear writing and clear ownership.",
      "This article shares practices for keeping momentum when your teammates are asleep while you work.",
    ],
  },
];

export const experienceData: Experience[] = [
  {
    period: "Present",
    role: "Software Engineer",
    org: "Independent & product teams",
    note: "Building SaaS, e-commerce and subscription products with React, Next.js and Angular.",
  },
  {
    period: "Previously",
    role: "Frontend Engineer",
    org: "Distributed product teams",
    note: "Shipped customer-facing features in collaboration with designers, product managers and backend engineers.",
  },
];

export class StaticContentProvider implements ContentProvider {
  async getSite(): Promise<SiteConfig> {
    return siteConfig;
  }

  async getProjects(): Promise<Project[]> {
    return projectsData;
  }

  async getProject(slug: string): Promise<Project | undefined> {
    return projectsData.find((p) => p.slug === slug);
  }

  async getArticles(): Promise<Article[]> {
    return articlesData;
  }

  async getArticle(slug: string): Promise<Article | undefined> {
    return articlesData.find((a) => a.slug === slug);
  }

  async getExperience(): Promise<Experience[]> {
    return experienceData;
  }

  async getAbout(): Promise<AboutContent> {
    return aboutContent;
  }
}
