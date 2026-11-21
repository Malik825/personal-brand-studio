import type { Variants, Transition } from "motion/react";

export const cinematicEase = [0.16, 1, 0.3, 1] as const;
export const gentleEase = [0.25, 0.1, 0.25, 1] as const;

export const defaultTransition: Transition = {
  duration: 0.7,
  ease: cinematicEase,
};

export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: cinematicEase,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const cardHoverVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -4,
    transition: {
      duration: 0.3,
      ease: cinematicEase,
    },
  },
};

export const imageRevealVariants: Variants = {
  hidden: {
    clipPath: "inset(0% 0% 100% 0%)",
    scale: 1.06,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: {
      duration: 1.1,
      ease: cinematicEase,
    },
  },
};
