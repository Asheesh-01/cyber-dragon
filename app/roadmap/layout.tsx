import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberDragon Roadmap – Cybersecurity Learning Path",
  description:
    "Follow CyberDragon’s structured cybersecurity roadmap from beginner to advanced level.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
