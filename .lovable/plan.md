## Context

The temporary Lovable site `easy-spark-connect.lovable.app` is showing in Google search results. We need to:

1. **Stop indexing** on any `*.lovable.app` hostname.
2. **Redirect visitors** from `*.lovable.app` to the matching path on the primary domain `https://digitalsolution.com`.
3. **Keep `digitalsolution.com` fully indexable** — no noindex, no redirect.
4. **Preserve canonical** pointing to `https://digitalsolution.com`.
5. **Never break Lovable editor/preview** — skip redirect/noindex when inside the editor (detected via `id-preview--` hostname or iframe context).

Note: the redirect is a **client-side visitor redirect only**, not a true 301. Lovable controls the edge/server response for `*.lovable.app`, so we can't issue an HTTP 301.

## Plan

**File: `src/routes/__root.tsx`**

1. Add a `useEffect` in `RootComponent` that runs only in the browser.
2. Guard to skip when:
   - hostname does NOT end with `.lovable.app`
   - hostname contains `id-preview--` (Lovable preview subdomain)
   - page is inside an iframe (`window.self !== window.top`)
   - cross-origin iframe access throws
3. When the guard passes (i.e. real visitor on a published `*.lovable.app` URL):
   - Inject `<meta name="robots" content="noindex">` into `<head>`.
   - Call `window.location.replace("https://digitalsolution.com" + pathname + search + hash)` to bounce the visitor.
4. Keep existing sitewide head defaults (charSet, viewport, theme-color, etc.) untouched.
5. Keep canonical logic in `src/lib/seo.ts` pointing to `https://digitalsolution.com` unchanged.

## Result

- `digitalsolution.com` → fully indexable, no redirect.
- `easy-spark-connect.lovable.app` → visitor redirected to matching path on primary domain, noindex injected.
- Lovable editor preview (`id-preview--*.lovable.app`) → unaffected, no redirect.
