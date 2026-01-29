// ============================================================================
// CYBERDRAGON PLATFORM - COMPREHENSIVE TYPE DEFINITIONS
// ============================================================================

// User & Authentication
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "user" | "admin" | "moderator";
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "inactive" | "suspended";
}

export interface UserProfile {
  id: string;
  userId: string;
  bio?: string;
  avatar?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  preferences: {
    theme: "dark" | "light" | "system";
    emailNotifications: boolean;
    publicProfile: boolean;
  };
}

// Roadmap & Learning Path
export interface Topic {
  id: string;
  title: string;
  description: string;
  slug: string;
  order: number;
  estimatedHours: number;
  skills: string[];
  prerequisites?: string[]; // topic IDs
}

export interface Volume {
  id: string;
  title: string;
  description: string;
  slug: string;
  order: number;
  topics: Topic[];
  estimatedHours: number;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon: string;
  level: "beginner" | "intermediate" | "advanced";
  volumes: Volume[];
  skills: string[];
  jobRoles: string[];
  estimatedWeeks: number;
  prerequisites?: string[]; // career path IDs
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  slug: string;
  careerPaths: CareerPath[];
  featured: boolean;
  order: number;
}

// Course & Content
export interface Lecture {
  id: string;
  title: string;
  description: string;
  slug: string;
  order: number;
  videoUrl: string;
  videoType: "youtube" | "vimeo" | "direct";
  notes?: string;
  resources: Resource[];
  duration: number; // in minutes
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Course {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  price: "free" | "paid";
  priceAmount?: number;
  image?: string;
  lectures: Lecture[];
  totalDuration: number;
  status: "draft" | "published" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  type: "pdf" | "code" | "document" | "link";
  url: string;
  downloadable: boolean;
}

// Labs & Challenges
export interface Lab {
  id: string;
  title: string;
  description: string;
  slug: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  type: "guided" | "challenge" | "capstone";
  content: string;
  instructions: string;
  resources?: string[];
  estimatedTime: number; // minutes
  environment: "browser" | "vm" | "local";
  topicId: string;
  order: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  slug: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  problem: string;
  hints?: string[];
  solution?: string;
  resources: string[];
  estimatedTime: number;
  topicId: string;
}

// Progress Tracking
export interface Progress {
  id: string;
  userId: string;
  roadmapId: string;
  currentCareerPathId: string;
  currentVolumeId: string;
  currentTopicId: string;
  completedTopics: string[]; // topic IDs
  completedLectures: string[]; // lecture IDs
  completedLabs: string[]; // lab IDs
  totalProgress: number; // 0-100
  startedAt: Date;
  lastActivityAt: Date;
}

export interface DailyLog {
  id: string;
  userId: string;
  date: Date;
  topicsStudied: string[];
  timeSpent: number; // minutes
  labsCompleted: number;
  notes?: string;
  mood: "struggling" | "neutral" | "confident"; // optional
}

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  totalDaysActive: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: {
    type: "streak" | "completion" | "challenge" | "milestone";
    value: number;
  };
}

export interface UserBadges {
  userId: string;
  badges: {
    badgeId: string;
    earnedAt: Date;
  }[];
}

// Bookmarks & Favorites
export interface Bookmark {
  id: string;
  userId: string;
  contentId: string; // lecture, lab, resource ID
  contentType: "lecture" | "lab" | "challenge" | "topic";
  savedAt: Date;
  note?: string;
}

// Notifications
export interface Notification {
  id: string;
  userId: string;
  type: "achievement" | "reminder" | "announcement" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// Certificates
export interface Certificate {
  id: string;
  userId: string;
  careerPathId: string;
  issuedAt: Date;
  expiresAt?: Date;
  certificateNumber: string;
  verificationUrl: string;
  status: "active" | "expired" | "revoked";
}

// Admin Content Management
export interface ContentModeration {
  id: string;
  contentId: string;
  contentType: "lecture" | "lab" | "challenge" | "course";
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string; // admin user ID
  reviewedAt?: Date;
  feedback?: string;
}

export interface AdminAuditLog {
  id: string;
  adminId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes: Record<string, any>;
  timestamp: Date;
  ipAddress: string;
}

// Search & Metadata
export interface SearchResult {
  id: string;
  type: "course" | "lecture" | "lab" | "topic" | "challenge";
  title: string;
  description: string;
  slug: string;
  url: string;
  relevance: number;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical: string;
  schema?: Record<string, any>;
}

// User Settings
export interface UserSettings {
  userId: string;
  theme: "dark" | "light" | "system";
  emailNotifications: boolean;
  inappNotifications: boolean;
  publicProfile: boolean;
  showProgressToOthers: boolean;
  language: string;
  timezone: string;
}

// Onboarding
export interface OnboardingStep {
  id: string;
  step: number;
  title: string;
  description: string;
  action: string;
  completed: boolean;
}

export interface UserOnboarding {
  userId: string;
  currentStep: number;
  completedSteps: number[];
  completedAt?: Date;
  skipped: boolean;
}
