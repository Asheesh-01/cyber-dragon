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
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-12 pt-28 sm:pt-32">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl hover:border-white/20 transition">

          <h1 className="text-2xl sm:text-3xl font-semibold text-center">
            The Cyber Dragon
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 text-center mt-2">
            Create new password
          </p>

          {/* New Password */}
          <div className="mt-6">
            <label className="text-xs sm:text-sm text-gray-400 block mb-2">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-black border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-blue-600 transition text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <label className="text-xs sm:text-sm text-gray-400 block mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-black border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-blue-600 transition text-sm sm:text-base"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            onClick={updatePassword}
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg font-semibold transition shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

          {/* Back to login */}
          <button
            onClick={() => router.push("/login")}
            className="w-full mt-3 text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition"
          >
            Return to login
          </button>

        </div>
      </div>
    </main>
  );
}
