"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Trophy,
  Zap,
  Filter,
  Trash2,
} from "lucide-react";
import { Card, Badge, Button, EmptyState, LoadingSpinner } from "@/components/UI";

interface Notification {
  id: string;
  type: "achievement" | "reminder" | "announcement" | "alert";
  title: string;
  description: string;
  icon: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  actionLabel?: string;
}

export default function NotificationsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const mockNotifications: Notification[] = [
    {
      id: "1",
      type: "achievement",
      title: "Achievement Unlocked!",
      description: 'You earned the "Week Warrior" badge by maintaining a 7-day streak!',
      icon: "🏆",
      read: false,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      actionUrl: "/profile",
      actionLabel: "View Badge",
    },
    {
      id: "2",
      type: "reminder",
      title: "Continue Your Learning",
      description: "You have 3 labs waiting. Keep your streak alive!",
      icon: "🔔",
      read: false,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      actionUrl: "/labs",
      actionLabel: "Go to Labs",
    },
    {
      id: "3",
      type: "announcement",
      title: "New Course Released",
      description: 'Check out "Advanced Web Exploitation" - now available for all users!',
      icon: "📢",
      read: true,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      actionUrl: "/courses",
      actionLabel: "Explore Course",
    },
    {
      id: "4",
      type: "alert",
      title: "Security Update",
      description: "Please update your password to ensure your account security.",
      icon: "⚠️",
      read: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      actionUrl: "/profile/settings",
      actionLabel: "Update Password",
    },
    {
      id: "5",
      type: "achievement",
      title: "Challenge Completed!",
      description: 'You successfully completed "Brute Force Attack Simulation". +50 XP earned!',
      icon: "⭐",
      read: true,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      actionUrl: "/challenges",
      actionLabel: "View Challenge",
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

      // Load notifications from localStorage (would be from backend in production)
      const saved = localStorage.getItem("notifications");
      if (saved) {
        setNotifications(JSON.parse(saved));
      } else {
        setNotifications(mockNotifications);
        localStorage.setItem("notifications", JSON.stringify(mockNotifications));
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("notifications", JSON.stringify([]));
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case "reminder":
        return <Zap className="w-5 h-5 text-orange-400" />;
      case "announcement":
        return <Info className="w-5 h-5 text-blue-400" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl font-bold text-white">Notifications</h1>
            </div>
            <p className="text-gray-400">
              {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-600/20 border border-blue-600/50 rounded-lg hover:bg-blue-600/30 transition text-sm text-blue-300"
            >
              Mark All as Read
            </button>
          )}
        </div>

        {/* FILTER TABS */}
        <div className="flex gap-3 mb-8">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {f === "all"
                ? `All (${notifications.length})`
                : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>

        {/* NOTIFICATIONS LIST */}
        {filteredNotifications.length === 0 ? (
          <EmptyState
            title={filter === "unread" ? "All Caught Up!" : "No Notifications"}
            description={
              filter === "unread"
                ? "You have no unread notifications."
                : "You don't have any notifications yet."
            }
            actionLabel={filter === "unread" ? undefined : "Go to Dashboard"}
            actionHref={filter === "unread" ? undefined : "/dashboard"}
            icon={filter === "unread" ? "✅" : "🔔"}
          />
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-all ${
                  !notification.read
                    ? "bg-blue-600/10 border-blue-600/50 hover:bg-blue-600/20"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* ICON */}
                  <div className="flex-shrink-0 mt-1">
                    <span className="text-2xl">{notification.icon}</span>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">
                          {notification.description}
                        </p>

                        {notification.actionUrl && (
                          <a
                            href={notification.actionUrl}
                            className="inline-block text-blue-400 hover:text-blue-300 text-sm font-medium transition"
                          >
                            {notification.actionLabel} →
                          </a>
                        )}
                      </div>

                      {!notification.read && (
                        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-blue-400 mt-1" />
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mt-3">
                      {new Date(notification.createdAt).toLocaleDateString()} at{" "}
                      {new Date(notification.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex-shrink-0 flex gap-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-600/10 rounded-lg transition"
                        title="Mark as read"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}

            {/* CLEAR ALL BUTTON */}
            {notifications.length > 0 && (
              <div className="mt-8 text-center">
                <button
                  onClick={clearAll}
                  className="text-sm text-gray-500 hover:text-red-400 transition"
                >
                  Clear all notifications
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
