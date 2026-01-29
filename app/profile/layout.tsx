import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile – CyberDragon",
  description:
    "View your cybersecurity learning profile, achievements, streaks, and statistics.",
  alternates: {
    canonical: "https://www.cyberdragons.in/profile",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
