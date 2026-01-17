"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const sendReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.cyberdragons.in/reset-password",
    });

    if (error) alert(error.message);
    else setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[380px] bg-black/60 backdrop-blur-lg border border-gray-700 rounded-xl p-8 space-y-6">

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">The Cyber Dragon</h1>
          <p className="text-gray-400 text-sm">
            Reset your account password
          </p>
        </div>

        {sent ? (
          <>
            <p className="text-green-400 text-center text-sm">
              Reset link sent to your email.
            </p>

            <Link
              href="/login"
              className="block text-center border py-2 rounded hover:bg-white hover:text-black transition"
            >
              Return to Login
            </Link>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-black border border-gray-700 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendReset}
              className="w-full bg-white text-black py-2 rounded font-semibold hover:opacity-90"
            >
              Continue
            </button>

            <Link
              href="/login"
              className="block text-center text-gray-400 text-sm hover:text-white"
            >
              Return to Login
            </Link>
          </>
        )}

      </div>
    </div>
  );
}
