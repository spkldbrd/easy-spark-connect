## Context

Two issues:

1. **OG image** — The homepage's `head()` currently passes `image: willAction` to `buildSeo()`, which overrides the default and emits `og:image = .../will-action-*.webp`. The new asset you uploaded at `public/og-image.jpg` is never used.
2. **Logo tag** — `og:logo` isn't part of the official Open Graph spec, but Schema.org's `Organization` block has a standard `logo` field that Google and several SEO checkers read. We currently don't emit one.

## Plan

1. **`src/routes/index.tsx`** — Remove the `image: willAction` line from the homepage `buildSeo({...})` call so it falls back to the site default `/og-image.jpg` (the new image you provided). Leave the `willAction` import alone since the page still renders the photo in the hero.

2. **`src/lib/seo.ts`** — In `organizationJsonLd()`, add a `logo` field pointing to an absolute URL of the wordmark. To keep this consistent and Worker-safe, copy `src/assets/logo-wordmark.png` to `public/logo.png` and reference it as `absoluteUrl("/logo.png")`. This makes it discoverable by Google's Organization knowledge panel and any tool that looks for a logo on the page.

   Optionally also emit a non-standard `<meta property="og:logo">` in the root `head()` for the SEO checkers that look for it explicitly. (Harmless, ignored by Facebook/LinkedIn.) Let me know if you want this too — otherwise I'll only do the standards-compliant JSON-LD `logo`.

## Result

- Share previews on the homepage will use `https://digitalsolution.com/og-image.jpg` (your new image).
- Search engines and SEO checkers will pick up the company logo via the Organization JSON-LD on every page.