"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion";

interface ProjectCardProps {
  type: "app" | "website" | "design" | "other";
  title: string;
  description: string;
  features: string[];
  image: string;
  tags: string[];
  link?: string;
  openLinkNewTab?: boolean;
}

export default function ProjectCard({
  type,
  title,
  description,
  features,
  image,
  tags,
  link,
  openLinkNewTab = true,
}: ProjectCardProps) {
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-purple-900 border border-purple-800/30 p-6 md:p-10 justify-between rounded-2xl text-white max-w-6xl mx-auto flex flex-col md:flex-row sm:space-x-10 space-y-10 sm:space-y-0 hover:border-purple-600/50 transition-colors duration-300">
      <div className="space-y-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-purple-400 uppercase text-sm font-semibold"
        >
          {type}
        </motion.p>
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold mt-2"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300 mt-2"
          >
            {description}
          </motion.p>
        </div>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
          className="mt-4 space-y-4 text-gray-300 my-10"
        >
          {features.map((feature) => (
            <motion.li
              variants={featureVariants}
              className="flex items-center"
              key={feature}
            >
              <motion.span
                whileHover={{ scale: 1.2, color: "#22c55e" }}
                transition={{ duration: 0.2 }}
              >
                <FaCheck className="mr-2 text-green-500" />
              </motion.span>
              {feature}
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.6 }}
          className="flex gap-2 mt-6 flex-wrap"
        >
          {tags.map((tag) => (
            <motion.span
              variants={tagVariants}
              whileHover="hover"
              className="bg-blue-900/50 backdrop-blur-sm flex items-center justify-center text-white text-sm px-4 py-1 rounded-full capitalize"
              key={tag}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
        {link && (
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ x: 5 }}
            href={link}
            target={openLinkNewTab ? "_blank" : "_self"}
            className="inline-block mt-6 text-purple-50 hover:text-purple-300 transition-colors group"
          >
            View Live Project{" "}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex-1"
      >
        <motion.div whileHover="hover" className="rounded-xl overflow-hidden">
          <motion.div variants={imageVariants}>
            <Image
              src={image}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full border-4 border-gray-500/30 object-cover rounded-lg"
              alt="Project Preview"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
