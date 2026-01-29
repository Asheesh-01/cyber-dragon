"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/lib/theme-context";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, t } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>("user");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const loadProfileImage = () => {
      const savedImage = localStorage.getItem("profileImage");
      setProfileImage(savedImage || null);
    };

    loadProfileImage();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "profileImage") {
        setProfileImage(e.newValue || null);
      }
    };

    const handleProfileImageUpdate = () => {
      loadProfileImage();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("profile-image-updated", handleProfileImageUpdate);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("profile-image-updated", handleProfileImageUpdate);
    };
  }, []);

  // ✅ CLICK OUTSIDE CLOSE
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setShowThemeMenu(false);
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
    pathname === path || pathname.startsWith(path + "/")
      ? "font-bold text-black dark:text-white bg-blue-600/20 px-3 py-1 rounded-lg border-b-2 border-blue-600"
      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition px-3 py-1";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-black/10 dark:border-white/10 transition-colors duration-300">
      <div className="flex items-center justify-between h-16 px-6">

        {/* LEFT LOGO */}
        <Link href="/" className="text-xl font-bold text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition">
          🐉 CyberDragon
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">

          {/* NAV LINKS */}
          <div className="hidden md:flex gap-5">
            <Link href="/" className={linkClass("/")}>{t("home")}</Link>
            <Link href="/roadmap" className={linkClass("/roadmap")}>{t("roadmap")}</Link>
            <Link href="/courses" className={linkClass("/courses")}>{t("courses")}</Link>
            <Link href="/labs" className={linkClass("/labs")}>{t("labs")}</Link>
            <Link href="/notes" className={linkClass("/notes")}>Notes</Link>
            <Link href="/challenges" className={linkClass("/challenges")}>{t("challenges")}</Link>
            {user && <Link href="/dashboard" className={linkClass("/dashboard")}>{t("dashboard")}</Link>}
          </div>

          {/* LOGIN / LOGOUT & PROFILE */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="w-9 h-9 rounded-full overflow-hidden border border-blue-600/50 bg-blue-600/20 dark:bg-blue-600/20 hover:bg-blue-600/30 dark:hover:bg-blue-600/30 transition flex items-center justify-center"
                title={t("profile")}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    {user.user_metadata?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-sm font-medium text-white"
            >
              {t("login")}
            </Link>
          )}

          {role === "admin" && (
            <Link
              href="/admin"
              className="text-red-600 dark:text-red-400 font-semibold hover:text-red-700 dark:hover:text-red-300 transition"
            >
              {t("admin_panel")}
            </Link>
          )}

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-black dark:text-white text-xl w-9 h-9 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 rounded transition"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        >
          <div
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-16 right-4 w-64 bg-white dark:bg-black/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl rounded-xl z-50"
          >
            <div className="flex flex-col p-3">
              <Link href="/" className="menuItem">{t("home")}</Link>
              <Link href="/roadmap" className="menuItem">{t("roadmap")}</Link>
              <Link href="/courses" className="menuItem">{t("courses")}</Link>
              <Link href="/labs" className="menuItem">{t("labs")}</Link>
              <Link href="/notes" className="menuItem">Notes</Link>
              <Link href="/challenges" className="menuItem">{t("challenges")}</Link>
              <Link href="/about" className="menuItem">{t("about")}</Link>

              {user && (
                <>
                  <div className="border-t border-black/10 dark:border-white/10 my-2" />
                  <Link href="/dashboard" className="menuItem text-blue-700 dark:text-blue-300">{t("dashboard")}</Link>
                  <Link href="/profile" className="menuItem text-blue-700 dark:text-blue-300">{t("profile")}</Link>
                </>
              )}

              {role === "admin" && (
                <Link href="/admin" className="menuItem text-red-600 dark:text-red-400">
                  {t("admin_panel")}
                </Link>
              )}

              <div className="border-t border-black/10 dark:border-white/10 mt-2 pt-2">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="menuItem bg-red-600 text-white hover:bg-red-700 text-left w-full"
                  >
                    {t("logout")}
                  </button>
                ) : (
                  <Link href="/login" className="menuItem bg-blue-600 text-white hover:bg-blue-700">
                    {t("login")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .menuItem {
          padding: 10px 14px;
          color: #333;
          border-radius: 6px;
          transition: all 0.2s ease;
          display: block;
        }
        .menuItem:hover {
          color: black;
          background: rgba(0,0,0,0.08);
        }
        
        @media (prefers-color-scheme: dark) {
          .menuItem {
            color: #ccc;
          }
          .menuItem:hover {
            color: white;
            background: rgba(255,255,255,0.08);
          }
        }
      `}</style>
    </header>
  );
}
