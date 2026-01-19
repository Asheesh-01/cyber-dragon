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

  // Get current user on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setRole(data.user?.user_metadata?.role || "user");
    });
  }, []);

  // Close dropdown when clicking outside
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
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo - Left Side */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold hover:text-gray-300 transition flex-shrink-0"
        >
          The Cyber Dragon
        </Link>

        {/* Desktop Horizontal Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/roadmap" className={linkClass("/roadmap")}>Roadmap</Link>
          <Link href="/notes" className={linkClass("/notes")}>Notes</Link>
          <Link href="/courses" className={linkClass("/courses")}>Courses</Link>
          <Link href="/about" className={linkClass("/about")}>About</Link>
          <Link href="/contact" className={linkClass("/contact")}>Contact</Link>

          {/* Auth Button (Login / Logout) - Desktop */}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-[0_0_15px_rgba(239,68,68,0.4)] font-medium"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-[0_0_15px_rgba(37,99,235,0.4)] font-medium"
            >
              Login
            </Link>
          )}

          {/* Admin Link - Desktop */}
          {role === "admin" && (
            <Link href="/admin" className="text-red-400 hover:text-red-300 font-bold">
              Admin
            </Link>
          )}
        </nav>

        {/* Hamburger Button - Always visible */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white text-2xl flex items-center justify-center w-10 h-10 hover:bg-white/10 rounded transition flex-shrink-0"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Dropdown Menu - Opens on both mobile & desktop when hamburger clicked */}
      {open && (
        <div
          ref={menuRef}
          className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
        >
          <div className="px-4 sm:px-6 py-4">
            <div className="flex flex-col gap-0">
              <Link
                href="/"
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded transition"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/roadmap"
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded transition"
                onClick={() => setOpen(false)}
              >
                Roadmap
              </Link>
              <Link
                href="/notes"
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded transition"
                onClick={() => setOpen(false)}
              >
                Notes
              </Link>
              <Link
                href="/courses"
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded transition"
                onClick={() => setOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="/about"
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded transition"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded transition"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>

              {role === "admin" && (
                <Link
                  href="/admin"
                  className="px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-600/10 rounded transition font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Admin Panel
                </Link>
              )}

              <div className="border-t border-white/10 mt-3 pt-3">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-600/10 rounded transition font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-3 text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded transition font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}