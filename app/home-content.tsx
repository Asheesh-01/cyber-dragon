"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HomeContent() {
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
        Master Cybersecurity with CyberDragon
      </h1>

      <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-200">
        World's #1 Cybersecurity Learning Platform
      </p>

      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base">
        Learn Linux, Networking, SOC, Pentesting & AI-Security with real industry structure. Join our cybersecurity learning platform and build professional skills.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full max-w-5xl px-0">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-white/20 transition">
          <p className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">10K+</p>
          <p className="text-gray-300 font-semibold text-sm sm:text-base">Students Learning</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">Gaining cybersecurity skills daily</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-white/20 transition">
          <p className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">50+</p>
          <p className="text-gray-300 font-semibold text-sm sm:text-base">Learning Modules</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">Comprehensive cybersecurity curriculum</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-white/20 transition">
          <p className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">100%</p>
          <p className="text-gray-300 font-semibold text-sm sm:text-base">Industry Focused</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">Real-world security scenarios</p>
        </div>
      </div>
      </section>

      {/* About Platform Section */}
      <section className="px-4 sm:px-6 pt-6 sm:pt-8 pb-12 sm:pb-16 max-w-5xl mx-auto w-full">

        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">About CyberDragon: Your Cybersecurity Learning Platform</h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
            CyberDragon is built to transform cybersecurity education. Our cybersecurity learning platform combines real-world industry practices with structured education to help you master networking, security operations, penetration testing, and modern defensive techniques. Learn cybersecurity fundamentals and advance to professional-level skills.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition">
            <div className="text-3xl mb-4" aria-label="Shield icon">🛡️</div>
            <h3 className="text-xl font-bold mb-3">Real Industry Security Skills</h3>
            <p className="text-gray-400">
              Learn from real-world scenarios and industry practices. Master practical cybersecurity knowledge without shortcuts.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition">
            <div className="text-3xl mb-4" aria-label="Book icon">📚</div>
            <h3 className="text-xl font-bold mb-3">Structured Cybersecurity Roadmap</h3>
            <p className="text-gray-400">
              Follow our comprehensive cybersecurity roadmap from beginner to advanced. Each module builds on previous foundations for solid learning.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition">
            <div className="text-3xl mb-4" aria-label="Target icon">🎯</div>
            <h3 className="text-xl font-bold mb-3">Career Ready Security Roles</h3>
            <p className="text-gray-400">
              Get equipped with skills employers want. Our cybersecurity curriculum aligns with SOC analyst, ethical hacking, and security operations roles.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-white/5 backdrop-blur-sm w-full">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Popular Cybersecurity Courses</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              Start your cybersecurity learning journey with our most popular courses designed for all skill levels. From networking fundamentals to SOC analyst training.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Course 1 */}
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-blue-500/50 transition">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Linux Fundamentals for Security</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">Master Linux commands and system administration essential for cybersecurity professionals and ethical hackers.</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-semibold text-sm">Free</span>
                <a href="/courses" className="text-gray-400 hover:text-white transition">→</a>
              </div>
            </div>

            {/* Course 2 */}
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-blue-500/50 transition">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Networking Essentials</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">Understand TCP/IP, routing, network security fundamentals, and protocols for building secure networks.</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-semibold text-sm">Free</span>
                <a href="/courses" className="text-gray-400 hover:text-white transition">→</a>
              </div>
            </div>

            {/* Course 3 */}
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-blue-500/50 transition">
              <h3 className="text-lg sm:text-xl font-bold mb-2">SOC Analyst Bootcamp</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">Become a Security Operations Center professional with hands-on SIEM, threat detection, and incident response training.</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-semibold text-sm">₹999</span>
                <a href="/courses" className="text-gray-400 hover:text-white transition">→</a>
              </div>
            </div>
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <a href="/courses">
              <button className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition shadow-[0_0_20px_rgba(37,99,235,0.3)] text-sm sm:text-base">
                Explore All Cybersecurity Courses
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Free Notes Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Free Cybersecurity Study Notes</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Access comprehensive cybersecurity notes completely free. Perfect for quick reference, exam prep, and continuous learning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Note 1 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition">
            <h3 className="text-base sm:text-lg font-bold mb-2">Networking Basics for Security</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Learn OSI model, TCP/IP protocols, IP addressing, subnetting, and networking fundamentals for cybersecurity professionals.</p>
          </div>

          {/* Note 2 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition">
            <h3 className="text-base sm:text-lg font-bold mb-2">Web Security and Protection</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Study XSS, SQL Injection, CSRF vulnerabilities, and secure coding best practices for web applications.</p>
          </div>

          {/* Note 3 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition">
            <h3 className="text-base sm:text-lg font-bold mb-2">Cryptography and Encryption</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Master encryption algorithms, hashing techniques, digital signatures, and public key infrastructure basics.</p>
          </div>

          {/* Note 4 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition">
            <h3 className="text-base sm:text-lg font-bold mb-2">OWASP Top 10 Vulnerabilities</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Understand top web application vulnerabilities and learn effective mitigation strategies for defense.</p>
          </div>
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <a href="/notes">
            <button className="px-6 sm:px-8 py-2 sm:py-3 border border-white hover:bg-white hover:text-black rounded-lg font-bold transition text-sm sm:text-base">
              View All Free Notes
            </button>
          </a>
        </div>
      </section>

      {/* Cybersecurity Roadmap Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 bg-white/5 backdrop-blur-sm w-full">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose CyberDragon for Cybersecurity Learning?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="flex gap-3 sm:gap-4">
              <div className="text-xl sm:text-2xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-2">Industry-Aligned Cybersecurity Curriculum</h3>
                <p className="text-gray-400 text-sm sm:text-base">Our cybersecurity courses match real job requirements in SOC analyst, ethical hacking, and security roles.</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="text-xl sm:text-2xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-2">Hands-On Practical Learning</h3>
                <p className="text-gray-400 text-sm sm:text-base">Hands-on projects and real-world cybersecurity scenarios, not just theory or lectures.</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="text-xl sm:text-2xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-2">Free Cybersecurity Foundation</h3>
                <p className="text-gray-400 text-sm sm:text-base">Start learning cybersecurity basics, networking, and security fundamentals without any cost.</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="text-xl sm:text-2xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-2">Structured Cybersecurity Roadmap</h3>
                <p className="text-gray-400 text-sm sm:text-base">Clear progression from beginner to advanced cybersecurity professional with defined learning path.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 max-w-5xl mx-auto text-center w-full">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Your Cybersecurity Journey?</h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10">
          Join thousands of cybersecurity learners. Explore free cybersecurity notes, enroll in professional courses, and follow our structured roadmap to career success.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
          <a href="/notes">
            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition shadow-[0_0_20px_rgba(37,99,235,0.3)] w-full sm:w-auto text-sm sm:text-base">
              Explore Free Notes
            </button>
          </a>
          <a href="/roadmap">
            <button className="px-6 sm:px-8 py-2 sm:py-3 border border-white hover:bg-white hover:text-black rounded-lg font-bold transition w-full sm:w-auto text-sm sm:text-base">
              View Learning Roadmap
            </button>
          </a>
          <a href="/courses">
            <button className="px-6 sm:px-8 py-2 sm:py-3 border border-white hover:bg-white hover:text-black rounded-lg font-bold transition w-full sm:w-auto text-sm sm:text-base">
              Browse All Courses
            </button>
          </a>
        </div>
      </section>

    </main>
  );
}