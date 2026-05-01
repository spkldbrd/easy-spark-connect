import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import heroOrb from "@/assets/hero-orb.jpg";
import svcManaged from "@/assets/svc-managed.jpg";
import svcSecurity from "@/assets/svc-security.jpg";
import svcCloud from "@/assets/svc-cloud.jpg";
import svcBackup from "@/assets/svc-backup.jpg";
import svcVoip from "@/assets/svc-voip.jpg";
import svcAi from "@/assets/svc-ai.jpg";
import tChris from "@/assets/testimonial-chris-raders.jpg";

export const Route = createFileRoute("/home-alt")({
  head: () => ({
    meta: [
      { title: "Digital Solution — Managed IT & Cybersecurity in San Luis Obispo" },
      { name: "description", content: "A modern IT partner for businesses across San Luis Obispo County. Managed IT, cybersecurity, cloud, VoIP and AI — backed by humans, on a 15-minute SLA." },
      { property: "og:title", content: "Digital Solution — Managed IT for SLO County" },
      { property: "og:description", content: "Solving IT problems since 1997. Managed IT, security, cloud, VoIP and AI for the Central Coast." },
      { property: "og:image", content: heroOrb },
      { name: "twitter:image", content: heroOrb },
    ],
  }),
  component: HomeAltPage,
});

const tabs = [
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
    label: "Cloud",
    image: svcCloud,
    eyebrow: "Microsoft 365 · Azure · AWS",
    title: "Cloud designed, migrated, and tuned for you.",
    body: "From tenant hardening to cost optimization — get the cloud you were promised, without the surprise invoices.",
    bullets: ["Microsoft 365 rollout", "Azure cost optimization", "Identity & SSO"],
  },
  {
    key: "backup",
    label: "Backup & DR",
    image: svcBackup,
    eyebrow: "Recovery first",
    title: "Immutable backups. Tested recovery.",
    body: "A 3-2-1-1 backup posture with annual disaster recovery drills. Ransomware can't touch what it can't reach.",
    bullets: ["Image-based + cloud", "RPO/RTO under 1 hour", "Annual DR testing"],
  },
  {
    key: "voip",
    label: "VoIP",
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

const logos = [
  "Coastal Vineyards",
  "Bayview Group",
  "SLO Family Health",
  "Edna Valley Legal",
  "Pacific Pediatrics",
  "Central Coast Mfg",
  "Morro Bay Hotels",
  "Madonna & Co.",
];

function HomeAltPage() {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <SiteShell overDark>
      {/* HERO — pitch black, oversized type, single orb */}
      <section className="relative -mt-[72px] overflow-hidden bg-black text-white">
        <img
          src={heroOrb}
          alt=""
          width={1920}
          height={1280}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        />
        {/* black vignette so text reads */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.55)_70%,_#000_100%)]" aria-hidden />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-6 pb-24 pt-40">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
              Trusted by 450+ Central Coast businesses since 1997
            </div>
            <h1 className="mt-7 font-display text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              IT, finally
              <br />
              <span className="bg-gradient-to-r from-white via-cyan to-[oklch(0.7_0.18_220)] bg-clip-text text-transparent">
                done right.
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-white/65 sm:text-xl">
              Managed IT, cybersecurity, cloud and AI for San Luis Obispo County —
              answered by humans, in under fifteen minutes.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-cyan"
              >
                Talk to a human
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

          {/* hairline tagline row */}
          <div className="mt-24 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/40">
            <span>San Luis Obispo, California</span>
            <span>Est. 1997</span>
            <span>24 / 7 / 365</span>
            <span>Microsoft Solutions Partner</span>
          </div>
        </div>
      </section>

      {/* WEBEX-STYLE TABBED SERVICES SLIDER */}
      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              The Digital Solution suite
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              One partner.
              <br className="hidden sm:block" />
              <span className="text-muted-foreground">Every layer of your IT.</span>
            </h2>
          </div>

          {/* tab bar */}
          <div className="mt-16 flex justify-center">
            <div className="flex w-full max-w-5xl gap-1 overflow-x-auto rounded-full border border-border bg-surface p-1.5">
              {tabs.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setActive(i)}
                  className={`flex-1 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    i === active
                      ? "bg-foreground text-background shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* feature panel */}
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-black">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
                <img
                  key={current.key}
                  src={current.image}
                  alt=""
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full animate-in fade-in object-cover duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 lg:to-black/0" />
              </div>
              <div className="flex flex-col justify-center p-10 text-white sm:p-14 lg:p-16">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                  {current.eyebrow}
                </span>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
                  {current.title}
                </h3>
                <p className="mt-5 text-base text-white/65 sm:text-lg">{current.body}</p>
                <ul className="mt-8 space-y-2.5 text-sm text-white/80">
                  {current.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <span className="h-1 w-6 bg-cyan" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Link
                    to="/services"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO WALL */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Local teams that trust us with their uptime
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {logos.map((l) => (
              <div
                key={l}
                className="text-center font-display text-lg font-medium tracking-tight text-foreground/40 transition hover:text-foreground"
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SINGLE EDITORIAL QUOTE */}
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

      {/* CINEMATIC CTA */}
      <section className="relative overflow-hidden bg-black py-32 text-white">
        <img
          src={heroOrb}
          alt=""
          width={1920}
          height={1280}
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
            Let's fix your IT.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/65">
            Thirty minutes. No pitch deck. Just a real conversation about what's slowing you down — and what we'd do about it.
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
