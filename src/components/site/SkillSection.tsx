"use client";

import { skillsData } from "@/data/skills";
import { motion } from "framer-motion";

export default function SkillSection() {
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

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="skills"
      className="bg-[#0A0618] text-white py-20 relative overflow-hidden"
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

        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
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
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 4) * 20}%`,
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
        className="container mx-auto px-6 relative"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center mb-10 space-y-4"
        >
          <h2 className="text-4xl font-black tracking-wider text-center bg-gradient-to-r from-purple-500 to-indigo-400 text-transparent bg-clip-text">
            My Skills
          </h2>
          <small className="text-gray-400 text-center tracking-widest">
            WHAT I CAN DO
          </small>
        </motion.div>

        <motion.div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {skillsData.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="space-y-4 text-center"
            >
              <motion.div
                whileHover="hover"
                className="group bg-[#141026] p-6 rounded-xl border border-transparent hover:bg-[#20193e] hover:border-purple-500 transition-all duration-300 ease-in-out flex flex-col items-center justify-center relative"
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-xl"
                  initial={false}
                />

                {/* Icon with Animation */}
                <motion.div
                  variants={iconVariants}
                  className="text-5xl relative"
                >
                  {skill.icon}

                  {/* Particle Effects on Hover */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="absolute -inset-4 opacity-0 group-hover:opacity-100"
                  >
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{
                          scale: [1, 0],
                          x: [-20, 20],
                          y: [-20, 20],
                          opacity: [0.5, 0],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="absolute w-1 h-1 bg-purple-500 rounded-full"
                        style={{
                          left: "50%",
                          top: "50%",
                          transform: `rotate(${i * 90}deg)`,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  className="text-xl font-semibold mt-3 bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent"
                >
                  {skill.proficiency}
                </motion.p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="font-medium text-gray-300"
              >
                {skill.name}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
