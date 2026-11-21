import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { cinematicEase } from "./variants";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: ElementType;
}

export function TextReveal({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  as: Component = "div",
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (typeof children !== "string") {
    // If not a plain string, animate as a single masked block
    if (shouldReduceMotion) {
      return <Component className={className}>{children}</Component>;
    }
    const MotionComponent = motion.create(Component);
    return (
      <span className="inline-block overflow-hidden">
        <MotionComponent
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay, ease: cinematicEase }}
          className={className}
        >
          {children}
        </MotionComponent>
      </span>
    );
  }

  const words = children.split(" ");

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 align-top">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: cinematicEase,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
