export const metadata = {
  title: "Privacy Policy – CyberDragon",
  description: "Privacy policy and data protection information for CyberDragon platform.",
  alternates: {
    canonical: "https://www.cyberdragons.in/legal/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              CyberDragon ("we" or "us" or "our") operates the CyberDragon platform (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Types of Data Collected:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Personal Data:</strong> Email address, name, phone number, and profile information</li>
              <li><strong>Usage Data:</strong> Browsing history, pages visited, time spent, and interactions</li>
              <li><strong>Learning Data:</strong> Progress, completed courses, quizzes, and assessments</li>
              <li><strong>Technical Data:</strong> IP address, browser type, operating system, and device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Use of Data</h2>
            <p>CyberDragon uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>To track, monitor, and analyze trends, usage, and activities</li>
              <li>To improve your experience and optimize the Service</li>
              <li>To detect and prevent fraudulent transactions and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Modified" date above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@cyberdragons.in
            </p>
          </section>

          <div className="pt-8 border-t border-white/10 text-sm text-gray-500">
            <p>Last Modified: January 2026</p>
          </div>
        </div>
      </div>
    </main>
  );
}
