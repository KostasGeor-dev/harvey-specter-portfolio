"use server";

import { Resend } from "resend";
import { headers } from "next/headers";

export type ContactState = {
  success: boolean;
  error?: string;
} | null;

const resend = new Resend(process.env.RESEND_API_KEY);

// ── In-memory rate limiter (3 submissions / IP / minute) ──────────────────────
// Resets per process; sufficient for a portfolio site.
const _attempts = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now    = Date.now();
  const WINDOW = 60_000; // 1 minute
  const LIMIT  = 3;
  const entry  = _attempts.get(ip);
  if (!entry || now > entry.reset) {
    _attempts.set(ip, { count: 1, reset: now + WINDOW });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count++;
  return true;
}

const VALID_SERVICES = [
  "Brand Discovery",
  "Web Design & Dev",
  "Marketing",
  "Photography",
  "Other",
  "",
];

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // ── Rate limiting ────────────────────────────────────────────────────────────
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return { success: false, error: "Too many requests. Please try again in a minute." };
  }

  // ── Input extraction ─────────────────────────────────────────────────────────
  const name    = ((formData.get("name")    as string) ?? "").trim();
  const email   = ((formData.get("email")   as string) ?? "").trim();
  const service = ((formData.get("service") as string) ?? "").trim();
  const message = ((formData.get("message") as string) ?? "").trim();

  // ── Presence validation ──────────────────────────────────────────────────────
  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  // ── Length limits ────────────────────────────────────────────────────────────
  if (name.length > 100) {
    return { success: false, error: "Name must be 100 characters or fewer." };
  }
  if (email.length > 254) {
    return { success: false, error: "Email address is too long." };
  }
  if (message.length > 5000) {
    return { success: false, error: "Message must be 5 000 characters or fewer." };
  }

  // ── Format validation ────────────────────────────────────────────────────────
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // ── Service allowlist ────────────────────────────────────────────────────────
  if (!VALID_SERVICES.includes(service)) {
    return { success: false, error: "Invalid service selection." };
  }

  // ── Send ─────────────────────────────────────────────────────────────────────
  const to = process.env.CONTACT_EMAIL ?? "k.geor73@gmail.com";

  const { error } = await resend.emails.send({
    from: "H.Studio Contact <onboarding@resend.dev>",
    to:   [to],
    replyTo: email,
    subject: `New message from ${name} — H.Studio`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f3f3f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f3f3;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:560px;background:#ffffff;border-radius:4px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#111111;padding:32px 40px;">
              <p style="margin:0;color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-family:monospace;">
                [ H.Studio — Contact ]
              </p>
              <p style="margin:12px 0 0;color:#ffffff;font-size:28px;font-weight:300;letter-spacing:-0.04em;line-height:1.1;">
                New message
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:24px;border-bottom:1px solid #e8e8e8;">
                    <p style="margin:0 0 4px;color:#888;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;font-family:monospace;">From</p>
                    <p style="margin:0;color:#111;font-size:16px;letter-spacing:-0.02em;">${escapeHtml(name)}</p>
                    <a href="mailto:${escapeHtml(email)}" style="color:#111;font-size:14px;letter-spacing:-0.02em;text-decoration:none;opacity:0.6;">${escapeHtml(email)}</a>
                  </td>
                </tr>

                ${service ? `
                <tr>
                  <td style="padding:24px 0;border-bottom:1px solid #e8e8e8;">
                    <p style="margin:0 0 4px;color:#888;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;font-family:monospace;">Service</p>
                    <p style="margin:0;color:#111;font-size:16px;letter-spacing:-0.02em;">${escapeHtml(service)}</p>
                  </td>
                </tr>` : ""}

                <tr>
                  <td style="padding-top:24px;">
                    <p style="margin:0 0 12px;color:#888;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;font-family:monospace;">Message</p>
                    <p style="margin:0;color:#1f1f1f;font-size:16px;line-height:1.6;letter-spacing:-0.02em;white-space:pre-wrap;">${escapeHtml(message)}</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f8f8;padding:24px 40px;border-top:1px solid #e8e8e8;">
              <p style="margin:0;color:#aaa;font-size:11px;letter-spacing:-0.02em;">
                Reply directly to this email to respond to ${escapeHtml(name)}.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  });

  if (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }

  return { success: true };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
