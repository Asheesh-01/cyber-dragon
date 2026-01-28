"use client";
import BackButton from "@/components/BackButton";

import { useState } from "react";

// export const metadata = {
//   title: "CyberDragon Roadmap – Security Engineer Path",
//   description:
//     "Follow CyberDragon’s structured Security Engineer roadmap from beginner to advanced.",
// };

const roadmap = [
  {
    id: 1,
    title: "Volume 1 – Foundations & Cybersecurity Basics",
    description: "Computer, Internet and Cybersecurity fundamentals",
    topics: [
      "What is Computer",
      "How Computer Works",
      "What is Operating System",
      "Types of Operating Systems",
      "What is Internet",
      "How Internet Works",
      "What is Network",
      "What is Cybersecurity",
      "Why Cybersecurity Exists",
      "What is Malware",
      "Types of Malware",
      "Who is Hacker",
      "Types of Hackers",
      "CIA Triad",
      "Threat, Vulnerability, Risk",
      "Security Engineer Role",
    ],
  },

  {
    id: 2,
    title: "Volume 2 – Operating Systems & Linux",
    description: "Windows, Linux and OS internals",
    topics: [
      "OS Architecture",
      "Kernel & User Space",
      "Windows File System",
      "Windows Users & Groups",
      "Windows Processes & Services",
      "Windows Registry",
      "Windows Logs",
      "Linux File System",
      "Linux Permissions",
      "Linux Users & Groups",
      "Linux Processes",
      "Linux Package Management",
      "Linux Services",
      "Linux Logging",
      "Disk Management",
      "OS Hardening",
    ],
  },

  {
    id: 3,
    title: "Volume 3 – Networking From Zero",
    description: "Networking foundations for security",
    topics: [
      "OSI Model",
      "TCP/IP Model",
      "IP Addressing",
      "Subnetting",
      "MAC Address",
      "ARP",
      "Ports & Services",
      "TCP vs UDP",
      "DNS",
      "DHCP",
      "Routing",
      "Firewalls",
      "VPN",
      "Wireless Networking",
      "Network Scanning",
      "Packet Analysis",
    ],
  },

  {
    id: 4,
    title: "Volume 4 – Programming (Python)",
    description: "Python from zero for automation",
    topics: [
      "Variables",
      "Data Types",
      "Operators",
      "Conditionals",
      "Loops",
      "Functions",
      "Lists, Tuples, Sets, Dictionaries",
      "File Handling",
      "Error Handling",
      "Modules & Packages",
      "Regex",
      "API Requests",
      "Automation Scripts",
      "Security Libraries",
    ],
  },

  {
    id: 5,
    title: "Volume 5 – Security Foundations",
    description: "Core defensive security knowledge",
    topics: [
      "Authentication",
      "Authorization",
      "Encryption",
      "Hashing",
      "Web Security Basics",
      "OWASP Top 10",
      "Network Security Basics",
      "Endpoint Security",
      "Identity & Access Management",
      "Logging & Monitoring",
      "Incident Response",
      "Security Policies",
    ],
  },

  {
    id: 6,
    title: "Volume 6 – Blue Team Core",
    description: "SOC & detection fundamentals",
    topics: [
      "SOC Operations",
      "SIEM",
      "Log Sources",
      "Threat Intelligence",
      "Malware Analysis Basics",
      "Endpoint Detection & Response",
      "Network Traffic Analysis",
      "Alert Triage",
      "Incident Handling",
      "Digital Forensics Basics",
      "Threat Hunting",
    ],
  },

  {
    id: 7,
    title: "Volume 7 – Cloud & DevOps Security",
    description: "Cloud fundamentals and protection",
    topics: [
      "Cloud Computing Models",
      "Shared Responsibility Model",
      "Cloud IAM",
      "Cloud Networking",
      "Cloud Compute",
      "Cloud Storage Security",
      "Cloud Logging",
      "Container Security",
      "CI/CD Security",
      "Infrastructure as Code",
      "Cloud Attacks",
    ],
  },

  {
    id: 8,
    title: "Volume 8 – Automation & Engineering",
    description: "Build and automate security tools",
    topics: [
      "Python Automation",
      "Git & GitHub",
      "APIs",
      "Building Security Tools",
      "Ansible Basics",
      "Task Scheduling",
      "Documentation",
    ],
  },

  {
    id: 9,
    title: "Volume 9 – Projects & Portfolio",
    description: "Hands-on real world projects",
    topics: [
      "Linux Hardening Project",
      "Network Scanner",
      "Log Monitoring System",
      "SIEM Lab",
      "Cloud Security Lab",
      "Automation Scripts",
      "Documentation & Blog",
    ],
  },

  {
    id: 10,
    title: "Volume 10 – Career Preparation",
    description: "Job and industry readiness",
    topics: [
      "Resume Building",
      "LinkedIn Optimization",
      "GitHub Profile",
      "Interview Preparation",
      "Certifications",
      "Internships",
      "Job Applications",
      "Continuous Learning",
    ],
  },
];


export default function RoadmapPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 pt-32">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
 {/* HEADER */}
<div className="mb-14">

  {/* Back Button */}
  <div className="mb-6">
    <BackButton />
  </div>

  <div className="text-center">
    <h1 className="text-4xl font-bold mb-4 text-white">
      Security Engineer Roadmap
    </h1>

    <p className="text-grey-400">
      Click a volume to expand and view topics
    </p>
  </div>

</div>


        {/* VOLUMES */}
        <div className="space-y-5">

          {roadmap.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                onClick={() =>
                  setOpenId(isOpen ? null : item.id)
                }
                className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-white/20 transition"
              >
                {/* HEADER ROW */}
                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="text-lg font-bold text-blue-400">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {item.description}
                    </p>
                  </div>

                  {/* ARROW */}
                  <div
                    className={`text-xl transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </div>
                </div>

                {/* EXPANDED CONTENT */}
                {isOpen && (
                  <div className="mt-4 pl-4 border-l border-white/10">
                    <ul className="space-y-2 text-gray-300 text-sm">
                      {item.topics.map((topic, i) => (
                        <li key={i}>• {topic}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </main>
  );
}
