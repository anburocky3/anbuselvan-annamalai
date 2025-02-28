"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuButton from "./navigations/MenuButton";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import Logo from "./Logo";
import { socialLinks } from "@/lib/utils";
import {
  ANALYTICS_ACTIONS,
  ANALYTICS_CATEGORIES,
  trackEvent,
} from "@/utils/analytics";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Project", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Skill", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });
  const navRef = useRef<HTMLUListElement>(null);

  const updateIndicator = (index: number) => {
    const navItems = navRef.current?.children;
    if (navItems && navItems[index]) {
      const item = navItems[index] as HTMLElement;
      setIndicatorStyle({
        width: item.offsetWidth,
        left: item.offsetLeft,
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  const scrollToSection = (sectionId: string, event?: React.MouseEvent) => {
    event?.preventDefault();
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // If scrolling to home section, reset the indicator
      if (sectionId === "#home") {
        setActiveSection("");
        setIndicatorStyle({ width: 0, left: 0 });
      } else {
        const newActiveSection = sectionId.replace("#", "");
        setActiveSection(newActiveSection);
        const index = navLinks.findIndex((link) => link.href === sectionId);
        if (index !== -1) {
          updateIndicator(index);
        }
      }

      setIsMenuOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Find the current section
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is in view (with some buffer)
          if (rect.top <= 150 && rect.bottom >= 150) {
            // Skip updating indicator if we're in the home/hero section

            if (activeSection !== section) {
              setActiveSection(section);
              const index = sections.indexOf(section);

              updateIndicator(index + 1);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check for active section
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto";
    };
  }, [activeSection]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const index = navLinks.findIndex(
        (link) => link.href === `#${activeSection}`
      );
      if (index !== -1) {
        updateIndicator(index);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection]);

  const menuVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at 95% 5%)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at 95% 5%)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const socialVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
    },
  };

  const headerVariants = {
    top: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      boxShadow: "none",
    },
    scrolled: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
  };

  return (
    <>
      {/* Sticky header */}
      <motion.header
        variants={headerVariants}
        animate={isScrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 w-full z-50 py-6 backdrop-blur-sm`}
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
                <motion.div
                  className="absolute bottom-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full -mb-2"
                  animate={{
                    width: indicatorStyle.width,
                    x: indicatorStyle.left,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative py-2"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        scrollToSection(link.href, e);
                        updateIndicator(index);
                        trackEvent({
                          action: ANALYTICS_ACTIONS.MENU_CLICK,
                          category: ANALYTICS_CATEGORIES.NAVIGATION,
                          label: link.name,
                        });
                      }}
                      className={`text-white hover:text-purple-400 transition-colors duration-300 px-4 py-2 ${
                        activeSection === link.href.replace("#", "")
                          ? "text-purple-400"
                          : ""
                      }`}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Social Icons - Desktop */}
            <div className="hidden lg:flex space-x-4">
              {[
                { icon: <FaTwitter />, href: socialLinks.x.url },
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
            variants={menuVariants}
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
                      variants={itemVariants}
                      className="overflow-hidden"
                    >
                      <a
                        href={link.href}
                        onClick={(e) => scrollToSection(link.href, e)}
                        className={`relative inline-block text-gray-300 hover:text-white text-2xl font-medium transition-colors duration-300 py-2 px-4 ${
                          activeSection === link.href.replace("#", "")
                            ? "text-purple-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-400 after:to-purple-600"
                            : ""
                        }`}
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              {/* Social Icons - Mobile */}
              <motion.div
                variants={socialVariants}
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
