# Page speed audit — findings and fix plan

I profiled the live preview for the home page, About, and AI Solutions. The location and Contact pages don't import any bundled images, so they load fast. The slow pages are all blocked by huge, unoptimized image assets in `src/assets/`.

## What's slow, by page

### `/` (Home) — FCP ~2.8s, full load ~5.0s
Biggest culprit:
- `will-action.jpg` — **1,355 KB**, 1,454 ms

Other home images (`svc-*.jpg`, testimonial, jahleel/micah-hero) are fine.

### `/about` — FCP ~3.3s, four oversize images downloaded together
- `hero-team.jpg` — **2,824 KB**, 1,566 ms
- `tamika-hero.jpg` — **1,603 KB**, 2,780 ms
- `micah-hero.jpg` — **1,442 KB**, 1,814 ms
- `will-action.jpg` — **1,355 KB**, 1,397 ms

Total: ~7.2 MB of images for one page.

### `/ai-solutions` — FCP ~2.4s, two giant assets
- `ai-solutions-hero.jpg` — **2,515 KB**, 2,454 ms (LCP image)
- `ai-cta-robot.png` — **2,347 KB**, 1,760 ms (PNG used where JPG/WebP would be a fraction of the size)

### `/contact`, `/locations/*`
No bundled hero images. These pages are fast and not a concern.

## Root cause

Every image in `src/assets/` is shipped at its original camera/export resolution. Eighteen files are over 500 KB; six are over 1 MB. None are served as WebP or AVIF, none have responsive `srcset`, and the hero/team images are not given explicit width/height or `loading`/`fetchpriority` hints.

## Fix plan

1. **Re-encode the heavy images** in `src/assets/` to WebP at sensible dimensions (max 1600px wide for heroes, 800px for team/portrait, 1200px for CTA). Targets: heroes < 250 KB, portraits < 120 KB, CTA art < 200 KB. Keep filenames stable by writing `.webp` siblings and updating imports.
2. **Convert `ai-cta-robot.png` to WebP/JPG** — it's a 2.3 MB PNG of a photographic-style image; PNG is the wrong format here.
3. **Add `vite-imagetools`** so we can request `?format=webp&w=1600` variants at build time from a single source file, instead of hand-maintaining duplicates going forward.
4. **Mark the LCP image on each page** with `fetchpriority="high"` and add a `<link rel="preload" as="image">` in that route's `head()` (home: `will-action`; about: `hero-team`; ai-solutions: `ai-solutions-hero`).
5. **Lazy-load below-the-fold images** (`loading="lazy"`, `decoding="async"`) — the four About team portraits, testimonial, service card art.
6. **Add explicit `width`/`height`** on every `<img>` to prevent layout shift once images are smaller and load faster.

## Expected impact

- About page payload drops from ~7.2 MB → under 600 KB of images.
- AI Solutions LCP image drops from 2.5 MB → ~200 KB; FCP should land under 1.5 s.
- Home LCP image (`will-action`) drops from 1.35 MB → ~180 KB.

## Out of scope (won't touch unless you ask)

- Render-blocking CSS / Vite dev scripts — these numbers are inflated by the dev server. Production build is materially faster and not worth optimizing the dev server for.
- Font loading — Geist via Google Fonts is already using `display=swap` and is fast.
