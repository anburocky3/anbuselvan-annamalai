import type { Metadata } from "next";
import { ConditionalNavigation } from "@/components/conditional-navigation";

export const metadata: Metadata = {
  title: "Anbuselvan Annamalai Reviews | Youtube",
  description: "Share your feedback about our workshops",
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
