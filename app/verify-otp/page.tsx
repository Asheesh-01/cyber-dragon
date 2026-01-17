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
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl w-[380px] border border-white/10">

        <h1 className="text-2xl font-bold text-center">The Cyber Dragon</h1>
        <p className="text-gray-400 text-center mb-6">
          Enter OTP sent to your email
        </p>

        <input
          className="w-full bg-black border border-gray-600 rounded px-3 py-2 mb-3 outline-none"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full bg-black border border-gray-600 rounded px-3 py-2 mb-4 outline-none"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gray-200 transition"
          onClick={verify}
        >
          Verify OTP
        </button>

        <button
          onClick={() => router.push("/login")}
          className="w-full mt-3 text-gray-400 hover:text-white"
        >
          Return to login
        </button>
      </div>
    </div>
  );
}
