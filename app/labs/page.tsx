"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge, Button, EmptyState } from "@/components/UI";
import { Labs } from "@/data/roadmap";
import { Clock, Zap, BookOpen } from "lucide-react";

export default function LabsPage() {
  const [filter, setFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [activeType, setActiveType] = useState<"all" | "guided" | "challenge">("all");

  const filteredLabs = Labs.filter((lab) => {
    const difficulty = filter === "all" || lab.difficulty === filter;
    const type = activeType === "all" || lab.type === activeType;
    return difficulty && type;
  });

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Security Labs</h1>
          <p className="text-gray-400 text-lg">
            Hands-on labs to apply what you've learned. Practice your skills in a safe environment.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div>
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

          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <div className="flex gap-2 flex-wrap">
              {(["all", "guided", "challenge"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeType === type
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Labs Grid */}
        {filteredLabs.length === 0 ? (
          <EmptyState
            icon="🧪"
            title="No Labs Found"
            description="Try adjusting your filters to find more labs"
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredLabs.map((lab) => (
              <div key={lab.id}>
                <Card className="h-full opacity-60 hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-blue-500/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1">
                      <h3 className="text-xl font-bold">{lab.title}</h3>
                      <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                    </div>
                    <Badge
                      variant={
                        lab.difficulty === "beginner"
                          ? "success"
                          : lab.difficulty === "intermediate"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {lab.difficulty}
                    </Badge>
                  </div>

                  <p className="text-gray-400 mb-4">{lab.description}</p>

                  <div className="flex items-center gap-6 mb-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {lab.estimatedTime}min
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={16} />
                      {lab.type === "guided" ? "Guided" : "Challenge"}
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} />
                      {lab.environment}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full cursor-not-allowed opacity-50">
                    Coming Soon 🔒
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card hover={false}>
            <p className="text-gray-400 text-sm">Total Labs</p>
            <p className="text-3xl font-bold mt-2">{Labs.length}</p>
          </Card>

          <Card hover={false}>
            <p className="text-gray-400 text-sm">Average Time</p>
            <p className="text-3xl font-bold mt-2">
              {Math.round(Labs.reduce((sum, l) => sum + l.estimatedTime, 0) / Labs.length)}
              <span className="text-sm">min</span>
            </p>
          </Card>

          <Card hover={false}>
            <p className="text-gray-400 text-sm">Total Hours</p>
            <p className="text-3xl font-bold mt-2">
              {Math.round((Labs.reduce((sum, l) => sum + l.estimatedTime, 0) / 60) * 10) / 10}
              <span className="text-sm">h</span>
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
