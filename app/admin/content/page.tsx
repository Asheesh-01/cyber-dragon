"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button, Card, EmptyState, LoadingSpinner, Badge } from "@/components/UI";
import {
  ContentItem,
  ContentLevel,
  ContentType,
  ContentVisibility,
  Lesson,
  Module,
  slugify,
  useContentStore,
} from "@/lib/content-store";
import { Plus, Edit2, Trash2, Lock, Unlock, ArrowUp, ArrowDown } from "lucide-react";

const getStyleTag = (tags?: string[]) =>
  tags?.find((tag) => tag.startsWith("style:"))?.split(":")[1] || "default";

const setStyleTag = (tags: string[] | undefined, style: string) => {
  const next = (tags || []).filter((tag) => !tag.startsWith("style:"));
  if (style !== "default") {
    next.push(`style:${style}`);
  }
  return next;
};

const emptyLesson = (): Lesson => ({
  id: `lesson_${Date.now()}`,
  title: "",
  order: 1,
  duration: "",
  videoUrl: "",
  notesText: "",
  pdfUrl: "",
  locked: false,
});

const emptyModule = (): Module => ({
  id: `module_${Date.now()}`,
  title: "",
  order: 1,
  description: "",
  lessons: [],
});

const emptyContent = (): ContentItem => ({
  id: `content_${Date.now()}`,
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
});

export default function AdminContentPage() {
  const { allItems, loading, error, upsertItem, deleteItem } = useContentStore();
  const [role, setRole] = useState<string>("");
  const [authReady, setAuthReady] = useState(false);
  const [activeType, setActiveType] = useState<ContentType>("course");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draft, setDraft] = useState<ContentItem>(emptyContent());
  const [initialDraft, setInitialDraft] = useState<ContentItem | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) {
        window.location.href = "/login";
        return;
      }
      const userRole = user.user_metadata?.role || "user";
      setRole(userRole);
      setAuthReady(true);
    };
    checkAuth();
  }, []);

  const items = useMemo(
    () => allItems.filter((item) => item.type === activeType),
    [allItems, activeType],
  );

  const openCreate = () => {
    const next = emptyContent();
    next.type = activeType;
    setDraft(next);
    setInitialDraft(next);
    setIsModalOpen(true);
  };

  const openEdit = (item: ContentItem) => {
    const next = { ...item, modules: item.modules.map((m) => ({ ...m, lessons: [...m.lessons] })) };
    setDraft(next);
    setInitialDraft(next);
    setIsModalOpen(true);
  };

  const handleThumbnailUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) return;
      setDraft((prev) => ({ ...prev, thumbnailUrl: result }));
    };
    reader.readAsDataURL(file);
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

  const handleSave = async () => {
    if (!draft.title.trim()) return;
    const slug = draft.slug?.trim() || slugify(draft.title);
    const updated: ContentItem = {
      ...draft,
      slug,
      updatedAt: new Date().toISOString(),
      createdAt: draft.createdAt || new Date().toISOString(),
      modules: draft.modules.map((module, idx) => ({
        ...module,
        order: idx + 1,
        lessons: module.lessons.map((lesson, lidx) => ({
          ...lesson,
          order: lidx + 1,
        })),
      })),
    };
    await upsertItem(updated);
    setInitialDraft(updated);
    setIsModalOpen(false);
  };

  const handleDelete = async (item: ContentItem) => {
    if (!confirm(`Delete ${item.title}?`)) return;
    await deleteItem(item.id);
  };

  const updateModule = (moduleId: string, next: Partial<Module>) => {
    setDraft((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId ? { ...module, ...next } : module,
      ),
    }));
  };

  const updateLesson = (moduleId: string, lessonId: string, next: Partial<Lesson>) => {
    setDraft((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => {
        if (module.id !== moduleId) return module;
        return {
          ...module,
          lessons: module.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, ...next } : lesson,
          ),
        };
      }),
    }));
  };

  const addModule = () => {
    setDraft((prev) => ({
      ...prev,
      modules: [...prev.modules, { ...emptyModule(), order: prev.modules.length + 1 }],
    }));
  };

  const addLesson = (moduleId: string) => {
    setDraft((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: [...module.lessons, { ...emptyLesson(), order: module.lessons.length + 1 }],
            }
          : module,
      ),
    }));
  };

  const moveModule = (moduleIndex: number, direction: "up" | "down") => {
    setDraft((prev) => {
      const next = [...prev.modules];
      const targetIndex = direction === "up" ? moduleIndex - 1 : moduleIndex + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const [moved] = next.splice(moduleIndex, 1);
      next.splice(targetIndex, 0, moved);
      return { ...prev, modules: next };
    });
  };

  const moveLesson = (moduleId: string, lessonIndex: number, direction: "up" | "down") => {
    setDraft((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => {
        if (module.id !== moduleId) return module;
        const next = [...module.lessons];
        const targetIndex = direction === "up" ? lessonIndex - 1 : lessonIndex + 1;
        if (targetIndex < 0 || targetIndex >= next.length) return module;
        const [moved] = next.splice(lessonIndex, 1);
        next.splice(targetIndex, 0, moved);
        return { ...module, lessons: next };
      }),
    }));
  };

  if (loading || !authReady) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <LoadingSpinner />
      </main>
    );
  }

  if (role !== "admin") {
    return (
      <EmptyState
        title="Access Denied"
        description="You don't have permission to access this page."
        actionLabel="Go Home"
        actionHref="/"
        icon="🔒"
      />
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-24 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Content CMS</h1>
            <p className="text-gray-400">Manage courses, labs, notes, roadmaps, and challenges.</p>
            {error && <p className="text-sm text-yellow-400 mt-2">{error}</p>}
          </div>
          <Button onClick={openCreate} className="gap-2">
            <Plus size={18} />
            Add {activeType}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["course", "lab", "note", "roadmap", "challenge"] as ContentType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                activeType === type
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <Card className="text-center">
            <p className="text-gray-400">No {activeType}s created yet.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.visibility === "public" ? "success" : item.visibility === "private" ? "danger" : "warning"}>
                      {item.visibility.replace("_", " ")}
                    </Badge>
                    <button
                      className="p-2 rounded-lg hover:bg-white/10 text-gray-300"
                      onClick={() => openEdit(item)}
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-white/10 text-red-300"
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{item.description}</p>
                <p className="text-xs text-blue-300">
                  User status: {item.visibility === "public" ? "Available" : item.visibility === "private" ? "Private" : "Coming soon"}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  {item.level && <span className="px-2 py-1 rounded bg-white/5">{item.level}</span>}
                  {item.duration && <span className="px-2 py-1 rounded bg-white/5">{item.duration}</span>}
                  <span className="px-2 py-1 rounded bg-white/5">{item.modules.length} modules</span>
                  <span className="px-2 py-1 rounded bg-white/5">{item.locked ? "Locked" : "Unlocked"}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-10">
          <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-semibold">{draft.title || "New Content"}</h2>
              <button className="text-gray-400 hover:text-white" onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value, slug: slugify(e.target.value) })}
                  placeholder="Title"
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
                  placeholder="Duration (e.g. 6 weeks)"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                />
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

              <textarea
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                placeholder="Short description"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 min-h-[100px]"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={draft.type}
                  onChange={(e) => setDraft({ ...draft, type: e.target.value as ContentType })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2"
                >
                  {(["course", "lab", "note", "roadmap", "challenge"] as ContentType[]).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={getStyleTag(draft.tags)}
                  onChange={(e) => setDraft({ ...draft, tags: setStyleTag(draft.tags, e.target.value) })}
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

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <button
                  onClick={() => setDraft({ ...draft, locked: !draft.locked })}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  {draft.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  {draft.locked ? "Locked" : "Unlocked"}
                </button>
                <span>Lock to prevent users from opening content.</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Modules</h3>
                  <Button variant="secondary" onClick={addModule}>
                    Add Module
                  </Button>
                </div>

                {draft.modules.length === 0 && (
                  <p className="text-gray-500 text-sm">No modules yet. Add one to start building lessons.</p>
                )}

                {draft.modules.map((module, moduleIndex) => (
                  <Card key={module.id} className="bg-black/40">
                    <div className="flex items-center justify-between mb-3">
                      <input
                        value={module.title}
                        onChange={(e) => updateModule(module.id, { title: e.target.value })}
                        placeholder="Module title"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2"
                      />
                      <div className="flex items-center gap-2 ml-3">
                        <button
                          onClick={() => moveModule(moduleIndex, "up")}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => moveModule(moduleIndex, "down")}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                        >
                          <ArrowDown size={14} />
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={module.description}
                      onChange={(e) => updateModule(module.id, { description: e.target.value })}
                      placeholder="Module description"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 mb-4"
                    />

                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Lessons</h4>
                      <Button size="sm" variant="secondary" onClick={() => addLesson(module.id)}>
                        Add Lesson
                      </Button>
                    </div>

                    {module.lessons.length === 0 && (
                      <p className="text-gray-500 text-sm">No lessons yet.</p>
                    )}

                    <div className="space-y-4">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="border border-white/10 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <input
                              value={lesson.title}
                              onChange={(e) => updateLesson(module.id, lesson.id, { title: e.target.value })}
                              placeholder="Lesson title"
                              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2"
                            />
                            <button
                              onClick={() => moveLesson(module.id, lessonIndex, "up")}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button
                              onClick={() => moveLesson(module.id, lessonIndex, "down")}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                            >
                              <ArrowDown size={14} />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <input
                              value={lesson.duration}
                              onChange={(e) => updateLesson(module.id, lesson.id, { duration: e.target.value })}
                              placeholder="Duration"
                              className="bg-black/40 border border-white/10 rounded-lg px-3 py-2"
                            />
                            <input
                              value={lesson.videoUrl}
                              onChange={(e) => updateLesson(module.id, lesson.id, { videoUrl: e.target.value })}
                              placeholder="Video URL"
                              className="bg-black/40 border border-white/10 rounded-lg px-3 py-2"
                            />
                            <input
                              value={lesson.pdfUrl}
                              onChange={(e) => updateLesson(module.id, lesson.id, { pdfUrl: e.target.value })}
                              placeholder="PDF URL"
                              className="bg-black/40 border border-white/10 rounded-lg px-3 py-2"
                            />
                            <button
                              onClick={() => updateLesson(module.id, lesson.id, { locked: !lesson.locked })}
                              className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm"
                            >
                              {lesson.locked ? <Lock size={14} /> : <Unlock size={14} />}
                              {lesson.locked ? "Locked" : "Unlocked"}
                            </button>
                          </div>

                          <textarea
                            value={lesson.notesText}
                            onChange={(e) => updateLesson(module.id, lesson.id, { notesText: e.target.value })}
                            placeholder="Rich text notes (Markdown supported)"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 min-h-[120px]"
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
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

      {activeType === "course" && !isModalOpen && (
        <button
          onClick={openCreate}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg"
          aria-label="Add course"
          title="Add course"
        >
          <Plus size={20} />
        </button>
      )}
    </main>
  );
}
