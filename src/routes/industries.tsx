import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Stethoscope, Scale, Building2, GraduationCap, ShoppingBag, Factory, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve | Digital Solution SLO" },
      { name: "description", content: "Specialized IT and compliance expertise for healthcare, legal, professional services, education, retail and manufacturing on the Central Coast." },
      { property: "og:title", content: "Industries We Serve | Digital Solution" },
      { property: "og:description", content: "HIPAA, PCI, CMMC and more — IT built for your industry's compliance needs." },
    ],
  }),
  component: IndustriesPage,
});

const items = [
  { icon: Stethoscope, name: "Healthcare", note: "HIPAA-compliant IT for clinics, dental offices and specialty practices.", clients: "60+ practices" },
  { icon: Scale, name: "Legal", note: "Confidentiality-first IT for law firms — secure document handling and ediscovery support.", clients: "40+ firms" },
  { icon: Building2, name: "Professional Services", note: "Hybrid-ready IT for accounting, real estate and consultancies.", clients: "120+ teams" },
  { icon: GraduationCap, name: "Education", note: "K-12, charter and higher-ed — student device management and CIPA compliance.", clients: "15+ schools" },
  { icon: ShoppingBag, name: "Retail & Hospitality", note: "PCI-compliant POS, Wi-Fi, and multi-location networking.", clients: "80+ locations" },
  { icon: Factory, name: "Manufacturing & AgTech", note: "OT/IT segmentation, ERP support and CMMC-readiness for SLO's growing producers.", clients: "30+ operations" },
];

function IndustriesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Industries"
        title={<>We speak your industry's language.</>}
        subtitle="Compliance, workflows, vendors — we've done it before. You won't pay us to learn on the job."
      />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <div key={i.name} className="rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                <i.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold">{i.name}</h2>
              <p className="mt-2 text-muted-foreground">{i.note}</p>
              <div className="mt-5 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{i.clients} served</div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 font-semibold text-background hover:bg-brand">
            Discuss your industry needs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
