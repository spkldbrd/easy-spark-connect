import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  kind: z.enum(["micro", "calc"]),
  plan: z.string().min(1).max(120),
  monthlyEstimate: z.string().max(40).optional().default(""),
  summary: z.array(z.string().max(200)).max(40).optional().default([]),
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  business: z.string().trim().max(150).optional().default(""),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  recaptchaToken: z.string().min(10).max(4000),
  lead: leadSchema,
});

const TO = "william@digitalsolution.com";
const FROM = "Digital Solution Website <william@digitalsolution.com>";

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export const sendPricingLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.SMTP2GO_API_KEY;
    if (!apiKey) throw new Error("SMTP2GO_API_KEY is not configured");
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) throw new Error("RECAPTCHA_SECRET_KEY is not configured");

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: recaptchaSecret, response: data.recaptchaToken }),
    });
    const verify = (await verifyRes.json().catch(() => ({}))) as {
      success?: boolean;
      score?: number;
      action?: string;
    };
    if (!verify.success || (typeof verify.score === "number" && verify.score < 0.5) || (verify.action && verify.action !== "pricing_lead")) {
      console.warn("reCAPTCHA rejected", verify);
      throw new Error("reCAPTCHA verification failed");
    }

    const summaryLines = data.lead.summary.length ? data.lead.summary.map((l) => `  • ${l}`).join("\n") : "  (none)";
    const text = `New pricing lead

Source: ${data.lead.kind === "micro" ? "Managed Micro card" : "Pricing calculator"}
Plan of interest: ${data.lead.plan}
${data.lead.monthlyEstimate ? `Monthly estimate: ${data.lead.monthlyEstimate}\n` : ""}
Name: ${data.name}
Business: ${data.business || "-"}
Email: ${data.email}
Phone: ${data.phone || "-"}

Message:
${data.message || "(none)"}

Calculator summary:
${summaryLines}
`;

    const summaryHtml = data.lead.summary.length
      ? `<ul>${data.lead.summary.map((l) => `<li>${escape(l)}</li>`).join("")}</ul>`
      : "<p><em>(none)</em></p>";

    const html = `<h2>New pricing lead</h2>
<p><strong>Source:</strong> ${escape(data.lead.kind === "micro" ? "Managed Micro card" : "Pricing calculator")}<br/>
<strong>Plan of interest:</strong> ${escape(data.lead.plan)}${data.lead.monthlyEstimate ? `<br/><strong>Monthly estimate:</strong> ${escape(data.lead.monthlyEstimate)}` : ""}</p>
<p><strong>Name:</strong> ${escape(data.name)}<br/>
<strong>Business:</strong> ${escape(data.business || "-")}<br/>
<strong>Email:</strong> ${escape(data.email)}<br/>
<strong>Phone:</strong> ${escape(data.phone || "-")}</p>
<p><strong>Message:</strong></p>
<p>${escape(data.message || "(none)").replace(/\n/g, "<br/>")}</p>
<p><strong>Calculator summary:</strong></p>
${summaryHtml}`;

    const res = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Smtp2go-Api-Key": apiKey },
      body: JSON.stringify({
        sender: FROM,
        to: [TO],
        reply_to: data.email,
        subject: `New pricing lead from ${data.name}${data.business ? ` (${data.business})` : ""} — ${data.lead.plan}`,
        text_body: text,
        html_body: html,
      }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || (body as any)?.data?.error) {
      console.error("SMTP2GO send failed", res.status, body);
      throw new Error("Failed to send message");
    }
    return { success: true };
  });
