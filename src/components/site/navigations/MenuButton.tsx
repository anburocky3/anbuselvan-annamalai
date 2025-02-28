"use client";

import { motion } from "framer-motion";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MenuButton({ isOpen, onClick }: MenuButtonProps) {
  const transition = {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  };

  const topLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8 },
  };

  const middleLineVariants = {
    closed: { opacity: 1, x: 0 },
    open: { opacity: 0, x: -20 },
  };

  const bottomLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 },
  };

  return (
    <button
      onClick={onClick}
      className="lg:hidden relative w-10 h-10 flex items-center justify-center"
      aria-label="Toggle Menu"
    >
      <div className="relative w-6 h-6">
        <motion.span
          className="absolute w-6 h-0.5 bg-white rounded-full origin-center"
          variants={topLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={transition}
          style={{ top: "25%" }}
        />
        <motion.span
          className="absolute w-6 h-0.5 bg-white rounded-full origin-center"
          variants={middleLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={transition}
          style={{ top: "50%" }}
        />
        <motion.span
          className="absolute w-6 h-0.5 bg-white rounded-full origin-center"
          variants={bottomLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={transition}
          style={{ top: "75%" }}
        />
      </div>
    </button>
  );
}
