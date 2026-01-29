import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - The Cyber Dragon",
  description: "Manage platform content, users, and moderation",
  robots: "noindex, nofollow", // Admin pages should not be indexed
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
