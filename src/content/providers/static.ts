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
  email: "abdulmaliksuleman75@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdulmalik-suleman-14a8501a9/",
  github: "https://github.com/malik825",
  location: "Asante Mampong, Kumasi, Ghana",
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
    image: "https://cdn.sanity.io/images/wcfopvjq/production/6a10ad3906f4470d7e4362b58f653d524ee153c7-3000x2000.png",
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
    slug: "tipsdeck",
    title: "TipsDeck",
    category: "Sports analytics & prediction platform",
    year: "2024",
    role: "Full-stack & product engineering",
    summary:
      "A subscription-based sports analytics and prediction platform delivering algorithmic probability metrics, daily football insights, and automated membership tiers.",
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
    summary:
      "A modern Ghanaian fashion boutique platform serving customers nationwide with Paystack payments, WhatsApp concierge checkout, and instant inventory management.",
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
    summary:
      "A recurring expense intelligence and subscription management platform tracking upcoming billing dates, cash burn rate, and eliminating zombie subscriptions.",
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
    image: "/images/life-compass.jpg",
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
    image: "/images/roam.jpg",
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
    image: "/images/derivconnect.png",
    tags: ["Async Culture", "Remote Teams", "Documentation"],
    excerpt:
      "What building with distributed engineering teams taught me about asynchronous ownership, written clarity, and eliminating blockers.",
    body: [
      "Working across UTC offsets from San Francisco to London and Singapore quickly dismantles the illusion that synchronous meetings equal productive collaboration. When teammates are asleep during your working hours, a two-hour delay in answering a question can easily stall an entire sprint milestone.",
      "Asynchronous momentum requires shifting from conversational work to documented work. Every architecture decision, sprint kickoff, and API contract must be written down in clear, self-contained documents with explicit rationale and trade-offs. If a decision requires an hour-long meeting, it usually means the underlying problem statement has not been written with sufficient clarity.",
      "Pull requests become your primary communication medium. A stellar PR does not merely present a diff; it provides an executive summary of the change, links to linear tickets, embeds an interactive preview URL, and anticipates review questions with inline self-comments explaining complex algorithms.",
      "The most critical habit in distributed engineering is 'blocker elimination before sign-off.' Before concluding your work day, audit what teammates in subsequent time zones require to move forward. Provide PR review approvals, clarify API mock data, and leave concise progress summaries so work transitions seamlessly 24 hours a day.",
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
    image: "/images/tipsdeck.png",
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
    image: "/images/classic-ventures.jpg",
    tags: ["React Native", "Expo", "Reanimated 3", "Gestures"],
    excerpt:
      "Lessons from engineering Roam: native gesture physics, UI thread animations, and bridging design token parity across iOS and Android.",
    body: [
      "Mobile users possess an innate, subconscious sensitivity to lag. A dropped frame or 80-millisecond gesture delay that goes unnoticed on a desktop browser feels broken and clumsy on a touchscreen. Achieving true native fidelity in React Native requires treating every interaction as a physical simulation.",
      "In Roam—a mobile travel and stay booking application—we established a strict engineering rule: zero gesture animations across the asynchronous JavaScript bridge. By leveraging React Native Reanimated 3 and Gesture Handler, every pan gesture, swipe-to-dismiss modal, and card scale transformation runs entirely as worklets on the native UI thread.",
      "Physics-based spring animations (`withSpring`) consistently outperform duration-based easing (`withTiming`). Real objects in the physical world do not decelerate in fixed 300ms intervals; their movement depends on the velocity and mass imparted by the user's finger. Integrating haptic feedback pulses at threshold detents transforms a digital interaction into a tactile pleasure.",
      "Memory management is equally critical. Heavy list views with unoptimized images quickly trigger out-of-memory crashes on mid-range Android devices. Implementing FlashList with aggressive image downsampling and pre-cached SQLite storage ensured smooth scrolling through thousands of property listings with minimal heap footprint.",
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
    image: "/images/urban-vault.jpg",
    tags: ["Typography", "Design Engineering", "Aesthetics", "Web Craft"],
    excerpt:
      "Why generic SaaS sameness is fading, and how thoughtful typography, warm off-whites, and purposeful motion restore character to software.",
    body: [
      "Over the past decade, a monoculture swept digital product design. Every website adopted the exact same stark white background, generic blue CTA button, floating purple gradient orbs, and sterile sans-serif font. While these patterns made apps easy to template, they stripped the modern web of its soul, personality, and editorial dignity.",
      "The renaissance of the editorial web is a conscious rebellion against sameness. It draws inspiration from Swiss graphic design, classic print publications, and architectural restraint. It celebrates high-contrast serif typography for headings (such as Newsreader) paired with crisp, geometric grotesk typefaces for technical telemetry (such as Instrument Sans).",
      "Color palettes are shifting away from blinding `#FFFFFF` towards warm cream and sand foundations (`#FBF9F5`). This subtle reduction in contrast reduces eye strain during extended reading sessions and establishes an inviting, museum-grade canvas for showcasing engineering case studies.",
      "Motion in an editorial interface is not decorative noise; it is spatial storytelling. Subtle fade-ups and stagger sequences guide the reader's eye naturally through content hierarchy, while hairline borders and monospace metadata tags provide subtle structural scaffolding without visual clutter.",
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
