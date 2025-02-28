import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const fontSora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anbuselvan-annamalai.com"),
  title:
    "Anbuselvan Annamalai - Entrepreneur | Technology Leader | Cybersecurity Expert, and Educator",
  description:
    "Explore the portfolio of Anbuselvan Annamalai, Founder & CEO of CyberDude Networks, with over 13 years of expertise in full-stack development, cybersecurity, and ethical hacking. Discover his achievements, including the Chief Minister's award for Excellence in e-Governance, winning the DAIMLER Mobile App Garage competition, and mentoring Smart India Hackathon winners. Learn about his contributions to tech innovation, open-source projects, and educating over 12 million students worldwide. He also has another name called 'Anbuselvan Rocky'.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anbuselvan-annamalai.com",
    siteName: "Anbuselvan Annamalai",
    title:
      "Anbuselvan Annamalai - Entrepreneur | Technology Leader | Cybersecurity Expert, and Educator",
    description:
      "Explore the portfolio of Anbuselvan Annamalai, Founder & CEO of CyberDude Networks, with over 13 years of expertise in full-stack development, cybersecurity, and ethical hacking. Discover his achievements, including the Chief Minister's award for Excellence in e-Governance, winning the DAIMLER Mobile App Garage competition, and mentoring Smart India Hackathon winners. Learn about his contributions to tech innovation, open-source projects, and educating over 12 million students worldwide. He also has another name called 'Anbuselvan Rocky'.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anbuselvan Annamalai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Anbuselvan Annamalai - Entrepreneur | Technology Leader | Cybersecurity Expert, and Educator",
    description:
      "Explore the portfolio of Anbuselvan Annamalai, Founder & CEO of CyberDude Networks, with over 13 years of expertise in full-stack development, cybersecurity, and ethical hacking. Discover his achievements, including the Chief Minister's award for Excellence in e-Governance, winning the DAIMLER Mobile App Garage competition, and mentoring Smart India Hackathon winners. Learn about his contributions to tech innovation, open-source projects, and educating over 12 million students worldwide. He also has another name called 'Anbuselvan Rocky'.",
    images: ["/images/og-image.png"],
    creator: "@anbuselvanrocky",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head></head>
      <body className={`${fontSora.className} antialiased`}>
        {children}
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ""}
        />
      </body>
    </html>
  );
}
