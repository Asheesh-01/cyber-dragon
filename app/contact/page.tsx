export const metadata = {
  title: "Contact CyberDragon – Cybersecurity Learning Platform",
  description:
    "Contact CyberDragon for support, feedback, and collaboration in cybersecurity learning.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-4xl font-bold mb-6">
        Contact Us
      </h1>

      <p className="text-gray-400 text-center max-w-xl mb-6">
        Have questions or need help? Reach out to The Cyber Dragon team.
      </p>

      <div className="bg-gray-900 p-6 rounded w-full max-w-md">

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 mb-4 rounded bg-black border border-gray-600 text-white"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 mb-4 rounded bg-black border border-gray-600 text-white"
        />

        <textarea
          placeholder="Your Message"
          className="w-full p-2 mb-4 rounded bg-black border border-gray-600 text-white"
        />

        <button className="w-full p-2 bg-white text-black rounded hover:bg-gray-300">
          Send Message
        </button>

      </div>

    </main>
  );
}
