import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/cyberdragons-in", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/cyber-dragon-5756943a9", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/Cyberdragons_in", label: "X" },
    { icon: Youtube, href: "https://www.youtube.com/@cyberdragons_in", label: "YouTube" },
    { icon: Instagram, href: "https://www.instagram.com/cyberdragons.in/", label: "Instagram" },
    { icon: Mail, href: "mailto:cyberdragons.in@gmail.com", label: "Email" },
  ];

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "Home", href: "/" },
        { label: "Roadmap", href: "/roadmap" },
        { label: "Labs", href: "/labs" },
        { label: "Notes", href: "/notes" },
        { label: "Challenges", href: "/challenges" },
        { label: "Dashboard", href: "/dashboard" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Courses", href: "/courses" },
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Terms of Service", href: "/legal/terms" },
        { label: "Cookie Policy", href: "/legal/cookies" },
        { label: "Security", href: "/security" },
      ],
    },
  ];

  return (
    <footer className="bg-black border-t border-white/10">
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* BRAND SECTION */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">The Cyber Dragon</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Enterprise-grade cybersecurity learning platform. Master pentesting, cloud security, and more.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-600/50 flex items-center justify-center hover:bg-blue-600/40 hover:border-blue-500 transition"
                  title={label}
                  aria-label={label}
                >
                  <Icon size={18} className="text-blue-300" />
                </a>
              ))}
            </div>
          </div>

          {/* FOOTER LINKS SECTIONS */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <div className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-400 hover:text-blue-300 transition text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-8" />

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* COPYRIGHT */}
          <p className="text-gray-500 text-sm">
            © {currentYear} The Cyber Dragon. All rights reserved. | Built with ❤️ for the cybersecurity community.
          </p>

          {/* QUICK STATS */}
          <div className="flex gap-8 text-sm">
            <div className="text-center">
              <p className="text-blue-300 font-semibold">500+</p>
              <p className="text-gray-500">Challenges</p>
            </div>
            <div className="text-center">
              <p className="text-blue-300 font-semibold">100+</p>
              <p className="text-gray-500">Labs</p>
            </div>
            <div className="text-center">
              <p className="text-blue-300 font-semibold">10K+</p>
              <p className="text-gray-500">Active Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* ACCESSIBILITY & CREDITS */}
      <div className="bg-black/50 border-t border-white/5 py-4 px-6 text-center text-xs text-gray-600">
        <p>
          Designed with accessibility in mind. Have feedback?{" "}
          <a href="/contact" className="text-blue-400 hover:text-blue-300">
            Get in touch
          </a>
        </p>
      </div>
    </footer>
  );
}
