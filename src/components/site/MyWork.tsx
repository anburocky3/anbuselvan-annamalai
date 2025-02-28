"use client";

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

export default function MyWork() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="projects" className="bg-black py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4"
      >
        <motion.div
          variants={headingVariants}
          className="flex flex-col items-center justify-center mb-10 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl font-black tracking-wider text-center bg-gradient-to-r from-purple-500 to-indigo-400 text-transparent bg-clip-text">
            My Work
          </h2>
          <motion.small
            variants={headingVariants}
            className="text-gray-400 text-center tracking-widest relative"
          >
            RECENT PROJECTS
            <motion.span
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-400"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </motion.small>
        </motion.div>

        <motion.section variants={containerVariants} className="space-y-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={projectVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                type={project.type}
                title={project.title}
                description={project.description}
                image={project.image}
                features={project.features}
                tags={project.tags}
                link={project.link}
              />
            </motion.div>
          ))}
        </motion.section>
      </motion.div>
    </section>
  );
}
