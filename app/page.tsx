"use client";
import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "CyberDragon – Cybersecurity Learning Platform",
//   description:
//     "CyberDragon is a cybersecurity learning platform for mastering networking, system security, SOC, and digital defense.",
// };


import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setAuthLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-16 min-h-[85vh]">

      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-center leading-tight mb-4">
        Master Cybersecurity
      </h1>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-200">
        World's #1 Cyber Learning Platform
      </h2>

      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base">

        Learn Linux, Networking, SOC, Pentesting & AI-Security with real industry structure.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full max-w-5xl px-0">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-white/20 transition">
          <p className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">10K+</p>
          <p className="text-gray-300 font-semibold text-sm sm:text-base">Students</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">Learning cybersecurity skills</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-white/20 transition">
          <p className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">50+</p>
          <p className="text-gray-300 font-semibold text-sm sm:text-base">Modules</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">Comprehensive curriculum</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-white/20 transition">
          <p className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">100%</p>
          <p className="text-gray-300 fonall t-semibold text-sm sm:text-base">Industry Focused</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">Real-world scenarios</p>
        </div>
      </div>
      </section>

      {/* About Platform Section */}
<section className="px-4 sm:px-6 pt-6 sm:pt-8 pb-12 sm:pb-16 max-w-5xl mx-auto w-full">

        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">About CyberDragon</h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
            CyberDragon is built to transform cybersecurity learning. We combine real-world industry practices with structured education to help you master networking, security operations, penetration testing, and modern defensive techniques.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition">
            <div className="text-3xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-3">Real Industry Skills</h3>
            <p className="text-gray-400">
              Learn from real-world scenarios and industry practices. No shortcuts, no fluff—just practical cybersecurity knowledge.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-3">Structured Learning Path</h3>
            <p className="text-gray-400">
              Follow our comprehensive roadmap from beginner to advanced. Each module builds on the previous, ensuring solid foundations.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Career Ready</h3>
            <p className="text-gray-400">
              Get equipped with the skills employers want. Our curriculum aligns with SOC, ethical hacking, and security roles.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-white/5 backdrop-blur-sm w-full">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Popular Courses</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              Start your cybersecurity journey with our most popular courses designed for all skill levels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Course 1 */}
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-blue-500/50 transition">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Linux Fundamentals</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">Master Linux commands essential for cybersecurity.</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-semibold text-sm">Free</span>
                <a href="/courses" className="text-gray-400 hover:text-white transition">→</a>
              </div>
            </div>

            {/* Course 2 */}
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-blue-500/50 transition">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Networking Essentials</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">Understand TCP/IP, routing, and network security fundamentals.</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-semibold text-sm">Free</span>
                <a href="/courses" className="text-gray-400 hover:text-white transition">→</a>
              </div>
            </div>

            {/* Course 3 */}
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-blue-500/50 transition">
              <h3 className="text-lg sm:text-xl font-bold mb-2">SOC Analyst Bootcamp</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">Become a Security Operations Center professional.</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-semibold text-sm">₹999</span>
                <a href="/courses" className="text-gray-400 hover:text-white transition">→</a>
              </div>
            </div>
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <a href="/courses">
              <button className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition shadow-[0_0_20px_rgba(37,99,235,0.3)] text-sm sm:text-base">
                Explore All Courses
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Free Notes Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Free Study Notes</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Access comprehensive cybersecurity notes completely free. Perfect for quick reference and exam prep.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Note 1 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition">
            <h3 className="text-base sm:text-lg font-bold mb-2">Networking Basics</h3>
            <p className="text-gray-400 text-xs sm:text-sm">OSI model, TCP/IP, IP addressing, and networking fundamentals.</p>
          </div>

          {/* Note 2 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition">
            <h3 className="text-base sm:text-lg font-bold mb-2">Web Security</h3>
            <p className="text-gray-400 text-xs sm:text-sm">XSS, SQL Injection, CSRF, and secure coding best practices.</p>
          </div>

          {/* Note 3 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition">
            <h3 className="text-base sm:text-lg font-bold mb-2">Cryptography</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Encryption algorithms, hashing, digital signatures, and PKI.</p>
          </div>

          {/* Note 4 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition">
            <h3 className="text-base sm:text-lg font-bold mb-2">OWASP Top 10</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Top web application vulnerabilities and mitigation strategies.</p>
          </div>
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <a href="/notes">
            <button className="px-6 sm:px-8 py-2 sm:py-3 border border-white hover:bg-white hover:text-black rounded-lg font-bold transition text-sm sm:text-base">
              View All Notes
            </button>
          </a>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-white/5 backdrop-blur-sm w-full">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose CyberDragon?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="flex gap-3 sm:gap-4">
              <div className="text-xl sm:text-2xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-2">Industry-Aligned Curriculum</h3>
                <p className="text-gray-400 text-sm sm:text-base">Our courses match real job requirements in cybersecurity roles.</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="text-xl sm:text-2xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-2">Practical Learning</h3>
                <p className="text-gray-400 text-sm sm:text-base">Hands-on projects and real-world scenarios, not just theory.</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="text-xl sm:text-2xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-2">Free Foundation Content</h3>
                <p className="text-gray-400 text-sm sm:text-base">Start learning cybersecurity basics without any cost.</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="text-xl sm:text-2xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-2">Structured Roadmap</h3>
                <p className="text-gray-400 text-sm sm:text-base">Clear progression from beginner to advanced cybersecurity professional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 max-w-5xl mx-auto text-center w-full">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Your Journey?</h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10">
          Join thousands of cybersecurity learners. Explore free notes, enroll in courses, and follow the structured roadmap.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
          <a href="/notes">
            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition shadow-[0_0_20px_rgba(37,99,235,0.3)] w-full sm:w-auto text-sm sm:text-base">
              Explore Free Notes
            </button>
          </a>
          <a href="/roadmap">
            <button className="px-6 sm:px-8 py-2 sm:py-3 border border-white hover:bg-white hover:text-black rounded-lg font-bold transition w-full sm:w-auto text-sm sm:text-base">
              View Roadmap
            </button>
          </a>
          <a href="/courses">
            <button className="px-6 sm:px-8 py-2 sm:py-3 border border-white hover:bg-white hover:text-black rounded-lg font-bold transition w-full sm:w-auto text-sm sm:text-base">
              Browse Courses
            </button>
          </a>
        </div>
      </section>

    </main>
  );
}
