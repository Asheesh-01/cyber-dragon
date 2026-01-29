"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Badge, ProgressBar, Button } from "@/components/UI";
import { CareerPaths } from "@/data/roadmap";
import BackButton from "@/components/BackButton";
import { ChevronDown, ChevronUp, CheckCircle, Circle } from "lucide-react";

interface ExpandedVolume {
  [key: string]: boolean;
}

export default function RoadmapDetailPage() {
  const [expandedVolumes, setExpandedVolumes] = useState<ExpandedVolume>({});
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  const careerPath = CareerPaths[0]; // Security Engineer
  
  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("userProgress");
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        const topicIds = progress.map((p: any) => p.topicId);
        setCompletedTopics(topicIds);
      } catch (error) {
        console.error("Failed to load progress:", error);
      }
    }
  }, []);

  const toggleVolumeExpand = (volumeId: string) => {
    setExpandedVolumes((prev) => ({
      ...prev,
      [volumeId]: !prev[volumeId],
    }));
  };

  const toggleTopicComplete = (topicId: string) => {
    setCompletedTopics((prev) => {
      const isCompleted = prev.includes(topicId);
      let progress;
      
      if (isCompleted) {
        // When unchecking - remove the topic
        const updatedTopics = prev.filter((id) => id !== topicId);
        progress = updatedTopics;
      } else {
        // When checking - add new topic with current timestamp
        const updatedTopics = [...prev, topicId];
        const savedProgress = localStorage.getItem("userProgress");
        let existingProgress: Array<{ topicId: string; completedAt: string }> = [];
        
        if (savedProgress) {
          try {
            existingProgress = JSON.parse(savedProgress);
          } catch (error) {
            console.error("Failed to parse existing progress:", error);
          }
        }

        // Preserve existing completion times and add new one
        const topicExists = existingProgress.some((p) => p.topicId === topicId);
        if (!topicExists) {
          existingProgress.push({
            topicId,
            completedAt: new Date().toISOString(),
          });
        }

        localStorage.setItem("userProgress", JSON.stringify(existingProgress));
        return updatedTopics;
      }

      // For unchecking - update localStorage
      const savedProgress = localStorage.getItem("userProgress");
      let existingProgress: Array<{ topicId: string; completedAt: string }> = [];
      
      if (savedProgress) {
        try {
          existingProgress = JSON.parse(savedProgress);
        } catch (error) {
          console.error("Failed to parse existing progress:", error);
        }
      }

      // Remove the unchecked topic
      const filteredProgress = existingProgress.filter((p) => p.topicId !== topicId);
      localStorage.setItem("userProgress", JSON.stringify(filteredProgress));

      return progress;
    });
  };

  const calculateProgress = (volumeId: string) => {
    const volume = careerPath.volumes.find((v) => v.id === volumeId);
    if (!volume) return 0;
    const completed = volume.topics.filter((t) =>
      completedTopics.includes(t.id)
    ).length;
    return Math.round((completed / volume.topics.length) * 100);
  };

  const totalProgress = Math.round(
    (completedTopics.length /
      careerPath.volumes.reduce((sum, v) => sum + v.topics.length, 0)) *
      100
  );

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <BackButton />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{careerPath.icon}</div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{careerPath.title}</h1>
              <p className="text-gray-400 mb-4">{careerPath.description}</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="primary">{careerPath.level}</Badge>
                <Badge variant="secondary">
                  {careerPath.estimatedWeeks} weeks
                </Badge>
                <Badge variant="secondary">
                  {careerPath.volumes.reduce((sum, v) => sum + v.estimatedHours, 0)}h
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8">
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Your Progress</h2>
            <p className="text-sm text-gray-400">
              {completedTopics.length} of{" "}
              {careerPath.volumes.reduce((sum, v) => sum + v.topics.length, 0)}{" "}
              topics completed
            </p>
          </div>
          <ProgressBar
            value={totalProgress}
            label="Overall Progress"
            showLabel={true}
          />
        </Card>

        {/* Skills & Jobs */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="text-lg font-bold mb-4">Skills You'll Learn</h3>
            <div className="flex flex-wrap gap-2">
              {careerPath.skills.map((skill, i) => (
                <Badge key={i} variant="primary">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold mb-4">Job Roles</h3>
            <ul className="space-y-2">
              {careerPath.jobRoles.map((role, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300">
                  <span className="text-blue-400">▸</span> {role}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Volumes & Topics */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Learning Volumes</h2>

          {careerPath.volumes.map((volume, idx) => {
            const isExpanded = expandedVolumes[volume.id];
            const progress = calculateProgress(volume.id);

            return (
              <Card key={volume.id}>
                <button
                  onClick={() => toggleVolumeExpand(volume.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-2xl font-bold text-blue-500">
                        Vol {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">
                          {volume.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {volume.description}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="text-gray-400" />
                    ) : (
                      <ChevronDown className="text-gray-400" />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <ProgressBar
                      value={progress}
                      label={`${volume.topics.length} topics`}
                      showLabel={false}
                    />
                    <div className="ml-4 text-right text-sm text-gray-400">
                      {progress}%
                    </div>
                  </div>
                </button>

                {/* Topics List */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="space-y-3">
                      {volume.topics.map((topic) => {
                        const isCompleted = completedTopics.includes(topic.id);
                        return (
                          <div
                            key={topic.id}
                            className="flex items-start gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
                          >
                            <button
                              onClick={() => toggleTopicComplete(topic.id)}
                              className="mt-1 flex-shrink-0"
                            >
                              {isCompleted ? (
                                <CheckCircle className="text-green-500" size={20} />
                              ) : (
                                <Circle
                                  className="text-gray-500 hover:text-blue-400"
                                  size={20}
                                />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <h4
                                className={`font-medium ${
                                  isCompleted
                                    ? "text-gray-500 line-through"
                                    : "text-white"
                                }`}
                              >
                                {topic.title}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                {topic.description}
                              </p>
                              <div className="flex gap-2 mt-2 flex-wrap">
                                <Badge variant="secondary" className="text-xs">
                                  {topic.estimatedHours}h
                                </Badge>
                                {topic.skills.map((skill, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <Card className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to start learning?</h3>
          <p className="text-gray-400 mb-6">
            Begin your journey to becoming a Security Engineer
          </p>
          <Link href="/dashboard">
            <Button className="inline-block">Go to Dashboard</Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}