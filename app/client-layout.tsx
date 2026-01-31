"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ThemeProvider } from "@/lib/theme-context";
import Navbar from "./navbar";
import Footer from "./footer";
import FloatingDragon from "@/components/FloatingDragon";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const protectedPrefixes = [
      "/profile",
      "/dashboard",
      "/admin",
      "/bookmarks",
      "/notifications",
      "/certificates",
      "/onboarding",
      "/courses",
      "/notes",
    ];

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const path = pathname || "/";
      const isProtected = protectedPrefixes.some(
        (prefix) => path === prefix || path.startsWith(`${prefix}/`),
      );

      if (!session) {
        if (isProtected) {
          router.push("/login");
        } else {
          router.refresh();
        }
        return;
      }

      router.refresh();
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [pathname, router]);

  return (
    <ThemeProvider>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
      <FloatingDragon />
    </ThemeProvider>
  );
}
