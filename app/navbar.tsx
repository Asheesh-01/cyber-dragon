"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(undefined);
  const [role, setRole] = useState<string>("user");
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setRole(data.user?.user_metadata?.role || "user");
    });
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const linkClass = (path: string) =>
    pathname === path
      ? "font-bold text-white"
      : "text-gray-400 hover:text-white transition";

  return (
    <header className="fixed top-0 left-0 w-full  z-50 p-5 flex justify-between items-center bg-black/80 backdrop-blur-md">


      <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
  The Cyber Dragon
</Link>

      <nav className="hidden md:flex gap-6 items-center">
        <Link href="/" className={linkClass("/")}>Home</Link>
        <Link href="/roadmap" className={linkClass("/roadmap")}>Roadmap</Link>
        <Link href="/notes" className={linkClass("/notes")}>Notes</Link>
        <Link href="/courses" className={linkClass("/courses")}>Courses</Link>
        <Link href="/about" className={linkClass("/about")}>About</Link>
        <Link href="/contact" className={linkClass("/contact")}>Contact</Link>

        {!user ? (
          <Link
            href="/login"
            className="border px-3 py-1 rounded hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
        ) : (
          <button onClick={() => setOpen(!open)} className="text-white text-xl">
            ☰
          </button>
        )}
      </nav>

      {user && (
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-xl"
        >
          ☰
        </button>
      )}

      {open && (
        <div
          ref={menuRef}
          className="absolute top-16 right-6 bg-black border border-gray-800 rounded-lg w-48 shadow-lg overflow-hidden"
        >
          <Link className="block px-4 py-2 hover:bg-gray-800" href="/">Home</Link>
          <Link className="block px-4 py-2 hover:bg-gray-800" href="/roadmap">Roadmap</Link>
          <Link className="block px-4 py-2 hover:bg-gray-800" href="/notes">Notes</Link>
          <Link className="block px-4 py-2 hover:bg-gray-800" href="/courses">Courses</Link>
          <Link className="block px-4 py-2 hover:bg-gray-800" href="/about">About</Link>
          <Link className="block px-4 py-2 hover:bg-gray-800" href="/contact">Contact</Link>

          {role === "admin" && (
            <Link className="block px-4 py-2 text-red-400 hover:bg-gray-800" href="/admin">
              Admin
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-600 text-red-400 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
