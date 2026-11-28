import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_RECIPIENT_EMAIL = "abdulmaliksuleman75@gmail.com";
const DEFAULT_FROM_EMAIL = "Sule Malik Portfolio <onboarding@resend.dev>";
const RESEND_API_URL = "https://api.resend.com/emails";

export interface InquiryPayload {
  name: string;
  email: string;
  company?: string | undefined;
  serviceType?: string | undefined;
  timeline?: string | undefined;
  message: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  deliveredViaEmail: boolean;
  savedToDatabase: boolean;
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
  const topic = data.serviceType || "Portfolio Enquiry";
  const timeline = data.timeline || "Not specified";
  const subject = `New enquiry: ${topic} — ${data.name}`;

  const textLines = [
    "New portfolio enquiry from www.sulemalik.com",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    ...(data.company ? [`Company / Organisation: ${data.company}`] : []),
    `Topic: ${topic}`,
    `Timeline: ${timeline}`,
    `Submitted: ${submittedAt}`,
    "",
    "Overview:",
    data.message,
  ];

  const htmlMessage = escapeHtml(data.message).replace(/\r?\n/g, "<br />");
  const companyRow = data.company
    ? `<tr>
        <td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px;vertical-align:top;">Organisation</td>
        <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:500;">${escapeHtml(data.company)}</td>
      </tr>`
    : "";

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background-color:#f7f6f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:28px 32px 20px;border-bottom:1px solid #f0efe9;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#1d4ed8;font-weight:600;">
            New Portfolio Enquiry
          </p>
          <h1 style="margin:0;font-size:22px;line-height:1.3;font-weight:600;color:#111827;">
            ${escapeHtml(topic)}
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px;vertical-align:top;">Name</td>
              <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px;vertical-align:top;">Email</td>
              <td style="padding:8px 0;font-size:14px;">
                <a href="mailto:${escapeHtml(data.email)}" style="color:#1d4ed8;text-decoration:none;font-weight:500;">${escapeHtml(data.email)}</a>
              </td>
            </tr>
            ${companyRow}
            <tr>
              <td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px;vertical-align:top;">Timeline</td>
              <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:500;">${escapeHtml(timeline)}</td>
            </tr>
          </table>

          <div style="margin-top:20px;padding:18px 20px;background:#faf9f6;border:1px solid #eceae2;border-radius:12px;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280;font-weight:600;">
              Project or role overview
            </p>
            <p style="margin:0;font-size:14px;line-height:1.65;color:#1f2937;">
              ${htmlMessage}
            </p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px 24px;border-top:1px solid #f0efe9;font-size:12px;color:#6b7280;">
          Reply directly to this email to respond to ${escapeHtml(data.name)} (${escapeHtml(data.email)}).
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

export const submitContactInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown): InquiryPayload => {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid request data");
    }
    const { name, email, company, serviceType, timeline, message } = data as Record<string, unknown>;

    if (!name || typeof name !== "string" || !name.trim()) {
      throw new Error("Name is required");
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      throw new Error("A valid email address is required");
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      throw new Error("Message is required");
    }

    return {
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 150),
      company: typeof company === "string" ? company.trim().slice(0, 100) : undefined,
      serviceType: typeof serviceType === "string" ? serviceType.trim().slice(0, 100) : undefined,
      timeline: typeof timeline === "string" ? timeline.trim().slice(0, 50) : undefined,
      message: message.trim().slice(0, 2000),
    };
  })
  .handler(async ({ data }): Promise<InquiryResponse> => {
    const env = process.env;
    const submittedAt = new Date().toISOString();

    const resendApiKey = env["RESEND_API_KEY"]?.trim();
    const resendFrom = env["RESEND_FROM_EMAIL"]?.trim();
    const recipientEmail = env["CONTACT_TO_EMAIL"]?.trim() || DEFAULT_RECIPIENT_EMAIL;

    const supabaseUrl = env["SUPABASE_URL"] || env["VITE_SUPABASE_URL"];
    const supabaseKey =
      env["SUPABASE_SERVICE_ROLE_KEY"] ||
      env["SUPABASE_PUBLISHABLE_KEY"] ||
      env["VITE_SUPABASE_PUBLISHABLE_KEY"];

    const hasResend = Boolean(resendApiKey);
    const hasSupabase = Boolean(supabaseUrl && supabaseKey);

    let deliveredViaEmail = false;
    let savedToDatabase = false;

    const tasks: Array<Promise<void>> = [];

    if (hasResend && resendApiKey) {
      tasks.push(
        sendInquiryEmailViaResend(data, {
          apiKey: resendApiKey,
          from: resendFrom,
          to: recipientEmail,
          submittedAt,
        })
          .then(() => {
            deliveredViaEmail = true;
          })
          .catch((err) => {
            console.error("[InquiryServerFn] Resend delivery failed:", err);
          }),
      );
    }

    if (hasSupabase && supabaseUrl && supabaseKey) {
      const inquiryRecord = {
        name: data.name,
        email: data.email,
        company: data.company || null,
        service_type: data.serviceType || null,
        timeline: data.timeline || null,
        message: data.message,
        created_at: submittedAt,
      };

      tasks.push(
        (async () => {
          try {
            const supabase = createClient(supabaseUrl, supabaseKey, {
              auth: { persistSession: false },
            });
            const { error } = await supabase.from("inquiries").insert([inquiryRecord]);
            if (error) {
              console.warn("[InquiryServerFn] Supabase insert warning:", error.message);
            } else {
              savedToDatabase = true;
            }
          } catch (err) {
            console.error("[InquiryServerFn] Error saving inquiry to database:", err);
          }
        })(),
      );
    }

    await Promise.all(tasks);

    if ((hasResend || hasSupabase) && !deliveredViaEmail && !savedToDatabase) {
      throw new Error(
        `We couldn't deliver your enquiry right now. Please try again or email ${DEFAULT_RECIPIENT_EMAIL} directly.`,
      );
    }

    if (!hasResend && !hasSupabase) {
      console.warn(
        "[InquiryServerFn] Neither RESEND_API_KEY nor Supabase credentials are configured.",
      );
    }

    return {
      success: true,
      message: "Enquiry successfully received.",
      deliveredViaEmail,
      savedToDatabase,
    };
  });
