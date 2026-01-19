import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberDragon Courses – Cybersecurity Learning",
  description:
    "Explore cybersecurity courses on networking, security, SOC, and system defense at CyberDragon.",
      alternates: {
    canonical: "https://www.cyberdragons.in/courses",
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
