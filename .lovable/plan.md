# Pricing Calculator (5+ view)

Replace the current static 3-card "Main" view on `/pricing` with the interactive calculator from the uploaded HTML, rebuilt in React + Tailwind using existing design tokens. The 1–4 (Micro) view and the gateway selector stay as-is.

## Flow
1. **Step 1 — Environment**: numeric +/- inputs for Workstations (min 1, default 10), Physical Servers (min 0, default 0), Users (min 1, default 10).
2. **Step 2 — Cloud**: multi-select cards — Microsoft 365, Google Workspace, Neither. Each cloud suite counts as one extra "cloud/server unit."
3. **Step 3 — Security priorities**: Yes/No on BEC, Email Spoofing, 24/7 Monitoring. Any "Yes" → at least Pro.
4. **Step 4 — Support style**: Yes/No on "no surprise hourly" and "fully managed IT dept." Any "Yes" → Complete.
5. **Results**: environment summary bar + three tier cards (Basic / Pro / Complete) with itemized line items and monthly totals; recommended tier highlighted with brand border + "Recommended" badge. Next-steps list + "Schedule a discovery call" (→ `/contact`) + "Start over."

## Pricing math (per month)
- Basic: `ws × $18 + (servers + cloud suites) × $150`
- Pro: `ws × $45 + (servers + cloud suites) × $150` + if any cloud suite: `users × $18 + users × $4` + if BEC or Spoof: `users × $5`
- Complete: `ws × $125 + (servers + cloud suites) × $250 + users × $30`
- Recommendation: any Step-4 yes → Complete; else any Step-3 yes → Pro; else Basic.

## Implementation
- All work in `src/routes/pricing.tsx`. No new routes, no backend.
- New `PricingCalculator` component (same file or `src/components/site/PricingCalculator.tsx`) holding all state and step logic.
- Progress bar (4 dots + connecting lines + labels Environment/Cloud/Security/Support), Back/Continue nav, results screen replaces steps.
- Use `lucide-react` icons (Monitor, Cloud, Users, Check, Phone, ClipboardCheck, Calendar, Receipt, Mail, Shield, ShieldCheck) — no Tabler.
- Use semantic tokens (`bg-surface`, `bg-background`, `border-border`, `text-brand`, `text-muted-foreground`, etc.). Recommended-tier highlight uses `border-brand` + a subtle brand-tinted background (e.g. `bg-brand/5`). No raw hex like `#185FA5`.
- Keep the existing intro/selector + Micro view untouched. Drop the current static `mainPlans` cards, the tech-stack block, and the "Most businesses choose Pro" callout from the Main view — the calculator replaces them. Keep the footer note ("All plans month-to-month · Onboarding fee = first month · Off-hours $250/hr") under the results.
- Discovery-call button is a `<Link to="/contact">` (no `sendPrompt`).

## Open question
The original calculator references **$150/hr help desk** in the Basic/Pro notes but the current pricing page has been saying **off-hours $250/hr** with no general hourly rate. I'll use the calculator's wording as-is ($150/hr standard, $250/hr off-hours). Tell me if you want different rates.
