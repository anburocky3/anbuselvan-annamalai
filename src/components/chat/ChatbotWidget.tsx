"use client";

import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
  JSX,
} from "react";
import {
  SUGGESTIONS,
  buildMailto,
  openMailtoLink,
  getChatResponse,
  withSectionNotice,
  getSectionLabel,
} from "@/lib/chatbot/chatbot.core";
import { OWNER_EMAIL } from "@/lib/chatbot/mail.chat";
import { playChatSfx } from "@/lib/chatbot/chat.sfx";
import Image from "next/image";
import {
  Bot,
  ExternalLink,
  EyeOff,
  Github,
  Instagram,
  Linkedin,
  Mic,
  Send,
  X,
  Youtube,
} from "lucide-react";

const CARTOON: string = "/images/anbu-cartoon.jpg";

// Web Speech API interfaces to avoid implicit 'any'
interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onerror: ((this: SpeechRecognition, ev: Event) => void) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult:
    ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
  projects?: ProjectCard[];
  skills?: SkillCard[];
  socials?: SocialCard[];
}

interface ProjectCard {
  name: string;
  description: string;
  tags: string[];
}

interface SkillCard {
  name: string;
  logo: string;
}

interface SocialCard {
  name: string;
  url: string;
}

// Extracted context type to avoid 'any'
type ChatContext = Record<string, unknown> | null;

interface ChatReply {
  text: string;
  context?: ChatContext;
  scrollTo?: string;
  needsEmail?: boolean;
  pendingQuestion?: string;
  projects?: ProjectCard[];
  skills?: SkillCard[];
  socials?: SocialCard[];
}

interface ChatWidgetProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onHide: () => void;
}

interface EmailPayload {
  visitorEmail: string;
  question: string;
}

function TypingDots(): JSX.Element {
  return (
    <div className="flex gap-2 items-end animate-msg-in">
      <div className="w-7 h-7 rounded-full overflow-hidden border-[1.5px] border-[#ff9a1f]/70 shrink-0 mb-1">
        <Image
          src={CARTOON}
          alt=""
          width={40}
          height={40}
          className="w-full h-full object-cover scale-[1.55]"
          style={{ objectPosition: "52% 18%" }}
        />
      </div>
      <div
        className="inline-flex gap-1.5 items-center px-4 py-3 rounded-2xl rounded-bl-xs bg-slate-100 dark:bg-white/[0.07] border border-slate-200 dark:border-white/10"
        aria-label="Assistant is typing"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] animate-blink" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] animate-blink [animation-delay:0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] animate-blink [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

function ProjectCards({ projects }: { projects: ProjectCard[] }): JSX.Element {
  return (
    <div className="grid gap-2 mt-3" aria-label="Projects">
      {projects.map((project) => (
        <article
          className="p-2.5 rounded-xl bg-black/3 dark:bg-black/30 border border-[#ff6a00]/25 dark:border-[#ff9a1f]/20"
          key={project.name}
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-700 dark:text-[#ffd7a8]">
            <Bot size={15} aria-hidden="true" />
            <strong>{project.name}</strong>
          </div>
          <p className="mt-1 text-xs leading-normal text-slate-700 dark:text-white/80">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded-full text-[0.66rem] bg-white dark:bg-transparent border border-black/10 dark:border-white/15 text-slate-600 dark:text-[#f4f0ea]/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function SkillCards({ skills }: { skills: SkillCard[] }): JSX.Element {
  return (
    <div className="grid grid-cols-2 gap-2 mt-3" aria-label="Skills">
      {skills.map((skill) => (
        <div
          className="flex items-center gap-2 min-w-0 p-2 rounded-lg text-xs font-semibold bg-black/3 dark:bg-black/30 border border-[#ff6a00]/25 dark:border-[#ff9a1f]/20 text-slate-900 dark:text-[#f4f0ea]"
          key={skill.name}
        >
          <span
            className="w-6 h-6 shrink-0 rounded-md bg-center bg-no-repeat bg-size-[15px] bg-slate-200/70 dark:bg-white/8"
            aria-hidden="true"
            style={{ backgroundImage: `url(${skill.logo})` }}
          />
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  );
}

function SocialCards({ socials }: { socials: SocialCard[] }): JSX.Element {
  const icons: Record<string, JSX.Element> = {
    Instagram: <Instagram size={17} aria-hidden="true" />,
    GitHub: <Github size={17} aria-hidden="true" />,
    LinkedIn: <Linkedin size={17} aria-hidden="true" />,
    YouTube: <Youtube size={17} aria-hidden="true" />,
    "CyberDude YouTube": <Youtube size={17} aria-hidden="true" />,
  };

  return (
    <div className="grid gap-2 mt-3" aria-label="Social networks">
      {socials.map((social) => (
        <a
          className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold no-underline transition-colors bg-black/3 dark:bg-black/30 border border-[#ff6a00]/25 dark:border-[#ff9a1f]/20 text-slate-900 dark:text-[#f4f0ea] hover:border-[#ff9a1f]/70 hover:bg-[#ff6a00]/10 dark:hover:bg-[#ff6a00]/20"
          href={social.url}
          key={social.name}
          target="_blank"
          rel="noreferrer"
        >
          <span className="grid place-items-center text-orange-700 dark:text-[#ffd7a8]">
            {icons[social.name] || <ExternalLink size={17} />}
          </span>
          <span>{social.name}</span>
          <ExternalLink
            className="ml-auto text-slate-400 dark:text-white/50"
            size={13}
            aria-hidden="true"
          />
        </a>
      ))}
    </div>
  );
}

export default function ChatbotWidget({
  open,
  onOpen,
  onClose,
  onHide,
}: ChatWidgetProps): JSX.Element {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hi Vanakkam! 👋✨ What would you like to know about Anbu? Ask about a section and I’ll take you there — watch the page scroll!",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [typing, setTyping] = useState<boolean>(false);
  const [listening, setListening] = useState<boolean>(false);
  const [pendingQuestion, setPendingQuestion] = useState<string>("");
  const [visitorEmail, setVisitorEmail] = useState<string>("");
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
  const [, setContext] = useState<ChatContext>(null);
  const [voiceHint, setVoiceHint] = useState<string>("");
  const [mailStatus, setMailStatus] = useState<string>("");
  const [trackBanner, setTrackBanner] = useState<string | null>(null);
  const [speechLanguage, setSpeechLanguage] = useState<"en-IN" | "ta-IN">(
    "en-IN",
  );
  const [launcherVisible, setLauncherVisible] = useState<boolean>(false);

  const listRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bannerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, showEmailForm, mailStatus]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  useEffect(() => {
    const handleScroll = (): void => {
      // If page is short, always show launcher so users can interact
      const isShortPage =
        document.documentElement.scrollHeight <= window.innerHeight + 250;
      setLauncherVisible(window.scrollY > 300 || isShortPage);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {
        /* ignore */
      }
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
      if (bannerTimer.current) clearTimeout(bannerTimer.current);

      document
        .querySelectorAll(".section-tracked")
        .forEach((el: Element) => el.classList.remove("section-tracked"));
    };
  }, []);

  function scrollToSection(id?: string): void {
    if (!id) return;
    const el: HTMLElement | null = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    document
      .querySelectorAll(".section-tracked")
      .forEach((node: Element) => node.classList.remove("section-tracked"));
    el.classList.add("section-tracked");

    if (highlightTimer.current) clearTimeout(highlightTimer.current);
    highlightTimer.current = setTimeout(() => {
      el.classList.remove("section-tracked");
    }, 3200);

    const label: string = getSectionLabel(id) as string;
    setTrackBanner(`Looking at ${label} ↓`);

    if (bannerTimer.current) clearTimeout(bannerTimer.current);
    bannerTimer.current = setTimeout(() => setTrackBanner(null), 4000);
  }

  async function handleSend(rawText?: string): Promise<void> {
    const question: string = String(rawText ?? input).trim();
    if (!question || typing) return;

    if (question.length > 1000) {
      setMessages((prev: ChatMessage[]) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: "😅 Please keep your question under 1000 characters.",
        },
      ]);
      return;
    }

    setInput("");
    setMailStatus("");
    setMessages((prev: ChatMessage[]) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text: question },
    ]);
    setTyping(true);
    setShowEmailForm(false);

    await new Promise((r) => setTimeout(r, 360));

    // Type assertion assumes your library returns this shape
    const response = getChatResponse(question);
    const reply = withSectionNotice({
      ...response,
      scrollTo: response.scrollTo ?? undefined,
    }) as ChatReply;
    setTyping(false);

    if (reply.context) setContext(reply.context);
    if (reply.scrollTo) scrollToSection(reply.scrollTo);

    setMessages((prev: ChatMessage[]) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "bot",
        text: reply.text,
        projects: reply.projects,
        skills: reply.skills,
        socials: reply.socials,
      },
    ]);

    if (reply.needsEmail) {
      setPendingQuestion(reply.pendingQuestion || question);
      setShowEmailForm(true);
    }
  }

  function validateEmail(): string | null {
    const email: string = visitorEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMailStatus("Enter a valid email so Anbu can reply.");
      return null;
    }
    return email;
  }

  function getPayload(email: string): EmailPayload {
    return {
      visitorEmail: email,
      question: pendingQuestion || "Visitor inquiry from portfolio chatbot",
    };
  }

  function openMailApp(): void {
    const email: string | null = validateEmail();
    if (!email) return;
    try {
      openMailtoLink(buildMailto(getPayload(email)) as string);
      setMailStatus(
        `Mail app should open for ${OWNER_EMAIL}. If not, try Gmail / Outlook.`,
      );
    } catch {
      setMailStatus("Could not open mail app. Try Gmail / Outlook Web.");
    }
  }

  async function copyMailDetails(): Promise<void> {
    const email: string | null = validateEmail();
    if (!email) return;
    const payload: EmailPayload = getPayload(email);
    const text: string = `To: ${OWNER_EMAIL}\nFrom/Reply: ${payload.visitorEmail}\n\n${payload.question}`;
    try {
      await navigator.clipboard.writeText(text);
      setMailStatus("Copied! Paste into any mail and send to Anbu.");
    } catch {
      setMailStatus(`Email Anbu at ${OWNER_EMAIL}`);
    }
  }

  function toggleVoice(): void {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceHint("Voice needs Chrome / Edge.");
      return;
    }

    if (recognitionRef.current) {
      playChatSfx("mic-stop");
      try {
        recognitionRef.current.stop();
      } catch {
        recognitionRef.current.abort();
      }
      recognitionRef.current = null;
      setListening(false);
      setVoiceHint("");
      return;
    }

    playChatSfx("mic-start");
    const recognition: SpeechRecognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    const lastBot: ChatMessage | undefined = [...messages]
      .reverse()
      .find((m) => m.role === "bot");

    const preferTamil: boolean =
      /[\u0B80-\u0BFF]/.test(input) ||
      /தமிழ்|vanakkam|vanakam/i.test(lastBot?.text || "");

    recognition.lang = preferTamil ? "ta-IN" : speechLanguage;
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = (): void => {
      setListening(true);
      setVoiceHint("Listening…");
    };

    recognition.onerror = (): void => {
      playChatSfx("mic-stop");
      recognitionRef.current = null;
      setListening(false);
      setVoiceHint("Couldn’t catch that — try again.");
    };

    recognition.onend = (): void => {
      recognitionRef.current = null;
      setListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent): void => {
      let transcript: string = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript.trim());
      if (event.results[event.results.length - 1]?.isFinal) {
        if (/[\u0B80-\u0BFF]/.test(transcript)) setSpeechLanguage("ta-IN");
        setVoiceHint("");
        handleSend(transcript.trim());
      }
    };

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setListening(false);
      setVoiceHint("Couldn’t start the microphone — try again.");
      playChatSfx("mic-stop");
    }
  }

  return (
    <div className="chatbot-container">
      {trackBanner ? (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-150 text-white font-extrabold text-sm px-4 py-2.5 rounded-full shadow-[0_12px_30px_rgba(255,106,0,0.4)] pointer-events-none whitespace-nowrap max-w-[calc(100vw-2rem)] truncate animate-banner-in bg-linear-to-r from-[#ff6a00] to-[#ff8c1a]"
          role="status"
          aria-live="polite"
        >
          {trackBanner}
        </div>
      ) : null}

      {!open && (
        <button
          type="button"
          className={`fixed z-140 w-24 h-24 sm:w-28 sm:h-28 border-0 bg-transparent cursor-pointer p-0 right-4 sm:right-20 md:right-24 bottom-4 sm:bottom-6 transition-all duration-300 ease-out ${
            launcherVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-6 pointer-events-none"
          }`}
          title="Open portfolio assistant"
          aria-label="Open portfolio assistant"
          onClick={() => (open ? onClose() : onOpen())}
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto group">
            {/* Spinning decorative rays */}
            <span
              className="absolute -inset-2.5 rounded-full blur-[0.2px] opacity-85 animate-spin-slow"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(255,106,0,0.55) 10deg 12deg)",
              }}
              aria-hidden="true"
            />
            {/* Avatar core */}
            <span className="absolute inset-1.5 rounded-full overflow-hidden border-[3px] border-[#ff8c1a] z-10 bg-white dark:bg-[#1a1020] shadow-[0_8px_30px_rgba(255,106,0,0.35)] dark:shadow-[0_0_22px_rgba(255,106,0,0.55)] transition-transform duration-200 group-hover:scale-105 block w-[calc(100%-12px)] h-[calc(100%-12px)]">
              <Image
                src={CARTOON}
                alt="Anbu cartoon assistant"
                width={124}
                height={124}
                className="w-full h-full object-cover saturate-[1.15] contrast-[1.05] animate-face-wiggle"
              />
            </span>
            {/* Chat badge */}
            <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 z-20 text-white text-[0.62rem] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full border-[1.5px] border-[#fff4d8] shadow-[0_4px_10px_rgba(0,0,0,0.35)] bg-linear-to-r from-[#ff6a00] to-[#ff8c1a]">
              Chat
            </span>
          </div>
        </button>
      )}

      {open && (
        <aside
          className="fixed z-140 flex flex-col rounded-3xl overflow-hidden backdrop-blur-xl animate-panel-in right-4 sm:right-6 md:right-8 bottom-4 sm:bottom-6 w-[min(380px,calc(100vw-1.5rem))] h-[min(580px,calc(100dvh-5rem))] bg-white/95 dark:bg-[#100a18]/90 border border-black/10 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.16)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] text-slate-900 dark:text-[#f4f0ea] font-sans transition-colors duration-200"
          aria-label="Portfolio Assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2.5 px-4 py-3.5 border-b border-black/10 dark:border-white/10 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#ff9a1f]/80 shrink-0 shadow-[0_0_12px_rgba(255,106,0,0.35)]">
                <Image
                  src={CARTOON}
                  alt=""
                  width={40}
                  height={40}
                  className="w-full h-full object-cover scale-[1.55]"
                  style={{ objectPosition: "52% 18%" }}
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-[#f4f0ea] leading-tight m-0">
                  Dobby - Anbu&apos;s Assistant
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-white/70 mt-0.5">
                  <i className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55e]" />{" "}
                  Online
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-white/70 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150 cursor-pointer"
                aria-label="Hide chatbot"
                title="Hide it"
                onClick={onHide}
              >
                <EyeOff size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-white/70 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-150 cursor-pointer"
                aria-label="Close chatbot"
                onClick={onClose}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 overscroll-contain"
            ref={listRef}
          >
            {messages.map((msg: ChatMessage) =>
              msg.role === "bot" ? (
                <div
                  key={msg.id}
                  className="flex gap-2 items-end animate-msg-in"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden border-[1.5px] border-[#ff9a1f]/70 shrink-0 mb-1">
                    <Image
                      src={CARTOON}
                      alt=""
                      width={40}
                      height={40}
                      className="w-full h-full object-cover scale-[1.55]"
                      style={{ objectPosition: "52% 18%" }}
                    />
                  </div>
                  <div className="max-w-[min(270px,78%)] px-3.5 py-3 rounded-2xl rounded-bl-xs text-[0.92rem] leading-relaxed whitespace-pre-wrap wrap-break-word bg-slate-100 dark:bg-white/[0.07] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#f4f0ea] shadow-xs">
                    <div>{msg.text}</div>
                    {msg.projects ? (
                      <ProjectCards projects={msg.projects} />
                    ) : null}
                    {msg.skills ? <SkillCards skills={msg.skills} /> : null}
                    {msg.socials ? <SocialCards socials={msg.socials} /> : null}
                  </div>
                </div>
              ) : (
                <div
                  key={msg.id}
                  className="flex gap-2 items-end justify-end animate-msg-in"
                >
                  <div className="max-w-[min(270px,78%)] px-3.5 py-3 rounded-2xl rounded-br-xs text-[0.92rem] leading-relaxed whitespace-pre-wrap wrap-break-word text-white bg-linear-to-r from-[#ff6a00] to-[#ff8c1a] shadow-xs">
                    {msg.text}
                  </div>
                </div>
              ),
            )}

            {typing && <TypingDots />}

            {showEmailForm && (
              <div className="flex gap-2 items-end animate-msg-in">
                <div className="w-7 h-7 rounded-full overflow-hidden border-[1.5px] border-[#ff9a1f]/70 shrink-0 mb-1">
                  <Image
                    src={CARTOON}
                    alt=""
                    width={40}
                    height={40}
                    className="w-full h-full object-cover scale-[1.55]"
                    style={{ objectPosition: "52% 18%" }}
                  />
                </div>
                <div className="max-w-[min(270px,78%)] px-3.5 py-3 rounded-2xl rounded-bl-xs text-[0.92rem] leading-relaxed whitespace-pre-wrap wrap-break-word bg-slate-100 dark:bg-white/[0.07] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#f4f0ea] shadow-xs">
                  <div className="grid gap-2">
                    <label
                      htmlFor="visitorEmail"
                      className="text-xs font-bold text-[#ea580c] dark:text-[#ff9a1f]"
                    >
                      Enter your email to continue
                    </label>
                    <div className="w-full">
                      <input
                        id="visitorEmail"
                        type="email"
                        placeholder="you@email.com"
                        value={visitorEmail}
                        className="w-full rounded-xl px-3 py-2 text-sm border border-black/10 dark:border-white/15 bg-slate-50 dark:bg-black/35 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/45 outline-none focus:border-[#ff6a00]/60 focus:ring-2 focus:ring-[#ff6a00]/20"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setVisitorEmail(e.target.value);
                          setMailStatus("");
                        }}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === "Enter") openMailApp();
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={openMailApp}
                        className="rounded-lg p-2 text-xs font-bold text-white cursor-pointer border border-[#ff9a1f]/45 bg-linear-to-r from-[#ff6a00] to-[#ff8c1a] hover:brightness-105 active:scale-95 transition-all"
                      >
                        Compose a mail
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-2 text-xs font-bold cursor-pointer border border-transparent bg-transparent text-orange-700 dark:text-[#ffd7a8] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        onClick={copyMailDetails}
                      >
                        Copy details
                      </button>
                    </div>
                    {mailStatus ? (
                      <p className="text-[0.76rem] text-orange-600 dark:text-[#ff9a1f]">
                        {mailStatus}
                      </p>
                    ) : (
                      <p className="text-[0.74rem] text-slate-500 dark:text-white/60">
                        Say hi. No spam, no tracking.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!typing && !showEmailForm && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {(SUGGESTIONS as { text: string; label: string }[]).map((s) => (
                  <button
                    key={s.text}
                    type="button"
                    className="rounded-full px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors border border-black/10 dark:border-white/15 bg-slate-100 dark:bg-white/6 text-slate-800 dark:text-white hover:border-[#ff9a1f]/60 hover:text-[#ea580c] hover:bg-[#ff6a00]/10 dark:hover:bg-[#ff6a00]/20"
                    onClick={() => handleSend(s.text)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {voiceHint ? (
            <div className="text-xs px-3.5 pb-2 text-slate-500 dark:text-white/70 italic">
              {voiceHint}
            </div>
          ) : null}

          {/* Input Area */}
          <div className="flex items-center gap-2 p-3.5 border-t border-black/10 dark:border-white/10 bg-white/85 dark:bg-transparent shrink-0">
            <button
              type="button"
              className={`min-w-10.5 h-10.5 px-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-colors border border-black/10 dark:border-white/15 bg-slate-100 dark:bg-white/6 text-orange-600 dark:text-[#f5c76a] hover:bg-[#ff6a00]/10 dark:hover:bg-[#ff6a00]/20 flex items-center justify-center shrink-0 ${
                speechLanguage === "ta-IN" ? "font-mono" : ""
              }`}
              aria-label={`Switch speech language to ${speechLanguage === "en-IN" ? "Tamil" : "English"}`}
              title={`Speech: ${speechLanguage === "en-IN" ? "English" : "Tamil"}`}
              onClick={() =>
                setSpeechLanguage((current) =>
                  current === "en-IN" ? "ta-IN" : "en-IN",
                )
              }
            >
              {speechLanguage === "en-IN" ? "EN" : "தமிழ்"}
            </button>
            <button
              type="button"
              className={`w-10.5 h-10.5 rounded-xl cursor-pointer flex items-center justify-center shrink-0 transition-all border border-black/10 dark:border-white/15 bg-slate-100 dark:bg-white/6 text-slate-800 dark:text-white hover:bg-[#ff6a00]/10 dark:hover:bg-[#ff6a00]/20 ${
                listening
                  ? "bg-rose-600! text-white! border-rose-500! animate-listen-pulse"
                  : ""
              }`}
              aria-label="Voice input"
              onClick={toggleVoice}
            >
              <Mic size={18} aria-hidden="true" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about Anbuselvan..."
              aria-label="Chat message"
              autoComplete="off"
              className="flex-1 min-w-0 rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors border border-black/10 dark:border-white/15 bg-slate-50 dark:bg-black/35 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/45 focus:border-[#ff6a00]/60 focus:ring-2 focus:ring-[#ff6a00]/20"
            />
            <button
              type="button"
              className="w-10.5 h-10.5 rounded-xl cursor-pointer flex items-center justify-center shrink-0 transition-transform active:scale-95 text-white bg-linear-to-r from-[#ff6a00] to-[#ff8c1a] shadow-xs hover:brightness-105 border-0"
              aria-label="Send"
              onClick={() => handleSend()}
            >
              <Send size={18} aria-hidden="true" />
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
