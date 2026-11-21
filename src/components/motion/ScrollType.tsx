import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Oversized decorative serif line that drifts horizontally as it scrolls
 * through the viewport. Purely decorative (aria-hidden).
 */
export function ScrollType({
  text,
  className,
  from = "8%",
  to = "-28%",
}: {
  text: string;
  className?: string;
  from?: string;
  to?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none select-none overflow-hidden", className)}>
      <motion.p
        style={reduce ? {} : { x }}
        className="whitespace-nowrap font-display text-[17vw] leading-[0.9] tracking-tight text-foreground/[0.07] will-change-transform"
      >
        {text}
      </motion.p>
    </div>
  );
}
