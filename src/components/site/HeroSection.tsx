"use client";

import Image from "next/image";
import { Sora } from "next/font/google";
import TechnologyMarquee from "./TechnologyMarquee";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import {
  ANALYTICS_ACTIONS,
  ANALYTICS_CATEGORIES,
  trackEvent,
} from "@/utils/analytics";

const fontSora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function HeroSection() {
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
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <header
      id="home"
      role="banner"
      aria-label="Hero Section"
      className={`${fontSora.className} relative min-h-screen flex items-center bg-gradient-to-r from-slate-900 to-purple-900 text-white overflow-hidden`}
    >
      {/* Background text */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1320 300" role="presentation">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            className="text-[250px] font-bold animate-stroke"
          >
            HI
          </text>
        </svg>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.article
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center"
        >
          {/* Image - Hidden on mobile, shown on md and up */}
          <motion.figure
            variants={imageVariants}
            className="hidden md:block md:w-5/12"
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/anbuselvan-annamalai.png"
                  alt="Anbuselvan Annamalai - Award-winning Entrepreneur and Technology Mentor specializing in React, React Native, and full-stack development"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="mx-auto w-96 h-96 rounded-full object-cover border-2 border-purple-500"
                  priority
                  loading="eager"
                  title="Anbuselvan Annamalai - Entrepreneur and Technology Mentor"
                />
              </motion.div>
            </div>
          </motion.figure>

          {/* Content */}
          <motion.div variants={itemVariants} className="md:w-6/12">
            <div className="space-y-8 sm:space-y-6">
              {/* Mobile Image */}
              <motion.figure
                variants={imageVariants}
                className="md:hidden text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/anbuselvan-annamalai.png"
                    alt="Anbuselvan Annamalai - Award-winning Entrepreneur and Technology Mentor with expertise in React, React Native, and Node.js"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="mx-auto w-64 h-64 rounded-full object-cover border-2 border-purple-500"
                    priority
                    loading="eager"
                    title="Anbuselvan Annamalai - Entrepreneur and Technology Mentor"
                  />
                </motion.div>
              </motion.figure>

              <div>
                <div className="flex flex-col gap-2 mt-10 sm:space-y-2">
                  <motion.h1
                    variants={itemVariants}
                    className="inline-block text-xl sm:text-4xl font-bold text-white"
                  >
                    Hi, I am Anbuselvan Annamalai.
                  </motion.h1>
                  <motion.h2
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text"
                    title="Entrepreneur | Mentor"
                  >
                    Entrepreneur | Mentor
                  </motion.h2>
                </div>

                <motion.p
                  variants={itemVariants}
                  className="mt-2 sm:mt-10 text-base sm:text-xl text-gray-300"
                >
                  I design, code and build beautiful things. Like to
                  learn/crack/invent. I love what I do.
                </motion.p>
              </div>

              <motion.nav
                variants={itemVariants}
                className="flex flex-wrap gap-4"
                aria-label="Primary Call to Action"
              >
                <motion.a
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  href="#contact"
                  className="px-6 py-3 text-white border-2 border-white rounded-full hover:bg-purple-100 hover:text-gray-900 font-medium transition-colors"
                  onClick={() => {
                    trackEvent({
                      action: ANALYTICS_ACTIONS.CONTACT_INITIATE,
                      category: ANALYTICS_CATEGORIES.INTERACTION,
                      label: "Hero Contact Button",
                    });
                  }}
                  role="button"
                  aria-label="Start a project with Anbuselvan Annamalai"
                >
                  Got a project?
                </motion.a>
                <motion.a
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  href="#contact"
                  className="flex items-center px-6 py-3 font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    trackEvent({
                      action: ANALYTICS_ACTIONS.CONTACT_INITIATE,
                      category: ANALYTICS_CATEGORIES.INTERACTION,
                      label: "Hero Lets Talk Button",
                    });
                  }}
                  role="button"
                  aria-label="Contact Anbuselvan Annamalai for consultation"
                >
                  Let&apos;s talk!
                </motion.a>
              </motion.nav>
            </div>
          </motion.div>
        </motion.article>
      </div>

      <motion.aside
        initial={{ opacity: 0, y: 100, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{
          duration: 0.8,
          delay: 1,
          rotate: { duration: 1.2, ease: "easeOut" },
        }}
        className="bg-gradient-to-r from-purple-950 to-black px-10 py-6 absolute bottom-5 sm:bottom-24 -left-10 w-[calc(100%+5rem)] flex justify-center items-center"
        aria-label="Anbuselvan Annamalai's Technology Skills"
      >
        <Marquee speed={20}>
          <TechnologyMarquee key={1} title="Design" />
          <TechnologyMarquee key={2} title="Development" />
          <TechnologyMarquee key={3} title="Web App" />
          <TechnologyMarquee key={4} title="Mobile App" />
          <TechnologyMarquee key={5} title="Android App" />
          <TechnologyMarquee key={6} title="iOS App" />
          <TechnologyMarquee key={7} title="React Native" />
          <TechnologyMarquee key={8} title="Flutter" />
          <TechnologyMarquee key={9} title="Node.js" />
          <TechnologyMarquee key={10} title="Express.js" />
          <TechnologyMarquee key={11} title="MongoDB" />
          <TechnologyMarquee key={12} title="PostgreSQL" />
        </Marquee>
      </motion.aside>
    </header>
  );
}
