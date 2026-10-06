"use client";

import { useTheme } from "./theme-provider";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "default" | "lg";
  showLabel?: boolean;
}

export function ThemeToggle({
  className = "",
  size = "default",
  showLabel = false,
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/50 animate-pulse",
          size === "sm" && "w-8 h-8",
          size === "lg" && "w-11 h-11",
          className
        )}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary select-none",
        "border border-slate-200 dark:border-slate-700",
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md",
        "text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-yellow-400",
        "shadow-sm hover:shadow-md",
        size === "sm" && "w-8 h-8 text-sm",
        size === "default" && "w-9 h-9 text-base",
        size === "lg" && "w-11 h-11 text-lg px-3 py-1.5",
        showLabel && "w-auto px-3.5 py-1.5 gap-2",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ scale: 0.4, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.4, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-amber-400 flex items-center justify-center"
            >
              <LuSun className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0.4, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.4, rotate: -90, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-slate-700 dark:text-slate-200 flex items-center justify-center"
            >
              <LuMoon className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-xs font-semibold capitalize tracking-wide">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </motion.button>
  );
}
