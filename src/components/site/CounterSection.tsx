"use client";

import AnimatedCounter from "./AnimatedCounter";
import { motion } from "framer-motion";

export default function CounterSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const counterData = [
    {
      value: 12,
      duration: 2,
      suffix: "",
      label: ["Years of", "Experience"],
      stiffness: 100,
      damping: 30,
    },
    {
      value: 2500,
      duration: 2.5,
      suffix: "+",
      label: ["Project", "Completed"],
      stiffness: 80,
      damping: 25,
    },
    {
      value: 1500,
      duration: 2.2,
      suffix: "",
      label: ["Happy", "Clients"],
      stiffness: 90,
      damping: 28,
    },
    {
      value: 10000000,
      duration: 3,
      suffix: "+",
      label: ["Taught around", "the world"],
      stiffness: 70,
      damping: 20,
    },
  ];

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
              opacity: 0.7,
              transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
                delay: i * 0.2,
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
        className="container mx-auto px-6 relative"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
          {counterData.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative flex flex-col items-center p-6 rounded-xl bg-purple-900/10 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300"
              >
                {/* Card Glow Effect */}
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-xl"
                  initial={false}
                />

                <div className="flex items-center justify-center space-x-1">
                  <AnimatedCounter
                    value={item.value}
                    duration={item.duration}
                    stiffness={item.stiffness}
                    damping={item.damping}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                  />
                  {item.suffix && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: item.duration }}
                      className="text-4xl md:text-5xl font-bold text-purple-500"
                    >
                      {item.suffix}
                    </motion.span>
                  )}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400 text-center mt-2"
                >
                  {item.label[0]} <br /> {item.label[1]}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
