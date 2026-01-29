"use client";

import { useState, useEffect } from "react";
import { X, Home, MessageSquare, HelpCircle, Send } from "lucide-react";

export default function FloatingDragon() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [userName, setUserName] = useState("Learner");
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setSubmitStatus("idle");
          setActiveTab("home");
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Dragon Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-40 text-5xl hover:scale-125 transition-transform duration-300 hover:drop-shadow-lg"
        title={isOpen ? "Close Help" : "Help & Support"}
      >
        {isOpen ? "💬" : "🐉"}
      </button>

      {/* Dragon Panel */}
      {isMounted && isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[90vw]">
          <div className="bg-slate-900 rounded-3xl w-full max-h-[600px] flex flex-col shadow-2xl border border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
              >
                <X size={24} />
              </button>

              <div className="flex items-start gap-4">
                <div className="text-4xl">🐉</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">Hey {userName}! 👋</h2>
                  <p className="text-slate-300 text-lg">How can we help?</p>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "home" && (
                <div className="space-y-4">
                  <button
                    onClick={() => setActiveTab("contact")}
                    className="block w-full p-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-blue-100 transition flex items-center justify-between group"
                  >
                    <span>Send us a message</span>
                    <span className="group-hover:translate-x-1 transition">→</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("about")}
                    className="block w-full p-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition flex items-center justify-between"
                  >
                    <span>About CyberDragon</span>
                    <span>↗</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("features")}
                    className="block w-full p-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition flex items-center justify-between"
                  >
                    <span>Platform Features</span>
                    <span>↗</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("learning")}
                    className="block w-full p-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition flex items-center justify-between"
                  >
                    <span>Learning Paths</span>
                    <span>↗</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("faq")}
                    className="block w-full p-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition flex items-center justify-between"
                  >
                    <span>FAQ & Support</span>
                    <span>↗</span>
                  </button>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="space-y-4">
                  <button
                    onClick={() => setActiveTab("home")}
                    className="text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-1"
                  >
                    ← Back
                  </button>
                  <h3 className="text-xl font-bold text-white mb-4">Send us a message</h3>
                  
                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                      <p className="text-green-400 font-semibold">✓ Message sent successfully!</p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                      <p className="text-red-400 font-semibold">✗ Failed to send. Try again.</p>
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                        placeholder="Your message..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
                    >
                      <Send size={18} />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "about" && (
                <div className="space-y-4">
                  <button
                    onClick={() => setActiveTab("home")}
                    className="text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-1"
                  >
                    ← Back
                  </button>
                  <h3 className="text-xl font-bold text-white mb-3">About CyberDragon 🐉</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    CyberDragon is your comprehensive platform for learning cybersecurity from zero to hero. We provide structured learning paths, hands-on labs, and real-world projects.
                  </p>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="text-blue-400 font-semibold mb-2">Our Mission</h4>
                    <p className="text-slate-300 text-sm">To democratize cybersecurity education and create skilled professionals ready for the industry.</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="text-blue-400 font-semibold mb-2">Why Choose Us?</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>✓ Structured learning roadmap</li>
                      <li>✓ Hands-on labs & projects</li>
                      <li>✓ Industry-recognized path</li>
                      <li>✓ Free & premium content</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "features" && (
                <div className="space-y-4">
                  <button
                    onClick={() => setActiveTab("home")}
                    className="text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-1"
                  >
                    ← Back
                  </button>
                  <h3 className="text-xl font-bold text-white mb-3">Platform Features</h3>
                  <div className="space-y-3">
                    <div className="bg-slate-800 p-3 rounded-lg">
                      <h4 className="text-blue-400 font-semibold mb-1">📚 Structured Roadmap</h4>
                      <p className="text-slate-300 text-sm">10 volumes covering fundamentals to advanced security</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg">
                      <h4 className="text-blue-400 font-semibold mb-1">🔬 Hands-On Labs</h4>
                      <p className="text-slate-300 text-sm">Real-world security scenarios and challenges</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg">
                      <h4 className="text-blue-400 font-semibold mb-1">📊 Progress Tracking</h4>
                      <p className="text-slate-300 text-sm">Dashboard with streaks, hours, and certificates</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg">
                      <h4 className="text-blue-400 font-semibold mb-1">🏆 Achievements</h4>
                      <p className="text-slate-300 text-sm">Earn badges and certificates as you progress</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg">
                      <h4 className="text-blue-400 font-semibold mb-1">👥 Community</h4>
                      <p className="text-slate-300 text-sm">Connect with learners and security professionals</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "learning" && (
                <div className="space-y-4">
                  <button
                    onClick={() => setActiveTab("home")}
                    className="text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-1"
                  >
                    ← Back
                  </button>
                  <h3 className="text-xl font-bold text-white mb-3">Learning Paths</h3>
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-blue-600/20 to-blue-400/20 p-4 rounded-lg border border-blue-500/30">
                      <h4 className="text-blue-300 font-semibold mb-2">🛡️ Security Engineer Path</h4>
                      <p className="text-slate-300 text-sm mb-2">10 volumes • 120+ topics • 100+ hours</p>
                      <p className="text-slate-400 text-xs">Master networking, Linux, programming, security foundations, and more.</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600/20 to-purple-400/20 p-4 rounded-lg border border-purple-500/30">
                      <h4 className="text-purple-300 font-semibold mb-2">🔍 SOC Analyst Track</h4>
                      <p className="text-slate-300 text-sm mb-2">Security Operations Center specialization</p>
                      <p className="text-slate-400 text-xs">Learn SIEM, log analysis, threat hunting, and incident response.</p>
                    </div>
                    <div className="bg-gradient-to-r from-red-600/20 to-red-400/20 p-4 rounded-lg border border-red-500/30">
                      <h4 className="text-red-300 font-semibold mb-2">⚔️ Penetration Testing</h4>
                      <p className="text-slate-300 text-sm mb-2">Ethical hacking and security assessment</p>
                      <p className="text-slate-400 text-xs">Learn reconnaissance, exploitation, and vulnerability assessment.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "faq" && (
                <div className="space-y-4">
                  <button
                    onClick={() => setActiveTab("home")}
                    className="text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-1"
                  >
                    ← Back
                  </button>
                  <h3 className="text-xl font-bold text-white mb-3">FAQ & Support</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-1">Is CyberDragon free?</h4>
                      <p className="text-slate-300">Yes! Core learning paths and resources are free. Premium content coming soon.</p>
                    </div>
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-1">Do I get certificates?</h4>
                      <p className="text-slate-300">Yes! Earn certificates upon completing full learning volumes.</p>
                    </div>
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-1">How long does it take?</h4>
                      <p className="text-slate-300">Depends on your pace. Average 3-6 months for full Security Engineer path.</p>
                    </div>
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-1">Need more help?</h4>
                      <p className="text-slate-300">Contact us using the "Send us a message" option above.</p>
                    </div>


                  </div>
                </div>
              )}

              {activeTab === "messages" && (
                <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Send us a message</h3>
                
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg mb-4">
                    <p className="text-green-400 font-semibold">✓ Message sent successfully!</p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg mb-4">
                    <p className="text-red-400 font-semibold">✗ Failed to send. Try again.</p>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
                </div>
              )}

              {activeTab === "help" && (
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white mb-3">Help & Guidance</h3>
                  
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="text-blue-400 font-semibold mb-2">🚀 Getting Started</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• Create a free account or login</li>
                      <li>• Start with the Roadmap or Courses</li>
                      <li>• Follow the Security Engineer path</li>
                      <li>• Complete topics and earn progress</li>
                      <li>• Track your streak & achievements</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="text-blue-400 font-semibold mb-2">📚 How to Use Website</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• <strong>Roadmap:</strong> View learning paths</li>
                      <li>• <strong>Courses:</strong> Access course materials</li>
                      <li>• <strong>Labs:</strong> Practice with hands-on labs</li>
                      <li>• <strong>Notes:</strong> Study comprehensive notes</li>
                      <li>• <strong>Challenges:</strong> Test your skills</li>
                      <li>• <strong>Dashboard:</strong> Track your progress</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800 p-4 rounded-lg">
                    <h4 className="text-blue-400 font-semibold mb-2">❓ Need Help?</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• Check FAQ section in Home tab</li>
                      <li>• Visit Platform Features for info</li>
                      <li>• Contact us via Messages tab</li>
                      <li>• Email: support@cyberdragon.com</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-blue-600/20 to-blue-400/20 p-4 rounded-lg border border-blue-500/30">
                    <p className="text-blue-300 text-sm">💡 <strong>Pro Tip:</strong> Take your time with each module. Consistent learning beats rushing!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Tabs */}
            <div className="border-t border-slate-700 bg-slate-800 flex">
              <button
                onClick={() => setActiveTab("home")}
                className={`flex-1 py-4 flex items-center justify-center gap-2 transition ${
                  activeTab === "home" ? "text-blue-400 border-t-2 border-blue-400" : "text-slate-400 hover:text-white"
                }`}
              >
                <Home size={20} />
                <span className="text-sm">Home</span>
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className={`flex-1 py-4 flex items-center justify-center gap-2 transition ${
                  activeTab === "messages" ? "text-blue-400 border-t-2 border-blue-400" : "text-slate-400 hover:text-white"
                }`}
              >
                <MessageSquare size={20} />
                <span className="text-sm">Messages</span>
              </button>
              <button
                onClick={() => setActiveTab("help")}
                className={`flex-1 py-4 flex items-center justify-center gap-2 transition ${
                  activeTab === "help" ? "text-blue-400 border-t-2 border-blue-400" : "text-slate-400 hover:text-white"
                }`}
              >
                <HelpCircle size={20} />
                <span className="text-sm">Help</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}




