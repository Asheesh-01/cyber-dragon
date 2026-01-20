"use client";

import { useState, Suspense, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

// SECURE: Only allow internal redirects
const ALLOWED_REDIRECT_PATHS = ["/", "/courses", "/notes", "/roadmap", "/about"];

// SECURE: Rate limiting to prevent brute force
class RateLimiter {
  private attempts: Record<string, number[]> = {};
  private MAX_ATTEMPTS = 5;
  private WINDOW_MS = 60 * 1000; // 1 minute

  isAllowed(key: string): boolean {
    const now = Date.now();
    if (!this.attempts[key]) {
      this.attempts[key] = [];
    }
    this.attempts[key] = this.attempts[key].filter(
      (time) => now - time < this.WINDOW_MS
    );
    if (this.attempts[key].length >= this.MAX_ATTEMPTS) {
      return false;
    }
    this.attempts[key].push(now);
    return true;
  }
}

const rateLimiter = new RateLimiter();

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) && email.length <= 255;
  };

  // SECURE: EMAIL LOGIN with validation and rate limiting
  const handleLogin = async () => {
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid credentials");
      return;
    }

    if (!password) {
      setError("Invalid credentials");
      return;
    }

    if (!rateLimiter.isAllowed(`login_${email}`)) {
      setError("Too many login attempts. Please try again later.");
      return;
    }

    setLoading(true);

    const { data, error:authError } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    setLoading(false);

    if (authError) {
      setError("Invalid credentials");
      return;
    }

    if (!data.user?.email_confirmed_at) {
      setError("Please verify your email before login. Check your inbox.");
      await supabase.auth.signOut();
      return;
    }

    // SECURE: Validate redirect target against whitelist
    let safeRedirect = "/";
    if (redirect && ALLOWED_REDIRECT_PATHS.includes(redirect)) {
      safeRedirect = redirect;
    }

    router.push(safeRedirect);
  };

  // SECURE: GOOGLE LOGIN without user-controlled redirect
  const googleLogin = async () => {
    if (!rateLimiter.isAllowed("google_login")) {
      setError("Too many attempts. Please try again later.");
      return;
    }

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (oauthError) setError("Google login failed. Please try again.");
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

        {/* SECURE: Error display */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="text-xs sm:text-sm text-gray-400 block mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-white/10 focus:border-blue-600 focus:outline-none transition text-sm sm:text-base"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            maxLength={255}
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
            disabled={loading}
            maxLength={128}
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-10 text-gray-400 hover:text-gray-300 transition disabled:opacity-50"
            disabled={loading}
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
          disabled={loading}
          className="w-full py-2 sm:py-3 rounded-lg border border-white/20 hover:bg-white/5 transition text-sm sm:text-base disabled:opacity-50"
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
