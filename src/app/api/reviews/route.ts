import { NextResponse } from "next/server";
import { reviewSchema } from "@/lib/validations";

// In-memory storage for demo purposes
// Replace with your database in production
const reviews: object[] = [];

export async function GET() {
  // In a real app, fetch from your database
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const review = reviewSchema.parse(body);

    // In a real app, save to your database
    reviews.push(review);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
