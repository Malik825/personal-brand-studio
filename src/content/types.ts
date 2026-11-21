// ---------------------------------------------------------------------------
// Content type definitions & provider interface
// ---------------------------------------------------------------------------
// These types are the contract between the UI and the data source.
// When connecting Sanity, the provider returns objects matching these shapes;
// components never change.
// ---------------------------------------------------------------------------

/** Site-wide config (name, contact details, tech stack). */
export type SiteConfig = {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  location: string;
  stack: string[];
};

/** A project case study. */
export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  tone: "ink" | "rose" | "navy" | "sand";
  challenge: string;
  approach: string[];
  outcome: string;
  image?: string;
};

/** A writing/blog article. */
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  topic: string;
  /** Array of paragraph strings for now; will become Portable Text blocks with Sanity. */
  body: string[];
  image?: string;
};

/** A work-experience entry. */
export type Experience = {
  period: string;
  role: string;
  org: string;
  note: string;
};

/** A section on the About page. */
export type AboutSection = {
  title: string;
  body: string;
};

/** All content rendered on the About page. */
export type AboutContent = {
  intro: string;
  sections: AboutSection[];
  capabilities: string[];
};

// ---------------------------------------------------------------------------
// Provider interface
// ---------------------------------------------------------------------------
// Implement this interface once per data source (static, Sanity, etc.).
// The active provider is selected in src/content/index.ts.
// ---------------------------------------------------------------------------

export interface ContentProvider {
  getSite(): Promise<SiteConfig>;
  getProjects(): Promise<Project[]>;
  getProject(slug: string): Promise<Project | undefined>;
  getArticles(): Promise<Article[]>;
  getArticle(slug: string): Promise<Article | undefined>;
  getExperience(): Promise<Experience[]>;
  getAbout(): Promise<AboutContent>;
}
