import MyWork from "@/components/site/MyWork";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Projects | Anbuselvan Annamalai",
  description:
    "Explore Anbuselvan Annamalai's portfolio of web and mobile app development projects using React, React Native, Node.js, and other modern technologies.",
  alternates: {
    canonical: "https://anbuselvan-annamalai.com/projects",
  },
  openGraph: {
    title: "Portfolio & Projects | Anbuselvan Annamalai",
    description:
      "Explore Anbuselvan Annamalai's portfolio of web and mobile app development projects using React, React Native, Node.js, and other modern technologies.",
    url: "https://anbuselvan-annamalai.com/projects",
    siteName: "Anbuselvan Annamalai",
    locale: "en_US",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-10">
      <MyWork />
    </div>
  );
}
