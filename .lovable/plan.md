## Plan

### 1. Add the services selector to the homepage

In `src/routes/index.tsx`:

- Import `useState`, `svcManaged`, `svcSecurity`, `svcCloud`, `svcBackup`, `svcVoip`, `svcAi` from `@/assets/...`.
- Port the `tabs` data array from `src/routes/home-alt.tsx` (lines 28–83) and rename the labels per your spec:
  - Managed IT
  - Cybersecurity
  - Cloud & Microsoft 365
  - Backup & Disaster Recovery
  - Business VoIP
  - AI Solutions
- Add `const [active, setActive] = useState(0)` inside `HomePage`.
- Insert a new `<section id="services">` block immediately after the hero `</section>` and before the PRINCIPLES section, using the same Webex-style tabbed layout from `home-alt.tsx` (lines 159–236). Wrap with `scroll-mt-24` so the sticky header doesn't cover the heading on scroll.
- Keep the "Learn more" CTA on each panel pointing at `/contact` (since `/services` will no longer be a destination — see step 2).

### 2. Rewire the "Services" nav item

In `src/components/site/Header.tsx`:

- Remove `{ to: "/services", label: "Services" }` from the typed `nav` array.
- Render a separate hash anchor for Services in both desktop nav and mobile nav. Use a plain `<a href="/#services">` so it works from any route (clicking from `/about` navigates home and then scrolls). Style it identically to the other nav items.
- On the homepage itself, the browser's native hash scroll plus `scroll-mt-24` on the section will handle smooth positioning.

### 3. Clean up references to `/services`

- `src/routes/services.tsx`: leave the file in place for now (still reachable by direct URL, still useful for SEO) but no longer linked from the header. We can revisit deleting it once the new structure settles.
- `src/routes/index.tsx` "See all services" link in the Stack section: change `to="/services"` to a hash anchor `<a href="#services">` pointing to the new on-page selector.
- `src/routes/home-alt.tsx`: leave as-is (it's the alt design reference).

### Files touched

- `src/routes/index.tsx` — add tabs data, state, and new services section; update Stack section's "See all services" link
- `src/components/site/Header.tsx` — replace Services Link with hash anchor in desktop + mobile nav

### Notes

- Hash anchors normally violate the project's "separate routes" rule, but here Services intentionally becomes an *on-page section* of the home rather than its own destination — that's a deliberate IA choice, not a SPA-style shortcut.
- `/services` route stays live so existing inbound links and search results don't 404.
