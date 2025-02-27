"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { logout } from "@/firebase/services/auth";
import { LuLogOut } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/firebase/services/auth";
import type { User } from "firebase/auth";
import { route } from "@/config/routes";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = (await getCurrentUser()) as User | null;
      setUser(currentUser);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        setUser(null);
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href={route("home")}
            className={`text-sm transition-color text-primary font-bold`}
          >
            ANBU SELVAN
          </Link>
          <ul className="flex gap-6">
            <li>
              <Link
                href={route("reviewsAbout")}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route("reviewsAbout")
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href={route("youtube")}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route("youtube")
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                YouTube Reviews
              </Link>
            </li>
            <li>
              <Link
                href={route("events")}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route("events")
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                Event Reviews
              </Link>
            </li>
          </ul>

          {user && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary"
              onClick={handleLogout}
            >
              <LuLogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
