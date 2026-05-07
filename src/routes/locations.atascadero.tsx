import { createFileRoute } from "@tanstack/react-router";
import { CityPage, type CityPageData } from "@/components/site/CityPage";
import { buildSeo, localBusinessJsonLd } from "@/lib/seo";

const city: CityPageData = {
  name: "Atascadero",
  region: "North County · SLO",
  proximity: "Headquartered here · 0 minutes away",
  tagline: "Our home town.",
  intro: (
    <>
      <p>
        Digital Solution is headquartered right here in Atascadero. When your
        network goes down, you're not waiting on someone driving up from L.A.
        or Bakersfield — you're waiting on a neighbor.
      </p>
      <p>
        We've been the IT team behind dozens of Atascadero businesses for over
        two decades. Family-owned, local-staffed, and the same crew who answer
        the phone are the ones who show up at your door.
      </p>
    </>
  ),
  highlights: [
    {
      label: "On-site, same hour",
      desc: "Most Atascadero offices are a 10-minute drive from our shop. When something breaks, we're there before your coffee gets cold.",
    },
    {
      label: "Proactive monitoring",
      desc: "We watch your servers, network, and backups around the clock — quietly fixing issues before they become your problem.",
    },
    {
      label: "Strategic IT planning",
      desc: "Twice-a-year roadmap reviews so your tech grows with your business. No surprise bills. No upsell calls.",
    },
  ],
  industries: [
    {
      title: "Professional services",
      desc: "Law firms, accounting practices, and real estate offices in downtown Atascadero who need their tech to just work — quietly, securely, every single day.",
    },
    {
      title: "Healthcare & dental",
      desc: "HIPAA-compliant networks, secure EHR hosting, and the kind of disaster recovery planning that lets you sleep at night.",
    },
    {
      title: "Manufacturing & trades",
      desc: "Factory floors, contractors, and trades businesses who need rugged, reliable tech that holds up to the work.",
    },
    {
      title: "Nonprofits & municipal",
      desc: "Tight budgets, big missions. We know how to stretch a dollar without cutting corners on security.",
    },
  ],
  pullQuote:
    "“We started this business in Atascadero in 1997 because we believed local businesses deserved better than a 1-800 number. Twenty-eight years later, that's still the whole pitch.”",
  neighborhoods: [
    "downtown Sunken Gardens",
    "the Colony",
    "El Camino Real",
    "Las Lomas",
  ],
};

export const Route = createFileRoute("/locations/atascadero")({
  head: () =>
    buildSeo({
      title: "IT Support in Atascadero, CA",
      description:
        "Atascadero's local IT partner since 1997. Managed IT, cybersecurity, cloud, and on-site support — same-hour response from a team that lives where you do.",
      path: "/locations/atascadero",
      jsonLd: localBusinessJsonLd({
        city: "Atascadero",
        region: "San Luis Obispo County",
        path: "/locations/atascadero",
        description:
          "Managed IT, cybersecurity, and cloud services for Atascadero businesses since 1997.",
      }),
    }),
  component: () => <CityPage city={city} />,
});
