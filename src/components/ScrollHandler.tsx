"use client";

import { useEffect } from "react";
import { initScrollHandlers } from "@/utils/scroll";
import { FaArrowUp } from "react-icons/fa6";

export default function ScrollHandler() {
  useEffect(() => {
    initScrollHandlers();
  }, []);

  return (
    <div id="scrollUp" className="progress-wrap">
      <FaArrowUp className="text-white text-2xl" />
    </div>
  );
}
