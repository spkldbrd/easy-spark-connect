import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Server, Shield, Cloud, Phone, HardDrive, Brain, ArrowRight, Check } from "lucide-react";

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
  { icon: Server, title: "Managed IT Services", desc: "We become your IT department — proactively monitoring devices, patching systems, and resolving tickets so your team stays productive.", points: ["24/7 helpdesk", "Endpoint management (Intune)", "Vendor management", "Quarterly business reviews"] },
  { icon: Shield, title: "Cybersecurity", desc: "A layered defense built for today's threat landscape — from phishing simulation to a fully-staffed SOC.", points: ["Managed EDR + 24/7 SOC", "Email security & DMARC", "Security awareness training", "Penetration testing"] },
  { icon: HardDrive, title: "Backup & Disaster Recovery", desc: "Immutable, off-site backups and tested recovery runbooks. Ransomware can't touch what it can't reach.", points: ["3-2-1-1 backup strategy", "Image-based + cloud", "RPO/RTO under 1 hour", "Annual DR testing"] },
  { icon: Cloud, title: "Cloud & Microsoft 365", desc: "We design, migrate, secure and optimize your cloud — Microsoft 365, Azure, AWS, Google Workspace.", points: ["Tenant hardening", "SharePoint / Teams rollout", "Azure cost optimization", "Identity & SSO"] },
  { icon: Phone, title: "VoIP & Internet", desc: "Crystal-clear cloud phones plus business-grade fiber and failover internet circuits.", points: ["Cloud PBX", "SMS & video", "Fiber + LTE failover", "SD-WAN"] },
  { icon: Brain, title: "AI Solutions", desc: "Practical AI integrations — from Copilot rollouts to custom workflow automations that save real hours.", points: ["Microsoft Copilot adoption", "Custom GPT assistants", "Process automation", "Data governance"] },
];

function ServicesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Services"
        title={<>Everything your business needs from IT.</>}
        subtitle="One local partner for support, security, cloud, voice and AI — so you can focus on growing the business."
      />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                <s.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
              <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2"><Check className="h-4 w-4 text-brand" /> {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 font-semibold text-background hover:bg-brand">
            Get a custom proposal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
