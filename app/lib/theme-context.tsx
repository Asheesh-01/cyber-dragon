"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type Language = "en" | "es" | "fr" | "de" | "hi";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "home": "Home",
    "roadmap": "Roadmap",
    "courses": "Courses",
    "labs": "Labs",
    "challenges": "Challenges",
    "dashboard": "Dashboard",
    "about": "About",
    "profile": "Profile",
    "logout": "Logout",
    "login": "Login",
    "admin_panel": "Admin Panel",
    "master_cybersecurity": "Master Cybersecurity with CyberDragon",
    "worlds_best": "World's #1 Cybersecurity Learning Platform",
    "start_learning": "Start Learning",
    "explore_courses": "Explore All Cybersecurity Courses",
    "view_notes": "View All Free Notes",
    "view_roadmap": "View Learning Roadmap",
    "browse_courses": "Browse All Courses",
    "ready_to_start": "Ready to Start Your Cybersecurity Journey?",
  },
  es: {
    "home": "Inicio",
    "roadmap": "Mapa de ruta",
    "courses": "Cursos",
    "labs": "Laboratorios",
    "challenges": "Desafíos",
    "dashboard": "Panel",
    "about": "Acerca de",
    "profile": "Perfil",
    "logout": "Cerrar sesión",
    "login": "Iniciar sesión",
  },
  fr: {
    "home": "Accueil",
    "roadmap": "Feuille de route",
    "courses": "Cours",
    "labs": "Laboratoires",
    "challenges": "Défis",
    "dashboard": "Tableau de bord",
    "about": "À propos",
    "profile": "Profil",
    "logout": "Déconnexion",
    "login": "Connexion",
  },
  de: {
    "home": "Startseite",
    "roadmap": "Fahrplan",
    "courses": "Kurse",
    "labs": "Labore",
    "challenges": "Herausforderungen",
    "dashboard": "Dashboard",
    "about": "Über",
    "profile": "Profil",
    "logout": "Abmelden",
    "login": "Anmelden",
  },
  hi: {
    "home": "होम",
    "roadmap": "रोडमैप",
    "courses": "पाठ्यक्रम",
    "labs": "लैब्स",
    "challenges": "चुनौतियाँ",
    "dashboard": "डैशबोर्ड",
    "about": "परिचय",
    "profile": "प्रोफ़ाइल",
    "logout": "लॉगआउट",
    "login": "लॉगिन",
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
    const savedLang = (localStorage.getItem("language") as Language) || "en";
    setThemeState(savedTheme);
    setLanguageState(savedLang);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme: Theme) => {
    const isDarkMode =
      selectedTheme === "dark" ||
      (selectedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(isDarkMode);
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  if (!mounted) {
    return children;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, isDark, language, setLanguage, t }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return default values if context is not available (during SSR/prerendering)
    return {
      theme: "system" as Theme,
      setTheme: () => {},
      isDark: true,
      language: "en" as Language,
      setLanguage: () => {},
      t: (key: string) => translations["en"][key] || key,
    };
  }
  return context;
}
