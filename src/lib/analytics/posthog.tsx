import { useEffect, type ReactNode } from "react";

export const posthogToken =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.["VITE_PUBLIC_POSTHOG_PROJECT_TOKEN"]) ||
  "";

export const posthogHost =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.["VITE_PUBLIC_POSTHOG_HOST"]) ||
  "https://us.i.posthog.com";

type PostHogLike = {
  init: (token: string, config: Record<string, unknown>) => void;
  capture: (eventName: string, properties?: Record<string, unknown>) => void;
};

let posthogInstance: PostHogLike | null = null;
let initPromise: Promise<PostHogLike | null> | null = null;
const queuedEvents: Array<{ name: string; properties?: Record<string, unknown> }> = [];

/**
 * Lazily loads and initializes posthog-js outside the critical hydration path
 * so initial paint, LCP, and TBT remain unaffected by analytics bundles.
 */
export async function initPostHog(): Promise<PostHogLike | null> {
  if (typeof window === "undefined" || !posthogToken) return null;
  if (posthogInstance) return posthogInstance;
  if (initPromise) return initPromise;

  initPromise = import("posthog-js")
    .then((mod) => {
      const ph = mod.default;
      ph.init(posthogToken, {
        api_host: posthogHost,
        person_profiles: "identified_only",
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: true,
      });
      posthogInstance = ph;

      while (queuedEvents.length > 0) {
        const evt = queuedEvents.shift();
        if (evt) {
          ph.capture(evt.name, evt.properties);
        }
      }

      return ph;
    })
    .catch(() => null);

  return initPromise;
}

export function PostHogClientProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!posthogToken || typeof window === "undefined") return;

    const ric = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      }
    ).requestIdleCallback;

    if (ric) {
      const id = ric(() => {
        void initPostHog();
      }, { timeout: 2500 });
      return () => {
        (
          window as Window & { cancelIdleCallback?: (id: number) => void }
        ).cancelIdleCallback?.(id);
      };
    }

    const timer = window.setTimeout(() => {
      void initPostHog();
    }, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return <>{children}</>;
}

/**
 * Safe client-side event tracking helper.
 * Queues events fired before PostHog finishes idle initialization.
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined" || !posthogToken) return;
  try {
    if (posthogInstance) {
      posthogInstance.capture(eventName, properties);
    } else {
      queuedEvents.push(properties ? { name: eventName, properties } : { name: eventName });
      void initPostHog();
    }
  } catch {
    // safe fallback
  }
}
