import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  // Get Firebase auth token from cookies
  const firebaseToken = request.cookies.get("firebase-token");

  // If trying to access admin routes without a token
  if (isAdminPath && !isLoginPage && !firebaseToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // If trying to access login page with a token
  if (isLoginPage && firebaseToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure the paths that middleware should run on
export const config = {
  matcher: ["/admin/:path*"],
};
