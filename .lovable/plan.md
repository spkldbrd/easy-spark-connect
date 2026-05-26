Three small copy updates. The /about title is already "About — Local SLO IT Since 2015", so no change needed there.

## 1. Homepage meta / OG / Twitter description
File: `src/routes/index.tsx` (line ~80) — append a sentence.

- From: `…real outcomes — since 2015.`
- To: `…real outcomes — since 2015. Three decades of Central Coast IT experience.`

Also check `src/lib/seo.ts` (line ~132) default description and update to match if it's used as a fallback for the homepage.

## 2. Will Steffenauer bio
File: `src/routes/about.tsx` (line 54).

- From: `"Will started Digital Solution out of a one-room office in downtown SLO in 2015. A decade later, he still picks up the phone himself. You'll find him most mornings at a corner table at a downtown coffee shop, laptop open, talking through a roadmap with a client."`
- To: `"Will has been doing IT on the Central Coast since 1995. He founded Digital Solution in 2015 to bring that experience to local businesses. A decade later, he still picks up the phone himself."`

## 3. /about title
Already correct — no change.

Note: the user's table referenced "since 1997" as the current state, but the homepage already says "since 2015" from the earlier edit. Treating their target column as the source of truth.