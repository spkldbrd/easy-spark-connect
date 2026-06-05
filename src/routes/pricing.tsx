import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  Info,
  Monitor,
  Server,
  Users,
  Cloud,
  CloudOff,
  Mail,
  Phone,
  ClipboardCheck,
  Calendar,
  Receipt,
} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { PricingLeadModal, type LeadContext } from "@/components/site/PricingLeadModal";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () =>
    buildSeo({
      title: "Pricing",
      description:
        "Transparent managed IT pricing for Central Coast offices — Managed Micro for teams of 1–4 and an interactive calculator for teams of 5 or more.",
      path: "/pricing",
      noindex: true,
    }),
  component: PricingPage,
});

type View = "none" | "micro" | "calc";

const microPlans = [
  {
    tier: "Managed Micro",
    name: "With Microsoft 365",
    tagline: "Everything you need, including your Microsoft 365 licensing and backup.",
    price: "$99",
    per: "/user/mo",
    sub: "All-inclusive · billed monthly",
    features: [
      "Proactive device monitoring & alerts",
      "Antivirus & endpoint protection",
      "Managed security patching",
      "Workstation backup & recovery",
      "Microsoft 365 Email + Apps",
      "Email & cloud data backup",
      "Spam & phishing protection",
      "Website hosting (1 site)",
      "Secure remote access",
      "Help desk support (billed hourly)",
    ],
  },
  {
    tier: "Managed Micro",
    name: "Without Microsoft 365",
    tagline: "Full protection and backup — you manage your own Microsoft 365 licensing.",
    price: "$50",
    per: "/user/mo",
    sub: "All-inclusive · billed monthly",
    features: [
      "Proactive device monitoring & alerts",
      "Antivirus & endpoint protection",
      "Managed security patching",
      "Workstation backup & recovery",
      "Spam & phishing protection",
      "Website hosting (1 site)",
      "Secure remote access",
      "Help desk support (billed hourly)",
    ],
  },
];

function PricingPage() {
  const [view, setView] = useState<View>("none");
  const [leadCtx, setLeadCtx] = useState<LeadContext | null>(null);

  return (
    <SiteShell overDark>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Simple, honest pricing
            <br />
            <span className="bg-gradient-to-r from-white via-cyan to-[oklch(0.7_0.18_220)] bg-clip-text text-transparent">
              built for your size.
            </span>
          </>
        }
        subtitle="Tell us how big your office is and we'll show you the right plan. Month-to-month, no long contracts, no surprises."
        meta={["Month-to-month", "No contracts", "Local team", "Since 2015"]}
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          {/* Gateway selector */}
          <div className="text-center">
            <p className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              How many people work in your office?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll show you the right pricing for your size.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setView("micro")}
                className={`min-w-[180px] rounded-xl border-2 px-8 py-4 text-sm font-medium shadow-sm transition ${
                  view === "micro"
                    ? "border-brand bg-brand text-white shadow-md"
                    : "border-border bg-background text-foreground hover:border-brand hover:shadow-md"
                }`}
              >
                1–4 People
                <span className="mt-1 block text-[11px] font-normal opacity-80">
                  Managed Micro pricing
                </span>
              </button>
              <button
                onClick={() => setView("calc")}
                className={`min-w-[180px] rounded-xl border-2 px-8 py-4 text-sm font-medium shadow-sm transition ${
                  view === "calc"
                    ? "border-brand bg-brand text-white shadow-md"
                    : "border-border bg-background text-foreground hover:border-brand hover:shadow-md"
                }`}
              >
                5 or More
                <span className="mt-1 block text-[11px] font-normal opacity-80">
                  Find your plan →
                </span>
              </button>
            </div>
          </div>

          {/* Micro view */}
          {view === "micro" && (
            <div className="mt-14">
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-border bg-surface px-5 py-4">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Managed Micro</strong> is our all-inclusive
                  package for small offices. Everything bundled into one simple monthly rate per
                  person — no per-device math, no surprises. As your team grows past 4 people,
                  you'll naturally move to our per-device plans with even more security.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {microPlans.map((p) => (
                  <PlanCard
                    key={p.name}
                    plan={p}
                    onContact={() => setLeadCtx({ kind: "micro", plan: `${p.tier} — ${p.name}` })}
                  />
                ))}
              </div>

              <div className="mt-6 border-t border-border pt-4 text-center">
                <button
                  onClick={() => setView("calc")}
                  className="text-sm text-brand hover:underline"
                >
                  Growing past 4 people? Find your plan →
                </button>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Month-to-month · One-time onboarding fee = first month · Off-hours support $250/hr
              </p>
            </div>
          )}

          {/* Calculator view */}
          {view === "calc" && (
            <div className="mt-14">
              <PricingCalculator
                onBackToMicro={() => setView("micro")}
                onSchedule={(ctx) => setLeadCtx(ctx)}
              />
              <p className="mt-4 text-center text-xs text-muted-foreground">
                All plans month-to-month · Onboarding fee = first month · Off-hours $250/hr
              </p>
            </div>
          )}
        </div>
      </section>

      <PricingLeadModal
        open={leadCtx !== null}
        onOpenChange={(o) => !o && setLeadCtx(null)}
        context={leadCtx}
      />
    </SiteShell>
  );
}

function PlanCard({ plan, onContact }: { plan: (typeof microPlans)[number]; onContact: () => void }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-background p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
        {plan.tier}
      </p>
      <p className="mt-1 font-display text-xl font-semibold tracking-[-0.02em]">{plan.name}</p>
      <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">{plan.tagline}</p>

      <div className="my-5 border-b border-border pb-5">
        <p className="font-display text-3xl font-semibold tracking-[-0.02em]">
          {plan.price}
          <span className="ml-1 text-sm font-normal text-muted-foreground">{plan.per}</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{plan.sub}</p>
      </div>

      <ul className="flex-1 space-y-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[oklch(0.65_0.15_160)]" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <Button asChild variant="outline" className="w-full">
          <Link to="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}

// ---------------- Calculator ----------------

type CalcState = {
  ws: number;
  srv: number;
  users: number;
  m365: boolean;
  google: boolean;
  bec: boolean | null;
  spoof: boolean | null;
  monitor: boolean | null;
  unlimited: boolean | null;
  managed: boolean | null;
};

const INITIAL: CalcState = {
  ws: 10,
  srv: 0,
  users: 10,
  m365: false,
  google: false,
  bec: null,
  spoof: null,
  monitor: null,
  unlimited: null,
  managed: null,
};

const STEP_LABELS = ["Environment", "Cloud", "Security", "Support"] as const;

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString();
}

function PricingCalculator({ onBackToMicro }: { onBackToMicro: () => void }) {
  const [s, setS] = useState<CalcState>(INITIAL);
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const totalSrv = s.srv + (s.m365 ? 1 : 0) + (s.google ? 1 : 0);
  const calcBasic = s.ws * 18 + totalSrv * 150;
  const calcPro =
    s.ws * 45 +
    totalSrv * 150 +
    (s.m365 || s.google ? s.users * 18 + s.users * 4 : 0) +
    (s.bec || s.spoof ? s.users * 5 : 0);
  const calcComplete = s.ws * 125 + totalSrv * 250 + s.users * 30;

  const rec: "basic" | "pro" | "complete" =
    s.unlimited || s.managed
      ? "complete"
      : s.bec || s.spoof || s.monitor
        ? "pro"
        : "basic";

  const adj = (key: "ws" | "srv" | "users", d: number) => {
    const min = key === "srv" ? 0 : 1;
    setS((p) => ({ ...p, [key]: Math.max(min, Math.min(500, p[key] + d)) }));
  };

  const toggleCloud = (t: "m365" | "google" | "none") => {
    setS((p) =>
      t === "none"
        ? { ...p, m365: false, google: false }
        : { ...p, [t]: !p[t] },
    );
  };

  const setYN = (key: keyof CalcState, val: boolean) => {
    setS((p) => ({ ...p, [key]: val }));
  };

  const reset = () => {
    setS(INITIAL);
    setStep(1);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <ResultsView
        s={s}
        totalSrv={totalSrv}
        prices={{ basic: calcBasic, pro: calcPro, complete: calcComplete }}
        rec={rec}
        onReset={reset}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
      {/* Progress */}
      <div className="mb-2 flex items-center">
        {[1, 2, 3, 4].map((n, i) => (
          <div key={n} className="flex flex-1 items-center last:flex-none">
            <div
              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-xs font-medium transition ${
                n === step
                  ? "border-brand bg-brand text-white ring-4 ring-brand/20"
                  : n < step
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-surface text-muted-foreground"
              }`}
            >
              {n}
            </div>
            {i < 3 && <div className="h-px flex-1 bg-border" />}
          </div>
        ))}
      </div>
      <div className="mb-6 grid grid-cols-4 text-center">
        {STEP_LABELS.map((l, i) => (
          <span
            key={l}
            className={`text-[10px] ${i + 1 === step ? "font-medium text-brand" : "text-muted-foreground"}`}
          >
            {l}
          </span>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h3 className="text-base font-medium">Tell us about your environment</h3>
          <p className="mb-5 mt-1 text-xs text-muted-foreground">
            Physical servers only here — we'll ask about cloud services next.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <NumInput
              label="Workstations"
              value={s.ws}
              hint="Desktops & laptops"
              onAdj={(d) => adj("ws", d)}
            />
            <NumInput
              label="Physical Servers"
              value={s.srv}
              hint="In-office servers only"
              onAdj={(d) => adj("srv", d)}
            />
            <NumInput
              label="Users / Employees"
              value={s.users}
              hint="People who need support"
              onAdj={(d) => adj("users", d)}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-base font-medium">What cloud services does your office use?</h3>
          <p className="mb-5 mt-1 text-xs text-muted-foreground">
            Cloud environments like Microsoft 365 and Google Workspace require the same ongoing
            management as a physical server — we price them the same way.
          </p>
          <div className="mb-3 grid gap-3 sm:grid-cols-3">
            <CloudCard
              icon={<Mail className="h-6 w-6" />}
              name="Microsoft 365"
              hint="Email, Teams, SharePoint"
              selected={s.m365}
              onClick={() => toggleCloud("m365")}
            />
            <CloudCard
              icon={<Cloud className="h-6 w-6" />}
              name="Google Workspace"
              hint="Gmail, Drive, Meet"
              selected={s.google}
              onClick={() => toggleCloud("google")}
            />
            <CloudCard
              icon={<CloudOff className="h-6 w-6" />}
              name="Neither"
              hint="No cloud office suite"
              selected={!s.m365 && !s.google}
              onClick={() => toggleCloud("none")}
            />
          </div>
          <div className="rounded-lg bg-surface px-4 py-3 text-xs text-muted-foreground">
            <strong className="text-foreground">Select all that apply.</strong> Each cloud
            environment adds one cloud/server unit to your estimate.
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-base font-medium">What are your security priorities?</h3>
          <p className="mb-5 mt-1 text-xs text-muted-foreground">
            Answer yes or no for each. These determine whether Managed Pro is the right fit.
          </p>
          <div className="space-y-2.5">
            <YNCard
              label="Business Email Compromise"
              desc="Criminals impersonate your employees or vendors via email to trick people into wiring money or sharing sensitive data. The #1 financial threat to small businesses."
              value={s.bec}
              onSet={(v) => setYN("bec", v)}
            />
            <YNCard
              label="Email Spoofing Protection"
              desc="Someone sends emails that look like they came from your domain — damaging your reputation and potentially defrauding your clients or vendors."
              value={s.spoof}
              onSet={(v) => setYN("spoof", v)}
            />
            <YNCard
              label="24/7 Threat Monitoring"
              desc="A security team actively watches your systems and accounts around the clock — detecting and responding to threats even while your office is closed."
              value={s.monitor}
              onSet={(v) => setYN("monitor", v)}
            />
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 className="text-base font-medium">How do you want to work with us?</h3>
          <p className="mb-5 mt-1 text-xs text-muted-foreground">
            These two questions determine whether Managed Complete is the right fit.
          </p>
          <div className="space-y-2.5">
            <YNCard
              label="No surprise hourly charges at month end"
              desc="You'd prefer unlimited remote and onsite support included in your monthly rate — no hourly billing no matter how much support you need."
              value={s.unlimited}
              onSet={(v) => setYN("unlimited", v)}
            />
            <YNCard
              label="A fully managed IT department on-call"
              desc="You want all the capability of an in-house IT team — strategic planning, quarterly reviews, always available — without hiring full-time staff."
              value={s.managed}
              onSet={(v) => setYN("managed", v)}
            />
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        {step > 1 ? (
          <button
            onClick={() => setStep((n) => n - 1)}
            className="rounded-md border border-border bg-background px-4 py-2 text-xs text-muted-foreground hover:border-brand hover:text-foreground"
          >
            ← Back
          </button>
        ) : (
          <button
            onClick={onBackToMicro}
            className="text-xs text-muted-foreground hover:text-brand"
          >
            ← Fewer than 5 people?
          </button>
        )}
        <button
          onClick={() => (step < 4 ? setStep(step + 1) : setShowResults(true))}
          className="rounded-md bg-brand px-5 py-2 text-xs font-medium text-white hover:opacity-90"
        >
          {step < 4 ? "Continue →" : "See my estimate →"}
        </button>
      </div>
    </div>
  );
}

function NumInput({
  label,
  value,
  hint,
  onAdj,
}: {
  label: string;
  value: number;
  hint: string;
  onAdj: (d: number) => void;
}) {
  return (
    <div className="rounded-lg bg-surface p-4 text-center">
      <div className="mb-2 text-xs font-medium text-muted-foreground">{label}</div>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => onAdj(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-lg leading-none hover:border-brand"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <div className="min-w-[40px] text-2xl font-semibold">{value}</div>
        <button
          onClick={() => onAdj(1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-lg leading-none hover:border-brand"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
      <div className="mt-1.5 text-[10px] text-muted-foreground">{hint}</div>
    </div>
  );
}

function CloudCard({
  icon,
  name,
  hint,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  name: string;
  hint: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border p-4 text-center transition ${
        selected
          ? "border-2 border-brand bg-brand/5"
          : "border-border bg-surface hover:border-brand"
      }`}
    >
      <div
        className={`mx-auto mb-2 flex justify-center ${selected ? "text-brand" : "text-muted-foreground"}`}
      >
        {icon}
      </div>
      <div className="text-sm font-medium text-foreground">{name}</div>
      <div className="mt-0.5 text-[10px] text-muted-foreground">{hint}</div>
    </button>
  );
}

function YNCard({
  label,
  desc,
  value,
  onSet,
}: {
  label: string;
  desc: string;
  value: boolean | null;
  onSet: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-4">
      <div className="flex-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</div>
      </div>
      <div className="flex flex-shrink-0 gap-1.5">
        <button
          onClick={() => onSet(true)}
          className={`rounded-md px-4 py-1.5 text-xs font-medium transition ${
            value === true
              ? "border-2 border-[oklch(0.55_0.15_160)] bg-[oklch(0.55_0.15_160)] text-white"
              : "border border-border bg-surface text-muted-foreground hover:border-brand"
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => onSet(false)}
          className={`rounded-md px-4 py-1.5 text-xs font-medium transition ${
            value === false
              ? "border-2 border-brand bg-brand/10 text-brand"
              : "border border-border bg-surface text-muted-foreground hover:border-brand"
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
}

// ---------------- Results ----------------

const TIER_NAMES = {
  basic: "Managed Basic",
  pro: "Managed Pro",
  complete: "Managed Complete",
} as const;
const TIER_TAGS = {
  basic: "Essential protection & monitoring",
  pro: "Full security + server management",
  complete: "Fully managed IT — unlimited support",
} as const;
const TIER_NOTES = {
  basic:
    "Help desk billed at $150/hr. M365 licensing managed separately. No 24/7 security monitoring.",
  pro: "Includes Huntress MDR + 24/7 SOC, DMARC/DKIM, M365 ITDR, 1 hr/server/mo. Out-of-scope T&M at $150/hr.",
  complete:
    "Unlimited onsite & remote support. Includes ThreatLocker, AVANON, Huntress SAT, quarterly reviews. Managed network & VM backup quoted separately.",
} as const;

type Tier = "basic" | "pro" | "complete";

function ResultsView({
  s,
  totalSrv,
  prices,
  rec,
  onReset,
}: {
  s: CalcState;
  totalSrv: number;
  prices: Record<Tier, number>;
  rec: Tier;
  onReset: () => void;
}) {
  const cloudDesc = [s.m365 && "Microsoft 365", s.google && "Google Workspace"]
    .filter(Boolean)
    .join(" + ");

  const buildRows = (tier: Tier): Array<[string, string, boolean]> => {
    const rows: Array<[string, string, boolean]> = [];
    const srvLbl = (n: number) =>
      n === 1 ? "1 cloud/server unit" : `${n} cloud/server units`;
    if (tier === "basic") {
      rows.push([`${s.ws} workstations × $18`, fmt(s.ws * 18), false]);
      if (totalSrv > 0)
        rows.push([`${srvLbl(totalSrv)} × $150`, fmt(totalSrv * 150), false]);
    } else if (tier === "pro") {
      rows.push([`${s.ws} workstations × $45`, fmt(s.ws * 45), false]);
      if (totalSrv > 0)
        rows.push([`${srvLbl(totalSrv)} × $150`, fmt(totalSrv * 150), false]);
      if (s.m365 || s.google) {
        rows.push([`${s.users} users — M365 licensing × $18`, fmt(s.users * 18), false]);
        rows.push([`${s.users} users — M365 backup × $4`, fmt(s.users * 4), false]);
      }
      if (s.bec || s.spoof)
        rows.push([`${s.users} users — email security × $5`, fmt(s.users * 5), false]);
    } else {
      rows.push([`${s.ws} workstations × $125`, fmt(s.ws * 125), false]);
      if (totalSrv > 0)
        rows.push([`${srvLbl(totalSrv)} × $250`, fmt(totalSrv * 250), false]);
      rows.push([`${s.users} users × $30 (M365 + backup)`, fmt(s.users * 30), false]);
    }
    rows.push(["Total estimate", fmt(prices[tier]), true]);
    return rows;
  };

  return (
    <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
      <div className="mb-5">
        <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
          Your managed services estimate
        </div>
        <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em]">
          Here's what we recommend
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Pricing subject to final onboarding discovery. All plans are month-to-month.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-4 rounded-lg bg-surface px-4 py-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Monitor className="h-4 w-4 text-brand" />
          <strong className="text-foreground">{s.ws}</strong> workstation{s.ws !== 1 && "s"}
        </div>
        {totalSrv > 0 && (
          <div className="flex items-center gap-1.5">
            <Server className="h-4 w-4 text-brand" />
            <strong className="text-foreground">{totalSrv}</strong> cloud/server unit
            {totalSrv !== 1 && "s"}
            {cloudDesc && <span> ({cloudDesc})</span>}
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-brand" />
          <strong className="text-foreground">{s.users}</strong> user{s.users !== 1 && "s"}
        </div>
      </div>

      <div className="mb-5 grid gap-3 lg:grid-cols-3">
        {(["basic", "pro", "complete"] as Tier[]).map((tier) => {
          const isRec = tier === rec;
          const rows = buildRows(tier);
          return (
            <div
              key={tier}
              className={`flex flex-col rounded-2xl p-5 ${
                isRec ? "border-2 border-brand bg-brand/5" : "border border-border"
              }`}
            >
              {isRec && (
                <span className="mb-2 inline-block w-fit rounded-md bg-brand px-2 py-0.5 text-[10px] font-medium text-white">
                  Recommended
                </span>
              )}
              <div className="text-sm font-medium">{TIER_NAMES[tier]}</div>
              <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {TIER_TAGS[tier]}
              </div>
              <div
                className={`mt-3 font-display text-2xl font-semibold ${isRec ? "text-brand" : ""}`}
              >
                {fmt(prices[tier])}
              </div>
              <div className="text-[11px] text-muted-foreground">/month estimated</div>
              <ul className="mt-3 border-t border-border pt-3">
                {rows.map(([lbl, val, isTotal], i) => (
                  <li
                    key={i}
                    className={`flex justify-between gap-2 py-0.5 text-[11px] ${
                      isTotal
                        ? `mt-1 border-t border-border pt-2 font-semibold ${isRec ? "text-brand" : "text-foreground"}`
                        : isRec
                          ? "text-brand/80"
                          : "text-muted-foreground"
                    }`}
                  >
                    <span>{lbl}</span>
                    <span>{val}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-3 text-[10px] leading-relaxed text-muted-foreground">
                {TIER_NOTES[tier]}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-4 rounded-lg bg-surface p-4">
        <div className="mb-2 text-xs font-medium">What happens next</div>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <Phone className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand" />
            We'll schedule a 30-minute discovery call to confirm device counts, software, and
            backup requirements.
          </li>
          <li className="flex items-start gap-2">
            <ClipboardCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand" />
            We'll run a free network health check and provide a final itemized proposal.
          </li>
          <li className="flex items-start gap-2">
            <Calendar className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand" />
            Onboarding can typically begin within 5–10 business days of signing.
          </li>
          <li className="flex items-start gap-2">
            <Receipt className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand" />
            One-time onboarding fee equal to your first month's recurring total.
          </li>
        </ul>
      </div>

      <div className="flex gap-2">
        <Button asChild className="flex-1">
          <Link to="/contact">Schedule a discovery call →</Link>
        </Button>
        <Button variant="outline" onClick={onReset} className="flex-1">
          ← Start over
        </Button>
      </div>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Estimates based on standard pricing. Off-hours support billed at $250/hr.
      </p>
    </div>
  );
}
