"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { courses } from "@/data/courses";
import BackButton from "@/components/BackButton";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug: any = params.slug;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        // 🔥 redirect to login with return URL
        router.push(`/login?redirect=/courses/${slug}`);
      } else {
        setLoading(false);
      }
    });
  }, [slug, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return (
      <main className="min-h-screen bg-black text-white px-10 pt-32 pb-16 flex flex-col items-center justify-center">
        <BackButton />
        
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <p className="text-gray-400 text-lg mb-8">
            The course you're looking for doesn't exist or may have been removed.
          </p>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
            <p className="text-gray-300 mb-4">
              Here are some popular courses you might be interested in:
            </p>
            <ul className="text-left space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span> Linux for Cybersecurity
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span> Networking Fundamentals
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span> Web Security Basics
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span> SOC Analyst Basics
              </li>
            </ul>
          </div>
          
          <button 
            onClick={() => router.push("/courses")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Browse All Courses
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-10 pt-32 pb-16 max-w-5xl mx-auto">
      <BackButton />

      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <div className="h-64 bg-gray-800 rounded mb-6 flex items-center justify-center text-gray-500">
            Course Image
          </div>

          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-gray-400 mt-2">{course.category}</p>
          <p className="mt-4 text-gray-300">{course.description}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl">

          <h2 className="text-xl font-bold mb-4">Course Modules</h2>

          <ul className="space-y-2">
            {course.modules?.map((m: string, i: number) => (
              <li
                key={i}
                className="flex justify-between border-b border-white/10 pb-2"
              >
                <span>{m}</span>
                <span className="text-sm text-gray-500">Locked</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 font-bold text-lg">
            Price: {course.price || "Free"}
          </p>

          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-bold transition">
            Enroll Course
          </button>

        </div>

      </div>

    </main>
  );
}
