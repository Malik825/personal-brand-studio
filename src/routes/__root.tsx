import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PostHogClientProvider } from "@/lib/analytics/posthog";

const LazyCommandPalette = lazy(() =>
  import("@/components/site/CommandPalette").then((m) => ({ default: m.CommandPalette })),
);
const LazyAssistantDrawer = lazy(() =>
  import("@/components/site/AssistantDrawer").then((m) => ({ default: m.AssistantDrawer })),
);

const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&display=swap";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    // Log the error for debugging; plug in your own error reporting service here.
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        {Boolean(import.meta.env.DEV) && Boolean(error) && (
          <div className="mt-4 text-left">
            <p className="font-mono text-xs font-semibold text-destructive">Error details (Dev Only):</p>
            <pre className="mt-1 max-h-48 overflow-auto rounded border border-destructive/30 bg-destructive/10 p-2.5 font-mono text-[11px] text-destructive whitespace-pre-wrap">
              {error instanceof Error ? error.stack || error.message : String(error)}
            </pre>
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "WoTofkmt-cQZwmHG2xNQ1rK5uwfJR06C6uCNMTXXG1U" },
      { name: "msvalidate.01", content: "C197C61F1B5FA2FD708767D5A7D5C863" },
      { title: "Sule Malik — Product-minded software engineer" },
      {
        name: "description",
        content:
          "Sule Malik builds digital products with engineering precision, fluid motion design, and product thinking. Specializing in React 19, React Native, TypeScript, and TanStack Start.",
      },
      { name: "author", content: "Sule Malik" },
      {
        name: "keywords",
        content:
          "Sule Malik, software engineer, product engineer, React 19, React Native, TypeScript, Next.js, TanStack Start, frontend engineering, portfolio",
      },
      // Open Graph (Facebook, LinkedIn, Discord, Slack)
      { property: "og:site_name", content: "Sule Malik" },
      { property: "og:title", content: "Sule Malik — Product-minded software engineer" },
      {
        property: "og:description",
        content:
          "Sule Malik builds digital products with engineering precision, fluid motion design, and product thinking.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sulemalik.com/" },
      { property: "og:image", content: "https://sulemalik.com/og-image.png" },
      { property: "og:image:secure_url", content: "https://sulemalik.com/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "960" },
      { property: "og:image:height", content: "1280" },
      { property: "og:image:alt", content: "Sule Malik — Product-minded software engineer" },
      // Twitter / X Cards
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sule Malik — Product-minded software engineer" },
      {
        name: "twitter:description",
        content:
          "Sule Malik builds digital products with engineering precision, fluid motion design, and product thinking.",
      },
      { name: "twitter:image", content: "https://sulemalik.com/og-image.png" },
      { name: "twitter:image:alt", content: "Sule Malik — Product-minded software engineer" },
    ],
    links: [
      { rel: "canonical", href: "https://sulemalik.com/" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "https://sulemalik.com/#person",
              "name": "Sule Malik",
              "jobTitle": "Product-Minded Software Engineer",
              "description":
                "Sule Malik is a product-minded software engineer specializing in building high-performance web and mobile products with clean component architectures.",
              "url": "https://sulemalik.com",
              "email": "abdulmaliksuleman75@gmail.com",
              "sameAs": [
                "https://www.linkedin.com/in/abdulmalik-suleman-14a8501a9/",
                "https://github.com/malik825"
              ],
              "knowsAbout": [
                "React 19",
                "React Native",
                "TypeScript",
                "Next.js",
                "TanStack Start",
                "Angular",
                "Supabase",
                "Node.js & Express",
                "PostgreSQL & MongoDB",
                "Tailwind CSS",
                "Product Engineering",
                "Software Architecture",
                "Product Analytics",
                "Search Engine Optimization (SEO)",
                "Answer Engine Optimization (AEO)",
                "Generative Engine Optimization (GEO)",
                "AI & Agentic Engineering"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://sulemalik.com/#website",
              "url": "https://sulemalik.com",
              "name": "Sule Malik",
              "description": "Portfolio of Sule Malik, product-minded software engineer.",
              "publisher": {
                "@id": "https://sulemalik.com/#person"
              }
            }
          ]
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link
          id="google-fonts-sheet"
          rel="stylesheet"
          href={GOOGLE_FONTS_HREF}
          media="print"
          onLoad={(e) => {
            e.currentTarget.media = "all";
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.getElementById('google-fonts-sheet');if(l){if(l.sheet){l.media='all';}else{l.addEventListener('load',function(){l.media='all';});}}})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function DeferredWidgets() {
  const [ready, setReady] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (ready) return;

    const activate = () => setReady(true);

    // Activate & open immediately if user triggers Cmd/Ctrl+K before idle fires
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setReady(true);
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    const ric = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      }
    ).requestIdleCallback;

    if (ric) {
      const id = ric(activate, { timeout: 1200 });
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        (
          window as Window & { cancelIdleCallback?: (id: number) => void }
        ).cancelIdleCallback?.(id);
      };
    }

    const timer = window.setTimeout(activate, 700);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
    };
  }, [ready]);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <LazyCommandPalette
        {...(paletteOpen !== undefined
          ? { open: paletteOpen, onOpenChange: setPaletteOpen }
          : {})}
      />
      <LazyAssistantDrawer />
    </Suspense>
  );
}

function TopRouteProgressBar() {
  const isNavigating = useRouterState({ select: (s) => s.status === "pending" });
  const shouldReduceMotion = useReducedMotion();

  if (!isNavigating || shouldReduceMotion) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[100] h-[2px] bg-primary/20 pointer-events-none" aria-hidden>
      <motion.div
        className="h-full bg-primary"
        initial={{ width: "0%" }}
        animate={{ width: "85%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function PageTransitionContainer({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const shouldReduceMotion = useReducedMotion();
  const isInitialMount = useRef(true);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  if (shouldReduceMotion) {
    return <div className="w-full flex-1 flex flex-col justify-between">{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial={isInitialMount.current ? false : { opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex-1 flex flex-col justify-between"
    >
      {children}
    </motion.div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <PostHogClientProvider>
      <QueryClientProvider client={queryClient}>
        <TopRouteProgressBar />
        <DeferredWidgets />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <PageTransitionContainer>
          <Outlet />
        </PageTransitionContainer>
      </QueryClientProvider>
    </PostHogClientProvider>
  );
}
