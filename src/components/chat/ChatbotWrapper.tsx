"use client";

import { useEffect, useState } from "react";
import ChatbotWidget from "./ChatbotWidget";
import { playChatSfx } from "@/lib/chatbot/chat.sfx";

export function ChatbotWrapper() {
  const [chatOpen, setChatOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("portfolioChatHidden") === "true") {
      setHidden(true);
      return;
    }

    if (!sessionStorage.getItem("chatAutoOpened")) {
      const t = setTimeout(() => {
        setChatOpen(true);
        sessionStorage.setItem("chatAutoOpened", "true");
        playChatSfx("popup");
      }, 5000);
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

  if (hidden) return null;

  return (
    <ChatbotWidget
      open={chatOpen}
      onOpen={() => setChatOpen(true)}
      onClose={() => setChatOpen(false)}
      onHide={() => {
        localStorage.setItem("portfolioChatHidden", "true");
        setChatOpen(false);
        setHidden(true);
      }}
    />
  );
}
