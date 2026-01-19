import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberDragon Notes – Cybersecurity Study Notes",
  description:
    "Access structured cybersecurity study notes for networking, security, and system protection.",
  alternates: {
    canonical: "https://www.cyberdragons.in/notes",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
