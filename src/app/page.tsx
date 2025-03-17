import { Metadata } from "next";
import HeroSection from "@/components/site/HeroSection";
import ServiceSection from "@/components/site/ServiceSection";
import SkillSection from "@/components/site/SkillSection";
import MyWork from "@/components/site/MyWork";
import ContactSection from "@/components/site/ContactSection";
import EducationSection from "@/components/site/EducationSection";

export const metadata: Metadata = {
  title: "Anbuselvan Annamalai | Technology Mentor & Entrepreneur",
  description:
    "Anbuselvan Annamalai is an award-winning entrepreneur and technology mentor specializing in React, React Native, and full-stack development with over 10 years of experience.",
  alternates: {
    canonical: "https://anbuselvan-annamalai.com",
  },
  openGraph: {
    title: "Anbuselvan Annamalai | Technology Mentor & Entrepreneur",
    description:
      "Anbuselvan Annamalai is an award-winning entrepreneur and technology mentor specializing in React, React Native, and full-stack development with over 10 years of experience.",
    url: "https://anbuselvan-annamalai.com",
    siteName: "Anbuselvan Annamalai",
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <MyWork />
      <ServiceSection />
      <EducationSection />
      <SkillSection />
      <ContactSection />
    </>
  );
}
