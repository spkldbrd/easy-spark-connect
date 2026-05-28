import { createFileRoute } from "@tanstack/react-router";
import { CityPage, type CityPageData } from "@/components/site/CityPage";
import { buildSeo } from "@/lib/seo";

const city: CityPageData = {
  name: "Paso Robles",
  region: "North County · SLO",
  proximity: "12 minutes north · same-day response",
  tagline: "Your business, our backyard.",
  intro: (
    <>
      <p>
        Paso isn't a market we cover from a call center. It's where we eat
        lunch. We've spent years supporting wineries, tasting rooms, and
        professional offices throughout Paso Robles, and we know how much a
        network outage costs at 4pm on a Saturday.
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
    '“The drive between Atascadero and Paso feels like just a quick run down the street to our friends house. We know the back roads, the tourism schedules, and which restaurants have the worst WiFi.”',
  neighborhoods: [
    "Downtown City Park",
    "Tin City, Highway 46 West wine country",
    "the eastside vineyards",
  ],
};

export const Route = createFileRoute("/locations/paso-robles")({
  head: () =>
    buildSeo({
      title: "IT Support in Paso Robles, CA",
      description:
        "IT support for Paso Robles wineries, restaurants, and professional offices. Same-day on-site from a North County team serving the area since 2015.",
      image: "https://digitalsolution.com/og-image.jpg",
      path: "/locations/paso-robles",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Digital Solution",
        url: "https://digitalsolution.com/locations/paso-robles",
        telephone: "805-466-4722",
        email: "hello@digitalsolution.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "7700 Santa Ynez Ave",
          addressLocality: "Atascadero",
          addressRegion: "CA",
          postalCode: "93422",
          addressCountry: "US",
        },
        areaServed: {
          "@type": "City",
          name: "Paso Robles",
          sameAs: "https://en.wikipedia.org/wiki/Paso_Robles,_California",
        },
        openingHours: "Mo-Fr 08:00-17:00",
        description:
          "Local IT and cybersecurity for Paso Robles wineries, restaurants, and professional offices. Same-day on-site response from a North County team.",
      },
    }),
  component: () => <CityPage city={city} />,
});
