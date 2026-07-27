"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { getProjectBySlug } from "@/src/data/projects";
import { siteCopy, type Locale, type SiteCopy } from "@/src/i18n/siteCopy";

type LanguageContextValue = {
  locale: Locale;
  copy: SiteCopy;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const localeNames: Record<Locale, string> = { zh: "中文", en: "English", ja: "日本語" };
const htmlLanguages: Record<Locale, string> = { zh: "zh-CN", en: "en", ja: "ja" };

function detectLocale(): Locale {
  const urlLocale = new URLSearchParams(window.location.search).get("lang");
  if (urlLocale === "zh" || urlLocale === "en" || urlLocale === "ja") return urlLocale;
  const saved = window.localStorage.getItem("site-locale");
  if (saved === "zh" || saved === "en" || saved === "ja") return saved;
  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith("ja")) return "ja";
  if (browserLanguage.startsWith("en")) return "en";
  return "zh";
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, updateLocale] = useState<Locale>("zh");
  const pathname = usePathname();

  useEffect(() => {
    const timer = window.setTimeout(() => updateLocale(detectLocale()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLanguages[locale];
    document.documentElement.dataset.locale = locale;
    const copy = siteCopy[locale];
    const normalizedPath = pathname.replace(/\/+$/, "") || "/";
    let title = copy.meta.title;
    if (normalizedPath === "/about") title = `${copy.about.title} | ${copy.common.brand}`;
    if (normalizedPath === "/projects") title = `${copy.projects.title} | ${copy.common.brand}`;
    if (normalizedPath.startsWith("/projects/")) {
      const slug = normalizedPath.split("/").pop() ?? "";
      const project = getProjectBySlug(slug, locale);
      if (project) title = `${project.title} | ${copy.common.brand}`;
    }
    document.title = title;
  }, [locale, pathname]);

  const setLocale = (nextLocale: Locale) => {
    updateLocale(nextLocale);
    window.localStorage.setItem("site-locale", nextLocale);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLocale);
    window.history.replaceState(window.history.state, "", url);
  };

  const value = useMemo(
    () => ({ locale, copy: siteCopy[locale] as SiteCopy, setLocale }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, copy, setLocale } = useLanguage();
  return (
    <div className={`language-switcher${compact ? " compact" : ""}`} role="group" aria-label={copy.common.languageLabel}>
      {(["zh", "en", "ja"] as Locale[]).map((item) => (
        <button
          type="button"
          key={item}
          className={locale === item ? "active" : ""}
          aria-pressed={locale === item}
          aria-label={localeNames[item]}
          title={localeNames[item]}
          onClick={() => setLocale(item)}
        >
          {item === "zh" ? "中" : item === "en" ? "EN" : "日"}
        </button>
      ))}
      <span className="sr-only" aria-live="polite">{copy.common.languageChanged}</span>
    </div>
  );
}

export function LocalizedSkipLink() {
  const { copy } = useLanguage();
  return <a className="skip-link" href="#main-content">{copy.common.skip}</a>;
}
