import { describe, expect, it, vi } from "vitest";
import { buildInquiryEmail, escapeHtml, sendInquiryEmailViaResend } from "@/server/inquiry";

describe("contact inquiry Resend email delivery", () => {
  it("escapes HTML special characters in user input", () => {
    expect(escapeHtml(`<script>alert("x")</script> & 'test'`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;test&#39;",
    );
  });

  it("builds a Resend payload targeting Gmail with reply_to set to the sender", () => {
    const email = buildInquiryEmail({
      name: "Sarah <Admin>",
      email: "sarah@company.com",
      company: "Acme & Co",
      serviceType: "Product development",
      timeline: "Within 1–2 months",
      message: "Line 1\n<b>Line 2</b>",
    });

    expect(email.to).toEqual(["abdulmaliksuleman75@gmail.com"]);
    expect(email.from).toBe("Sule Malik Portfolio <onboarding@resend.dev>");
    expect(email.reply_to).toBe("sarah@company.com");
    expect(email.subject).toBe("New enquiry: Product development — Sarah <Admin>");
    expect(email.html).toContain("Sarah &lt;Admin&gt;");
    expect(email.html).toContain("Acme &amp; Co");
    expect(email.html).toContain("Line 1<br />&lt;b&gt;Line 2&lt;/b&gt;");
    expect(email.text).toContain("Email: sarah@company.com");
  });

  it("posts to Resend REST API with bearer authorization and returns message id", async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email_123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await sendInquiryEmailViaResend(
      {
        name: "Alex",
        email: "alex@example.com",
        serviceType: "Full-time opportunity",
        timeline: "Immediately",
        message: "We are hiring a frontend engineer.",
      },
      {
        apiKey: "re_test_key",
        from: "Sule Malik <hello@sulemalik.com>",
        to: "abdulmaliksuleman75@gmail.com",
        fetchImpl: mockFetch,
      },
    );

    expect(result.id).toBe("email_123");
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({
      Authorization: "Bearer re_test_key",
      "Content-Type": "application/json",
    });
  });

  it("throws an error when Resend responds with a non-OK status", async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "Invalid API key" }), {
        status: 401,
        statusText: "Unauthorized",
      }),
    );

    await expect(
      sendInquiryEmailViaResend(
        {
          name: "Alex",
          email: "alex@example.com",
          message: "Hello",
        },
        {
          apiKey: "re_bad_key",
          fetchImpl: mockFetch,
        },
      ),
    ).rejects.toThrow("Resend API error (401)");
  });
});
