"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton";
import { ContentItem, ContentType, Lesson, Module, useContentStore } from "../../app/lib/content-store";
import { Button, ProgressBar } from "@/components/UI";
import { Lock, Play, FileText } from "lucide-react";

const PROGRESS_KEY = "cyberdragon_progress_v1";

const loadProgress = (): Record<string, boolean> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
};

const saveProgress = (progress: Record<string, boolean>) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

const renderRichText = (text?: string) => {
  if (!text) return null;
  return text.split("\n").map((line, idx) => (
    <p key={idx} className="text-gray-300 leading-relaxed mb-3">
      {line}
    </p>
  ));
};

const isDirectVideo = (url?: string) =>
  !!url && (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg"));

interface ContentDetailProps {
  type: ContentType;
  slug: string;
  requireAuth?: boolean;
}

export default function ContentDetail({ type, slug, requireAuth = true }: ContentDetailProps) {
  const router = useRouter();
  const { items, loading } = useContentStore(type);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"video" | "notes">("video");
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [role, setRole] = useState<string>("user");
  const [authChecked, setAuthChecked] = useState(!requireAuth);

  const content = useMemo(
    () => items.find((item) => item.slug === slug && item.type === type),
    [items, slug, type],
  );

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    if (!requireAuth) return;
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) {
        router.push(`/login?redirect=/${type}s/${slug}`);
        return;
      }
      setRole(user.user_metadata?.role || "user");
      setAuthChecked(true);
    };
    checkAuth();
  }, [requireAuth, router, slug, type]);

  useEffect(() => {
    if (!content || !content.modules.length) return;
    const firstModule = content.modules[0];
    const firstLesson = firstModule.lessons?.[0];
    setActiveModuleId(firstModule.id);
    setActiveLessonId(firstLesson?.id || null);
  }, [content]);

  const activeModule = useMemo(
    () => content?.modules.find((module) => module.id === activeModuleId),
    [content, activeModuleId],
  );

  const activeLesson = useMemo(() => {
    if (!activeModule) return null;
    return activeModule.lessons.find((lesson) => lesson.id === activeLessonId) || null;
  }, [activeModule, activeLessonId]);

  const completedCount = useMemo(() => {
    if (!content) return 0;
    return content.modules.reduce(
      (total, module) =>
        total + module.lessons.filter((lesson) => progress[lesson.id]).length,
      0,
    );
  }, [content, progress]);

  const totalLessons = useMemo(() => {
    if (!content) return 0;
    return content.modules.reduce((total, module) => total + module.lessons.length, 0);
  }, [content]);

  const handleCompleteLesson = (lesson: Lesson) => {
    const updated = { ...progress, [lesson.id]: true };
    setProgress(updated);
    saveProgress(updated);
  };

  if (loading || !authChecked) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!content) {
    return (
      <main className="min-h-screen bg-black text-white px-10 pt-32 pb-16 flex flex-col items-center justify-center">
        <BackButton />
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Content Not Found</h1>
          <p className="text-gray-400 text-lg mb-8">
            The content you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Button onClick={() => router.push(`/${type}s`)}>Back to {type}s</Button>
        </div>
      </main>
    );
  }

  const isAdmin = role === "admin";

  if (content.visibility === "private" && !isAdmin) {
    return (
      <main className="min-h-screen bg-black text-white px-10 pt-32 pb-16 flex flex-col items-center justify-center">
        <BackButton />
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Content Not Found</h1>
          <p className="text-gray-400 text-lg mb-8">
            The content you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Button onClick={() => router.push(`/${type}s`)}>Back to {type}s</Button>
        </div>
      </main>
    );
  }

  const lockedForUser = content.visibility === "coming_soon" || content.locked;

  if (lockedForUser && !isAdmin) {
    return (
      <main className="min-h-screen bg-black text-white px-6 pt-32 pb-16">
        <div className="max-w-3xl mx-auto text-center card p-8">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Lock className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold mb-3">This content is locked</h1>
          <p className="text-gray-400 mb-6">
            This {type} is currently {content.visibility.replace("_", " ")}. Check back later or contact support.
          </p>
          <Button onClick={() => router.push(`/${type}s`)}>Browse {type}s</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-28 pb-16">
      <div className="max-w-6xl mx-auto">
        <BackButton />
        <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-blue-400 uppercase tracking-wide">{content.category}</p>
                  <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
                  <p className="text-gray-400">{content.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                {content.level && (
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    {content.level}
                  </span>
                )}
                {content.duration && (
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    {content.duration}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  {totalLessons} lessons
                </span>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Lesson Viewer</h2>
                <div className="flex gap-2">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                      activeTab === "video"
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
                    }`}
                    onClick={() => setActiveTab("video")}
                  >
                    Video
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                      activeTab === "notes"
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
                    }`}
                    onClick={() => setActiveTab("notes")}
                  >
                    Notes
                  </button>
                </div>
              </div>

              {!activeLesson ? (
                <p className="text-gray-400">Select a lesson to begin.</p>
              ) : activeTab === "video" ? (
                <div className="space-y-4">
                  {activeLesson.videoUrl ? (
                    isDirectVideo(activeLesson.videoUrl) ? (
                      <video
                        src={activeLesson.videoUrl}
                        controls
                        className="w-full rounded-xl border border-white/10"
                        onEnded={() => handleCompleteLesson(activeLesson)}
                      />
                    ) : (
                      <div className="border border-white/10 rounded-xl p-6 text-center bg-black/40">
                        <Play className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                        <p className="text-gray-300 mb-3">External video</p>
                        <a
                          href={activeLesson.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Open video
                        </a>
                        <div className="mt-4">
                          <Button onClick={() => handleCompleteLesson(activeLesson)}>Mark as watched</Button>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="border border-white/10 rounded-xl p-6 text-center text-gray-400">
                      No video available for this lesson.
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {activeLesson.pdfUrl && (
                    <a
                      href={activeLesson.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <FileText className="w-4 h-4" />
                      Open PDF Notes
                    </a>
                  )}
                  <div className="border border-white/10 rounded-xl p-5 bg-black/40">
                    {renderRichText(activeLesson.notesText) || (
                      <p className="text-gray-400">No notes available for this lesson.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Progress</h2>
              <ProgressBar value={completedCount} max={Math.max(totalLessons, 1)} label="Lessons completed" />
              <p className="text-sm text-gray-500 mt-3">
                {completedCount} of {totalLessons} lessons completed
              </p>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Modules</h2>
              <div className="space-y-3">
                {content.modules.map((module) => (
                  <div key={module.id}>
                    <button
                      onClick={() => {
                        setActiveModuleId(module.id);
                        setActiveLessonId(module.lessons?.[0]?.id || null);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                        activeModuleId === module.id
                          ? "bg-blue-600/20 border-blue-500/40 text-white"
                          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{module.title}</span>
                        <span className="text-xs text-gray-500">{module.lessons.length} lessons</span>
                      </div>
                    </button>

                    {activeModuleId === module.id && module.lessons.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {module.lessons.map((lesson) => {
                          const locked = lesson.locked || content.locked;
                          return (
                            <button
                              key={lesson.id}
                              disabled={locked && !isAdmin}
                              onClick={() => setActiveLessonId(lesson.id)}
                              className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition flex items-center justify-between ${
                                activeLessonId === lesson.id
                                  ? "bg-white/10 border-white/20 text-white"
                                  : "bg-black/30 border-white/10 text-gray-400 hover:bg-white/5"
                              } ${locked && !isAdmin ? "cursor-not-allowed opacity-60" : ""}`}
                            >
                              <span>{lesson.title}</span>
                              {locked && !isAdmin ? (
                                <Lock className="w-4 h-4" />
                              ) : progress[lesson.id] ? (
                                <span className="text-xs text-green-400">Completed</span>
                              ) : (
                                <span className="text-xs text-gray-500">{lesson.duration || ""}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
