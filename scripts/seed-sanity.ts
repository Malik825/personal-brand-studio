import { createClient } from "@sanity/client";
import {
  aboutContent,
  articlesData,
  experienceData,
  projectsData,
  siteConfig,
  suleMalikAuthor,
} from "../src/content/providers/static";

const projectId = process.env["VITE_SANITY_PROJECT_ID"] || "wcfopvjq";
const dataset = process.env["VITE_SANITY_DATASET"] || "production";
const token =
  process.env["SANITY_AUTH_TOKEN"] ||
  process.env["SANITY_WRITE_TOKEN"] ||
  process.env["SANITY_API_TOKEN"];

if (!token) {
  console.error("❌ Error: Missing Sanity API write token.");
  console.error(
    "Please generate an Editor/Admin token in https://sanity.io/manage (API > Tokens) and run:",
  );
  console.error("SANITY_AUTH_TOKEN=your_token npx tsx scripts/seed-sanity.ts\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function seed() {
  console.log(`🌱 Seeding Sanity dataset "${dataset}" in project "${projectId}"...`);

  // 1. Author Profile
  console.log("Creating Author Profile...");
  await client.createOrReplace({
    _id: "author-sule-malik",
    _type: "author",
    name: suleMalikAuthor.name,
    role: suleMalikAuthor.role,
    bio: suleMalikAuthor.bio,
    email: suleMalikAuthor.email,
    location: suleMalikAuthor.location,
    linkedin: suleMalikAuthor.linkedin,
    github: suleMalikAuthor.github,
    twitter: suleMalikAuthor.twitter,
  });

  // 2. Site Settings
  console.log("Creating Site Settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: siteConfig.name,
    role: siteConfig.role,
    author: { _type: "reference", _ref: "author-sule-malik" },
    email: siteConfig.email,
    linkedin: siteConfig.linkedin,
    location: siteConfig.location,
    stack: siteConfig.stack,
  });

  // 3. About
  console.log("Creating About page content...");
  await client.createOrReplace({
    _id: "about",
    _type: "about",
    intro: aboutContent.intro,
    sections: aboutContent.sections.map((s) => ({
      _key: s.title.toLowerCase().replace(/\s+/g, "-"),
      title: s.title,
      body: s.body,
    })),
    capabilities: aboutContent.capabilities,
    learningTopics: aboutContent.learningTopics,
  });

  // 3. Projects
  console.log("Creating Projects...");
  for (const p of projectsData) {
    await client.createOrReplace({
      _id: `project-${p.slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      year: p.year,
      role: p.role,
      summary: p.summary,
      stack: p.stack,
      tone: p.tone,
      challenge: p.challenge,
      approach: p.approach,
      outcome: p.outcome,
      order: p.order,
      url: p.url,
      githubUrl: p.githubUrl,
    });
  }

  // 4. Articles
  console.log("Creating Articles...");
  for (const a of articlesData) {
    await client.createOrReplace({
      _id: `article-${a.slug}`,
      _type: "article",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      author: { _type: "reference", _ref: "author-sule-malik" },
      topic: a.topic,
      date: a.date,
      readingTime: a.readingTime,
      excerpt: a.excerpt,
      featured: a.featured ?? false,
      relatedProjectSlug: a.relatedProjectSlug,
      tags: a.tags ?? [],
      takeaways: a.takeaways ?? [],
      sections: (a.sections || []).map((sec) => ({
        _key: sec.id,
        id: sec.id,
        title: sec.title,
        paragraphs: sec.paragraphs,
        callout: sec.callout ? { label: sec.callout.label, text: sec.callout.text } : undefined,
        quote: sec.quote,
      })),
      body: a.body.map((paragraph, idx) => ({
        _key: `block-${idx}`,
        _type: "block",
        style: "normal",
        children: [
          {
            _key: `span-${idx}`,
            _type: "span",
            text: paragraph,
            marks: [],
          },
        ],
        markDefs: [],
      })),
    });
  }

  // 5. Experience
  console.log("Creating Experience entries...");
  for (let i = 0; i < experienceData.length; i++) {
    const exp = experienceData[i]!;
    await client.createOrReplace({
      _id: `experience-${i + 1}`,
      _type: "experience",
      period: exp.period,
      role: exp.role,
      org: exp.org,
      note: exp.note,
    });
  }

  console.log("✅ Successfully seeded all content to Sanity!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
