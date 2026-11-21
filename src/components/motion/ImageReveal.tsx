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
  delay = 0.1,
  duration = 0.8,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
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
