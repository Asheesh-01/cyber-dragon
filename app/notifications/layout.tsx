import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications - The Cyber Dragon",
  description: "Stay updated with achievements, reminders, and announcements.",
  openGraph: {
    title: "Notifications - The Cyber Dragon",
    description: "Your learning notifications and updates.",
    type: "website",
  },
};

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
