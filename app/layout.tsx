import "./globals.css";
import { ClientLayout } from "./client-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cyberdragons.in"),

  title: "CyberDragon – Learn Cybersecurity, Networking, SOC & Ethical Hacking",

  description:
    "Learn cybersecurity with CyberDragon. Free notes, structured roadmap, networking, SOC, ethical hacking and real-world security skills.",

  keywords: [
    "cybersecurity learning",
    "learn cybersecurity",
    "cybersecurity courses",
    "SOC",
    "ethical hacking",
    "networking",
    "cybersecurity training",
  ],

  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.cyberdragons.in",
    title: "CyberDragon – Learn Cybersecurity, Networking, SOC & Ethical Hacking",
    description:
      "Learn cybersecurity with CyberDragon. Free notes, structured roadmap, networking, SOC, ethical hacking and real-world security skills.",
    siteName: "CyberDragon",
    images: [
      {
        url: "https://www.cyberdragons.in/favicon.png",
        width: 512,
        height: 512,
        alt: "CyberDragon cybersecurity learning platform logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CyberDragon – Learn Cybersecurity, Networking, SOC & Ethical Hacking",
    description:
      "Learn cybersecurity with CyberDragon. Free notes, structured roadmap, networking, SOC, ethical hacking and real-world security skills.",
    images: ["https://www.cyberdragons.in/favicon.png"],
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
              name: "CyberDragon",
              url: "https://www.cyberdragons.in",
              description:
                "Learn cybersecurity with CyberDragon. Free notes, structured roadmap, networking, SOC, ethical hacking and real-world security skills.",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.cyberdragons.in/courses?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
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
              description:
                "Cybersecurity learning platform offering courses, free notes, and roadmap for networking, SOC, ethical hacking, and defense.",
            }),
          }}
        />
      </head>

      <body className="relative overflow-x-hidden transition-colors duration-300">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
