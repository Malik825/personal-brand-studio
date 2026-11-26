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
    <div
      ref={ref}
      aria-hidden="true"
      role="presentation"
      className={cn("pointer-events-none select-none overflow-hidden py-4", className)}
    >
      <motion.div
        style={reduce ? {} : { x }}
        aria-hidden="true"
        role="presentation"
        className="whitespace-nowrap font-display text-[17vw] leading-[0.9] tracking-tight text-foreground/20 will-change-transform"
      >
        <span aria-hidden="true" role="presentation">
          {text}
        </span>
      </motion.div>
    </div>
  );
}
