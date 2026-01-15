"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const update = async () => {
    await supabase.auth.updateUser({ password });
    alert("Password updated");
  };

  return (
    <div className="center-card">
      <input className="input" type="password" placeholder="New Password" onChange={e=>setPassword(e.target.value)} />
      <button className="btn" onClick={update}>Update Password</button>
    </div>
  );
}
