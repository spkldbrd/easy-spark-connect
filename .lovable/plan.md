## Plan: noindex syndicated posts (techtips category only)

### Changes

**1. `src/lib/seo.ts`** — extend `buildSeo` to support `noindex: "follow"` so we can emit `noindex,follow` (currently `noindex` emits `noindex,nofollow`).

Add a new variant: accept `noindex?: boolean | "follow"`. When `"follow"`, push `{ name: "robots", content: "noindex, follow" }`. Keep existing `true` behavior unchanged.

**2. `src/lib/wp.ts`** — pull category data alongside posts.

- Add `categories: number[]` and extend `_embedded` with `"wp:term"?: Array<Array<{ id: number; slug: string; taxonomy: string }>>` on `WPPost`.
- Update `fetchPostBySlug` (and `fetchPosts` for consistency) to request `_embed=wp:featuredmedia,author,wp:term` so embedded terms include categories.
- Add helper `hasCategorySlug(post, slug): boolean` that scans `_embedded["wp:term"]` flat arrays for a matching `taxonomy: "category"` with the given slug.

**3. `src/routes/blog.$slug.tsx`** — apply noindex conditionally.

In `head()`, after loading the post, compute `isSyndicated = hasCategorySlug(post, "techtips")` and pass `noindex: isSyndicated ? "follow" : false` to `buildSeo`. Canonical stays as-is (self-canonical to `/blog/<slug>`).

### Untouched
- `/blog` index — stays indexable (no change).
- Non-techtips posts — stay indexable with self-canonical (no change).
- `__root.tsx`, `robots.txt`, sitemap — no change.

### Verification
After republish, view-source on a techtips post should show `<meta name="robots" content="noindex, follow">`; a non-techtips post should have no robots meta.
