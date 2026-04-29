import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Talk to a Human | Digital Solution SLO" },
      { name: "description", content: "Reach the Digital Solution team in San Luis Obispo. Phone, email, or schedule a free 30-minute IT consultation." },
      { property: "og:title", content: "Contact | Digital Solution" },
      { property: "og:description", content: "Talk to a real human about your IT — no bots, no queues." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <section className="bg-gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan">Contact</span>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">Talk to a human.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">Tell us a bit about your business and we'll get back to you within one business hour.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-bold">Reach us directly</h2>
            <p className="mt-3 text-muted-foreground">Prefer to skip the form? Here's how to find us.</p>
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow"><Phone className="h-5 w-5" /></div>
                <div><div className="text-sm text-muted-foreground">Call us</div><a href="tel:+18055550100" className="font-semibold">(805) 555-0100</a></div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow"><Mail className="h-5 w-5" /></div>
                <div><div className="text-sm text-muted-foreground">Email</div><a href="mailto:hello@digitalsolution.com" className="font-semibold">hello@digitalsolution.com</a></div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow"><MapPin className="h-5 w-5" /></div>
                <div><div className="text-sm text-muted-foreground">Office</div><div className="font-semibold">1234 Higuera St<br/>San Luis Obispo, CA 93401</div></div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow"><Clock className="h-5 w-5" /></div>
                <div><div className="text-sm text-muted-foreground">Hours</div><div className="font-semibold">Mon–Fri 8am–6pm<br/>24/7 emergency support</div></div>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-3xl border border-border bg-card p-8 shadow-soft"
            >
              {sent ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow"><Send className="h-6 w-6" /></div>
                  <h3 className="mt-6 font-display text-2xl font-bold">Message sent!</h3>
                  <p className="mt-2 text-muted-foreground">We'll be in touch within one business hour.</p>
                </div>
              ) : (
                <div className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" name="name" required />
                    <Field label="Company" name="company" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone" name="phone" type="tel" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">How can we help?</label>
                    <textarea name="message" rows={5} required className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring focus:ring-2" />
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:bg-brand">
                    Send message <Send className="h-4 w-4" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}{required && <span className="text-destructive"> *</span>}</label>
      <input name={name} type={type} required={required} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring focus:ring-2" />
    </div>
  );
}
