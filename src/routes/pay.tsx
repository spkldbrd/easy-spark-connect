import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/pay")({
  head: () =>
    buildSeo({
      title: "Pay Your Invoice — Digital Solution",
      description:
        "Securely pay your Digital Solution invoice through PayPal — the safer, easier way to pay online.",
      path: "/pay",
      noindex: true,
    }),
  component: PayPage,
});

function PayPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Client payments"
        title="Pay your invoice"
        subtitle="Secure checkout through PayPal — the safer, easier way to pay online. No account required to pay with a credit or debit card."
      />

      <section className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
        <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm sm:p-12">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Invoice payment
          </p>
          <p className="mt-4 text-foreground">
            Click the secure PayPal button below to complete your payment by
            credit card, debit card, or your PayPal account. You'll confirm the
            amount on PayPal's secure page before anything is charged.
          </p>

          <form
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_top"
            className="mt-10"
          >
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="5QY8N68NNUXR6" />
            <input type="hidden" name="currency_code" value="USD" />
            <button
              type="submit"
              name="submit"
              className="inline-flex cursor-pointer items-center justify-center"
              title="PayPal - The safer, easier way to pay online!"
            >
              <img
                src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif"
                alt="Pay now with PayPal or a credit card"
                className="h-auto"
              />
            </button>
          </form>

          <p className="mt-10 text-xs text-muted-foreground">
            Payments are processed by PayPal over an encrypted connection.
            Digital Solution never sees or stores your card details.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
