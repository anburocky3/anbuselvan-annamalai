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
