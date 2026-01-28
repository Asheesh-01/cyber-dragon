import Link from "next/link";

export const metadata = {
  title: "CyberDragon Notes – Cybersecurity Study Notes",
  description:
    "Access structured cybersecurity notes for networking, security, and system protection.",
};

const notes = [
  // {
  //   title: "Networking Basics",
  //   slug: "networking-basics",
  //   category: "Foundation",
  //   description: "Understand how networks work in cybersecurity.",
  // },
  // {
  //   title: "Linux Fundamentals",
  //   slug: "linux-fundamentals",
  //   category: "Foundation",
  //   description: "Learn Linux commands and system usage for security.",
  // },
  {
    title: "Security Engineer or Cloud Security",
    slug: "Security Engineer",
    category: "Security",
    description: "Understand common web vulnerabilities and defenses.",
  },
  // {
  //   title: "Cryptography Basics",
  //   slug: "cryptography-basics",
  //   category: "Security",
  //   description: "Learn encryption, hashing, and digital signatures.",
  // },
  // {
  //   title: "OWASP Top 10",
  //   slug: "owasp-top-10",
  //   category: "Web Security",
  //   description: "Top 10 critical web application risks.",
  // },
  // {
  //   title: "Operating Systems",
  //   slug: "operating-systems",
  //   category: "Core",
  //   description: "Process, memory, and file system concepts.",
  // },
  // {
  //   title: "IP Addressing",
  //   slug: "ip-addressing",
  //   category: "Networking",
  //   description: "IPv4, IPv6, CIDR and subnetting.",
  // },
  // {
  //   title: "MAC Address",
  //   slug: "mac-address",
  //   category: "Networking",
  //   description: "Understanding MAC address and ARP.",
  // },
];

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-black text-white px-10 py-20 py-16">

      <h1 className="text-4xl font-bold text-center mb-4">
        Cybersecurity Notes
      </h1>

      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
        Free structured cybersecurity notes. Click any topic to start learning.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {notes.map((note, i) => (
          <Link

  key={i}
  href={`/notes/${note.slug}`}
  className="group"
>

  <div
    className="
      bg-white/5 backdrop-blur-xl
      border border-white/10
      rounded-xl p-6
      transition-all duration-300 ease-out
      hover:-translate-y-2
      hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]
    "
  >

    <div
      className="
        h-32 bg-gray-800 rounded mb-4
        flex items-center justify-center text-gray-500
        transition-transform duration-300
        group-hover:scale-105
      "
    >
      Notes Image
    </div>

    <h2 className="text-xl font-bold">{note.title}</h2>

    <p className="text-sm text-gray-400 mt-1">{note.category}</p>

    <p className="text-gray-300 mt-3 text-sm">
      {note.description}
    </p>

    <p className="mt-4 text-blue-400 font-semibold">
      Free
    </p>

  </div>

</Link>

        ))}

      </div>

    </main>
  );
}
