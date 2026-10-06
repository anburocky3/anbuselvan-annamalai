import { ReviewForm } from "@/components/review-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Reviews | Anbuselvan Annamalai",
  description:
    "See what viewers say about Anbuselvan Annamalai's educational content and tutorials on YouTube. Read authentic reviews from students and followers.",
  alternates: {
    canonical: "https://anbuselvan-annamalai.com/reviews/youtube",
  },
  openGraph: {
    title: "YouTube Reviews | Anbuselvan Annamalai",
    description:
      "See what viewers say about Anbuselvan Annamalai's educational content and tutorials on YouTube. Read authentic reviews from students and followers.",
    url: "https://anbuselvan-annamalai.com/reviews/youtube",
    siteName: "Anbuselvan Annamalai",
    locale: "en_US",
    type: "website",
  },
};

export default function YouTubeReviews() {
  return (
    <div className="space-y-6 py-10 px-4">
      <ReviewForm type="youtube" />
    </div>
  );
}
