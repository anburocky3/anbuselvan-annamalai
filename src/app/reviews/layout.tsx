import type { Metadata } from "next";
import { ConditionalNavigation } from "@/components/conditional-navigation";

export const metadata: Metadata = {
  title: "Anbuselvan Annamalai Reviews | Youtube",
  description:
    "Share your valuable feedback about our tech workshops, coding tutorials, and educational content. Join thousands of students who have benefited from our practical learning approach in full-stack development, cybersecurity, and ethical hacking.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anbuselvan-annamalai.com/reviews",
    siteName: "Anbuselvan Annamalai",
    title: "Anbuselvan Annamalai Reviews | Youtube",
    description:
      "Share your valuable feedback about our tech workshops, coding tutorials, and educational content. Join thousands of students who have benefited from our practical learning approach in full-stack development, cybersecurity, and ethical hacking.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anbuselvan Annamalai Workshop Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anbuselvan Annamalai Reviews | Youtube",
    description:
      "Share your valuable feedback about our tech workshops, coding tutorials, and educational content. Join thousands of students who have benefited from our practical learning approach in full-stack development, cybersecurity, and ethical hacking.",
    images: ["/images/og-image.png"],
    creator: "@anbuselvanrocky",
  },
};

export default function ReviewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <ConditionalNavigation />
      <div className="flex-1">{children}</div>
    </div>
  );
}
