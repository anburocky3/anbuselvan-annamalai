import { ReviewForm } from "@/components/review-form";

export default function EventReviews() {
  return (
    <div className="space-y-6 py-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Event Workshop Review</h1>
        <p className="text-muted-foreground">
          Share your feedback about our in-person workshop
        </p>
      </div>
      <ReviewForm type="event" />
    </div>
  );
}
