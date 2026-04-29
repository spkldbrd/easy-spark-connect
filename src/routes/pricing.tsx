import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
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
  { name: "Essentials", price: "$89", desc: "Core monitoring & helpdesk for small teams.", features: ["Remote helpdesk (8×5)", "Patch management", "Antivirus & MFA", "Quarterly business review", "Email support"] },
  { name: "Professional", price: "$149", desc: "Most popular plan for growing businesses.", features: ["Everything in Essentials", "24/7 monitoring & support", "Managed EDR + SOC", "Cloud backup", "vCIO strategy", "Phone & chat support"], featured: true },
  { name: "Enterprise", price: "Custom", desc: "Tailored stack for regulated and complex orgs.", features: ["Everything in Professional", "Compliance (HIPAA, PCI, CMMC)", "Dedicated engineer", "On-site visits", "Custom SLA", "Executive reporting"] },
];

const faqs = [
  { q: "Are there any setup fees?", a: "Onboarding is a one-time flat fee based on your environment size. We'll quote it transparently up front — no surprises." },
  { q: "What's the contract length?", a: "Most clients prefer a 12-month agreement, but we offer month-to-month for teams that want to try us first." },
  { q: "What's included in the per-user price?", a: "Unlimited remote support, all listed services, and our security stack on every covered device. Hardware and licenses are billed at cost." },
  { q: "How fast do you respond?", a: "Critical issues: under 15 minutes. Standard tickets: under 1 hour during business hours. We publish our SLA performance every quarter." },
];

function PricingPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Pricing"
        title={<>Transparent. Predictable. Yours.</>}
        subtitle="Flat per-user pricing means you'll never get a surprise invoice. Pick the plan that fits today — scale tomorrow."
      />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.name} className={`relative flex flex-col rounded-3xl border p-8 ${t.featured ? "border-brand bg-gradient-hero text-white shadow-glow lg:-translate-y-4" : "border-border bg-card"}`}>
              {t.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan px-4 py-1 text-xs font-bold uppercase tracking-wider text-ink">Most popular</div>}
              <h3 className="font-display text-2xl font-bold">{t.name}</h3>
              <p className={`mt-2 text-sm ${t.featured ? "text-white/70" : "text-muted-foreground"}`}>{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">{t.price}</span>
                {t.price !== "Custom" && <span className={t.featured ? "text-white/60" : "text-muted-foreground"}>/user/mo</span>}
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => <li key={f} className="flex items-start gap-2"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-cyan" : "text-brand"}`} /><span>{f}</span></li>)}
              </ul>
              <Link to="/contact" className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${t.featured ? "bg-white text-ink hover:bg-cyan" : "bg-foreground text-background hover:bg-brand"}`}>Get started <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-center font-display text-4xl font-bold">Common questions</h2>
          <div className="mt-12 space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-6">
                <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
                <p className="mt-3 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
