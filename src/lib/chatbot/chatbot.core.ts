import { portfolio } from "./portfolio.chat";
export {
  buildMailto,
  buildGmailCompose,
  buildOutlookCompose,
  openMailtoLink,
  OWNER_EMAIL,
} from "./mail.chat";

export function normalize(text: string) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[!?.,;:]+/g, " ")
    .replace(/\s+/g, " ");
}

export function detectLanguage(text: string) {
  const original = String(text || "").trim();

  if (/[\u0B80-\u0BFF]/.test(original)) {
    return "tamil";
  }

  const q = original.toLowerCase();
  const tanglishPatterns = [
    /\bvanakkam\b/,
    /\bvanakam\b/,
    /\bepdi\b/,
    /\benna\b/,
    /\benga\b/,
    /\bengae\b/,
    /\bavar\b/,
    /\bavaru\b/,
    /\bavanga\b/,
    /\bavaroda\b/,
    /\bavaruoda\b/,
    /\bpathi\b/,
    /\bpanraru\b/,
    /\bpanraaru\b/,
    /\bpanniruk\b/,
    /\bpannirukanga\b/,
    /\btheriyuma\b/,
    /\btheriyum\b/,
    /\bsollunga\b/,
    /\bkekka\b/,
    /\bkekanum\b/,
    /\birukku\b/,
    /\birukura\b/,
    /\bpesu\b/,
    /\bpesunga\b/,
    /\bvenum\b/,
    /\bvenuma\b/,
    /\bnga\b/,
    /\byaaru\b/,
    /\byaru\b/,
  ];

  if (tanglishPatterns.some((pattern) => pattern.test(q))) {
    return "tanglish";
  }

  return "english";
}

const abusiveWords = [
  "fuck",
  "fucking",
  "shit",
  "bitch",
  "bastard",
  "idiot",
  "stupid",
  "asshole",
  "moron",
  "dumb",
  "motherfucker",
  "poruki",
  "punda",
  "ommala",
  "sunni",
  "dai",
  "otha",
  "othaa",
  "koothi",
  "punda",
  "pundai",
  "pundaati",
  "sombu",
  "sombu mandaya",
  "thevdiya",
  "thevdiya payal",
  "thevidiya",
  "thevidiya magan",
  "thevidiya paiya",
  "saniyan",
  "sani kudhira",
  "soothu",
  "sappa figure",
  "kundi",
  "sattai",
  "nayyandi",
  "nayyadi",
  "gathi illatha",
  "kandupidikka mudiyala",
  "muttaala",
  "mandaya",
  "kevalam",
  "kevalamana paiyan",
  "onnume puriyala",
  "seiyarathu enna",
  "thala vazhi",
  "sani thooral",
  "vittu",
  "vittu vettu",
  "po da",
  "po di",
  "venda",
  "sethuru",
  "aapu",
  "pundaikku aapu",
  "soodu",
  "moona veli",
  "enna da dei",
  "mokka",
  "mokkai",
  "saavu graaki",
  "munda",
  "seththu poi",
  "mandaya pichu",
  "edhiri",
  "thukali",
  "arai en 5",
  "kudunga mairu",
  "mairu",
  "mayiru",
  "புண்ட",
  "புண்டை",
  "புண்டாட்டி",
  "சோம்பு",
  "சோம்பு மண்டைய",
  "தேவடியா",
  "தேவடியா பயல்",
  "தேவிடியா",
  "தேவிடியா மகன்",
  "தேவிடியா பைய",
  "சாணியன்",
  "சாணி குதிர",
  "சூத்து",
  "சப்பா ஃபிகர்",
  "குண்டி",
  "சட்டை",
  "நையாண்டி",
  "நையாடி",
  "கதி இல்லாத",
  "கண்டுபிடிக்க முடியல",
  "முட்டாள",
  "மண்டைய",
  "கேவலம்",
  "கேவலமான பையன்",
  "ஒன்னும் புரியல",
  "செய்யரது என்ன",
  "தலை வழி",
  "சாணி தூறல்",
  "விட்டு",
  "விட்டு வெட்டு",
  "போ டா",
  "போ டி",
  "வேண்டா",
  "செத்துறு",
  "ஆப்பு",
  "புண்டைக்கு ஆப்பு",
  "சூடு",
  "மூணா வெளி",
  "என்ன டா டெய்",
  "மொக்கா",
  "மொக்கை",
  "சாவு கிராக்கி",
  "முண்ட",
  "செத்து போயி",
  "மண்டைய பிச்சு",
  "எதிரி",
  "தூகலி",
  "அரை என் ஐந்து",
  "குடுங்க மைறு",
];

export function containsAbusiveLanguage(text: string) {
  const q = normalize(text);

  return abusiveWords.some((word) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i").test(q);
  });
}

export function isGreeting(q: string) {
  const greetings = [
    "hi",
    "hello",
    "hey",
    "hii",
    "hiii",
    "vanakkam",
    "vanakam",
    "good morning",
    "good evening",
    "good afternoon",
  ];

  return greetings.some(
    (greeting) => q === greeting || q.startsWith(`${greeting} `),
  );
}

export function isContactIntent(q: string) {
  const keywords = [
    "contact",
    "hire",
    "hiring",
    "work with him",
    "work with anbu",
    "reach him",
    "reach anbu",
    "email him",
    "email anbu",
    "get in touch",
    "collaborate",
    "collaboration",
    "mail anbu",
    "send mail",
    "send email",
  ];

  return keywords.some((keyword) => q.includes(keyword));
}

export function detectSectionRedirect(q: string) {
  const showPatterns = [
    "show me",
    "take me",
    "go to",
    "open",
    "scroll to",
    "navigate",
    "jump to",
    "see the",
    "view the",
    "காட்டு",
    "போ",
  ];

  const wantsNav = showPatterns.some((p) => q.includes(p));

  for (const section of portfolio.sections) {
    const hit = section.keywords.some((k) => q.includes(k));
    if (hit && (wantsNav || q.includes("section") || q.startsWith("show"))) {
      return section.id;
    }
    if (
      (q.includes(`show ${section.id}`) ||
        q.includes(`go to ${section.id}`) ||
        q.includes(`open ${section.id}`)) &&
      hit
    ) {
      return section.id;
    }
  }

  // Soft redirects when user asks about a topic
  if (
    q.includes("project") ||
    q.includes("projects") ||
    q.includes("திட்டம்")
  ) {
    return "projects";
  }
  if (q.includes("skill") || q.includes("skills") || q.includes("technology")) {
    return "skills";
  }
  if (q.includes("experience") || q.includes("career")) {
    return "experience";
  }
  if (q.includes("service") || q.includes("services")) {
    return "services";
  }
  if (
    q.includes("about him") ||
    q.includes("who is") ||
    q.includes("avar yaaru") ||
    q.includes("அவர் யார்")
  ) {
    return "about";
  }
  if (isContactIntent(q)) {
    return "contact";
  }

  return null;
}

export function greetingAnswer(language: string, question: string) {
  const hasNga = /\bnga\b/i.test(question);

  if (language === "tamil") {
    return hasNga
      ? "வணக்கம் nga! 👋✨ Anbu பற்றி என்ன தெரிஞ்சிக்கணும்? Projects, skills, experience — எது வேணாலும் கேளுங்க!"
      : "வணக்கம்! 👋✨ Anbu பற்றி என்ன தெரிஞ்சிக்கணும்? Projects, skills, experience — எது வேணாலும் கேளுங்க!";
  }

  if (language === "tanglish") {
    return hasNga
      ? "Vanakkam nga! 👋✨ Anbu pathi enna therinjikanum? Projects, skills, experience — edhuvum kekkalaam!"
      : "Vanakkam! 👋✨ Anbu pathi enna therinjikanum? Projects, skills, experience — edhuvum kekkalaam!";
  }

  return hasNga
    ? "Hi dude! 👋✨ What would you like to know about Anbu? Ask about projects, skills, experience — or say “show projects” to jump there."
    : "Hey! 👋✨ What would you like to know about Anbu? Ask about projects, skills, experience — or say “show projects” to jump there.";
}

export function projectAnswer(language: string) {
  const list = portfolio.projects
    .map((p) => `• ${p.name} — ${p.description}`)
    .join("\n\n");

  if (language === "tamil") {
    return `🚀 அவருடைய முக்கிய projects:\n\n${list}\n\n“show projects” சொன்னா அந்த section-க்கு போவேன்!`;
  }

  if (language === "tanglish") {
    return `🚀 Avaroda main projects:\n\n${list}\n\n“show projects” nu sollunga — naan andha section-ku eduthuttu poren!`;
  }

  return `🚀 His main projects:\n\n${list}\n\nSay “show projects” and I’ll take you there!`;
}

export function socialAnswer(language: string) {
  if (language === "tamil") {
    return "Anbu-வின் social links கீழே கொடுத்திருக்கிறேன். பிடித்த platform-ஐ திறந்து follow பண்ணலாம்!";
  }

  if (language === "tanglish") {
    return "Anbu-oda social links keezha irukku. Ungalukku pidicha platform-la follow pannunga!";
  }

  return "Here are Anbu’s social networks. Open a platform to follow his work and updates.";
}

export function identityAnswer(language: string, question: string) {
  const asksCreator = /created|creator|built|made|developed|who are you/i.test(
    question,
  );

  if (language === "tamil") {
    return asksCreator
      ? "நான் Dobby — Anbu-வின் assistant. என்னை Anbuselvan Annamalai உருவாக்கினார்; அவருடைய projects, skills மற்றும் services பற்றி சொல்ல நான் இங்கே இருக்கிறேன்."
      : "நான் Dobby — Anbu-வின் assistant. நான் Anbuselvan Annamalai-யின் work, projects மற்றும் services பற்றி பதில் சொல்ல உதவுகிறேன்.";
  }

  if (language === "tanglish") {
    return asksCreator
      ? "Naan Dobby — Anbu-oda assistant. Enna Anbuselvan Annamalai create pannirukkaar; avaroda projects, skills and services pathi solla naan inga irukken."
      : "Naan Dobby — Anbu-oda assistant. Anbuselvan Annamalai-oda work, projects and services pathi answer panna help panren.";
  }

  return asksCreator
    ? "I’m Dobby, Anbu’s assistant. I was created by Anbuselvan Annamalai team to help visitors explore his projects, skills and services."
    : "I’m Dobby, Anbu’s assistant. I help visitors learn about Anbuselvan Annamalai’s work, projects and services.";
}

export function basicAnswer(language: string, question: string) {
  const q = normalize(question);
  if (
    q === "help" ||
    q.includes("what can you do") ||
    q.includes("how can you help")
  ) {
    return language === "tamil"
      ? "Projects, skills, experience, education, services மற்றும் contact பற்றி கேளுங்கள். நான் சரியான section-க்கும் அழைத்துச் செல்வேன்."
      : language === "tanglish"
        ? "Projects, skills, experience, education, services and contact pathi kelunga. Naan correct section-kum koottittu poren."
        : "Ask me about projects, skills, experience, education, services or contact. I can also take you to the relevant section.";
  }

  if (
    q.includes("website") ||
    q.includes("portfolio link") ||
    q.includes("url")
  ) {
    return `You can explore the portfolio at ${portfolio.website}`;
  }

  if (q === "bye" || q.includes("goodbye") || q.includes("see you")) {
    return language === "tamil"
      ? "பார்க்கலாம்! Anbu-வின் portfolio-க்கு வந்ததற்கு நன்றி."
      : language === "tanglish"
        ? "Bye nga! Anbu-oda portfolio-ku vandhadhukku nandri."
        : "Bye! Thanks for visiting Anbu’s portfolio.";
  }

  if (q.includes("thank") || q.includes("thanks")) {
    return language === "tamil"
      ? "உங்களை வரவேற்கிறேன்! இன்னும் ஏதாவது கேளுங்கள்."
      : language === "tanglish"
        ? "Welcome nga! Innum edhaavadhu kelunga."
        : "You’re welcome! Ask me anything else about Anbu.";
  }

  if (
    q.includes("location") ||
    q.includes("where is he") ||
    q.includes("based")
  ) {
    return language === "tamil"
      ? "Anbu-வின் location பற்றிய தகவல் portfolio-வில் குறிப்பிடப்படவில்லை."
      : language === "tanglish"
        ? "Anbu enga based-nu portfolio-la specific-a mention pannala."
        : "Anbu’s location is not specified in the portfolio yet.";
  }

  return "";
}

export function skillAnswer(language: string) {
  const skills = portfolio.skills.join(", ");
  const tech = portfolio.technologies.join(", ");

  if (language === "tamil") {
    return `💻 Skills: ${skills}\n\n🛠️ Tools & tech: ${tech}`;
  }

  if (language === "tanglish") {
    return `💻 Skills: ${skills}\n\n🛠️ Tools & tech: ${tech}`;
  }

  return `💻 Skills: ${skills}\n\n🛠️ Tools & tech: ${tech}`;
}

const skillLogoSlugs: Record<string, string> = {
  "JavaScript / TypeScript": "typescript",
  React: "react",
  "Node.js": "nodedotjs",
  Python: "python",
  PHP: "php",
  "Mobile Development": "android",
};

export function experienceAnswer(language: string) {
  const rows = portfolio.experience
    .map((e) => `• ${e.period} — ${e.role}, ${e.company}`)
    .join("\n");

  if (language === "tamil") {
    return `👨‍💼 Work experience:\n\n${rows}`;
  }

  if (language === "tanglish") {
    return `👨‍💼 Work experience:\n\n${rows}`;
  }

  return `👨‍💼 Work experience:\n\n${rows}`;
}

export function serviceAnswer(language: string) {
  const list = portfolio.services.map((s) => `• ${s}`).join("\n");

  if (language === "tamil") {
    return `⚡ Services:\n\n${list}`;
  }

  if (language === "tanglish") {
    return `⚡ Services:\n\n${list}`;
  }

  return `⚡ Services:\n\n${list}`;
}

export function aboutAnswer(language: string) {
  if (language === "tamil") {
    return `Anbuselvan Annamalai ஒரு Entrepreneur & Technology Mentor. ${portfolio.about}`;
  }

  if (language === "tanglish") {
    return `Anbuselvan Annamalai oru Entrepreneur & Technology Mentor. ${portfolio.about}`;
  }

  return portfolio.about;
}

export function educationAnswer(language: string) {
  const list = portfolio.education.map((e) => `• ${e}`).join("\n");

  if (language === "tamil") {
    return `🎓 Education:\n\n${list}`;
  }

  if (language === "tanglish") {
    return `🎓 Education:\n\n${list}`;
  }

  return `🎓 Education:\n\n${list}`;
}

export function abuseAnswer(language: string) {
  if (language === "tamil") {
    return "😊 கொஞ்சம் respectful-ஆ பேசலாம் nga. நான் உதவ இங்கே இருக்கிறேன் — projects, skills, experience அல்லது services பற்றி கேளுங்கள்.";
  }

  if (language === "tanglish") {
    return "😊 Konjam respectful-ah pesalaam nga. Naan help panna inga irukken — projects, skills, experience illa services pathi kekkalaam.";
  }

  return "😊 Let's keep things respectful. I'm here to help — ask about Anbu's projects, skills, experience or services.";
}

export function unknownAnswer(language: string) {
  if (language === "tamil") {
    return {
      text: "😄 நல்ல கேள்வி! இந்த தகவல் இப்போது என்னிடம் இல்லை. Anbu-க்கு நேரடியாக mail அனுப்ப உங்கள் email கொடுங்க — Outlook / mail app திறக்கும்.",
      needsEmail: true,
    };
  }

  if (language === "tanglish") {
    return {
      text: "😄 Nice question! Indha details ippo ennoda kitta illa. Anbu-ku direct ah vae mail panunga.",
      needsEmail: true,
    };
  }

  return {
    text: "😄 Nice question! I don't have that detail yet. Send me a mail here.",
    needsEmail: true,
  };
}

/**
 * @returns {{
 *   text: string,
 *   language: string,
 *   needsEmail?: boolean,
 *   scrollTo?: string | null,
 *   abusive?: boolean
 * }}
 */
export function getChatResponse(question: string, conversationContext = null) {
  const q = normalize(question);
  const language = detectLanguage(question);
  const scrollTo = detectSectionRedirect(q);

  if (containsAbusiveLanguage(question)) {
    return {
      text: abuseAnswer(language),
      language,
      abusive: true,
      scrollTo: null,
    };
  }

  if (isGreeting(q)) {
    return {
      text: greetingAnswer(language, question),
      language,
      scrollTo: null,
    };
  }

  if (
    q.includes("who are you") ||
    q.includes("your name") ||
    q.includes("what are you") ||
    q.includes("are you human") ||
    q.includes("who created you") ||
    q.includes("who made you") ||
    q.includes("who built you") ||
    q.includes("your creator") ||
    q.includes("உன்னை யார்") ||
    q.includes("நீ யார்")
  ) {
    return {
      text: identityAnswer(language, question),
      language,
      scrollTo: null,
      context: "about",
    };
  }

  if (
    q.includes("social") ||
    q.includes("instagram") ||
    q.includes("github") ||
    q.includes("git hub") ||
    q.includes("linkedin") ||
    q.includes("linked in") ||
    q.includes("youtube") ||
    q.includes("follow him") ||
    q.includes("follow anbu")
  ) {
    return {
      text: socialAnswer(language),
      language,
      scrollTo: "contact",
      context: "contact",
      socials: portfolio.socials,
    };
  }

  const basic = basicAnswer(language, question);
  if (basic) {
    return { text: basic, language, scrollTo: null };
  }

  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("college") ||
    q.includes("school") ||
    q.includes("mba")
  ) {
    return {
      text: educationAnswer(language),
      language,
      scrollTo: "about",
    };
  }

  if (
    q.includes("project") ||
    q.includes("projects") ||
    q.includes("avaroda project") ||
    q.includes("avaruoda project") ||
    q.includes("projects pathi") ||
    q.includes("panniruk") ||
    q.includes("திட்டம்")
  ) {
    return {
      text: projectAnswer(language),
      language,
      scrollTo: "projects",
      context: "projects",
      projects: portfolio.projects,
    };
  }

  if (
    q.includes("skill") ||
    q.includes("skills") ||
    q.includes("technology") ||
    q.includes("technologies") ||
    q.includes("tech stack")
  ) {
    return {
      text: skillAnswer(language),
      language,
      scrollTo: "skills",
      context: "skills",
      skills: portfolio.skills.map((name) => ({
        name,
        logo: `https://cdn.simpleicons.org/${skillLogoSlugs[name] || "code"}`,
      })),
    };
  }

  if (
    q.includes("experience") ||
    q.includes("career") ||
    q.includes("worked") ||
    q.includes("job") ||
    q.includes("work pann")
  ) {
    return {
      text: experienceAnswer(language),
      language,
      scrollTo: "experience",
      context: "experience",
    };
  }

  if (
    q.includes("service") ||
    q.includes("services") ||
    q.includes("what can he do") ||
    q.includes("enna service")
  ) {
    return {
      text: serviceAnswer(language),
      language,
      scrollTo: "services",
      context: "services",
    };
  }

  if (
    q.includes("who is he") ||
    q.includes("who is anbuselvan") ||
    q.includes("about him") ||
    q.includes("about anbuselvan") ||
    q.includes("what does he do") ||
    q.includes("avar yaaru") ||
    q.includes("avaru yaaru") ||
    q.includes("avar pathi") ||
    q.includes("அவர் யார்")
  ) {
    return {
      text: aboutAnswer(language),
      language,
      scrollTo: "about",
      context: "about",
    };
  }

  if (isContactIntent(q)) {
    const unknown = unknownAnswer(language);
    return {
      text: unknown.text,
      language,
      needsEmail: true,
      scrollTo: "contact",
      pendingQuestion: "The visitor wants to contact or hire Anbuselvan.",
    };
  }

  // Explicit navigation-only phrases
  if (
    q.includes("show ") ||
    q.includes("go to ") ||
    q.includes("take me") ||
    q.includes("scroll to") ||
    q.includes("open ")
  ) {
    const section = portfolio.sections.find((s) =>
      s.keywords.some((k) => q.includes(k)),
    );
    if (section) {
      const label = section.label;
      if (language === "tamil") {
        return {
          text: `✨ ${label} section-க்கு போறேன்!`,
          language,
          scrollTo: section.id,
        };
      }
      if (language === "tanglish") {
        return {
          text: `✨ ${label} section-ku poren!`,
          language,
          scrollTo: section.id,
        };
      }
      return {
        text: `✨ Taking you to the ${label} section!`,
        language,
        scrollTo: section.id,
      };
    }
  }

  if (
    conversationContext === "projects" &&
    (q.includes("more") || q.includes("which one") || q.includes("ai"))
  ) {
    return {
      text:
        language === "tamil"
          ? "✨ CyberDude.app — technology learning + AI support related project."
          : language === "tanglish"
            ? "✨ CyberDude.app — technology learning and AI support related project."
            : "✨ CyberDude.app is a technology learning platform with AI support.",
      language,
      scrollTo: "projects",
      context: "projects",
    };
  }

  const unknown = unknownAnswer(language);
  return {
    text: unknown.text,
    language,
    needsEmail: true,
    scrollTo,
    pendingQuestion: question,
  };
}

export const SUGGESTIONS = [
  { label: "🚀 Projects", text: "What projects has Anbuselvan built?" },
  { label: "💻 Skills", text: "What are his skills?" },
  { label: "👤 Experience", text: "Tell me about his experience" },
  { label: "⚡ Services", text: "What services does he provide?" },
  { label: "📍 Show projects", text: "Show projects" },
];

const SECTION_LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  projects: "Projects",
  services: "Services",
  skills: "Skills",
  experience: "Experience",
  contact: "Contact",
  blog: "Blog",
  assistant: "Assistant",
};

export function getSectionLabel(id: string) {
  return SECTION_LABELS[id] || id;
}

/** Tell the user to look at the page section the bot just opened. */
export function buildSectionNotice(sectionId: string, language = "english") {
  const label = getSectionLabel(sectionId);
  if (!sectionId) return "";

  if (language === "tamil") {
    return `📍 ${label} section-க்கு உங்களை எடுத்துச் சென்றேன் — கீழே scroll செய்து பாருங்கள்!`;
  }

  if (language === "tanglish") {
    return `📍 ${label} section-ku eduthuttu poren — page-la scroll panni paathukonga!`;
  }

  return `📍 Taking you to ${label} — please look at that section on the page (scrolled below).`;
}

export function withSectionNotice(reply: {
  text: string;
  language: string;
  scrollTo?: string;
}): {
  text: string;
  language: string;
  scrollTo?: string;
} {
  if (!reply?.scrollTo) return reply;
  const notice = buildSectionNotice(reply.scrollTo, reply.language);
  if (!notice) return reply;
  if (
    String(reply.text || "").includes(notice) ||
    String(reply.text || "").includes("📍")
  ) {
    return reply;
  }
  return {
    ...reply,
    text: `${reply.text}\n\n${notice}`,
  };
}
