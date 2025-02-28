import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const fontSora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Anbuselvan Annamalai - Entreprenuer that follows problems",
  description: "Personal portfolio and blog of Anbuselvan Annamalai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head></head>
      <body className={`${fontSora.className} antialiased`}>{children}</body>
    </html>
  );
}
