import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import "./globals.css";
import ScrollHandler from "@/components/ScrollHandler";
import { socialLinks } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://anbuselvan-annamalai.com"),
  title: {
    default: "Anbuselvan Annamalai - Entrepreneur | Technology Mentor",
    template: "%s | Anbuselvan Annamalai",
  },
  description:
    "Award-winning technology leader and entrepreneur. Expert in full-stack development, React, React Native, Node.js, and mobile app development with over 10 years of experience.",
  applicationName: "Anbuselvan Annamalai Portfolio",
  authors: [
    { name: "Anbuselvan Annamalai", url: "https://anbuselvan-annamalai.com" },
  ],
  keywords: [
    "Anbuselvan Annamalai",
    "Technology Mentor",
    "Entrepreneur",
    "Full Stack Developer",
    "React Developer",
    "React Native Developer",
    "Mobile App Development",
    "Web Development",
    "Node.js Expert",
    "Technology Consultant",
    "CyberDude Networks",
  ],
  creator: "Anbuselvan Annamalai",
  publisher: "Anbuselvan Annamalai",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  referrer: "origin-when-cross-origin",
  category: "technology",
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
    title: "Anbuselvan Annamalai - Entrepreneur | Technology Mentor",
    description:
      "Award-winning technology leader and entrepreneur. Expert in full-stack development, React, React Native, Node.js, and mobile app development.",
    images: [
      {
        url: "/images/anbuselvan-annamalai-og.png",
        width: 1200,
        height: 630,
        alt: "Anbuselvan Annamalai - Technology Leader and Entrepreneur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anbuselvan Annamalai - Entrepreneur | Technology Mentor",
    description:
      "Award-winning technology leader and entrepreneur. Expert in full-stack development, React, React Native, Node.js, and mobile app development.",
    images: ["/images/anbuselvan-annamalai-og.png"],
    creator: "@anbuselvan",
  },
  alternates: {
    canonical: "https://anbuselvan-annamalai.com",
    languages: {
      "en-US": "https://anbuselvan-annamalai.com",
    },
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
};

export const viewport: Viewport = {
  themeColor: "#1e1b4b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://anbuselvan-annamalai.com" />
      </head>
      <body className="bg-slate-900">
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollHandler />
        <Toaster position="bottom-right" />
        <Analytics />
        <SpeedInsights />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Anbuselvan Annamalai",
              alternateName: ["Anbuselvan Annamalai", "Anbuselvan Rocky"],
              url: "https://anbuselvan-annamalai.com",
            }),
          }}
        />

        {/* Structured Data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Anbuselvan Annamalai",
              url: "https://anbuselvan-annamalai.com",
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
                name: "CyberDude Networks Pvt Ltd",
              },
              description:
                "Award-winning technology leader and entrepreneur. Expert in full-stack development, React, React Native, Node.js, and mobile app development.",
            }),
          }}
        />
      </body>
    </html>
  );
}
