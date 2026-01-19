"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton";

const notesContent: any = {
  "networking-basics": {
    title: "Networking Basics",
    content: "This section covers OSI model, TCP/IP, devices, and fundamentals of networking.",
  },
  "linux-fundamentals": {
    title: "Linux Fundamentals",
    content: "Learn essential Linux commands, file system, permissions and processes.",
  },
  "web-security": {
    title: "Web Security",
    content: "Understand XSS, SQL Injection, CSRF and secure coding practices.",
  },
  "cryptography-basics": {
    title: "Cryptography Basics",
    content: "Learn encryption, hashing, symmetric and asymmetric cryptography.",
  },
  "owasp-top-10": {
    title: "OWASP Top 10",
    content: "Top 10 web application vulnerabilities explained.",
  },
  "operating-systems": {
    title: "Operating Systems",
    content: "Process management, memory, file systems and scheduling.",
  },
  "ip-addressing": {
    title: "IP Addressing",
    content: "IPv4, IPv6, subnetting and CIDR explained.",
  },
  "mac-address": {
    title: "MAC Address",
    content: "MAC address structure, types and ARP role.",
  },
};

export default function NoteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug: any = params.slug;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push(`/login?redirect=/notes/${slug}`);
      } else {
        setLoading(false);
      }
    });
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <BackButton />

        Loading...
      </main>
    );
  }

  const note = notesContent[slug];

  if (!note) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Note not found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-10 pt-22 py-16 max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">{note.title}</h1>

      <p className="text-gray-300 leading-relaxed text-lg">
        {note.content}
      </p>

    </main>
  );
}
