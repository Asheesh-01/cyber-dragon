"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

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

    router.push(redirect || "/");
  };

  // GOOGLE LOGIN
  const googleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${redirect || "/"}`,
      },
    });

    if (error) alert(error.message);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-12 pt-28 sm:pt-32">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl hover:border-white/20 transition">

        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">The Cyber Dragon</h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            Sign in to continue learning
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-xs sm:text-sm text-gray-400 block mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-white/10 focus:border-blue-600 focus:outline-none transition text-sm sm:text-base"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-2 relative">
          <label className="text-xs sm:text-sm text-gray-400 block mb-2">Password</label>
          <input
            type={show ? "text" : "password"}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-white/10 focus:border-blue-600 focus:outline-none transition pr-10 text-sm sm:text-base"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-10 text-gray-400 hover:text-gray-300 transition"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Forgot */}
        <Link
          href="/forgot-password"
          className="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition"
        >
          Forgot password?
        </Link>

        {/* Sign in */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 sm:py-3 mt-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] disabled:opacity-50 text-sm sm:text-base"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="px-2 sm:px-3 text-xs sm:text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Google button */}
        <button
          onClick={googleLogin}
          className="w-full py-2 sm:py-3 rounded-lg border border-white/20 hover:bg-white/5 transition text-sm sm:text-base"
        >
          Sign in with Google
        </button>

        {/* Create */}
        <p className="text-center text-xs sm:text-sm text-gray-400 mt-6">
          New here?{" "}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition">
            Create Account →
          </Link>
        </p>

      </div>

    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
