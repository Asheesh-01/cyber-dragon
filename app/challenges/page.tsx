"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge, Button, EmptyState } from "@/components/UI";
import { Challenges } from "@/data/roadmap";
import { Trophy, Zap } from "lucide-react";

export default function ChallengesPage() {
  const [filter, setFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const filteredChallenges = Challenges.filter((challenge) =>
    filter === "all" ? true : challenge.difficulty === filter
  );

  const toggleComplete = (id: string) => {
    setCompletedChallenges((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Security Challenges</h1>
          <p className="text-gray-400 text-lg">
            Test your skills with real-world challenges. Earn points and recognition.
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Challenges Completed</p>
              <p className="text-3xl font-bold mt-2">
                {completedChallenges.length}/{Challenges.length}
              </p>
            </div>
            <Trophy className="text-yellow-500" size={48} />
          </div>
        </Card>

        {/* Filters */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">Difficulty</label>
          <div className="flex gap-2 flex-wrap">
            {(["all", "beginner", "intermediate", "advanced"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === level
                    ? "bg-blue-600 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges List */}
        {filteredChallenges.length === 0 ? (
          <EmptyState
            icon="🎯"
            title="No Challenges Found"
            description="Try adjusting your filters"
          />
        ) : (
          <div className="space-y-4">
            {filteredChallenges.map((challenge) => {
              const isCompleted = completedChallenges.includes(challenge.id);
              return (
                <div key={challenge.id}>
                  <Card className="cursor-not-allowed opacity-60 hover:opacity-80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-blue-500/50">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        disabled
                        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition opacity-50 cursor-not-allowed border-gray-500`}
                      >
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-lg font-bold text-gray-400">
                            {challenge.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                challenge.difficulty === "beginner"
                                  ? "success"
                                  : challenge.difficulty === "intermediate"
                                  ? "warning"
                                  : "danger"
                              }
                            >
                              {challenge.difficulty}
                            </Badge>
                            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
                              Coming Soon
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-500 mb-3">{challenge.description}</p>

                        <div className="flex items-center gap-6 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <Zap size={16} />
                            {challenge.estimatedTime}min
                          </div>
                          {challenge.hints && challenge.hints.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span>💡 {challenge.hints.length} hints available</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="flex-shrink-0 cursor-not-allowed opacity-50">
                        Coming Soon 🔒
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        )}

        {/* Leaderboard */}
        <div className="mt-12 pt-12 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-6">Top Challengers</h2>
          <Card>
            <div className="text-center py-12">
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
          </Card>
        </div>
      </div>
    </main>
  );
}
