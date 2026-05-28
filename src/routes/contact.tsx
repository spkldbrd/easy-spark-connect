import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { buildSeo, SITE } from "@/lib/seo";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendContactMessage } from "@/lib/contact.functions";

const RECAPTCHA_SITE_KEY = "6LfWyfIsAAAAANqSnCCHSeSfC4EHLFA_1CsiZ4BG";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

export const Route = createFileRoute("/contact")({
  head: () =>
    buildSeo({
      title: "Contact — Talk to a Human",
      description:
        "Reach the Digital Solution team in San Luis Obispo. Call, email, or schedule a free 30-minute IT consultation. No bots, no queues.",
      path: "/contact",
      image: "https://digitalsolution.com/og-image.jpg",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Digital Solution",
          url: "https://digitalsolution.com/contact",
        },
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Digital Solution",
          url: "https://digitalsolution.com",
          telephone: "805-466-4722",
          email: "hello@digitalsolution.com",
          openingHours: "Mo-Fr 08:00-17:00",
          address: {
            "@type": "PostalAddress",
            streetAddress: "7700 Santa Ynez Ave",
            addressLocality: "Atascadero",
            addressRegion: "CA",
            postalCode: "93422",
            addressCountry: "US",
          },
        },
      ],
    }),
  component: ContactPage,
});

const directs = [
  { icon: Phone, label: "Call us", value: "805-466-4722", href: "tel:+18054664722" },
  { icon: Mail, label: "Email", value: "hello@digitalsolution.com", href: "mailto:hello@digitalsolution.com" },
  { icon: Clock, label: "Hours", value: "8am to 5pm Monday - Friday " },
  { icon: Clock, label: "Emergency", value: "24/7 Emergency Support" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const send = useServerFn(sendContactMessage);

  useEffect(() => {
    if (document.querySelector(`script[src*="recaptcha/api.js"]`)) return;
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      if (!window.grecaptcha) throw new Error("reCAPTCHA not loaded yet — try again in a moment.");
      const recaptchaToken: string = await new Promise((resolve, reject) => {
        window.grecaptcha!.ready(() => {
          window.grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action: "contact" }).then(resolve, reject);
        });
      });
      await send({
        data: {
          name: String(fd.get("name") || ""),
          company: String(fd.get("company") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          message: String(fd.get("message") || ""),
          recaptchaToken,
        },
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error && err.message.includes("reCAPTCHA") ? err.message : "Something went wrong. Please call or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <SiteShell overDark>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to
            <br />
            <span className="bg-gradient-to-r from-white via-cyan to-[oklch(0.7_0.18_220)] bg-clip-text text-transparent">
              a human.
            </span>
          </>
        }
        subtitle="Tell us a bit about your business and we'll get back to you within one business hour."
        meta={["Reply within 1 hour", "No call queues", "No bots", "SLO County"]}
      />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Direct contact column */}
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Reach us directly</span>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Prefer to skip the form?
              </h2>
              <p className="mt-5 text-muted-foreground">
                We answer the phone. We answer email. We are humans, in San Luis Obispo, who would genuinely like to hear from you.
              </p>
              <ul className="mt-12 divide-y divide-border border-y border-border">
                {directs.map((d) => (
                  <li key={d.label} className="flex items-start gap-5 py-6">
                    <d.icon className="mt-1 h-5 w-5 shrink-0 text-brand" />
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        {d.label}
                      </div>
                      <div className="mt-1 font-display text-lg font-medium tracking-[-0.02em]">
                        {d.href ? (
                          <a href={d.href} className="hover:text-brand">{d.value}</a>
                        ) : (
                          d.value
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form column */}
            <div className="lg:col-span-7">
              <div className="rounded-[2rem] border border-border bg-card p-10 sm:p-12">
                {sent ? (
                  <div className="py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
                      <Send className="h-6 w-6" />
                    </div>
                    <h3 className="mt-8 font-display text-3xl font-semibold tracking-[-0.03em]">Message sent.</h3>
                    <p className="mt-3 text-muted-foreground">We'll be in touch within one business hour.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Name" name="name" required />
                      <Field label="Company" name="company" />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Email" name="email" type="email" required />
                      <Field label="Phone" name="phone" type="tel" />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        How can we help?
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        maxLength={5000}
                        className="mt-3 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring focus:ring-2"
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-destructive" role="alert">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-background transition hover:bg-brand disabled:opacity-60"
                    >
                      {submitting ? "Sending…" : (<>Send message <Send className="h-4 w-4" /></>)}
                    </button>
                  </form>

                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring focus:ring-2"
      />
    </div>
  );
}
