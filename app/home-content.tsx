"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

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
    <main className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-black dark:via-black dark:to-black/95 text-black dark:text-white">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-20 min-h-[90vh] relative overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          <span className="text-sm font-semibold text-blue-300">Industry-Leading Learning Platform</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-center leading-tight mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Master Cybersecurity with CyberDragon
        </h1>

        <p className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-100">
          Learn from industry experts with real-world projects
        </p>

        <p className="text-gray-300 text-center max-w-4xl mx-auto mb-12 sm:mb-16 text-base sm:text-lg leading-relaxed">
          Comprehensive cybersecurity training covering Linux, Networking, SOC Operations, Penetration Testing, and AI Security. Join 10,000+ professionals building real skills with structured paths and hands-on labs.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          {user ? (
            <>
              <Link href="/roadmap">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-bold transition shadow-[0_0_30px_rgba(37,99,235,0.4)] text-base hover:shadow-[0_0_40px_rgba(37,99,235,0.6)]">
                  Start Learning Journey →
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="px-8 py-4 border-2 border-cyan-400 hover:bg-cyan-400/10 rounded-lg font-bold transition text-base">
                  Go to Dashboard
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/register">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-bold transition shadow-[0_0_30px_rgba(37,99,235,0.4)] text-base hover:shadow-[0_0_40px_rgba(37,99,235,0.6)]">
                  Start Free Today →
                </button>
              </Link>
              <Link href="/login">
                <button className="px-8 py-4 border-2 border-cyan-400 hover:bg-cyan-400/10 rounded-lg font-bold transition text-base">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl px-2">
          <div className="card p-6 text-center hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition group">
            <p className="text-4xl font-bold text-blue-400 mb-2 group-hover:text-cyan-400 transition">10K+</p>
            <p className="text-gray-300 font-semibold">Active Students</p>
            <p className="text-gray-500 text-xs mt-2">Learning & growing daily</p>
          </div>

          <div className="card p-6 text-center hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition group">
            <p className="text-4xl font-bold text-blue-400 mb-2 group-hover:text-cyan-400 transition">500+</p>
            <p className="text-gray-300 font-semibold">Topics & Modules</p>
            <p className="text-gray-500 text-xs mt-2">Comprehensive curriculum</p>
          </div>

          <div className="card p-6 text-center hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition group">
            <p className="text-4xl font-bold text-blue-400 mb-2 group-hover:text-cyan-400 transition">100%</p>
            <p className="text-gray-300 font-semibold">Industry-Focused</p>
            <p className="text-gray-500 text-xs mt-2">Real-world scenarios</p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="px-4 sm:px-6 py-20 w-full border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why Choose CyberDragon?</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              We don't just teach cybersecurity – we prepare you for a thriving career in the industry
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="card p-8 hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Industry-Expert Instructors</h3>
              <p className="text-gray-400">
                Learn from cybersecurity professionals with 10+ years of experience in Fortune 500 companies and leading security firms.
              </p>
            </div>

            <div className="card p-8 hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🗺️</div>
              <h3 className="text-xl font-bold mb-3">Clear Learning Paths</h3>
              <p className="text-gray-400">
                Follow structured roadmaps designed to take you from beginner to expert. Choose your specialization and progress at your own pace.
              </p>
            </div>

            <div className="card p-8 hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">💻</div>
              <h3 className="text-xl font-bold mb-3">Hands-On Lab Environment</h3>
              <p className="text-gray-400">
                Practice with real tools and systems. Get hands-on experience with Linux, networking tools, SIEM platforms, and penetration testing frameworks.
              </p>
            </div>

            <div className="card p-8 hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">🎓</div>
              <h3 className="text-xl font-bold mb-3">Recognized Certifications</h3>
              <p className="text-gray-400">
                Earn industry-recognized certificates that boost your resume and validate your skills to employers worldwide.
              </p>
            </div>

            <div className="card p-8 hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">👥</div>
              <h3 className="text-xl font-bold mb-3">Active Community</h3>
              <p className="text-gray-400">
                Connect with thousands of cybersecurity professionals. Network, discuss challenges, and collaborate on real-world projects.
              </p>
            </div>

            <div className="card p-8 hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition">⚡</div>
              <h3 className="text-xl font-bold mb-3">Lifetime Access</h3>
              <p className="text-gray-400">
                Get lifetime access to all course materials, updates, and new content. Learn at your own pace, anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Preview */}
      <section className="px-4 sm:px-6 py-20 max-w-6xl mx-auto w-full border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Specialization Paths</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose your cybersecurity specialization and follow a guided learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/roadmap/security-engineer">
            <div className="card bg-gradient-to-br from-blue-900/30 to-blue-900/10 border-blue-500/50 p-8 hover:border-blue-400 hover:bg-white/10 hover:backdrop-blur-xl transition cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">🛡️</div>
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">Available</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition">Security Engineer</h3>
              <p className="text-gray-400 mb-6">
                Master network security, system hardening, vulnerability assessment, and threat analysis.
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>8-12 months • 100+ topics</span>
                <span className="group-hover:translate-x-1 transition">→</span>
              </div>
            </div>
          </Link>

          <div className="card bg-gradient-to-br from-red-900/30 to-red-900/10 border-red-500/30 p-8 opacity-60">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">🔨</div>
              <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/30">Coming Soon</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Ethical Hacker</h3>
            <p className="text-gray-400 mb-6">
              Learn penetration testing, vulnerability exploitation, and offensive security techniques.
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>10-14 months • 120+ topics</span>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-purple-500/30 p-8 opacity-60">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">📊</div>
              <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/30">Coming Soon</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">SOC Analyst</h3>
            <p className="text-gray-400 mb-6">
              Master incident detection, monitoring, SIEM tools, and security operations center management.
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>6-10 months • 80+ topics</span>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-orange-900/30 to-orange-900/10 border-orange-500/30 p-8 opacity-60">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">🦠</div>
              <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/30">Coming Soon</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Malware Analyst</h3>
            <p className="text-gray-400 mb-6">
              Analyze malicious code, reverse engineering, and threat intelligence gathering techniques.
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>12-16 months • 140+ topics</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/roadmap">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-bold transition shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              Explore All Paths →
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="px-4 sm:px-6 py-20 w-full border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Start with Foundational Courses</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Build strong fundamentals with our most popular starter courses
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 opacity-60 cursor-not-allowed h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">🐧</div>
                <span className="text-xs font-bold px-3 py-1 rounded-full border bg-gray-500/20 text-gray-400 border-gray-500/30">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-300">Linux Fundamentals</h3>
              <p className="text-gray-400 text-sm mb-6">Master Linux commands, shell scripting, and system administration for cybersecurity professionals.</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold">Locked</span>
                <span className="text-gray-500">🔒</span>
              </div>
            </div>

            <div className="card p-6 opacity-60 cursor-not-allowed h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">🌐</div>
                <span className="text-xs font-bold px-3 py-1 rounded-full border bg-gray-500/20 text-gray-400 border-gray-500/30">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-300">Networking Essentials</h3>
              <p className="text-gray-400 text-sm mb-6">Understand TCP/IP protocols, routing, firewalls, and network security architectures.</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold">Locked</span>
                <span className="text-gray-500">🔒</span>
              </div>
            </div>

            <div className="card p-6 opacity-60 cursor-not-allowed h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">🔍</div>
                <span className="text-xs font-bold px-3 py-1 rounded-full border bg-gray-500/20 text-gray-400 border-gray-500/30">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-300">SOC Analyst Bootcamp</h3>
              <p className="text-gray-400 text-sm mb-6">Learn incident response, log analysis, and SOC tools with hands-on practice labs.</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold">Locked</span>
                <span className="text-gray-500">🔒</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/courses">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-bold transition shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                Browse All Courses →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof */}
      <section className="px-4 sm:px-6 py-20 max-w-6xl mx-auto w-full border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Trusted by Industry Professionals</h2>
          <p className="text-gray-400 text-lg">Join thousands of cybersecurity professionals worldwide</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="card p-8 text-center hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition">
            <p className="text-4xl font-bold text-blue-400 mb-2">10K+</p>
            <p className="text-gray-300 font-semibold">Active Learners</p>
            <p className="text-gray-500 text-xs mt-2">Growing daily</p>
          </div>
          <div className="card p-8 text-center hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition">
            <p className="text-4xl font-bold text-blue-400 mb-2">4.9★</p>
            <p className="text-gray-300 font-semibold">Course Rating</p>
            <p className="text-gray-500 text-xs mt-2">From 2000+ reviews</p>
          </div>
          <div className="card p-8 text-center hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition">
            <p className="text-4xl font-bold text-blue-400 mb-2">500+</p>
            <p className="text-gray-300 font-semibold">Certificates Issued</p>
            <p className="text-gray-500 text-xs mt-2">Verified credentials</p>
          </div>
          <div className="card p-8 text-center hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition">
            <p className="text-4xl font-bold text-blue-400 mb-2">95%</p>
            <p className="text-gray-300 font-semibold">Job Placement</p>
            <p className="text-gray-500 text-xs mt-2">Within 6 months</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 py-20 w-full border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">How to Get Started</h2>
            <p className="text-gray-400 text-lg">Simple steps to begin your cybersecurity journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg mb-4 mx-auto">
                1
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Create Account</h3>
              <p className="text-gray-400 text-center text-sm">Sign up for free and create your learning profile</p>
              {/* Connecting line */}
              <div className="hidden md:block absolute top-7 left-[60%] w-[150%] h-0.5 bg-gradient-to-r from-blue-600 to-transparent"></div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg mb-4 mx-auto">
                2
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Choose Path</h3>
              <p className="text-gray-400 text-center text-sm">Select your cybersecurity specialization</p>
              {/* Connecting line */}
              <div className="hidden md:block absolute top-7 left-[60%] w-[150%] h-0.5 bg-gradient-to-r from-blue-600 to-transparent"></div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg mb-4 mx-auto">
                3
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Start Learning</h3>
              <p className="text-gray-400 text-center text-sm">Access courses, labs, and community</p>
              {/* Connecting line */}
              <div className="hidden md:block absolute top-7 left-[60%] w-[150%] h-0.5 bg-gradient-to-r from-blue-600 to-transparent"></div>
            </div>

            <div>
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg mb-4 mx-auto">
                4
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Get Certified</h3>
              <p className="text-gray-400 text-center text-sm">Earn credentials and advance your career</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 py-20 max-w-5xl mx-auto text-center w-full border-t border-white/5">
        <div className="card bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-blue-500/30 p-12 hover:bg-white/10 hover:backdrop-blur-xl transition">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of cybersecurity professionals. Start your learning journey today and build a lucrative career in one of the fastest-growing fields.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/roadmap">
              <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-bold transition shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)]">
                Explore Learning Paths →
              </button>
            </Link>
            <Link href="/courses">
              <button className="px-10 py-4 border-2 border-cyan-400 hover:bg-cyan-400/10 rounded-lg font-bold transition">
                View Courses
              </button>
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-8">✓ Free courses available • ✓ Lifetime access • ✓ No credit card required</p>
        </div>
      </section>

    </main>
  );
}