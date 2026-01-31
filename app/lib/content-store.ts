"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export type ContentType = "course" | "lab" | "note" | "roadmap" | "challenge";
export type ContentVisibility = "public" | "private" | "coming_soon";
export type ContentLevel = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  id: string;
  title: string;
  order: number;
  duration?: string;
  videoUrl?: string;
  notesText?: string;
  pdfUrl?: string;
  locked?: boolean;
}

export interface Module {
  id: string;
  title: string;
  order: number;
  description?: string;
  lessons: Lesson[];
}

export interface ContentItem {
  id: string;
  slug: string;
  type: ContentType;
  title: string;
  description: string;
  category: string;
  level?: ContentLevel;
  duration?: string;
  thumbnailUrl?: string;
  visibility: ContentVisibility;
  locked: boolean;
  modules: Module[];
  tags?: string[];
  updatedAt?: string;
  createdAt?: string;
}

const STORAGE_KEY = "cyberdragon_content_v1";

const defaultContent: ContentItem[] = [
  {
    id: "course_networking",
    slug: "networking-fundamentals",
    type: "course",
    title: "Networking Fundamentals",
    description: "Learn TCP/IP, routing, firewalls, and network security from basics to advanced concepts.",
    category: "Networking",
    level: "beginner",
    duration: "4 weeks",
    visibility: "public",
    locked: false,
    thumbnailUrl: "/thumbnail-networking.png",
    modules: [
      {
        id: "mod_net_1",
        title: "Core Concepts",
        order: 1,
        description: "Build strong fundamentals in networking.",
        lessons: [
          {
            id: "les_net_1",
            title: "OSI vs TCP/IP",
            order: 1,
            duration: "12 min",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            notesText: "OSI model layers and how they map to TCP/IP.\n\nKey takeaways:\n- Physical to Application layers\n- Encapsulation basics",
            locked: false,
          },
        ],
      },
    ],
  },
  {
    id: "course_linux",
    slug: "linux-for-cybersecurity",
    type: "course",
    title: "Linux for Cybersecurity",
    description: "Master Linux commands, scripting, and system administration essential for security professionals.",
    category: "Operating Systems",
    level: "beginner",
    duration: "6 weeks",
    visibility: "coming_soon",
    locked: true,
    thumbnailUrl: "/thumbnail-linux.png",
    modules: [],
  },
  {
    id: "course_web_security",
    slug: "web-security-basics",
    type: "course",
    title: "Web Security Basics",
    description: "Understand OWASP Top 10, common web vulnerabilities, SQL injection, XSS, and CSRF attacks.",
    category: "Web Security",
    level: "intermediate",
    duration: "5 weeks",
    visibility: "coming_soon",
    locked: true,
    thumbnailUrl: "/thumbnail-web.png",
    modules: [],
  },
  {
    id: "course_crypto",
    slug: "cryptography-foundations",
    type: "course",
    title: "Cryptography Foundations",
    description: "Learn encryption algorithms, hashing, digital signatures, and cryptographic protocols.",
    category: "Security",
    level: "intermediate",
    duration: "7 weeks",
    visibility: "coming_soon",
    locked: true,
    thumbnailUrl: "/thumbnail-crypto.png",
    modules: [],
  },
  {
    id: "course_eth_hack",
    slug: "ethical-hacking-intro",
    type: "course",
    title: "Ethical Hacking Introduction",
    description: "Introduction to penetration testing, reconnaissance, scanning, and ethical hacking methodologies.",
    category: "Hacking",
    level: "intermediate",
    duration: "8 weeks",
    visibility: "coming_soon",
    locked: true,
    thumbnailUrl: "/thumbnail-hacking.png",
    modules: [],
  },
  {
    id: "course_malware",
    slug: "malware-analysis-basics",
    type: "course",
    title: "Malware Analysis Basics",
    description: "Understand malware types, reverse engineering, dynamic analysis, and threat intelligence.",
    category: "Malware",
    level: "advanced",
    duration: "8 weeks",
    visibility: "coming_soon",
    locked: true,
    thumbnailUrl: "/thumbnail-malware.png",
    modules: [],
  },
  {
    id: "course_forensics",
    slug: "digital-forensics",
    type: "course",
    title: "Digital Forensics",
    description: "Learn digital forensics, evidence collection, preservation, and cyber crime investigation.",
    category: "Forensics",
    level: "advanced",
    duration: "7 weeks",
    visibility: "coming_soon",
    locked: true,
    thumbnailUrl: "/thumbnail-forensics.png",
    modules: [],
  },
  {
    id: "course_soc",
    slug: "soc-analyst-basics",
    type: "course",
    title: "SOC Analyst Basics",
    description: "Master SOC operations, SIEM tools, incident response, and security monitoring best practices.",
    category: "SOC",
    level: "intermediate",
    duration: "6 weeks",
    visibility: "coming_soon",
    locked: true,
    thumbnailUrl: "/thumbnail-soc.png",
    modules: [],
  },
  {
    id: "lab_sql",
    slug: "sql-injection-lab",
    type: "lab",
    title: "SQL Injection Lab",
    description: "Practice input validation and SQL injection detection in a safe environment.",
    category: "Web Security",
    level: "intermediate",
    duration: "45 min",
    visibility: "coming_soon",
    locked: true,
    thumbnailUrl: "/thumbnail-lab.png",
    modules: [],
  },
  {
    id: "note_owasp",
    slug: "owasp-top-10",
    type: "note",
    title: "OWASP Top 10 Notes",
    description: "Concise notes on the OWASP Top 10 vulnerabilities.",
    category: "Web Security",
    level: "beginner",
    duration: "Read",
    visibility: "public",
    locked: false,
    modules: [
      {
        id: "mod_note_1",
        title: "OWASP Overview",
        order: 1,
        lessons: [
          {
            id: "les_note_1",
            title: "A01: Broken Access Control",
            order: 1,
            notesText: "Access control failures allow attackers to act outside intended permissions.\n\nMitigations:\n- Deny by default\n- Server-side checks\n- Least privilege",
            locked: false,
          },
        ],
      },
    ],
  },
  {
    id: "challenge_recon",
    slug: "network-recon-challenge",
    type: "challenge",
    title: "Network Recon Challenge",
    description: "Identify exposed services and craft a recon report.",
    category: "Reconnaissance",
    level: "intermediate",
    duration: "30 min",
    visibility: "coming_soon",
    locked: true,
    modules: [],
  },
  {
    id: "roadmap_sec",
    slug: "security-engineer",
    type: "roadmap",
    title: "Security Engineer",
    description: "Complete path from beginner to advanced security engineer.",
    category: "Career Path",
    level: "beginner",
    duration: "10 volumes",
    visibility: "public",
    locked: false,
    modules: [],
  },
];

const isBrowser = typeof window !== "undefined";

const mergeWithDefaults = (items: ContentItem[]) => {
  const byId = new Map(items.map((item) => [item.id, item]));
  const merged = [...items];
  for (const def of defaultContent) {
    if (!byId.has(def.id)) {
      merged.push(def);
    }
  }
  return merged;
};

const loadLocalContent = (): ContentItem[] => {
  if (!isBrowser) return defaultContent;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw) as ContentItem[];
    const normalized = parsed.length ? parsed : defaultContent;
    return mergeWithDefaults(normalized);
  } catch {
    return defaultContent;
  }
};

const saveLocalContent = (items: ContentItem[]) => {
  if (!isBrowser) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const parseSupabaseItem = (item: any): ContentItem => ({
  id: item.id,
  slug: item.slug,
  type: item.type,
  title: item.title,
  description: item.description,
  category: item.category,
  level: item.level ?? undefined,
  duration: item.duration ?? undefined,
  thumbnailUrl: item.thumbnail_url ?? undefined,
  visibility: item.visibility,
  locked: item.locked,
  modules: item.modules ?? [],
  tags: item.tags ?? [],
  createdAt: item.created_at ?? undefined,
  updatedAt: item.updated_at ?? undefined,
});

const serializeSupabaseItem = (item: ContentItem) => ({
  id: item.id,
  slug: item.slug,
  type: item.type,
  title: item.title,
  description: item.description,
  category: item.category,
  level: item.level ?? null,
  duration: item.duration ?? null,
  thumbnail_url: item.thumbnailUrl ?? null,
  visibility: item.visibility,
  locked: item.locked,
  modules: item.modules ?? [],
  tags: item.tags ?? [],
  updated_at: new Date().toISOString(),
  created_at: item.createdAt ?? new Date().toISOString(),
});

const fetchSupabaseContent = async () => {
  const { data, error } = await supabase.from("content_items").select("*");
  if (error || !data) throw new Error(error?.message || "Supabase unavailable");
  return data.map(parseSupabaseItem) as ContentItem[];
};

const upsertSupabaseContent = async (items: ContentItem[]) => {
  await supabase.from("content_items").upsert(items.map(serializeSupabaseItem));
};

const deleteSupabaseContent = async (id: string) => {
  await supabase.from("content_items").delete().eq("id", id);
};

export const useContentStore = (type?: ContentType) => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const remoteItems = await fetchSupabaseContent();
      const merged = mergeWithDefaults(remoteItems);
      setItems(merged);
      saveLocalContent(merged);

      const missingDefaults = defaultContent.filter(
        (def) => !remoteItems.some((item) => item.id === def.id),
      );
      if (missingDefaults.length) {
        try {
          await upsertSupabaseContent(missingDefaults);
        } catch {
          // ignore; local state already has defaults merged
        }
      }
    } catch {
      const localItems = loadLocalContent();
      const merged = mergeWithDefaults(localItems);
      setItems(merged);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const filteredItems = useMemo(() => {
    if (!type) return items;
    return items.filter((item) => item.type === type);
  }, [items, type]);

  const upsertItem = useCallback(
    async (item: ContentItem) => {
      const next = items.some((entry) => entry.id === item.id)
        ? items.map((entry) => (entry.id === item.id ? item : entry))
        : [...items, item];

      setItems(next);
      saveLocalContent(next);

      try {
        await upsertSupabaseContent([item]);
      } catch (err: any) {
        setError(err?.message || "Unable to save to Supabase");
      }
    },
    [items],
  );

  const deleteItem = useCallback(
    async (id: string) => {
      const next = items.filter((entry) => entry.id !== id);
      setItems(next);
      saveLocalContent(next);

      try {
        await deleteSupabaseContent(id);
      } catch (err: any) {
        setError(err?.message || "Unable to delete from Supabase");
      }
    },
    [items],
  );

  return {
    items: filteredItems,
    allItems: items,
    loading,
    error,
    reload: loadItems,
    upsertItem,
    deleteItem,
  };
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
