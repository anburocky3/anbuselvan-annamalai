import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import ServiceWorkerProvider from "../components/ServiceWorkerProvider";

const fontSora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anbuselvan-annamalai.com"),
  title: {
    default: "Anbuselvan Annamalai - Entrepreneur | Technology Leader",
    template: "%s | Anbuselvan Annamalai",
  },
  description:
    "Explore the portfolio of Anbuselvan Annamalai, Founder & CEO of CyberDude Networks, technology leader, cybersecurity expert, and educator with over 13 years of expertise in full-stack development, cybersecurity, and ethical hacking. Discover his achievements, including the Chief Minister's award for Excellence in e-Governance, winning the DAIMLER Mobile App Garage competition, and mentoring Smart India Hackathon winners. Learn about his contributions to tech innovation, open-source projects, and educating over 12 million students worldwide. He also has another name called 'Anbuselvan Rocky'.",
  applicationName: "Anbuselvan Annamalai Portfolio",
  authors: [
    { name: "Anbuselvan Annamalai", url: "https://anbuselvan-annamalai.com" },
  ],
  keywords: [
    "Anbuselvan Annamalai",
    "Anbuselvan Rocky",
    "Technology Leader",
    "Entrepreneur",
    "Full Stack Developer",
    "Cybersecurity Expert",
    "Tech Educator",
    "CyberDude Networks",
  ],
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anbuselvan-annamalai.com",
    siteName: "Anbuselvan Annamalai",
    title: "Anbuselvan Annamalai - Entrepreneur | Technology Leader",
    description:
      "Explore the portfolio of Anbuselvan Annamalai, Founder & CEO of CyberDude Networks, technology leader, cybersecurity expert, and educator with over 13 years of expertise in full-stack development, cybersecurity, and ethical hacking. Discover his achievements, including the Chief Minister's award for Excellence in e-Governance, winning the DAIMLER Mobile App Garage competition, and mentoring Smart India Hackathon winners. Learn about his contributions to tech innovation, open-source projects, and educating over 12 million students worldwide. He also has another name called 'Anbuselvan Rocky'.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anbuselvan Annamalai - Technology Leader and Entrepreneur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anbuselvan Annamalai - Entrepreneur | Technology Leader",
    description:
      "Explore the portfolio of Anbuselvan Annamalai, Founder & CEO of CyberDude Networks, technology leader, cybersecurity expert, and educator with over 13 years of expertise in full-stack development, cybersecurity, and ethical hacking. Discover his achievements, including the Chief Minister's award for Excellence in e-Governance, winning the DAIMLER Mobile App Garage competition, and mentoring Smart India Hackathon winners. Learn about his contributions to tech innovation, open-source projects, and educating over 12 million students worldwide. He also has another name called 'Anbuselvan Rocky'.",
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Anbuselvan Annamalai"
        />
      </head>
      <body className={`${fontSora.className} antialiased`}>
        <ServiceWorkerProvider />
        {children}
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ""}
        />
      </body>
    </html>
  );
}
