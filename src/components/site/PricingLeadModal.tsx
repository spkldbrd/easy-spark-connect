import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send, Check } from "lucide-react";
import { sendPricingLead } from "@/lib/pricing-lead.functions";

const RECAPTCHA_SITE_KEY = "6LfWyfIsAAAAANqSnCCHSeSfC4EHLFA_1CsiZ4BG";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

export type LeadContext =
  | { kind: "micro"; plan: string }
  | {
      kind: "calc";
      plan: string;
      monthlyEstimate: string;
      summary: string[];
    };

export function PricingLeadModal({
  open,
  onOpenChange,
  context,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  context: LeadContext | null;
}) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const send = useServerFn(sendPricingLead);

  useEffect(() => {
    if (!open) return;
    if (document.querySelector(`script[src*="recaptcha/api.js"]`)) return;
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setSent(false);
      setError(null);
      setSubmitting(false);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || !context) return;
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      if (!window.grecaptcha) throw new Error("reCAPTCHA not loaded yet — try again in a moment.");
      const token: string = await new Promise((resolve, reject) => {
        window.grecaptcha!.ready(() => {
          window.grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action: "pricing_lead" }).then(resolve, reject);
        });
      });
      await send({
        data: {
          name: String(fd.get("name") || ""),
          business: String(fd.get("business") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          message: String(fd.get("message") || ""),
          recaptchaToken: token,
          lead: {
            kind: context.kind,
            plan: context.plan,
            monthlyEstimate: context.kind === "calc" ? context.monthlyEstimate : "",
            summary: context.kind === "calc" ? context.summary : [],
          },
        },
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error && err.message.includes("reCAPTCHA")
          ? err.message
          : "Something went wrong. Please call 805-466-4722 or email hello@digitalsolution.com.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        {sent ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.02em]">Got it — talk soon.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll reach out within one business hour to schedule your discovery call.
            </p>
            <Button className="mt-6" onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Schedule a discovery call</DialogTitle>
              <DialogDescription>
                {context?.kind === "calc"
                  ? `We'll review your estimate for ${context.plan} and confirm details.`
                  : context
                    ? `We'll follow up about ${context.plan}.`
                    : ""}
              </DialogDescription>
            </DialogHeader>

            {context?.kind === "calc" && context.summary.length > 0 && (
              <div className="rounded-lg border border-border bg-surface p-3 text-xs">
                <div className="mb-1 font-medium text-foreground">
                  {context.plan}{" "}
                  {context.monthlyEstimate && (
                    <span className="text-brand">· {context.monthlyEstimate}/mo</span>
                  )}
                </div>
                <ul className="space-y-0.5 text-muted-foreground">
                  {context.summary.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Business" name="business" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <div>
                <label htmlFor="lead-message" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Anything we should know? <span className="font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  rows={3}
                  maxLength={2000}
                  className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                />
              </div>
              {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Sending…" : (<>Send request <Send className="ml-2 h-4 w-4" /></>)}
              </Button>
              <p className="text-center text-[10px] text-muted-foreground">
                Protected by reCAPTCHA. We reply within one business hour.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
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
  const id = `lead-${name}`;
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
        className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
      />
    </div>
  );
}
