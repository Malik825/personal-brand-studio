import type {
  AboutContent,
  Article,
  Author,
  ContentProvider,
  Experience,
  Project,
  SiteConfig,
} from "../types";

export const suleMalikAuthor: Author = {
  name: "Sule Malik",
  role: "Product Engineer",
  bio: "Product-minded software engineer specializing in React 19, TypeScript, React Native, and high-performance web systems. Based in Asante Mampong, Ghana.",
  image: "https://cdn.sanity.io/images/wcfopvjq/production/263d54617b133650d6aa93c7639c82b097eafa9e-1086x1448.png",
  location: "Asante Mampong, Ghana",
  email: "abdulmaliksuleman75@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdulmalik-suleman-14a8501a9/",
  github: "https://github.com/malik825",
  twitter: "https://twitter.com/SuleMalik",
};

export const siteConfig: SiteConfig = {
  name: "Sule Malik",
  role: "Product-minded software engineer",
  email: "abdulmaliksuleman75@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdulmalik-suleman-14a8501a9/",
  github: "https://github.com/malik825",
  location: "Asante Mampong, Kumasi, Ghana",
  stack: ["React", "React Native", "Next.js", "Angular", "TypeScript"],
  author: suleMalikAuthor,
};

export const aboutContent: AboutContent = {
  intro:
    "I'm Sule Malik, a product-minded Software Engineer based in Asante Mampong, Ghana. I build scalable web applications, SaaS platforms, interactive dashboards, and e-commerce experiences that solve practical business problems.",
  bio: [
    "I'm Sule Malik, a product-minded Software Engineer based in Asante Mampong, Ghana. I build scalable web applications, SaaS platforms, interactive dashboards, and e-commerce experiences that solve practical business problems.",
    "My work sits at the intersection of software engineering, product thinking, and user experience. I care about more than getting features working. I focus on building reliable systems, writing maintainable code, improving application performance, and creating interfaces that make complex workflows feel intuitive.",
    "I work primarily with **React, Next.js, Angular, TypeScript, and modern frontend technologies**, with experience integrating APIs, managing application state, building authentication workflows, and working with backend services such as Node.js, Express, Supabase, and PostgreSQL.",
    "Across my projects, I've contributed to production web platforms, learning management systems, content-driven websites, and e-commerce applications. I'm particularly interested in frontend architecture, system design, performance optimization, and building software that can grow alongside the businesses that depend on it.",
    "I enjoy collaborating with distributed engineering teams, taking ownership of problems, communicating technical decisions clearly, and following projects through from implementation to delivery. I'm always interested in meaningful engineering challenges, collaborative teams, and opportunities to build products that make a difference.",
  ],
  principles: [
    {
      number: "01",
      title: "Clarity Over Cleverness",
      tagline: "Architecture that outlasts trends",
      body: "Good software is clear before it is clever. I favor simple architectures, explicit data flows, and modular components that are effortless to refactor, because real products evolve much faster than rigid plans.",
    },
    {
      number: "02",
      title: "Product-Led Problem Solving",
      tagline: "Code as a business lever",
      body: "Before writing code, I obsess over who the feature is for and what measurable success looks like. That context shapes every trade-off: what to build first, what to simplify, and what to leave out.",
    },
    {
      number: "03",
      title: "Craft & Micro-Interactions",
      tagline: "The tactile user experience",
      body: "Motion and responsiveness aren't cosmetic additions; they are communication. Fluid 60fps gestures, optimistic updates, and instant visual feedback turn utility into delightful, trustworthy software.",
    },
    {
      number: "04",
      title: "Autonomous Collaboration",
      tagline: "Async rigor across time zones",
      body: "Experienced in remote-first environments across GMT, EST, and CET. High agency means clear written documentation, continuous visibility, and taking end-to-end ownership from concept to production.",
    },
  ],
  capabilityGroups: [
    {
      category: "Frontend & Mobile",
      items: [
        "React 19",
        "React Native (Expo)",
        "TypeScript",
        "Next.js",
        "TanStack Start / Router",
        "Tailwind CSS",
        "Angular",
      ],
    },
    {
      category: "Architecture & Performance",
      items: [
        "Design Systems",
        "Web Vitals Optimization",
        "Headless CMS (Sanity.io)",
        "State Machines",
        "Offline-Resilient Sync",
        "Gesture Orchestration",
      ],
    },
    {
      category: "Data & Cloud Infrastructure",
      items: [
        "Supabase (PostgreSQL)",
        "Edge Functions",
        "REST & GraphQL APIs",
        "Paystack / Mobile Money",
        "Webhooks & Automation",
        "Nitro / Vercel Deployments",
      ],
    },
  ],
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
  learningTopics: [
    {
      id: "ai",
      number: "01",
      title: "AI & Agentic Engineering (AI / A1)",
      category: "Applied Intelligence",
      badge: "AI SDK & Agentic Flows",
      status: "Active Exploration",
      whyItMatters:
        "AI transforms applications from rigid forms into adaptive, intent-driven software when paired with deterministic grounding and reliable fallbacks.",
      tools: [
        "Vercel AI SDK",
        "Model Context Protocol (MCP)",
        "LangChain / LlamaIndex",
        "OpenAI & Claude APIs",
        "Deterministic Grounding",
      ],
      description:
        "Integrating Large Language Models, streaming chunk protocols, and multi-agent workflows into consumer and enterprise products. Obsessing over structured grounding, retrieval-augmented generation (RAG), and zero-latency fallbacks so AI features feel snappy, reliable, and genuinely useful.",
      takeaways: [
        "Vercel AI SDK & Model Context Protocol (MCP)",
        "Prompt engineering & streaming chunk protocols",
        "Deterministic fallbacks & zero-latency offline knowledge",
      ],
    },
    {
      id: "analytics",
      number: "02",
      title: "Product Analytics & User Telemetry",
      category: "Growth & Telemetry",
      badge: "Event Models & Funnels",
      status: "Continuous Research",
      whyItMatters:
        "Writing code without telemetry is guessing. Real user interaction funnels expose friction points and provide empirical proof for technical refactoring.",
      tools: [
        "PostHog",
        "Mixpanel",
        "Semantic Event Schemas",
        "Conversion Funnels",
        "Cohort Retention",
      ],
      description:
        "Connecting engineering precision to business impact. Designing semantic event taxonomies, tracking conversion funnels, and analyzing retention curves using PostHog and Mixpanel to inform architectural trade-offs with empirical user data.",
      takeaways: [
        "Funnel analysis & cohort retention mechanics",
        "Privacy-safe client-side telemetry schemas",
        "Transforming user friction points into code improvements",
      ],
    },
    {
      id: "seo",
      number: "03",
      title: "Technical & Structural SEO",
      category: "Search & Visibility",
      badge: "Schema.org & Web Vitals",
      status: "Production Standard",
      whyItMatters:
        "High-performance architecture must be discoverable. Clean semantic HTML, rich microdata, and sub-1.2s LCP maximize organic indexing efficiency.",
      tools: [
        "Schema.org Microdata",
        "JSON-LD",
        "Core Web Vitals",
        "Lighthouse CI",
        "SSR / SSG Optimization",
      ],
      description:
        "Mastering the technical foundations that make web applications effortlessly discoverable. Crafting semantic HTML hierarchies, dynamic Schema.org JSON-LD microdata, crawl-budget optimization, and sub-1.2s Largest Contentful Paint (LCP) performance.",
      takeaways: [
        "Structured data & automated JSON-LD rich snippets",
        "Core Web Vitals (LCP, INP, CLS) green-tier scoring",
        "SSR/SSG hybrid caching & crawl efficiency",
      ],
    },
    {
      id: "aeo-geo",
      number: "04",
      title: "AEO & GEO (Answer & Generative Engines)",
      category: "Next-Gen Discovery",
      badge: "Perplexity & AI Overviews",
      status: "Active Research",
      whyItMatters:
        "The next decade of organic discovery is defined by LLM synthesis. Formatting content for entity grounding ensures generative engines cite your work accurately.",
      tools: [
        "Perplexity Citations",
        "Google AI Overviews",
        "Entity Graphs",
        "Structured Claim Anchors",
        "Knowledge Base Grounding",
      ],
      description:
        "Exploring how search is evolving beyond 10 blue links into generative synthesis (ChatGPT Search, Perplexity, Google AI Overviews). Architecting content with clear entity relationships, concise takeaway anchors, and verifiable claims so it gets cited as authoritative grounding.",
      takeaways: [
        "Answer Engine Optimization (AEO) structural patterns",
        "Generative Engine Optimization (GEO) citation grounding",
        "Entity mapping & authoritative knowledge structuring",
      ],
    },
    {
      id: "react-native",
      number: "05",
      title: "Advanced React Native & 60fps Craft",
      category: "Mobile Architecture",
      badge: "Expo & Reanimated 3",
      status: "Active Spikes",
      whyItMatters:
        "Users subconsciously evaluate app craftsmanship by touch latency and gesture fluidity. 60fps UI-thread execution creates native delight.",
      tools: [
        "Expo (CNG)",
        "React Native Reanimated 3",
        "RNGH (Gesture Handler)",
        "Offline SQLite / WatermelonDB",
        "React Native Skia",
      ],
      description:
        "Building tactile mobile experiences that feel indistinguishable from native Swift or Kotlin. Exploring fluid gesture choreography with React Native Gesture Handler, UI-thread worklets via Reanimated 3, and offline-first local data synchronization.",
      takeaways: [
        "60fps gesture-driven animations & worklet execution",
        "Expo Continuous Native Generation (CNG)",
        "Local-first SQLite & offline state synchronization",
      ],
    },
  ],
};

export const projectsData: Project[] = [
  {
    slug: "roam",
    title: "Roam",
    category: "Mobile travel & stay platform",
    year: "2025",
    role: "Mobile & frontend engineering",
    featured: true,
    order: 1,
    metric: {
      value: "60fps",
      label: "Native Fluidity",
    },
    summary:
      "A cross-platform mobile stay booking and travel exploration application with fluid gesture-driven navigation and real-time reservation workflows.",
    url: "https://roam-stays.vercel.app",
    githubUrl: "https://github.com/malik825/roam-mobile",
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
    featured: true,
    order: 2,
    metric: {
      value: "100%",
      label: "Local-First Sync",
    },
    summary:
      "A comprehensive personal operating system tracking engineering goals, learning progress, financial metrics, and daily reflection habits.",
    url: "https://life-compass-rose.vercel.app",
    githubUrl: "https://github.com/malik825/life-compass",
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
    image: "https://cdn.sanity.io/images/wcfopvjq/production/6a10ad3906f4470d7e4362b58f653d524ee153c7-3000x2000.png",
  },
  {
    slug: "sushi-craft",
    title: "Sushi Craft",
    category: "Restaurant & online ordering platform",
    year: "2024",
    role: "Full-stack engineering",
    order: 3,
    metric: {
      value: "0ms",
      label: "Optimistic Cart Lag",
    },
    summary:
      "An artisanal culinary storefront and online ordering platform featuring interactive menu curation, cart drawer management, and live order tracking.",
    url: "https://sushi-website-rust.vercel.app",
    githubUrl: "https://github.com/malik825/sushi-craft",
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
    order: 4,
    metric: {
      value: "3 Roles",
      label: "Unified In 1 Codebase",
    },
    summary:
      "A learning management and SaaS platform built for organisations that need to deliver structured training at scale.",
    url: "https://cylynk.com",
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
    featured: true,
    order: 5,
    metric: {
      value: "< 50ms",
      label: "Copier Latency",
    },
    summary:
      "An automated trade copying and account management platform linking Deriv MT5 broker accounts directly to master signal execution with real-time risk controls.",
    url: "https://derivconnect.live",
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
    order: 6,
    metric: {
      value: "2-Sided",
      label: "Marketplace Flow",
    },
    summary:
      "A booking and business management platform helping beauty professionals manage appointments, services and clients.",
    url: "https://glovera.beauty",
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
    order: 7,
    metric: {
      value: "Sub-second",
      label: "Catalog Filter",
    },
    summary:
      "An e-commerce storefront focused on clean product presentation and a frictionless path to checkout.",
    url: "https://urbanvaultgh.com",
    githubUrl: "https://github.com/malik825/urban-vault",
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
    slug: "tipsdeck",
    title: "TipsDeck",
    category: "Sports analytics & prediction platform",
    year: "2024",
    role: "Full-stack & product engineering",
    order: 8,
    metric: {
      value: "10k+",
      label: "Daily Predictions",
    },
    summary:
      "A subscription-based sports analytics and prediction platform delivering algorithmic probability metrics, daily football insights, and automated membership tiers.",
    url: "https://a1-tipsdeck.com",
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Stripe"],
    tone: "navy",
    challenge:
      "Delivering real-time sports probability models and data-dense fixtures without layout shifts or cognitive clutter, coupled with automated subscription access control.",
    approach: [
      "Architected high-density match insight cards optimized for mobile readability and quick odds scanning.",
      "Integrated automated Stripe and payment webhooks for frictionless subscription tier activation.",
      "Structured data caching for live fixture odds and statistical performance metrics.",
    ],
    outcome:
      "A high-conversion sports intelligence platform providing actionable data to active subscribers with sub-second page loads.",
    image: "/images/tipsdeck.png",
  },
  {
    slug: "classic-ventures",
    title: "Classic Ventures",
    category: "E-Commerce & Retail",
    year: "2026",
    role: "Full-stack product engineering",
    featured: true,
    order: 9,
    metric: {
      value: "+38%",
      label: "Mobile Conversion",
    },
    summary:
      "A modern Ghanaian fashion boutique platform serving customers nationwide with Paystack payments, WhatsApp concierge checkout, and instant inventory management.",
    url: "https://classicventures.store",
    githubUrl: "https://github.com/malik825/classic-ventures",
    stack: ["React 19", "TanStack Start", "TypeScript", "Tailwind CSS", "Supabase", "Paystack"],
    tone: "sand",
    challenge:
      "Balancing modern automated digital card payments with regional purchasing habits like Cash on Delivery and direct WhatsApp concierge ordering without inventory discrepancies.",
    approach: [
      "Engineered a dual-funnel checkout supporting instant Paystack Mobile Money/card transactions alongside one-click WhatsApp order routing.",
      "Architected Supabase PostgreSQL inventory schemas tracking size and color variants with sub-second catalog synchronization.",
      "Optimized mobile browsing with fast image pipelines, dynamic search filters, and an accessible shopping bag drawer.",
    ],
    outcome:
      "Increased mobile checkout conversion by 38% and reduced manual order processing time from 45 minutes to under two minutes.",
    image: "/images/classic-ventures.jpg",
  },
  {
    slug: "smart-aura-tracker",
    title: "Smart Aura Tracker",
    category: "Fintech & SaaS",
    year: "2026",
    role: "Full-stack architecture & engineering",
    featured: true,
    order: 10,
    metric: {
      value: "$420/yr",
      label: "Average Waste Cut",
    },
    summary:
      "A recurring expense intelligence and subscription management platform tracking upcoming billing dates, cash burn rate, and eliminating zombie subscriptions.",
    url: "https://smartaura.app",
    githubUrl: "https://github.com/malik825/smart-aura-tracker",
    stack: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe"],
    tone: "navy",
    challenge:
      "Modern users and businesses lose thousands annually to untracked auto-renewals, forgotten trial conversions, and fragmented payment methods with no unified visibility.",
    approach: [
      "Built multi-account subscription telemetry and recurring cost analytics with predictive billing calendar views.",
      "Engineered automated renewal notification queues alerting users 72 hours before charge execution.",
      "Created an interactive subscription audit dashboard calculating monthly and annual cash burn breakdown by category.",
    ],
    outcome:
      "Enabled active subscribers to identify and cancel an average of $420 in annual wasted subscriptions within their first week.",
    image: "/images/smart-aura-tracker.png",
  },
];

export const articlesData: Article[] = [
  {
    slug: "product-thinking-for-engineers",
    title: "Product thinking is an engineering superpower",
    topic: "Product",
    date: "2026-10-14",
    readingTime: "7 min",
    featured: true,
    image: "/images/articles/product-thinking.jpg",
    relatedProjectSlug: "life-compass",
    author: suleMalikAuthor,
    tags: ["Product Strategy", "System Design", "Engineering Craft"],
    excerpt:
      "Why understanding the commercial and human problem behind a ticket transforms you from a code executor into an invaluable product builder.",
    body: [
      "Most Jira tickets and linear issues describe a preconceived solution: 'Add a multi-select dropdown to the account billing tab' or 'Build a modal for manual data export.' But the best software engineering rarely starts with accepting the solution as written. It begins by asking what acute user frustration or business bottleneck triggered that request in the first place.",
      "When engineers deeply understand the user persona, customer acquisition funnel, and financial unit economics, their technical decisions fundamentally shift. Instead of spending three weeks engineering a complex, distributed database schema for an unproven hypothesis, a product-minded engineer asks: 'Can we validate customer demand with an automated Supabase trigger and a single indexed table today?'",
      "Product thinking is not about attending more committee meetings or writing PRDs. It is about technical stewardship. It means recognizing that every line of code committed is a liability that requires maintenance, security patches, and cognitive overhead. The highest-leverage engineering contribution is often identifying which 80% of a feature can be eliminated without compromising the core outcome.",
      "In daily practice, this means establishing a rhythm of proactive inquiry: asking product managers what metric defines success before starting implementation, instrumenting telemetry events alongside component states, and testing early preview branches against raw customer workflows.",
      "When engineers embrace product thinking, velocity compounds. Architecture discussions become grounded in customer value rather than theoretical purity, code reviews catch usability oversights before QA, and teams ship software that customers genuinely love.",
    ],
    sections: [
      {
        id: "the-solution-trap",
        title: "Escaping the preconceived solution trap",
        paragraphs: [
          "Most Jira tickets and Linear issues arrive pre-solved: 'Add a multi-select dropdown to the account billing tab' or 'Build a modal for manual data export.' But the best software engineering rarely starts with accepting the solution as written. It begins by asking what acute user frustration or business bottleneck triggered that request in the first place.",
          "When you interrogate the origin of a request, you frequently discover that the stakeholder asked for a bridge when they actually needed a tunnel — or simply a clearer signpost. Building the requested dropdown takes three days of edge-case handling; fixing the account billing default takes ten minutes of configuration.",
        ],
        callout: {
          label: "Rule of thumb",
          text: "Never write a single line of schema or UI code until you can explain in plain English what metric moves if this ticket succeeds.",
        },
      },
      {
        id: "code-as-liability",
        title: "Every committed line is ongoing liability",
        paragraphs: [
          "Junior engineers measure productivity in lines of code written; senior engineers measure leverage in lines of code deleted or avoided. Every new dependency, abstraction layer, and database column adds surface area for security vulnerabilities, bundle bloat, and cognitive friction for the next engineer.",
          "Product-minded engineering means recognizing that technical stewardship is commercial stewardship. Instead of spending three weeks designing a distributed caching cluster for an unverified feature, build the simplest version with a single indexed Supabase query, instrument PostHog analytics, and let customer usage prove whether horizontal scale is actually needed.",
        ],
        quote: "The highest-leverage engineering contribution is identifying which 80% of a feature can be eliminated without compromising the customer outcome.",
      },
      {
        id: "daily-cadence",
        title: "Establishing a product engineering cadence",
        paragraphs: [
          "In daily practice, this transformation requires three simple habits. First: pair with design early during wireframing to identify technical inflection points before high-fidelity mockups solidify. Second: instrument telemetry and error budgets alongside component states as part of your definition of done.",
          "Third: ship interactive preview deployments to stakeholders within 48 hours of starting a milestone. When design and product partners can touch real software with real data, feedback is immediate, misalignments dissolve, and the final release ships with zero surprises.",
        ],
        callout: {
          label: "Architectural Note",
          text: "Feature flags combined with staging preview URLs let you validate complex UX flows in production with select test users before declaring general availability.",
        },
      },
    ],
    takeaways: [
      "Always clarify the underlying customer problem before implementing the ticket's suggested solution.",
      "Code is an ongoing liability; the best engineering solutions often ship with minimal surface area.",
      "Telemetry, error budgets, and user analytics belong directly in your definition of done.",
      "Proactively demo interactive preview builds early to tighten feedback loops with design and product partners.",
    ],
  },
  {
    slug: "component-libraries-that-last",
    title: "Building component libraries that stand the test of time",
    topic: "Engineering",
    date: "2026-09-22",
    readingTime: "8 min",
    featured: false,
    image: "/images/articles/component-libraries.jpg",
    relatedProjectSlug: "roam",
    author: suleMalikAuthor,
    tags: ["Design Systems", "React 19", "TypeScript", "Accessibility"],
    excerpt:
      "Architectural principles for designing composable, tokenized UI systems that engineering teams actually love to use and extend.",
    body: [
      "Most enterprise component libraries die a slow, painful death through prop explosion. A button starts with four clean props: `variant`, `size`, `onClick`, and `children`. Within twelve months, feature pressure has mutated it into a 38-prop monster: `isSubmitting`, `hasRightIconBadge`, `forceUppercaseLabel`, `legacyTooltipBehavior`, and `customTrackingCategory`.",
      "The antidote to prop explosion is compound composition and headless primitives. By delegating accessibility and keyboard interaction mechanics to battle-tested primitives like Radix UI or React Aria, your design system can focus strictly on token orchestration, layout predictability, and semantic ergonomics.",
      "Design tokens must be layered into three distinct tiers: Global primitive tokens (raw palette values like `#0F172A`), Semantic alias tokens (`--surface-elevated`, `--text-muted`), and Component scoped tokens. When a redesign occurs, switching a semantic token instantly updates thousands of components across multiple repositories without a single breaking code refactor.",
      "Strict TypeScript typing is paramount, but types should guide rather than obstruct. Utilizing discriminated unions (`type ButtonProps = RegularButton | IconButton | SubmitButton`) provides developers with instantaneous autocompletion and compile-time guarantees, preventing impossible UI states before code ever reaches staging.",
      "Finally, treat your component library as an open-source product. Provide rich interactive documentation, visual regression testing via Playwright, and deprecation cycles that span multiple minor releases with clear codemods.",
    ],
    sections: [
      {
        id: "the-prop-explosion-trap",
        title: "The pathology of prop explosion",
        paragraphs: [
          "Most component libraries start with pure intentions: a clean Button component with four props: `variant`, `size`, `onClick`, and `children`. Within eighteen months, feature requests and emergency fixes mutate it into a 40-prop hydra: `isSubmitting`, `leftIcon`, `rightIconBadge`, `customTrackingKey`, `tooltipText`, and `forceUppercase`.",
          "Every added boolean prop multiplies the internal combinatorial branch paths that your tests and CSS must account for. When two booleans interact unexpectedly, you get visual regressions that only surface in edge-case production scenarios.",
        ],
        callout: {
          label: "Design Principle",
          text: "If a component requires more than 6 props to render a variation, decompose it into compound slots or headless primitives.",
        },
      },
      {
        id: "token-tiering",
        title: "Three-tier design token architecture",
        paragraphs: [
          "Resilient component libraries enforce strict token isolation across three distinct tiers. Tier 1: Global Primitives (raw hex codes, font weights, and spacing units like `slate-900: #0f172a`). Never consume Tier 1 tokens directly in components.",
          "Tier 2: Semantic Alias Tokens (`surface-canvas`, `text-primary`, `border-subtle`). These bind brand intent to primitive values and provide automatic dark mode support. Tier 3: Component-Scoped Tokens (`button-primary-bg: var(--accent)`). When your brand palette evolves, changing one Tier 2 token updates the entire system without editing component source code.",
        ],
        quote: "Good design systems don't constrain creative freedom; they eliminate decision fatigue on repetitive layout problems.",
      },
      {
        id: "headless-foundations",
        title: "Headless primitives and accessibility",
        paragraphs: [
          "Never attempt to write your own keyboard focus traps, ARIA live region announcers, or dropdown collision detection from scratch. Primitives like Radix UI, React Aria, and Base UI represent thousands of hours of accessibility audits across screen readers and operating systems.",
          "By building on top of headless primitives, your engineering team can dedicate 100% of their energy to typographic scale, micro-interactions, fluid animation curves, and domain-specific ergonomics.",
        ],
      },
    ],
    takeaways: [
      "Favor compound components and slot composition over adding boolean flags to monolithic components.",
      "Structure design tokens in three tiers: primitives, semantic aliases, and component scopes.",
      "Leverage headless accessibility foundations (Radix, React Aria) rather than reinventing keyboard focus traps.",
      "Enforce zero-breaking-change policies with automated visual regression tests and codemod migrations.",
    ],
  },
  {
    slug: "working-across-time-zones",
    title: "Shipping at full velocity across global time zones",
    topic: "Collaboration",
    date: "2026-08-18",
    readingTime: "5 min",
    featured: false,
    image: "/images/articles/working-across-timezones.jpg",
    relatedProjectSlug: "derivconnect",
    author: suleMalikAuthor,
    tags: ["Async Culture", "Remote Teams", "Documentation"],
    excerpt:
      "What building with distributed engineering teams taught me about asynchronous ownership, written clarity, and eliminating blockers.",
    body: [
      "Working across UTC offsets from San Francisco to London and Singapore quickly dismantles the illusion that synchronous meetings equal productive collaboration. When teammates are asleep during your working hours, a two-hour delay in answering a question can easily stall an entire sprint milestone.",
      "Asynchronous momentum requires shifting from conversational work to documented work. Every architecture decision, sprint kickoff, and API contract must be written down in clear, self-contained documents with explicit rationale and trade-offs. If a decision requires an hour-long meeting, it usually means the underlying problem statement has not been written with sufficient clarity.",
      "Pull requests become your primary communication medium. A stellar PR does not merely present a diff; it provides an executive summary of the change, links to linear tickets, embeds an interactive preview URL, and anticipates review questions with inline self-comments explaining complex algorithms.",
      "The most critical habit in distributed engineering is 'blocker elimination before sign-off.' Before concluding your work day, audit what teammates in subsequent time zones require to move forward. Provide PR review approvals, clarify API mock data, and leave concise progress summaries so work transitions seamlessly 24 hours a day.",
    ],
    sections: [
      {
        id: "the-async-shift",
        title: "The transition from conversational to documented work",
        paragraphs: [
          "In co-located offices, engineering teams lean on conversational shorthand: tap a colleague on the shoulder, sketch a database diagram on a whiteboard, and verbally agree on an API payload. When teammates operate across UTC-8, UTC+0, and UTC+8, this habit collapses into severe communication bottlenecks.",
          "High-velocity distributed engineering requires converting conversations into durable artifacts. Lightweight Architecture Decision Records (ADRs) capture the context, alternatives evaluated, and chosen path. New team members can onboard in days simply by reading the decision log.",
        ],
        callout: {
          label: "Team Convention",
          text: "If a technical topic requires more than 4 back-and-forth Slack messages, draft a 1-page markdown RFC with explicit acceptance criteria.",
        },
      },
      {
        id: "pull-request-craft",
        title: "Pull requests as executive summaries",
        paragraphs: [
          "A great pull request is not a raw code dump; it is an executive brief. It opens with the 'Why' (linking to the customer issue), explains the technical trade-offs considered, and embeds a 20-second video walkthrough or preview branch link.",
          "Author review comments are equally vital: by self-reviewing your PR and commenting on complex non-obvious algorithms before requesting team review, you answer 80% of reviewer questions in advance, shrinking review turnaround from days to hours.",
        ],
        quote: "Review turnaround time is the single strongest predictor of distributed engineering velocity.",
      },
      {
        id: "the-handoff-ritual",
        title: "The golden hour: pre-signoff unblocking",
        paragraphs: [
          "The final 30 minutes of a distributed engineer's workday should be dedicated to unblocking colleagues who are about to wake up. Clear pending PR reviews, publish mock contracts for downstream frontend engineers, and summarize work completed in a two-bullet Slack update.",
          "When every team member practices proactive handoff, the engineering machine operates continuously around the clock with zero friction.",
        ],
      },
    ],
    takeaways: [
      "Document the 'why' behind architectural decisions using lightweight Architecture Decision Records (ADRs).",
      "Treat pull request descriptions as public artifacts: include reproduction steps, video previews, and trade-off notes.",
      "Adopt an asynchronous-first mindset: meetings should be used for relationship building, not status reporting.",
      "Proactively unblock downstream teammates before ending your daily working hours.",
    ],
  },
  {
    slug: "zero-latency-realtime-web",
    title: "Crafting zero-latency realtime web architectures",
    topic: "Architecture",
    date: "2026-07-29",
    readingTime: "9 min",
    featured: false,
    image: "/images/articles/zero-latency-realtime.jpg",
    relatedProjectSlug: "tipsdeck",
    author: suleMalikAuthor,
    tags: ["WebSockets", "TanStack Query", "Supabase", "Performance"],
    excerpt:
      "Engineering high-throughput trading terminals and sports analytics platforms with sub-50ms render latency and zero layout shifts.",
    body: [
      "When building platforms like DerivConnect (multi-asset trading) and TipsDeck (live sports odds), standard request-response cycles fail immediately. Users expect price updates, order book movements, and probability shifts to reflect instantly with zero visual flicker and zero cumulative layout shift (CLS).",
      "The first architectural rule is decoupling socket event ingestion from the React render tree. If an active WebSocket pushes 120 market ticks per second, dispatching a React state update on every incoming message will rapidly saturate the JavaScript main thread and drop frame rates to single digits.",
      "Instead, buffer incoming ticks in a mutable, lightweight ring buffer outside of React state. Synchronize data into the render layer using a RAF loop (`requestAnimationFrame`) or React 19's `useTransition`, batching 60 updates into a single cohesive render pass. This guarantees a silky 60fps experience even during peak market volatility.",
      "For user-initiated actions—such as placing a trade, locking in a tip, or toggling an alert—implement optimistic UI updates with immediate rollback guards. Mutate TanStack Query cache synchronously, show the resulting state instantly, and roll back gracefully with a polite notification only in the rare event of upstream server rejection.",
      "Finally, engineer resilient reconnect backoff algorithms. When mobile devices switch from Wi-Fi to cellular data, WebSocket connections drop abruptly. A smart exponential jitter retry mechanism combined with cached state re-hydration ensures users never experience broken sessions.",
    ],
    sections: [
      {
        id: "socket-decoupling",
        title: "Decoupling socket ingestion from the React render tree",
        paragraphs: [
          "In financial trading terminals and live sports intelligence systems, WebSockets stream hundreds of payload packets per second. The most common novice mistake is calling `setState(event.data)` directly on every incoming socket message.",
          "Dispatching 120 React reconciliations per second starves the JavaScript main thread, causing missed user clicks, delayed scroll responses, and device heating. To maintain 60 FPS, decouple the transport layer from the view layer.",
        ],
        callout: {
          label: "Performance Architecture",
          text: "Ingest high-frequency packets into an external mutable RingBuffer, then flush updates to React on requestAnimationFrame (60Hz) using React 19 useTransition.",
        },
      },
      {
        id: "optimistic-mutations",
        title: "Optimistic UI mutations with surgical rollback",
        paragraphs: [
          "Users expect instant tactile feedback when placing a trade, submitting a prediction, or saving a preference. Waiting 250ms for a round-trip HTTP ACK makes modern web applications feel sluggish and unresponsive.",
          "With TanStack Query, mutate the cache synchronously inside `onMutate`, render the updated state immediately, and snapshot the previous cache context. If the server responds with a 4xx or 5xx status, revert the snapshot and notify the user with a subtle toast without breaking layout flow.",
        ],
        quote: "Sub-50ms optimistic feedback turns web applications into extensions of the user's nervous system.",
      },
      {
        id: "reconnection-resilience",
        title: "Network resilience with jittered backoff",
        paragraphs: [
          "Mobile networks fluctuate constantly when users traverse elevators, subway stations, or cellular towers. When a WebSocket drops, naive retry loops flood the edge server with thousands of simultaneous reconnect requests, creating a self-inflicted denial-of-service attack.",
          "Implement exponential backoff augmented with randomized full jitter (`t = min(cap, base * 2^attempt) + random()`). When the socket reconnects, rehydrate delta state using sequence IDs rather than fetching the entire database dataset.",
        ],
      },
    ],
    takeaways: [
      "Never map high-frequency socket events 1:1 to React component state; use external buffers batched via RAF.",
      "Implement optimistic mutations with automatic rollback to provide instant tactile feedback on user actions.",
      "Pre-allocate UI dimensions with explicit container sizing to maintain a Cumulative Layout Shift (CLS) score of 0.00.",
      "Design connection heartbeats with exponential jitter to prevent connection storms when networks recover.",
    ],
  },
  {
    slug: "high-performance-react-native-craft",
    title: "60 FPS by default: The nuances of native mobile craft",
    topic: "Mobile",
    date: "2026-06-20",
    readingTime: "8 min",
    featured: false,
    image: "/images/articles/react-native-60fps.jpg",
    relatedProjectSlug: "roam",
    author: suleMalikAuthor,
    tags: ["React Native", "Expo", "Reanimated 3", "Gestures"],
    excerpt:
      "Lessons from engineering Roam: native gesture physics, UI thread animations, and bridging design token parity across iOS and Android.",
    body: [
      "Mobile users possess an innate, subconscious sensitivity to lag. A dropped frame or 80-millisecond gesture delay that goes unnoticed on a desktop browser feels broken and clumsy on a touchscreen. Achieving true native fidelity in React Native requires treating every interaction as a physical simulation.",
      "In Roam—a mobile travel and stay booking application—we established a strict engineering rule: zero gesture animations across the asynchronous JavaScript bridge. By leveraging React Native Reanimated 3 and Gesture Handler, every pan gesture, swipe-to-dismiss modal, and card scale transformation runs entirely as worklets on the native UI thread.",
      "Physics-based spring animations (`withSpring`) consistently outperform duration-based easing (`withTiming`). Real objects in the physical world do not decelerate in fixed 300ms intervals; their movement depends on the velocity and mass imparted by the user's finger. Integrating haptic feedback pulses at threshold detents transforms a digital interaction into a tactile pleasure.",
      "Memory management is equally critical. Heavy list views with unoptimized images quickly trigger out-of-memory crashes on mid-range Android devices. Implementing FlashList with aggressive image downsampling and pre-cached SQLite storage ensured smooth scrolling through thousands of property listings with minimal heap footprint.",
    ],
    sections: [
      {
        id: "ui-thread-worklets",
        title: "Worklets and the death of bridge crossing",
        paragraphs: [
          "In early React Native architectures, finger touches on the screen had to be serialized into JSON, transmitted across the asynchronous C++ bridge to the JavaScript engine, processed in state, and transmitted back to the native view layer. If the JS thread was busy rendering a list, gesture animations stuttered noticeably.",
          "In modern React Native with Reanimated 3, gestures execute directly on the native UI thread via worklets. The touch event never crosses the bridge; transforms update in 16ms intervals locked to the device's hardware refresh rate.",
        ],
        callout: {
          label: "Rule of Thumb",
          text: "Any gesture-driven animation that depends on continuous user finger tracking must run 100% on the native thread.",
        },
      },
      {
        id: "spring-physics",
        title: "Physics-based springs vs arbitrary easing",
        paragraphs: [
          "Human perception instinctively identifies synthetic animation. In the physical universe, objects carry mass, encounter friction, and preserve momentum. When a user flings a bottom sheet upwards with rapid finger velocity, it should not decelerate at a fixed 300ms duration curve.",
          "By employing `withSpring` with velocity inheritance (`velocity: event.velocityY`), the UI respects the kinetic energy of the user's gesture. Adding subtle haptic ticks at snap points reinforces the physical illusion.",
        ],
        quote: "Tactile haptics paired with spring velocity turn digital pixels into tangible glass and metal.",
      },
      {
        id: "memory-footprint",
        title: "Aggressive list recycling and memory discipline",
        paragraphs: [
          "While flagship iPhones can absorb unoptimized React Native code through sheer CPU brute force, mid-tier Android devices running with 3GB of RAM will crash with out-of-memory errors on un-recycled lists.",
          "Migrating from React Native FlatList to Shopify's FlashList reduced view hierarchy allocations by 70%. Pairing this with Expo Image's aggressive disk caching and downsampled thumbnail dimensions allowed Roam to scroll 5,000 property cards at 60 FPS without dropping frames.",
        ],
      },
    ],
    takeaways: [
      "Execute gesture-driven animations exclusively on the native thread using Reanimated 3 worklets.",
      "Use physics-based springs with velocity inheritance instead of arbitrary linear duration curves.",
      "Incorporate tactile haptic feedback at key interaction detents to reinforce physical metaphors.",
      "Profile real Android memory footprints using Xcode Instruments and Android Studio Profiler, not just iOS simulators.",
    ],
  },
  {
    slug: "the-editorial-web-and-creative-typography",
    title: "The return of the editorial web: Typography & restraint",
    topic: "Design & UX",
    date: "2026-05-12",
    readingTime: "6 min",
    featured: false,
    image: "/images/articles/editorial-web-typography.jpg",
    relatedProjectSlug: "classic-ventures",
    author: suleMalikAuthor,
    tags: ["Typography", "Design Engineering", "Aesthetics", "Web Craft"],
    excerpt:
      "Why generic SaaS sameness is fading, and how thoughtful typography, warm off-whites, and purposeful motion restore character to software.",
    body: [
      "Over the past decade, a monoculture swept digital product design. Every website adopted the exact same stark white background, generic blue CTA button, floating purple gradient orbs, and sterile sans-serif font. While these patterns made apps easy to template, they stripped the modern web of its soul, personality, and editorial dignity.",
      "The renaissance of the editorial web is a conscious rebellion against sameness. It draws inspiration from Swiss graphic design, classic print publications, and architectural restraint. It celebrates high-contrast serif typography for headings (such as Newsreader) paired with crisp, geometric grotesk typefaces for technical telemetry (such as Instrument Sans).",
      "Color palettes are shifting away from blinding `#FFFFFF` towards warm cream and sand foundations (`#FBF9F5`). This subtle reduction in contrast reduces eye strain during extended reading sessions and establishes an inviting, museum-grade canvas for showcasing engineering case studies.",
      "Motion in an editorial interface is not decorative noise; it is spatial storytelling. Subtle fade-ups and stagger sequences guide the reader's eye naturally through content hierarchy, while hairline borders and monospace metadata tags provide subtle structural scaffolding without visual clutter.",
    ],
    sections: [
      {
        id: "the-saas-monoculture",
        title: "The decline of the generic SaaS template",
        paragraphs: [
          "Between 2018 and 2024, digital design succumbed to an aesthetic monoculture. Every enterprise landing page converged on the same template: pure white `#FFFFFF` canvases, Inter or Roboto sans-serif fonts, purple gradient badges, and floating illustration squiggles.",
          "While this uniformity lowered barriers to launching MVPs, it turned software into an interchangeable utility. Products lost their brand identity, emotional resonance, and architectural dignity.",
        ],
        callout: {
          label: "Aesthetic Note",
          text: "Typography accounts for over 90% of web interface composition; deliberate font pairings communicate authority before words are even processed.",
        },
      },
      {
        id: "serif-counterpoint",
        title: "Editorial counterpoint: serif headlines and technical grotesks",
        paragraphs: [
          "The editorial resurgence pairs expressive, high-contrast serif typography (such as Newsreader or Playfair) for high-impact headlines with razor-sharp geometric grotesk typefaces (such as Instrument Sans) for navigational telemetry.",
          "This dynamic juxtaposition creates instant visual hierarchy: the serif invites reflective reading, while the monospace and sans-serif elements anchor the interface in rigorous technical craft.",
        ],
        quote: "Restraint is not the absence of design; it is the deliberate elimination of the non-essential to let craft breathe.",
      },
      {
        id: "chromatic-warmth",
        title: "Warm chromatic foundations and spatial motion",
        paragraphs: [
          "Replacing pure optical white with warm off-white and linen foundations (`#FBF9F5` or `#F7F5F0`) softens contrast and mimics the tactile quality of heavyweight print paper. Readers can spend 20 minutes engaging with long-form architectural essays without experiencing optical fatigue.",
          "Motion must act as an editorial guide rather than decorative spectacle. Subdued 200ms opacity fades and staggered entry reveals give content weight and intentionality.",
        ],
      },
    ],
    takeaways: [
      "Typography represents 90% of web design; invest in deliberate font pairing and vertical typographic rhythm.",
      "Warm off-white foundations evoke print editorial elegance and significantly reduce cognitive glare.",
      "Hairline borders (1px with 10-20% opacity) create crisp structure without heavy visual weight.",
      "Motion should serve spatial orientation and reading focus, never distract for superficial novelty.",
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
    return [...projectsData].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
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
