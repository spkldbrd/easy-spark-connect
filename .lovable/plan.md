# Pricing page → lead-capture modal

Replace the `Link to="/contact"` on both pricing surfaces with a modal that collects contact info and emails it to you using the existing SMTP2GO server function.

## UX

**Micro view (1–4)** — `PlanCard` "Contact us" button opens the modal pre-tagged with the chosen Micro plan ("Managed Micro — With Microsoft 365" or "Without Microsoft 365").

**Calculator results** — "Schedule a discovery call →" opens the modal pre-tagged with:
- Recommended tier (Basic / Pro / Complete) — selected by default
- A tier selector so the user can change which plan they want to talk about
- Read-only summary: workstations, physical servers, cloud (M365 / Google / neither), users, monthly estimate for the selected tier, and Yes/No answers from steps 3–4

**Modal form fields** (all required except phone):
- Name
- Business name
- Email
- Phone (optional)
- Optional message (short textarea)

On submit: spinner → success state ("We'll be in touch within one business hour.") → close button. On error: inline message, same wording style as `/contact`.

## Implementation

- **New component** `src/components/site/PricingLeadModal.tsx` — uses shadcn `Dialog` (already in the project per `components.json`). Self-contained: form state, submit handler, success/error states. Props: `open`, `onOpenChange`, `context` (a discriminated union: `{ kind: "micro"; plan: string }` or `{ kind: "calc"; recommendedTier; selectedTier; setSelectedTier; calcState; totalSrv; prices }`).
- **New server function** `src/lib/pricing-lead.functions.ts` — mirrors `sendContactMessage`:
  - Zod schema: name, business, email, phone?, message?, recaptchaToken, plus a `lead` object with the calculator/micro context (all validated with length caps).
  - Verifies reCAPTCHA v3 (action `"pricing_lead"`, score ≥ 0.5) using existing `RECAPTCHA_SECRET_KEY`.
  - Sends via SMTP2GO using existing `SMTP2GO_API_KEY`, From `william@digitalsolution.com`, To `william@digitalsolution.com`, reply-to the lead's email. Subject: `New pricing lead from {name} ({business}) — {plan}`. Body includes formatted summary of all calculator inputs + chosen plan + monthly estimate, mirroring the on-screen breakdown.
- **pricing.tsx changes**:
  - Lift modal state into `PricingPage` (`leadOpen`, `leadContext`) so both Micro cards and Results can open it.
  - Pass an `onContact(plan)` callback to `PlanCard`; replace its `Link` with a `Button onClick`.
  - Pass an `onSchedule()` callback to `ResultsView`; replace the discovery-call `Link` with a `Button onClick`. Add `selectedTier` state inside `ResultsView` (init = `rec`) with a small tier toggle above the CTA so the user can pick which plan they want to discuss.
  - Load the reCAPTCHA v3 script once on the pricing page (same pattern as `contact.tsx`).

## Notes / assumptions

- Reuses existing `SMTP2GO_API_KEY` and `RECAPTCHA_SECRET_KEY` — no new secrets.
- "Sends it to me" = same inbox as the contact form (`william@digitalsolution.com`). Tell me if you want a different address.
- Keeps `/contact` as-is; this is an additional, contextual capture point.
