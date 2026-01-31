"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Clock,
  Users,
  Star,
  Zap,
  Flame,
  ChevronRight,
} from "lucide-react";
import { Challenges } from "@/data/roadmap";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "text-green-500 bg-green-500/10";
    case "intermediate":
      return "text-yellow-500 bg-yellow-500/10";
    case "advanced":
      return "text-orange-500 bg-orange-500/10";
    default:
      return "text-gray-500 bg-gray-500/10";
  }
};

export default function ChallengesPage() {
  const [filter, setFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");

  const filteredChallenges = Challenges.filter((challenge) =>
    filter === "all" ? true : challenge.difficulty === filter
  );

  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Security Challenges</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Test your skills with hands-on security challenges. Compete with others, earn points, and climb the leaderboard.
          </p>
        </div>

        <div className="card p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{Challenges.length}</div>
              <div className="text-sm text-gray-400">Total Challenges</div>
            </div>
            <div className="text-center">
              <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-yellow-500">Coming Soon</div>
              <div className="text-sm text-gray-400">In Development</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Active Challenges</h2>
              <div className="flex gap-2">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as "all" | "beginner" | "intermediate" | "advanced")}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredChallenges.map((challenge) => (
                <div key={challenge.id} className="card p-5 hover:border-yellow-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition opacity-75 cursor-not-allowed">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">General</span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                          Coming Soon
                        </span>
                      </div>

                      <h3 className="text-lg font-bold mb-1">{challenge.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{challenge.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {challenge.estimatedTime} min
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="card p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Leaderboard
              </h2>
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2">No Challengers Yet</h3>
                <p className="text-gray-400 mb-6">
                  The leaderboard will populate when challenges are unlocked and users start completing them.
                </p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-3">
                  <p className="text-sm text-blue-300">
                    💡 Be the first to complete challenges and earn your place on the leaderboard!
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
              <h3 className="text-lg font-bold mb-2">Challenge Rewards</h3>
              <p className="text-gray-400 text-sm">
                Earn points, badges, and recognition when you complete challenges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
