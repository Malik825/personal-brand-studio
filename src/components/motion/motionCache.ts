import { motion } from "motion/react";
import type { ElementType } from "react";

// motion.create() must not run during render (it would create a new component
// type each time and remount children), so cache one per element type.
const cache = new Map<ElementType, ElementType>();

export function getMotionComponent(tag: ElementType): ElementType {
  let c = cache.get(tag);
  if (!c) {
    c = motion.create(tag as never) as unknown as ElementType;
    cache.set(tag, c);
  }
  return c;
}
