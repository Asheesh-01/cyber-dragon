"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // SECURE: Role-based access control
  useEffect(() => {
    const checkAdmin = async () => {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data.user) {
        router.push("/login?redirect=/admin");
        return;
      }

      const userRole = data.user.user_metadata?.role;
      if (userRole !== "admin") {
        // Log unauthorized access attempt (never expose to user)
        console.warn(`[SECURITY] Unauthorized admin access attempt by ${data.user.email}`);
        router.push("/");
        return;
      }

      setIsAuthorized(true);
      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  const handleAddCourse = async () => {
    if (!isAuthorized) {
      setMsg("You are not authorized to perform this action");
      return;
    }

    // SECURE: Input validation
    if (!title.trim() || !desc.trim()) {
      setMsg("Title and description are required");
      return;
    }

    if (title.length > 200) {
      setMsg("Title too long (max 200 characters)");
      return;
    }

    if (desc.length > 2000) {
      setMsg("Description too long (max 2000 characters)");
      return;
    }

    const { error } = await supabase.from("courses").insert([
      { title: title.trim(), description: desc.trim() },
    ]);

    if (error) {
      setMsg(`Error: ${error.message}`);
    } else {
      setMsg("Course added successfully");
      setTitle("");
      setDesc("");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Verifying access...
      </main>
    );
  }

  if (!isAuthorized) {
    return null; // Already redirected by useEffect
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Course Upload</h1>

      <input
        placeholder="Course Title"
        className="w-full p-2 mb-3 bg-black border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={200}
      />

      <textarea
        placeholder="Course Description"
        className="w-full p-2 mb-3 bg-black border rounded"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        maxLength={2000}
      />

      <button
        onClick={handleAddCourse}
        className="bg-white text-black px-6 py-2 rounded disabled:opacity-50"
        disabled={!title || !desc}
      >
        Add Course
      </button>

      {msg && <p className="mt-4 text-gray-400">{msg}</p>}
    </main>
  );
}
