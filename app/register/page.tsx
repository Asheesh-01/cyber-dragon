"use client";

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
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold mb-1">
            Create your learning account
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            Start your cybersecurity journey today
          </p>

          {/* Name */}
          <input
            placeholder="Full Name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Phone */}
          <input
            placeholder="Phone Number"
            className="input mt-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Email */}
          <input
            placeholder="Email"
            className="input mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div className="relative mt-3">
            <input
              placeholder="Password"
              type={show ? "text" : "password"}
              className="input pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Message */}
          {msg && (
            <p className="text-green-400 text-sm text-center mt-4">
              {msg}
            </p>
          )}

          {/* Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg mt-6 font-semibold hover:opacity-90"
          >
            {loading ? "Creating..." : "Sign up"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google */}
          <button
            onClick={googleRegister}
            className="w-full py-3 rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            Sign up with Google
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-white hover:underline">
              Sign in →
            </a>
          </p>

        </div>
      </div>
    </main>
  );
}
