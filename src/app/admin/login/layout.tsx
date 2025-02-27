import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Workshop Reviews",
  description: "Login to access the admin dashboard",
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-blue-50 min-h-screen">{children}</div>;
}
