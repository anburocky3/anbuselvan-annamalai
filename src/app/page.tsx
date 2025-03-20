import { Metadata } from "next";
import HeroSection from "@/components/site/HeroSection";
import ServiceSection from "@/components/site/ServiceSection";
import SkillSection from "@/components/site/SkillSection";
import MyWork from "@/components/site/MyWork";
import ContactSection from "@/components/site/ContactSection";
import EducationSection from "@/components/site/EducationSection";
import { baseUrl } from "../../scripts/generate-sitemap";
import { socialLinks } from "@/lib/utils";

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
    <main className="flex min-h-screen flex-col">
      {/* Person schema for better SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Anbuselvan Annamalai",
            alternateName: "Anbuselvan Rocky",
            url: baseUrl,
            image:
              "https://anbuselvan-annamalai.com/images/anbuselvan-annamalai.png",
            sameAs: [
              socialLinks.x.url,
              socialLinks.linkedin.url,
              socialLinks.github.url,
              socialLinks.instagram.url,
              socialLinks.youtube.url,
            ],
            jobTitle: "Entrepreneur & Technology Mentor",
            worksFor: {
              "@type": "Organization",
              name: "Cyberdude Networks Pvt Ltd",
              url: "https://cyberdudenetworks.com",
            },
            description:
              "Award-winning entrepreneur and technology mentor specializing in React, React Native, and full-stack development with over 10 years of experience.",
            knowsAbout: [
              "Web Development",
              "React",
              "React Native",
              "Full Stack Development",
              "JavaScript",
              "TypeScript",
              "Node.js",
            ],
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": baseUrl,
            },
          }),
        }}
      />

      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Anbuselvan Annamalai | Technology Mentor & Entrepreneur",
            url: baseUrl,
            description:
              "Award-winning entrepreneur and technology mentor specializing in React, React Native, and full-stack development with over 10 years of experience.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/search?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <HeroSection />
      <MyWork />
      <ServiceSection />
      <EducationSection />
      <SkillSection />
      <ContactSection />
    </main>
  );
}
