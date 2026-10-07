"use client";

import { useState, useEffect, useRef } from "react";
import {
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { motion } from "motion/react"
import MenuButton from "./navigations/MenuButton";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaX,
} from "react-icons/fa6";
import Logo from "./Logo";
import { socialLinks } from "@/lib/utils";
import {
  ANALYTICS_ACTIONS,
  ANALYTICS_CATEGORIES,
  trackEvent,
} from "@/utils/analytics";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sora } from "next/font/google";

const fontSora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const navLinks = [
  { name: "Home", href: "/", sectionId: "home" },
  { name: "Projects", href: "/projects", sectionId: "projects" },
  { name: "About", href: "/about", sectionId: "about" },
  { name: "Blog", href: "/blog", sectionId: "blog" },
  { name: "Skills", href: "/skills", sectionId: "skills" },
  { name: "Services", href: "/services", sectionId: "services" },
  { name: "Contact", href: "/contact", sectionId: "contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const navRef = useRef<HTMLUListElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { scrollY } = useScroll();

  // Function to check if a link is active
  const isLinkActive = (href: string, sectionId: string) => {
    if (pathname === "/") {
      if (sectionId === "home" && activeSection === "") {
        return true;
      }
      return activeSection === sectionId;
    }
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Scroll position initialization & listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsScrolled(window.scrollY > 50);
    }
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Manage body scroll locking when mobile menu opens/closes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Setup Intersection Observer for section detection on the homepage
  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const options = {
      rootMargin: "-20% 0px -20% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const sectionVisibility = new Map<string, number>();

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        sectionVisibility.set(entry.target.id, entry.intersectionRatio);
      });

      let maxRatio = 0;
      let mostVisibleSection = "";

      sectionVisibility.forEach((ratio, sectionId) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisibleSection = sectionId;
        }
      });

      if (mostVisibleSection && maxRatio > 0.1) {
        setActiveSection(mostVisibleSection);
      }
    }, options);

    const timer = setTimeout(() => {
      navLinks.forEach(({ sectionId }) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observerRef.current?.observe(element);
          sectionVisibility.set(sectionId, 0);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname]);

  // Reset menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (name: string, href: string, sectionId: string) => {
    setIsMenuOpen(false);

    if (pathname === "/" && href === "/") {
      setActiveSection(sectionId);

      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80;
        const offsetTop = element.offsetTop - headerHeight;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }

    trackEvent({
      action: ANALYTICS_ACTIONS.MENU_CLICK,
      category: ANALYTICS_CATEGORIES.INTERACTION,
      label: `Header Navigation - ${name}`,
    });
  };

  const headerVariants = {
    top: {
      backgroundColor: "rgba(10, 6, 24, 0)",
      boxShadow: "none",
      transition: { duration: 0.3, ease: "easeInOut" as const },
    },
    scrolled: {
      backgroundColor: "rgba(10, 6, 24, 0.85)",
      boxShadow:
        "0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(120, 50, 255, 0.08)",
      transition: { duration: 0.3, ease: "easeInOut" as const },
    },
  };

  return (
    <>
      {/* Sticky header */}
      <motion.header
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        className={`${fontSora.className} fixed top-0 left-0 w-full z-50 py-3 sm:py-4 backdrop-blur-md transition-colors`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Logo />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center" aria-label="Main Navigation">
              <ul ref={navRef} className="flex items-center gap-1 xl:gap-2 font-medium relative">
                {navLinks.map((link, index) => {
                  const active = isLinkActive(link.href, link.sectionId);
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="relative"
                    >
                      <Link
                        href={link.href}
                        onClick={() =>
                          handleNavClick(link.name, link.href, link.sectionId)
                        }
                        className={`relative block px-3 py-2 text-sm xl:text-base font-medium rounded-lg transition-colors duration-200  ${
                          active
                            ? "text-purple-400 font-semibold"
                            : "text-gray-200 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.name}
                        {active && (
                          <motion.div
                            layoutId="activeNavUnderline"
                            className="absolute bottom-0 left-3 right-3 h-0.5 bg-linear-to-r from-purple-400 to-indigo-500 rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Social Icons - Desktop */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
              {[
                {
                  icon: <FaX className="w-3.5 h-3.5" />,
                  href: socialLinks.x.url,
                  label: "X (Twitter)",
                },
                {
                  icon: <FaInstagram className="w-4 h-4" />,
                  href: socialLinks.instagram.url,
                  label: "Instagram",
                },
                {
                  icon: <FaLinkedin className="w-4 h-4" />,
                  href: socialLinks.linkedin.url,
                  label: "LinkedIn",
                },
                {
                  icon: <FaGithub className="w-4 h-4" />,
                  href: socialLinks.github.url,
                  label: "GitHub",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onClick={() => {
                    trackEvent({
                      action: ANALYTICS_ACTIONS.SOCIAL_LINK_CLICK,
                      category: ANALYTICS_CATEGORIES.SOCIAL,
                      label: social.href,
                    });
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-9 h-9 rounded-full text-gray-300 hover:text-white border border-white/15 hover:border-purple-400/60 bg-white/5 hover:bg-purple-500/10 transition-all duration-200"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:hidden flex items-center"
            >
              <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-linear-to-b from-[#0A0618]/95 via-[#120B2E]/95 to-[#1a103d]/98 backdrop-blur-xl"
          >
            <div className="container mx-auto px-6 pt-24 pb-10 h-full flex flex-col justify-between overflow-y-auto">
              <nav className="my-auto py-6" aria-label="Mobile Navigation">
                <motion.ul className="flex flex-col items-center gap-3 text-center">
                  {navLinks.map((link, index) => {
                    const active = isLinkActive(link.href, link.sectionId);
                    return (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                        className="w-full max-w-xs"
                      >
                        <Link
                          href={link.href}
                          onClick={() =>
                            handleNavClick(link.name, link.href, link.sectionId)
                          }
                          className={`block w-full py-3 px-6 text-xl font-medium rounded-xl transition-all duration-200 ${
                            active
                              ? "text-white bg-linear-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/40 font-semibold"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              {/* Social Icons - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="flex justify-center items-center gap-4 pt-6 pb-4 border-t border-white/10"
              >
                {[
                  {
                    icon: <FaX className="w-4 h-4" />,
                    href: socialLinks.x.url,
                    label: "X (Twitter)",
                  },
                  {
                    icon: <FaInstagram className="w-4 h-4" />,
                    href: socialLinks.instagram.url,
                    label: "Instagram",
                  },
                  {
                    icon: <FaLinkedin className="w-4 h-4" />,
                    href: socialLinks.linkedin.url,
                    label: "LinkedIn",
                  },
                  {
                    icon: <FaGithub className="w-4 h-4" />,
                    href: socialLinks.github.url,
                    label: "GitHub",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    onClick={() => {
                      trackEvent({
                        action: ANALYTICS_ACTIONS.SOCIAL_LINK_CLICK,
                        category: ANALYTICS_CATEGORIES.SOCIAL,
                        label: social.href,
                      });
                    }}
                    className="flex items-center justify-center w-11 h-11 rounded-full text-gray-300 hover:text-white border border-white/20 bg-white/5 active:scale-95 transition-all duration-200"
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
