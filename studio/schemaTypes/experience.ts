import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "period",
      title: "Period (e.g. 2024 — Present)",
      type: "string",
    }),
    defineField({ name: "role", title: "Job Role", type: "string" }),
    defineField({ name: "org", title: "Organization / Company", type: "string" }),
    defineField({ name: "note", title: "Description / Note", type: "text" }),
  ],
});
