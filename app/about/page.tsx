import type { Metadata } from "next";



export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            About CyberDragon
          </h1>
          <p className="text-gray-400 text-lg">
            Building the next generation of cybersecurity professionals through real systems, not shortcuts.
          </p>
        </section>

        {/* Story */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-gray-300 leading-relaxed">
            CyberDragon is a cybersecurity learning platform built for students who want real industry skills,
            not just certificates.
          </p>
          <p className="text-gray-300 leading-relaxed">
            It was created with a simple belief: Cybersecurity cannot be learned by theory alone.
            It must be practiced, structured, and experienced like a real system.
          </p>
        </section>

        {/* Purpose */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Why CyberDragon Exists</h2>
          <p className="text-gray-300 leading-relaxed">
            Most students struggle because learning paths are unclear, content is scattered,
            and platforms focus only on theory. CyberDragon exists to solve this problem.
          </p>
          <p className="text-gray-300 leading-relaxed">
            CyberDragon provides a structured roadmap, practical notes, and real product architecture
            so learners understand how cybersecurity systems work in the real world.
          </p>
        </section>

        {/* Difference */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What Makes CyberDragon Different</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Real authentication systems</li>
            <li>Role-based access control</li>
            <li>Admin panel architecture</li>
            <li>Database integration</li>
            <li>Protected routes</li>
            <li>Production deployment structure</li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            Students are not only learning cybersecurity — they are learning how real platforms are built and secured.
          </p>
        </section>

        {/* Philosophy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Learning Philosophy</h2>
          <p className="text-gray-300 leading-relaxed italic">
            "Learn like a professional, not like a beginner."
          </p>
          <p className="text-gray-300 leading-relaxed">
            CyberDragon follows structured, honest, and practical learning without shortcuts,
            fake promises, or shallow content.
          </p>
        </section>

        {/* Audience */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Who CyberDragon Is For</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Cybersecurity students</li>
            <li>Networking learners</li>
            <li>SOC aspirants</li>
            <li>Pentesting beginners</li>
            <li>System security enthusiasts</li>
          </ul>
        </section>

        {/* Platform Status */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Current Platform Status</h2>
          <p className="text-gray-300 leading-relaxed">
            CyberDragon is currently in MVP stage with authentication, admin panel,
            course structure, database integration, protected routes, and deployment system.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Content, monetization, and community features are being developed step by step.
          </p>
        </section>

        {/* Vision */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            To become a trusted cybersecurity learning platform that produces skilled professionals,
            not just course buyers.
          </p>
        </section>

        {/* Closing */}
        <section className="text-center pt-10 border-t border-gray-800">
          <p className="text-gray-400 text-lg">
            CyberDragon is not a finished product.
          </p>
          <p className="text-white font-semibold text-xl">
            It is a living system.
          </p>
          <p className="text-gray-400">
            And you are watching it grow from its foundation.
          </p>
        </section>

      </div>
    </main>
  );
}
