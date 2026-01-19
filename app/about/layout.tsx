import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CyberDragon – Cybersecurity Learning Platform",
  description:
    "Learn about CyberDragon, a cybersecurity learning platform built for real industry-level cybersecurity skill development.",
      alternates: {
    canonical: "https://www.cyberdragons.in/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
