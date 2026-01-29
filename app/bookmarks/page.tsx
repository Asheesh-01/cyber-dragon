"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Heart, Filter, Clock, BarChart3 } from "lucide-react";
import { Card, Badge, Button, EmptyState, LoadingSpinner } from "@/components/UI";
import Link from "next/link";

interface BookmarkedItem {
  id: string;
  type: "lab" | "challenge" | "course";
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number;
  bookmarkedAt: string;
  icon: string;
  slug: string;
}

export default function BookmarksPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<BookmarkedItem[]>([]);
  const [filter, setFilter] = useState<"all" | "lab" | "challenge" | "course">("all");

  // Mock bookmarked items
  const mockBookmarks: BookmarkedItem[] = [
    {
      id: "1",
      type: "lab",
      title: "SQL Injection Deep Dive",
      description: "Master SQL injection techniques with real-world scenarios",
      difficulty: "intermediate",
      estimatedTime: 120,
      bookmarkedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      icon: "🔐",
      slug: "sql-injection-dive",
    },
    {
      id: "2",
      type: "challenge",
      title: "Hack The Box CTF",
      description: "Real-world penetration testing challenges",
      difficulty: "advanced",
      estimatedTime: 180,
      bookmarkedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      icon: "🎯",
      slug: "htb-ctf",
    },
    {
      id: "3",
      type: "course",
      title: "AWS Security Fundamentals",
      description: "Learn cloud security best practices",
      difficulty: "beginner",
      estimatedTime: 240,
      bookmarkedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      icon: "☁️",
      slug: "aws-security",
    },
    {
      id: "4",
      type: "lab",
      title: "Reverse Engineering Malware",
      description: "Analyze and understand malicious code",
      difficulty: "advanced",
      estimatedTime: 150,
      bookmarkedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      icon: "🔍",
      slug: "reverse-malware",
    },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        window.location.href = "/login";
        return;
      }
      setUser(session.user);

      // Load bookmarks from localStorage (would be from backend in production)
      const savedBookmarks = localStorage.getItem("bookmarks");
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      } else {
        setBookmarks(mockBookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(mockBookmarks));
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const filteredBookmarks =
    filter === "all" ? bookmarks : bookmarks.filter((b) => b.type === filter);

  const stats = {
    total: bookmarks.length,
    labs: bookmarks.filter((b) => b.type === "lab").length,
    challenges: bookmarks.filter((b) => b.type === "challenge").length,
    courses: bookmarks.filter((b) => b.type === "course").length,
    totalTime: bookmarks.reduce((acc, b) => acc + b.estimatedTime, 0),
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "advanced":
        return "danger";
      default:
        return "secondary";
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-4xl font-bold text-white">My Bookmarks</h1>
          </div>
          <p className="text-gray-400">
            {filteredBookmarks.length} {filteredBookmarks.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-blue-600/10 border-blue-600/50">
            <p className="text-gray-400 text-sm mb-2">Total Bookmarks</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </Card>
          <Card className="bg-green-600/10 border-green-600/50">
            <p className="text-gray-400 text-sm mb-2">Labs</p>
            <p className="text-3xl font-bold text-green-300">{stats.labs}</p>
          </Card>
          <Card className="bg-yellow-600/10 border-yellow-600/50">
            <p className="text-gray-400 text-sm mb-2">Challenges</p>
            <p className="text-3xl font-bold text-yellow-300">{stats.challenges}</p>
          </Card>
          <Card className="bg-purple-600/10 border-purple-600/50">
            <p className="text-gray-400 text-sm mb-2">Courses</p>
            <p className="text-3xl font-bold text-purple-300">{stats.courses}</p>
          </Card>
          <Card className="bg-orange-600/10 border-orange-600/50">
            <p className="text-gray-400 text-sm mb-2">Est. Time</p>
            <p className="text-3xl font-bold text-orange-300">{Math.round(stats.totalTime / 60)}h</p>
          </Card>
        </div>

        {/* FILTER */}
        <div className="mb-8 flex gap-3 flex-wrap">
          {(["all", "lab", "challenge", "course"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {f === "all" ? "All Items" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* BOOKMARKS LIST */}
        {filteredBookmarks.length === 0 ? (
          <EmptyState
            title="No Bookmarks Yet"
            description="Start bookmarking labs, challenges, and courses to save them for later."
            actionLabel="Browse Labs"
            actionHref="/labs"
            icon="💔"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBookmarks.map((item) => (
              <Card
                key={item.id}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/5 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <p className="text-lg font-semibold text-white group-hover:text-blue-300 transition">
                        {item.title}
                      </p>
                      <Badge variant={getDifficultyColor(item.difficulty)} className="mt-1">
                        {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <button
                    onClick={() => removeBookmark(item.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded-lg transition"
                    title="Remove bookmark"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>

                <p className="text-gray-400 text-sm mb-4">{item.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{item.estimatedTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 size={16} />
                      <span className="capitalize">{item.type}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    Saved {new Date(item.bookmarkedAt).toLocaleDateString()}
                  </p>
                </div>

                <Link href={`/${item.type === "lab" ? "labs" : item.type === "challenge" ? "challenges" : "courses"}/${item.slug}`}>
                  <Button variant="outline" className="w-full">
                    Start {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
