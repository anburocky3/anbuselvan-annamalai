"use client";

import { services } from "@/data/services";
import { motion, useAnimationControls, Variants } from "framer-motion";
import { useEffect } from "react";

export default function ServicesSection() {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const headingVariants = {
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

  const serviceVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(88, 28, 135, 0.3)",
      transition: {
        duration: 0.2,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const floatingParticleVariants: Variants = {
    initial: { y: 0, opacity: 0.3 },
    animate: {
      y: -20,
      opacity: 0.7,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="services"
      className="bg-gradient-to-r from-slate-900 to-gray-900 py-20 relative overflow-hidden"
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial="initial"
            animate="animate"
            variants={floatingParticleVariants}
            transition={{ delay: i * 0.2 }}
            className="absolute w-2 h-2 bg-purple-500 rounded-full"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + (i % 3) * 30}%`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Background Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={controls}
          className="absolute w-[500px] h-[500px] bg-purple-500 rounded-full blur-[128px] -top-48 -right-24 opacity-20"
        />
        <motion.div
          animate={controls}
          className="absolute w-[500px] h-[500px] bg-blue-500 rounded-full blur-[128px] -bottom-48 -left-24 opacity-20"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 relative"
      >
        <motion.div
          variants={headingVariants}
          className="flex flex-col items-center justify-center mb-10 space-y-4"
        >
          <div className="relative">
            <h2 className="text-4xl font-black tracking-wider text-center bg-gradient-to-r from-purple-500 to-indigo-400 text-transparent bg-clip-text">
              Services
            </h2>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-indigo-400/20 blur-lg -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            />
          </div>
          <motion.div className="relative">
            <motion.small className="text-gray-400 text-center tracking-widest block">
              WHICH I&apos;M EXPERT AT
            </motion.small>
            <motion.span
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-400"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </motion.div>
        </motion.div>

        <motion.section variants={containerVariants} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={serviceVariants}
                whileHover="hover"
                className="group relative p-10 border border-purple-500/30 rounded-lg backdrop-blur-sm bg-purple-900/10 hover:border-purple-400 transition-all duration-300"
              >
                {/* Service Card Glow Effect */}
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  initial={false}
                />

                <motion.div
                  variants={iconVariants}
                  className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300 relative"
                >
                  {/* Icon Glow */}
                  <motion.div
                    className="absolute inset-0 bg-purple-500/20 blur-md -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.2 }}
                  />
                  {service.icon}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-white mt-4 space-y-3"
                >
                  <h4 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {service.title}
                  </h4>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </section>
  );
}
