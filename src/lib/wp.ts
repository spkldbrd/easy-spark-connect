// WordPress REST API helpers for digitalsolution.nexgenservers.com
export const WP_BASE = "https://digitalsolution.nexgenservers.com/wp-json/wp/v2";

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: { sizes?: Record<string, { source_url: string }> };
    }>;
    author?: Array<{ name: string }>;
  };
}

export function featuredImage(p: WPPost): string | undefined {
  const m = p._embedded?.["wp:featuredmedia"]?.[0];
  return (
    m?.media_details?.sizes?.large?.source_url ||
    m?.media_details?.sizes?.medium_large?.source_url ||
    m?.source_url
  );
}

export function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .trim();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function fetchPosts(page = 1, perPage = 12) {
  const res = await fetch(
    `${WP_BASE}/posts?_embed=wp:featuredmedia,author&per_page=${perPage}&page=${page}`,
  );
  if (!res.ok) throw new Error(`WP fetch failed: ${res.status}`);
  const total = Number(res.headers.get("x-wp-totalpages") || "1");
  const posts = (await res.json()) as WPPost[];
  return { posts, totalPages: total };
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(
    `${WP_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia,author`,
  );
  if (!res.ok) throw new Error(`WP fetch failed: ${res.status}`);
  const arr = (await res.json()) as WPPost[];
  return arr[0] ?? null;
}
