"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedAvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function AnimatedAvatar({
  src,
  alt,
  size = 136,
  className = "",
}: AnimatedAvatarProps) {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 18,
      }}
      className={cn("relative mx-auto inline-flex items-center justify-center select-none", className)}
    >
      {/* 1. Ambient Rotating Glowing Aura */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-2.5 rounded-full opacity-70 dark:opacity-85 blur-lg transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #06b6d4, #3b82f6, #6366f1)",
        }}
      />

      {/* 2. Floating Breathing Container */}
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.06,
          rotate: [0, -1.5, 1.5, 0],
          transition: { duration: 0.4 },
        }}
        whileTap={{ scale: 0.94 }}
        className="relative group cursor-pointer"
      >
        {/* Animated Gradient Border Ring */}
        <motion.div
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -inset-[3px] rounded-full p-[3px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
          }}
        />

        {/* Inner Avatar Frame */}
        <div className="relative rounded-full p-[3px] bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl dark:shadow-purple-950/40 transition-colors duration-300">
          <div className="relative overflow-hidden rounded-full w-32 h-32 sm:w-36 sm:h-36">
            <Image
              src={src}
              width={size}
              height={size}
              priority
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Subtle Interactive Sheen Overlay on Hover */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ x: "100%", opacity: 0.25 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none -skew-x-12"
            />
          </div>
        </div>

        {/* 3. Verified Active Status Pulse Badge */}
        <div
          className="absolute bottom-1 right-1 z-20 flex items-center justify-center w-7 h-7 rounded-full bg-white dark:bg-slate-900 shadow-md transition-colors duration-300"
          title="Online / Available for Mentorship"
        >
          {/* Pinging ripple */}
          <span className="absolute inline-flex h-4 w-4 rounded-full bg-emerald-400 opacity-75 animate-ping" />
          {/* Solid badge */}
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-slate-900" />
        </div>
      </motion.div>
    </motion.div>
  );
}
