import { createFileRoute } from "@tanstack/react-router";
import { CityPage, type CityPageData } from "@/components/site/CityPage";
import { buildSeo } from "@/lib/seo";

const city: CityPageData = {
  name: "San Luis Obispo",
  region: "Central Coast · SLO",
  proximity: "30 minutes south · on-site weekly",
  tagline: "Downtown to Cal Poly.",
  intro: (
    <>
      <p>
        SLO is a town built on professional services, healthcare, education,
        and tourism — and every one of those industries lives or dies by its
        IT. We've spent years supporting downtown SLO businesses, Higuera
        Street retail, the offices clustered around Cal Poly, and businesses
        around the airport.
      </p>
      <p>
        Our team makes the trip down 101 weekly for routine site visits, and
        same-day for anything urgent. You get a North County team's attention
        with a Central Coast presence.
      </p>
    </>
  ),
  highlights: [
    {
      label: "Downtown specialists",
      desc: "Old buildings, tricky electrical, mixed-use neighbors — we know how to make modern business networks work in historic SLO storefronts.",
    },
    {
      label: "Healthcare & professional",
      desc: "HIPAA-grade networks for medical practices, secure document handling for law firms, and audit-ready systems for accountants.",
    },
    {
      label: "Education-aware",
      desc: "We work with businesses tied to the Cal Poly ecosystem — tenants, contractors, vendors, and spinouts — and understand the rhythm of the academic calendar.",
    },
  ],
  industries: [
    {
      title: "Medical & dental",
      desc: "Practices throughout the medical corridor near French Hospital and Sierra Vista — HIPAA, EHR, secure backups, and compliance support.",
    },
    {
      title: "Law & accounting",
      desc: "Downtown firms with sensitive client data, regulated workflows, and zero tolerance for downtime during tax season or trial prep.",
    },
    {
      title: "Hospitality & tourism",
      desc: "Hotels, B&Bs, downtown restaurants, and tour operators that need bulletproof guest WiFi, reliable POS, and PCI compliance.",
    },
    {
      title: "Tech & creative",
      desc: "Studios, agencies, and small tech firms that need real engineering support without hiring a full-time IT team.",
    },
  ],
  pullQuote:
    "“SLO businesses don't need an out-of-state MSP with a slick portal. They need someone who'll actually walk in the door — and who knows that parking on Higuera is a problem.”",
  neighborhoods: [
    "downtown Higuera",
    "Foothill Boulevard",
    "the airport business park",
    "the Marigold Center",
  ],
};

export const Route = createFileRoute("/locations/san-luis-obispo")({
  head: () =>
    buildSeo({
      title: "IT Support in San Luis Obispo, CA",
      description:
        "Managed IT, cybersecurity, and on-site support for San Luis Obispo businesses. Trusted by SLO law firms, medical practices, and hospitality since 2015.",
      path: "/locations/san-luis-obispo",
      image: "https://digitalsolution.com/og-image.jpg",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://digitalsolution.com/#business",
        name: "Digital Solution",
        url: "https://digitalsolution.com",
        areaServed: {
          "@type": "City",
          name: "San Luis Obispo",
          sameAs: "https://en.wikipedia.org/wiki/San_Luis_Obispo,_California",
        },
      },
    }),
  component: () => <CityPage city={city} />,
});
