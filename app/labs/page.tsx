"use client";

import { useState } from "react";
import {
  Terminal,
  Play,
  Clock,
  BarChart3,
  CheckCircle,
  Lock,
  Server,
  Shield,
  Globe,
} from "lucide-react";
import { Labs } from "@/data/roadmap";

const categoryOptions = ["All", "Linux", "Networking", "Web Security", "Blue Team"];

const categoryForLab = (lab: (typeof Labs)[number]) => {
  if (lab.title.toLowerCase().includes("linux")) return "Linux";
  if (lab.title.toLowerCase().includes("network")) return "Networking";
  if (lab.title.toLowerCase().includes("sql") || lab.title.toLowerCase().includes("web")) return "Web Security";
  return "Blue Team";
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "text-green-500 bg-green-500/10";
    case "intermediate":
      return "text-yellow-500 bg-yellow-500/10";
    case "advanced":
      return "text-red-500 bg-red-500/10";
    default:
      return "text-gray-500 bg-gray-500/10";
  }
};

export default function LabsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredLabs = Labs.filter((lab) => {
    const category = categoryForLab(lab);
    return activeCategory === "All" || category === activeCategory;
  });

  const completedCount = 0;
  const totalPoints = 0;

  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Hands-On Labs</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Practice your skills in safe, sandboxed environments. Our labs provide real-world scenarios without
            the real-world risks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{Labs.length}</div>
            <div className="text-sm text-gray-400">Total Labs</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">Coming Soon</div>
            <div className="text-sm text-gray-400">All Labs in Development</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categoryOptions.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => {
            const category = categoryForLab(lab);
            const iconMap = {
              Linux: Terminal,
              Networking: Server,
              "Web Security": Shield,
              "Blue Team": Globe,
            } as const;
            const LabIcon = iconMap[category] || Terminal;

            return (
              <div key={lab.id} className="card p-6 hover:border-yellow-500/50 hover:bg-white/10 hover:backdrop-blur-xl transition opacity-75 cursor-not-allowed">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <LabIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    Coming Soon
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(lab.difficulty)}`}>
                    {lab.difficulty.charAt(0).toUpperCase() + lab.difficulty.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">{category}</span>
                </div>

                <h3 className="text-lg font-bold mb-2">{lab.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{lab.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lab.estimatedTime} min
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    {lab.type === "guided" ? "Guided" : "Challenge"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">More Labs Coming Soon</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            We&apos;re constantly adding new labs. Subscribe to get notified when new content is available.
          </p>
        </div>
      </div>
    </main>
  );
}
