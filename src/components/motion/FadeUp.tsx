import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { cinematicEase } from "./variants";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  as?: ElementType;
}

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.7,
  yOffset = 24,
  as: Component = "div",
}: FadeUpProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion.create(Component);

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <MotionComponent
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: cinematicEase,
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
