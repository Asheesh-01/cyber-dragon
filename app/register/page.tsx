"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // EMAIL REGISTER
  const handleRegister = async () => {
    setLoading(true);
    setMsg("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setLoading(false);

    if (error) {
      setMsg(error.message);
    } else {
      setMsg("Verification email sent. Please check your inbox.");
    }
  };

  // GOOGLE REGISTER
  const googleRegister = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) alert(error.message);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-12 pt-28 sm:pt-32">

      <div className="w-full max-w-md">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl hover:border-white/20 transition">

          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Create your account
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm mb-6">
            Start your cybersecurity journey today
          </p>

          {/* Name */}
          <input
            placeholder="Full Name"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-white/10 rounded-lg focus:border-blue-600 focus:outline-none transition text-sm sm:text-base mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Phone */}
          <input
            placeholder="Phone Number"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-white/10 rounded-lg focus:border-blue-600 focus:outline-none transition text-sm sm:text-base mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Email */}
          <input
            placeholder="Email"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-white/10 rounded-lg focus:border-blue-600 focus:outline-none transition text-sm sm:text-base mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              placeholder="Password"
              type={show ? "text" : "password"}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-white/10 rounded-lg focus:border-blue-600 focus:outline-none transition pr-10 text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 transition"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Message */}
          {msg && (
            <p className="text-green-400 text-xs sm:text-sm text-center mb-4 p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
              {msg}
            </p>
          )}

          {/* Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg mt-6 font-semibold transition shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Creating..." : "Sign up"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="px-2 sm:px-3 text-xs sm:text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google */}
          <button
            onClick={googleRegister}
            className="w-full py-2 sm:py-3 rounded-lg border border-white/20 hover:bg-white/5 transition text-sm sm:text-base"
          >
            Sign up with Google
          </button>

          {/* Login */}
          <p className="text-center text-xs sm:text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Sign in →
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}
