"use client";

import { useState } from "react";
import Accordion from "./AccordianCard";
import { faqsData } from "@/data/faqs";
import { motion } from "framer-motion";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section className="bg-[#0A0618] py-20 relative overflow-hidden">
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
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 relative"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center mb-10 space-y-4"
        >
          <motion.h2
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="text-4xl font-black tracking-wider text-center bg-gradient-to-r from-purple-500 to-indigo-400 text-transparent bg-clip-text relative"
          >
            Answers to your questions
            {/* Decorative elements */}
            <motion.div
              className="absolute -right-6 -top-6 w-12 h-12 text-purple-500/30"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              ?
            </motion.div>
            <motion.div
              className="absolute -left-4 -bottom-4 w-8 h-8 text-indigo-500/30"
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              ?
            </motion.div>
          </motion.h2>
          <motion.small
            variants={itemVariants}
            className="text-gray-400 text-center tracking-widest"
          >
            ALL IN ONE PLACE
          </motion.small>
        </motion.div>

        <motion.section
          variants={containerVariants}
          className="space-y-6 w-full max-w-4xl mx-auto relative"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-indigo-500/30 to-transparent"
          />

          {faqsData.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className="relative"
            >
              {/* Decorative dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: activeIndex === index ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
                className="absolute -left-[3px] top-6 w-[7px] h-[7px] rounded-full bg-purple-500"
              />
              <div className="pl-6">
                <Accordion
                  faq={faq}
                  isOpen={activeIndex === index}
                  onToggle={() => handleAccordionClick(index)}
                />
              </div>
            </motion.div>
          ))}
        </motion.section>
      </motion.div>
    </section>
  );
}
