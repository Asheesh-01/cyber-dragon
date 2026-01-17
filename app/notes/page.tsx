export const metadata = {
  title: "CyberDragon Notes – Cybersecurity Study Notes",
  description:
    "Access structured cybersecurity notes for networking, security, and system protection.",
};

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-4xl font-bold mb-6">
        Free Cybersecurity Notes
      </h1>

      <p className="text-gray-400 text-center max-w-xl mb-6">
        Here you will find free, structured notes for cybersecurity fundamentals.
        More content will be added regularly.
      </p>

      <ul className="text-gray-400 space-y-3 text-center">
        <li>• Networking Basics Notes</li>
        <li>• Linux Commands Notes</li>
        <li>• Web Security Notes</li>
        <li>• Cryptography Basics</li>
        <li>• OWASP Top 10</li>
      </ul>

    </main>
  );
}
