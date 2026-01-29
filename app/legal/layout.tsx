import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal - The Cyber Dragon",
  description: "Legal documentation for The Cyber Dragon platform.",
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
