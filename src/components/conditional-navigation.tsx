"use client";

import { Navigation } from "@/components/navigation";
import { usePathname } from "next/navigation";

export function ConditionalNavigation() {
  const pathname = usePathname();
  const showNavigation =
    pathname === "/reviews/events" ||
    pathname === "/reviews/youtube" ||
    pathname === "/reviews/about";

  if (!showNavigation) return null;
  return <Navigation />;
}
