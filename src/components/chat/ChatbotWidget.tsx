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
  buildGmailCompose,
  buildOutlookCompose,
  openMailtoLink,
  getChatResponse,
  withSectionNotice,
  getSectionLabel,
} from "@/lib/chatbot/chatbot.core";
import { OWNER_EMAIL } from "@/lib/chatbot/mail.chat";
import { playChatSfx } from "@/lib/chatbot/chat.sfx";
import "@/styles/chatbot.css";
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
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
    | null;
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
    <div className="msg-row bot">
      <div className="mini-face">
        <Image src={CARTOON} alt="" width={40} height={40} />
      </div>
      <div className="msg bot typing" aria-label="Assistant is typing">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

function ProjectCards({ projects }: { projects: ProjectCard[] }): JSX.Element {
  return (
    <div className="project-list" aria-label="Projects">
      {projects.map((project) => (
        <article className="project-item" key={project.name}>
          <div className="project-item-heading">
            <Bot size={15} aria-hidden="true" />
            <strong>{project.name}</strong>
          </div>
          <p>{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function SkillCards({ skills }: { skills: SkillCard[] }): JSX.Element {
  return (
    <div className="skill-list" aria-label="Skills">
      {skills.map((skill) => (
        <div className="skill-item" key={skill.name}>
          <span
            className="skill-logo"
            aria-hidden="true"
            style={{ backgroundImage: `url(${skill.logo})` }}
          />
          <span>{skill.name}</span>
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
    <div className="social-list" aria-label="Social networks">
      {socials.map((social) => (
        <a
          className="social-item"
          href={social.url}
          key={social.name}
          target="_blank"
          rel="noreferrer"
        >
          <span className="social-icon">
            {icons[social.name] || <ExternalLink size={17} />}
          </span>
          <span>{social.name}</span>
          <ExternalLink
            className="social-external"
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

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    const chatLauncher = document.querySelector(".launcher-wrap");

    if (chatLauncher) {
      if (currentScroll > 400) {
        chatLauncher.classList.remove("hidden");
      } else {
        chatLauncher.classList.add("hidden");
      }
    }
  });

  return (
    <>
      {trackBanner ? (
        <div className="track-banner" role="status" aria-live="polite">
          {trackBanner}
        </div>
      ) : null}

      {!open && (
        <button
          type="button"
          className="chat-launcher"
          title="Open portfolio assistant"
          aria-label="Open portfolio assistant"
          onClick={() => (open ? onClose() : onOpen())}
        >
          <div className="launcher-wrap hidden">
            <span className="launcher-lines" aria-hidden="true" />
            <span className="launcher-core">
              <Image
                src={CARTOON}
                alt="Anbu cartoon assistant"
                width={124}
                height={124}
              />
            </span>
            <span className="launcher-badge">Chat</span>
          </div>
        </button>
      )}

      {open && (
        <aside className="chat-panel" aria-label="Portfolio Assistant">
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-mascot-icon">
                <Image src={CARTOON} alt="" width={40} height={40} />
              </div>
              <div>
                <h3>Dobby - Anbu&apos;s Assistant</h3>
                <div className="chat-status">
                  <i /> Online
                </div>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                type="button"
                className="chat-close"
                aria-label="Hide chatbot"
                title="Hide it"
                onClick={onHide}
              >
                <EyeOff size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="chat-close"
                aria-label="Close chatbot"
                onClick={onClose}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="chat-messages" ref={listRef}>
            {messages.map((msg: ChatMessage) =>
              msg.role === "bot" ? (
                <div key={msg.id} className="msg-row bot">
                  <div className="mini-face">
                    <Image src={CARTOON} alt="" width={40} height={40} />
                  </div>
                  <div className="msg bot">
                    <div>{msg.text}</div>
                    {msg.projects ? (
                      <ProjectCards projects={msg.projects} />
                    ) : null}
                    {msg.skills ? <SkillCards skills={msg.skills} /> : null}
                    {msg.socials ? <SocialCards socials={msg.socials} /> : null}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="msg-row user">
                  <div className="msg user">{msg.text}</div>
                </div>
              ),
            )}

            {typing && <TypingDots />}

            {showEmailForm && (
              <div className="msg-row bot">
                <div className="mini-face">
                  <Image src={CARTOON} alt="" width={40} height={40} />
                </div>
                <div className="msg bot">
                  <div className="email-box">
                    <label htmlFor="visitorEmail">
                      Enter your email to continue
                    </label>
                    <div className="email-row">
                      <input
                        id="visitorEmail"
                        type="email"
                        placeholder="you@email.com"
                        value={visitorEmail}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setVisitorEmail(e.target.value);
                          setMailStatus("");
                        }}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === "Enter") openMailApp();
                        }}
                      />
                    </div>
                    <div className="email-actions">
                      <button type="button" onClick={openMailApp}>
                        Compose a mail
                      </button>
                      <button
                        type="button"
                        className="ghost"
                        onClick={copyMailDetails}
                      >
                        Copy details
                      </button>
                    </div>
                    {mailStatus ? (
                      <p
                        style={{
                          fontSize: "0.76rem",
                          color: "var(--orange-2)",
                        }}
                      >
                        {mailStatus}
                      </p>
                    ) : (
                      <p style={{ fontSize: "0.74rem", color: "var(--muted)" }}>
                        Say hi. No spam, no tracking.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!typing && !showEmailForm && (
              <div className="suggestions">
                {(SUGGESTIONS as { text: string; label: string }[]).map((s) => (
                  <button
                    key={s.text}
                    type="button"
                    onClick={() => handleSend(s.text)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {voiceHint ? <div className="voice-hint">{voiceHint}</div> : null}

          <div className="chat-input-area">
            <button
              type="button"
              className={`speech-language ${speechLanguage === "ta-IN" && "font-mono"}`}
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
              className={`icon-btn ${listening ? "listening" : ""}`}
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
            />
            <button
              type="button"
              className="icon-btn send"
              aria-label="Send"
              onClick={() => handleSend()}
            >
              <Send size={18} aria-hidden="true" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
