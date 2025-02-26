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
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <ul className="flex gap-6">
            <li>
              <Link
                href="/youtube-reviews"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/youtube-reviews"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                YouTube Reviews
              </Link>
            </li>
            <li>
              <Link
                href="/event-reviews"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/event-reviews"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                Event Reviews
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/about"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                About
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
