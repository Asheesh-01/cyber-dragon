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
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 flex justify-between items-center bg-black/90 backdrop-blur-xl border-b border-white/10">
      
      <Link href="/" className="text-xl sm:text-2xl font-bold hover:text-gray-300 transition">
        The Cyber Dragon
      </Link>

      {/* Desktop Navigation */}
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            Login
          </Link>
        ) : null}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white text-2xl flex items-center justify-center w-8 h-8"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden"
        >
          <div className="flex flex-col">
            <Link 
              className="px-4 sm:px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition border-b border-white/5" 
              href="/"
            >
              Home
            </Link>
            <Link 
              className="px-4 sm:px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition border-b border-white/5" 
              href="/roadmap"
            >
              Roadmap
            </Link>
            <Link 
              className="px-4 sm:px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition border-b border-white/5" 
              href="/notes"
            >
              Notes
            </Link>
            <Link 
              className="px-4 sm:px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition border-b border-white/5" 
              href="/courses"
            >
              Courses
            </Link>
            <Link 
              className="px-4 sm:px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition border-b border-white/5" 
              href="/about"
            >
              About
            </Link>
            <Link 
              className="px-4 sm:px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition border-b border-white/5" 
              href="/contact"
            >
              Contact
            </Link>

            {role === "admin" && (
              <Link 
                className="px-4 sm:px-6 py-3 text-red-400 hover:text-red-300 hover:bg-white/5 transition border-b border-white/5" 
                href="/admin"
              >
                Admin Panel
              </Link>
            )}

            {!user ? (
              <Link 
                href="/login"
                className="px-4 sm:px-6 py-3 text-blue-400 hover:text-blue-300 hover:bg-white/5 transition font-semibold border-b border-white/5"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 sm:px-6 py-3 text-red-400 hover:text-red-300 hover:bg-red-600/10 transition font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
