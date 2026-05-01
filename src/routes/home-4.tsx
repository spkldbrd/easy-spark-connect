import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import willAction from "@/assets/will-action.jpg";
import jahleelHero from "@/assets/jahleel-hero.jpg";
import micahHero from "@/assets/micah-hero.jpg";
import tChris from "@/assets/testimonial-chris-raders.jpg";

export const Route = createFileRoute("/home-4")({
  head: () => ({
    meta: [
      { title: "Digital Solution — The IT team that actually shows up" },
      {
        name: "description",
        content:
          "Real conversations, real outcomes. A boutique IT, security, and AI partner for businesses on California's Central Coast.",
      },
      { property: "og:title", content: "Digital Solution — The IT team that actually shows up" },
      { property: "og:image", content: willAction },
      { name: "twitter:image", content: willAction },
    ],
  }),
  component: Home4Page,
});

const principles = [
  {
    n: "I",
    t: "Talk to a person.",
    d: "Every call, every ticket, every escalation lands on a human who knows your stack.",
  },
  {
    n: "II",
    t: "Fix it once.",
    d: "We chase root causes, not symptoms. The same problem doesn't come back in three weeks.",
  },
  {
    n: "III",
    t: "Show the work.",
    d: "Monthly readouts in plain English. You always know what we did, why, and what's next.",
  },
  {
    n: "IV",
    t: "Local, on purpose.",
    d: "We live where you live. On-site in SLO County is hours away — not a flight.",
  },
];

const stack = [
  ["Endpoint", "Microsoft Defender · Huntress · NinjaOne"],
  ["Identity", "Entra ID · Okta · Duo MFA"],
  ["Cloud", "Microsoft 365 · Azure · AWS"],
  ["Network", "Meraki · Fortinet · Ubiquiti"],
  ["Backup", "Veeam · Datto · Wasabi immutable"],
  ["Voice", "Microsoft Teams Phone · 3CX · RingCentral"],
];

type HeroSlide = {
  issue: string;
  location: string;
  headline: ReactNode;
  body: string;
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; href: string };
  pullQuote: string;
  pullAttribution: string;
  image: string;
  imageAlt: string;
  captionEyebrow: string;
  captionName: string;
  captionMetaTop: string;
  captionMetaBottom: string;
};

const heroSlides: HeroSlide[] = [
  {
    issue: "Issue №04",
    location: "SLO · CA",
    headline: (
      <>
        The IT team
        <br />
        that actually
        <br />
        <span className="italic text-cyan">shows up.</span>
      </>
    ),
    body: "We're a small, opinionated crew running technology for a couple hundred businesses across the Central Coast. No call centers. No quarterly upsell calls. Just IT, done well, by people you'll actually meet.",
    primaryCta: { label: "Start a conversation", to: "/contact" },
    secondaryCta: { label: "Or just call · 805-466-4722", href: "tel:+18054664722" },
    pullQuote:
      "“The companies that win the next decade aren't the ones with the biggest IT budgets — they're the ones whose IT just works, quietly, in the background, every single day.”",
    pullAttribution: "— Will, founder",
    image: willAction,
    imageAlt: "Will, founder of Digital Solution, mid-conversation in his SLO workspace",
    captionEyebrow: "Founder",
    captionName: "Will Steffenauer",
    captionMetaTop: "Photo · SLO Workspace",
    captionMetaBottom: "Spring 2026",
  },
  {
    issue: "Issue №05",
    location: "On-site · Central Coast",
    headline: (
      <>
        The face you'll
        <br />
        actually <span className="italic text-cyan">see</span>
        <br />
        when it matters.
      </>
    ),
    body: "When your printer dies before a board meeting, a real person from our team is on the road within the hour. No ticket queues. No \"a technician will reach out within 48 hours.\" Just someone local — who knows your office — walking through your door before your coffee gets cold.",
    primaryCta: { label: "Start a conversation", to: "/contact" },
    secondaryCta: { label: "Or just call · 805-466-4722", href: "tel:+18054664722" },
    pullQuote:
      "“The job isn't fixing computers — it's making someone's bad morning into a non-event. If we leave and they forget the problem ever happened, we did it right.”",
    pullAttribution: "— The Digital Solution team",
    image: jahleelHero,
    imageAlt:
      "A Digital Solution field engineer on a downtown Paso Robles sidewalk at golden hour",
    captionEyebrow: "Field Service",
    captionName: "On-site · same day",
    captionMetaTop: "Photo · Downtown Paso Robles",
    captionMetaBottom: "Spring 2026",
  },
  {
    issue: "Issue №06",
    location: "Paso · SLO · Pismo",
    headline: (
      <>
        The number
        <br />
        you'll <span className="italic text-cyan">actually</span>
        <br />
        save in your phone.
      </>
    ),
    body: "Most IT companies want to be a vendor. We'd rather be the person you text on a Saturday when something feels off. Born and raised on the Central Coast — we know your street, your business, and probably your dog. Your team gets a direct line to ours. Not a portal. Not a queue.",
    primaryCta: { label: "Start a conversation", to: "/contact" },
    secondaryCta: { label: "Or just call · 805-466-4722", href: "tel:+18054664722" },
    pullQuote:
      "“People don't call us because we're the smartest guys in the room. They call because they know we'll show up, we'll be straight with them, and it'll actually be fixed when we leave.”",
    pullAttribution: "— The Digital Solution team",
    image: micahHero,
    imageAlt:
      "A Digital Solution technician on a downtown Paso Robles street at sunset",
    captionEyebrow: "Local · Always",
    captionName: "Paso to Pismo",
    captionMetaTop: "Photo · Downtown Paso Robles",
    captionMetaBottom: "Spring 2026",
  },
];

function Home4Page() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = heroSlides[slideIndex];
  const total = heroSlides.length;
  const goPrev = () => setSlideIndex((i) => (i - 1 + total) % total);
  const goNext = () => setSlideIndex((i) => (i + 1) % total);

  return (
    <SiteShell overDark>
      {/* HERO — manual slider. Editorial type left, tall portrait right. */}
      <section className="relative -mt-[72px] overflow-hidden bg-[#0a0a0c] text-white">
        {/* Soft warm wash bleeding from the right (echoes the photo's golden hour) */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-2/3 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 80% 50%, rgba(255,170,90,0.18), transparent 60%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto grid min-h-[92vh] max-w-7xl grid-cols-1 gap-10 px-6 pb-16 pt-32 lg:grid-cols-12 lg:gap-12 lg:pt-40">
          {/* LEFT — type column */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              {/* Magazine-style masthead */}
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                <span>{slide.issue}</span>
                <span className="h-px flex-1 bg-white/15" />
                <span>{slide.location}</span>
              </div>

              <h1 className="mt-10 font-display text-[clamp(2.75rem,7.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                {slide.headline}
              </h1>

              <p className="mt-10 max-w-xl text-lg text-white/70 sm:text-xl">
                {slide.body}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to={slide.primaryCta.to}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-cyan"
                >
                  {slide.primaryCta.label}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <a
                  href={slide.secondaryCta.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
                >
                  {slide.secondaryCta.label}
                </a>
              </div>
            </div>

            {/* Bottom hairline — pull-quote / by-line + slider controls */}
            <div className="mt-16 border-t border-white/10 pt-6">
              <div className="hidden lg:block">
                <p className="max-w-md font-display text-sm italic leading-relaxed text-white/55">
                  {slide.pullQuote}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/40">
                  {slide.pullAttribution}
                </p>
              </div>

              {/* Slider controls */}
              <div className="mt-6 flex items-center gap-4 lg:mt-8">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous slide"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next slide"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="ml-2 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/45">
                  <span className="tabular-nums text-white/80">
                    {String(slideIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-10 bg-white/20" />
                  <span className="tabular-nums">
                    {String(total).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — tall portrait card */}
          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
              <img
                key={slide.image}
                src={slide.image}
                alt={slide.imageAlt}
                width={896}
                height={1280}
                className="aspect-[3/4] h-auto w-full object-cover"
              />
              {/* caption strip overlay */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan">
                    {slide.captionEyebrow}
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold tracking-tight">
                    {slide.captionName}
                  </div>
                </div>
                <div className="text-right text-[10px] uppercase tracking-[0.22em] text-white/50">
                  {slide.captionMetaTop}
                  <br />
                  {slide.captionMetaBottom}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES — four big numbered tenets, no cards, lots of air */}
      <section className="bg-background py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Four things we believe
              </span>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
                How we do the work.
              </h2>
            </div>
          </div>

          <div className="mt-20 grid gap-x-12 gap-y-16 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.n} className="border-t border-border pt-6">
                <div className="flex items-baseline gap-6">
                  <span className="font-display text-5xl font-semibold tracking-tight text-brand">
                    {p.n}
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                    {p.t}
                  </h3>
                </div>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE STACK — quiet table, very different from prior service grids */}
      <section className="border-y border-border bg-surface py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              The stack we run.
            </h2>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand"
            >
              See all services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <dl className="mt-12 divide-y divide-border border-y border-border">
            {stack.map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[180px_1fr] sm:items-baseline"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                  {k}
                </dt>
                <dd className="font-display text-lg font-medium tracking-tight text-foreground">
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
            Vendor-neutral by design. We pick what fits your team — not what
            pays us the highest margin.
          </p>
        </div>
      </section>

      {/* QUOTE — same testimonial, slightly different presentation */}
      <section className="bg-background py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[auto_1fr] lg:items-center">
          <img
            src={tChris}
            alt="Chris Raders, Ted Hamm Insurance Agency"
            width={160}
            height={160}
            loading="lazy"
            className="h-32 w-32 rounded-full object-cover ring-1 ring-border lg:h-40 lg:w-40"
          />
          <figure>
            <blockquote className="font-display text-2xl font-medium leading-[1.25] tracking-[-0.02em] text-foreground sm:text-3xl">
              <span className="text-brand">“</span>
              Our insurance agency depends on Digital Solution to manage all of
              our technology. In addition to stellar knowledge, I consider Will
              and the Digital Solution team an essential partner in our success.
              <span className="text-brand">”</span>
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold">Chris Raders</span>
              <span className="text-muted-foreground"> · Ted Hamm Insurance Agency</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA — minimal, no background image, just typography */}
      <section className="bg-[#0a0a0c] py-32 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <h2 className="font-display text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
              Coffee's on us.
              <br />
              <span className="text-white/40">Bring your IT headaches.</span>
            </h2>
            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-cyan"
            >
              Book a call
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
