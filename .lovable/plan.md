## Diagnosis

The source code already emits the correct canonical:

- `src/lib/seo.ts` → `SITE.url = "https://digitalsolution.com"`
- `buildSeo({ path: "/" })` → `<link rel="canonical" href="https://digitalsolution.com/">`
- `src/routes/__root.tsx` has no canonical (correct — avoids duplicates).
- No reference to `easy-spark-connect.lovable.app` exists anywhere in source (only in `docs/REBUILD_GUIDE.md`, which is documentation).

GSC is reporting `User-declared canonical: https://easy-spark-connect.lovable.app/` because the **currently published deployment is stale** — it was built before `SITE.url` was switched to `digitalsolution.com`. The live HTML on the published URL still carries the old canonical.

## Plan

1. **No code changes.** Current source is correct.
2. **Republish the project** so the live deployment renders `<link rel="canonical" href="https://digitalsolution.com/">`.
3. After republish, verify by opening view-source on:
   - `https://digitalsolution.com/` — should show canonical → `https://digitalsolution.com/`
   - `https://easy-spark-connect.lovable.app/` — same canonical (then the visitor-side redirect kicks in).
4. In GSC, request re-indexing of `https://digitalsolution.com/` via URL Inspection → "Request indexing". Google will pick up the corrected canonical on the next crawl.
5. Mark the GSC finding resolved.

## Technical notes

- Canonical is hardcoded at build time from `SITE.url`. The only way the lovable.app canonical persists in the wild is a stale build — republishing replaces it.
- GSC can take days to recrawl. "Request indexing" speeds it up but doesn't guarantee immediate update.
