"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  LuCheck,
  LuCopy,
  LuExternalLink,
  LuMaximize,
  LuMinimize,
} from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import { applySocialIcons, cn, socialLinks } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { AnimatedAvatar } from "./AnimatedAvatar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import toast from "react-hot-toast";

interface AboutViewProps {
  fullUrl: string;
}

interface SocialItemProps {
  href: string;
  type: string;
  text: string;
  username: string;
  index: number;
}

const getBrandColorClasses = (type: string) => {
  switch (type) {
    case "facebook":
      return {
        bg: "bg-blue-50 dark:bg-blue-950/40 text-[#1877F2]",
        hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
      };
    case "instagram":
      return {
        bg: "bg-pink-50 dark:bg-pink-950/40 text-[#E4405F]",
        hoverBorder: "hover:border-pink-300 dark:hover:border-pink-700",
      };
    case "linkedin":
      return {
        bg: "bg-sky-50 dark:bg-sky-950/40 text-[#0A66C2]",
        hoverBorder: "hover:border-sky-300 dark:hover:border-sky-700",
      };
    case "twitter":
      return {
        bg: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200",
        hoverBorder: "hover:border-slate-400 dark:hover:border-slate-600",
      };
    case "github":
      return {
        bg: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white",
        hoverBorder: "hover:border-purple-300 dark:hover:border-purple-700",
      };
    default:
      return {
        bg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
        hoverBorder: "hover:border-slate-300 dark:hover:border-slate-700",
      };
  }
};

const SocialLinkItem = ({
  href,
  type,
  text,
  username,
  index,
}: SocialItemProps) => {
  const brand = getBrandColorClasses(type);

  return (
    <motion.li
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ x: 4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl sm:rounded-full cursor-pointer",
          "border border-slate-200/90 dark:border-slate-800",
          "bg-white/80 dark:bg-slate-900/70 backdrop-blur-md",
          "shadow-sm hover:shadow-md transition-all duration-300",
          brand.hoverBorder
        )}
      >
        <div className="flex items-center space-x-3.5 sm:space-x-4">
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110 shadow-sm",
              brand.bg
            )}
          >
            {applySocialIcons(type)}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-tight">
              {text}{" "}
              <span className="text-xs sm:text-sm font-normal text-slate-500 dark:text-slate-400">
                (@{username})
              </span>
            </h4>
            <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 group-hover:text-primary dark:group-hover:text-purple-400 transition-colors">
              Visit profile <LuExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-purple-400 group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-all duration-300 mr-1">
          <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </motion.a>
    </motion.li>
  );
};

export function AboutView({ fullUrl }: AboutViewProps) {
  // const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentFullscreen);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleFullScreen = async () => {
    try {
      if (!isFullscreen && !document.fullscreenElement) {
        if (mainRef.current?.requestFullscreen) {
          await mainRef.current.requestFullscreen();
        } else {
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch {
      // Fallback to CSS overlay fullscreen if native API is restricted
      setIsFullscreen((prev) => !prev);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("Reviews link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <main
      ref={mainRef}
      className={cn(
        "relative min-h-screen w-full bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 px-4 py-8 sm:py-12 flex flex-col items-center overflow-x-hidden",
        "[&:fullscreen]:bg-slate-50 dark:[&:fullscreen]:bg-slate-950 [&:fullscreen]:overflow-y-auto [&:fullscreen]:py-8",
        isFullscreen && "fixed inset-0 z-50 overflow-y-auto bg-slate-50 dark:bg-slate-950"
      )}
    >
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-purple-500/15 via-indigo-500/10 to-blue-500/15 dark:from-purple-600/20 dark:via-indigo-600/15 dark:to-cyan-600/15 rounded-full blur-3xl opacity-75" />
        <div className="absolute top-[40%] right-[-50px] w-[350px] h-[350px] bg-pink-500/10 dark:bg-purple-800/20 rounded-full blur-3xl opacity-60" />
      </div>

      {/* Floating Controls Banner: Full Screen & Theme Switcher */}
      <div className="w-full max-w-4xl flex justify-end items-center mb-6 relative z-10">
        <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-full px-3.5 py-1.5 shadow-sm">
          <button
            type="button"
            onClick={toggleFullScreen}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer select-none focus:outline-none"
            title={isFullscreen ? "Exit Full Screen (Esc)" : "Enter Full Screen"}
            aria-label={isFullscreen ? "Exit Full Screen" : "Enter Full Screen"}
          >
            {isFullscreen ? (
              <>
                <LuMinimize className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Exit Full Screen</span>
              </>
            ) : (
              <>
                <LuMaximize className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Full Screen</span>
              </>
            )}
          </button>

          <span className="w-px h-3.5 bg-slate-200 dark:bg-slate-700" />

          <ThemeToggle size="sm" />
        </div>
      </div>

      {/* Header Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4 mx-auto relative z-10 max-w-xl"
      >
        {/* Animated Avatar */}
        <AnimatedAvatar
          src="/images/anbuselvan-annamalai.png"
          alt="Anbuselvan Annamalai"
        />

        {/* Profile Name & Badges */}
        <div className="text-center space-y-2.5">
          <h1 className="font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2">
            <span>Anbuselvan Annamalai</span>
            <span
              title="Verified Technology Mentor"
              className="inline-flex items-center text-emerald-500 dark:text-emerald-400 hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.15em"
                height="1.15em"
                viewBox="0 0 15 15"
                className="stroke-current fill-current/10"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"
                />
              </svg>
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            Founder &amp; CEO of CyberDude • Tech Enthusiast, Mentor &amp; Teacher
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100/80 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              10M+ Global Students
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              10+ Yrs Tech Experience
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Content: Social Links + QR Code */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col lg:flex-row lg:space-x-8 items-center lg:items-start justify-center mt-8 sm:mt-10 gap-8">
        {/* Social Links List */}
        <div className="w-full max-w-md flex-1">
          <ul className="space-y-3.5 sm:space-y-4">
            <SocialLinkItem
              href={socialLinks.facebook.url}
              type="facebook"
              text="Facebook"
              username="anburocky3"
              index={0}
            />
            <SocialLinkItem
              href={socialLinks.instagram.url}
              type="instagram"
              text="Instagram"
              username="anbuselvanrocky"
              index={1}
            />
            <SocialLinkItem
              href={socialLinks.linkedin.url}
              type="linkedin"
              text="LinkedIn"
              username="anburocky3"
              index={2}
            />
            <SocialLinkItem
              href={socialLinks.x.url}
              type="twitter"
              text="Twitter / X"
              username="anbuselvanrocky"
              index={3}
            />
            <SocialLinkItem
              href={socialLinks.github.url}
              type="github"
              text="GitHub"
              username="anburocky3"
              index={4}
            />
          </ul>
        </div>

        {/* QR Code Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-sm flex flex-col items-center"
        >
          <div className="w-full p-6 sm:p-7 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xl dark:shadow-2xl dark:shadow-purple-950/20 backdrop-blur-md flex flex-col items-center text-center transition-all duration-300">
            <div className="mb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800">
                Scan &amp; Review
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                Quick Mobile Access
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Point your phone camera to explore reviews
              </p>
            </div>

            {/* High-Contrast QR Code Wrapper */}
            <div className="p-4 rounded-2xl bg-white shadow-inner border border-slate-200/80 dark:border-slate-700/60 transition-transform hover:scale-[1.02] duration-300">
              <QRCodeSVG
                value={fullUrl}
                size={220}
                level="M"
                fgColor="#0f172a"
                bgColor="#ffffff"
                className="rounded-lg"
              />
            </div>

            {/* Direct Copy Action */}
            <div className="w-full mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px] text-left">
                {fullUrl}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-8 px-3 text-xs gap-1.5 rounded-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-200"
              >
                {copied ? (
                  <>
                    <LuCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <LuCopy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
