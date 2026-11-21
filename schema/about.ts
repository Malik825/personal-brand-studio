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
      title: "Technical Capabilities",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
