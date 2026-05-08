# Digital Solution — Site Rebuild Guide

A complete reference for another AI agent (or developer) to reproduce this
website from scratch. Every page, component, asset, design token, and data
shape is documented below.

---

## 1. Project Identity

- **Brand**: Digital Solution (Central Coast Digital Solution, LLC)
- **Voice**: editorial-magazine, opinionated, plain-spoken, anti-corporate.
  Founder-led MSP. "We answer the phone."
- **Service area**: San Luis Obispo County, CA (Paso Robles → Pismo Beach).
- **Phone (used everywhere)**: `805-466-4722` → `tel:+18054664722`
- **Email**: `hello@digitalsolution.com`
- **Founded**: 1997
- **Founder**: Will Steffenauer. Other named team: Micah Steffenauer (Lead
  Tech), Jahleel Roberts (Field Engineer).

---

## 2. Tech Stack

- **Framework**: TanStack Start v1 (React 19 + Vite 7), file-based routing
  in `src/routes/`. SSR-on-Cloudflare-Workers via `@cloudflare/vite-plugin`
  + `wrangler.jsonc` (`nodejs_compat`).
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`, configured in
  `src/styles.css` (no `tailwind.config.js`). Design tokens in `oklch`.
- **UI primitives**: shadcn/ui (Radix) under `src/components/ui/`. Most are
  scaffolding; the live site uses very few of them.
- **Icons**: `lucide-react`.
- **Fonts**: Geist + Geist Mono (Google Fonts) loaded in `__root.tsx`.
- **Router**: TanStack Router auto-generates `src/routeTree.gen.ts` — never
  edit it by hand.

---

## 3. File Map

```
src/
  router.tsx                   Router factory (getRouter), default error UI
  styles.css                   Tailwind v4 + design tokens (oklch)
  routes/
    __root.tsx                 HTML shell, global head defaults, 404
    index.tsx                  Homepage (hero slider + services tabs + ...)
    about.tsx                  /about
    ai-solutions.tsx           /ai-solutions
    contact.tsx                /contact (client-side form, fake submit)
    locations.atascadero.tsx        /locations/atascadero
    locations.paso-robles.tsx       /locations/paso-robles
    locations.san-luis-obispo.tsx   /locations/san-luis-obispo
  components/site/
    SiteShell.tsx              <Header/> + <main/> + <Footer/>
    Header.tsx                 Sticky nav, transparent over dark hero
    Footer.tsx                 4-col footer + city link row
    PageHero.tsx               PageHero + CinematicCTA (shared sub-page hero)
    CityPage.tsx               Reusable city page template
    HexMark.tsx                Decorative hex SVGs (HexMark/Outline/Pattern)
    NetworkBreath.tsx          Canvas animated cyan node network
  components/ui/               shadcn primitives (mostly unused)
  lib/
    seo.ts                     buildSeo() + JSON-LD helpers + SITE config
    utils.ts                   cn() = twMerge(clsx(...))
  assets/                      Images (see §8)
public/
  *.mp4                        Hero/service loop videos (see §8)
  ai-automation-poster.jpg     Poster for ai-automation.mp4
  robots.txt, sitemap.xml      SEO
```

---

## 4. Design System (`src/styles.css`)

### Tokens (light mode root)
```
--brand:  oklch(0.45 0.21 255)   /* deep navy-blue */
--cyan:   oklch(0.78 0.15 215)   /* electric cyan accent */
--ink:    oklch(0.18 0.04 260)   /* near-black text */
--background: white
--surface / --surface-2          /* off-white tiers */
--radius: 0.875rem
```
Standard shadcn tokens (`--primary`, `--secondary`, `--muted`, ...) are also
defined and mapped to brand colors. Dark mode tokens exist but the site does
not toggle dark mode.

### Gradients & shadows
- `--gradient-hero`: navy → blue → bright blue diagonal
- `--gradient-brand`: brand → cyan
- `--shadow-glow`, `--shadow-soft`

### Fonts
- `--font-display`: "Geist" (used for all h1–h4). Letter-spacing `-0.04em`.
- `--font-sans`: "Geist". Body uses `font-feature-settings: "ss01","cv11"`.

### Reusable utilities
`.bg-gradient-hero`, `.bg-gradient-brand`, `.bg-gradient-soft`,
`.text-gradient-brand`, `.shadow-glow`, `.shadow-soft`.

### Color usage rule
Components use semantic Tailwind classes (`bg-background`, `text-brand`,
`text-cyan`, `bg-surface`, `text-muted-foreground`). Dark hero sections use
hard-coded `bg-black` / `bg-[#0a0a0c]` + `text-white` with `white/XX` opacity
helpers — this is intentional (cinematic sections always stay dark).

---

## 5. Routing & Layout

### Root (`src/routes/__root.tsx`)
- Renders `<html lang="en"><head><HeadContent/></head><body>{children}<Scripts/></body></html>`.
- `head()` only sets site-wide defaults: charset, viewport, author,
  theme-color (#0a0a0a), Google Fonts preconnect + stylesheet, app CSS link.
- `notFoundComponent` = simple centered 404 with link to `/`.
- **Per-page metadata is set in each route's `head()` via `buildSeo()`.**

### Router (`src/router.tsx`)
- `getRouter()` calls `createRouter({ routeTree, scrollRestoration: true,
  defaultPreloadStaleTime: 0, defaultErrorComponent: DefaultErrorComponent })`.
- `DefaultErrorComponent`: centered card with destructive icon, error
  message in dev only, Try Again (`router.invalidate(); reset()`) + Go home.

### SiteShell wraps every page
```
<SiteShell overDark={true|false}>...</SiteShell>
```
- `overDark` = the page starts with a dark hero, so the header renders
  transparent + white text until scroll > 8px, then becomes solid.
- All content pages pass `overDark`.

### Navigation rule
Major sections are real routes (good for SSR + SEO). The only intra-page
hash anchor is the homepage `#services` jump used by header "IT Services"
and footer service links.

---

## 6. Header (`components/site/Header.tsx`)

Sticky, full-width, max-w-7xl inner.

- Left: logo wordmark (`logo-wordmark.png`). When `transparent`, applies
  inline `filter: invert(1) brightness(2)` to flip the black wordmark white.
- Center nav (lg+): `IT Services` (anchor `/#services`), then `nav` array:
  `{ to: "/ai-solutions", label: "AI Solutions" }`,
  `{ to: "/about",        label: "Our Story" }`.
- Right (lg+): phone `805-466-4722` (tel link) + pill button "Talk to us"
  → `/contact`.
- Mobile: hamburger toggles a full-width white menu with same links.
- Scroll listener flips header from transparent (white text) to solid
  (`bg-background/80 backdrop-blur-xl border-b`) at `scrollY > 8`.

---

## 7. Footer (`components/site/Footer.tsx`)

Black background with four scattered, low-opacity inverted hex logo
decorations absolutely positioned.

Four columns:
1. Logo (inverted) + tagline "Trusted IT partner ... since 1997."
2. **Services** (all link to `/#services` anchors — Managed IT, Cybersecurity,
   Cloud & M365, Backup & DR, Business VoIP, AI Solutions).
3. **Company** — About (`/about`), Contact (`/contact`).
4. **Get in touch** — SLO CA, phone, email, "24/7 Emergency Support".

Below: "Proudly serving SLO County" + interleaved city list. Three cities
are real links (Atascadero, Paso Robles, San Luis Obispo); the rest
(Templeton, Santa Margarita, Morro Bay, Cayucos, Avila Beach, Pismo Beach,
Grover Beach, Arroyo Grande) are dim plain text. Bottom: copyright +
"Atascadero · California".

---

## 8. Assets Inventory

### `src/assets/` (imported via `@/assets/...`)
- `logo-wordmark.png`, `logo-icon.png`, `logo-original.png` — branding.
- Hero / portrait photography:
  - `will-action.jpg`, `will-hero.jpg`, `will-hero-light.jpg`,
    `will-portrait.jpg`, `will-reference.png` (founder)
  - `micah-hero.jpg`, `micah-reference.png`
  - `jahleel-hero.jpg`, `jahleel-portrait.png`, `jahleel-reference.png`
- `hero-orb.jpg` — fallback dark hero background (used by PageHero).
- `hero-team.jpg` — used on About page editorial story block.
- `network-bg.jpg` — incidental.
- Service cards (homepage tabs): `svc-managed.jpg`, `svc-security.jpg`,
  `svc-cloud.jpg`, `svc-backup.jpg`, `svc-voip.jpg`, `svc-ai.jpg`.
- Testimonials: `testimonial-1/2/3.jpg`, `testimonial-chris-raders.jpg`
  (the only one currently displayed, on the homepage quote section).

### `public/` (referenced as absolute paths e.g. `/voip-loop.mp4`)
- `cybersecurity-loop.mp4` — plays under Cybersecurity tab.
- `managed-network-loop.mp4` — plays under Managed IT tab.
- `voip-loop.mp4` — plays under Business VoIP tab.
- `ai-automation.mp4` + `ai-automation-poster.jpg` — plays under AI tab.
- `managed-network.mp4` — uncropped variant (kept for reference).
- `robots.txt`, `sitemap.xml`.

---

## 9. Homepage (`src/routes/index.tsx`)

The longest file. Sections in order:

### 9.1 Hero — magazine slider
Dark `bg-[#0a0a0c]`, golden radial wash on the right side. 12-col grid:
- **Left col (7/12)**:
  - Masthead row: `Issue №NN` · hairline · `Location label`.
  - Big editorial h1 with one italic cyan accent word (`shows up.`,
    `see`, `actually`) — uses `clamp(2.75rem, 7.5vw, 7rem)`.
  - Body paragraph (white/70).
  - CTA row: white pill "Start a conversation" → `/contact`, plus
    "Or just call · 805-466-4722" tel link.
  - Bottom bar (border-t white/10): magazine pull-quote (italic) +
    attribution; below it, prev/next round buttons + `01 — 03` indicator.
- **Right col (5/12)**: tall 3:4 portrait card with rounded-3xl border +
  bottom caption strip (eyebrow, name, photo meta).

`heroSlides` array — 3 entries — each:
```ts
{ issue, location, headline (ReactNode), body, primaryCta:{label,to},
  secondaryCta:{label,href}, pullQuote, pullAttribution, image, imageAlt,
  captionEyebrow, captionName, captionMetaTop, captionMetaBottom }
```

**Important SSR rule**: First paint always renders slide 0 (founder Will).
After hydration, a `useEffect` picks a random slide so SEO/social previews
stay deterministic but real visitors see variety.

### 9.2 Services — tabbed selector (`#services`)
- Centered eyebrow + headline ("One team. / Every layer of your IT.").
- Pill tab bar inside `bg-surface` rounded container, 6 tabs from
  `serviceTabs` (managed, security, cloud, backup, voip, ai).
- Active tab shows a 2-col card (`rounded-[2rem] bg-black`):
  - Left: video for `security` / `managed` / `voip` / `ai` (autoplay,
    loop, muted, playsInline; AI uses dedicated poster). Other tabs
    (`cloud`, `backup`) show a static `<img>` from `serviceTabs[i].image`.
  - Right: eyebrow (cyan), big white title, body, bullet list (cyan dash
    bullets), "Talk to us about this" → `/contact`.

`serviceTabs` shape: `{ key, label, image, eyebrow, title, body,
bullets: string[] }`. Edit this array to add/edit services.

### 9.3 Principles — "How we do the work."
Four numbered tenets (`I` `II` `III` `IV`) on `bg-surface`. 2-col grid,
heavy whitespace. Source: `principles` array.

### 9.4 Quote — Chris Raders testimonial
Avatar (round) + magazine-style blockquote with cyan curly quotes, name +
agency byline.

### 9.5 Final CTA — "Coffee's on us. / Bring your IT headaches."
Black section, no background image. White pill "Talk to us" → `/contact`.

---

## 10. About Page (`/about`)

Uses `<PageHero>` (eyebrow "About us", gradient-text title, meta row:
`Est. 1997 · 30 engineers · Paso to Pismo · On-site within an hour`).

Sections:
1. Editorial story — large team photo (`hero-team.jpg`) + 2-paragraph copy.
2. **Values** — 3 numbered cards on `bg-surface` (Humans first, Strategic
   not reactive, Real expertise). Source: `values` array.
3. **Milestones** — timeline of `{year, text}` pairs (1997, 2008, 2016, 2024).
4. **Team** — 4-card grid: 3 portraits (Will, Micah, Jahleel) + 1 dashed
   "Now hiring" placeholder. Each card: portrait (4/5), role eyebrow, name,
   bio, quote. Source: `team` array.
5. `<CinematicCTA title="Come meet the team." ...>`.

---

## 11. AI Solutions Page (`/ai-solutions`)

Uses `<PageHero>` (eyebrow "AI Solutions", "AI your team will / actually
use.", meta `Local team · 27 years in IT · MSP-grade governance · Ships in
weeks`).

Sections:
1. **Offerings** — 4-col grid of 8 services. Each `{ icon (lucide), title,
   desc, bullets[] }`. Lucide icons used: Sparkles, Bot, Workflow,
   ShieldCheck, FileSearch, Plug, GraduationCap, LineChart.
2. **Principles** — 3 numbered cards (Practical over flashy, Your data
   stays yours, MSP discipline).
3. `<CinematicCTA title="Let's find your first AI win." ...>`.

---

## 12. Contact Page (`/contact`)

Uses `<PageHero>` ("Talk to / a human."). 2-col layout:
- **Left (5/12)**: "Reach us directly" — divider list of phone/email/office/
  hours from `directs` array (each with lucide icon).
- **Right (7/12)**: rounded card with form (Name, Company, Email, Phone,
  Message). On submit (`e.preventDefault(); setSent(true);`) it swaps to a
  "Message sent." success state with a Send-icon disc. **No backend** — the
  form is purely client-side state today.

`<Field>` is a local helper for label + input pairs.

---

## 13. Location Pages

Three city pages, each ~80 lines, all rendered via the
`<CityPage city={...} />` template.

`CityPageData` shape:
```ts
{
  name, region, proximity, tagline,
  intro: ReactNode (2 paragraphs),
  industries: { title, desc }[]   // 4 entries each
  highlights: { label, desc }[]   // 3 entries each
  pullQuote?: string,
  neighborhoods: string[],
}
```

`<CityPage>` renders, in order:
1. Editorial hero (no photo) — `bg-[#0a0a0c]`, two radial gradients (cyan
   top-right, warm bottom-left). Headline: "IT support / in *City*. /
   *tagline*".
2. **Highlights** — 3 numbered blocks ("What we do in *City*").
3. **Industries** — `<dl>` two-column on `bg-surface` with optional
   pull-quote.
4. **Neighborhoods** — single line stitching the array with " to ".
5. `<CinematicCTA title="Need IT in *City*?" ...>`.

Each route also adds `localBusinessJsonLd({...})` via `buildSeo`.

Cities currently shipped:
- `/locations/atascadero` — North County, headquartered there.
- `/locations/paso-robles` — North County / wine country.
- `/locations/san-luis-obispo` — Central Coast / SLO.

To add a new city, copy a `locations.<slug>.tsx` file, fill in the
`CityPageData` constant, and add the link to the footer's city row.

---

## 14. Shared Sub-Page Components

### `<PageHero>` (in `PageHero.tsx`)
Used by About, AI Solutions, Contact. Props:
`{ eyebrow, title (ReactNode), subtitle?, meta?: string[], videoSrc? }`.

Renders a black hero with `hero-orb.jpg` (or `videoSrc` if provided) at
opacity 70, two dark gradient overlays, the eyebrow (cyan uppercase),
clamp-sized h1 (`clamp(2.5rem,6.5vw,6rem)`), subtitle, and a hairline meta
row at the bottom.

### `<CinematicCTA>`
Used at the bottom of About, AI Solutions, City pages. Props:
`{ title, subtitle?, ctaLabel?, ctaTo? }` (defaults: "Talk to us",
"/contact"). Renders the same dark `hero-orb.jpg` background, centered
title + subtitle + white pill button with arrow.

---

## 15. SEO System (`src/lib/seo.ts`)

Centralized helper. Edit `SITE` for global branding:
```ts
SITE = {
  name: "Digital Solution",
  url: "https://easy-spark-connect.lovable.app",  // change on custom domain
  defaultImage: "",
  twitterHandle: "",
  locale: "en_US",
  titleSuffix: "Digital Solution",
}
```

`buildSeo({ title, description, path, image?, type?, titleAbsolute?,
noindex?, jsonLd? })` returns `{ meta, links, scripts? }` ready to spread
into a TanStack route's `head()`.

It generates: `<title>`, `description`, full Open Graph block (`og:type`,
`og:site_name`, `og:locale`, `og:title`, `og:description`, `og:url`,
`og:image`), Twitter card block, canonical link, and any JSON-LD scripts.

Helpers also exported:
- `organizationJsonLd()` — used on the homepage.
- `localBusinessJsonLd({ city, region?, path, description })` — used on
  every city page.

`public/robots.txt` and `public/sitemap.xml` reference `SITE.url`.

---

## 16. Decorative Components (currently NOT mounted on any page)

These exist for future use:
- `HexMark` / `HexOutline` / `HexPattern` (`HexMark.tsx`) — interlocking
  hex SVGs that inherit `currentColor`. The footer reuses the raster
  `logo-icon.png` instead.
- `NetworkBreath` (`NetworkBreath.tsx`) — canvas animation of ~46 cyan
  nodes drifting and connecting with thin lines under a distance threshold.
  Uses `requestAnimationFrame` + `ResizeObserver`.

If you want a hex/honeycomb section background or animated network behind a
hero, drop these in.

---

## 17. Conventions & Gotchas

- **Imports use `@/...` alias** → `src/...`. Configured via
  `vite-tsconfig-paths`.
- **Never edit `src/routeTree.gen.ts`** — auto-generated.
- **Image imports are bundled** (`import x from "@/assets/x.jpg"`); video
  files live in `public/` and use absolute string paths (`/foo.mp4`) so
  they aren't bundled.
- **Phone & email are duplicated** in Header, Footer, Contact, hero
  slides, CityPage. There is no central contact constant — update all
  five spots if it changes.
- **Service tab "Talk to us about this" CTA** always points at `/contact`
  with no query param; the contact form is presentation-only (no email
  delivery yet).
- **Hero slider randomizes after hydration** to keep SSR deterministic.
- **Header transparency** depends on the page passing `overDark` AND the
  user being within 8px of the top.
- **The "hire me" 4th team card** on About is a placeholder — replace
  when the team grows.
- **The site has no auth, no database, no backend functions** today.
  Lovable Cloud is not enabled.
- **Cloudflare/SSR ready**: TanStack Start handles SSR automatically; do
  not introduce `child_process`, `sharp`, native modules, or filesystem
  watchers — they will break on Workers.

---

## 18. Rebuild Checklist

To recreate this site in a new project:

1. Scaffold a TanStack Start v1 project (Vite 7, React 19, Cloudflare
   plugin, Tailwind v4).
2. Install deps from §2 (only `lucide-react`, `@tanstack/*`, Radix
   pieces actually used, `clsx`, `tailwind-merge`, `class-variance-authority`).
3. Replace `src/styles.css` with the token block from §4.
4. Add the Geist Google Fonts link in `__root.tsx` and the simple shell
   from §5.
5. Drop in all assets from §8 (or regenerate placeholders).
6. Build `lib/seo.ts` (§15) and `lib/utils.ts` (`cn = twMerge(clsx)`).
7. Build the shared site shell pieces in this order: `Header`, `Footer`,
   `SiteShell`, `PageHero` + `CinematicCTA`, `CityPage`.
8. Build routes: `__root.tsx` → `index.tsx` → `about.tsx` →
   `ai-solutions.tsx` → `contact.tsx` → three `locations.*.tsx`.
9. Add `public/robots.txt`, `public/sitemap.xml`, all `*.mp4` loops.
10. Verify each route's `head()` calls `buildSeo()` with unique
    title/description.
11. Test SSR (`vite build` then preview) and Cloudflare deploy via
    `wrangler.jsonc`.

That's the entire site.
