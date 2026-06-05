import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Star, Info } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () =>
    buildSeo({
      title: "Pricing",
      description:
        "Transparent managed IT pricing for Central Coast offices — Managed Micro for teams of 1–4 and per-device plans for teams of 5 or more.",
      path: "/pricing",
      noindex: true,
    }),
  component: PricingPage,
});

type View = "none" | "micro" | "main";

const microPlans = [
  {
    tier: "Managed Micro",
    name: "With Microsoft 365",
    tagline: "Everything you need, including your Microsoft 365 licensing and backup.",
    price: "$99",
    per: "/user/mo",
    sub: "All-inclusive · billed monthly",
    features: [
      "Proactive device monitoring & alerts",
      "Antivirus & endpoint protection",
      "Managed security patching",
      "Workstation backup & recovery",
      "Microsoft 365 Email + Apps",
      "Email & cloud data backup",
      "Spam & phishing protection",
      "Website hosting (1 site)",
      "Secure remote access",
      "Help desk support (billed hourly)",
    ],
  },
  {
    tier: "Managed Micro",
    name: "Without Microsoft 365",
    tagline: "Full protection and backup — you manage your own Microsoft 365 licensing.",
    price: "$50",
    per: "/user/mo",
    sub: "All-inclusive · billed monthly",
    features: [
      "Proactive device monitoring & alerts",
      "Antivirus & endpoint protection",
      "Managed security patching",
      "Workstation backup & recovery",
      "Spam & phishing protection",
      "Website hosting (1 site)",
      "Secure remote access",
      "Help desk support (billed hourly)",
    ],
  },
];

const mainPlans = [
  {
    tier: "Managed Basic",
    name: "Essential Protection",
    tagline: "We keep your computers running, patched, and protected.",
    price: "$18",
    per: "/workstation/mo",
    sub: "Business-hours help desk · billed hourly",
    featured: false,
    everything: null as string | null,
    features: [
      { text: "Proactive device monitoring & alerts", highlight: false },
      { text: "Antivirus & endpoint protection", highlight: false },
      { text: "Managed security patching", highlight: false },
      { text: "Remote support tools & ticketing", highlight: false },
      { text: "Business-hours help desk support", highlight: false },
    ],
    icon: "check" as const,
  },
  {
    tier: "Managed Pro",
    name: "Security First",
    tagline:
      "We actively protect your business from the threats hitting small businesses right now.",
    price: "$45",
    per: "/workstation/mo",
    sub: "$150/server · $20/network device · 2-hr response",
    featured: true,
    everything: "Everything in Basic, plus:",
    features: [
      {
        text: "Protection against ransomware, account takeover & business email compromise",
        highlight: true,
      },
      { text: "24/7 security monitoring & threat response", highlight: false },
      { text: "Email spoofing protection", highlight: false },
      { text: "Server monitoring & maintenance", highlight: false },
      { text: "Network & firewall monitoring", highlight: false },
      { text: "Backup management & oversight", highlight: false },
      { text: "Annual technology planning meeting", highlight: false },
    ],
    icon: "check" as const,
  },
  {
    tier: "Managed Complete",
    name: "Fully Managed IT",
    tagline: "We become your IT department — fully staffed, always on, built for growth.",
    price: "$125",
    per: "/workstation/mo",
    sub: "$250/server · $30/user · unlimited support included",
    featured: false,
    everything: "Everything in Pro, plus:",
    features: [
      { text: "Unlimited onsite & remote support", highlight: true },
      { text: "Microsoft 365 licensing & backup included", highlight: false },
      { text: "Advanced email security & anti-phishing", highlight: false },
      { text: "Application control & zero trust security", highlight: false },
      { text: "Security awareness training for your team", highlight: false },
      { text: "Backup & disaster recovery (hardware included)", highlight: false },
      { text: "Quarterly technology & strategy reviews", highlight: false },
    ],
    icon: "star" as const,
  },
];

const techStack = [
  {
    title: "Managed Basic",
    items: [
      "Proactive Monitoring & Alerts",
      "Managed Defender Next-Gen AV",
      "Secure Remote Access",
    ],
  },
  {
    title: "Managed Pro (adds)",
    items: ["Huntress MDR + ITDR + SOC", "EasyDMARC", "Managed Backup & Recovery"],
  },
  {
    title: "Managed Complete (adds)",
    items: [
      "ThreatLocker Zero Trust",
      "Avanan Email Security",
      "Huntress SAT Training",
      "Microsoft 365 + Cloud Backup",
    ],
  },
];

function PricingPage() {
  const [view, setView] = useState<View>("none");

  return (
    <SiteShell overDark>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Simple, honest pricing
            <br />
            <span className="bg-gradient-to-r from-white via-cyan to-[oklch(0.7_0.18_220)] bg-clip-text text-transparent">
              built for your size.
            </span>
          </>
        }
        subtitle="Tell us how big your office is and we'll show you the right plan. Month-to-month, no long contracts, no surprises."
        meta={["Month-to-month", "No contracts", "Local team", "Since 2015"]}
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          {/* Gateway selector */}
          <div className="text-center">
            <p className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              How many people work in your office?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll show you the right pricing for your size.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setView("micro")}
                className={`min-w-[180px] rounded-xl border-2 px-8 py-4 text-sm font-medium shadow-sm transition ${
                  view === "micro"
                    ? "border-brand bg-brand text-white shadow-md"
                    : "border-border bg-background text-foreground hover:border-brand hover:shadow-md"
                }`}
              >
                1–4 People
                <span className="mt-1 block text-[11px] font-normal opacity-80">
                  Managed Micro pricing
                </span>
              </button>
              <button
                onClick={() => setView("main")}
                className={`min-w-[180px] rounded-xl border-2 px-8 py-4 text-sm font-medium shadow-sm transition ${
                  view === "main"
                    ? "border-brand bg-brand text-white shadow-md"
                    : "border-border bg-background text-foreground hover:border-brand hover:shadow-md"
                }`}
              >
                5 or More
                <span className="mt-1 block text-[11px] font-normal opacity-80">
                  Managed Basic / Pro / Complete
                </span>
              </button>
            </div>
          </div>


          {/* Micro view */}
          {view === "micro" && (
            <div className="mt-14">
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-border bg-surface px-5 py-4">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Managed Micro</strong> is our all-inclusive
                  package for small offices. Everything bundled into one simple monthly rate per
                  person — no per-device math, no surprises. As your team grows past 4 people,
                  you'll naturally move to our per-device plans with even more security.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {microPlans.map((p) => (
                  <PlanCard key={p.name} plan={p} />
                ))}
              </div>

              <div className="mt-6 border-t border-border pt-4 text-center">
                <button
                  onClick={() => setView("main")}
                  className="text-sm text-brand hover:underline"
                >
                  Growing past 4 people? See our per-device plans →
                </button>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Month-to-month · One-time onboarding fee = first month · Off-hours support $250/hr
              </p>
            </div>
          )}

          {/* Main view */}
          {view === "main" && (
            <div className="mt-14">
              <div className="grid gap-4 lg:grid-cols-3">
                {mainPlans.map((p) => (
                  <MainPlanCard key={p.name} plan={p} />
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-surface px-5 py-3 text-center">
                <p className="text-sm text-foreground/80">
                  <Info className="mr-1 inline h-4 w-4 -translate-y-px text-brand" />
                  Most businesses with Microsoft 365 and cyber insurance requirements choose
                  Managed Pro.
                </p>
              </div>

              <div className="mt-5 rounded-2xl bg-surface p-6">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Technologies powering your protection
                </p>
                <div className="grid gap-5 md:grid-cols-3">
                  {techStack.map((t) => (
                    <div key={t.title}>
                      <p className="mb-2 text-xs font-semibold text-foreground">{t.title}</p>
                      <ul className="space-y-1">
                        {t.items.map((i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <span className="h-1 w-1 rounded-full bg-border" />
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-4 text-center">
                <button
                  onClick={() => setView("micro")}
                  className="text-sm text-brand hover:underline"
                >
                  Office with fewer than 5 people? See our Managed Micro pricing →
                </button>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                All plans month-to-month · Onboarding fee = first month · Off-hours $250/hr
              </p>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

function PlanCard({ plan }: { plan: (typeof microPlans)[number] }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-background p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
        {plan.tier}
      </p>
      <p className="mt-1 font-display text-xl font-semibold tracking-[-0.02em]">{plan.name}</p>
      <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">{plan.tagline}</p>

      <div className="my-5 border-b border-border pb-5">
        <p className="font-display text-3xl font-semibold tracking-[-0.02em]">
          {plan.price}
          <span className="ml-1 text-sm font-normal text-muted-foreground">{plan.per}</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{plan.sub}</p>
      </div>

      <ul className="flex-1 space-y-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.65_0.15_160)]" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <Button asChild variant="outline" className="w-full">
          <Link to="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}

function MainPlanCard({ plan }: { plan: (typeof mainPlans)[number] }) {
  const Icon = plan.icon === "star" ? Star : Check;
  return (
    <div
      className={`flex flex-col rounded-2xl bg-background p-6 ${
        plan.featured ? "border-2 border-brand" : "border border-border"
      }`}
    >
      {plan.featured && (
        <span className="mb-2 inline-block w-fit rounded-md bg-brand/10 px-2.5 py-1 text-[11px] font-medium text-brand">
          Most popular
        </span>
      )}
      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
        {plan.tier}
      </p>
      <p className="mt-1 font-display text-xl font-semibold tracking-[-0.02em]">{plan.name}</p>
      <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">{plan.tagline}</p>

      <div className="my-5 border-b border-border pb-5">
        <p className="font-display text-3xl font-semibold tracking-[-0.02em]">
          {plan.price}
          <span className="ml-1 text-sm font-normal text-muted-foreground">{plan.per}</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{plan.sub}</p>
      </div>

      {plan.everything && (
        <p className="mb-2 text-[11px] text-muted-foreground">{plan.everything}</p>
      )}

      <ul className="flex-1 space-y-2">
        {plan.features.map((f) => (
          <li key={f.text} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Icon
              className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                plan.icon === "star" ? "text-brand" : "text-[oklch(0.65_0.15_160)]"
              }`}
            />
            <span className={f.highlight ? "font-medium text-foreground" : ""}>{f.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <Button
          asChild
          variant={plan.featured ? "default" : "outline"}
          className="w-full"
        >
          <Link to="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}
