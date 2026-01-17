"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const exchangeSession = async () => {
      const code = searchParams.get("code");

      if (!code) {
        setLoading(false);
        return;
      }

      await supabase.auth.exchangeCodeForSession(code);
      setLoading(false);
    };

    exchangeSession();
  }, [searchParams]);

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) alert(error.message);
    else {
      alert("Password updated successfully");
      await supabase.auth.signOut();
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[380px] bg-black/60 backdrop-blur-lg border border-gray-700 rounded-xl p-8 space-y-6">

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">The Cyber Dragon</h1>
          <p className="text-gray-400 text-sm">Create your new password</p>
        </div>

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 rounded bg-black border border-gray-700 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={updatePassword}
          className="w-full bg-white text-black py-2 rounded font-semibold"
        >
          Update Password
        </button>

      </div>
    </div>
  );
}
