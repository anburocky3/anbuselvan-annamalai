import ServiceSection from "@/components/site/ServiceSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Services - Web, Mobile, IoT and R&D Development | Anbuselvan Annamalai",
  description:
    "Professional services offered by Anbuselvan Annamalai including Web, Mobile, IoT and R&D Development.",
  alternates: {
    canonical: "https://anbuselvan-annamalai.com/services",
  },
  openGraph: {
    title:
      "Services - Web, Mobile, IoT and R&D Development | Anbuselvan Annamalai",
    description:
      "Professional services offered by Anbuselvan Annamalai including Web, Mobile, IoT and R&D Development.",
    url: "https://anbuselvan-annamalai.com/services",
    siteName: "Anbuselvan Annamalai",
    locale: "en_US",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-10">
      <ServiceSection />
    </div>
  );
}
