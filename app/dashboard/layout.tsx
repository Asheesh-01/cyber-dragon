import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard – CyberDragon",
  description:
    "Track your learning progress, streaks, and achievements on your personalized cybersecurity learning dashboard.",
  alternates: {
    canonical: "https://www.cyberdragons.in/dashboard",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
