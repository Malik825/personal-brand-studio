import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cinematicEase } from "./variants";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ImageReveal({
  children,
  className = "",
  delay = 0.05,
  duration = 0.7,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: cinematicEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
