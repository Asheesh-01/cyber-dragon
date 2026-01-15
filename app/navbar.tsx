"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>("user");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setRole(data.user?.user_metadata?.role || "user");
    });
  }, []);

const handleLogout = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};


  return (
<header className="fixed top-0 left-0 w-full z-50 p-5 flex justify-between items-center bg-black/80 backdrop-blur-md ">
      <h1 className="text-3xl font-bold">The Cyber Dragon</h1>

      <nav className="flex gap-6 items-center">

        <Link
          href="/"
          className={pathname === "/" ? "font-bold text-white" : "text-gray-400 hover:text-white"}
        >
          Home
        </Link>

        <Link
          href="/roadmap"
          className={pathname === "/roadmap" ? "font-bold text-white" : "text-gray-400 hover:text-white"}
        >
          Roadmap
        </Link>

        <Link
          href="/notes"
          className={pathname === "/notes" ? "font-bold text-white" : "text-gray-400 hover:text-white"}
        >
          Notes
        </Link>

        <Link
          href="/courses"
          className={pathname === "/courses" ? "font-bold text-white" : "text-gray-400 hover:text-white"}
        >
          Courses
        </Link>

        <Link
          href="/contact"
          className={pathname === "/contact" ? "font-bold text-white" : "text-gray-400 hover:text-white"}
        >
          Contact
        </Link>

        {/* ADMIN LINK */}
        {role === "admin" && (
          <Link
            href="/admin"
            className="text-red-400 hover:text-red-300 font-semibold"
          >
            Admin
          </Link>
        )}

        {/* AUTH BUTTON */}
        {user ? (
     <button
  onClick={handleLogout}
  className="px-4 py-1 border border-white rounded hover:bg-white hover:text-black transition"
>
  Logout
</button>

        ) : (
          <Link
            href="/login"
            className="border px-3 py-1 rounded hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
