"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>("user");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // ✅ AUTH STATE SYNC (FIXED)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setRole(session?.user?.user_metadata?.role || "user");
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setRole(session?.user?.user_metadata?.role || "user");
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ CLICK OUTSIDE CLOSE
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const linkClass = (path: string) =>
    pathname === path
      ? "font-bold text-white"
      : "text-gray-400 hover:text-white transition";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between h-16 px-6">

        {/* LEFT LOGO */}
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          The Cyber Dragon
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">

          {/* NAV LINKS */}
          <div className="hidden md:flex gap-5">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/roadmap" className={linkClass("/roadmap")}>Roadmap</Link>
            <Link href="/notes" className={linkClass("/notes")}>Notes</Link>
            <Link href="/courses" className={linkClass("/courses")}>Courses</Link>
            <Link href="/about" className={linkClass("/about")}>About</Link>
            <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
          </div>

          {/* LOGIN / LOGOUT */}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-sm"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-sm"
            >
              Login
            </Link>
          )}

          {role === "admin" && (
            <Link
              href="/admin"
              className="text-red-400 font-semibold hover:text-red-300"
            >
              Admin
            </Link>
          )}

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="text-white text-xl w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded transition"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div
          ref={menuRef}
          className="absolute top-full right-4 w-64 bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl"
        >
          <div className="flex flex-col p-3">
            <Link href="/" className="menuItem">Home</Link>
            <Link href="/roadmap" className="menuItem">Roadmap</Link>
            <Link href="/notes" className="menuItem">Notes</Link>
            <Link href="/courses" className="menuItem">Courses</Link>
            <Link href="/about" className="menuItem">About</Link>
            <Link href="/contact" className="menuItem">Contact</Link>

            {role === "admin" && (
              <Link href="/admin" className="menuItem text-red-400">
                Admin Panel
              </Link>
            )}

            <div className="border-t border-white/10 mt-2 pt-2">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="menuItem text-red-400 text-left w-full"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" className="menuItem text-blue-400">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .menuItem {
          padding: 10px 14px;
          color: #ccc;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .menuItem:hover {
          color: white;
          background: rgba(255,255,255,0.08);
        }
      `}</style>
    </header>
  );
}
