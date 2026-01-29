"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/lib/theme-context";
import { Home, Map, BookOpen, FlaskConical, FileText, Trophy, LayoutDashboard, User, LogOut, Shield, Menu, X } from "lucide-react";

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
            className="relative text-black dark:text-white w-10 h-10 flex items-center justify-center hover:bg-blue-600/10 rounded-lg transition-all duration-200"
            aria-label="Menu"
          >
            {open ? (
              <X size={24} className="animate-in spin-in-180 duration-200" />
            ) : (
              <Menu size={24} className="animate-in fade-in duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        >
          <div
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-16 right-4 w-80 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black border border-black/10 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-top-2 duration-300"
          >
            {/* User Info Header */}
            {user && (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 bg-white/20">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                        {user.user_metadata?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {user.user_metadata?.name || "User"}
                    </p>
                    <p className="text-xs text-white/80 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Main Navigation */}
              <div className="space-y-1">
                <Link href="/" className="flex flex-row items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-600/8 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group">
                  <Home size={18} className="flex-shrink-0 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{t("home")}</span>
                </Link>
                <Link href="/roadmap" className="flex flex-row items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-600/8 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group">
                  <Map size={18} className="flex-shrink-0 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{t("roadmap")}</span>
                </Link>
                <Link href="/courses" className="flex flex-row items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-600/8 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group">
                  <BookOpen size={18} className="flex-shrink-0 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{t("courses")}</span>
                </Link>
                <Link href="/labs" className="flex flex-row items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-600/8 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group">
                  <FlaskConical size={18} className="flex-shrink-0 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{t("labs")}</span>
                </Link>
                <Link href="/notes" className="flex flex-row items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-600/8 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group">
                  <FileText size={18} className="flex-shrink-0 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Notes</span>
                </Link>
                <Link href="/challenges" className="flex flex-row items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-600/8 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group">
                  <Trophy size={18} className="flex-shrink-0 text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{t("challenges")}</span>
                </Link>
              </div>

              {user && (
                <>
                  <div className="border-t border-black/10 dark:border-white/20 my-3" />
                  
                  {/* User Actions */}
                  <div className="space-y-1">
                    <Link href="/dashboard" className="flex flex-row items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all duration-200 group">
                      <LayoutDashboard size={18} className="flex-shrink-0 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold">{t("dashboard")}</span>
                    </Link>
                    <Link href="/profile" className="flex flex-row items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all duration-200 group">
                      <User size={18} className="flex-shrink-0 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold">{t("profile")}</span>
                    </Link>
                  </div>
                </>
              )}

              {role === "admin" && (
                <>
                  <div className="border-t border-black/10 dark:border-white/20 my-3" />
                  <Link href="/admin" className="flex flex-row items-center gap-3 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-950/50 transition-all duration-200 group">
                    <Shield size={18} className="flex-shrink-0 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold">{t("admin_panel")}</span>
                  </Link>
                </>
              )}

              <div className="border-t border-black/10 dark:border-white/20 mt-3 pt-2">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="flex flex-row items-center gap-3 px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900 transition-all duration-200 group w-full text-left"
                  >
                    <LogOut size={18} className="flex-shrink-0 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold">{t("logout")}</span>
                  </button>
                ) : (
                  <Link href="/login" className="flex flex-row items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 group">
                    <User size={18} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold">{t("login")}</span>
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
