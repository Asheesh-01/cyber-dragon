import type { Metadata } from "next";
import HomeContent from "./home-content";

export const metadata: Metadata = {
  title: "CyberDragon – Learn Cybersecurity, Networking, SOC & Ethical Hacking",
  description:
    "Learn cybersecurity with CyberDragon. Free notes, structured roadmap, networking, SOC, ethical hacking and real-world security skills.",
  keywords: "cybersecurity learning, learn cybersecurity, cybersecurity courses, SOC, ethical hacking, networking, cybersecurity training",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.cyberdragons.in",
    title: "CyberDragon – Learn Cybersecurity, Networking, SOC & Ethical Hacking",
    description:
      "Learn cybersecurity with CyberDragon. Free notes, structured roadmap, networking, SOC, ethical hacking and real-world security skills.",
    images: [
      {
        url: "https://www.cyberdragons.in/favicon.png",
        width: 512,
        height: 512,
        alt: "CyberDragon cybersecurity learning platform logo",
      },
    ],
  },
};

export default function HomePage() {
  return <HomeContent />;
}