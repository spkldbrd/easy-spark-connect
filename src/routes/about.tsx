import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero, CinematicCTA } from "@/components/site/PageHero";
import heroTeam from "@/assets/hero-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Local SLO IT Since 1997 | Digital Solution" },
      { name: "description", content: "Central Coast Digital Solution, LLC has been the trusted IT partner for businesses across San Luis Obispo County for over 25 years." },
      { property: "og:title", content: "About | Digital Solution" },
      { property: "og:description", content: "A local team of engineers who actually pick up the phone." },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    n: "01",
    title: "Humans first",
    desc: "We answer the phone. We remember your name. We treat your business like ours.",
  },
  {
    n: "02",
    title: "Strategic, not reactive",
    desc: "We catch problems before they break things. Roadmaps, not just reboots.",
  },
  {
    n: "03",
    title: "Real expertise",
    desc: "Our engineers are credentialed and curious. No tier-1 scripts, no offshore queues.",
  },
];

const milestones = [
  { year: "1997", text: "Founded in San Luis Obispo." },
  { year: "2008", text: "Launched 24/7 monitoring & helpdesk." },
  { year: "2016", text: "Built our in-house security operations practice." },
  { year: "2024", text: "Crossed 450 Central Coast businesses served." },
];

function AboutPage() {
  return (
    <SiteShell overDark>
      <PageHero
        eyebrow="About us"
        title={
          <>
            A local SLO team.
            <br />
            <span className="bg-gradient-to-r from-white via-cyan to-[oklch(0.7_0.18_220)] bg-clip-text text-transparent">
              27 years. Counting.
            </span>
          </>
        }
        subtitle="We started Digital Solution in 1997 with a simple idea: small businesses deserve IT support that's friendly, fast and honest. We've never wavered."
        meta={["Est. 1997", "30 engineers", "Paso to Pismo", "On-site within an hour"]}
      />

      {/* Editorial story block */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-black">
                <img
                  src={heroTeam}
                  alt="Our team in San Luis Obispo"
                  loading="lazy"
                  width={1600}
                  height={1024}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Our story</span>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Built for SLO businesses, by SLO people.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                We're headquartered downtown and work with hundreds of clients from Paso to Pismo. When something breaks, an actual local engineer can be on-site within an hour — not days.
              </p>
              <p className="mt-4 text-muted-foreground">
                Over the past two decades we've grown into a 30-person team of engineers, security specialists and account leads. But we still operate like a small business, because we are one — and because that's what makes us different.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values — editorial numbered list, no gradient icon cards */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">What we believe</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Three things we won't compromise on.
            </h2>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="bg-background p-10 sm:p-12">
                <div className="font-display text-5xl font-semibold tracking-[-0.04em] text-brand">
                  {v.n}
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.03em]">{v.title}</h3>
                <p className="mt-3 text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Milestones</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            A quiet, steady climb.
          </h2>
          <div className="mt-14 divide-y divide-border border-y border-border">
            {milestones.map((m) => (
              <div key={m.year} className="grid grid-cols-[6rem_1fr] items-baseline gap-6 py-6 sm:grid-cols-[8rem_1fr]">
                <div className="font-display text-2xl font-semibold tracking-[-0.03em] text-brand sm:text-3xl">
                  {m.year}
                </div>
                <p className="text-lg text-foreground/80">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CinematicCTA
        title="Come meet the team."
        subtitle="Stop by our downtown SLO office, or grab thirty minutes with us on a video call."
        ctaLabel="Get in touch"
      />
    </SiteShell>
  );
}
