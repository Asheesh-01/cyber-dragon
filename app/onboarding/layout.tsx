import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding - The Cyber Dragon",
  description: "Start your cybersecurity learning journey with The Cyber Dragon.",
  robots: "noindex", // Onboarding pages typically shouldn't be indexed
  openGraph: {
    title: "Onboarding - The Cyber Dragon",
    description: "Start your cybersecurity learning journey.",
    type: "website",
  },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
