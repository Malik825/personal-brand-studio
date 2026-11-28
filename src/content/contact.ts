// ---------------------------------------------------------------------------
// Contact page copy and options (typed, CMS-ready)
// ---------------------------------------------------------------------------

export interface OpenToItem {
  label: string;
  description: string;
}

export const contactCopy = {
  badge: "Open to engineering opportunities & collaborations",
  titlePrefix: "Let's build something",
  titleEmphasis: "meaningful.",
  intro: [
    "Whether you're looking for an engineer to join your team, need help bringing a digital product to life, or want to discuss a technical challenge, I'd be happy to hear from you.",
    "I'm interested in opportunities where thoughtful engineering, product thinking, and a focus on solving real problems come together.",
  ],
  directContact: {
    eyebrow: "Direct contact",
    emailLabel: "Email",
    primaryCta: "Send me an email",
    gmailCta: "Gmail",
    copyCta: "Copy address",
    copiedLabel: "Copied",
  },
  location: {
    heading: "Location & remote work",
    place: "Kumasi, Ghana · GMT (UTC+0)",
    availability: "Available for remote opportunities and collaborations with teams worldwide.",
  },
  openTo: {
    heading: "What I'm open to",
    items: [
      {
        label: "Full-time opportunities",
        description: "Frontend Engineer and Software Engineer roles.",
      },
      {
        label: "Product development",
        description: "Building SaaS platforms, web applications, dashboards, and MVPs.",
      },
      {
        label: "Frontend engineering",
        description: "React, Next.js, TypeScript, Angular, API integrations, and scalable frontend architecture.",
      },
      {
        label: "Technical collaboration",
        description: "Working with founders, designers, and engineering teams to turn ideas into reliable products.",
      },
    ] satisfies OpenToItem[],
  },
  profiles: {
    eyebrow: "Professional profiles",
    linkedinLabel: "LinkedIn",
    linkedinAction: "Connect",
    githubLabel: "GitHub",
    githubAction: "Explore code",
    portfolioLabel: "Portfolio",
    portfolioAction: "www.sulemalik.com",
    portfolioUrl: "https://www.sulemalik.com/",
  },
  form: {
    heading: "Tell me about your opportunity",
    subtitle: "Whether you have a clearly defined project or are still exploring an idea, share a little context below.",
    step1Label: "1. What would you like to discuss?",
    serviceOptions: [
      "Full-time opportunity",
      "Freelance / Contract project",
      "Product development",
      "Frontend engineering",
      "Technical consulting",
      "Other",
    ] as const,
    step2Label: "2. When would you like to get started?",
    timelineOptions: [
      "Immediately",
      "Within 1–2 months",
      "Flexible / Exploring",
    ] as const,
    step3Label: "3. Your details",
    fields: {
      nameLabel: "Your name",
      namePlaceholder: "e.g. Sarah Jenkins",
      emailLabel: "Work email",
      emailPlaceholder: "sarah@company.com",
      companyLabel: "Company or organisation",
      companyOptional: "(optional)",
      companyPlaceholder: "e.g. Acme Corp or Independent",
      overviewLabel: "Project or role overview",
      overviewPlaceholder:
        "Share a bit of context about the role, project goals, technical stack, or challenge you'd like to discuss...",
    },
    validationError: "Please fill in your name, work email, and a brief project or role overview.",
    submissionError:
      "Something went wrong sending your enquiry. Please try again or email me directly.",
    submitLabel: "Send enquiry",
    submittingLabel: "Sending enquiry...",
    closingNote: "I look forward to hearing from you.",
    success: {
      eyebrow: "Enquiry sent",
      headingPrefix: "Enquiry",
      headingEmphasis: "received.",
      bodyPrefix: "Thank you for reaching out,",
      bodyMiddle: "I've received your message and will reply directly to",
      bodySuffix: "soon. I look forward to hearing from you.",
      summaryHeading: "Submission summary",
      topicLabel: "Topic",
      timelineLabel: "Timeline",
      companyLabel: "Organisation",
      directFallback: "Need to share attachments or follow up right away? Email",
      doneLabel: "Done",
      exploreWork: "Explore case studies",
    },
  },
} as const;
