"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const reset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) setMsg(error.message);
    else setMsg("Reset email sent. Check your inbox.");
  };

  return (
    <div className="center-card">
      <h2>Reset Password</h2>
      <input className="input" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <button className="btn" onClick={reset}>Send Reset Link</button>
      <p>{msg}</p>
    </div>
  );
}
