import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact CyberDragon – Cybersecurity Learning Platform",
  description:
    "Contact CyberDragon for support, feedback, and cybersecurity learning collaboration.",
      alternates: {
    canonical: "https://www.cyberdragons.in/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
