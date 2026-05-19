import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(150).optional().default(""),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(1).max(5000),
});

const TO = "william@digitalsolution.com";
const FROM = "Digital Solution Website <william@digitalsolution.com>";

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.SMTP2GO_API_KEY;
    if (!apiKey) throw new Error("SMTP2GO_API_KEY is not configured");

    const text = `New contact form submission

Name: ${data.name}
Company: ${data.company || "-"}
Email: ${data.email}
Phone: ${data.phone || "-"}

Message:
${data.message}
`;

    const html = `<h2>New contact form submission</h2>
<p><strong>Name:</strong> ${escape(data.name)}<br/>
<strong>Company:</strong> ${escape(data.company || "-")}<br/>
<strong>Email:</strong> ${escape(data.email)}<br/>
<strong>Phone:</strong> ${escape(data.phone || "-")}</p>
<p><strong>Message:</strong></p>
<p>${escape(data.message).replace(/\n/g, "<br/>")}</p>`;

    const res = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Smtp2go-Api-Key": apiKey },
      body: JSON.stringify({
        sender: FROM,
        to: [TO],
        reply_to: data.email,
        subject: `New contact from ${data.name}${data.company ? ` (${data.company})` : ""}`,
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
