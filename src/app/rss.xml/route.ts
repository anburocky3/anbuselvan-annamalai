import { generateRssFeed } from "@/utils/rss";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const feed = await generateRssFeed();
    return new NextResponse(feed, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
