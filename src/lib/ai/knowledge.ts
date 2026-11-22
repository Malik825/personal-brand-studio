import { projectsData, experienceData, siteConfig } from "@/content/providers/static";

export function answerFromKnowledgeBase(query: string): string {
  const q = query.toLowerCase().trim();

  // Tech stack & skills
  if (
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("language") ||
    q.includes("framework") ||
    q.includes("skills") ||
    q.includes("tools")
  ) {
    return (
      `Sule's core engineering stack is focused on modern, high-performance web and mobile technologies:\n\n` +
      `• **Frontend**: React 19, Next.js, Angular, TypeScript, Tailwind CSS, Motion / Framer Motion\n` +
      `• **Mobile**: React Native, Expo, NativeWind, Gesture Handler, Reanimated\n` +
      `• **Architecture & State**: TanStack Start & Router, React Query, Zustand, Redux Toolkit\n` +
      `• **Backend & Data**: Supabase (PostgreSQL, RLS, Edge Functions, Realtime), Node.js, GraphQL, Sanity.io CMS\n` +
      `• **Engineering Standards**: Strict TypeScript types, accessible design systems, resilient error boundaries, and zero-compromise Core Web Vitals.`
    );
  }

  // Roam project
  if (q.includes("roam") || q.includes("mobile app") || q.includes("travel")) {
    const roam = projectsData.find((p) => p.slug === "roam");
    return (
      `**Roam — Mobile Stay & Travel Exploration App**\n\n` +
      `• **Role**: ${roam?.role ?? "Mobile & frontend engineering"}\n` +
      `• **Stack**: React Native, Expo, NativeWind, TypeScript, Clerk, PostHog\n` +
      `• **Challenge**: Delivering a smooth 60fps native experience across iOS and Android with complex gesture interactions and offline-resilient auth state.\n` +
      `• **Key Outcome**: Frictionless stay discovery and booking journeys with biometric persistence and unified design tokens.`
    );
  }

  // Life Compass project
  if (q.includes("life compass") || q.includes("compass") || q.includes("tracker") || q.includes("productivity")) {
    const lc = projectsData.find((p) => p.slug === "life-compass");
    return (
      `**Life Compass — Personal OS & Developer Productivity Dashboard**\n\n` +
      `• **Role**: ${lc?.role ?? "Product engineering & architecture"}\n` +
      `• **Stack**: React 19, TanStack Start, TypeScript, Tailwind CSS, Supabase, Recharts\n` +
      `• **Challenge**: Consolidating fragmented trackers (goals, learning hours, habit consistency, finance) into a single cohesive dashboard without cognitive overload.\n` +
      `• **Key Outcome**: Modular tracking widgets with weekly review aggregation, Supabase RLS, and real-time syncing.`
    );
  }

  // Sushi Craft project
  if (q.includes("sushi") || q.includes("sushi craft") || q.includes("omakase") || q.includes("restaurant")) {
    const sc = projectsData.find((p) => p.slug === "sushi-craft");
    return (
      `**Sushi Craft — Omakase Dining & Table Reservation System**\n\n` +
      `• **Role**: ${sc?.role ?? "Frontend engineering & UI craft"}\n` +
      `• **Stack**: Next.js 15, TypeScript, Tailwind CSS, Motion, Radix UI\n` +
      `• **Key Outcome**: An immersive editorial dining portal with real-time seat slot selection, multi-course pairing guides, and fluid menu animations.`
    );
  }

  // DerivConnect project
  if (q.includes("deriv") || q.includes("trading") || q.includes("derivconnect") || q.includes("fintech")) {
    const dc = projectsData.find((p) => p.slug === "derivconnect");
    return (
      `**DerivConnect — Multi-Asset Trading Terminal**\n\n` +
      `• **Role**: ${dc?.role ?? "Full-stack engineering & real-time systems"}\n` +
      `• **Stack**: React, TypeScript, WebSockets, Tailwind CSS, lightweight-charts\n` +
      `• **Key Outcome**: High-throughput tick processing with sub-50ms render latency, resilient connection recovery, and customizable charting workspaces.`
    );
  }

  // TipsDeck project
  if (q.includes("tipsdeck") || q.includes("sports") || q.includes("tips") || q.includes("football") || q.includes("prediction")) {
    const td = projectsData.find((p) => p.slug === "tipsdeck");
    return (
      `**TipsDeck — Sports Analytics & Prediction Platform**\n\n` +
      `• **Role**: ${td?.role ?? "Full-stack & product engineering"}\n` +
      `• **Stack**: React, TypeScript, Tailwind CSS, Supabase, Stripe\n` +
      `• **Challenge**: Delivering real-time sports probability models and data-dense fixtures without layout shifts or cognitive clutter, coupled with automated subscription access control.\n` +
      `• **Key Outcome**: High-density match insight cards optimized for quick mobile scanning with automated membership activation.`
    );
  }

  // Projects general
  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("case stud")) {
    const list = projectsData
      .map((p) => `• **${p.title}** (${p.year}) — ${p.category} [${p.stack.slice(0, 3).join(", ")}]`)
      .join("\n");
    return (
      `Sule has engineered high-impact products across mobile, fintech, and developer tooling:\n\n${list}\n\n` +
      `You can explore in-depth technical case studies on the [Work](/work) page, complete with architectural challenges and outcomes.`
    );
  }

  // Experience, career & background
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

  // Philosophy & approach
  if (q.includes("philosophy") || q.includes("approach") || q.includes("values") || q.includes("how do you work")) {
    return (
      `**Engineering Philosophy**\n\n` +
      `*“Think deeply. Build intentionally. Ship thoughtfully.”*\n\n` +
      `1. **Clarity over cleverness**: Write maintainable, self-documenting code with crisp domain models.\n` +
      `2. **Performance as a feature**: Optimize Core Web Vitals, reduce layout shifts, and design responsive interactions that feel native.\n` +
      `3. **Design precision**: Zero tolerance for sloppy spacing, broken contrasts, or awkward layout jumps. Motion should support storytelling, never distract.`
    );
  }

  // Availability, hiring & contact
  if (
    q.includes("hire") ||
    q.includes("available") ||
    q.includes("role") ||
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("freelance") ||
    q.includes("rate") ||
    q.includes("open to")
  ) {
    return (
      `Sule is currently open to select full-time product engineering roles, high-impact contract engagements, and technical advisory.\n\n` +
      `• **Email**: [${siteConfig.email}](mailto:${siteConfig.email})\n` +
      `• **Location**: ${siteConfig.location}\n` +
      `• **Get in touch**: Fill out the [Contact Form](/contact) or connect via [LinkedIn](${siteConfig.linkedin}).`
    );
  }

  // Default helpful overview
  return (
    `Hello! I'm Sule Malik's portfolio companion. I can answer questions about:\n\n` +
    `• **Engineering Stack**: React 19, React Native, TypeScript, TanStack Start, Supabase, Tailwind CSS\n` +
    `• **Featured Projects**: Roam (mobile travel app), Life Compass (personal OS), Sushi Craft, DerivConnect, TipsDeck\n` +
    `• **Experience & Background**: Engineering roles, design system craft, and production leadership\n` +
    `• **Availability & Contact**: Hiring availability, contract collaboration, and direct contact details\n\n` +
    `What would you like to know?`
  );
}
