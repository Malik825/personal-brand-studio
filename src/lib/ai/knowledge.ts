import { projectsData, experienceData, siteConfig } from "@/content/providers/static";

export function answerFromKnowledgeBase(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Simple greetings
  if (
    q === "hello" ||
    q === "hi" ||
    q === "hey" ||
    q.startsWith("hello ") ||
    q.startsWith("hi ") ||
    q.startsWith("hey ") ||
    q === "good morning" ||
    q === "good afternoon" ||
    q === "good evening"
  ) {
    return (
      `Hello! Great to meet you. I'm Sule Malik's portfolio companion.\n\n` +
      `Sule is a product-minded software engineer specializing in high-performance web applications (React 19, TypeScript, Next.js, TanStack Start) and mobile apps (React Native, Expo).\n\n` +
      `How can I help you today? You can ask about:\n` +
      `• **Engineering Stack & Architecture**\n` +
      `• **What Sule Enjoys Learning & Exploring** (AI, Product Analytics, SEO, AEO/GEO, React Native)\n` +
      `• **Featured Projects** (Roam, Life Compass, Sushi Craft, DerivConnect, TipsDeck)\n` +
      `• **Building a Website or Application for your business**\n` +
      `• **Hiring, Contract Engagements & Contact Info**`
    );
  }

  // 1.2. About Sule / Bio summary
  if (
    q.includes("who is sule") ||
    q.includes("who are you") ||
    q.includes("about sule") ||
    q.includes("tell me about yourself") ||
    q.includes("introduce") ||
    q === "about"
  ) {
    return (
      `Sule Malik is a product-minded software engineer based in Asante Mampong, Ghana.\n\n` +
      `He builds customer-facing web applications, SaaS platforms, interactive dashboards, and e-commerce experiences that combine functionality, performance, and thoughtful design. His focus is on the intersection of product engineering and user experience: where sound architecture, clean implementation, and real user needs come together.\n\n` +
      `• **Technical Depth**: React, Next.js, Angular, TypeScript, React Native, Node.js, Express, Supabase, PostgreSQL, and MongoDB.\n` +
      `• **Engineering Approach**: Taking ownership of technical challenges, communicating decisions clearly, considering edge cases, and delivering from initial planning to production rollout.\n\n` +
      `Read his full story and engineering philosophy on the **[About Page](/about)**!`
    );
  }

  // 1.5. Things Sule enjoys learning & active exploration
  if (
    q.includes("learn") ||
    q.includes("explor") ||
    q.includes("study") ||
    q.includes("studying") ||
    q.includes("curiosity") ||
    q.includes("curiosities") ||
    q.includes("research") ||
    q.includes("enjoy learning") ||
    q.includes("what are you learning") ||
    q.includes("what is sule learning") ||
    q.includes("what does sule enjoy learning") ||
    q.includes("aeo") ||
    q.includes("geo") ||
    q.includes("aoe") ||
    q.includes("goe")
  ) {
    return (
      `Sule is passionate about continuous learning and keeping his craft ahead of the curve. He is currently actively exploring 5 core areas:\n\n` +
      `1. **AI & Agentic Engineering (AI / A1)**: Integrating Large Language Models, streaming chunk protocols (Vercel AI SDK), model context protocols (MCP), and deterministic fallbacks into product workflows so AI interactions feel snappy and reliable.\n` +
      `2. **Product Analytics & Telemetry**: Designing semantic event taxonomies, measuring conversion funnels, and analyzing retention curves with tools like PostHog and Mixpanel to guide architectural decisions with user telemetry.\n` +
      `3. **Technical & Structural SEO**: Deepening web visibility through automated Schema.org JSON-LD microdata, semantic document structures, and green-tier Core Web Vitals (sub-1.2s LCP, zero layout shifts).\n` +
      `4. **AEO & GEO (Answer & Generative Engine Optimization)**: Optimizing content discovery for AI synthesis engines like ChatGPT Search, Perplexity, and Google AI Overviews using citation grounding and entity mapping.\n` +
      `5. **Advanced React Native & 60fps Craft**: Perfecting fluid gesture choreography with React Native Gesture Handler, UI-thread worklets via Reanimated 3, and offline-first local data synchronization.\n\n` +
      `You can also read more about these on the **[About Page](/about)**!`
    );
  }

  // 2. Pricing, cost, rates, quotes
  if (
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("rate") ||
    q.includes("quote") ||
    q.includes("budget") ||
    q.includes("how much") ||
    q.includes("fee")
  ) {
    return (
      `Engagement pricing depends on project scope, complexity, and timeline:\n\n` +
      `• **Fixed-Scope Websites & MVPs**: Clear milestones, predictable budget, and end-to-end delivery from design implementation to production deployment.\n` +
      `• **Contract / Fractional Engineering**: Focused technical leadership, frontend performance optimization, or architecture consulting on a sprint or monthly retainer basis.\n\n` +
      `To get an accurate estimate for your specific project, head over to the **[Contact Page](/contact)** or reach out directly at [${siteConfig.email}](mailto:${siteConfig.email}).`
    );
  }

  // 3. Building a website, app, business inquiries, client requests (e.g. farm, store, company)
  if (
    q.includes("website") ||
    q.includes("web site") ||
    q.includes("app") ||
    q.includes("build") ||
    q.includes("make") ||
    q.includes("create") ||
    q.includes("develop") ||
    q.includes("farm") ||
    q.includes("pautry") ||
    q.includes("poultry") ||
    q.includes("chicken") ||
    q.includes("livestock") ||
    q.includes("agriculture") ||
    q.includes("agro") ||
    q.includes("store") ||
    q.includes("shop") ||
    q.includes("ecommerce") ||
    q.includes("e-commerce") ||
    q.includes("business") ||
    q.includes("client") ||
    q.includes("product") ||
    q.includes("landing page") ||
    q.includes("redesign")
  ) {
    return (
      `Sule builds bespoke, high-performance websites and digital applications tailored specifically to your business goals.\n\n` +
      `Whether you need an engaging modern web presence for an agricultural enterprise, farm, or local business, a direct-to-consumer store, an automated booking portal, or an end-to-end custom platform:\n\n` +
      `• **Modern Engineering**: Lightning-fast load times, flawless mobile responsiveness, and clean typography that establishes instant credibility with customers.\n` +
      `• **Capabilities**: Product catalog / inventory showcases, customer inquiry & ordering flows, location maps, WhatsApp/email lead capture, and secure payment processing.\n` +
      `• **Next Steps**: Tell Sule about your vision! Share your requirements on the **[Contact Page](/contact)** or send an email directly to [${siteConfig.email}](mailto:${siteConfig.email}) to discuss scope, timeline, and pricing.`
    );
  }

  // 4. Tech stack & skills
  if (
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("language") ||
    q.includes("framework") ||
    q.includes("skills") ||
    q.includes("tools")
  ) {
    return (
      `Sule's technical skills and engineering depth span across the modern stack:\n\n` +
      `• **Frontend Development**: React, Next.js, Angular, TypeScript, JavaScript, React Native (Expo), Tailwind CSS, TanStack Query & Router\n` +
      `• **Backend & Data**: Node.js, Express, Supabase, PostgreSQL, MongoDB, REST APIs, GraphQL, Authentication & API Integration\n` +
      `• **Tools & Practices**: Git & GitHub, Vercel, Responsive Design, Performance Optimization, State Management, Component Architecture\n\n` +
      `Explore detailed capabilities and operating principles on the **[About Page](/about)**.`
    );
  }

  // 5. Roam project
  if (q.includes("roam") || q.includes("mobile app") || q.includes("travel")) {
    const roam = projectsData.find((p) => p.slug === "roam");
    return (
      `**Roam — Mobile Stay & Travel Exploration App**\n\n` +
      `• **Role**: ${roam?.role ?? "Mobile & frontend engineering"}\n` +
      `• **Stack**: React Native, Expo, NativeWind, TypeScript, Clerk, PostHog\n` +
      `• **Challenge**: Delivering a smooth 60fps native experience across iOS and Android with complex gesture interactions and offline-resilient auth state.\n` +
      `• **Key Outcome**: Frictionless stay discovery and booking journeys with biometric persistence and unified design tokens.\n\n` +
      `Read the complete case study on the [Roam project page](/work/roam).`
    );
  }

  // 6. Life Compass project
  if (q.includes("life compass") || q.includes("compass") || q.includes("tracker") || q.includes("productivity")) {
    const lc = projectsData.find((p) => p.slug === "life-compass");
    return (
      `**Life Compass — Personal OS & Developer Productivity Dashboard**\n\n` +
      `• **Role**: ${lc?.role ?? "Product engineering & architecture"}\n` +
      `• **Stack**: React 19, TanStack Start, TypeScript, Tailwind CSS, Supabase, Recharts\n` +
      `• **Challenge**: Consolidating fragmented trackers (goals, learning hours, habit consistency, finance) into a single cohesive dashboard without cognitive overload.\n` +
      `• **Key Outcome**: Modular tracking widgets with weekly review aggregation, Supabase RLS, and real-time syncing.\n\n` +
      `Read the complete case study on the [Life Compass project page](/work/life-compass).`
    );
  }

  // 7. Sushi Craft project
  if (q.includes("sushi") || q.includes("sushi craft") || q.includes("omakase") || q.includes("restaurant")) {
    const sc = projectsData.find((p) => p.slug === "sushi-craft");
    return (
      `**Sushi Craft — Omakase Dining & Table Reservation System**\n\n` +
      `• **Role**: ${sc?.role ?? "Frontend engineering & UI craft"}\n` +
      `• **Stack**: Next.js 15, TypeScript, Tailwind CSS, Motion, Radix UI\n` +
      `• **Key Outcome**: An immersive editorial dining portal with real-time seat slot selection, multi-course pairing guides, and fluid menu animations.\n\n` +
      `Read the complete case study on the [Sushi Craft project page](/work/sushi-craft).`
    );
  }

  // 8. DerivConnect project
  if (q.includes("deriv") || q.includes("trading") || q.includes("derivconnect") || q.includes("fintech")) {
    const dc = projectsData.find((p) => p.slug === "derivconnect");
    return (
      `**DerivConnect — Multi-Asset Trading Terminal**\n\n` +
      `• **Role**: ${dc?.role ?? "Full-stack engineering & real-time systems"}\n` +
      `• **Stack**: React, TypeScript, WebSockets, Tailwind CSS, lightweight-charts\n` +
      `• **Key Outcome**: High-throughput tick processing with sub-50ms render latency, resilient connection recovery, and customizable charting workspaces.\n\n` +
      `Read the complete case study on the [DerivConnect project page](/work/derivconnect).`
    );
  }

  // 9. TipsDeck project
  if (q.includes("tipsdeck") || q.includes("sports") || q.includes("tips") || q.includes("football") || q.includes("prediction")) {
    const td = projectsData.find((p) => p.slug === "tipsdeck");
    return (
      `**TipsDeck — Sports Analytics & Prediction Platform**\n\n` +
      `• **Role**: ${td?.role ?? "Full-stack & product engineering"}\n` +
      `• **Stack**: React, TypeScript, Tailwind CSS, Supabase, Stripe\n` +
      `• **Challenge**: Delivering real-time sports probability models and data-dense fixtures without layout shifts or cognitive clutter, coupled with automated subscription access control.\n` +
      `• **Key Outcome**: High-density match insight cards optimized for quick mobile scanning with automated membership activation.\n\n` +
      `Read the complete case study on the [TipsDeck project page](/work/tipsdeck).`
    );
  }

  // 10. Projects general
  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("case stud")) {
    const list = projectsData
      .map((p) => `• **${p.title}** (${p.year}) — ${p.category} [${p.stack.slice(0, 3).join(", ")}] — [View Case Study](/work/${p.slug})`)
      .join("\n");
    return (
      `Sule has engineered high-impact products across mobile, fintech, and developer tooling:\n\n${list}\n\n` +
      `You can explore in-depth technical case studies on the [Work](/work) page, complete with architectural challenges and outcomes.`
    );
  }

  // 11. Experience, career & background
  if (
    q.includes("experience") ||
    q.includes("background") ||
    q.includes("career") ||
    q.includes("resume") ||
    q.includes("job") ||
    q.includes("history")
  ) {
    const exp = experienceData
      .map((e) => `• **${e.role}** at ${e.org} (${e.period})\n  ${e.note}`)
      .join("\n\n");
    return (
      `**Career Summary**\n\n${exp}\n\n` +
      `Sule specializes in bridging design and product engineering—translating intricate business requirements and design intent into robust, accessible, 60fps applications.`
    );
  }

  // 12. Philosophy & approach
  if (q.includes("philosophy") || q.includes("approach") || q.includes("values") || q.includes("how do you work")) {
    return (
      `**Engineering Philosophy**\n\n` +
      `*“Think deeply. Build intentionally. Ship thoughtfully.”*\n\n` +
      `1. **Clarity over cleverness**: Write maintainable, self-documenting code with crisp domain models.\n` +
      `2. **Performance as a feature**: Optimize Core Web Vitals, reduce layout shifts, and design responsive interactions that feel native.\n` +
      `3. **Design precision**: Zero tolerance for sloppy spacing, broken contrasts, or awkward layout jumps. Motion should support storytelling, never distract.`
    );
  }

  // 13. Availability, hiring & contact
  if (
    q.includes("hire") ||
    q.includes("available") ||
    q.includes("role") ||
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("freelance") ||
    q.includes("open to")
  ) {
    return (
      `Sule is currently open to select full-time product engineering roles, high-impact contract engagements, and technical advisory.\n\n` +
      `• **Email**: [${siteConfig.email}](mailto:${siteConfig.email})\n` +
      `• **Location**: ${siteConfig.location}\n` +
      `• **Get in touch**: Fill out the [Contact Form](/contact) or connect via [LinkedIn](${siteConfig.linkedin}).`
    );
  }

  // 14. Location, timezone & remote work
  if (
    q.includes("where") ||
    q.includes("location") ||
    q.includes("timezone") ||
    q.includes("remote") ||
    q.includes("relocate")
  ) {
    return (
      `Sule is based in **${siteConfig.location}** and works with distributed global teams across Europe, North America, and beyond.\n\n` +
      `• **Work Mode**: Fully equipped for remote collaboration, asynchronous communication, and distributed sprint rhythms.\n` +
      `• **Get in touch**: Connect on [LinkedIn](${siteConfig.linkedin}) or visit the [Contact Page](/contact).`
    );
  }

  // 15. Intelligent dynamic fallback (acknowledges the query without repeating the static intro)
  return (
    `Thank you for your message! While I'm focused primarily on Sule Malik's engineering portfolio, architecture, and experience, Sule would be happy to discuss your specific question or project idea directly.\n\n` +
    `• **Discuss a project or custom website**: Share your details on the **[Contact Form](/contact)** or email [${siteConfig.email}](mailto:${siteConfig.email}).\n` +
    `• **Explore past engineering work**: Review featured case studies on the **[Work](/work)** page.\n` +
    `• **Ask about Sule's stack**: Feel free to ask about React 19, React Native, TypeScript, Supabase, or production leadership.`
  );
}
