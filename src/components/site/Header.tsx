"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import MenuButton from "./navigations/MenuButton";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
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
  { name: "Services", href: "/services", sectionId: "services" },
  { name: "About", href: "/about", sectionId: "about" },
  { name: "Skills", href: "/skills", sectionId: "skills" },
  { name: "Contact", href: "/contact", sectionId: "contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const navRef = useRef<HTMLUListElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { scrollY } = useScroll();

  // Function to check if a link is active
  const isLinkActive = (href: string, sectionId: string) => {
    if (pathname === "/") {
      // Special case for home section
      if (sectionId === "home" && activeSection === "") {
        return true;
      }
      // On home page, use section-based active state
      return activeSection === sectionId;
    }
    // On other pages, use route-based active state
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (typeof window !== "undefined") {
      document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
    }
  };

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use Framer Motion's useScroll hook for smooth header background transition
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Setup Intersection Observer for section detection
  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const options = {
      rootMargin: "-20% 0px -20% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    // Keep track of section visibility ratios
    const sectionVisibility = new Map();

    // Special handling for projects section
    let projectsInView = false;

    observerRef.current = new IntersectionObserver((entries) => {
      // Special handling for projects section
      entries.forEach((entry) => {
        if (entry.target.id === "projects") {
          projectsInView = entry.isIntersecting;
        }
      });

      // Update visibility ratios for all entries
      entries.forEach((entry) => {
        // Give projects section a slight boost in visibility if it's in view
        const visibilityRatio =
          entry.target.id === "projects" && projectsInView
            ? Math.max(entry.intersectionRatio, 0.2) // Ensure projects has at least 0.2 ratio when visible
            : entry.intersectionRatio;

        sectionVisibility.set(entry.target.id, visibilityRatio);
      });

      // Find the most visible section
      let maxRatio = 0;
      let mostVisibleSection = "";

      sectionVisibility.forEach((ratio, sectionId) => {
        // Only consider sections that are actually visible
        if (ratio > 0 && ratio > maxRatio) {
          maxRatio = ratio;
          mostVisibleSection = sectionId;
        }
      });

      // Only update if we found a visible section
      if (mostVisibleSection && maxRatio > 0.1) {
        setActiveSection(mostVisibleSection);
      }
    }, options);

    // Observe all sections with a slight delay to ensure DOM is ready
    setTimeout(() => {
      // First, try to find all sections by ID
      navLinks.forEach(({ sectionId }) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observerRef.current?.observe(element);
          // Initialize visibility map
          sectionVisibility.set(sectionId, 0);
        }
      });

      // Special handling for projects section - try to find it by other means if not found by ID
      if (!document.getElementById("projects")) {
        // Try to find by class or other attributes
        const possibleProjectsSections = document.querySelectorAll(
          'section[data-section="projects"], .projects-section, section:nth-of-type(3)'
        );

        if (possibleProjectsSections.length > 0) {
          // Use the first match
          const projectsSection = possibleProjectsSections[0];
          // Set ID if missing
          if (!projectsSection.id) {
            projectsSection.id = "projects";
          }
          observerRef.current?.observe(projectsSection);
          sectionVisibility.set("projects", 0);
        }
      }
    }, 100);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      document.body.style.overflow = "auto";
    };
  }, [pathname]);

  // Reset body overflow when pathname changes
  useEffect(() => {
    // Reset body overflow to ensure scrolling works after navigation
    document.body.style.overflow = "auto";
    // Close menu when pathname changes
    setIsMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (name: string, href: string, sectionId: string) => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto"; // Reset body overflow when navigating

    // If on home page and clicking a section, handle smooth scroll
    if (pathname === "/" && href === "/") {
      // Force set the active section immediately for better UX
      setActiveSection(sectionId);

      // Try to find the element
      let element = document.getElementById(sectionId);

      // Special handling for projects section
      if (!element && sectionId === "projects") {
        const possibleProjectsSections = document.querySelectorAll(
          'section[data-section="projects"], .projects-section, section:nth-of-type(3)'
        );
        if (possibleProjectsSections.length > 0) {
          element = possibleProjectsSections[0] as HTMLElement;
          // Set ID if missing
          if (!element.id) {
            element.id = "projects";
          }
        }
      }

      if (element) {
        // Calculate offset based on header height
        const headerHeight = 100; // Adjust based on your header height
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

  // Animation variants
  const underlineVariants = {
    inactive: {
      width: 0,
      x: "50%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
    active: {
      width: "100%",
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const headerVariants = {
    top: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      boxShadow: "none",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    scrolled: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Sticky header */}
      <motion.header
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        className={`${fontSora.className} fixed top-0 left-0 w-full z-50 py-3 backdrop-blur-sm`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Logo />
            </motion.div>

            {/* Desktop Menu */}
            <nav className="hidden lg:block relative">
              <ul ref={navRef} className="flex space-x-8 font-medium relative">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative py-2"
                  >
                    <Link
                      href={link.href}
                      onClick={() =>
                        handleNavClick(link.name, link.href, link.sectionId)
                      }
                      className="text-white hover:text-purple-400 transition-colors duration-300 px-4 py-2 relative"
                    >
                      {link.name}
                      <motion.div
                        variants={underlineVariants}
                        initial="inactive"
                        animate={
                          isLinkActive(link.href, link.sectionId)
                            ? "active"
                            : "inactive"
                        }
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Social Icons - Desktop */}
            <div className="hidden lg:flex space-x-4">
              {[
                { icon: <FaX />, href: socialLinks.x.url },
                { icon: <FaInstagram />, href: socialLinks.instagram.url },
                { icon: <FaLinkedin />, href: socialLinks.linkedin.url },
                { icon: <FaGithub />, href: socialLinks.github.url },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  onClick={() => {
                    trackEvent({
                      action: ANALYTICS_ACTIONS.SOCIAL_LINK_CLICK,
                      category: ANALYTICS_CATEGORIES.SOCIAL,
                      label: social.href,
                    });
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-white hover:text-purple-400 border border-white/20 hover:border-purple-400 rounded-full p-2 transition-all duration-300"
                  whileHover={{ y: -3 }}
                  target="_blank"
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
              className="lg:hidden"
            >
              <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 lg:hidden bg-gradient-to-b from-[#0A0618] to-[#1a103d]"
          >
            <div className="container mx-auto px-4 pt-28 pb-8 h-full flex flex-col">
              <nav className="flex-1">
                <motion.ul className="space-y-6 text-center">
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay:
                          link.name === "Home"
                            ? 0.1
                            : link.name === "Projects"
                            ? 0.2
                            : link.name === "Services"
                            ? 0.3
                            : link.name === "About"
                            ? 0.4
                            : link.name === "Skills"
                            ? 0.5
                            : 0.6,
                      }}
                      className="overflow-hidden"
                    >
                      <Link
                        href={link.href}
                        onClick={() =>
                          handleNavClick(link.name, link.href, link.sectionId)
                        }
                        className={`relative inline-block text-gray-300 hover:text-white text-2xl font-medium transition-colors duration-300 py-2 px-4 ${
                          isLinkActive(link.href, link.sectionId)
                            ? "text-purple-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-purple-400 after:to-purple-600"
                            : ""
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              {/* Social Icons - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center space-x-8 mt-12"
              >
                <motion.a
                  href={socialLinks.x.url}
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 transform"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTwitter className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href={socialLinks.instagram.url}
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 transform"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaInstagram className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href={socialLinks.linkedin.url}
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 transform"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href={socialLinks.github.url}
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 transform"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="w-6 h-6" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
