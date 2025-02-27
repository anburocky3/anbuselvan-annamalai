import { ReviewForm } from "@/components/review-form";

export default function YouTubeReviews() {
  return (
    <div className="space-y-6 py-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">YouTube Workshop Review</h1>
        <p className="text-muted-foreground">
          Share your feedback about our YouTube workshop
        </p>
      </div>
      <ReviewForm type="youtube" />
    </div>
  );
}
