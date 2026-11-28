// ---------------------------------------------------------------------------
// Contact page copy and options (typed, CMS-ready)
// ---------------------------------------------------------------------------

export type HelpServiceIcon = "globe" | "layout-grid" | "layers" | "wrench" | "briefcase";

export interface HelpServiceItem {
  id: string;
  title: string;
  description: string;
  icon: HelpServiceIcon;
}

export const contactCopy = {
  badge: "Open to projects, collaborations & engineering roles",
  titlePrefix: "Let's build something",
  titleEmphasis: "meaningful.",
  supportingHeadline: "Have an idea, a business challenge, or an opportunity? Let's talk.",
  intro: [
    "I work with businesses, founders, and teams to turn ideas and everyday challenges into useful digital products.",
    "Whether you need a website for your business, a platform to serve your customers, a better way to manage your operations, or an engineer to join your team, I'd love to hear what you're working on.",
    "You don't need to know the technical details or have everything figured out. Just tell me what you're trying to achieve, and we can explore the best way to make it happen.",
  ],
  howIHelp: {
    eyebrow: "How I can help",
    heading: "Practical ways we can work together.",
    items: [
      {
        id: "websites",
        title: "Websites for Businesses",
        description:
          "Professional websites that help businesses establish an online presence, showcase their services, and reach more customers.",
        icon: "globe",
      },
      {
        id: "web-apps",
        title: "Web Applications",
        description:
          "Custom platforms that make everyday processes easier, improve customer experiences, and support business growth.",
        icon: "layout-grid",
      },
      {
        id: "digital-products",
        title: "Digital Products",
        description:
          "SaaS platforms, dashboards, management systems, and MVPs built around real needs.",
        icon: "layers",
      },
      {
        id: "existing-products",
        title: "Existing Products",
        description:
          "Improving, maintaining, and extending websites and applications.",
        icon: "wrench",
      },
      {
        id: "engineering-opportunities",
        title: "Engineering Opportunities",
        description:
          "Joining teams as a Frontend Engineer or Software Engineer to build and improve digital products.",
        icon: "briefcase",
      },
    ] satisfies HelpServiceItem[],
  },
  workingTogether: {
    eyebrow: "Working together",
    heading: "You don't need all the answers.",
    paragraphs: [
      "I collaborate with business owners, founders, designers, and engineering teams. You can come with a detailed specification or simply explain a problem you're trying to solve.",
      "My job is to understand the need, help clarify the approach, and build something useful.",
    ],
  },
  directContact: {
    eyebrow: "Direct contact",
    emailLabel: "Email",
    primaryCta: "Send me an email",
    gmailCta: "Compose in Gmail",
    copyCta: "Copy email",
    copiedLabel: "Copied",
  },
  location: {
    heading: "Location & availability",
    place: "Kumasi, Ghana · GMT (UTC+0)",
    availability:
      "Available for remote opportunities and collaborations with individuals and teams worldwide.",
  },
  profiles: {
    eyebrow: "Professional profiles",
    linkedinLabel: "LinkedIn",
    linkedinAction: "Connect",
    linkedinUrl: "https://www.linkedin.com/in/abdulmalik-suleman-14a8501a9/",
    githubLabel: "GitHub",
    githubAction: "Explore code",
    githubUrl: "https://github.com/Malik825",
    websiteLabel: "Website",
    websiteAction: "www.sulemalik.com",
    websiteUrl: "https://www.sulemalik.com/",
  },
  form: {
    heading: "Tell me about what you have in mind.",
    subtitle:
      "You don't need to know the technical language. Just tell me a little about yourself, your business, or the opportunity you're exploring.",
    step1Label: "1. What brings you here?",
    serviceOptions: [
      "I need a website for my business.",
      "I have an idea for an application or platform.",
      "I want to improve an existing website or product.",
      "I'm looking for a developer to join my team.",
      "I want to discuss a freelance or contract project.",
      "Something else.",
    ] as const,
    step2Label: "2. When would you like to get started?",
    timelineOptions: [
      "Immediately",
      "Within 1–2 months",
      "Flexible / Just exploring",
    ] as const,
    step3Label: "3. Your details",
    fields: {
      nameLabel: "Your name",
      namePlaceholder: "e.g. Sarah Jenkins",
      emailLabel: "Work email",
      emailPlaceholder: "sarah@company.com",
      companyLabel: "Company or organisation",
      companyOptional: "(optional)",
      companyPlaceholder: "e.g. Acme Studio or Independent",
      overviewLabel: "Tell me what you're trying to achieve.",
      overviewPlaceholder:
        "Tell me a little about your business, idea, project, or opportunity. What problem are you trying to solve?",
    },
    validationError:
      "Please fill in your name, work email, and tell me a little about what you're trying to achieve.",
    submissionError:
      "Something went wrong sending your enquiry. Please try again or email me directly.",
    submitLabel: "Send enquiry",
    submittingLabel: "Sending enquiry...",
    closingNote: "Usually replies within 1 business day.",
    success: {
      eyebrow: "Enquiry sent",
      headingPrefix: "Enquiry",
      headingEmphasis: "received.",
      bodyPrefix: "Thank you for reaching out,",
      bodyMiddle: "I've received your message and will reply directly to",
      bodySuffix: "soon. I look forward to hearing from you.",
      summaryHeading: "Submission summary",
      topicLabel: "Reason",
      timelineLabel: "Timeline",
      companyLabel: "Organisation",
      directFallback: "Need to share attachments or follow up right away? Email",
      doneLabel: "Done",
      exploreWork: "Explore case studies",
    },
  },
  closing: {
    heading: "I look forward to hearing from you.",
    emailPrompt: "Prefer email directly?",
  },
} as const;
