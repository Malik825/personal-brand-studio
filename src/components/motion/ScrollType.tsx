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
      className={cn("pointer-events-none select-none overflow-hidden py-6", className)}
    >
      <motion.div
        style={reduce ? {} : { x }}
        aria-hidden="true"
        className="whitespace-nowrap will-change-transform"
      >
        <svg
          viewBox="0 0 1600 140"
          className="h-[15vw] max-h-44 w-auto overflow-visible select-none fill-foreground/15 font-display italic font-normal"
          aria-hidden="true"
        >
          <text x="0" y="110" fontSize="120" letterSpacing="-0.03em">
            {text}
          </text>
        </svg>
      </motion.div>
    </div>
  );
}
