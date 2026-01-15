"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // EMAIL LOGIN
  const handleLogin = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (!data.user?.email_confirmed_at) {
      alert("Please verify your email before login.");
      await supabase.auth.signOut();
      return;
    }

    window.location.href = "/";
  };

  // GOOGLE LOGIN
  const googleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) alert(error.message);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-xl">

        {/* Brand */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">The Cyber Dragon</h1>
          <p className="text-gray-400 text-sm mt-1">
            Sign in to continue learning
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-3 rounded bg-black border border-white/10 focus:border-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-2 relative">
          <label className="text-sm text-gray-400">Password</label>
          <input
            type={show ? "text" : "password"}
            className="w-full mt-1 p-3 rounded bg-black border border-white/10 focus:border-white outline-none pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-9 text-gray-400"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Forgot */}
        <div className="text-sm text-gray-400 text-right mt-2">
          <a href="/forgot-password" className="hover:text-white hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Sign in */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 mt-4 rounded-lg bg-white text-black font-semibold hover:opacity-90 transition"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Google button */}
        <button
          onClick={googleLogin}
          className="w-full py-3 rounded-lg border border-white/20 hover:bg-white/10 transition"
        >
          Sign in with Google
        </button>

        {/* Create */}
        <p className="text-center text-sm text-gray-400 mt-6">
          New here?{" "}
          <a href="/register" className="text-white hover:underline">
            Create Account →
          </a>
        </p>

      </div>

    </main>
  );
}
