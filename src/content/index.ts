import { SanityContentProvider } from "./providers/sanity";
import {
  aboutContent,
  articlesData,
  experienceData,
  projectsData,
  siteConfig,
} from "./providers/static";
import type { ContentProvider } from "./types";

export type * from "./types";

// Active provider instance (connected to Sanity dataset "production")
export const contentProvider: ContentProvider = new SanityContentProvider();

// ---------------------------------------------------------------------------
// Async data accessors (Sanity live data)
// ---------------------------------------------------------------------------
export const getSite = () => contentProvider.getSite();
export const getProjects = () => contentProvider.getProjects();
export const getProject = (slug: string) => contentProvider.getProject(slug);
export const getArticles = () => contentProvider.getArticles();
export const getArticle = (slug: string) => contentProvider.getArticle(slug);
export const getExperience = () => contentProvider.getExperience();
export const getAbout = () => contentProvider.getAbout();

// ---------------------------------------------------------------------------
// Static fallbacks & defaults
// ---------------------------------------------------------------------------
export const site = siteConfig;
export { siteConfig };
export const projects = projectsData;
export const articles = articlesData;
export const experience = experienceData;
export const about = aboutContent;

export const formatDate = (d?: string) => {
  if (!d) return "";
  try {
    const date = new Date(d);
    if (isNaN(date.getTime())) return d;
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return d || "";
  }
};
