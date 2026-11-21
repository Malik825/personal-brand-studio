import { cn } from "@/lib/utils";

interface InfiniteMarqueeProps {
  items: string[];
  variant?: "tech" | "philosophy";
  reverse?: boolean;
  speedSeconds?: number;
  className?: string;
  label?: string;
}

/**
 * CSS-only seamless marquee. Two identical halves translate by -50%, so the
 * loop never shows a gap. Pauses on hover and stops for reduced-motion users.
 */
export function InfiniteMarquee({
  items,
  variant = "tech",
  reverse = false,
  speedSeconds = 30,
  className,
  label,
}: InfiniteMarqueeProps) {
  // Repeat so each half is comfortably wider than any viewport.
  const half = [...items, ...items, ...items];
  const separator = variant === "philosophy" ? "✦" : "·";

  const renderHalf = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
    >
      {half.map((item, idx) => (
        <li key={idx} className="flex items-center gap-8 sm:gap-12">
          <span
            className={cn(
              "whitespace-nowrap",
              variant === "philosophy"
                ? "font-display text-3xl italic tracking-tight sm:text-4xl md:text-5xl"
                : "text-sm font-medium uppercase tracking-[0.22em] text-foreground/75 md:text-base",
            )}
          >
            {item}
          </span>
          <span className="text-primary" aria-hidden>
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label={label}
      className={cn("marquee group relative w-full overflow-hidden", variant === "philosophy" ? "py-8" : "py-5", className)}
      style={{ ["--marquee-duration" as string]: `${speedSeconds}s` }}
    >
      <div className={reverse ? "animate-marquee-reverse" : "animate-marquee"}>
        {renderHalf(false)}
        {renderHalf(true)}
      </div>
    </div>
  );
}
