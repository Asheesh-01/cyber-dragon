export const metadata = {
  title: "CyberDragon Roadmap – Cybersecurity Learning Path",
  description:
    "Follow CyberDragon's structured cybersecurity learning roadmap for beginners to advanced learners.",
};

const roadmapSteps = [
  { step: 1, title: "Networking Fundamentals", description: "Learn OSI model, TCP/IP, and network basics" },
  { step: 2, title: "Linux & OS Basics", description: "Master Linux commands and system administration" },
  { step: 3, title: "Web Technologies", description: "Understand HTTP, DNS, web protocols" },
  { step: 4, title: "Cybersecurity Fundamentals", description: "Core security concepts and principles" },
  { step: 5, title: "Ethical Hacking", description: "Penetration testing and vulnerability assessment" },
  { step: 6, title: "SOC & Blue Team", description: "Incident response and threat detection" },
  { step: 7, title: "Cloud Security", description: "Secure cloud infrastructure and services" },
  { step: 8, title: "Advanced Specialization", description: "Deep dive into specialized security domains" },
];

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 py-12 sm:py-20 pt-28 sm:pt-32">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Cybersecurity Roadmap
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Follow our structured learning path from beginner to advanced professional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {roadmapSteps.map((item) => (
            <div key={item.step} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition group">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center font-bold text-sm sm:text-lg group-hover:scale-110 transition">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
