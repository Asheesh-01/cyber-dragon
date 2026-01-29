"use client";

import { ThemeProvider } from "@/lib/theme-context";
import Navbar from "./navbar";
import Footer from "./footer";
import FloatingDragon from "@/components/FloatingDragon";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
      <FloatingDragon />
    </ThemeProvider>
  );
}
