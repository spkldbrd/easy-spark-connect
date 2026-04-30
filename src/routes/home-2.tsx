import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import willHero from "@/assets/will-hero.jpg";
import tChris from "@/assets/testimonial-chris-raders.jpg";

export const Route = createFileRoute("/home-2")({
  head: () => ({
    meta: [
      { title: "Digital Solution — Meet your IT partner on the Central Coast" },
      {
        name: "description",
        content:
          "A real human, on the Central Coast, who picks up the phone. Managed IT, cybersecurity, cloud and AI for businesses across San Luis Obispo County.",
      },
      { property: "og:title", content: "Digital Solution — IT, with a human on the other end." },
      { property: "og:image", content: willHero },
      { name: "twitter:image", content: willHero },
    ],
  }),
  component: Home2Page,
});

function Home2Page() {
  return (
    <SiteShell overDark>
      {/* HERO — split: editorial type left, portrait right */}
      <section className="relative -mt-[72px] overflow-hidden bg-black text-white">
        {/* Portrait fills the frame, anchored right */}
        <img
          src={willHero}
          alt="Will, founder of Digital Solution"
          width={1920}
          height={1080}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right"
        />
        {/* Left-side fade so the headline sits on near-pure black */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"
          aria-hidden
        />
        {/* Subtle bottom vignette */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-6 pb-24 pt-40">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
              Hi, I'm Will — founder, Digital Solution
            </div>
            <h1 className="mt-7 font-display text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              IT, with a human
              <br />
              <span className="bg-gradient-to-r from-white via-cyan to-[oklch(0.7_0.18_220)] bg-clip-text text-transparent">
                on the other end.
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-white/70 sm:text-xl">
              I've been solving IT problems on the Central Coast since 1997. When you call,
              you get a real person — usually me or someone I've personally trained — in
              under fifteen minutes. No tiers. No tickets nobody reads.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-cyan"
              >
                Talk to Will
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
              >
                What we do <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* hairline meta row */}
          <div className="mt-24 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/40">
            <span>San Luis Obispo, CA</span>
            <span>Est. 1997</span>
            <span>Owner-operated</span>
            <span>15-minute response SLA</span>
          </div>
        </div>
      </section>

      {/* INTRO — short founder note */}
      <section className="bg-background py-32">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              A note from the owner
            </span>
          </div>
          <div className="font-display text-3xl font-medium leading-[1.2] tracking-[-0.025em] text-foreground sm:text-4xl">
            Most IT companies hide behind a portal. We don't. You get my cell.
            You get a team that lives where you live. And you get answers — not
            a tier-one script reading from another time zone.
            <div className="mt-10 text-sm font-normal uppercase tracking-[0.2em] text-muted-foreground">
              — Will, founder
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO — quiet 3-column list */}
      <section className="border-y border-border bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              What we run for you.
            </h2>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand"
            >
              All services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: "01", t: "Managed IT", d: "24/7 helpdesk, monitoring, patching." },
              { n: "02", t: "Cybersecurity", d: "EDR, SOC, MFA, awareness training." },
              { n: "03", t: "Cloud", d: "Microsoft 365, Azure, identity & SSO." },
              { n: "04", t: "Backup & DR", d: "Immutable backups, tested recovery." },
              { n: "05", t: "VoIP", d: "Cloud PBX, SMS, video, SD-WAN." },
              { n: "06", t: "AI Solutions", d: "Copilot, custom assistants, automation." },
            ].map((s) => (
              <div key={s.n} className="bg-background p-8 transition hover:bg-surface">
                <div className="text-xs font-semibold tracking-[0.2em] text-brand">{s.n}</div>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em]">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-background py-32">
        <div className="mx-auto max-w-5xl px-6">
          <figure className="text-center">
            <blockquote className="font-display text-3xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground sm:text-5xl">
              <span className="text-brand">“</span>
              Our insurance agency depends on Digital Solution to manage all of our technology.
              In addition to stellar knowledge, I consider Will and the Digital Solution team
              an essential partner in our success.
              <span className="text-brand">”</span>
            </blockquote>
            <figcaption className="mt-12 flex items-center justify-center gap-4">
              <img
                src={tChris}
                alt="Chris Raders, Ted Hamm Insurance Agency"
                width={64}
                height={64}
                loading="lazy"
                className="h-14 w-14 rounded-full object-cover ring-1 ring-border"
              />
              <div className="text-left">
                <div className="text-sm font-semibold">Chris Raders</div>
                <div className="text-xs text-muted-foreground">Ted Hamm Insurance Agency</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-black py-32 text-white">
        <img
          src={willHero}
          alt=""
          width={1920}
          height={1080}
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
            Let's talk.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/65">
            Thirty minutes with me. No pitch deck. Just a conversation about
            what's slowing your team down — and what we'd do about it.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-cyan"
          >
            Book a call <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
