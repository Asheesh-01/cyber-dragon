"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const updatePassword = async () => {
    if (!password || !confirm) {
      return alert("Fill all fields");
    }

    if (password !== confirm) {
      return alert("Passwords do not match");
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully");
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">

          <h1 className="text-2xl font-semibold text-center">
            The Cyber Dragon
          </h1>

          <p className="text-sm text-gray-400 text-center mt-1">
            Create new password
          </p>

          {/* New Password */}
          <div className="mt-6">
            <label className="text-sm text-gray-400">New password</label>
            <input
              type="password"
              className="mt-1 w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <label className="text-sm text-gray-400">Confirm password</label>
            <input
              type="password"
              className="mt-1 w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            onClick={updatePassword}
            disabled={loading}
            className="w-full mt-6 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          {/* Back to login */}
          <button
            onClick={() => router.push("/login")}
            className="w-full mt-3 text-sm text-gray-400 hover:text-white transition"
          >
            Return to login
          </button>

        </div>
      </div>
    </main>
  );
}
