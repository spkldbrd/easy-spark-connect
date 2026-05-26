import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { WP_BASE, type WPPost } from "@/lib/wp";

const BASE_URL = "https://digitalsolution.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/ai-solutions", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "daily", priority: "0.9" },
  { path: "/locations/atascadero", changefreq: "monthly", priority: "0.7" },
  { path: "/locations/paso-robles", changefreq: "monthly", priority: "0.7" },
  { path: "/locations/san-luis-obispo", changefreq: "monthly", priority: "0.7" },
];

async function fetchAllPostEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];
  let page = 1;
  let totalPages = 1;
  do {
    const res = await fetch(`${WP_BASE}/posts?per_page=100&page=${page}&_fields=slug,modified`);
    if (!res.ok) throw new Error(`WP fetch failed: ${res.status}`);
    totalPages = Number(res.headers.get("x-wp-totalpages") || "1");
    const posts = (await res.json()) as Pick<WPPost, "slug" | "modified">[];
    for (const p of posts) {
      entries.push({
        path: `/blog/${p.slug}`,
        lastmod: p.modified ? new Date(p.modified).toISOString() : undefined,
        changefreq: "monthly",
        priority: "0.6",
      });
    }
    page += 1;
  } while (page <= totalPages);
  return entries;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        let entries: SitemapEntry[] = [...STATIC_ENTRIES];
        try {
          const posts = await fetchAllPostEntries();
          entries = entries.concat(posts);
        } catch (err) {
          console.error("Sitemap: WP fetch failed, serving static routes only.", err);
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
