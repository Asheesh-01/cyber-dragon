export const metadata = {
  title: "CyberDragon Roadmap – Security Engineer Path",
  description:
    "Follow CyberDragon's structured Security Engineer roadmap from beginner to advanced.",
};

import Link from "next/link";

export default function RoadmapPage() {
  const stages = [
    {
      level: "Beginner",
      duration: "1-2 months",
      icon: "🌱",
      color: "from-green-500 to-emerald-500",
      description: "Foundation and Fundamentals",
      topics: ["Networking Basics", "Linux Intro", "Security Concepts", "Web Basics"]
    },
    {
      level: "Intermediate",
      duration: "2-3 months",
      icon: "📚",
      color: "from-blue-500 to-cyan-500",
      description: "Core Security Skills",
      topics: ["Advanced Networking", "Cryptography", "Web Security", "System Admin"]
    },
    {
      level: "Advanced",
      duration: "2-3 months",
      icon: "⚙️",
      color: "from-purple-500 to-violet-500",
      description: "Professional Expertise",
      topics: ["Penetration Testing", "Incident Response", "Threat Analysis", "Defense Strategy"]
    },
    {
      level: "Expert",
      duration: "2-3 months",
      icon: "🏆",
      color: "from-red-500 to-pink-500",
      description: "Industry Ready",
      topics: ["Security Architecture", "Compliance", "Team Leadership", "Real-World Labs"]
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20">
      {/* Learning Paths */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-4">Choose Your Learning Path</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Select from our specialized cybersecurity learning paths tailored to different career goals and interests
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Security Engineer - Available */}
          <Link href="/roadmap/security-engineer">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-500 rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 transition group h-full duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">🛡️</div>
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Available
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                Security Engineer
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Master network security, system hardening, and threat analysis
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                ⏱️ 8-12 months • 100+ topics
              </div>
            </div>
          </Link>

          {/* Ethical Hacker - Coming Soon */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-300 dark:border-red-700 rounded-2xl p-6 opacity-60 h-full cursor-not-allowed transition-all duration-300 hover:opacity-80 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-1 hover:border-red-500/50">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">🔨</div>
              <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Ethical Hacker
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Learn penetration testing, vulnerability assessment, and exploitation
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              ⏱️ 10-14 months • 120+ topics
            </div>
          </div>

          {/* SOC Analyst - Coming Soon */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-2xl p-6 opacity-60 h-full cursor-not-allowed transition-all duration-300 hover:opacity-80 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 hover:border-purple-500/50">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">📊</div>
              <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              SOC Analyst
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Master incident detection, monitoring, and SIEM tools
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              ⏱️ 6-10 months • 80+ topics
            </div>
          </div>

          {/* Malware Analyst - Coming Soon */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-300 dark:border-orange-700 rounded-2xl p-6 opacity-60 h-full cursor-not-allowed transition-all duration-300 hover:opacity-80 hover:shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 hover:border-orange-500/50">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">🦠</div>
              <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Malware Analyst
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Analyze malicious code, reverse engineering, and threat hunting
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              ⏱️ 12-16 months • 140+ topics
            </div>
          </div>

          {/* Cloud Security - Coming Soon */}
          <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-2 border-sky-300 dark:border-sky-700 rounded-2xl p-6 opacity-60 h-full cursor-not-allowed transition-all duration-300 hover:opacity-80 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-1 hover:border-sky-500/50">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">☁️</div>
              <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Cloud Security Specialist
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Secure AWS, Azure, GCP and cloud infrastructure
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              ⏱️ 8-12 months • 95+ topics
            </div>
          </div>

          {/* Forensics Expert - Coming Soon */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-300 dark:border-indigo-700 rounded-2xl p-6 opacity-60 h-full cursor-not-allowed transition-all duration-300 hover:opacity-80 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1 hover:border-indigo-500/50">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">🔬</div>
              <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Digital Forensics Expert
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Investigate digital crimes and evidence collection
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              ⏱️ 10-14 months • 110+ topics
            </div>
          </div>

          {/* DevSecOps Engineer - Coming Soon */}
          <div className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 border-2 border-teal-300 dark:border-teal-700 rounded-2xl p-6 opacity-60 h-full cursor-not-allowed transition-all duration-300 hover:opacity-80 hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-1 hover:border-teal-500/50">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">🔧</div>
              <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              DevSecOps Engineer
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Integrate security into development and CI/CD pipelines
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              ⏱️ 8-12 months • 100+ topics
            </div>
          </div>

          {/* Security Architect - Coming Soon */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-2xl p-6 opacity-60 h-full cursor-not-allowed transition-all duration-300 hover:opacity-80 hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-1 hover:border-amber-500/50">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">🏛️</div>
              <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Security Architect
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Design enterprise-level security solutions and strategies
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              ⏱️ 12-18 months • 150+ topics
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            More specialized paths coming soon! Subscribe to get notified when new roadmaps are released.
          </p>
        </div>
      </section>

      {/* Progress Timeline */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-16">Learning Progression</h2>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-purple-500 to-red-500" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stages.map((stage, index) => (
              <div key={index} className="relative">
                {/* Card */}
                <div className={`bg-gradient-to-br ${stage.color} rounded-2xl p-0.5 mb-8 md:mb-0`}>
                  <div className="bg-white dark:bg-black rounded-2xl p-6 h-full">
                    {/* Stage Number Circle */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mb-4 -mt-10 mx-auto border-4 border-white dark:border-black">
                      <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">{index + 1}</span>
                    </div>

                    {/* Icon */}
                    <div className="text-4xl text-center mb-3">{stage.icon}</div>

                    {/* Level Title */}
                    <h3 className="text-xl font-bold text-center mb-2">{stage.level}</h3>

                    {/* Duration */}
                    <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-2 text-center text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
                      ⏱️ {stage.duration}
                    </div>

                    {/* Description */}
                    <p className="text-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                      {stage.description}
                    </p>

                    {/* Topics */}
                    <div className="space-y-2">
                      {stage.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-start gap-2">
                          <span className="text-xs mt-1">✓</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 bg-gray-50 dark:bg-gray-900/50 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Core Competencies</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-blue-500/10 transition">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="font-bold mb-2">Network Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Master network protocols, firewalls, intrusion detection, and secure communications
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-purple-500/10 transition">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-bold mb-2">System Hardening</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Secure operating systems, access controls, and vulnerability management
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-green-500/10 transition">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-bold mb-2">Threat Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Identify, analyze, and mitigate security threats and vulnerabilities
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-orange-500/10 transition">
              <div className="text-4xl mb-3">🔑</div>
              <h3 className="font-bold mb-2">Cryptography</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Understand encryption, digital signatures, and secure data protection
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-red-500/10 transition">
              <div className="text-4xl mb-3">🚨</div>
              <h3 className="font-bold mb-2">Incident Response</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detect, respond to, and recover from security incidents effectively
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-cyan-500/10 transition">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="font-bold mb-2">Compliance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn regulations, standards, and best practices for security
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-12">How to Use This Roadmap</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Start with Fundamentals</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Begin at the Beginner stage, learn core concepts and basics
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Complete Each Stage</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Work through topics, labs, and challenges for each level
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Practice Hands-On</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Apply what you learn through practical labs and real-world scenarios
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-orange-600 text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Get Certified</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Earn certificates upon completing each stage and the full roadmap
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200 dark:border-blue-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">🎯 Pro Tips</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0">✨</span>
                <span>Don't skip fundamentals - they're crucial for advanced concepts</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">⏰</span>
                <span>Spend 1-2 hours daily for consistent progress and retention</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">🧪</span>
                <span>Hands-on labs are essential - practice more than you read</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">🤝</span>
                <span>Join our community to discuss challenges and share knowledge</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">📚</span>
                <span>Review previous stages regularly to strengthen your foundation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
