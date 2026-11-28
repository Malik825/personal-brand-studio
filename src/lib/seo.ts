// ---------------------------------------------------------------------------
// Centralized SEO, Open Graph, Twitter/X, and JSON-LD helpers for sulemalik.com
// ---------------------------------------------------------------------------

export const SITE_URL = "https://www.sulemalik.com";
export const SITE_NAME = "Sule Malik";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const PERSON_IMAGE = `${SITE_URL}/images/profile.webp`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const VERIFIED_PROFILES = [
  "https://www.linkedin.com/in/abdulmalik-suleman-14a8501a9/",
  "https://github.com/malik825",
] as const;

export const BRAND_DESCRIPTION =
  "Sule Malik is a Software Engineer building scalable web applications and digital products with React, Next.js, TypeScript and Angular.";

/** Strip lightweight inline markdown (*italic*, **bold**, `code`) and collapse whitespace. */
export function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Normalize a meta description to a clean, plain-text string around ~140-155 chars
 * without cutting words in half.
 */
export function cleanMetaDescription(raw: string | undefined, maxLength = 158): string {
  if (!raw) return BRAND_DESCRIPTION;
  const plain = stripMarkdown(raw);
  if (plain.length <= maxLength) return plain;
  const sliced = plain.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut = lastSpace > 100 ? sliced.slice(0, lastSpace) : sliced;
  return `${cut.replace(/[.,;:—-]+$/, "")}…`;
}

/**
 * Convert a relative or Sanity CDN image URL into an absolute social-ready image URL.
 * Sanity images are cropped to 1200x630 so LinkedIn/X receive properly framed assets.
 */
export function resolveSocialImageUrl(image?: string): string {
  if (!image) return DEFAULT_OG_IMAGE;
  if (image.includes("cdn.sanity.io/images/")) {
    const sep = image.includes("?") ? "&" : "?";
    return `${image}${sep}w=1200&h=630&fit=crop&auto=format&q=85`;
  }
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  const normalizedPath = image.startsWith("/") ? image : `/${image}`;
  return `${SITE_URL}${normalizedPath}`;
}

export interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile" | undefined;
  image?: string | undefined;
  imageAlt?: string | undefined;
  publishedTime?: string | undefined;
  modifiedTime?: string | undefined;
  author?: string | undefined;
  section?: string | undefined;
}

/** Build consistent, non-duplicated title, description, Open Graph, and Twitter/X meta tags. */
export function buildPageMeta({
  title,
  description,
  path,
  type = "website",
  image,
  imageAlt,
  publishedTime,
  modifiedTime,
  author,
  section,
}: PageMetaInput) {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const cleanDesc = cleanMetaDescription(description);
  const resolvedImage = resolveSocialImageUrl(image);
  const resolvedAlt = imageAlt || title;

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: cleanDesc },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: cleanDesc },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: resolvedImage },
    { property: "og:image:alt", content: resolvedAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: cleanDesc },
    { name: "twitter:image", content: resolvedImage },
    { name: "twitter:image:alt", content: resolvedAlt },
  ];

  if (type === "article") {
    if (publishedTime) meta.push({ property: "article:published_time", content: publishedTime });
    if (modifiedTime) meta.push({ property: "article:modified_time", content: modifiedTime });
    if (author) meta.push({ property: "article:author", content: author });
    if (section) meta.push({ property: "article:section", content: section });
  }

  return {
    url,
    description: cleanDesc,
    imageUrl: resolvedImage,
    meta,
    canonicalLink: { rel: "canonical", href: url },
  };
}

/** Verifiable Person + WebSite structured data graph for the site root/homepage. */
export function buildHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_NAME,
        url: SITE_URL,
        image: PERSON_IMAGE,
        jobTitle: "Product-minded Software Engineer",
        description: BRAND_DESCRIPTION,
        email: "mailto:abdulmaliksuleman75@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Asante Mampong",
          addressRegion: "Ashanti Region",
          addressCountry: "GH",
        },
        sameAs: [...VERIFIED_PROFILES],
        knowsAbout: [
          "Frontend Engineering",
          "React",
          "Next.js",
          "TypeScript",
          "Angular",
          "JavaScript",
          "Software Architecture",
          "API Integrations",
          "SaaS Applications",
          "Dashboard Development",
          "Full-Stack Product Development",
          "Web Performance",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: BRAND_DESCRIPTION,
        publisher: {
          "@id": PERSON_ID,
        },
      },
    ],
  };
}
