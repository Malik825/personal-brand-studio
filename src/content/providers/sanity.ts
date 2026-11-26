import { createClient, type SanityClient } from "@sanity/client";
import type {
  AboutContent,
  Article,
  ContentProvider,
  Experience,
  Project,
  SiteConfig,
} from "../types";
import {
  aboutContent as staticAbout,
  articlesData as staticArticles,
  experienceData as staticExperience,
  projectsData as staticProjects,
  siteConfig as staticSite,
} from "./static";

const projectId =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.["VITE_SANITY_PROJECT_ID"]) ||
  "wcfopvjq";

const dataset =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.["VITE_SANITY_DATASET"]) ||
  "production";

const apiVersion =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.["VITE_SANITY_API_VERSION"]) ||
  "2024-01-01";

function extractBodyParagraphs(body: unknown): string[] {
  if (!Array.isArray(body)) return [];
  return body
    .map((item) => {
      if (typeof item === "string") return item;
      if (
        item &&
        typeof item === "object" &&
        Array.isArray((item as { children?: Array<{ text?: string }> }).children)
      ) {
        return (item as { children: Array<{ text?: string }> }).children
          .map((child) => child?.text || "")
          .join("");
      }
      return "";
    })
    .filter(Boolean);
}

export class SanityContentProvider implements ContentProvider {
  private client: SanityClient;

  constructor() {
    this.client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }

  async getSite(): Promise<SiteConfig> {
    try {
      const query = `*[_type == "siteSettings"][0]{
        name,
        role,
        email,
        linkedin,
        github,
        location,
        stack,
        "author": author->{
          name,
          role,
          bio,
          location,
          email,
          linkedin,
          github,
          twitter,
          "image": image.asset->url
        }
      }`;
      const data = await this.client.fetch<SiteConfig | null>(query);
      if (data) {
        return {
          ...staticSite,
          ...data,
          stack: Array.isArray(data.stack) && data.stack.length > 0 ? data.stack : staticSite.stack,
          author: (data.author && data.author.name) ? data.author : staticSite.author,
        };
      }
      return staticSite;
    } catch (err) {
      console.warn("[Sanity] Failed to fetch siteSettings, falling back to static:", err);
      return staticSite;
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      const query = `*[_type == "project"] | order(coalesce(order, 999) asc, year desc){
        "slug": slug.current,
        title,
        category,
        year,
        role,
        summary,
        stack,
        tone,
        challenge,
        approach,
        outcome,
        order,
        url,
        githubUrl,
        "image": image.asset->url
      }`;
      const data = await this.client.fetch<Project[]>(query);
      if (data && data.length > 0) {
        return data.map((p) => {
          const fallback = staticProjects.find((sp) => sp.slug === p.slug);
          const image = p.image || fallback?.image;
          const { image: _image, ...fields } = p;
          return {
            ...fallback,
            ...fields,
            stack: Array.isArray(p.stack) && p.stack.length > 0 ? p.stack : (fallback?.stack || []),
            approach: Array.isArray(p.approach) && p.approach.length > 0 ? p.approach : (fallback?.approach || []),
            ...(image ? { image } : {}),
          };
        });
      }
      return staticProjects;
    } catch (err) {
      console.warn("[Sanity] Failed to fetch projects, falling back to static:", err);
      return staticProjects;
    }
  }

  async getProject(slug: string): Promise<Project | undefined> {
    try {
      const query = `*[_type == "project" && slug.current == $slug][0]{
        "slug": slug.current,
        title,
        category,
        year,
        role,
        summary,
        stack,
        tone,
        challenge,
        approach,
        outcome,
        url,
        githubUrl,
        "image": image.asset->url
      }`;
      const data = await this.client.fetch<Project | null>(query, { slug });
      const fallback = staticProjects.find((p) => p.slug === slug);
      if (data) {
        const image = data.image || fallback?.image;
        const { image: _image, ...fields } = data;
        return {
          ...fallback,
          ...fields,
          ...(image ? { image } : {}),
        };
      }
      return fallback;
    } catch (err) {
      console.warn(`[Sanity] Failed to fetch project "${slug}", falling back to static:`, err);
      return staticProjects.find((p) => p.slug === slug);
    }
  }

  async getArticles(): Promise<Article[]> {
    try {
      const query = `*[_type == "article"] | order(date desc){
        "slug": slug.current,
        title,
        topic,
        date,
        readingTime,
        excerpt,
        body,
        tags,
        takeaways,
        featured,
        relatedProjectSlug,
        sections[]{
          id,
          title,
          paragraphs,
          callout{ label, text },
          quote
        },
        "image": image.asset->url,
        "author": author->{
          name,
          role,
          bio,
          location,
          email,
          linkedin,
          github,
          twitter,
          "image": image.asset->url
        }
      }`;
      const data = await this.client.fetch<Article[]>(query);
      if (data && data.length > 0) {
        return data.map((a) => {
          const fallback = staticArticles.find((sa) => sa.slug === a.slug);
          const image = a.image || fallback?.image;
          const { image: _image, ...fields } = a;
          const extracted = extractBodyParagraphs(a.body);
          const author = (a.author && a.author.name) ? a.author : fallback?.author;
          const sections = Array.isArray(a.sections) && a.sections.length > 0 ? a.sections : (fallback?.sections || []);
          const relatedProjectSlug = a.relatedProjectSlug || fallback?.relatedProjectSlug;
          return {
            ...fallback,
            ...fields,
            body: extracted.length > 0 ? extracted : (fallback?.body || []),
            tags: Array.isArray(a.tags) && a.tags.length > 0 ? a.tags : (fallback?.tags || []),
            takeaways: Array.isArray(a.takeaways) && a.takeaways.length > 0 ? a.takeaways : (fallback?.takeaways || []),
            featured: a.featured ?? fallback?.featured ?? false,
            readingTime: a.readingTime || fallback?.readingTime || "6 min",
            date: a.date || fallback?.date || new Date().toISOString(),
            ...(image ? { image } : {}),
            ...(author ? { author } : {}),
            ...(sections.length > 0 ? { sections } : {}),
            ...(relatedProjectSlug ? { relatedProjectSlug } : {}),
          };
        });
      }
      return staticArticles;
    } catch (err) {
      console.warn("[Sanity] Failed to fetch articles, falling back to static:", err);
      return staticArticles;
    }
  }

  async getArticle(slug: string): Promise<Article | undefined> {
    try {
      const query = `*[_type == "article" && slug.current == $slug][0]{
        "slug": slug.current,
        title,
        topic,
        date,
        readingTime,
        excerpt,
        body,
        tags,
        takeaways,
        featured,
        relatedProjectSlug,
        sections[]{
          id,
          title,
          paragraphs,
          callout{ label, text },
          quote
        },
        "image": image.asset->url,
        "author": author->{
          name,
          role,
          bio,
          location,
          email,
          linkedin,
          github,
          twitter,
          "image": image.asset->url
        }
      }`;
      const data = await this.client.fetch<Article | null>(query, { slug });
      const fallback = staticArticles.find((a) => a.slug === slug);
      if (data) {
        const image = data.image || fallback?.image;
        const { image: _image, ...fields } = data;
        const extracted = extractBodyParagraphs(data.body);
        const author = (data.author && data.author.name) ? data.author : fallback?.author;
        const sections = Array.isArray(data.sections) && data.sections.length > 0 ? data.sections : (fallback?.sections || []);
        const relatedProjectSlug = data.relatedProjectSlug || fallback?.relatedProjectSlug;
        return {
          ...fallback,
          ...fields,
          body: extracted.length > 0 ? extracted : (fallback?.body || []),
          tags: Array.isArray(data.tags) && data.tags.length > 0 ? data.tags : (fallback?.tags || []),
          takeaways: Array.isArray(data.takeaways) && data.takeaways.length > 0 ? data.takeaways : (fallback?.takeaways || []),
          featured: data.featured ?? fallback?.featured ?? false,
          readingTime: data.readingTime || fallback?.readingTime || "6 min",
          date: data.date || fallback?.date || new Date().toISOString(),
          ...(image ? { image } : {}),
          ...(author ? { author } : {}),
          ...(sections.length > 0 ? { sections } : {}),
          ...(relatedProjectSlug ? { relatedProjectSlug } : {}),
        };
      }
      return fallback;
    } catch (err) {
      console.warn(`[Sanity] Failed to fetch article "${slug}", falling back to static:`, err);
      return staticArticles.find((a) => a.slug === slug);
    }
  }

  async getExperience(): Promise<Experience[]> {
    try {
      const query = `*[_type == "experience"]{
        period,
        role,
        org,
        note
      }`;
      const data = await this.client.fetch<Experience[]>(query);
      return data && data.length > 0 ? data : staticExperience;
    } catch (err) {
      console.warn("[Sanity] Failed to fetch experience, falling back to static:", err);
      return staticExperience;
    }
  }

  async getAbout(): Promise<AboutContent> {
    try {
      const query = `*[_type == "about"][0]{
        intro,
        sections[]{
          title,
          body
        },
        capabilities
      }`;
      const data = await this.client.fetch<AboutContent | null>(query);
      if (data) {
        return {
          ...staticAbout,
          ...data,
          bio: data.bio ?? staticAbout.bio ?? [],
          principles: data.principles ?? staticAbout.principles ?? [],
          capabilityGroups: data.capabilityGroups ?? staticAbout.capabilityGroups ?? [],
          learningTopics: data.learningTopics ?? staticAbout.learningTopics ?? [],
          sections: Array.isArray(data.sections) && data.sections.length > 0 ? data.sections : staticAbout.sections,
          capabilities: Array.isArray(data.capabilities) && data.capabilities.length > 0 ? data.capabilities : staticAbout.capabilities,
        };
      }
      return staticAbout;
    } catch (err) {
      console.warn("[Sanity] Failed to fetch about content, falling back to static:", err);
      return staticAbout;
    }
  }
}
