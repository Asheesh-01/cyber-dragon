import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks - The Cyber Dragon",
  description: "Your saved labs, challenges, and courses. Access your bookmarked learning materials.",
  openGraph: {
    title: "Bookmarks - The Cyber Dragon",
    description: "Your saved labs, challenges, and courses.",
    type: "website",
  },
};

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
