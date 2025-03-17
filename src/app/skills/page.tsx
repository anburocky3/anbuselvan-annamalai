import SkillSection from "@/components/site/SkillSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills & Expertise | Anbuselvan Annamalai",
  description:
    "Technical skills and expertise of Anbuselvan Annamalai in React, React Native, Node.js, full-stack development, and mobile app development.",
  alternates: {
    canonical: "https://anbuselvan-annamalai.com/skills",
  },
  openGraph: {
    title: "Skills & Expertise | Anbuselvan Annamalai",
    description:
      "Technical skills and expertise of Anbuselvan Annamalai in React, React Native, Node.js, full-stack development, and mobile app development.",
    url: "https://anbuselvan-annamalai.com/skills",
    siteName: "Anbuselvan Annamalai",
    locale: "en_US",
    type: "website",
  },
};

export default function SkillsPage() {
  return (
    <div className="pt-10">
      <SkillSection />
    </div>
  );
}
