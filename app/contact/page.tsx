"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 py-12 sm:py-20 pt-28 sm:pt-32">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Have questions? We'd love to hear from you. Reach out to the CyberDragon team.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="mb-4 p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-xs sm:text-sm">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm text-gray-400 block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm text-gray-400 block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm text-gray-400 block mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition resize-none text-sm sm:text-base"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Contact Information</h2>

            <div>
              <h3 className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide mb-2">Email</h3>
              <a href="mailto:contact@cyberdragons.in" className="text-base sm:text-lg text-blue-400 hover:text-blue-300 transition break-all">
                contact@cyberdragons.in
              </a>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide mb-2">Phone</h3>
              <a href="tel:+919876543210" className="text-base sm:text-lg text-blue-400 hover:text-blue-300 transition">
                +91 98765 43210
              </a>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide mb-2">Response Time</h3>
              <p className="text-gray-300 text-sm sm:text-base">Typically within 24 hours</p>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide mb-2">Support Hours</h3>
              <p className="text-gray-300 text-sm sm:text-base">Monday - Friday, 9 AM - 6 PM IST</p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h3 className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide mb-3 sm:mb-4">Follow Us</h3>
              <div className="flex gap-2 sm:gap-3">
                <a href="#" className="px-3 sm:px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition text-xs sm:text-sm">
                  Twitter
                </a>
                <a href="#" className="px-3 sm:px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition text-xs sm:text-sm">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition text-center">
            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">⚡</div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Quick Support</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Get answers to your questions quickly from our expert team.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition text-center">
            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🤝</div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Collaboration</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Partner with us on cybersecurity initiatives and learning programs.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition text-center">
            <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">💬</div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Your Feedback</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Help us improve by sharing your suggestions and feature requests.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}
