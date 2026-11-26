import { useEffect, type ReactNode } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "@posthog/react";

export const posthogToken =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.["VITE_PUBLIC_POSTHOG_PROJECT_TOKEN"]) ||
  "";

export const posthogHost =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.["VITE_PUBLIC_POSTHOG_HOST"]) ||
  "https://us.i.posthog.com";

let isInitialized = false;

export function initPostHog() {
  if (typeof window !== "undefined" && posthogToken && !isInitialized) {
    posthog.init(posthogToken, {
      api_host: posthogHost,
      person_profiles: "identified_only",
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
    });
    isInitialized = true;
  }
}

export function PostHogClientProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  if (!posthogToken) {
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

/**
 * Safe client-side event tracking helper.
 * Only sends events if PostHog token is configured.
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && posthogToken) {
    try {
      posthog.capture(eventName, properties);
    } catch {
      // safe fallback
    }
  }
}

export { posthog };
