"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function VerifyOTP() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const verify = async () => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/reset-password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 sm:px-6 py-12 pt-28 sm:pt-32">
      <div className="bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-2xl w-full max-w-md border border-white/10 shadow-xl hover:border-white/20 transition">

        <h1 className="text-2xl sm:text-3xl font-bold text-center">The Cyber Dragon</h1>
        <p className="text-gray-400 text-center text-xs sm:text-sm mb-6 mt-2">
          Enter OTP sent to your email
        </p>

        <div className="mb-3">
          <label className="text-xs sm:text-sm text-gray-400 block mb-2">Email</label>
          <input
            className="w-full bg-black border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:border-blue-600 focus:outline-none transition text-sm sm:text-base"
            placeholder="your@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-xs sm:text-sm text-gray-400 block mb-2">OTP</label>
          <input
            className="w-full bg-black border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:border-blue-600 focus:outline-none transition text-sm sm:text-base"
            placeholder="000000"
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg font-semibold transition shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] text-sm sm:text-base"
          onClick={verify}
        >
          Verify OTP
        </button>

        <button
          onClick={() => router.push("/login")}
          className="w-full mt-3 text-gray-400 hover:text-blue-400 transition text-xs sm:text-sm"
        >
          Return to login
        </button>
      </div>
    </div>
  );
}
