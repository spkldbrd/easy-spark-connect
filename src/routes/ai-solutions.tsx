import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero, CinematicCTA } from "@/components/site/PageHero";
import aiHero from "@/assets/ai-solutions-hero.webp";
import aiCtaRobot from "@/assets/ai-cta-robot.webp";
import { buildSeo, SITE } from "@/lib/seo";
import {
  Sparkles,
  Bot,
  Workflow,
  ShieldCheck,
  GraduationCap,
  LineChart,
  FileSearch,
  Plug,
} from "lucide-react";

export const Route = createFileRoute("/ai-solutions")({
  head: () =>
    buildSeo({
      title: "AI Solutions for Business — Practical, Governed AI",
      description:
        "Microsoft Copilot rollouts, custom AI assistants, and Claude automations — delivered by the engineers who already run your IT. Governed, in production within weeks.",
      path: "/ai-solutions",
      image: aiHero,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI Implementation and Consulting",
        provider: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
        areaServed: "San Luis Obispo County",
        url: `${SITE.url}/ai-solutions`,
        description:
          "Microsoft 365 Copilot rollouts, custom AI assistants, workflow automation, AI governance, document intelligence, AI-ready infrastructure, training, and AI strategy roadmaps.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI Solutions",
          itemListElement: [
            "Microsoft 365 Copilot rollouts",
            "Custom AI assistants",
            "Workflow & process automation",
            "AI governance & policy",
            "Document intelligence",
            "AI-ready infrastructure",
            "Training & change management",
            "AI strategy & roadmap",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
    }),
  component: AiSolutionsPage,
});

const offerings = [
  {
    icon: Sparkles,
    title: "Microsoft 365 Copilot rollouts",
    desc: "Licensing strategy, data hygiene, permissions cleanup, and hands-on enablement so Copilot lands well — not as shelfware.",
    bullets: ["Readiness assessment", "SharePoint & Teams cleanup", "Pilot → org-wide rollout"],
  },
  {
    icon: Bot,
    title: "Custom AI assistants",
    desc: "Internal GPTs trained on your SOPs, contracts, and product docs — secured behind your tenant, not the open web.",
    bullets: ["Private knowledge bases", "Role-based access", "Citations & guardrails"],
  },
  {
    icon: Workflow,
    title: "Workflow & process automation",
    desc: "Automate the repetitive work — quoting, intake, ticket triage, reporting — using Power Automate, n8n, and Azure AI.",
    bullets: ["Document intake", "Approval workflows", "System-to-system glue"],
  },
  {
    icon: ShieldCheck,
    title: "AI governance & policy",
    desc: "Acceptable-use policies, DLP rules, and audit trails so your team can move fast without leaking client data.",
    bullets: ["AI use policy", "DLP & sensitivity labels", "Usage monitoring"],
  },
  {
    icon: FileSearch,
    title: "Document intelligence",
    desc: "Extract structured data from invoices, contracts, and forms with Azure Document Intelligence and custom models.",
    bullets: ["Invoice & PO extraction", "Contract review assist", "ERP/CRM hand-off"],
  },
  {
    icon: Plug,
    title: "AI-ready infrastructure",
    desc: "Identity, network, and data foundations done right — because every AI project is a security project underneath.",
    bullets: ["Entra ID hardening", "Data classification", "API & integration layer"],
  },
  {
    icon: GraduationCap,
    title: "Training & change management",
    desc: "Workshops, prompt libraries, and office hours that turn skeptics into power users in a single quarter.",
    bullets: ["Executive briefings", "Department workshops", "Prompt playbooks"],
  },
  {
    icon: LineChart,
    title: "AI strategy & roadmap",
    desc: "A 90-day roadmap that ranks use cases by ROI, risk, and effort — built with your leadership team, not handed to them.",
    bullets: ["Use-case discovery", "ROI modeling", "Quarterly business reviews"],
  },
];

const principles = [
  {
    n: "01",
    title: "Practical over flashy",
    desc: "We ship the boring automations that save 10 hours a week before we touch the moonshot ideas.",
  },
  {
    n: "02",
    title: "Your data stays yours",
    desc: "Everything runs inside your Microsoft tenant or a private model. No training on your content. Ever.",
  },
  {
    n: "03",
    title: "MSP discipline",
    desc: "Every AI deployment ships with monitoring, backups, documentation, and a support line.",
  },
];

function AiSolutionsPage() {
  return (
    <SiteShell overDark>
      <PageHero
        eyebrow="AI Solutions"
        imageSrc={aiHero}
        title={
          <>
            AI your team will
            <br />
            <span className="bg-gradient-to-r from-white via-cyan to-[oklch(0.7_0.18_220)] bg-clip-text text-transparent">
              actually use.
            </span>
          </>
        }
        subtitle="Microsoft Copilot rollouts, custom ChatGPT assistants, and Claude workflow automations, delivered by the same engineers who already run your IT. Practical, governed, in production within weeks."
        ctaLabel="Book a discovery call"
        ctaTo="/contact"
        meta={["Local team", "10+ years in IT", "MSP-grade governance", "Ships in weeks"]}
      />

      {/* Offerings grid */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              What we deliver
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              The AI stack a modern business actually needs.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Eight services that take you from "we should probably look at AI" to measurable, governed productivity gains across the org.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {offerings.map((o) => {
              const Icon = o.icon;
              return (
                <div key={o.title} className="flex flex-col bg-background p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em]">
                    {o.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {o.desc}
                  </p>
                  <ul className="mt-5 space-y-1.5 text-sm text-foreground/70">
                    {o.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-brand" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              How we work
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              The MSP approach to AI.
            </h2>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="bg-background p-10 sm:p-12">
                <div className="font-display text-5xl font-semibold tracking-[-0.04em] text-brand">
                  {p.n}
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.03em]">
                  {p.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CinematicCTA
        title="Let's find your first AI win."
        subtitle="A 30-minute call. We'll surface two or three use cases worth piloting in the next 60 days."
        ctaLabel="Book a discovery call"
        imageSrc={aiCtaRobot}
      />
    </SiteShell>
  );
}
