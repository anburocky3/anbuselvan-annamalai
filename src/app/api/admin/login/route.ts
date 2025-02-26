import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();

    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // In a real application, validate against your database
    // This is just an example - replace with your actual auth logic
    if (email === "admin@example.com" && password === "admin123") {
      // Set a secure HTTP-only cookie
      cookieStore.set("admin-token", "your-secure-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
