"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";

const courses = [
  {
    slug: "networking-fundamentals",
    title: "Networking Fundamentals",
    category: "Networking",
    description: "Learn TCP/IP, routing, firewalls, and network security from basics to advanced concepts.",
    level: "Beginner",
    duration: "4 weeks",
    price: "Free",
    icon: "🌐",
    topics: ["TCP/IP", "Routing", "Firewalls", "DNS", "DHCP"],
  },
  {
    slug: "linux-for-cybersecurity",
    title: "Linux for Cybersecurity",
    category: "Operating Systems",
    description: "Master Linux commands, scripting, and system administration essential for security professionals.",
    level: "Beginner",
    duration: "6 weeks",
    price: "Free",
    icon: "🐧",
    topics: ["CLI Basics", "File System", "Scripting", "Users & Permissions", "Services"],
  },
  {
    slug: "web-security-basics",
    title: "Web Security Basics",
    category: "Web Security",
    description: "Understand OWASP Top 10, common web vulnerabilities, SQL injection, XSS, and CSRF attacks.",
    level: "Intermediate",
    duration: "5 weeks",
    price: "₹499",
    icon: "🔐",
    topics: ["OWASP Top 10", "SQL Injection", "XSS", "CSRF", "Authentication"],
  },
  {
    slug: "cryptography-foundations",
    title: "Cryptography Foundations",
    category: "Security",
    description: "Learn encryption algorithms, hashing, digital signatures, and cryptographic protocols.",
    level: "Intermediate",
    duration: "7 weeks",
    price: "₹599",
    icon: "🔑",
    topics: ["Symmetric Encryption", "Asymmetric Encryption", "Hashing", "Digital Signatures", "Certificates"],
  },
  {
    slug: "ethical-hacking-intro",
    title: "Ethical Hacking Introduction",
    category: "Hacking",
    description: "Introduction to penetration testing, reconnaissance, scanning, and ethical hacking methodologies.",
    level: "Intermediate",
    duration: "8 weeks",
    price: "₹799",
    icon: "🔨",
    topics: ["Reconnaissance", "Scanning", "Exploitation", "Post-Exploitation", "Reporting"],
  },
  {
    slug: "malware-analysis-basics",
    title: "Malware Analysis Basics",
    category: "Malware",
    description: "Understand malware types, reverse engineering, dynamic analysis, and threat intelligence.",
    level: "Advanced",
    duration: "8 weeks",
    price: "₹899",
    icon: "🦠",
    topics: ["Static Analysis", "Dynamic Analysis", "Reverse Engineering", "Disassembly", "Sandboxing"],
  },
  {
    slug: "digital-forensics",
    title: "Digital Forensics",
    category: "Forensics",
    description: "Learn digital forensics, evidence collection, preservation, and cyber crime investigation.",
    level: "Advanced",
    duration: "7 weeks",
    price: "₹799",
    icon: "🔬",
    topics: ["Evidence Collection", "File Recovery", "Memory Forensics", "Timeline Analysis", "Case Study"],
  },
  {
    slug: "soc-analyst-basics",
    title: "SOC Analyst Basics",
    category: "SOC",
    description: "Master SOC operations, SIEM tools, incident response, and security monitoring best practices.",
    level: "Intermediate",
    duration: "6 weeks",
    price: "₹699",
    icon: "📊",
    topics: ["SIEM Basics", "Log Analysis", "Alert Tuning", "Incident Response", "Threat Hunting"],
  },
];

const categories = ["All", ...new Set(courses.map(c => c.category))];
const levels = ["All", ...new Set(courses.map(c => c.level))];

const courseLevels = [
  {
    level: "Beginner",
    duration: "4-6 weeks",
    icon: "🌱",
    color: "from-green-500 to-emerald-500",
    description: "Foundation and Core Concepts",
    count: 2
  },
  {
    level: "Intermediate",
    duration: "5-8 weeks",
    icon: "📚",
    color: "from-blue-500 to-cyan-500",
    description: "Practical Skills Development",
    count: 4
  },
  {
    level: "Advanced",
    duration: "7-8 weeks",
    icon: "⚙️",
    color: "from-purple-500 to-violet-500",
    description: "Professional Expertise",
    count: 2
  },
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === "All" || course.category === selectedCategory;
    const levelMatch = selectedLevel === "All" || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20">
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">Master Cybersecurity Through Courses</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 text-lg">
          Comprehensive, structured courses designed to build practical security skills. Learn at your own pace with hands-on labs and real-world projects.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300 text-center">
            ✓ {courses.length} Comprehensive Courses
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300 text-center">
            ✓ 3 Skill Levels
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300 text-center">
            ✓ Lifetime Access
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-4 sm:px-6 py-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-bold mb-4 text-gray-700 dark:text-gray-300">CATEGORY</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <h3 className="text-sm font-bold mb-4 text-gray-700 dark:text-gray-300">LEVEL</h3>
              <div className="flex flex-wrap gap-2">
                {levels.map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      selectedLevel === level
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-bold text-blue-600 dark:text-blue-400">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? "s" : ""}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl font-bold mb-2">No courses found</p>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Core Topics Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 bg-gray-50 dark:bg-gray-900/50 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Core Topics Covered</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-blue-500/10 transition">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="font-bold mb-2">Network Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                TCP/IP protocols, firewalls, intrusion detection systems, and secure network architecture
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-purple-500/10 transition">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="font-bold mb-2">Cryptography</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Encryption algorithms, hashing, digital signatures, and secure key management
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-green-500/10 transition">
              <div className="text-4xl mb-3">🐧</div>
              <h3 className="font-bold mb-2">Linux & OS Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                System hardening, access controls, file permissions, and OS administration
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-orange-500/10 transition">
              <div className="text-4xl mb-3">🕸️</div>
              <h3 className="font-bold mb-2">Web Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                OWASP Top 10, SQL injection, XSS, CSRF, authentication, and API security
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-red-500/10 transition">
              <div className="text-4xl mb-3">🔨</div>
              <h3 className="font-bold mb-2">Ethical Hacking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Penetration testing, reconnaissance, vulnerability assessment, and exploitation techniques
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-cyan-500/10 transition">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold mb-2">Incident Response</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                SOC operations, SIEM tools, threat hunting, and security incident management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-12">How Our Courses Work</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Choose Your Level</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Start with Beginner courses to build foundation, then progress to Intermediate and Advanced
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
                <h3 className="font-bold mb-2">Learn & Practice</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Video lectures combined with hands-on labs and practical exercises
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
                <h3 className="font-bold mb-2">Get Certified</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Earn completion certificates to showcase your skills to employers
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
                <h3 className="font-bold mb-2">Build Your Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Complete real-world projects to add to your professional portfolio
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200 dark:border-blue-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">💡 Course Features</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0">✨</span>
                <span className="text-gray-700 dark:text-gray-300">Video lectures by industry experts</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">🧪</span>
                <span className="text-gray-700 dark:text-gray-300">Interactive labs and hands-on exercises</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">📚</span>
                <span className="text-gray-700 dark:text-gray-300">Downloadable resources and code examples</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">🏆</span>
                <span className="text-gray-700 dark:text-gray-300">Certificates of completion</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">⏰</span>
                <span className="text-gray-700 dark:text-gray-300">Learn at your own pace, lifetime access</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-900/20 dark:to-cyan-900/20 m-4 rounded-3xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Choose a course below and begin your cybersecurity journey today. All courses are coming soon and will be available shortly.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg px-6 py-3 max-w-2xl mx-auto">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              📌 Courses are currently being prepared and will be available soon. Roadmap courses like Security Engineer are already accessible!
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
