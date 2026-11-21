# Sanity Schema Definitions for Personal Brand Studio

These schemas correspond 1:1 with the types in `src/content/types.ts`.

## 1. Project Schema (`project.ts`)

```typescript
import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "stack", title: "Tech Stack", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "tone",
      title: "Tone (Palette)",
      type: "string",
      options: { list: ["ink", "rose", "navy", "sand"] },
      initialValue: "ink",
    }),
    defineField({ name: "challenge", title: "Challenge", type: "text" }),
    defineField({ name: "approach", title: "Approach Steps", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "outcome", title: "Outcome", type: "text" }),
  ],
});
```

## 2. Article Schema (`article.ts`)

```typescript
import { defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "topic", title: "Topic", type: "string" }),
    defineField({ name: "date", title: "Publication Date", type: "date" }),
    defineField({ name: "readingTime", title: "Reading Time", type: "string" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({
      name: "body",
      title: "Content Body",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
  ],
});
```

## 3. Site Settings Schema (`siteSettings.ts`)

```typescript
import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role / Headline", type: "string" }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "location", title: "Location Note", type: "string" }),
    defineField({ name: "stack", title: "Hero Stack Tags", type: "array", of: [{ type: "string" }] }),
  ],
});
```

## 4. Experience Schema (`experience.ts`)

```typescript
import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "period", title: "Period (e.g. 2024 — Present)", type: "string" }),
    defineField({ name: "role", title: "Job Role", type: "string" }),
    defineField({ name: "org", title: "Organization / Company", type: "string" }),
    defineField({ name: "note", title: "Description / Note", type: "text" }),
  ],
});
```

## 5. About Page Schema (`about.ts`)

```typescript
import { defineField, defineType } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "intro", title: "Intro Paragraph", type: "text" }),
    defineField({
      name: "sections",
      title: "Editorial Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Section Title", type: "string" }),
            defineField({ name: "body", title: "Section Body", type: "text" }),
          ],
        },
      ],
    }),
    defineField({ name: "capabilities", title: "Technical Capabilities", type: "array", of: [{ type: "string" }] }),
  ],
});
```
