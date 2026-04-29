import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ArrowRight, Shield, Cloud, Phone, HardDrive, Brain, Server, Check, Star, Clock, Award, Users, Building2, Stethoscope, Scale, GraduationCap, ShoppingBag, Factory } from "lucide-react";
import { HexMark, HexPattern, HexOutline } from "@/components/site/HexMark";
import heroTeam from "@/assets/hero-team.jpg";
import networkBg from "@/assets/network-bg.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Solution — Managed IT & Cybersecurity in San Luis Obispo" },
      { name: "description", content: "Trusted MSP for businesses across San Luis Obispo County. 24/7 support, cybersecurity, cloud, VoIP and AI solutions with a 15-minute response SLA." },
      { property: "og:title", content: "Digital Solution — Managed IT for SLO County" },
      { property: "og:description", content: "Solving IT problems since 1997. 24/7 support, cybersecurity, and cloud services for SLO businesses." },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Server, title: "Managed IT Services", desc: "Proactive monitoring, patching and helpdesk so your team never waits on tech." },
  { icon: Shield, title: "Cybersecurity", desc: "EDR, SOC, MFA and security training to defend against modern threats." },
  { icon: HardDrive, title: "Backup & Recovery", desc: "Immutable backups and tested DR plans that keep you running." },
  { icon: Cloud, title: "Cloud Hosting", desc: "Microsoft 365, Azure and AWS — designed, migrated and managed." },
  { icon: Phone, title: "VoIP & Internet", desc: "Crystal-clear cloud phones and fiber internet built for hybrid teams." },
  { icon: Brain, title: "AI Solutions", desc: "Practical AI integrations that automate workflows and unlock productivity." },
];

const stats = [
  { v: "15min", l: "Avg. response time" },
  { v: "99.99%", l: "Uptime SLA" },
  { v: "27+", l: "Years in SLO County" },
  { v: "450+", l: "Businesses served" },
];

const industries = [
  { icon: Stethoscope, name: "Healthcare", note: "HIPAA compliant" },
  { icon: Scale, name: "Legal", note: "Confidentiality first" },
  { icon: Building2, name: "Professional Services", note: "Hybrid-ready" },
  { icon: GraduationCap, name: "Education", note: "K-12 & Higher Ed" },
  { icon: ShoppingBag, name: "Retail & Hospitality", note: "PCI compliant" },
  { icon: Factory, name: "Manufacturing", note: "OT/IT security" },
];

const testimonials = [
  { name: "Marcus Reyes", role: "Owner, Coastal Vineyards", img: t1, quote: "Digital Solution rebuilt our network and migrated us to the cloud over a single weekend. Zero downtime, and our team has had real, human support every single day since." },
  { name: "Sarah O'Connor", role: "Operations Director, Bayview Group", img: t2, quote: "After a ransomware scare with our last provider, switching here was night and day. Their security stack and 24/7 SOC give us total peace of mind." },
  { name: "David Johnson", role: "Director, SLO Family Health", img: t3, quote: "HIPAA compliance felt overwhelming until they walked us through it. Response times are unreal — issues are usually fixed before staff finish typing the ticket." },
];

const tiers = [
  { name: "Essentials", price: "$89", per: "/user/mo", desc: "Core monitoring & helpdesk for small teams.", features: ["Remote helpdesk (8×5)", "Patch management", "Antivirus & MFA", "Quarterly business review"] },
  { name: "Professional", price: "$149", per: "/user/mo", desc: "Our most popular plan for growing businesses.", features: ["Everything in Essentials", "24/7 monitoring & support", "Managed EDR + SOC", "Cloud backup", "vCIO strategy"], featured: true },
  { name: "Enterprise", price: "Custom", per: "", desc: "Tailored stack for regulated and complex orgs.", features: ["Everything in Professional", "Compliance (HIPAA, PCI, CMMC)", "Dedicated engineer", "On-site visits", "Custom SLA"] },
];

function HomePage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div
          className="absolute inset-0 opacity-25 mix-blend-screen"
          style={{ backgroundImage: `url(${networkBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/40" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
              Now serving San Luis Obispo County
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              IT that just <span className="text-gradient-brand bg-gradient-to-r from-cyan to-white bg-clip-text text-transparent">works.</span>
              <br />Backed by humans who care.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/75">
              Managed IT, cybersecurity, and cloud for SLO businesses — with a 15-minute response SLA and 24/7 support from a local team you'll actually know by name.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition hover:bg-cyan">
                Talk to a human
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
                Explore services
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan" /> No long-term lock-in</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan" /> Local SLO team</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan" /> Transparent pricing</span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-brand opacity-30 blur-2xl" aria-hidden />
              <img
                src={heroTeam}
                alt="Digital Solution IT engineers monitoring client networks from their San Luis Obispo office"
                width={1600}
                height={1024}
                className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-glow ring-1 ring-white/20"
              />
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-background p-4 text-foreground shadow-soft sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Avg. response</div>
                    <div className="text-lg font-bold">Under 15 minutes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="bg-surface p-8 text-center">
              <div className="font-display text-4xl font-bold text-gradient-brand">{s.v}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">What we do</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Complete IT, under one roof
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From day-to-day support to long-term strategy — one trusted partner instead of a half-dozen vendors.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition group-hover:opacity-20" aria-hidden />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="relative mt-6 text-xl font-bold">{s.title}</h3>
              <p className="relative mt-2 text-muted-foreground">{s.desc}</p>
              <Link to="/services" className="relative mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand">Industries</span>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Specialists in the work you actually do.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We've built IT stacks for clinics, vineyards, law firms and more across the Central Coast. We speak your compliance language.
              </p>
              <Link to="/industries" className="mt-6 inline-flex items-center gap-2 font-semibold text-brand">
                See all industries <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {industries.map((i) => (
                  <div key={i.name} className="rounded-2xl border border-border bg-card p-5 transition hover:border-brand/40 hover:shadow-soft">
                    <i.icon className="h-7 w-7 text-brand" />
                    <div className="mt-4 font-semibold">{i.name}</div>
                    <div className="text-xs text-muted-foreground">{i.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">Real clients, real results</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Loved by 450+ SLO businesses
          </h2>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-soft">
              <div className="flex gap-1 text-brand">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 flex-1 text-foreground/90">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                <img src={t.img} alt={t.name} loading="lazy" width={512} height={512} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Award className="h-5 w-5 text-brand" /> Microsoft Solutions Partner</div>
          <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-brand" /> CompTIA Security Trustmark+</div>
          <div className="flex items-center gap-2"><Users className="h-5 w-5 text-brand" /> SLO Chamber Member</div>
          <div className="flex items-center gap-2"><Star className="h-5 w-5 text-brand" /> 4.9★ on Google (180+ reviews)</div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand">Pricing</span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Transparent plans. No surprises.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Flat per-user pricing means budgeting your IT is finally predictable.
            </p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  t.featured
                    ? "border-brand bg-gradient-hero text-white shadow-glow lg:-translate-y-4"
                    : "border-border bg-card"
                }`}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan px-4 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                    Most popular
                  </div>
                )}
                <h3 className="font-display text-2xl font-bold">{t.name}</h3>
                <p className={`mt-2 text-sm ${t.featured ? "text-white/70" : "text-muted-foreground"}`}>{t.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">{t.price}</span>
                  <span className={t.featured ? "text-white/60" : "text-muted-foreground"}>{t.per}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-cyan" : "text-brand"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                    t.featured
                      ? "bg-white text-ink hover:bg-cyan"
                      : "bg-foreground text-background hover:bg-brand"
                  }`}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 text-white shadow-glow lg:p-20">
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: `url(${networkBg})`, backgroundSize: "cover" }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to stop fighting your IT?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Book a free 30-minute call. We'll listen, ask smart questions, and show you exactly what we'd do differently.
            </p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-ink transition hover:bg-cyan">
              Talk to a human <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
