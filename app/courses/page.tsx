import CourseCard from "@/components/CourseCard";

export const metadata = {
  title: "CyberDragon Courses – Cybersecurity Learning",
  description:
    "Explore structured cybersecurity courses on networking, security, and ethical hacking.",
};

const courses = [
  {
    slug: "networking-fundamentals",
    title: "Networking Fundamentals",
    category: "Networking",
    description: "Learn how computer networks work from basics to advanced.",
  },
  {
    slug: "linux-for-cybersecurity",
    title: "Linux for Cybersecurity",
    category: "Operating Systems",
    description: "Master Linux commands and system usage for security tasks.",
  },
  {
    slug: "web-security-basics",
    title: "Web Security Basics",
    category: "Web Security",
    description: "Understand common web vulnerabilities and protections.",
  },
  {
    slug: "cryptography-foundations",
    title: "Cryptography Foundations",
    category: "Security",
    description: "Learn encryption, hashing, and digital signature concepts.",
  },
  {
    slug: "ethical-hacking-intro",
    title: "Ethical Hacking Introduction",
    category: "Hacking",
    description: "Introduction to penetration testing and ethical hacking.",
  },
  {
    slug: "malware-analysis-basics",
    title: "Malware Analysis Basics",
    category: "Malware",
    description: "Understand how malware works and how to analyze it.",
  },
  {
    slug: "digital-forensics",
    title: "Digital Forensics",
    category: "Forensics",
    description: "Learn how to investigate cyber crimes digitally.",
  },
  {
    slug: "soc-analyst-basics",
    title: "SOC Analyst Basics",
    category: "SOC",
    description: "Introduction to Security Operations Center workflow.",
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-black text-white px-10 pt-32 pb-16">

      <h1 className="text-4xl font-bold text-center mb-4">
        Cybersecurity Courses
      </h1>

      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
        Professional cybersecurity courses designed for real-world skills.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {courses.map(course => (
          <CourseCard key={course.slug} course={course} />
        ))}

      </div>

    </main>
  );
}
