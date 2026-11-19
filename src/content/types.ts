// Content shapes mirror future Sanity documents; swap the data source in src/content/index.ts later.
export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  tone: "ink" | "rose" | "navy" | "sand";
  challenge: string;
  approach: string[];
  outcome: string;
};
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  topic: string;
  body: string[];
};
export type Experience = { period: string; role: string; org: string; note: string };
