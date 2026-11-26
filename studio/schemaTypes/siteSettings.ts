import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role / Headline", type: "string" }),
    defineField({
      name: "author",
      title: "Author Profile",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "github", title: "GitHub URL", type: "url" }),
    defineField({ name: "twitter", title: "Twitter / X Profile URL", type: "url" }),
    defineField({ name: "location", title: "Location Note", type: "string" }),
    defineField({
      name: "stack",
      title: "Hero Stack Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
