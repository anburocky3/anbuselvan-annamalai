"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaHome, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  trackEvent,
  ANALYTICS_ACTIONS,
  ANALYTICS_CATEGORIES,
} from "@/utils/analytics";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Track 404 error page view
    if (typeof window !== "undefined") {
      trackEvent({
        action: ANALYTICS_ACTIONS.SECTION_VIEW,
        category: ANALYTICS_CATEGORIES.INTERACTION,
        label: "404_not_found",
      });
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0618] to-[#1a103d] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-purple-500 mb-4">404</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-purple-500/20 rounded-full blur-[100px] z-0" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto relative z-10">
            Oops! The page you&apos;re looking for seems to have disappeared
            into the digital void.
          </p>
        </motion.div>

        {/* Animated elements */}
        <div className="relative h-40 mb-12">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-purple-500"
              style={{
                left: `${30 + i * 10}%`,
                top: "50%",
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl text-white/10"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 10,
                ease: "linear",
              },
              scale: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              },
            }}
          >
            <FaSearch />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8"
          >
            <Link href="/">
              <FaHome className="mr-2" />
              Return Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-purple-500 text-purple-500 hover:bg-purple-500/10 hover:text-white rounded-full px-8"
          >
            <Link href="/blog">Visit Blog</Link>
          </Button>
        </motion.div>
      </div>

      {/* Add Vercel Analytics */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
