import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { ArrowRight, Heart, Compass, Wrench } from "lucide-react";
import heroTeam from "@/assets/hero-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Local SLO IT Since 1997 | Digital Solution" },
      { name: "description", content: "Digital Solution has been the trusted IT partner for businesses across San Luis Obispo County for over 25 years." },
      { property: "og:title", content: "About | Digital Solution" },
      { property: "og:description", content: "A local team of engineers who actually pick up the phone." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Heart, title: "Humans first", desc: "We answer the phone. We remember your name. We treat your business like ours." },
  { icon: Compass, title: "Strategic, not reactive", desc: "We catch problems before they break things. Roadmaps, not just reboots." },
  { icon: Wrench, title: "Real expertise", desc: "Our engineers are credentialed (and curious). No tier-1 scripts, no offshore queues." },
];

function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About us"
        title={<>A local SLO team. 27 years. Counting.</>}
        subtitle="We started Digital Solution in 1997 with a simple idea: small businesses deserve IT support that's friendly, fast and honest. We've never wavered."
      />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img src={heroTeam} alt="Our team in San Luis Obispo" loading="lazy" width={1600} height={1024} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" />
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight">Built for SLO businesses, by SLO people.</h2>
            <p className="mt-5 text-lg text-muted-foreground">We're headquartered downtown and work with hundreds of clients from Paso to Pismo. When something breaks, an actual local engineer can be on-site within an hour — not days.</p>
            <p className="mt-4 text-muted-foreground">Over the past two decades we've grown into a 30-person team of engineers, security specialists, and account leads. But we still operate like a small business, because we are one — and because that's what makes us different.</p>
          </div>
        </div>
      </section>
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-center font-display text-4xl font-bold tracking-tight">What we believe</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 font-semibold text-background hover:bg-brand">
          Come meet the team <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </SiteShell>
  );
}
