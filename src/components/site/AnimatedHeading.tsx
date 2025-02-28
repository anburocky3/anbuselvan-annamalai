"use client";

import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

export default function AnimatedHeading({
  text,
  className = "",
}: AnimatedHeadingProps) {
  const letterVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.5,
    },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: {
      scale: 1.2,
      color: "#A855F7",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <h2 className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          initial="initial"
          whileInView="animate"
          whileHover="hover"
          custom={index}
          viewport={{ once: true }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
}
