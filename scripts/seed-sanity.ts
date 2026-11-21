import { createClient } from "@sanity/client";
import {
  aboutContent,
  articlesData,
  experienceData,
  projectsData,
  siteConfig,
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

  // 1. Site Settings
  console.log("Creating Site Settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: siteConfig.name,
    role: siteConfig.role,
    email: siteConfig.email,
    linkedin: siteConfig.linkedin,
    location: siteConfig.location,
    stack: siteConfig.stack,
  });

  // 2. About
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
      topic: a.topic,
      date: a.date,
      readingTime: a.readingTime,
      excerpt: a.excerpt,
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
