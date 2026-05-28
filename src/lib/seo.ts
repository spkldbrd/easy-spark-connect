/**
 * Centralized SEO helper.
 *
 * Edit SITE defaults below to change site-wide branding, then call
 * `buildSeo({...})` from any route's `head()`.
 *
 *   export const Route = createFileRoute("/about")({
 *     head: () => buildSeo({
 *       title: "About",
 *       description: "Local SLO IT since 2015.",
 *       path: "/about",
 *       image: heroAbout,
 *     }),
 *     component: AboutPage,
 *   });
 */

export const SITE = {
  name: "Digital Solution",
  // Canonical production URL.
  url: "https://digitalsolution.com",
  // Default share image when a route doesn't provide one. Served from /public.
  defaultImage: "/og-image.jpg",
  twitterHandle: "",
  locale: "en_US",
  // Appended after the route title: "About — Digital Solution"
  titleSuffix: "Digital Solution",
} as const;

type JsonLd = Record<string, unknown>;

export interface SeoInput {
  /** Page-specific title. Combined with SITE.titleSuffix unless `titleAbsolute` is true. */
  title: string;
  /** 50–160 chars recommended. */
  description: string;
  /** Path beginning with "/". Used to build canonical + og:url. */
  path: string;
  /** Absolute URL or asset path for og:image / twitter:image. Optional. */
  image?: string;
  /** og:type. Defaults to "website". Use "article" for blog posts. */
  type?: "website" | "article" | "profile";
  /** Skip the "— Digital Solution" suffix. */
  titleAbsolute?: boolean;
  /** Set true for "noindex, nofollow"; "follow" for "noindex, follow" (syndicated content). */
  noindex?: boolean | "follow";
  /** Optional JSON-LD structured data. Pass one or many objects. */
  jsonLd?: JsonLd | JsonLd[];
}

function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE.url;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = SITE.url.replace(/\/$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

export function buildSeo(input: SeoInput) {
  const {
    title,
    description,
    path,
    image,
    type = "website",
    titleAbsolute = false,
    noindex = false,
    jsonLd,
  } = input;

  const fullTitle = titleAbsolute ? title : `${title} — ${SITE.titleSuffix}`;
  const url = absoluteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : SITE.defaultImage || undefined;

  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    // Open Graph
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE.name },
    { property: "og:locale", content: SITE.locale },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    // Twitter
    { name: "twitter:card", content: imageUrl ? "summary_large_image" : "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];

  if (imageUrl) {
    meta.push({ property: "og:image", content: imageUrl });
    meta.push({ name: "twitter:image", content: imageUrl });
  }

  if (SITE.twitterHandle) {
    meta.push({ name: "twitter:site", content: SITE.twitterHandle });
  }

  if (noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  const links = [{ rel: "canonical", href: url }];

  const result: {
    meta: typeof meta;
    links: typeof links;
    scripts?: Array<{ type: string; children: string }>;
  } = { meta, links };

  if (jsonLd) {
    const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    result.scripts = blocks.map((block) => ({
      type: "application/ld+json",
      children: JSON.stringify(block),
    }));
  }

  return result;
}

// Reusable JSON-LD builders -------------------------------------------------

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/logo.png"),
    description:
      "Boutique managed IT, cybersecurity, and AI partner serving San Luis Obispo County since 2015.",
  };
}

export function localBusinessJsonLd(opts: {
  city: string;
  region?: string;
  path: string;
  description: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE.name} — ${opts.city}`,
    url: absoluteUrl(opts.path),
    description: opts.description,
    areaServed: {
      "@type": "City",
      name: opts.city,
      ...(opts.region ? { containedInPlace: opts.region } : {}),
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: opts.city,
      addressRegion: "CA",
      addressCountry: "US",
    },
  };
}
