"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  BarChart3,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card, Badge, Button, EmptyState, LoadingSpinner, Tabs } from "@/components/UI";

interface AdminStats {
  totalUsers: number;
  totalLabs: number;
  totalChallenges: number;
  totalCourses: number;
  activeToday: number;
  pendingModerations: number;
}

interface Content {
  id: string;
  title: string;
  type: "lab" | "challenge" | "course";
  status: "published" | "draft" | "pending";
  author: string;
  createdAt: string;
  views: number;
  moderation?: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 1250,
    totalLabs: 523,
    totalChallenges: 312,
    totalCourses: 45,
    activeToday: 342,
    pendingModerations: 8,
  });

  const mockContent: Content[] = [
    {
      id: "1",
      title: "Advanced SQL Injection Techniques",
      type: "lab",
      status: "published",
      author: "John Doe",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      views: 1245,
    },
    {
      id: "2",
      title: "Network Reconnaissance Challenge",
      type: "challenge",
      status: "pending",
      author: "Jane Smith",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      views: 0,
      moderation: "Pending review",
    },
    {
      id: "3",
      title: "Cloud Security Fundamentals",
      type: "course",
      status: "published",
      author: "Admin",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      views: 3421,
    },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        window.location.href = "/login";
        return;
      }

      const userRole = session.user.user_metadata?.role || "user";
      setRole(userRole);

      if (userRole !== "admin") {
        window.location.href = "/dashboard";
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "secondary";
      case "pending":
        return "warning";
      default:
        return "secondary";
    }
  };

  if (loading) return <LoadingSpinner />;

  if (role !== "admin")
    return (
      <EmptyState
        title="Access Denied"
        description="You don't have permission to access this page."
        actionLabel="Go Home"
        actionHref="/"
        icon="🔒"
      />
    );

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <Button variant="primary" className="gap-2">
              <Plus size={18} />
              Create Content
            </Button>
          </div>
          <p className="text-gray-400">Manage platform content, users, and moderation</p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <Card className="bg-blue-600/10 border-blue-600/50">
            <p className="text-gray-400 text-sm mb-2">Total Users</p>
            <p className="text-3xl font-bold text-blue-300">{stats.totalUsers}</p>
            <p className="text-xs text-gray-500 mt-2">+{stats.activeToday} today</p>
          </Card>
          <Card className="bg-green-600/10 border-green-600/50">
            <p className="text-gray-400 text-sm mb-2">Labs</p>
            <p className="text-3xl font-bold text-green-300">{stats.totalLabs}</p>
          </Card>
          <Card className="bg-yellow-600/10 border-yellow-600/50">
            <p className="text-gray-400 text-sm mb-2">Challenges</p>
            <p className="text-3xl font-bold text-yellow-300">{stats.totalChallenges}</p>
          </Card>
          <Card className="bg-purple-600/10 border-purple-600/50">
            <p className="text-gray-400 text-sm mb-2">Courses</p>
            <p className="text-3xl font-bold text-purple-300">{stats.totalCourses}</p>
          </Card>
          <Card className="bg-orange-600/10 border-orange-600/50">
            <p className="text-gray-400 text-sm mb-2">Active Today</p>
            <p className="text-3xl font-bold text-orange-300">{stats.activeToday}</p>
          </Card>
          <Card className="bg-red-600/10 border-red-600/50">
            <p className="text-gray-400 text-sm mb-2">Pending Review</p>
            <p className="text-3xl font-bold text-red-300">{stats.pendingModerations}</p>
          </Card>
        </div>

        {/* TABS */}
        <div className="mb-8">
          <Tabs
            tabs={[
              { id: "overview", label: "Content Overview" },
              { id: "moderation", label: "Moderation Queue" },
              { id: "users", label: "User Management" },
              { id: "audit", label: "Audit Logs" },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* TAB CONTENT */}
        {activeTab === "overview" && (
          <div>
            <div className="flex gap-3 mb-6">
              <button className="px-4 py-2 bg-blue-600/20 border border-blue-600/50 rounded-lg text-sm text-blue-300 hover:bg-blue-600/30 transition">
                All ({mockContent.length})
              </button>
              <button className="px-4 py-2 bg-white/10 rounded-lg text-sm text-gray-400 hover:bg-white/20 transition">
                Published
              </button>
              <button className="px-4 py-2 bg-white/10 rounded-lg text-sm text-gray-400 hover:bg-white/20 transition">
                Draft
              </button>
              <button className="px-4 py-2 bg-white/10 rounded-lg text-sm text-gray-400 hover:bg-white/20 transition">
                Pending
              </button>
            </div>

            <div className="space-y-3">
              {mockContent.map((content) => (
                <Card
                  key={content.id}
                  className="hover:bg-white/10 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-grow">
                      <h3 className="font-semibold text-white mb-2">
                        {content.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="capitalize">{content.type}</span>
                        <Badge
                          variant={getStatusColor(content.status)}
                          className="text-xs"
                        >
                          {content.status}
                        </Badge>
                        <span>By {content.author}</span>
                        <span>
                          📅{" "}
                          {new Date(content.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {content.views}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-blue-600/20 rounded-lg transition text-gray-400 hover:text-blue-300">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-600/20 rounded-lg transition text-gray-400 hover:text-red-300">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "moderation" && (
          <div>
            <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-yellow-300 mb-2">
                <AlertCircle size={18} />
                <span className="font-semibold">
                  {stats.pendingModerations} items awaiting review
                </span>
              </div>
              <p className="text-sm text-yellow-200/70">
                Review and approve or reject pending content submissions.
              </p>
            </div>

            <div className="space-y-3">
              {mockContent
                .filter((c) => c.status === "pending")
                .map((content) => (
                  <Card key={content.id} className="bg-yellow-600/10 border-yellow-600/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {content.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Submitted by {content.author} on{" "}
                          {new Date(content.createdAt).toLocaleDateString()}
                        </p>
                        {content.moderation && (
                          <p className="text-xs text-yellow-300 mt-2">
                            💭 {content.moderation}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="primary" size="sm">
                          ✓ Approve
                        </Button>
                        <Button variant="danger" size="sm">
                          ✕ Reject
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <Card className="bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Users size={18} />
                  Active Users This Month
                </h3>
                <Badge variant="success">{stats.totalUsers} users</Badge>
              </div>
              <div className="h-64 bg-black/50 rounded-lg flex items-center justify-center text-gray-500">
                📊 User statistics chart would go here
              </div>
            </Card>
          </div>
        )}

        {activeTab === "audit" && (
          <div>
            <Card className="bg-white/5">
              <h3 className="font-semibold text-white mb-4">Recent Actions</h3>
              <div className="space-y-3">
                {[
                  "Admin created new lab: Advanced Exploitation Techniques",
                  "User submitted challenge: Network Recon CTF",
                  "Admin approved course: Cloud Security Basics",
                  "System generated certificate: John Doe - Penetration Tester",
                ].map((action, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-black/50 rounded">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-sm text-gray-300">{action}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
