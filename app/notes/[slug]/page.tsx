"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton";

const notesContent: any = {
  "networking-basics": {
    title: "Networking Basics",
    content: "Coming soon...............",
  },
  "linux-fundamentals": {
    title: "Linux Fundamentals",
    content: "Coming soon...............",
  },
  "Security Engineer": {
    title: "SOC or Cloud Security",
    content: "..............",  },
  "cryptography-basics": {
    title: "Cryptography Basics",
    content: "Coming soon...............",  },
  "owasp-top-10": {
    title: "OWASP Top 10",
    content: "Coming soon...............",  },
  "operating-systems": {
    title: "Operating Systems",
    content: "Coming soon...............",  },
  "ip-addressing": {
    title: "IP Addressing",
    content: "Coming soon...............",  },
  "mac-address": {
    title: "MAC Address",
    content: "Coming soon...............",  },
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
      <BackButton />

      <h1 className="text-4xl font-bold mb-6">{note.title}</h1>

      <p className="text-gray-300 leading-relaxed text-lg">
        {note.content}
      </p>

    </main>
  );
}
