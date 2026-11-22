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
        location,
        stack
      }`;
      const data = await this.client.fetch<SiteConfig | null>(query);
      return data || staticSite;
    } catch (err) {
      console.warn("[Sanity] Failed to fetch siteSettings, falling back to static:", err);
      return staticSite;
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      const query = `*[_type == "project"] | order(year desc){
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
        "image": image.asset->url
      }`;
      const data = await this.client.fetch<Article[]>(query);
      if (data && data.length > 0) {
        return data.map((a) => ({
          ...a,
          body: extractBodyParagraphs(a.body),
        }));
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
        "image": image.asset->url
      }`;
      const data = await this.client.fetch<Article | null>(query, { slug });
      if (data) {
        return {
          ...data,
          body: extractBodyParagraphs(data.body),
        };
      }
      return staticArticles.find((a) => a.slug === slug);
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
      return data || staticAbout;
    } catch (err) {
      console.warn("[Sanity] Failed to fetch about content, falling back to static:", err);
      return staticAbout;
    }
  }
}
