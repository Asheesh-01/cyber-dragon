"use client";



import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { courses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";

export default function CoursesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/login";
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Checking access...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Cybersecurity Courses
      </h1>

      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {courses.map(course => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </main>
  );
}
