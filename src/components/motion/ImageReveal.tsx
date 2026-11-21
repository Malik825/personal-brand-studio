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
  duration = 1.0,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0.7 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: cinematicEase,
      }}
      className={className}
    >
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: duration * 1.15,
          delay,
          ease: cinematicEase,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
