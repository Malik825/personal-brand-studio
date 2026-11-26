import { defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
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
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "topic",
      title: "Topic / Category",
      type: "string",
      description: "Editorial category for this article. Pick from the curated list to organize content and power UI filters.",
      options: {
        list: [
          { title: "Architecture", value: "Architecture" },
          { title: "Engineering", value: "Engineering" },
          { title: "Mobile", value: "Mobile" },
          { title: "Product", value: "Product" },
          { title: "Design & UX", value: "Design & UX" },
          { title: "Collaboration", value: "Collaboration" },
          { title: "Frontend", value: "Frontend" },
          { title: "Backend & Systems", value: "Backend & Systems" },
          { title: "Performance", value: "Performance" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "date", title: "Publication Date", type: "date" }),
    defineField({ name: "readingTime", title: "Reading Time", type: "string" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({
      name: "body",
      title: "Body Paragraphs / Blocks",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "sections",
      title: "Structured Editorial Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "articleSection",
          fields: [
            { name: "id", title: "Anchor ID", type: "string" },
            { name: "title", title: "Section Heading", type: "string" },
            {
              name: "paragraphs",
              title: "Paragraphs",
              type: "array",
              of: [{ type: "text" }],
            },
            {
              name: "callout",
              title: "Callout Box",
              type: "object",
              fields: [
                { name: "label", title: "Badge Label", type: "string" },
                { name: "text", title: "Callout Text", type: "text" },
              ],
            },
            { name: "quote", title: "Pull Quote", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "takeaways",
      title: "Key Takeaways",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "relatedProjectSlug",
      title: "Related Project Slug",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Featured Article",
      type: "boolean",
    }),
    defineField({
      name: "seoTitle",
      title: "Custom SEO Title",
      type: "string",
      description: "Optional custom title for search engine result pages (defaults to article title if empty).",
    }),
    defineField({
      name: "seoDescription",
      title: "Custom SEO Description",
      type: "text",
      rows: 2,
      description: "Optional custom meta description for search engines & social cards (defaults to excerpt if empty).",
    }),
  ],
});
