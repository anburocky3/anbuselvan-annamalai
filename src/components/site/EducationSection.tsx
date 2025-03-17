"use client";

import { timelineData } from "@/data/education";
import { motion } from "framer-motion";

export default function EducationSection() {
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

  const titleVariants = {
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="about"
      className="bg-gradient-to-r from-slate-900 to-gray-900 py-20 text-white relative overflow-hidden"
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
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-6 relative"
      >
        <motion.div
          variants={titleVariants}
          className="flex flex-col items-center justify-center mb-10 space-y-4"
        >
          <h2 className="text-4xl font-black tracking-wider text-center bg-gradient-to-r from-purple-500 to-indigo-400 text-transparent bg-clip-text">
            My Journey
          </h2>
          <small className="text-gray-400 text-center tracking-widest">
            KNOWLEDGE AND EXPERIENCE
          </small>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
          {/* Education */}
          <motion.div variants={titleVariants}>
            <h3 className="text-2xl font-semibold">Education</h3>
            <div className="space-y-10 mt-10 relative">
              {/* Connecting Line */}
              <div className="absolute left-[4rem] top-6 bottom-6 w-0.5 bg-gradient-to-b from-purple-500/50 to-purple-900/20" />

              {timelineData.education.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="pl-10 flex items-start gap-4 relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="flex items-center justify-center bg-purple-900 rounded-full p-3 relative z-10 group-hover:bg-purple-700 transition-colors duration-300"
                  >
                    {item.icon}
                  </motion.div>
                  <div className="flex flex-col gap-2">
                    <motion.p
                      initial={{ opacity: 0.5 }}
                      whileInView={{ opacity: 1 }}
                      className="text-purple-400 font-bold"
                    >
                      {item.year}
                    </motion.p>
                    <motion.h4
                      whileHover={{ color: "#A855F7" }}
                      className="text-base font-bold transition-colors duration-300"
                    >
                      {item.title}
                    </motion.h4>
                    <p className="text-sm text-gray-400 font-medium">
                      {item.institution}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Work Experience */}
          <motion.div variants={titleVariants}>
            <h3 className="text-2xl font-semibold">Work Experience</h3>
            <div className="space-y-10 mt-10 relative">
              {/* Connecting Line */}
              <div className="absolute left-[4rem] top-6 bottom-6 w-0.5 bg-gradient-to-b from-purple-500/50 to-purple-900/20" />

              {timelineData.experience.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="pl-10 flex items-start gap-4 relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="flex items-center justify-center bg-purple-900 rounded-full p-3 relative z-10 group-hover:bg-purple-700 transition-colors duration-300"
                  >
                    {item.icon}
                  </motion.div>
                  <div className="flex flex-col gap-2">
                    <motion.p
                      initial={{ opacity: 0.5 }}
                      whileInView={{ opacity: 1 }}
                      className="text-purple-400 font-bold"
                    >
                      {item.year}
                    </motion.p>
                    <motion.h4
                      whileHover={{ color: "#A855F7" }}
                      className="text-base font-bold transition-colors duration-300"
                    >
                      {item.title}
                    </motion.h4>
                    <p className="text-sm text-gray-400 font-medium">
                      {item.company}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
