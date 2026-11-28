import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  BRAND_DESCRIPTION,
  buildHomeJsonLd,
  buildPageMeta,
  cleanMetaDescription,
  DEFAULT_OG_IMAGE,
  resolveSocialImageUrl,
  SITE_URL,
  VERIFIED_PROFILES,
} from "@/lib/seo";
import { articlesData, projectsData } from "@/content/providers/static";

describe("SEO metadata, social cards, and structured data", () => {
  it("strips markdown and keeps meta descriptions concise and clean", () => {
    const raw =
      "I've been reading Steve Krug's *Don't Make Me Think*, and it's been interesting to look at websites from a different perspective. Some of the ideas seem obvious at first, but they make you question how you approach building interfaces.";
    const cleaned = cleanMetaDescription(raw);
    expect(cleaned).not.toContain("*");
    expect(cleaned.length).toBeLessThanOrEqual(158);
    expect(cleaned.endsWith("…")).toBe(true);
  });

  it("builds complete Open Graph, Twitter/X, and canonical tags per route", () => {
    const seo = buildPageMeta({
      title: "Sule Malik | Product-minded Software Engineer",
      description: BRAND_DESCRIPTION,
      path: "/",
    });

    expect(seo.canonicalLink).toEqual({ rel: "canonical", href: `${SITE_URL}/` });
    expect(seo.meta).toContainEqual({ property: "og:site_name", content: "Sule Malik" });
    expect(seo.meta).toContainEqual({ property: "og:image", content: DEFAULT_OG_IMAGE });
    expect(seo.meta).toContainEqual({ name: "twitter:card", content: "summary_large_image" });
    expect(seo.meta).toContainEqual({ name: "twitter:image", content: DEFAULT_OG_IMAGE });
  });

  it("transforms Sanity CDN images to 1200x630 social card URLs", () => {
    const url = resolveSocialImageUrl("https://cdn.sanity.io/images/wcfopvjq/production/abc-1600x900.png");
    expect(url).toContain("w=1200&h=630&fit=crop&auto=format&q=85");
  });

  it("generates valid Person and WebSite JSON-LD with verified profiles and image", () => {
    const jsonLd = buildHomeJsonLd();
    const serialized = JSON.stringify(jsonLd);
    expect(() => JSON.parse(serialized)).not.toThrow();

    const person = jsonLd["@graph"].find((n) => n["@type"] === "Person");
    const website = jsonLd["@graph"].find((n) => n["@type"] === "WebSite");

    expect(person?.name).toBe("Sule Malik");
    expect(person?.url).toBe(SITE_URL);
    expect(person?.image).toMatch(/^https:\/\/www\.sulemalik\.com\//);
    expect(person?.jobTitle).toBe("Product-minded Software Engineer");
    expect(person?.sameAs).toEqual([...VERIFIED_PROFILES]);
    expect(website?.url).toBe(`${SITE_URL}/`);
  });

  it("ensures unique slugs across projects and articles for canonical & sitemap integrity", () => {
    const projectSlugs = projectsData.map((p) => p.slug);
    const articleSlugs = articlesData.map((a) => a.slug);
    expect(new Set(projectSlugs).size).toBe(projectSlugs.length);
    expect(new Set(articleSlugs).size).toBe(articleSlugs.length);
  });

  it("verifies public OG image, favicons, and robots.txt exist and point to www canonical sitemap", () => {
    const root = process.cwd();
    expect(fs.existsSync(path.join(root, "public/og-image.png"))).toBe(true);
    expect(fs.existsSync(path.join(root, "public/favicon.svg"))).toBe(true);
    expect(fs.existsSync(path.join(root, "public/favicon-32x32.png"))).toBe(true);
    expect(fs.existsSync(path.join(root, "public/apple-touch-icon.png"))).toBe(true);

    const robots = fs.readFileSync(path.join(root, "public/robots.txt"), "utf8");
    expect(robots).toContain("Sitemap: https://www.sulemalik.com/sitemap.xml");
    expect(robots).toContain("Disallow: /api/");
    expect(robots).toContain("Disallow: /ask/");
  });
});
