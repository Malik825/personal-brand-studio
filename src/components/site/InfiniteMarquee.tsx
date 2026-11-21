import { cn } from "@/lib/utils";

interface InfiniteMarqueeProps {
  items?: string[];
  type?: "tech" | "philosophy" | "custom";
  reverse?: boolean;
  speedSeconds?: number;
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}

const TECH_ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Angular",
  "Tailwind CSS",
  "Node.js",
];

const PHILOSOPHY_ITEMS = [
  "Think deeply",
  "Build intentionally",
  "Ship thoughtfully",
];

export function InfiniteMarquee({
  items,
  type = "custom",
  reverse = false,
  speedSeconds = 30,
  pauseOnHover = true,
  className,
  itemClassName,
}: InfiniteMarqueeProps) {
  let displayItems = items;
  if (!displayItems) {
    if (type === "tech") {
      displayItems = TECH_ITEMS;
    } else if (type === "philosophy") {
      displayItems = PHILOSOPHY_ITEMS;
    } else {
      displayItems = TECH_ITEMS;
    }
  }

  // Repeat items to ensure seamless loop with zero gap regardless of screen width
  const repeated = [...displayItems, ...displayItems, ...displayItems, ...displayItems];

  const animationClass = reverse ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-4 select-none",
        pauseOnHover && "group",
        className
      )}
      style={{
        ["--marquee-duration" as string]: `${speedSeconds}s`,
      }}
    >
      {/* Edge gradient masks for soft cinematic fading */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-background to-transparent" />

      <div className={animationClass}>
        {/* Set 1 */}
        <div className="flex shrink-0 items-center gap-8 px-4 sm:gap-12 md:gap-16">
          {repeated.map((item, idx) => (
            <div key={`m1-${idx}`} className="flex items-center gap-8 sm:gap-12 md:gap-16">
              <span
                className={cn(
                  type === "philosophy"
                    ? "font-display text-2xl tracking-tight text-foreground/90 italic md:text-3xl"
                    : "text-sm font-medium uppercase tracking-[0.2em] text-foreground/80 md:text-base",
                  itemClassName
                )}
              >
                {item}
              </span>
              <span className="text-primary text-xs opacity-75" aria-hidden>
                {type === "philosophy" ? "✦" : "/"}
              </span>
            </div>
          ))}
        </div>

        {/* Set 2 (exact duplicate for seamless loop) */}
        <div
          aria-hidden
          className="flex shrink-0 items-center gap-8 px-4 sm:gap-12 md:gap-16"
        >
          {repeated.map((item, idx) => (
            <div key={`m2-${idx}`} className="flex items-center gap-8 sm:gap-12 md:gap-16">
              <span
                className={cn(
                  type === "philosophy"
                    ? "font-display text-2xl tracking-tight text-foreground/90 italic md:text-3xl"
                    : "text-sm font-medium uppercase tracking-[0.2em] text-foreground/80 md:text-base",
                  itemClassName
                )}
              >
                {item}
              </span>
              <span className="text-primary text-xs opacity-75" aria-hidden>
                {type === "philosophy" ? "✦" : "/"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
