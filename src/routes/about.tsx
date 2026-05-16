import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero, CinematicCTA } from "@/components/site/PageHero";
import { buildSeo } from "@/lib/seo";
import heroTeam from "@/assets/hero-team.jpg";
import willAction from "@/assets/will-action.jpg";
import jahleelHero from "@/assets/jahleel-hero.jpg";
import micahHero from "@/assets/micah-hero.jpg";
import tamikaHero from "@/assets/tamika-hero.jpg";

export const Route = createFileRoute("/about")({
  head: () =>
    buildSeo({
      title: "About — Local SLO IT Since 1997",
      description:
        "Central Coast Digital Solution has been the trusted IT partner for San Luis Obispo County businesses for over 25 years. A local team of engineers who actually pick up the phone.",
      path: "/about",
      image: heroTeam,
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
  { year: "1995", text: "William began his first IT job at a local computer shop in Atascadero, and started his first business." },
  { year: "2008", text: "Shifted into digital enablement work after the downturn, supporting live insurance agents and national carrier workflows." },
  { year: "2015", text: "Digital Solution was founded to provide practical business IT support." },
  { year: "Today", text: "Supporting Central Coast businesses with managed IT, cybersecurity, cloud, backup, and practical AI consulting and implementation services." },
];

const team = [
  {
    name: "Will Steffenauer",
    role: "Founder",
    image: willAction,
    quote:
      "“The companies that win the next decade aren't the ones with the biggest IT budgets — they're the ones whose IT just works, quietly, in the background, every single day.”",
    bio: "Will started Digital Solution out of a one-room office in downtown SLO in 1997. Twenty-seven years later, he still picks up the phone himself. You'll find him most mornings at a corner table at a downtown coffee shop, laptop open, talking through a roadmap with a client.",
  },
  {
    name: "Micah Steffenauer",
    role: "Lead Technician",
    image: micahHero,
    quote:
      "“People don't call me because I'm the smartest guy in the room. They call because they know I'll show up, I'll be straight with them, and it'll actually be fixed when I leave.”",
    bio: "Born and raised on the Central Coast, Micah is the guy half the county already has saved in their phone — friends, neighbors, the shop owner two doors down. When something stops working, his phone rings. He picks up, drives over, fixes it.",
  },
  {
    name: "Jahleel Roberts",
    role: "Field Engineer",
    image: jahleelHero,
    quote:
      "“The job isn't fixing computers — it's making someone's bad morning into a non-event. If I leave and they forget the problem ever happened, I did it right.”",
    bio: "Jahleel is the one showing up at your office at 7am because your printer died before a board meeting. Young, sharp, AI-fluent, and genuinely good with people — our clients adore him for a reason.",
  },
  {
    name: "Tamika Steffenauer",
    role: "Office Manager",
    image: tamikaHero,
    quote:
      "“Somebody's gotta keep these guys fed, on time, and paid. Turns out that somebody is me — and I wouldn't have it any other way.”",
    bio: "Tamika is the glue that holds Digital Solution together. She makes sure the team takes their breaks, gets on-site on time, stays fed, and that every bill gets paid and every check gets written. Nothing here runs without her.",
  },
];

function AboutPage() {
  return (
    <SiteShell overDark>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Your local IT partner.
            <br />
            <span className="bg-gradient-to-r from-white via-cyan to-[oklch(0.7_0.18_220)] bg-clip-text text-transparent">
              Since 2015.
            </span>
          </>
        }
        subtitle="We started Digital Solution in 2015 with a simple idea: local businesses deserve IT support that's friendly, fast and honest. We've never wavered."
        meta={["Est. 2015", "Local Team", "Paso to Pismo", "Fast Response"]}
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
                IT support with local roots.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Founded in 2015 and backed by IT experience going back to 1995, we help Central Coast businesses with managed IT, cybersecurity, cloud, backup, and practical AI implementation.
              </p>
              <p className="mt-4 text-muted-foreground">
                We are local, responsive, and hands-on. Clients work with people who know their business, understand their systems, and help them make practical technology decisions without the runaround.
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


      {/* Team — four-block grid with portrait, story, and pull quote */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              The team
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              The people behind the phone.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              When you call us, you talk to one of these people. Not a queue, not a script, not someone three time zones away.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <article
                key={m.name}
                className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-border bg-background transition hover:border-brand/40"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={m.image}
                    alt={`${m.name}, ${m.role} at Digital Solution`}
                    loading="lazy"
                    width={600}
                    height={750}
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand">
                    {m.role}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em]">
                    {m.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {m.bio}
                  </p>
                  <blockquote className="mt-5 border-t border-border pt-5 font-display text-sm italic leading-relaxed text-foreground/75">
                    {m.quote}
                  </blockquote>
                </div>
              </article>
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
