import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import {
  buildInquiryEmail,
  DEFAULT_RECIPIENT_EMAIL,
  escapeHtml,
  sendInquiryEmailViaResend,
  type InquiryPayload,
} from "@/lib/inquiry-email";

export { buildInquiryEmail, escapeHtml, sendInquiryEmailViaResend, type InquiryPayload };

export interface InquiryResponse {
  success: boolean;
  message: string;
  deliveredViaEmail: boolean;
  savedToDatabase: boolean;
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
