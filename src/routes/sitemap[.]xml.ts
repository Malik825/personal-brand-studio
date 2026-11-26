import { createFileRoute } from "@tanstack/react-router";
import { getProjects, getArticles } from "@/content";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [projects, articles] = await Promise.all([
          getProjects(),
          getArticles(),
        ]);

        const baseUrl = "https://sulemalik.com";
        const today = new Date().toISOString().split("T")[0];

        const coreRoutes = [
          { url: `${baseUrl}/`, priority: "1.0", changefreq: "weekly", lastmod: today },
          { url: `${baseUrl}/work`, priority: "0.9", changefreq: "weekly", lastmod: today },
          { url: `${baseUrl}/about`, priority: "0.8", changefreq: "monthly", lastmod: today },
          { url: `${baseUrl}/writing`, priority: "0.8", changefreq: "weekly", lastmod: today },
          { url: `${baseUrl}/contact`, priority: "0.8", changefreq: "monthly", lastmod: today },
        ];

        const projectRoutes = projects.map((p) => ({
          url: `${baseUrl}/work/${p.slug}`,
          priority: p.featured ? "0.8" : "0.7",
          changefreq: "monthly",
          lastmod: today,
        }));

        const articleRoutes = articles.map((a) => ({
          url: `${baseUrl}/writing/${a.slug}`,
          priority: "0.8",
          changefreq: "monthly",
          lastmod: a.date ? a.date.split("T")[0] : today,
        }));

        const allRoutes = [...coreRoutes, ...projectRoutes, ...articleRoutes];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

        return new Response(xml, {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
