"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

interface AccordionProps {
  faq: {
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onToggle: () => void;
}

export default function Accordion({ faq }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`border rounded-lg transition-colors duration-300 ${
        isOpen
          ? "border-purple-500 bg-purple-900/20"
          : "border-purple-900 bg-transparent"
      }`}
    >
      <button
        className={`w-full flex justify-between items-center p-4 text-left text-white rounded-lg transition-colors duration-300 ${
          isOpen
            ? "bg-purple-900/30 hover:bg-purple-900/40"
            : "bg-[#141026] hover:bg-[#1E1A2E]"
        }`}
        onClick={() => toggleAccordion()}
      >
        <span className="font-semibold">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown
            className={`w-5 h-5 transition-colors duration-300 ${
              isOpen ? "text-purple-400" : "text-gray-400"
            }`}
          />
        </motion.div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="p-4 text-gray-400">{faq.answer}</p>
      </motion.div>
    </div>
  );
}
