import { Search } from "lucide-react";

export const metadata = {
  title: "CyberDragon Notes – Cybersecurity Study Notes",
  description:
    "Access structured cybersecurity notes for networking, security, and system protection.",
};

const notes = [
  {
    title: "Networking Fundamentals Notes",
    slug: "networking-fundamentals",
    category: "Networking",
    description: "Study notes on TCP/IP, routing, firewalls, DNS, and network security concepts.",
    icon: "🌐",
    topics: ["TCP/IP", "Routing", "Firewalls", "DNS", "DHCP"],
  },
  {
    title: "Linux for Cybersecurity Notes",
    slug: "linux-for-cybersecurity",
    category: "Operating Systems",
    description: "Comprehensive notes on Linux commands, scripting, and system administration for security.",
    icon: "🐧",
    topics: ["CLI Basics", "File System", "Scripting", "Users & Permissions", "Services"],
  },
  {
    title: "Web Security Basics Notes",
    slug: "web-security-basics",
    category: "Web Security",
    description: "Detailed notes on OWASP Top 10, SQL injection, XSS, CSRF, and web vulnerabilities.",
    icon: "🔐",
    topics: ["OWASP Top 10", "SQL Injection", "XSS", "CSRF", "Authentication"],
  },
  {
    title: "Cryptography Foundations Notes",
    slug: "cryptography-foundations",
    category: "Security",
    description: "Study notes on encryption algorithms, hashing, digital signatures, and cryptographic protocols.",
    icon: "🔑",
    topics: ["Symmetric Encryption", "Asymmetric Encryption", "Hashing", "Digital Signatures", "Certificates"],
  },
  {
    title: "Ethical Hacking Introduction Notes",
    slug: "ethical-hacking-intro",
    category: "Hacking",
    description: "Notes on penetration testing, reconnaissance, scanning, and ethical hacking methodologies.",
    icon: "🔨",
    topics: ["Reconnaissance", "Scanning", "Exploitation", "Post-Exploitation", "Reporting"],
  },
  {
    title: "Malware Analysis Basics Notes",
    slug: "malware-analysis-basics",
    category: "Malware",
    description: "Study notes on malware types, reverse engineering, dynamic analysis, and threat intelligence.",
    icon: "🦠",
    topics: ["Static Analysis", "Dynamic Analysis", "Reverse Engineering", "Disassembly", "Sandboxing"],
  },
  {
    title: "Digital Forensics Notes",
    slug: "digital-forensics",
    category: "Forensics",
    description: "Comprehensive notes on digital forensics, evidence collection, and cyber crime investigation.",
    icon: "🔬",
    topics: ["Evidence Collection", "File Recovery", "Memory Forensics", "Timeline Analysis", "Case Study"],
  },
  {
    title: "SOC Analyst Basics Notes",
    slug: "soc-analyst-basics",
    category: "SOC",
    description: "Study notes on SOC operations, SIEM tools, incident response, and security monitoring.",
    icon: "📊",
    topics: ["SIEM Basics", "Log Analysis", "Alert Tuning", "Incident Response", "Threat Hunting"],
  },
];

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Free Cybersecurity Study Notes</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Access comprehensive cybersecurity notes completely free. Perfect for quick reference, exam prep, and
            continuous learning. All notes are regularly updated with the latest industry practices.
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              aria-label="Search notes"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{notes.length}</div>
            <div className="text-sm text-gray-400">Study Notes</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">Coming Soon</div>
            <div className="text-sm text-gray-400">All Notes in Development</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note, i) => (
            <div key={i} className="card p-5 opacity-75 hover:opacity-90 hover:border-yellow-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition cursor-not-allowed">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{note.icon}</div>
                <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                  Coming Soon
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2">
                {note.title}
              </h3>

              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{note.description}</p>

              <div className="flex flex-wrap gap-2">
                {note.topics.slice(0, 3).map((topic: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-gray-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
