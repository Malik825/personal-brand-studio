import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      readOnly: false,
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({
      name: "stack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tone",
      title: "Tone (Palette)",
      type: "string",
      options: { list: ["ink", "rose", "navy", "sand"] },
      initialValue: "ink",
    }),
    defineField({ name: "url", title: "Live Website URL", type: "url" }),
    defineField({ name: "githubUrl", title: "GitHub Repository URL", type: "url" }),
    defineField({ name: "order", title: "Display Order (1 = first)", type: "number" }),
    defineField({ name: "featured", title: "Featured Spotlight", type: "boolean", initialValue: false }),
    defineField({
      name: "metric",
      title: "Key Impact Metric",
      type: "object",
      fields: [
        defineField({ name: "value", title: "Metric Value (e.g. <100ms)", type: "string" }),
        defineField({ name: "label", title: "Metric Label (e.g. latency)", type: "string" }),
      ],
    }),
    defineField({ name: "challenge", title: "Challenge", type: "text" }),
    defineField({
      name: "approach",
      title: "Approach Steps",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "outcome", title: "Outcome", type: "text" }),
  ],
});
