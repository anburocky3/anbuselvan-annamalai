"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  stiffness?: number;
  damping?: number;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    const millions = num / 1000000;
    return millions % 1 === 0
      ? Math.floor(millions) + "M"
      : millions.toFixed(1) + "M";
  }
  if (num >= 1000) {
    const thousands = num / 1000;
    return thousands % 1 === 0
      ? Math.floor(thousands) + "K"
      : thousands.toFixed(1) + "K";
  }
  return num.toString();
};

export default function AnimatedCounter({
  value,
  duration = 2,
  className = "",
  stiffness = 100,
  damping = 30,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    duration,
    stiffness,
    damping,
    mass: 1,
  });

  const display = useTransform(spring, (current: number) => {
    return formatNumber(Math.round(current));
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, value, isInView]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
