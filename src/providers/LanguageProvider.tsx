"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { dict, type Locale, type LangKey } from "@/lib/translations";

interface LanguageContextValue {
  lang: Locale;
  setLang: (locale: Locale) => void;
  t: (key: LangKey) => string;
  locale: Locale;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Locale {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("ipmobi-lang") as Locale | null;
    if (stored && (stored === "en" || stored === "zh" || stored === "ru")) {
      return stored;
    }
    const path = window.location.pathname;
    if (path.startsWith("/zh")) return "zh";
    if (path.startsWith("/ru")) return "ru";
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>(getInitialLang);

  const setLang = useCallback((locale: Locale) => {
    setLangState(locale);
    if (typeof window !== "undefined") {
      localStorage.setItem("ipmobi-lang", locale);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("ipmobi-lang") as Locale | null;
    if (stored && (stored === "en" || stored === "zh" || stored === "ru")) {
      setLangState(stored);
    }
  }, []);

  const tFn = useCallback(
    (key: LangKey): string => {
      return dict[lang][key];
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: tFn, locale: lang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
