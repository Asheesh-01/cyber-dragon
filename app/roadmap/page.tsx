export const metadata = {
  title: "CyberDragon Roadmap – Cybersecurity Paths",
  description:
    "Choose a cybersecurity learning path and track your progress with structured, hands-on learning.",
};

import Link from "next/link";
import { Shield, Target, Lock, Server, Code, Cloud, Briefcase } from "lucide-react";

const careerPaths = [
  {
    id: "security-engineer",
    title: "Security Engineer",
    description:
      "Complete path from beginner to advanced security engineer. Covers foundations, Linux, networking, programming, security fundamentals, blue team, cloud security, and career preparation.",
    icon: Shield,
    color: "blue",
    volumes: 10,
    topics: 140,
    level: "Beginner to Advanced",
    href: "/roadmap/security-engineer",
  },
  {
    id: "soc-analyst",
    title: "SOC Analyst",
    description:
      "Specialized path for Security Operations Center roles. Focus on monitoring, detection, incident response, and threat intelligence.",
    icon: Target,
    color: "green",
    volumes: 6,
    topics: 85,
    level: "Intermediate",
    comingSoon: true,
  },
  {
    id: "penetration-tester",
    title: "Penetration Tester",
    description:
      "Learn ethical hacking and offensive security. Master reconnaissance, exploitation, web application testing, and reporting.",
    icon: Lock,
    color: "red",
    volumes: 8,
    topics: 110,
    level: "Intermediate to Advanced",
    comingSoon: true,
  },
  {
    id: "cloud-security",
    title: "Cloud Security Engineer",
    description:
      "Secure cloud infrastructure across AWS, Azure, and GCP. Learn IAM, network security, container security, and compliance.",
    icon: Cloud,
    color: "purple",
    volumes: 5,
    topics: 65,
    level: "Intermediate",
    comingSoon: true,
  },
];

const features = [
  {
    icon: Server,
    title: "Structured Learning",
    description: "Progressive curriculum designed by industry experts",
  },
  {
    icon: Code,
    title: "Hands-On Labs",
    description: "Practice in real-world simulated environments",
  },
  {
    icon: Briefcase,
    title: "Career Ready",
    description: "Skills that employers are actively seeking",
  },
];

const colorStyles: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-500/20", text: "text-blue-500" },
  green: { bg: "bg-green-500/20", text: "text-green-500" },
  red: { bg: "bg-red-500/20", text: "text-red-500" },
  purple: { bg: "bg-purple-500/20", text: "text-purple-500" },
};

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Cybersecurity Roadmap</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose your learning path and start your journey to becoming a cybersecurity professional.
            Our structured roadmaps guide you from fundamentals to expert-level skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="card p-6 text-center hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition">
              <feature.icon className="w-10 h-10 mx-auto mb-4 text-blue-500" />
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Choose Your Career Path</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careerPaths.map((path) => {
            const color = colorStyles[path.color] || colorStyles.blue;
            const content = (
              <div
                className={`card p-6 hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition group block relative ${
                  path.comingSoon ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {path.comingSoon && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-medium rounded-full">
                    Coming Soon
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center flex-shrink-0`}>
                    <path.icon className={`w-6 h-6 ${color.text}`} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">
                      {path.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{path.description}</p>

                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-gray-300">
                        {path.volumes} Volumes
                      </span>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-gray-300">
                        {path.topics}+ Topics
                      </span>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-gray-300">
                        {path.level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );

            return path.comingSoon ? (
              <div key={path.id}>{content}</div>
            ) : (
              <Link key={path.id} href={path.href} className="block">
                {content}
              </Link>
            );
          })}
        </div>

        <div className="mt-16 card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Track Your Progress</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Sign in to track your learning progress, bookmark topics, and earn certificates as you
            complete each volume.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
