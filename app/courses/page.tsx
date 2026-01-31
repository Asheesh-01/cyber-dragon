"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Play, Clock, Filter, Lock, Edit2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/UI";
import {
  ContentItem,
  ContentLevel,
  ContentVisibility,
  slugify,
  useContentStore,
} from "../lib/content-store";

const formatLevel = (level?: string) => {
  if (!level) return "Beginner";
  return level.charAt(0).toUpperCase() + level.slice(1);
};

const getLevelColor = (level?: string) => {
  switch (level) {
    case "Beginner":
      return "text-green-500 bg-green-500/10";
    case "Intermediate":
      return "text-yellow-500 bg-yellow-500/10";
    case "Advanced":
      return "text-red-500 bg-red-500/10";
    default:
      return "text-gray-500 bg-gray-500/10";
  }
};

const getStyleTag = (tags?: string[]) =>
  tags?.find((tag) => tag.startsWith("style:"))?.split(":")[1] || "default";

const setStyleTag = (tags: string[] | undefined, style: string) => {
  const next = (tags || []).filter((tag) => !tag.startsWith("style:"));
  if (style !== "default") {
    next.push(`style:${style}`);
  }
  return next;
};

const getCardStyle = (style: string) => {
  switch (style) {
    case "blue":
      return "from-blue-900/60 to-cyan-900/60";
    case "purple":
      return "from-purple-900/60 to-fuchsia-900/60";
    case "gradient":
      return "from-blue-900/60 via-purple-900/60 to-amber-900/60";
    default:
      return "from-blue-900/50 to-purple-900/50";
  }
};

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { items, loading, upsertItem, deleteItem } = useContentStore("course");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draft, setDraft] = useState<ContentItem | null>(null);
  const [initialDraft, setInitialDraft] = useState<ContentItem | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      const { data } = await supabase.auth.getSession();
      const role = data.session?.user?.user_metadata?.role || "user";
      setIsAdmin(role === "admin");
    };
    checkRole();
  }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const role = session?.user?.user_metadata?.role || "user";
      setIsAdmin(role === "admin");
      if (!session) {
        setIsModalOpen(false);
        setDraft(null);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const visibleCourses = useMemo(() => {
    if (isAdmin) return items;
    return items.filter((course) => course.visibility !== "private");
  }, [items, isAdmin]);

  const categories = useMemo(
    () => ["All", ...new Set(visibleCourses.map((course) => course.category))] as string[],
    [visibleCourses],
  );

  const levelOrder = { beginner: 1, intermediate: 2, advanced: 3 };

  const filteredCourses = useMemo(() => {
    return visibleCourses
      .filter((course) => selectedCategory === "All" || course.category === selectedCategory)
      .sort(
        (a, b) =>
          (levelOrder[a.level || "beginner"] || 1) -
          (levelOrder[b.level || "beginner"] || 1),
      );
  }, [visibleCourses, selectedCategory]);

  const openCreate = () => {
    const next: ContentItem = {
      id: `course_${Date.now()}`,
      slug: "",
      type: "course",
      title: "",
      description: "",
      category: "",
      level: "beginner",
      duration: "",
      thumbnailUrl: "",
      visibility: "public",
      locked: false,
      modules: [],
      tags: [],
    };
    setDraft(next);
    setInitialDraft(next);
    setIsModalOpen(true);
  };

  const openEdit = (course: ContentItem) => {
    const next = { ...course, modules: course.modules.map((m) => ({ ...m, lessons: [...m.lessons] })) };
    setDraft(next);
    setInitialDraft(next);
    setIsModalOpen(true);
  };

  const serializeDraft = (item: ContentItem | null) => {
    if (!item) return "";
    return JSON.stringify({
      id: item.id,
      slug: item.slug,
      type: item.type,
      title: item.title,
      description: item.description,
      category: item.category,
      level: item.level,
      duration: item.duration,
      thumbnailUrl: item.thumbnailUrl,
      visibility: item.visibility,
      locked: item.locked,
      tags: item.tags,
      modules: item.modules.map((module) => ({
        id: module.id,
        title: module.title,
        order: module.order,
        description: module.description,
        lessons: module.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          order: lesson.order,
          duration: lesson.duration,
          videoUrl: lesson.videoUrl,
          notesText: lesson.notesText,
          pdfUrl: lesson.pdfUrl,
          locked: lesson.locked,
        })),
      })),
    });
  };

  const isDirty = useMemo(
    () => serializeDraft(draft) !== serializeDraft(initialDraft),
    [draft, initialDraft],
  );

  const parseModulesFromText = (text: string, existingModules: ContentItem["modules"] = []) => {
    const existingMap = new Map(
      existingModules.map((module) => [module.title.trim().toLowerCase(), module]),
    );
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((title, index) => {
        const existing = existingMap.get(title.toLowerCase());
        if (existing) {
          return { ...existing, title };
        }
        return {
          id: `${draft?.id || "course"}_module_${index + 1}`,
          title,
          order: index,
          description: "",
          lessons: [],
        };
      });
  };

  const handleThumbnailUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) return;
      setDraft((prev) => (prev ? { ...prev, thumbnailUrl: result } : prev));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!draft || !draft.title.trim()) return;
    const updated: ContentItem = {
      ...draft,
      slug: draft.slug?.trim() || slugify(draft.title),
      updatedAt: new Date().toISOString(),
      createdAt: draft.createdAt || new Date().toISOString(),
    };
    await upsertItem(updated);
    setInitialDraft(updated);
    setIsModalOpen(false);
  };

  const handleDelete = async (course: ContentItem) => {
    if (!confirm(`Delete ${course.title}?`)) return;
    await deleteItem(course.id);
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Cybersecurity Courses</h1>
              <p className="text-gray-400 max-w-2xl">
                Start your cybersecurity learning journey with our professional courses designed for all skill levels.
                From networking fundamentals to SOC analyst training.
              </p>
            </div>
            {isAdmin && !isModalOpen && (
              <button
                onClick={openCreate}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg self-center sm:self-auto"
                aria-label="Add course"
                title="Add course"
              >
                <Plus size={18} /> Add Course
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{visibleCourses.length}</div>
            <div className="text-sm text-gray-400">Courses Available</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {visibleCourses.filter((course) => course.visibility === "coming_soon").length}
            </div>
            <div className="text-sm text-gray-400">Coming Soon</div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 mb-8">
          <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gray-400">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isLocked = !isAdmin && (course.locked || course.visibility !== "public");
              const style = getStyleTag(course.tags);
              const card = (
                <div className={`card overflow-hidden transition group block ${isLocked ? "opacity-70" : "hover:border-blue-500/50 hover:bg-white/10 hover:backdrop-blur-xl"}`}>
                  <div
                    className={`relative h-40 bg-gradient-to-br ${getCardStyle(style)} flex items-center justify-center overflow-hidden ${course.thumbnailUrl ? "bg-cover bg-center" : ""}`}
                    style={course.thumbnailUrl ? { backgroundImage: `url(${course.thumbnailUrl})` } : undefined}
                  >
                    {course.thumbnailUrl && <div className="absolute inset-0 bg-black/40" />}
                    <Play className="w-12 h-12 text-white/30 relative z-10" />
                    {course.visibility !== "public" && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                        <span className="font-bold text-yellow-400 text-xs">{course.visibility.replace("_", " ")}</span>
                      </div>
                    )}
                    {!isAdmin && course.locked && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 border border-white/10 rounded-lg text-xs text-gray-300 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Locked
                      </div>
                    )}
                    {isAdmin && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            openEdit(course);
                          }}
                          className="px-2 py-1 rounded bg-blue-600/80 hover:bg-blue-600 text-white text-xs flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(course);
                          }}
                          className="px-2 py-1 rounded bg-red-600/70 hover:bg-red-600 text-white text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(formatLevel(course.level))}`}>
                        {formatLevel(course.level)}
                      </span>
                      <span className="text-xs text-gray-500">{course.category}</span>
                    </div>

                    <h3 className="text-lg font-bold mb-2">{course.title}</h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {course.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        {course.modules.length} modules
                      </span>
                    </div>
                  </div>
                </div>
              );

              return isLocked ? (
                <div key={course.id}>{card}</div>
              ) : (
                <Link key={course.id} href={`/courses/${course.slug}`} className="block">
                  {card}
                </Link>
              );
            })}
          </div>
        )}

        {isAdmin && isModalOpen && draft && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-10">
            <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-semibold">{draft.title || "New Course"}</h2>
                <button className="text-gray-400 hover:text-white" onClick={() => setIsModalOpen(false)}>
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value, slug: slugify(e.target.value) })}
                    placeholder="Course title"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                  />
                  <input
                    value={draft.category}
                    onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                    placeholder="Category"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                  />
                  <input
                    value={draft.duration}
                    onChange={(e) => setDraft({ ...draft, duration: e.target.value })}
                    placeholder="Duration"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                  />
                  <div className="space-y-2">
                    <input
                      value={draft.thumbnailUrl}
                      onChange={(e) => setDraft({ ...draft, thumbnailUrl: e.target.value })}
                      placeholder="Thumbnail URL"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleThumbnailUpload(e.target.files?.[0])}
                      className="w-full text-xs text-gray-400"
                    />
                  </div>
                </div>

                <textarea
                  value={draft.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  placeholder="Short description"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 min-h-[120px]"
                />

                <div>
                  <label className="block text-xs uppercase tracking-wide text-gray-400 mb-2">
                    Modules (one per line)
                  </label>
                  <textarea
                    value={(draft.modules || []).map((module) => module.title).join("\n")}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        modules: parseModulesFromText(e.target.value, draft.modules || []),
                      })
                    }
                    placeholder="Module 1\nModule 2\nModule 3"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 min-h-[140px]"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    For lesson editing inside modules, use the Admin CMS at /admin/content.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={draft.level}
                    onChange={(e) => setDraft({ ...draft, level: e.target.value as ContentLevel })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                  >
                    {(["beginner", "intermediate", "advanced"] as ContentLevel[]).map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <select
                    value={draft.visibility}
                    onChange={(e) => setDraft({ ...draft, visibility: e.target.value as ContentVisibility })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                  >
                    {(["public", "private", "coming_soon"] as ContentVisibility[]).map((visibility) => (
                      <option key={visibility} value={visibility}>
                        {visibility.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setDraft({ ...draft, locked: !draft.locked })}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm"
                  >
                    {draft.locked ? "Locked" : "Unlocked"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={getStyleTag(draft.tags)}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        tags: setStyleTag(draft.tags, e.target.value),
                      })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                  >
                    {["default", "blue", "purple", "gradient"].map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={draft.visibility !== "private"}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          visibility: e.target.checked
                            ? draft.visibility === "private"
                              ? "public"
                              : draft.visibility
                            : "private",
                        })
                      }
                    />
                    Publish (visible to users)
                  </label>
                </div>

              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={!isDirty || !draft.title.trim()}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Core Topics Section */}
        <section className="px-4 sm:px-6 py-8 sm:py-16 bg-black/40 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Core Topics Covered</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500/40 transition">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="font-bold mb-2">Network Security</h3>
              <p className="text-sm text-gray-400">
                TCP/IP protocols, firewalls, intrusion detection systems, and secure network architecture
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500/40 transition">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="font-bold mb-2">Cryptography</h3>
              <p className="text-sm text-gray-400">
                Encryption algorithms, hashing, digital signatures, and secure key management
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500/40 transition">
              <div className="text-4xl mb-3">🐧</div>
              <h3 className="font-bold mb-2">Linux & OS Security</h3>
              <p className="text-sm text-gray-400">
                System hardening, access controls, file permissions, and OS administration
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500/40 transition">
              <div className="text-4xl mb-3">🕸️</div>
              <h3 className="font-bold mb-2">Web Security</h3>
              <p className="text-sm text-gray-400">
                OWASP Top 10, SQL injection, XSS, CSRF, authentication, and API security
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500/40 transition">
              <div className="text-4xl mb-3">🔨</div>
              <h3 className="font-bold mb-2">Ethical Hacking</h3>
              <p className="text-sm text-gray-400">
                Penetration testing, reconnaissance, vulnerability assessment, and exploitation techniques
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500/40 transition">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-bold mb-2">Incident Response</h3>
              <p className="text-sm text-gray-400">
                SOC operations, SIEM tools, threat hunting, and security incident management
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* Info Section */}
        <section className="px-4 sm:px-6 py-8 sm:py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-12">How Our Courses Work</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Choose Your Level</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Start with Beginner courses to build foundation, then progress to Intermediate and Advanced
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Learn & Practice</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Video lectures combined with hands-on labs and practical exercises
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Get Certified</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Earn completion certificates to showcase your skills to employers
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-orange-600 text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Build Your Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Complete real-world projects to add to your professional portfolio
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">💡 Course Features</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0">✨</span>
                <span className="text-gray-300">Video lectures by industry experts</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">🧪</span>
                <span className="text-gray-300">Interactive labs and hands-on exercises</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">📚</span>
                <span className="text-gray-300">Downloadable resources and code examples</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">🏆</span>
                <span className="text-gray-300">Certificates of completion</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">⏰</span>
                <span className="text-gray-300">Learn at your own pace, lifetime access</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 py-12 bg-white/5 border border-white/10 m-4 rounded-3xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Choose a course below and begin your cybersecurity journey today. All courses are coming soon and will be available shortly.
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-6 py-3 max-w-2xl mx-auto">
            <p className="text-yellow-200 text-sm">
              📌 Courses are currently being prepared and will be available soon. Roadmap courses like Security Engineer are already accessible!
            </p>
          </div>
        </div>
      </section>

      </div>
    </main>
  );
}
