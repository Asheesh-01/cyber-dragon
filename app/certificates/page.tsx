"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { Card, Badge, Button, EmptyState, LoadingSpinner } from "@/components/UI";
import { Download, Share2, Award } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  completionDate: string;
  certificateNumber: string;
  skills: string[];
  issuedBy: string;
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    title: "Penetration Testing Fundamentals",
    issueDate: "2024-01-15",
    completionDate: "2024-01-10",
    certificateNumber: "CD-2024-001",
    skills: ["Pentesting", "Tool Usage", "Exploitation"],
    issuedBy: "CyberDragon",
  },
  {
    id: "2",
    title: "Linux Security Essentials",
    issueDate: "2023-12-20",
    completionDate: "2023-12-15",
    certificateNumber: "CD-2023-042",
    skills: ["Linux", "Security", "Hardening"],
    issuedBy: "CyberDragon",
  },
];

export default function CertificatesPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [certificates] = useState<Certificate[]>(mockCertificates);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center pt-28">
        <LoadingSpinner size="lg" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white pt-28 px-4">
        <div className="max-w-5xl mx-auto">
          <EmptyState
            icon="🔐"
            title="Sign In Required"
            description="Please log in to view your certificates."
            action={{
              label: "Go to Login",
              onClick: () => (window.location.href = "/login"),
            }}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Certificates</h1>
          <p className="text-gray-400 text-lg">
            Showcase your achievements and share your learning journey
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card hover={false}>
            <div className="flex items-center gap-3">
              <Award className="text-blue-500" size={32} />
              <div>
                <p className="text-gray-400 text-sm">Certificates Earned</p>
                <p className="text-3xl font-bold">{certificates.length}</p>
              </div>
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center gap-3">
              <Award className="text-green-500" size={32} />
              <div>
                <p className="text-gray-400 text-sm">Skills Verified</p>
                <p className="text-3xl font-bold">
                  {new Set(certificates.flatMap((c) => c.skills)).size}
                </p>
              </div>
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center gap-3">
              <Award className="text-purple-500" size={32} />
              <div>
                <p className="text-gray-400 text-sm">Learning Paths</p>
                <p className="text-3xl font-bold">{Math.ceil(certificates.length / 2)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Certificates List */}
        {certificates.length === 0 ? (
          <EmptyState
            icon="📜"
            title="No Certificates Yet"
            description="Complete learning paths and challenges to earn certificates"
            action={{
              label: "Start Learning",
              onClick: () => (window.location.href = "/dashboard"),
            }}
          />
        ) : (
          <div className="space-y-6">
            {certificates.map((cert) => (
              <Card key={cert.id}>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Certificate Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <Award className="text-yellow-500 flex-shrink-0" size={32} />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                        <p className="text-sm text-gray-400 mb-3">
                          Certificate #{cert.certificateNumber}
                        </p>
                        <div className="flex gap-2 flex-wrap mb-4">
                          {cert.skills.map((skill) => (
                            <Badge key={skill} variant="primary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>Completed: {new Date(cert.completionDate).toLocaleDateString()}</p>
                          <p>Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <Button variant="secondary" className="flex items-center justify-center gap-2">
                      <Download size={16} />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center gap-2">
                      <Share2 size={16} />
                      Share
                    </Button>
                    <Button variant="secondary" className="text-xs">
                      Verify
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Share Your Achievements */}
        {certificates.length > 0 && (
          <div className="mt-12 pt-12 border-t border-white/10">
            <Card className="text-center">
              <h2 className="text-2xl font-bold mb-4">Share Your Achievements</h2>
              <p className="text-gray-400 mb-6">
                Boost your professional profile by sharing your certificates on LinkedIn
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Button>Share on LinkedIn</Button>
                <Button variant="secondary">Share via Email</Button>
                <Button variant="secondary">Copy Link</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
