export const DEFAULT_RECIPIENT_EMAIL = "abdulmaliksuleman75@gmail.com";
export const DEFAULT_FROM_EMAIL = "Sule Malik Portfolio <onboarding@resend.dev>";
export const RESEND_API_URL = "https://api.resend.com/emails";

export interface InquiryPayload {
  name: string;
  email: string;
  company?: string | undefined;
  serviceType?: string | undefined;
  timeline?: string | undefined;
  message: string;
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatReadableTimestamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(date);
}

export function buildInquiryEmail(
  data: InquiryPayload,
  options?: {
    from?: string | undefined;
    to?: string | undefined;
    submittedAt?: string | undefined;
  },
) {
  const from = options?.from?.trim() || DEFAULT_FROM_EMAIL;
  const to = options?.to?.trim() || DEFAULT_RECIPIENT_EMAIL;
  const submittedAt = options?.submittedAt || new Date().toISOString();
  const formattedTime = formatReadableTimestamp(submittedAt);
  const topic = data.serviceType || "Portfolio Enquiry";
  const timeline = data.timeline || "Not specified";
  const subject = `New enquiry: ${topic} — ${data.name}`;

  const textLines = [
    "SULE MALIK — New Portfolio Enquiry (www.sulemalik.com)",
    "======================================================",
    "",
    `Topic: ${topic}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    ...(data.company ? [`Organisation: ${data.company}`] : []),
    `Timeline: ${timeline}`,
    `Submitted: ${formattedTime}`,
    "",
    "What they're trying to achieve:",
    data.message,
    "",
    `Reply directly to this email to respond to ${data.name} (${data.email}).`,
  ];

  const htmlMessage = escapeHtml(data.message).replace(/\r?\n/g, "<br />");
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeTopic = escapeHtml(topic);
  const safeTimeline = escapeHtml(timeline);
  const safeCompany = data.company ? escapeHtml(data.company) : "";
  const safeTime = escapeHtml(formattedTime);
  const replyHref = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: ${topic}`)}`;

  const subtitle = safeCompany
    ? `From <strong style="color:#111827;font-weight:600;">${safeName}</strong> &middot; ${safeCompany}`
    : `From <strong style="color:#111827;font-weight:600;">${safeName}</strong>`;

  const companyRow = safeCompany
    ? `<tr>
        <td align="left" style="padding:10px 0;border-bottom:1px solid #f1efe8;color:#71717a;font-size:13px;width:130px;vertical-align:top;">Organisation</td>
        <td align="right" style="padding:10px 0;border-bottom:1px solid #f1efe8;color:#111827;font-size:14px;font-weight:500;">${safeCompany}</td>
      </tr>`
    : "";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;width:100%;background-color:#f5f4ef;-webkit-font-smoothing:antialiased;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      ${safeName} sent a ${safeTopic} enquiry via sulemalik.com
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f4ef" style="width:100%;background-color:#f5f4ef;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:36px 16px 40px;">
          <table role="presentation" align="center" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;border-collapse:collapse;">
            <!-- Brand Wordmark Bar -->
            <tr>
              <td style="padding:0 4px 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                  <tr>
                    <td align="left" style="font-size:13px;font-weight:700;letter-spacing:0.12em;color:#111827;text-transform:uppercase;">
                      SULE MALIK<span style="color:#2563eb;">.</span>
                    </td>
                    <td align="right" style="font-size:11px;font-weight:600;letter-spacing:0.1em;color:#71717a;text-transform:uppercase;">
                      Portfolio Enquiry
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Main Centered Card -->
            <tr>
              <td bgcolor="#ffffff" style="background-color:#ffffff;border:1px solid #e6e3da;border-radius:16px;overflow:hidden;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
                  <!-- Top Accent Bar -->
                  <tr>
                    <td style="height:4px;line-height:4px;font-size:4px;background-color:#2563eb;">&nbsp;</td>
                  </tr>

                  <!-- Card Header -->
                  <tr>
                    <td align="left" style="padding:28px 32px 22px;border-bottom:1px solid #f1efe8;">
                      <p style="margin:0 0 8px;font-size:11px;line-height:1.4;letter-spacing:0.14em;text-transform:uppercase;color:#2563eb;font-weight:700;">
                        New Enquiry
                      </p>
                      <h1 style="margin:0 0 8px;font-size:24px;line-height:1.25;font-weight:600;letter-spacing:-0.02em;color:#111827;">
                        ${safeTopic}
                      </h1>
                      <p style="margin:0;font-size:14px;line-height:1.5;color:#52525b;">
                        ${subtitle}
                      </p>
                    </td>
                  </tr>

                  <!-- Structured Details -->
                  <tr>
                    <td align="left" style="padding:18px 32px 6px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
                        <tr>
                          <td align="left" style="padding:10px 0;border-bottom:1px solid #f1efe8;color:#71717a;font-size:13px;width:130px;vertical-align:top;">Sender</td>
                          <td align="right" style="padding:10px 0;border-bottom:1px solid #f1efe8;color:#111827;font-size:14px;font-weight:600;">${safeName}</td>
                        </tr>
                        <tr>
                          <td align="left" style="padding:10px 0;border-bottom:1px solid #f1efe8;color:#71717a;font-size:13px;width:130px;vertical-align:top;">Reply email</td>
                          <td align="right" style="padding:10px 0;border-bottom:1px solid #f1efe8;font-size:14px;">
                            <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;font-weight:500;">${safeEmail}</a>
                          </td>
                        </tr>
                        ${companyRow}
                        <tr>
                          <td align="left" style="padding:10px 0;border-bottom:1px solid #f1efe8;color:#71717a;font-size:13px;width:130px;vertical-align:top;">Timeline</td>
                          <td align="right" style="padding:10px 0;border-bottom:1px solid #f1efe8;color:#111827;font-size:14px;font-weight:500;">${safeTimeline}</td>
                        </tr>
                        <tr>
                          <td align="left" style="padding:10px 0;color:#71717a;font-size:13px;width:130px;vertical-align:top;">Submitted</td>
                          <td align="right" style="padding:10px 0;color:#52525b;font-size:13px;">${safeTime}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Message Box -->
                  <tr>
                    <td align="left" style="padding:18px 32px 24px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#faf9f5" style="width:100%;background-color:#faf9f5;border:1px solid #ece9df;border-radius:12px;border-collapse:separate;">
                        <tr>
                          <td align="left" style="padding:18px 20px;">
                            <p style="margin:0 0 10px;font-size:11px;line-height:1.4;letter-spacing:0.13em;text-transform:uppercase;color:#71717a;font-weight:700;">
                              What they&apos;re trying to achieve
                            </p>
                            <p style="margin:0;font-size:15px;line-height:1.7;color:#1f2937;">
                              ${htmlMessage}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Primary Reply CTA -->
                  <tr>
                    <td align="center" style="padding:0 32px 32px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;border-collapse:collapse;">
                        <tr>
                          <td align="center" bgcolor="#2563eb" style="background-color:#2563eb;border-radius:10px;">
                            <a href="${replyHref}" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                              Reply to ${safeName} &rarr;
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Centered Footer -->
            <tr>
              <td align="center" style="padding:20px 16px 0;font-size:12px;line-height:1.6;color:#71717a;">
                Sent via <a href="https://www.sulemalik.com/contact" style="color:#52525b;text-decoration:underline;">www.sulemalik.com/contact</a>
                <br />
                Hit Reply in Gmail to respond directly to ${safeName} (${safeEmail}).
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return {
    from,
    to: [to],
    reply_to: data.email,
    subject,
    html,
    text: textLines.join("\n"),
  };
}

export async function sendInquiryEmailViaResend(
  data: InquiryPayload,
  config: {
    apiKey: string;
    from?: string | undefined;
    to?: string | undefined;
    submittedAt?: string | undefined;
    fetchImpl?: typeof fetch | undefined;
  },
): Promise<{ id?: string | undefined }> {
  const payload = buildInquiryEmail(data, {
    from: config.from,
    to: config.to,
    submittedAt: config.submittedAt,
  });

  const fetcher = config.fetchImpl ?? fetch;
  const response = await fetcher(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Resend API error (${response.status}): ${errorText || response.statusText}`);
  }

  const body = (await response.json().catch(() => ({}))) as { id?: string };
  return { id: body.id };
}
