import ContactSection from "@/components/site/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Anbuselvan Annamalai | Technology Mentor & Entrepreneur",
  description:
    "Get in touch with Anbuselvan Annamalai for web and mobile app development projects, technology consulting, or collaboration opportunities.",
  alternates: {
    canonical: "https://anbuselvan-annamalai.com/contact",
  },
  openGraph: {
    title: "Contact Anbuselvan Annamalai | Technology Mentor & Entrepreneur",
    description:
      "Get in touch with Anbuselvan Annamalai for web and mobile app development projects, technology consulting, or collaboration opportunities.",
    url: "https://anbuselvan-annamalai.com/contact",
    siteName: "Anbuselvan Annamalai",
    locale: "en_US",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />
    </>
  );
}
