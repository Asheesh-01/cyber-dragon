"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/lib/theme-context";
import { Home, Map, BookOpen, FlaskConical, FileText, Trophy, LayoutDashboard, User, LogOut, Shield, Menu, X, Search } from "lucide-react";
import logo from "@/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, t } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>("user");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const committedPathRef = useRef<string | null>(null);
  const hoverLockedRef = useRef(false);
  const hoverNavRef = useRef(false);
  const hoverLeaveTimerRef = useRef<number | null>(null);

  // Search data - comprehensive content from all pages
  const allContent = [
    // Courses
    { title: "Networking Fundamentals", category: "Courses", path: "/courses", description: "Learn TCP/IP, routing, firewalls, and network security", keywords: ["networking", "tcp", "ip", "firewall", "beginner"] },
    { title: "Linux for Cybersecurity", category: "Courses", path: "/courses", description: "Master Linux commands, scripting, and system administration", keywords: ["linux", "cli", "scripting", "beginner"] },
    { title: "Web Security Basics", category: "Courses", path: "/courses", description: "OWASP Top 10, SQL injection, XSS, and CSRF attacks", keywords: ["web", "owasp", "sql", "xss", "csrf", "intermediate"] },
    { title: "Cryptography Foundations", category: "Courses", path: "/courses", description: "Encryption algorithms, hashing, and digital signatures", keywords: ["crypto", "encryption", "hashing", "intermediate"] },
    { title: "Ethical Hacking Introduction", category: "Courses", path: "/courses", description: "Penetration testing, reconnaissance, and scanning", keywords: ["hacking", "pentesting", "exploitation", "intermediate"] },
    { title: "Malware Analysis Basics", category: "Courses", path: "/courses", description: "Reverse engineering and dynamic analysis", keywords: ["malware", "reverse", "analysis", "advanced"] },
    { title: "Digital Forensics", category: "Courses", path: "/courses", description: "Evidence collection and cyber crime investigation", keywords: ["forensics", "evidence", "investigation", "advanced"] },
    { title: "SOC Analyst Basics", category: "Courses", path: "/courses", description: "SIEM tools and incident response", keywords: ["soc", "siem", "incident", "intermediate"] },
    
    // Roadmap
    { title: "Security Engineer Roadmap", category: "Roadmap", path: "/roadmap/security-engineer", description: "Complete path to becoming a Security Engineer", keywords: ["roadmap", "security", "engineer", "career"] },
    { title: "SOC Analyst Career Path", category: "Roadmap", path: "/roadmap", description: "Start your career in Security Operations", keywords: ["soc", "analyst", "career", "blue team"] },
    { title: "Penetration Tester Path", category: "Roadmap", path: "/roadmap", description: "Become an ethical hacker", keywords: ["pentester", "hacker", "red team"] },
    { title: "Cloud Security Path", category: "Roadmap", path: "/roadmap", description: "Master cloud security practices", keywords: ["cloud", "aws", "azure", "gcp"] },
    
    // Labs
    { title: "Linux Basics Lab", category: "Labs", path: "/labs", description: "Practice essential Linux commands", keywords: ["linux", "cli", "commands", "practice"] },
    { title: "Network Analysis Lab", category: "Labs", path: "/labs", description: "Analyze network traffic with Wireshark", keywords: ["network", "wireshark", "traffic", "analysis"] },
    { title: "Web Security Lab", category: "Labs", path: "/labs", description: "Exploit common web vulnerabilities", keywords: ["web", "sqli", "xss", "exploit"] },
    { title: "Blue Team Defense Lab", category: "Labs", path: "/labs", description: "Defend against simulated attacks", keywords: ["blue", "team", "defense", "siem"] },
    
    // Challenges
    { title: "CTF Challenges", category: "Challenges", path: "/challenges", description: "Capture The Flag challenges", keywords: ["ctf", "flag", "competition"] },
    { title: "Bug Bounty Practice", category: "Challenges", path: "/challenges", description: "Find vulnerabilities in practice environments", keywords: ["bug", "bounty", "vulnerability"] },
    
    // Notes
    { title: "Study Notes", category: "Notes", path: "/notes", description: "Comprehensive study materials and notes", keywords: ["notes", "study", "materials", "documentation"] },
    
    // Dashboard & Profile
    { title: "Dashboard", category: "Account", path: "/dashboard", description: "View your progress and statistics", keywords: ["dashboard", "progress", "stats"] },
    { title: "Profile Settings", category: "Account", path: "/profile", description: "Manage your profile and preferences", keywords: ["profile", "settings", "account"] },
  ];

  const filteredResults = searchQuery.trim()
    ? allContent.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.keywords.some((keyword) => keyword.includes(query))
        );
      }).slice(0, 8)
    : [];

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
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when modal opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setSelectedResultIndex(-1);
      }
      // Escape to close search
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setSearchQuery("");
        setSelectedResultIndex(-1);
      }
      // Arrow Down - move to next result
      if (e.key === 'ArrowDown' && searchOpen && filteredResults.length > 0) {
        e.preventDefault();
        setSelectedResultIndex((prev) => 
          prev < filteredResults.length - 1 ? prev + 1 : 0
        );
      }
      // Arrow Up - move to previous result
      if (e.key === 'ArrowUp' && searchOpen && filteredResults.length > 0) {
        e.preventDefault();
        setSelectedResultIndex((prev) => 
          prev > 0 ? prev - 1 : filteredResults.length - 1
        );
      }
      // Enter - navigate to selected result
      if (e.key === 'Enter' && searchOpen && selectedResultIndex >= 0) {
        e.preventDefault();
        const selected = filteredResults[selectedResultIndex];
        router.push(selected.path);
        setSearchOpen(false);
        setSearchQuery("");
        setSelectedResultIndex(-1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, filteredResults, selectedResultIndex]);

  useEffect(() => {
    if (hoverNavRef.current) {
      hoverNavRef.current = false;
      return;
    }
    committedPathRef.current = pathname;
  }, [pathname]);


  // ✅ LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const linkClass = (path: string) => {
    const activePath = committedPathRef.current ?? pathname;
    const isActive = activePath === path || activePath.startsWith(path + "/");
    const isHovered = hoveredPath === path;
    const shouldHighlight = hoveredPath ? isHovered : isActive;
    return shouldHighlight
      ? "font-semibold text-blue-400 px-3 py-1.5"   
      : "text-gray-300 hover:text-blue-400 hover:font-semibold transition px-3 py-1.5";
  };

  const handleNavHover = (path: string) => {
    if (hoverLeaveTimerRef.current) {
      window.clearTimeout(hoverLeaveTimerRef.current);
      hoverLeaveTimerRef.current = null;
    }
    setHoveredPath(path);
  };

  const handleNavLeave = () => {
    if (hoverLeaveTimerRef.current) {
      window.clearTimeout(hoverLeaveTimerRef.current);
    }
    hoverLeaveTimerRef.current = window.setTimeout(() => {
      setHoveredPath(null);
    }, 50);
  };

  const handleNavClick = (path: string) => {
    hoverLockedRef.current = true;
    committedPathRef.current = path;
    setHoveredPath(null);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-gray-900 backdrop-blur-xl border-b border-white/10 transition-colors duration-300"
      onMouseLeave={handleNavLeave}
    >
      <div className="flex items-center h-16 px-6">

        {/* LEFT LOGO */}
        <Link
          href="/"
          className="flex items-center gap   text-xl font-bold text-white hover:text-white transition"
        >
          <Image
            src={logo}
            alt="CyberDragon logo"
            width={32}
            height={32}
            className="h-15 w-12"
            priority
          />
          <span>CyberDragon</span>
        </Link>

        {/* CENTER NAV LINKS */}
        <div className="flex-1 flex justify-center">
          <div
            className="hidden md:flex gap-1"
            onMouseLeave={handleNavLeave}
            onMouseMove={(e) => {
              if (hoverLockedRef.current) return;
              const target = e.target as HTMLElement | null;
              if (!target) return;
              const linkEl = target.closest("a[data-navlink]");
              if (!linkEl) {
                handleNavLeave();
              }
            }}
          >
            <Link href="/" data-navlink className={linkClass("/")} onMouseEnter={() => handleNavHover("/")} onMouseLeave={handleNavLeave} onClick={() => handleNavClick("/")}>{t("home")}</Link>
            <Link href="/roadmap" data-navlink className={linkClass("/roadmap")} onMouseEnter={() => handleNavHover("/roadmap")} onMouseLeave={handleNavLeave} onClick={() => handleNavClick("/roadmap")}>{t("roadmap")}</Link>
            <Link href="/courses" data-navlink className={linkClass("/courses")} onMouseEnter={() => handleNavHover("/courses")} onMouseLeave={handleNavLeave} onClick={() => handleNavClick("/courses")}>{t("courses")}</Link>
            <Link href="/labs" data-navlink className={linkClass("/labs")} onMouseEnter={() => handleNavHover("/labs")} onMouseLeave={handleNavLeave} onClick={() => handleNavClick("/labs")}>{t("labs")}</Link>
            <Link href="/notes" data-navlink className={linkClass("/notes")} onMouseEnter={() => handleNavHover("/notes")} onMouseLeave={handleNavLeave} onClick={() => handleNavClick("/notes")}>Notes</Link>
            <Link href="/challenges" data-navlink className={linkClass("/challenges")} onMouseEnter={() => handleNavHover("/challenges")} onMouseLeave={handleNavLeave} onClick={() => handleNavClick("/challenges")}>{t("challenges")}</Link>
            {user && <Link href="/dashboard" data-navlink className={linkClass("/dashboard")} onMouseEnter={() => handleNavHover("/dashboard")} onMouseLeave={handleNavLeave} onClick={() => handleNavClick("/dashboard")}>{t("dashboard")}</Link>}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">

          {/* SEARCH ICON */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
            title="Search (Ctrl+K)"
          >
            <Search size={18} />
            <span className="hidden lg:inline text-sm">Search</span>
          </button>

          {/* LOGIN / LOGOUT & PROFILE */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-400/60 bg-blue-600/20 hover:bg-blue-600/40 shadow-md shadow-blue-500/10 transition flex items-center justify-center"
                title={t("profile")}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold text-blue-300">
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
            className="relative w-10 h-10 flex items-center justify-center text-white hover:bg-blue-600/10 rounded-lg transition-all duration-200"
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
            className="absolute top-16 right-4 w-80 bg-gradient-to-b from-gray-900/98 to-gray-950/98 backdrop-blur-xl border border-blue-500/20 shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-top-2 duration-300"
          >
            {/* User Info Header */}
            {user && (
              <div className="bg-gradient-to-r from-blue-950/40 to-cyan-950/40 backdrop-blur-xl border-b border-blue-500/20 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400/60 bg-blue-600/20 shadow-lg shadow-blue-500/10">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg font-bold text-blue-300">
                        {user.user_metadata?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate text-white">
                      {user.user_metadata?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col p-3 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Main Navigation */}
              <div className="space-y-1 pb-2">
                <Link href="/" className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-blue-500/10 hover:text-blue-200 hover:border-l-2 hover:border-blue-400 transition-all duration-200 group">
                  <Home size={18} className="flex-shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{t("home")}</span>
                </Link>
                <Link href="/roadmap" className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-blue-500/10 hover:text-blue-200 hover:border-l-2 hover:border-blue-400 transition-all duration-200 group">
                  <Map size={18} className="flex-shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{t("roadmap")}</span>
                </Link>
                <Link href="/courses" className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-blue-500/10 hover:text-blue-200 hover:border-l-2 hover:border-blue-400 transition-all duration-200 group">
                  <BookOpen size={18} className="flex-shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{t("courses")}</span>
                </Link>
                <Link href="/labs" className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-blue-500/10 hover:text-blue-200 hover:border-l-2 hover:border-blue-400 transition-all duration-200 group">
                  <FlaskConical size={18} className="flex-shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{t("labs")}</span>
                </Link>
                <Link href="/notes" className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-blue-500/10 hover:text-blue-200 hover:border-l-2 hover:border-blue-400 transition-all duration-200 group">
                  <FileText size={18} className="flex-shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Notes</span>
                </Link>
                <Link href="/challenges" className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-blue-500/10 hover:text-blue-200 hover:border-l-2 hover:border-blue-400 transition-all duration-200 group">
                  <Trophy size={18} className="flex-shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{t("challenges")}</span>
                </Link>
              </div>

              {user && (
                <>
                  <div className="border-t border-blue-500/20 my-3" />
                  
                  {/* User Actions */}
                  <div className="space-y-2">
                    <Link href="/dashboard" className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/10 text-blue-200 hover:from-blue-600/30 hover:to-cyan-600/20 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-200 group">
                      <LayoutDashboard size={18} className="flex-shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold">{t("dashboard")}</span>
                    </Link>
                    <Link href="/profile" className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/10 text-blue-200 hover:from-blue-600/30 hover:to-cyan-600/20 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-200 group">
                      <User size={18} className="flex-shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold">{t("profile")}</span>
                    </Link>
                  </div>
                </>
              )}

              {role === "admin" && (
                <>
                  <div className="border-t border-blue-500/20 my-3" />
                  <Link href="/admin" className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600/20 to-orange-600/10 text-red-200 hover:from-red-600/30 hover:to-orange-600/20 border border-red-500/20 hover:border-red-400/40 transition-all duration-200 group">
                    <Shield size={18} className="flex-shrink-0 text-red-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold">{t("admin_panel")}</span>
                  </Link>
                </>
              )}

              <div className="border-t border-blue-500/20 mt-3 pt-3">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600/20 to-orange-600/10 hover:from-red-600/30 hover:to-orange-600/20 text-red-300 border border-red-500/20 hover:border-red-400/40 transition-all duration-200 group w-full text-left"
                  >
                    <LogOut size={18} className="flex-shrink-0 text-red-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold">{t("logout")}</span>
                  </button>
                ) : (
                  <Link href="/login" className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border border-blue-400/50 transition-all duration-200 group w-full justify-center font-semibold">
                    <User size={18} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{t("login")}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 flex items-start justify-center pt-20 px-4"
          onClick={() => {
            setSearchOpen(false);
            setSearchQuery("");
          }}
        >
          <div
            ref={searchRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black border border-white/20 shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, labs, challenges, notes..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  <X size={18} />
                </button>
              )}
              <kbd className="hidden sm:inline px-2 py-1 text-xs bg-white/10 rounded border border-white/20 text-gray-400">ESC</kbd>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {searchQuery.trim() === "" ? (
                <div className="p-8 text-center text-gray-400">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                  <p className="text-sm">Start typing to search across courses, labs, challenges, and more...</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <span className="px-2 py-1 bg-white/5 rounded text-xs">Try: "networking"</span>
                    <span className="px-2 py-1 bg-white/5 rounded text-xs">Try: "web security"</span>
                    <span className="px-2 py-1 bg-white/5 rounded text-xs">Try: "beginner"</span>
                  </div>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <p className="text-sm">No results found for "{searchQuery}"</p>
                  <p className="text-xs mt-2">Try different keywords or browse our pages directly</p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredResults.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        router.push(item.path);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="w-full flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-blue-500/10 transition-all duration-200 text-left group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/30 transition">
                        {item.category === "Courses" && <BookOpen size={18} />}
                        {item.category === "Labs" && <FlaskConical size={18} />}
                        {item.category === "Challenges" && <Trophy size={18} />}
                        {item.category === "Notes" && <FileText size={18} />}
                        {item.category === "Roadmap" && <Map size={18} />}
                        {item.category === "Account" && <User size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-medium text-sm group-hover:text-blue-400 transition truncate">
                            {item.title}
                          </h3>
                          <span className="flex-shrink-0 px-2 py-0.5 bg-blue-600/20 text-blue-400 text-xs rounded">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs mt-1 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Hint */}
            <div className="px-4 py-3 border-t border-white/10 bg-white/5">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Navigate with arrow keys</span>
                <span>Press ESC to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
