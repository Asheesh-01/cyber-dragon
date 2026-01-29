import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CyberDragon – Learn Cybersecurity",
  description: "Learn about CyberDragon's mission to build the next generation of cybersecurity professionals through real industry practices.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-16 min-h-[70vh]">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center leading-tight mb-4">
          About CyberDragon
        </h1>

        <p className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-200">
          Building the next generation of cybersecurity professionals
        </p>

        <p className="text-gray-400 text-center max-w-2xl mx-auto text-sm sm:text-base">
          Through real systems, structured learning, and practical experience—not shortcuts or empty promises.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="px-4 sm:px-6 py-6 sm:py-20 bg-white/5 backdrop-blur-sm w-full">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                CyberDragon is a cybersecurity learning platform built for students who want real industry skills, not just certificates.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                It was created with a simple belief: Cybersecurity cannot be learned by theory alone. It must be practiced, structured, and experienced like a real system.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We saw students struggling because learning paths are unclear, content is scattered, and platforms focus only on theory. CyberDragon exists to change that.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-400/5 border border-blue-500/30 rounded-2xl p-8 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🐉</div>
                <p className="text-2xl font-bold text-blue-300">CyberDragon</p>
                <p className="text-gray-400 text-sm mt-2">Learn. Practice. Master.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist Section */}
      <section className="px-4 sm:px-6 py-6 sm:py-20 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why CyberDragon Exists</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            We identified a gap in cybersecurity education and created a platform to fill it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition">
            <div className="text-3xl mb-4">❌</div>
            <h3 className="text-lg sm:text-xl font-bold mb-3">The Problem</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Unclear learning paths</li>
              <li>• Scattered content</li>
              <li>• Theory-only platforms</li>
              <li>• No real-world experience</li>
              <li>• Empty promises</li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition">
            <div className="text-3xl mb-4">✅</div>
            <h3 className="text-lg sm:text-xl font-bold mb-3">Our Solution</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Structured roadmaps</li>
              <li>• Practical notes</li>
              <li>• Real product architecture</li>
              <li>• Hands-on labs</li>
              <li>• Industry-focused curriculum</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="px-4 sm:px-6 py-6 sm:py-20 bg-white/5 backdrop-blur-sm w-full">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Makes CyberDragon Different</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              We teach how real platforms are built and secured, not just theory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition">
              <div className="text-3xl mb-4">🔐</div>
              <h3 className="text-lg font-bold mb-3">Real Authentication</h3>
              <p className="text-gray-400 text-sm">Learn how actual authentication systems work, from theory to implementation.</p>
            </div>

            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-lg font-bold mb-3">Role-Based Access</h3>
              <p className="text-gray-400 text-sm">Understand how permissions and access controls work in real systems.</p>
            </div>

            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-lg font-bold mb-3">Admin Architecture</h3>
              <p className="text-gray-400 text-sm">Learn the patterns used in real admin panels and management systems.</p>
            </div>

            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition">
              <div className="text-3xl mb-4">💾</div>
              <h3 className="text-lg font-bold mb-3">Database Integration</h3>
              <p className="text-gray-400 text-sm">Master data security, queries, and database-level security practices.</p>
            </div>

            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-lg font-bold mb-3">Protected Routes</h3>
              <p className="text-gray-400 text-sm">Learn application-level security and route protection mechanisms.</p>
            </div>

            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-bold mb-3">Production Deployment</h3>
              <p className="text-gray-400 text-sm">Understand how real systems are deployed and secured in production.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="px-4 sm:px-6 py-6 sm:py-20 max-w-5xl mx-auto w-full">
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-400/10 border border-blue-500/30 rounded-2xl p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Learning Philosophy</h2>
          <p className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-300 italic">
            "Learn like a professional, not like a beginner."
          </p>
          <p className="text-gray-300 text-center text-base sm:text-lg leading-relaxed">
            CyberDragon follows structured, honest, and practical learning without shortcuts, fake promises, or shallow content. We believe in depth, not breadth. Quality over quantity. Real skills over certificates.
          </p>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="px-4 sm:px-6 py-6 sm:py-20 bg-white/5 backdrop-blur-sm w-full">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Who CyberDragon Is For</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              If you want to learn real cybersecurity skills, you're in the right place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <p className="text-lg font-bold mb-2">🎓 Cybersecurity Students</p>
              <p className="text-gray-400 text-sm">Want to master cybersecurity from fundamentals to advanced concepts.</p>
            </div>
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <p className="text-lg font-bold mb-2">🌐 Networking Learners</p>
              <p className="text-gray-400 text-sm">Want to understand networks and their security implications.</p>
            </div>
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <p className="text-lg font-bold mb-2">🔍 SOC Aspirants</p>
              <p className="text-gray-400 text-sm">Want to become Security Operations Center professionals.</p>
            </div>
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <p className="text-lg font-bold mb-2">🕵️ Pentesting Beginners</p>
              <p className="text-gray-400 text-sm">Want to learn ethical hacking and penetration testing.</p>
            </div>
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <p className="text-lg font-bold mb-2">⚡ Security Enthusiasts</p>
              <p className="text-gray-400 text-sm">Want to stay updated with the latest security practices.</p>
            </div>
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <p className="text-lg font-bold mb-2">💼 Career Changers</p>
              <p className="text-gray-400 text-sm">Want to transition into cybersecurity as a career.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Status Section */}
      <section className="px-4 sm:px-6 py-6 sm:py-20 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Current Platform Status</h2>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 mb-6">
          <h3 className="text-xl font-bold mb-4 text-blue-400">✅ Live Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <p className="text-gray-300 text-sm">✓ User Authentication System</p>
            <p className="text-gray-300 text-sm">✓ Admin Panel Architecture</p>
            <p className="text-gray-300 text-sm">✓ Course Structure & Management</p>
            <p className="text-gray-300 text-sm">✓ Database Integration</p>
            <p className="text-gray-300 text-sm">✓ Protected Routes & RBAC</p>
            <p className="text-gray-300 text-sm">✓ Production Deployment System</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl font-bold mb-4 text-blue-400">🚀 Coming Soon</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <p className="text-gray-300 text-sm">→ Premium Course Content</p>
            <p className="text-gray-300 text-sm">→ Monetization System</p>
            <p className="text-gray-300 text-sm">→ Community Features</p>
            <p className="text-gray-300 text-sm">→ Progress Tracking</p>
            <p className="text-gray-300 text-sm">→ Certificates</p>
            <p className="text-gray-300 text-sm">→ More Security Paths</p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-4 sm:px-6 py-6 sm:py-20 bg-white/5 backdrop-blur-sm w-full">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Vision</h2>
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-400/10 border border-blue-500/30 rounded-2xl p-8 sm:p-12">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              To become a trusted cybersecurity learning platform that produces skilled professionals, not just course buyers.
            </p>
            <p className="text-blue-300 font-semibold text-lg">
              We're not a finished product. We're a living system growing with every lesson learned.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="px-4 sm:px-6 py-6 sm:py-20 max-w-5xl mx-auto w-full text-center">
        <div className="border-t border-gray-800 pt-12">
          <p className="text-gray-400 text-lg mb-4">
            CyberDragon is not a finished product.
          </p>
          <p className="text-white font-semibold text-2xl mb-4">
            It is a living system.
          </p>
          <p className="text-gray-400 text-lg">
            And you are watching it grow from its foundation.
          </p>
        </div>
      </section>
    </main>
  );
}
