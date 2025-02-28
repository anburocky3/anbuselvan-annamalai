"use client";

import { motion, useAnimation } from "framer-motion";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useState } from "react";
import AnimatedHeading from "./AnimatedHeading";
import { ANALYTICS_CATEGORIES, trackEvent } from "@/utils/analytics";

export default function ContactSection() {
  const [isEmailRevealed, setIsEmailRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  // Encode the email parts
  const encodedUsername = "YW5idQ==";
  const encodedDomain = "Y3liZXJkdWRlbmV0d29ya3MuY29t";

  const revealEmail = async () => {
    if (!isEmailRevealed) {
      await controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.3 },
      });
      trackEvent({
        action: "click",
        category: ANALYTICS_CATEGORIES.INTERACTION,
        label: "Contact Section - Reveal Email",
      });
      setIsEmailRevealed(true);
    }
  };

  const getEmail = () => {
    if (!isEmailRevealed) return "Click to reveal email";
    const username = atob(encodedUsername);
    const domain = atob(encodedDomain);
    return `${username}@${domain}`;
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    revealEmail();
    if (isEmailRevealed) {
      window.location.href = `mailto:${getEmail()}`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const decorativeCircleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-r from-slate-900 to-gray-900 py-20 text-white relative overflow-hidden min-h-[60vh] flex items-center"
    >
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

        {/* Enhanced Floating Particles */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0.3, scale: 1 }}
            animate={{
              y: -20,
              opacity: [0.3, 0.8, 0.3],
              scale: i % 3 === 0 ? [1, 1.2, 1] : 1,
              transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2 + i * 0.3,
                ease: "easeInOut",
              },
            }}
            className={`absolute w-1 h-1 ${
              i % 3 === 0 ? "bg-indigo-400" : "bg-purple-500"
            } rounded-full`}
            style={{
              left: `${5 + i * 6}%`,
              top: `${15 + (i % 5) * 15}%`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          className="flex flex-col items-center justify-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="relative">
            <motion.p
              className="text-xl text-purple-400 relative z-10"
              whileHover={{ scale: 1.05 }}
            >
              Want to start a project?
            </motion.p>
            {/* Enhanced Decorative elements */}
            <motion.div
              className="absolute -right-8 -top-8 text-purple-500/20 text-4xl"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              ✦
            </motion.div>
            <motion.div
              className="absolute -left-6 -bottom-6 text-indigo-500/20 text-3xl"
              animate={{
                rotate: -360,
                scale: [1, 1.3, 1],
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              ✦
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Decorative circles */}
            <motion.div
              variants={decorativeCircleVariants}
              initial="initial"
              animate="animate"
              className="absolute -left-4 -top-4 w-8 h-8 border border-purple-500/30 rounded-full"
            />
            <motion.div
              variants={decorativeCircleVariants}
              initial="initial"
              animate="animate"
              className="absolute -right-4 -bottom-4 w-8 h-8 border border-indigo-500/30 rounded-full"
            />

            {/* Animated gradient line */}
            <motion.div
              className="absolute -left-8 top-1/2 w-6 h-[2px] bg-gradient-to-r from-purple-500/50 to-transparent"
              animate={{
                scaleX: isHovered ? 1.5 : 1,
                opacity: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="absolute -right-8 top-1/2 w-6 h-[2px] bg-gradient-to-l from-purple-500/50 to-transparent"
              animate={{
                scaleX: isHovered ? 1.5 : 1,
                opacity: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 1 }}
            />

            <AnimatedHeading
              text="Let's have a chat"
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-wider text-center mb-8"
            />
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={handleEmailClick}
              className="group flex items-center space-x-3 text-xl relative px-6 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={controls}
            >
              {/* Enhanced button glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              {/* Button border gradient */}
              <motion.div className="absolute inset-0 rounded-lg border border-transparent bg-gradient-to-r from-purple-500/50 to-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <motion.span
                className="relative z-10 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-semibold"
                whileHover={{ y: -2 }}
              >
                {getEmail()}
              </motion.span>

              <motion.div
                className="relative z-10"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaArrowAltCircleRight className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
