"use client";

import { useEffect, useState } from "react";
import ChatbotWidget from "./ChatbotWidget";

export function ChatbotWrapper() {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1000 && !sessionStorage.getItem("chatAutoOpened")) {
      const t = setTimeout(() => {
        setChatOpen(true);
        sessionStorage.setItem("chatAutoOpened", "true");
      }, 900);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChatOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ChatbotWidget
      open={chatOpen}
      onOpen={() => setChatOpen(true)}
      onClose={() => setChatOpen(false)}
    />
  );
}
