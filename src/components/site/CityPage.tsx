import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { CinematicCTA } from "@/components/site/PageHero";

export type CityPageData = {
  /** City name as displayed (e.g. "Atascadero") */
  name: string;
  /** Region label (e.g. "North County · SLO") */
  region: string;
  /** Drive-time / proximity statement (e.g. "Headquartered here · 0 minutes away") */
  proximity: string;
  /** Headline line that follows "IT support in" */
  tagline: string;
  /** 2–4 paragraph intro about the company in this city */
  intro: ReactNode;
  /** What makes this city's businesses unique — drives industries served */
  industries: { title: string; desc: string }[];
  /** Three quick "what we do here" service highlights */
  highlights: { label: string; desc: string }[];
  /** Optional pull quote — local flavor, half-line about the city */
  pullQuote?: string;
  /** A neighborhood / landmark namedrop list, comma-joined in copy */
  neighborhoods: string[];
};

export function CityPage({ city }: { city: CityPageData }) {
  return (
    <SiteShell overDark>
      {/* Editorial hero — no big stock photo, just type + location chips */}
      <section className="relative -mt-[72px] overflow-hidden bg-[#0a0a0c] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(43,179,192,0.18), transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(255,170,90,0.12), transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:pt-40">
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
            <MapPin className="h-3.5 w-3.5" />
            <span>{city.region}</span>
            <span className="h-px flex-1 bg-white/15" />
            <span>{city.proximity}</span>
          </div>

          <h1 className="mt-10 max-w-5xl font-display text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
            IT support
            <br />
            <span className="text-white/55">in</span>{" "}
            <span className="italic text-cyan">{city.name}.</span>
            <br />
            <span className="text-white/55">{city.tagline}</span>
          </h1>

          <div className="mt-12 grid max-w-4xl gap-6 text-lg text-white/75 sm:text-xl">
            {city.intro}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-cyan"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+18054664722"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              Or just call · 805-466-4722
            </a>
          </div>
        </div>
      </section>

      {/* Highlights — three quiet blocks */}
      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            What we do in {city.name}
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Same team. On your block.
          </h2>

          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-3">
            {city.highlights.map((h, i) => (
              <div key={h.label} className="border-t border-border pt-6">
                <div className="font-display text-3xl font-semibold tracking-tight text-brand">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em]">
                  {h.label}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries we serve in this city */}
      <section className="border-y border-border bg-surface py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Who we work with in {city.name}.
          </h2>
          <dl className="mt-12 divide-y divide-border border-y border-border">
            {city.industries.map((ind) => (
              <div
                key={ind.title}
                className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[220px_1fr] sm:items-baseline"
              >
                <dt className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {ind.title}
                </dt>
                <dd className="text-base leading-relaxed text-muted-foreground">
                  {ind.desc}
                </dd>
              </div>
            ))}
          </dl>

          {city.pullQuote && (
            <blockquote className="mt-16 border-l-2 border-brand pl-6 font-display text-2xl italic leading-snug tracking-[-0.02em] text-foreground sm:text-3xl">
              {city.pullQuote}
            </blockquote>
          )}
        </div>
      </section>

      {/* Neighborhoods — proves locality */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-baseline gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            <Clock className="h-3.5 w-3.5" />
            <span>On-site response</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <p className="mt-6 max-w-3xl font-display text-2xl leading-snug tracking-[-0.02em] text-foreground sm:text-3xl">
            We know {city.name}. From{" "}
            <span className="text-brand">
              {city.neighborhoods.join(" to ")}
            </span>
            , a local engineer can usually be at your door within the hour.
          </p>
        </div>
      </section>

      <CinematicCTA
        title={`Need IT in ${city.name}?`}
        subtitle="Skip the ticket queue. Talk to a real engineer who knows your town."
        ctaLabel="Get in touch"
      />
    </SiteShell>
  );
}
