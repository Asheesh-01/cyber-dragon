"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminCoursesPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCourse = async () => {
    const { error } = await supabase.from("courses").insert([
      { title, description },
    ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Course added successfully!");
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded w-96">

        <h2 className="text-xl mb-4 text-center">Add New Course</h2>

        <input
          placeholder="Course Title"
          className="w-full p-2 mb-3 bg-black border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 mb-3 bg-black border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleAddCourse}
          className="w-full bg-white text-black p-2 rounded"
        >
          Add Course
        </button>

        {message && (
          <p className="text-sm mt-3 text-center text-gray-400">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}
