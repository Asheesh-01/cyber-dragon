"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState("");

 useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    console.log("USER METADATA:", data.user?.app_metadata);
    console.log("RAW METADATA:", data.user?.user_metadata);
  });
}, []);


  const handleAddCourse = async () => {
    const { error } = await supabase.from("courses").insert([
      { title, description: desc },
    ]);

    if (error) setMsg(error.message);
    else {
      setMsg("Course added successfully");
      setTitle("");
      setDesc("");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Course Upload</h1>

      <input
        placeholder="Course Title"
        className="w-full p-2 mb-3 bg-black border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Course Description"
        className="w-full p-2 mb-3 bg-black border rounded"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button
        onClick={handleAddCourse}
        className="bg-white text-black px-6 py-2 rounded"
      >
        Add Course
      </button>

      {msg && <p className="mt-4 text-gray-400">{msg}</p>}
    </main>
  );
}
