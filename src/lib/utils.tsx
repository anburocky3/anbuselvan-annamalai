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
  "Anna University",
  "SRM University",
  "VIT University",
  "PSG College of Technology",
  "Kongu Engineering College",
  "Thiagarajar College of Engineering",
  "Government College of Technology",
  "Sri Krishna College of Engineering",
  "Kumaraguru College of Technology",
  "Other",
] as const;

export type Institution = (typeof institutions)[number];

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
