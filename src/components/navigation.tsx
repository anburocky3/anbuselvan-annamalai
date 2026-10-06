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
import { ThemeToggle } from "./theme/theme-toggle";

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
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href={route("home")}
            className="text-sm transition-colors text-slate-900 dark:text-white font-bold hover:text-purple-600 dark:hover:text-purple-400"
          >
            ANBU SELVAN
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <ul className="flex gap-4 sm:gap-6">
              <li>
                <Link
                  href={route("reviewsAbout")}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400",
                    pathname === route("reviewsAbout")
                      ? "text-purple-600 dark:text-purple-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400",
                  )}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={route("events")}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400",
                    pathname === route("events")
                      ? "text-purple-600 dark:text-purple-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400",
                  )}
                >
                  Event Reviews
                </Link>
              </li>
              <li>
                <Link
                  href={route("blog")}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400",
                    pathname === route("blog")
                      ? "text-purple-600 dark:text-purple-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400",
                  )}
                >
                  Blog
                </Link>
              </li>
            </ul>

            <ThemeToggle size="sm" />

            {user && (
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                onClick={handleLogout}
              >
                <LuLogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
