import { NextResponse } from "next/server";
import { reviewSchema } from "@/lib/validations";
import { addSurveyFeedback } from "@/firebase/services/institution";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Zod validation throws an error if it fails, which is caught by the catch block
    const review = reviewSchema.parse(body);

    // Transform the parsed data to strictly match the WorkshopSurvey interface
    const surveyData = {
      // Provide a fallback or generate a unique code if it wasn't provided
      code: review.code || "saec.ac.in",

      // Generate the timestamp on the server
      createdAt: new Date(),

      institution: review.institution,

      // Handle the anonymous logic for the name field
      name: review.isAnonymous || !review.name ? "Anonymous" : review.name,

      "rate-instructor": review["rate-instructor"],
      "workshop-like": review["workshop-like"],
      "workshop-dislike": review["workshop-dislike"],

      // Fallback to empty string since Zod marked it optional but interface demands string
      "workshop-improve": review["workshop-improve"] || "",

      "workshop-overall-rating": review["workshop-overall-rating"],
      "workshop-recommend": review["workshop-recommend"],
    };

    // Push to Firestore database
    addSurveyFeedback(surveyData);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Invalid request or database error" },
      { status: 400 },
    );
  }
}
