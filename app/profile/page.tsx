"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { Card, Badge, Button, EmptyState, LoadingSpinner } from "@/components/UI";
import { Github, Linkedin, Twitter, Instagram, Award, Flame, TrendingUp, Clock } from "lucide-react";
import { Volumes } from "@/data/roadmap";

interface CompletedTopic {
  topicId: string;
  completedAt: string;
}

interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalHours: number;
  certificatesEarned: number;
  badges: Array<{ id: string; title: string; icon: string; earnedAt: string }>;
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stats, setStats] = useState<UserStats>({
    currentStreak: 0,
    longestStreak: 0,
    totalHours: 0,
    certificatesEarned: 0,
    badges: [],
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
          setProfileImage(savedImage);
        }
        
        // Calculate live stats from localStorage
        calculateLiveStats();
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setProfileImage(result);
      localStorage.setItem("profileImage", result);
      window.dispatchEvent(new Event("profile-image-updated"));
    };
    reader.readAsDataURL(file);
  };

  const calculateLiveStats = () => {
    const savedProgress = localStorage.getItem("userProgress");
    let completedTopics: CompletedTopic[] = [];
    
    if (savedProgress) {
      try {
        completedTopics = JSON.parse(savedProgress);
      } catch (error) {
        console.error("Failed to parse progress:", error);
      }
    }

    // Calculate actual hours from completed topics
    let totalHours = 0;
    completedTopics.forEach((ct) => {
      const topic = Volumes.flatMap((v) => v.topics).find(
        (t) => t.id === ct.topicId
      );
      if (topic) {
        totalHours += topic.estimatedHours;
      }
    });

    // Calculate certificates from completed courses (tracked separately)
    // When courses are unlocked, they will save completion data to localStorage
    const completedCourses = localStorage.getItem("completedCourses");
    let certificatesEarned = 0;
    
    if (completedCourses) {
      try {
        const courses = JSON.parse(completedCourses);
        certificatesEarned = Array.isArray(courses) ? courses.length : 0;
      } catch (error) {
        console.error("Failed to parse completed courses:", error);
      }
    }

    // Calculate current streak based on dates
    let currentStreak = 0;
    let longestStreak = 0;
    
    if (completedTopics.length > 0) {
      const dates = completedTopics.map((ct) => {
        const date = new Date(ct.completedAt);
        return date.toDateString();
      });
      
      const uniqueDates = Array.from(new Set(dates)).sort((a, b) => 
        new Date(b).getTime() - new Date(a).getTime()
      );

      // Calculate current streak
      let streak = 1;
      for (let i = 0; i < uniqueDates.length - 1; i++) {
        const current = new Date(uniqueDates[i]);
        const next = new Date(uniqueDates[i + 1]);
        const diffDays = Math.floor((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          streak++;
        } else {
          break;
        }
      }
      currentStreak = streak;
      longestStreak = streak;

      // Check if streak is broken (no activity today)
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
        currentStreak = 0;
      }
    }

    // Generate badges
    const generatedBadges: Array<{ id: string; title: string; icon: string; earnedAt: string }> = [];
    
    if (completedTopics.length >= 1) {
      generatedBadges.push({
        id: "first-step",
        title: "First Steps",
        icon: "🚀",
        earnedAt: completedTopics[0].completedAt,
      });
    }
    
    if (completedTopics.length >= 5) {
      generatedBadges.push({
        id: "learner",
        title: "Quick Learner",
        icon: "⚡",
        earnedAt: completedTopics[4].completedAt,
      });
    }
    
    if (currentStreak >= 7) {
      generatedBadges.push({
        id: "streak-warrior",
        title: "7-Day Warrior",
        icon: "🔥",
        earnedAt: new Date().toISOString(),
      });
    }
    
    if (certificatesEarned >= 1) {
      generatedBadges.push({
        id: "course-master",
        title: "Course Master",
        icon: "🎓",
        earnedAt: new Date().toISOString(),
      });
    }

    setStats({
      currentStreak,
      longestStreak,
      totalHours,
      certificatesEarned,
      badges: generatedBadges,
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center pt-28">
        <LoadingSpinner size="lg" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white pt-28 px-4">
        <div className="max-w-5xl mx-auto">
          <EmptyState
            icon="🔐"
            title="Sign In Required"
            description="Please log in to view your profile."
            action={{
              label: "Go to Login",
              onClick: () => (window.location.href = "/login"),
            }}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">
                    {user.user_metadata?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 px-2 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {user.user_metadata?.name || "User"}
              </h1>
              <p className="text-gray-400 mb-4">{user.email}</p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/dashboard">
                  <Button size="sm" variant="secondary">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/profile/settings">
                  <Button size="sm" variant="secondary">
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card hover={false}>
            <div className="flex items-center gap-3">
              <Flame className="text-orange-500" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Current Streak</p>
                <p className="text-2xl font-bold">{stats.currentStreak} days</p>
              </div>
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center gap-3">
              <TrendingUp className="text-green-500" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Longest Streak</p>
                <p className="text-2xl font-bold">{stats.longestStreak} days</p>
              </div>
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center gap-3">
              <Clock className="text-blue-500" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Total Hours</p>
                <p className="text-2xl font-bold">{stats.totalHours}h</p>
              </div>
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center gap-3">
              <Award className="text-purple-500" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Certificates</p>
                <p className="text-2xl font-bold">{stats.certificatesEarned}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Achievements */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-2xl font-bold mb-6">Achievements</h2>
              {stats.badges.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {stats.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-blue-600/50 transition text-center"
                    >
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h3 className="font-semibold mb-1">{badge.title}</h3>
                      <p className="text-xs text-gray-500">
                        Earned {new Date(badge.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  Start learning to earn badges! 🎯
                </p>
              )}
            </Card>
          </div>

          {/* Social Links */}
          <Card>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/in/cyber-dragon-5756943a9/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/10"
              >
                <Linkedin size={20} className="text-blue-500" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://x.com/Cyberdragons_in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/10"
              >
                <Twitter size={20} className="text-blue-400" />
                <span className="text-sm">Twitter</span>
              </a>
              <a
                href="https://www.instagram.com/cyberdragons.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/10"
              >
                <Instagram size={20} className="text-pink-500" />
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
