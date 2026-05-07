import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import willAction from "@/assets/will-action.jpg";
import jahleelHero from "@/assets/jahleel-hero.jpg";
import micahHero from "@/assets/micah-hero.jpg";
import tChris from "@/assets/testimonial-chris-raders.jpg";
import svcManaged from "@/assets/svc-managed.jpg";
import { NetworkBreath } from "@/components/site/NetworkBreath";
import svcSecurity from "@/assets/svc-security.jpg";
import svcCloud from "@/assets/svc-cloud.jpg";
import svcBackup from "@/assets/svc-backup.jpg";
import svcVoip from "@/assets/svc-voip.jpg";
import svcAi from "@/assets/svc-ai.jpg";

const serviceTabs = [
  {
    key: "managed",
    label: "Managed IT",
    image: svcManaged,
    eyebrow: "Always-on operations",
    title: "An IT department that never sleeps.",
    body: "24/7 monitoring, proactive patching, and a help desk that picks up before the second ring. Your team stays productive — we handle the rest.",
    bullets: ["24/7 helpdesk + on-call", "Endpoint management", "Quarterly business reviews"],
  },
  {
    key: "security",
    label: "Cybersecurity",
    image: svcSecurity,
    eyebrow: "Defense in depth",
    title: "Modern threats, neutralized in real time.",
    body: "Managed EDR, a 24/7 SOC, phishing-resistant MFA and continuous training. Built to stop ransomware before it reaches your data.",
    bullets: ["Managed EDR + SOC", "Email & identity hardening", "Security awareness training"],
  },
  {
    key: "cloud",
    label: "Cloud & Microsoft 365",
    image: svcCloud,
    eyebrow: "Microsoft 365 · Azure · AWS",
    title: "Cloud designed, migrated, and tuned for you.",
    body: "From tenant hardening to cost optimization — get the cloud you were promised, without the surprise invoices.",
    bullets: ["Microsoft 365 rollout", "Azure cost optimization", "Identity & SSO"],
  },
  {
    key: "backup",
    label: "Backup & Disaster Recovery",
    image: svcBackup,
    eyebrow: "Recovery first",
    title: "Immutable backups. Tested recovery.",
    body: "A 3-2-1-1 backup posture with annual disaster recovery drills. Ransomware can't touch what it can't reach.",
    bullets: ["Image-based + cloud", "RPO/RTO under 1 hour", "Annual DR testing"],
  },
  {
    key: "voip",
    label: "Business VoIP",
    image: svcVoip,
    eyebrow: "Voice + connectivity",
    title: "Crystal-clear calls. Anywhere your team works.",
    body: "Cloud PBX, SMS, video and SD-WAN — designed and supported by the same team that runs your network.",
    bullets: ["Cloud PBX", "SMS & video", "Fiber + LTE failover"],
  },
  {
    key: "ai",
    label: "AI Solutions",
    image: svcAi,
    eyebrow: "Practical, governed AI",
    title: "AI your team will actually use.",
    body: "Microsoft Copilot rollouts, custom assistants, and workflow automation that ships value in weeks — not quarters.",
    bullets: ["Copilot adoption", "Custom GPT assistants", "Process automation"],
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Solution — The IT team that actually shows up" },
      {
        name: "description",
        content:
          "Real conversations, real outcomes. A boutique IT, security, and AI partner for businesses on California's Central Coast.",
      },
      { property: "og:title", content: "Digital Solution — The IT team that actually shows up" },
      { property: "og:description", content: "Real conversations, real outcomes. A boutique IT, security, and AI partner for businesses on California's Central Coast." },
      { property: "og:image", content: willAction },
      { name: "twitter:image", content: willAction },
    ],
  }),
  component: HomePage,
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
    t: "Communicate the work.",
    d: "You always know what changed, why it mattered, and what comes next.",
  },
  {
    n: "IV",
    t: "Local, on purpose.",
    d: "We live where you live. On-site in SLO County is hours away — not a flight.",
  },
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
    body: "We're a small, opinionated crew running technology for businesses across the Central Coast. No call centers. No quarterly upsell calls. Just IT, done well, by people you'll actually meet.",
    primaryCta: { label: "Start a conversation", to: "/contact" },
    secondaryCta: { label: "Or just call · 805-466-4722", href: "tel:+18054664722" },
    pullQuote:
      "“The companies that win the next decade aren't the ones with the biggest IT budgets — they're the ones whose IT just works, quietly, in the background, every single day.”",
    pullAttribution: "— Will, founder",
    image: willAction,
    imageAlt: "Will, founder of Digital Solution, mid-conversation in his SLO workspace",
    captionEyebrow: "Founder",
    captionName: "Will Steffenauer",
    captionMetaTop: "PHOTO · ATASCADERO WORKSPACE",
    captionMetaBottom: "SPRING 2026",
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
    captionMetaTop: "JAHLEEL ROBERTS",
    captionMetaBottom: "TECH",
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
    captionMetaTop: "MICAH STEFFENAUER",
    captionMetaBottom: "LEAD TECH",
  },
];

function HomePage() {
  // SSR + first paint always shows slide 0 (canonical founder hero) so crawlers,
  // social previews, and Core Web Vitals stay stable. After hydration we pick a
  // random slide so real visitors get variety on each visit.
  const [slideIndex, setSlideIndex] = useState(0);
  const total = heroSlides.length;

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * total);
    if (randomIndex !== 0) setSlideIndex(randomIndex);
  }, [total]);

  const slide = heroSlides[slideIndex];
  const goPrev = () => setSlideIndex((i) => (i - 1 + total) % total);
  const goNext = () => setSlideIndex((i) => (i + 1) % total);

  const [activeService, setActiveService] = useState(0);
  const currentService = serviceTabs[activeService];

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

      {/* SERVICES SELECTOR — tabbed, sits directly under the hero */}
      <section id="services" className="scroll-mt-24 bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              The Digital Solution suite
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              One team.
              <br className="hidden sm:block" />
              <span className="text-muted-foreground">Every layer of your IT.</span>
            </h2>
          </div>

          <div className="mt-16 flex justify-center">
            <div className="flex w-full max-w-5xl gap-1 overflow-x-auto rounded-full border border-border bg-surface p-1.5">
              {serviceTabs.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setActiveService(i)}
                  className={`flex-1 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    i === activeService
                      ? "bg-foreground text-background shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-black">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
                {currentService.key === "managed" ? (
                  <video
                    key="managed-video"
                    src="/managed-network-loop.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <img
                    key={currentService.key}
                    src={currentService.image}
                    alt=""
                    width={1280}
                    height={896}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full animate-in fade-in object-cover duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 lg:to-black/0" />
              </div>
              <div className="flex flex-col justify-center p-10 text-white sm:p-14 lg:p-16">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                  {currentService.eyebrow}
                </span>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
                  {currentService.title}
                </h3>
                <p className="mt-5 text-base text-white/65 sm:text-lg">{currentService.body}</p>
                <ul className="mt-8 space-y-2.5 text-sm text-white/80">
                  {currentService.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <span className="h-1 w-6 bg-cyan" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan"
                  >
                    Talk to us about this
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES — four big numbered tenets, no cards, lots of air */}
      <section className="border-y border-border bg-surface py-32">
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

      {/* QUOTE — same testimonial, slightly different presentation */}
      <section className="bg-background py-32">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            Trusted locally
          </span>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-12 px-6 lg:grid-cols-[auto_1fr] lg:items-center">
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
              Talk to us
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
