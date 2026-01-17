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
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold text-center leading-tight mb-3">
        Master Cybersecurity
      </h1>

      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-4 text-gray-200">
        World’s #1 Learning Platform
      </h2>

      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
        Learn Linux, Networking, SOC, Pentesting & AI-Security with real industry structure.
      </p>

      {/* Glass Box */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-full max-w-3xl px-8 py-8 flex flex-col justify-between">

        {/* Button Row */}
     {/* Button Row */}
{!authLoading && (
  <div className="flex flex-wrap gap-5 justify-center min-h-[52px]">

    {!user && (
      <a href="/login">
        <button className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition hover:shadow-[0_0_14px_rgba(255,255,255,0.7)]">
          Login
        </button>
      </a>
    )}

    <a href="/roadmap">
      <button className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition hover:shadow-[0_0_14px_rgba(255,255,255,0.7)]">
        Roadmap
      </button>
    </a>

    <a href="/notes">
      <button className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition hover:shadow-[0_0_14px_rgba(255,255,255,0.7)]">
        Free Notes
      </button>
    </a>

    <a href="/courses">
      <button className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition hover:shadow-[0_0_14px_rgba(255,255,255,0.7)]">
        Paid Courses
      </button>
    </a>

    <a href="/contact">
      <button className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition hover:shadow-[0_0_14px_rgba(255,255,255,0.7)]">
        Help
      </button>
    </a>

  </div>
)}


        <div className="h-8" />

        {/* Trust Stats */}
        <div className="flex flex-wrap gap-12 justify-center text-gray-400 text-sm">

          <div>
            <p className="text-white font-bold text-xl">10K+</p>
            <p>Students</p>
          </div>

          <div>
            <p className="text-white font-bold text-xl">50+</p>
            <p>Modules</p>
          </div>

          <div>
            <p className="text-white font-bold text-xl">Industry</p>
            <p>Focused</p>
          </div>

        </div>

      </div>

    </main>
  );
}
