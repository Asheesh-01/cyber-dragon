"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff } from "lucide-react";

// SECURE: Validation helpers
const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 255;
};

const validatePassword = (password: string): string | null => {
  if (password.length < 12) return "Password must be at least 12 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  if (!/[!@#$%^&*]/.test(password)) return "Password must contain special character (!@#$%^&*)";
  return null;
};

const validateName = (name: string): boolean => {
  return /^[a-zA-Z\s\-']{2,100}$/.test(name.trim());
};

const validatePhone = (phone: string): boolean => {
  return /^[\d\s+\-()]{10,20}$/.test(phone.trim());
};

const sanitizeInput = (input: string): string => {
  return input.trim().substring(0, 100);
};

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // SECURE: EMAIL REGISTER with validation
  const handleRegister = async () => {
    const newErrors: Record<string, string> = {};

    // Validate all inputs
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(name)) {
      newErrors.name = "Name can only contain letters, spaces, hyphens, and apostrophes";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setMsg("");
    setErrors({});

    const { error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
      options: {
        data: {
          name: sanitizeInput(name),
          phone: sanitizeInput(phone),
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setLoading(false);

    if (error) {
      if (error.message.includes("already registered")) {
        setMsg("This email is already registered. Please login instead.");
      } else {
        setMsg("Registration failed. Please try again.");
      }
    } else {
      setMsg("Verification email sent. Please check your inbox.");
    }
  };

  // SECURE: GOOGLE REGISTER
  const googleRegister = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) setMsg("Google registration failed. Please try again.");
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
          <div className="mb-3">
            <input
              placeholder="Full Name"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-white/10 rounded-lg focus:border-blue-600 focus:outline-none transition text-sm sm:text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <input
              placeholder="Phone Number"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-white/10 rounded-lg focus:border-blue-600 focus:outline-none transition text-sm sm:text-base"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={20}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              placeholder="Email"
              type="email"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-white/10 rounded-lg focus:border-blue-600 focus:outline-none transition text-sm sm:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <input
              placeholder="Password (min 12 chars, uppercase, number, special char)"
              type={show ? "text" : "password"}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-white/10 rounded-lg focus:border-blue-600 focus:outline-none transition pr-10 text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={128}
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 transition"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Message */}
          {msg && (
            <p className={`text-xs sm:text-sm text-center mb-4 p-2 rounded-lg border ${
              msg.includes("failed") || msg.includes("already") 
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-green-500/10 border-green-500/30 text-green-400"
            }`}>
              {msg}
            </p>
          )}

          {/* Button */}
          <button
            onClick={handleRegister}
            disabled={loading || !name || !email || !phone || !password}
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
