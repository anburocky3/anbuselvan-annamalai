"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/lib/utils";
import Logo from "./Logo";
import {
  ANALYTICS_ACTIONS,
  ANALYTICS_CATEGORIES,
  trackEvent,
} from "@/utils/analytics";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <footer className="bg-[#0A0618] text-white py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute w-[500px] h-[500px] bg-purple-500 rounded-full blur-[128px] -top-48 -right-24 opacity-20" />
          <div className="absolute w-[500px] h-[500px] bg-blue-500 rounded-full blur-[128px] -bottom-48 -left-24 opacity-20" />
        </motion.div>

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0.3 }}
            animate={{
              y: -20,
              opacity: [0.3, 0.8, 0.3],
              transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2 + i * 0.3,
                ease: "easeInOut",
              },
            }}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      <motion.div
        className="container mx-auto px-4 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-6 mb-8"
          variants={itemVariants}
        >
          {Object.values(socialLinks).map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent({
                  action: ANALYTICS_ACTIONS.SOCIAL_LINK_CLICK,
                  category: ANALYTICS_CATEGORIES.SOCIAL,
                  label: link.url,
                });
              }}
              className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              custom={index}
              variants={itemVariants}
            >
              {/* Icon glow effect */}
              <motion.div
                className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <motion.div className="relative z-10">{link.icon}</motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Logo */}
        <motion.div
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {/* Logo glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <div className="relative z-10">
              <Logo />
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <motion.nav
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8"
          variants={itemVariants}
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              custom={index}
              variants={itemVariants}
            >
              {/* Link hover effect */}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300"
                initial={false}
              />
              {link.name}
            </motion.a>
          ))}
        </motion.nav>

        {/* Copyright */}
        <motion.div
          className="text-center text-gray-400 text-sm relative"
          variants={itemVariants}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            © {new Date().getFullYear()} All rights reserved by{" "}
            <motion.a
              href="https://anbuselvan-annamalai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 relative inline-block group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Name hover effect */}
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300"
                initial={false}
              />
              Anbuselvan Annamalai
            </motion.a>
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
