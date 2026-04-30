import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero, CinematicCTA } from "@/components/site/PageHero";

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
  { n: "01", name: "Healthcare", note: "HIPAA-compliant IT for clinics, dental offices and specialty practices.", clients: "60+ practices", compliance: "HIPAA · HITECH" },
  { n: "02", name: "Legal", note: "Confidentiality-first IT for law firms — secure document handling and ediscovery support.", clients: "40+ firms", compliance: "ABA · ediscovery" },
  { n: "03", name: "Professional Services", note: "Hybrid-ready IT for accounting, real estate and consultancies.", clients: "120+ teams", compliance: "SOC 2 · IRS Pub 4557" },
  { n: "04", name: "Education", note: "K-12, charter and higher-ed — student device management and CIPA compliance.", clients: "15+ schools", compliance: "CIPA · FERPA" },
  { n: "05", name: "Retail & Hospitality", note: "PCI-compliant POS, Wi-Fi, and multi-location networking.", clients: "80+ locations", compliance: "PCI-DSS" },
  { n: "06", name: "Manufacturing & AgTech", note: "OT/IT segmentation, ERP support and CMMC-readiness for SLO's growing producers.", clients: "30+ operations", compliance: "CMMC · NIST 800-171" },
];

function IndustriesPage() {
  return (
    <SiteShell overDark>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            We speak your
            <br />
            <span className="bg-gradient-to-r from-white via-cyan to-[oklch(0.7_0.18_220)] bg-clip-text text-transparent">
              industry's language.
            </span>
          </>
        }
        subtitle="Compliance, workflows, vendors — we've done it before. You won't pay us to learn on the job."
        meta={["Healthcare", "Legal", "Education", "Manufacturing"]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-2">
            {items.map((i) => (
              <div
                key={i.name}
                className="group relative bg-background p-10 transition hover:bg-surface sm:p-12"
              >
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="text-brand">{i.n}</span>
                  <span className="h-px w-8 bg-border" />
                  <span>{i.compliance}</span>
                </div>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  {i.name}
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">{i.note}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground/70">
                  <span className="h-1 w-5 bg-brand" />
                  {i.clients} served
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CinematicCTA
        title="Built for your world."
        subtitle="Tell us about your operation and we'll show you what we've already solved for teams like yours."
        ctaLabel="Discuss your industry"
      />
    </SiteShell>
  );
}
