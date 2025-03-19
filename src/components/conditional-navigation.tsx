"use client";

import { Navigation } from "@/components/navigation";
import { usePathname } from "next/navigation";
import Header from "./site/Header";

export function ConditionalNavigation() {
  const pathname = usePathname();

  // Show nothing for exact /reviews path
  if (pathname === "/reviews") {
    return null;
  }

  // Show Navigation for all paths that start with /reviews/ or /admin/
  if (pathname.startsWith("/reviews/") || pathname.startsWith("/admin/")) {
    return <Navigation />;
  }

  // Default case, show Header for all other routes
  return <Header />;
}
