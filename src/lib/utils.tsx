import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLink,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { ReactElement } from "react";
import { FaMedium, FaX, FaYoutube } from "react-icons/fa6";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// List of institutions for the review form
export const institutions = [
  // "S.A. Engineering College",
  // "SRM Institute of Science and Technology (SRMIST)",
  // "SRMIST - Kattankulathur Campus",
  "SRMIST - Ramapuram Campus",
  // "SRMIST - Vadapalani Campus",
  // "Anna University",
  // "VIT University",
  // "PSG College of Technology",
  // "SSN College of Engineering",
  // "Coimbatore Institute of Technology",
  // "Sri Venkateswara College of Engineering (SVCE)",
  // "Rajalakshmi Engineering College (REC)",
  // "St. Joseph's College of Engineering",
  // "Sri Sairam Engineering College",
  // "Kongu Engineering College",
  // "Thiagarajar College of Engineering",
  // "Government College of Technology (GCT)",
  // "Sri Krishna College of Engineering and Technology",
  // "Kumaraguru College of Technology",
  // "Bannari Amman Institute of Technology",
  // "Easwari Engineering College",
  // "Meenakshi Sundararajan Engineering College",
  // "Panimalar Engineering College",
  // "Mepco Schlenk Engineering College",
  // "National Engineering College",
  // "K.L.N. College of Engineering",
  // "PSNA College of Engineering and Technology",
  // "Velammal Engineering College",
  // "Loyola-ICAM College of Engineering (LICET)",
  // "B.S. Abdur Rahman Crescent Institute",
  // "Hindustan Institute of Technology and Science",
  // "Sathyabama Institute of Science and Technology",
  // "CyberDude Community / YouTube",
  // "Other (Custom Institution)",
] as const;

export type Institution = (typeof institutions)[number];

export const EVENT_INSTITUTION_PRESETS = {
  SRMIST: "SRM Institute of Science and Technology (SRMIST)",
  SRMIST_KTR: "SRMIST - Kattankulathur Campus",
  SRMIST_RAMAPURAM: "SRMIST - Ramapuram Campus",
  SRMIST_VADAPALANI: "SRMIST - Vadapalani Campus",
  SAEC: "S.A. Engineering College",
  ANNA_UNIVERSITY: "Anna University",
  VIT: "VIT University",
  PSG: "PSG College of Technology",
} as const;

export const applySocialIcons = (social: string): ReactElement => {
  switch (social) {
    case "facebook":
      return <FaFacebook />;
    case "twitter":
      return <FaTwitter />;
    case "instagram":
      return <FaInstagram />;
    case "linkedin":
      return <FaLinkedinIn />;
    case "github":
      return <FaGithub />;
    default:
      return <FaLink />;
  }
};

export const generatePageTitle = (title: string) => {
  const baseSiteName = "Workshop Reviews";
  return title ? `${title} | ${baseSiteName}` : baseSiteName;
};

export const socialLinks = {
  facebook: {
    name: "Facebook",
    url: "https://facebook.com/anburocky3",
    icon: <FaFacebook />,
  },
  instagram: {
    name: "Instagram",
    url: "https://instagram.com/anbuselvanrocky",
    icon: <FaInstagram />,
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://linkedin.com/in/anburocky3",
    icon: <FaLinkedinIn />,
  },
  youtube: {
    name: "YouTube",
    url: "https://youtube.com/@anbuselvanrocky",
    icon: <FaYoutube />,
  },
  x: {
    name: "X",
    url: "https://x.com/anbuselvanrocky",
    icon: <FaX />,
  },
  github: {
    name: "GitHub",
    url: "https://github.com/anburocky3",
    icon: <FaGithub />,
  },
  cyberdude: {
    name: "CyberDude YouTube",
    url: "https://youtube.com/@cyberdudenetworks",
    icon: <FaYoutube />,
  },
  medium: {
    name: "Medium",
    url: "https://medium.com/@anbuselvan-annamalai",
    icon: <FaMedium />,
  },
};

export const getAllRoutes = () => {
  const mainRoutes: string[] = [];
  const reviewRoutes: string[] = [];

  // Add main routes
  mainRoutes.push("", "about", "services", "skills", "projects", "contact");

  // Add review routes
  reviewRoutes.push(
    "reviews",
    "reviews/about",
    "reviews/events",
    "reviews/youtube"
  );

  return { mainRoutes, reviewRoutes };
};
