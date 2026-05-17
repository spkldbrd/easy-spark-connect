import { createFileRoute } from "@tanstack/react-router";
import { CityPage, type CityPageData } from "@/components/site/CityPage";
import { buildSeo, localBusinessJsonLd } from "@/lib/seo";

const city: CityPageData = {
  name: "Paso Robles",
  region: "North County · SLO",
  proximity: "12 minutes north · same-day response",
  tagline: "Your business, our backyard.",
  intro: (
    <>
      <p>
        Paso isn't a market we cover from a call center. It's where we eat
        lunch. We've spent decades supporting wineries, tasting rooms, and
        professional offices throughout the Paso Robles AVA — and we know how
        much a network outage costs at 4pm on a Saturday.
      </p>
      <p>
        Our Atascadero shop is a twelve-minute drive up the 101. When you
        call, a real engineer is en route within the hour, not next Tuesday.
      </p>
    </>
  ),
  highlights: [
    {
      label: "Wine country savvy",
      desc: "POS systems, tasting room WiFi, club-member databases, hospitality networks — we know the systems Paso wineries actually run.",
    },
    {
      label: "Multi-location ready",
      desc: "Vineyard offices, tasting rooms, downtown showrooms — we keep them all on one network, one phone system, one playbook.",
    },
    {
      label: "Always on, always staffed",
      desc: "24/7 monitoring with real humans on call. When your card reader goes down during harvest season, you don't have time to wait.",
    },
  ],
  industries: [
    {
      title: "Wineries & hospitality",
      desc: "From boutique cellars to multi-property estates, we run the IT, POS, WiFi, and security behind some of Paso's busiest tasting rooms.",
    },
    {
      title: "Restaurants & retail",
      desc: "Downtown Paso restaurants, retail shops, and food producers who need reliable point-of-sale and rock-solid customer WiFi.",
    },
    {
      title: "Agriculture & ranching",
      desc: "Ranch offices, ag businesses, and equipment companies — practical IT for businesses that work outdoors as much as in.",
    },
    {
      title: "Professional services",
      desc: "Law, accounting, real estate, and medical practices throughout downtown Paso and the surrounding office parks.",
    },
  ],
  pullQuote:
    "“The drive between Atascadero and Paso feels like just a quick run down the street to our friends house. We know the back roads, the tourism schedules, and which restaurants have the worst WiFi.”",
  neighborhoods: [
    "downtown City Park",
    "Vine Street",
    "the Templeton Gap",
    "the eastside AVAs",
    "Highway 46 East",
  ],
};

export const Route = createFileRoute("/locations/paso-robles")({
  head: () =>
    buildSeo({
      title: "IT Support in Paso Robles, CA",
      description:
        "Local IT and cybersecurity for Paso Robles wineries, restaurants, and professional offices. Same-day on-site response from a North County team that's been here since 1997.",
      path: "/locations/paso-robles",
      jsonLd: localBusinessJsonLd({
        city: "Paso Robles",
        region: "San Luis Obispo County",
        path: "/locations/paso-robles",
        description:
          "Wine country IT — POS, WiFi, security, and 24/7 monitoring for Paso Robles businesses.",
      }),
    }),
  component: () => <CityPage city={city} />,
});
