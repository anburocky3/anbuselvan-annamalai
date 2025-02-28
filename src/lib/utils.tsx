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
import { FaX, FaYoutube } from "react-icons/fa6";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
};
