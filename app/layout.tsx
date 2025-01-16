import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


export const metadata: Metadata = {
  title: 'Anbuselvan Annamalai - Tech Entrepreneur & CEO',
  description: 'Founder & CEO of CyberDude, with 15+ years of experience in ethical hacking, web development, and mobile solutions.',
  keywords: ['tech entrepreneur', 'ethical hacking', 'web development', 'mobile development', 'CyberDude'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
