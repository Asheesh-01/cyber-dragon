import "./globals.css";
import Navbar from "./navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cyberdragons.in"),
  title: "CyberDragon – Cybersecurity Learning Platform",
  description:
    "CyberDragon is a cybersecurity learning platform for mastering networking, system security, SOC, and digital defense.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Cyber Dragon",
              url: "https://www.cyberdragons.in",
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CyberDragon",
              url: "https://www.cyberdragons.in",
              logo: "https://www.cyberdragons.in/favicon.png",
            }),
          }}
        />
      </head>

      <body className="bg-black text-white relative overflow-x-hidden">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
