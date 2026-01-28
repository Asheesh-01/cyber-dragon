export const metadata = {
  title: "CyberDragon Roadmap – Security Engineer Path",
  description:
    "Follow CyberDragon’s structured Security Engineer roadmap from beginner to advanced.",
};

import Link from "next/link";

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 pt-32">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-4">
            Cybersecurity Roadmap
          </h1>
          <p className="text-gray-400">
            Choose your learning path
          </p>
        </div>

        {/* SINGLE ROADMAP BOX */}
        <Link href="/roadmap/security-engineer">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition cursor-pointer group">

            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                1
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-white">
                  Security Engineer Roadmap
                </h3>

                <p className="text-gray-400 text-sm">
                  Complete path from beginner to advanced security engineer
                </p>
              </div>

            </div>

          </div>
        </Link>

      </div>
    </main>
  );
}
