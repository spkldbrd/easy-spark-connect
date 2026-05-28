## Plan: Homepage SEO Updates

### Scope
Only the `head()` config in `src/routes/index.tsx`. No visible content, layout, styling, or functionality changes.

### Changes
1. **Meta description** — Replace the current `description` passed to `buildSeo()` with:
   > "Boutique managed IT services, cybersecurity, and AI for businesses on California's Central Coast. Real engineers, real conversations, real outcomes since 2015."

2. **JSON-LD schema** — Replace the current `jsonLd: organizationJsonLd()` with the exact `ProfessionalService` schema provided, including all fields: `@id`, `name`, `legalName`, `url`, `logo`, `image`, `telephone`, `email`, `priceRange`, `foundingDate`, `description`, `founder`, `areaServed`, `sameAs`, and `openingHoursSpecification`.

### Why inline the schema
The `buildSeo()` helper accepts `jsonLd` directly. The user's schema is page-specific and richer than the reusable `organizationJsonLd()` helper, so it will be passed inline to `buildSeo()` without touching `src/lib/seo.ts`.

### Files touched
- `src/routes/index.tsx` (lines 76–83 only)