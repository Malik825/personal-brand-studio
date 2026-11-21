import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

export function ReadingProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent pointer-events-none"
      aria-hidden
    >
      <motion.div
        className="h-full bg-primary origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
