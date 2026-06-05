# Pricing Page Plan

## Route
- New file: `src/routes/pricing.tsx` at URL `/pricing`
- Single page with dynamic view switching (no separate routes). The selector toggles between "Micro" and "Main" views via React state — no URL change needed since the page isn't linked from nav and isn't indexed.
- Not added to header/footer navigation.

## SEO
- `head()` sets:
  - `title`: "Pricing — Digital Solution"
  - `meta description`: short summary
  - `<meta name="robots" content="noindex, nofollow">` so search engines won't index or follow.
- Exclude `/pricing` from `sitemap.xml.ts`.
- No JSON-LD.

## Page structure
Reuses site Header + Footer (same as other routes). Main content:

1. **Gateway selector** (top, always visible)
   - Heading: "How many people work in your office?"
   - Two buttons: "1–4 People" / "5 or More"
   - Active state styled with site primary color
2. **Micro view** (1–4): intro callout + 2-card grid (With M365 $99, Without M365 $50) + "growing past 4?" link that switches to main view
3. **Main view** (5+): 3-card grid (Basic $18, Pro $45 featured, Complete $125) + nudge callout + "Technologies powering your protection" 3-column block + "fewer than 5?" link back to micro
4. Default view on load: nothing selected (selector only), OR default to Micro — see question below.

All copy/prices/feature lists pulled verbatim from the uploaded HTML.

## Styling
- Rebuild using Tailwind + existing semantic design tokens from `src/styles.css` (no inline `<style>` block, no hardcoded hex colors like `#185FA5`). Map the uploaded design's blue accent to the site's existing primary token so it matches the rest of the site.
- Check icons: replace Tabler (`ti ti-*`) with `lucide-react` icons already used in the project (Check, Star, Info).
- Card/button components: use existing shadcn `Card`, `Button` where it fits cleanly; otherwise plain div with token classes.

## CTAs
The uploaded HTML has "Learn more ↗" buttons calling `sendPrompt(...)`. Since this page is for sharing (not chat-embedded), I'll change each card's CTA to a single "Contact us" button linking to `/contact`. Confirm below.

## Questions
1. **Default view on load**: show only the selector (user must click), or pre-select "5 or More" since it's the more common case?
2. **Card CTA**: change all "Learn more ↗" buttons to a single "Contact us" link to `/contact`? Or remove the buttons entirely?
3. **Off-hours/onboarding note text** at the bottom of each view — keep verbatim from the HTML?
