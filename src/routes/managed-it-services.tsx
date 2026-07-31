import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Check } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { CinematicCTA } from "@/components/site/PageHero";
import { buildSeo } from "@/lib/seo";

const TITLE = "Managed IT Services for SLO County Businesses";
const DESCRIPTION =
  "Flat-rate managed IT services for San Luis Obispo County — helpdesk, cybersecurity, cloud, and backups from a local team of engineers. Same-hour on-site since 2015.";

const pillars = [
  {
    label: "Helpdesk & user support",
    desc: "Unlimited remote support with a real engineer on the phone, plus on-site visits when a screen-share won't cut it. No ticket queue purgatory.",
  },
  {
    label: "Cybersecurity & compliance",
    desc: "Managed EDR, email security, MFA, patching, and security awareness training — with the documentation your insurer, HIPAA auditor, or client questionnaire asks for.",
  },
  {
    label: "Cloud & Microsoft 365",
    desc: "Microsoft 365 and Google Workspace administration, migrations, licensing cleanup, SharePoint structure, and identity management.",
  },
  {
    label: "Network & server management",
    desc: "Firewalls, switching, business WiFi, VPN, on-prem and virtual servers — monitored 24/7 and patched on a schedule you approve.",
  },
  {
    label: "Backup & disaster recovery",
    desc: "Tested, versioned backups of servers, workstations, and cloud data — with a written recovery plan, not a hope and a USB drive.",
  },
  {
    label: "vCIO & IT strategy",
    desc: "Twice-yearly roadmap reviews, budgeting, and hardware lifecycle planning so your technology spend stops being a surprise.",
  },
];

const included = [
  "24/7 monitoring and alerting",
  "Managed security patching",
  "Managed antivirus / EDR",
  "Unlimited remote helpdesk",
  "On-site response, same hour in North County",
  "Vendor management (ISP, phones, line-of-business apps)",
  "Monthly reporting and asset inventory",
  "Flat per-user, per-device pricing",
];

const cities = [
  {
    to: "/locations/atascadero" as const,
    name: "Atascadero",
    blurb: "Headquartered here. On-site in 10 minutes.",
  },
  {
    to: "/locations/paso-robles" as const,
    name: "Paso Robles",
    blurb: "Wineries, hospitality, and professional offices.",
  },
  {
    to: "/locations/san-luis-obispo" as const,
    name: "San Luis Obispo",
    blurb: "Downtown, the medical corridor, and Cal Poly.",
  },
];

const faqs = [
  {
    q: "How much do managed IT services cost?",
    a: "Most SLO County businesses land between $125 and $225 per user per month depending on server count, cloud footprint, and security requirements. Managed Basic starts at a $250/month minimum. You can model your own environment with our pricing calculator or ask us for a quote after a short network audit.",
  },
  {
    q: "What is included in managed IT services?",
    a: "Our agreements include 24/7 monitoring, managed security patching, managed EDR, unlimited remote helpdesk, on-site support, backup and disaster recovery, Microsoft 365 or Google Workspace administration, vendor management, and twice-yearly IT strategy reviews.",
  },
  {
    q: "Do you offer IT support for small businesses?",
    a: "Yes. We support offices from 2 people to 150. Very small teams (1–4 users) use our Managed Micro plan; teams of 5 or more move to Basic, Pro, or Complete.",
  },
  {
    q: "How fast do you respond?",
    a: "Remote support usually starts within minutes. For Atascadero and Paso Robles, an engineer is typically on site within the hour; San Luis Obispo is same-day, with weekly scheduled visits.",
  },
  {
    q: "Do we have to replace our current IT provider all at once?",
    a: "No. We run a documented transition: audit, documentation handoff, agent deployment, then cutover. Most transitions finish inside two weeks with no downtime.",
  },
];

export const Route = createFileRoute("/managed-it-services")({
  head: () =>
    buildSeo({
      title: TITLE,
      description: DESCRIPTION,
      path: "/managed-it-services",
      image: "https://digitalsolution.com/og-image.jpg",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Managed IT Services",
          name: "Managed IT Services — Digital Solution",
          description: DESCRIPTION,
          url: "https://digitalsolution.com/managed-it-services",
          provider: {
            "@type": "LocalBusiness",
            "@id": "https://digitalsolution.com/#business",
            name: "Digital Solution",
            url: "https://digitalsolution.com",
            telephone: "+1-805-466-4722",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Atascadero",
              addressRegion: "CA",
              addressCountry: "US",
            },
          },
          areaServed: [
            { "@type": "City", name: "Atascadero" },
            { "@type": "City", name: "Paso Robles" },
            { "@type": "City", name: "San Luis Obispo" },
            { "@type": "AdministrativeArea", name: "San Luis Obispo County" },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Managed IT Service Plans",
            itemListElement: pillars.map((p) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: p.label, description: p.desc },
            })),
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    }),
  component: ManagedItServicesPage,
});

function ManagedItServicesPage() {
  return (
    <SiteShell overDark>
      {/* Hero */}
      <section className="relative -mt-[72px] overflow-hidden bg-[#0a0a0c] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(43,179,192,0.18), transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(255,170,90,0.12), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:pt-40">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
            San Luis Obispo County · Since 2015
          </span>
          <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.94] tracking-[-0.05em]">
            Managed IT services
            <br />
            <span className="text-white/55">for businesses that</span>{" "}
            <span className="italic text-cyan">can't afford downtime.</span>
          </h1>
          <p className="mt-10 max-w-3xl text-lg text-white/75 sm:text-xl">
            One flat monthly rate covers your helpdesk, cybersecurity, cloud,
            backups, and IT strategy. Real engineers on the Central Coast — not
            a call center, not a rotating cast of technicians.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-cyan"
            >
              Get a quote
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+18054664722"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              805-466-4722
            </a>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            What managed IT covers
          </span>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Your entire IT department, on a flat rate.
          </h2>
          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <div key={p.label} className="border-t border-border pt-6">
                <div className="font-display text-3xl font-semibold tracking-tight text-brand">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em]">
                  {p.label}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included checklist */}
      <section className="border-y border-border bg-surface py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Included in every agreement.
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-foreground">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cities */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Where we work.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            We serve businesses throughout San Luis Obispo County, with the
            fastest on-site response in North County.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {cities.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:border-brand"
              >
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
                  Managed IT services in {c.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  View {c.name}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Common questions.
          </h2>
          <dl className="mt-12 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <div key={f.q} className="py-7">
                <dt className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {f.q}
                </dt>
                <dd className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CinematicCTA
        title="Let's talk about your IT."
        subtitle="A short call, a quick audit of what you're running, and a straight answer on what it costs."
        ctaLabel="Get in touch"
      />
    </SiteShell>
  );
}
