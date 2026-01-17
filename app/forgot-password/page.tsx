"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOtp = async () => {
    if (!email) return alert("Enter email");

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);

    if (error) alert(error.message);
    else router.push(`/verify-otp?email=${email}`);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">

          <h1 className="text-2xl font-semibold text-center">
            The Cyber Dragon
          </h1>

          <p className="text-sm text-gray-400 text-center mt-1">
            Reset your password
          </p>

          <div className="mt-6">
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              className="mt-1 w-full bg-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full mt-6 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            {loading ? "Sending..." : "Continue"}
          </button>

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
