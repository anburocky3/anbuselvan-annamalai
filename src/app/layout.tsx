import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anbuselvan Annamalai - Technology Enthusiast",
  description:
    "Anbuselvan Annamalai is a technology enthusiast and a software developer. He is the founder of CyberDude Networks Private Limited.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
