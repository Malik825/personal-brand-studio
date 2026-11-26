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
    defineField({
      name: "capabilities",
      title: "Technical Capabilities (Legacy)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "capabilityGroups",
      title: "Categorized Technical Skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "category", title: "Category Title", type: "string" }),
            defineField({
              name: "items",
              title: "Skills / Tools",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "learningTopics",
      title: "Things I Enjoy Learning & Researching",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Topic Title", type: "string" }),
            defineField({ name: "subtitle", title: "Subtitle / Tag", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({ name: "icon", title: "Icon Name", type: "string" }),
            defineField({ name: "status", title: "Status Badge", type: "string" }),
          ],
        },
      ],
    }),
  ],
});
