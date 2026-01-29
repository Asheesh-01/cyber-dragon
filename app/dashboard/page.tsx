"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import {
  Card,
  Badge,
  ProgressBar,
  Button,
  EmptyState,
  LoadingSpinner,
} from "@/components/UI";
import { Volumes } from "@/data/roadmap";
import { Flame, Award, BookOpen, Clock } from "lucide-react";

interface DashboardStats {
  currentStreak: number;
  totalProgress: number;
  completedTopics: number;
  hoursLearned: number;
  badges: number;
}

interface CompletedTopic {
  topicId: string;
  completedAt: string;
}

interface VolumeProgress {
  volumeId: string;
  completedCount: number;
  totalCount: number;
  progress: number;
  topics: Array<{
    id: string;
    title: string;
    completed: boolean;
    estimatedHours: number;
  }>;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    currentStreak: 0,
    totalProgress: 0,
    completedTopics: 0,
    hoursLearned: 0,
    badges: 0,
  });
  const [volumeProgress, setVolumeProgress] = useState<VolumeProgress[]>([]);
  const [recentActivity, setRecentActivity] = useState<Array<{
    type: string;
    title: string;
    time: string;
  }>>([]);

  useEffect(() => {
    const fetchUserAndProgress = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUser(data.user);
          
          // Get user progress from localStorage (since we don't have backend yet)
          const savedProgress = localStorage.getItem("userProgress");
          let completedTopics: CompletedTopic[] = [];
          
          if (savedProgress) {
            completedTopics = JSON.parse(savedProgress);
          }

          // Calculate statistics
          calculateStats(completedTopics);
          calculateVolumeProgress(completedTopics);
          generateRecentActivity(completedTopics);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProgress();
  }, []);

  const calculateStats = (completedTopics: CompletedTopic[]) => {
    // Calculate total completed topics
    const uniqueCompletedTopics = new Set(
      completedTopics.map((ct) => ct.topicId)
    );
    const completedCount = uniqueCompletedTopics.size;

    // Calculate total topics across all volumes
    const totalTopics = Volumes.reduce((sum, vol) => sum + vol.topics.length, 0);

    // Calculate total hours
    let totalHours = 0;
    completedTopics.forEach((ct) => {
      const topic = Volumes.flatMap((v) => v.topics).find(
        (t) => t.id === ct.topicId
      );
      if (topic) {
        totalHours += topic.estimatedHours;
      }
    });

    // Calculate progress percentage
    const progressPercentage = totalTopics > 0 
      ? Math.round((completedCount / totalTopics) * 100) 
      : 0;

    // Calculate streak (simplified - based on having completed at least one topic)
    const streak = completedCount > 0 ? Math.min(completedCount, 30) : 0;

    // Calculate badges (1 every 5 topics)
    const badges = Math.floor(completedCount / 5);

    setStats({
      currentStreak: streak,
      totalProgress: progressPercentage,
      completedTopics: completedCount,
      hoursLearned: totalHours,
      badges,
    });
  };

  const calculateVolumeProgress = (completedTopics: CompletedTopic[]) => {
    const volumeProgressData: VolumeProgress[] = Volumes.map((volume) => {
      const volumeTopicIds = volume.topics.map((t) => t.id);
      const completedInVolume = completedTopics.filter((ct) =>
        volumeTopicIds.includes(ct.topicId)
      ).length;

      const topicsWithStatus = volume.topics.map((topic) => ({
        id: topic.id,
        title: topic.title,
        completed: completedTopics.some((ct) => ct.topicId === topic.id),
        estimatedHours: topic.estimatedHours,
      }));

      const progress = Math.round(
        (completedInVolume / volume.topics.length) * 100
      );

      return {
        volumeId: volume.id,
        completedCount: completedInVolume,
        totalCount: volume.topics.length,
        progress,
        topics: topicsWithStatus,
      };
    });

    setVolumeProgress(volumeProgressData);
  };

  const generateRecentActivity = (completedTopics: CompletedTopic[]) => {
    const activities = completedTopics
      .sort(
        (a, b) =>
          new Date(b.completedAt).getTime() -
          new Date(a.completedAt).getTime()
      )
      .slice(0, 5)
      .map((ct) => {
        const topic = Volumes.flatMap((v) => v.topics).find(
          (t) => t.id === ct.topicId
        );
        const completedDate = new Date(ct.completedAt);
        const now = new Date();
        const diffMs = now.getTime() - completedDate.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        let timeStr = "";
        if (diffMins < 60) {
          timeStr = `${diffMins}m ago`;
        } else if (diffHours < 24) {
          timeStr = `${diffHours}h ago`;
        } else if (diffDays < 7) {
          timeStr = `${diffDays}d ago`;
        } else {
          timeStr = completedDate.toLocaleDateString();
        }

        return {
          type: "completed",
          title: `Completed: ${topic?.title || "Unknown Topic"}`,
          time: timeStr,
        };
      });

    setRecentActivity(activities);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center pt-28">
        <LoadingSpinner size="lg" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 px-4">
        <div className="max-w-5xl mx-auto">
          <EmptyState
            icon="🔐"
            title="Sign In Required"
            description="Please log in to view your dashboard and track your learning progress."
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
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user.user_metadata?.name || "Learner"}! 👋
          </h1>
          <p className="text-gray-400">
            Track your progress and continue your cybersecurity journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          <Card hover={false}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current Streak</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.currentStreak}
                </p>
                <p className="text-xs text-gray-500 mt-1">days</p>
              </div>
              <Flame className="text-orange-500" size={32} />
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Overall Progress</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.totalProgress}%
                </p>
                <p className="text-xs text-gray-500 mt-1">completed</p>
              </div>
              <BookOpen className="text-blue-500" size={32} />
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Topics Done</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.completedTopics}
                </p>
                <p className="text-xs text-gray-500 mt-1">out of {Volumes.reduce((sum, v) => sum + v.topics.length, 0)}</p>
              </div>
              <Award className="text-green-500" size={32} />
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Hours Learned</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.hoursLearned}
                </p>
                <p className="text-xs text-gray-500 mt-1">total</p>
              </div>
              <Clock className="text-purple-500" size={32} />
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Badges Earned</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.badges}
                </p>
                <p className="text-xs text-gray-500 mt-1">unlocked</p>
              </div>
              <Award className="text-yellow-500" size={32} />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Learning Path */}
          <div className="lg:col-span-2">
            <Card>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Security Engineer</h2>
                <p className="text-gray-400 mb-6">Full Stack Learning Path</p>
                <div className="mb-6">
                  <p className="text-5xl font-bold text-blue-500 mb-2">{stats.totalProgress}%</p>
                  <p className="text-gray-400">Overall Completion</p>
                </div>
                <ProgressBar
                  value={stats.totalProgress}
                  label="Complete"
                  showLabel={false}
                />
                <p className="text-sm text-gray-500 mt-4">
                  {volumeProgress.reduce((sum, vp) => sum + vp.completedCount, 0)} of{" "}
                  {volumeProgress.reduce((sum, vp) => sum + vp.totalCount, 0)}{" "}
                  topics completed
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Link href="/roadmap/security-engineer">
                    <Button className="w-full">View All 10 Volumes</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Start learning to see activity here!
                  </p>
                )}
              </div>
            </Card>

            {/* Recommended Next */}
            <Card>
              <h3 className="text-lg font-bold mb-4">Recommended Next</h3>
              <div className="space-y-3">
                {volumeProgress
                  .filter((vp) => vp.progress < 100)
                  .slice(0, 1)
                  .map((vol) => {
                    const nextTopic = vol.topics.find((t) => !t.completed);
                    return (
                      <Link key={vol.volumeId} href="/roadmap/security-engineer">
                        <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer border border-white/10">
                          <p className="text-sm font-medium">
                            {nextTopic?.title || "Continue Learning"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {nextTopic?.estimatedHours || 2}h estimated
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                {volumeProgress.every((vp) => vp.progress === 100) && (
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-sm font-medium text-green-400">
                      🎉 You've completed all volumes!
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
