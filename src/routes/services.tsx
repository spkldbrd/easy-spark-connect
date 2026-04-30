import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero, CinematicCTA } from "@/components/site/PageHero";
import { ArrowRight } from "lucide-react";
import svcManaged from "@/assets/svc-managed.jpg";
import svcSecurity from "@/assets/svc-security.jpg";
import svcCloud from "@/assets/svc-cloud.jpg";
import svcBackup from "@/assets/svc-backup.jpg";
import svcVoip from "@/assets/svc-voip.jpg";
import svcAi from "@/assets/svc-ai.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "IT Services — Managed IT, Cybersecurity & Cloud | Digital Solution" },
      { name: "description", content: "Full-stack MSP services for SLO businesses: managed IT, cybersecurity, cloud, backup, VoIP and AI solutions." },
      { property: "og:title", content: "IT Services | Digital Solution" },
      { property: "og:description", content: "Managed IT, cybersecurity, cloud, backup, VoIP and AI for businesses on the Central Coast." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    n: "01",
    eyebrow: "Always-on operations",
    title: "Managed IT Services",
    desc: "We become your IT department — proactively monitoring devices, patching systems, and resolving tickets so your team stays productive.",
    points: ["24/7 helpdesk + on-call", "Endpoint management (Intune)", "Vendor management", "Quarterly business reviews"],
    image: svcManaged,
  },
  {
    n: "02",
    eyebrow: "Defense in depth",
    title: "Cybersecurity",
    desc: "A layered defense built for today's threat landscape — from phishing simulation to a fully-staffed SOC.",
    points: ["Managed EDR + 24/7 SOC", "Email security & DMARC", "Security awareness training", "Penetration testing"],
    image: svcSecurity,
  },
  {
    n: "03",
    eyebrow: "Recovery first",
    title: "Backup & Disaster Recovery",
    desc: "Immutable, off-site backups and tested recovery runbooks. Ransomware can't touch what it can't reach.",
    points: ["3-2-1-1 backup strategy", "Image-based + cloud", "RPO/RTO under 1 hour", "Annual DR testing"],
    image: svcBackup,
  },
  {
    n: "04",
    eyebrow: "Microsoft 365 · Azure · AWS",
    title: "Cloud & Microsoft 365",
    desc: "We design, migrate, secure and optimize your cloud — Microsoft 365, Azure, AWS, Google Workspace.",
    points: ["Tenant hardening", "SharePoint / Teams rollout", "Azure cost optimization", "Identity & SSO"],
    image: svcCloud,
  },
  {
    n: "05",
    eyebrow: "Voice + connectivity",
    title: "VoIP & Internet",
    desc: "Crystal-clear cloud phones plus business-grade fiber and failover internet circuits.",
    points: ["Cloud PBX", "SMS & video", "Fiber + LTE failover", "SD-WAN"],
    image: svcVoip,
  },
  {
    n: "06",
    eyebrow: "Practical, governed AI",
    title: "AI Solutions",
    desc: "Practical AI integrations — from Copilot rollouts to custom workflow automations that save real hours.",
    points: ["Microsoft Copilot adoption", "Custom GPT assistants", "Process automation", "Data governance"],
    image: svcAi,
  },
];

function ServicesPage() {
  return (
    <SiteShell overDark>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything your
            <br />
            <span className="bg-gradient-to-r from-white via-cyan to-[oklch(0.7_0.18_220)] bg-clip-text text-transparent">
              business needs from IT.
            </span>
          </>
        }
        subtitle="One local partner for support, security, cloud, voice and AI — so you can focus on growing the business."
        meta={["Six core practices", "One accountable team", "15-minute SLA", "SLO County, CA"]}
      />

      {/* Editorial alternating rows */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="space-y-28">
            {services.map((s, i) => (
              <article
                key={s.title}
                className="grid items-center gap-12 lg:grid-cols-2"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="overflow-hidden rounded-[2rem] border border-border bg-black">
                    <img
                      src={s.image}
                      alt=""
                      width={1280}
                      height={896}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    <span className="text-brand">{s.n}</span>
                    <span className="h-px w-8 bg-border" />
                    <span>{s.eyebrow}</span>
                  </div>
                  <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-lg text-muted-foreground">{s.desc}</p>
                  <ul className="mt-8 space-y-3 text-sm text-foreground/80">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3">
                        <span className="h-1 w-6 bg-brand" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand"
                  >
                    Discuss this service
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CinematicCTA
        title="Let's scope it together."
        subtitle="Tell us what's slowing your team down. We'll come back with a plan, a price, and a path."
        ctaLabel="Get a custom proposal"
      />
    </SiteShell>
  );
}
