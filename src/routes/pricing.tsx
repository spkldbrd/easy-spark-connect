import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero, CinematicCTA } from "@/components/site/PageHero";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Transparent IT Plans | Digital Solution" },
      { name: "description", content: "Flat per-user pricing for managed IT in San Luis Obispo. Three plans: Essentials, Professional, Enterprise." },
      { property: "og:title", content: "Pricing | Digital Solution" },
      { property: "og:description", content: "Predictable per-user pricing for managed IT, cybersecurity and cloud." },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Essentials",
    price: "$89",
    desc: "Core monitoring & helpdesk for small teams.",
    features: ["Remote helpdesk (8×5)", "Patch management", "Antivirus & MFA", "Quarterly business review", "Email support"],
  },
  {
    name: "Professional",
    price: "$149",
    desc: "Most popular plan for growing businesses.",
    features: ["Everything in Essentials", "24/7 monitoring & support", "Managed EDR + SOC", "Cloud backup", "vCIO strategy", "Phone & chat support"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Tailored stack for regulated and complex orgs.",
    features: ["Everything in Professional", "Compliance (HIPAA, PCI, CMMC)", "Dedicated engineer", "On-site visits", "Custom SLA", "Executive reporting"],
  },
];

const faqs = [
  { q: "Are there any setup fees?", a: "Onboarding is a one-time flat fee based on your environment size. We'll quote it transparently up front — no surprises." },
  { q: "What's the contract length?", a: "Most clients prefer a 12-month agreement, but we offer month-to-month for teams that want to try us first." },
  { q: "What's included in the per-user price?", a: "Unlimited remote support, all listed services, and our security stack on every covered device. Hardware and licenses are billed at cost." },
  { q: "How fast do you respond?", a: "Critical issues: under 15 minutes. Standard tickets: under 1 hour during business hours. We publish our SLA performance every quarter." },
];

function PricingPage() {
  return (
    <SiteShell overDark>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Transparent.
            <br />
            <span className="bg-gradient-to-r from-white via-cyan to-[oklch(0.7_0.18_220)] bg-clip-text text-transparent">
              Predictable. Yours.
            </span>
          </>
        }
        subtitle="Flat per-user pricing means you'll never get a surprise invoice. Pick the plan that fits today — scale tomorrow."
        meta={["Per user · per month", "No surprise invoices", "12-month or M2M", "Cancel any time"]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-[2rem] border p-10 ${
                  t.featured
                    ? "border-transparent bg-black text-white shadow-glow lg:-translate-y-4"
                    : "border-border bg-card"
                }`}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-10 rounded-full bg-cyan px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                    Most popular
                  </div>
                )}
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  <span className={t.featured ? "text-cyan" : "text-brand"}>Plan</span>
                </div>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em]">
                  {t.name}
                </h3>
                <p className={`mt-3 text-sm ${t.featured ? "text-white/65" : "text-muted-foreground"}`}>
                  {t.desc}
                </p>
                <div className="mt-8 flex items-baseline gap-1">
                  <span className="font-display text-6xl font-semibold tracking-[-0.04em]">
                    {t.price}
                  </span>
                  {t.price !== "Custom" && (
                    <span className={t.featured ? "text-white/50" : "text-muted-foreground"}>
                      /user/mo
                    </span>
                  )}
                </div>
                <ul className="mt-8 space-y-3 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-cyan" : "text-brand"}`} />
                      <span className={t.featured ? "text-white/85" : "text-foreground/85"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                    t.featured
                      ? "bg-white text-ink hover:bg-cyan"
                      : "bg-foreground text-background hover:bg-brand"
                  }`}
                >
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">FAQ</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Common questions.
            </h2>
          </div>
          <div className="mt-14 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-medium tracking-[-0.02em]">
                  {f.q}
                  <span className="text-2xl text-muted-foreground transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-2xl text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CinematicCTA
        title="Not sure which plan?"
        subtitle="Thirty minutes with our team and we'll point you to the right tier — no pressure, no pitch deck."
        ctaLabel="Book a call"
      />
    </SiteShell>
  );
}
