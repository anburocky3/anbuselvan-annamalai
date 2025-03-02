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
    "Award-winning technology leader and founder of CyberDude Networks. Expert in full-stack development, cybersecurity, and tech education, impacting millions globally.",
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
    "Chief Minister's award",
    "e-Governance",
    "DAIMLER Mobile App",
    "Smart India Hackathon",
    "ethical hacking",
    "tech innovation",
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
      "Award-winning technology leader and founder of CyberDude Networks. Expert in full-stack development, cybersecurity, and tech education, impacting millions globally.",
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
      "Award-winning technology leader and founder of CyberDude Networks. Expert in full-stack development, cybersecurity, and tech education, impacting millions globally.",
    images: ["/images/og-image.png"],
    creator: "@anbuselvanrocky",
  },
  alternates: {
    canonical: "https://anbuselvan-annamalai.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
