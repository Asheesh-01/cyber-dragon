import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberDragon Notes – Cybersecurity Study Notes",
  description:
    "Access structured cybersecurity study notes for networking, security, and system protection.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
