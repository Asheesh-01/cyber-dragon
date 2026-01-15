import "./globals.css";
import Navbar from "./navbar";

export const metadata = {
  title: "The Cyber Dragon",
  description: "Cybersecurity Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white relative overflow-x-hidden">
        <Navbar />
        <main className="px-6 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
