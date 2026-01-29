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
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20">
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">Structured Cybersecurity Study Notes</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 text-lg">
          Comprehensive, well-organized study notes to complement your learning. Access detailed notes for each course topic and concept.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300 text-center">
            ✓ {notes.length} Study Note Sets
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300 text-center">
            ✓ Downloadable PDFs
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300 text-center">
            ✓ Free Access
          </div>
        </div>
      </section>

      {/* Notes Grid */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.map((note, i) => (
              <div key={i} className="group cursor-not-allowed">
                <div
                  className="
                    h-full bg-black/40 dark:bg-black/40 backdrop-blur-xl
                    border border-white/10 dark:border-white/10
                    rounded-2xl p-6
                    transition-all duration-300 ease-out
                    opacity-60 hover:opacity-80 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-white/20
                  "
                >
                  {/* Icon and Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">
                      {note.icon}
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full border bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
                      Coming Soon
                    </span>
                  </div>

                  {/* Title and Category */}
                  <h2 className="text-xl font-bold mb-2 text-gray-300 dark:text-gray-400">
                    {note.title}
                  </h2>

                  <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mb-4">
                    {note.category}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {note.description}
                  </p>

                  {/* Topics */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mb-2">KEY TOPICS</p>
                    <div className="flex flex-wrap gap-1">
                      {note.topics.slice(0, 3).map((topic: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-xs bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded px-2 py-1 text-gray-300 dark:text-gray-400"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <p className="mt-4 text-gray-400 dark:text-gray-400 font-semibold flex items-center gap-2">
                    Coming Soon
                    <span>🔒</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 bg-gray-50 dark:bg-gray-900/50 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Note Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-blue-500/10 transition">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-bold mb-2">Well-Organized</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Structured notes aligned with course content for easy reference
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-blue-500/10 transition">
              <div className="text-4xl mb-3">📥</div>
              <h3 className="font-bold mb-2">Downloadable</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Download PDFs to study offline and annotate as you learn
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-blue-500/10 transition">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-bold mb-2">Searchable</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Easily search and find specific topics and concepts you need
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-blue-500/10 transition">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-bold mb-2">Study Aids</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Include diagrams, examples, and quick reference checklists
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-900/20 dark:to-cyan-900/20 m-4 rounded-3xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Study Notes Coming Soon</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Our comprehensive study notes for all courses are being prepared. Check back soon for free, downloadable study materials to enhance your learning journey.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg px-6 py-3 max-w-2xl mx-auto">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              📌 Notes will be released alongside course content. Subscribe to get notified when study materials are available!
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
