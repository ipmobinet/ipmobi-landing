"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";
import { Globe, ChevronRight } from "@/components/ui/Icons";
import type { Locale } from "@/lib/translations";

const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "RU" },
];

const navLinks: { key: string; href: string; label?: string; sublinks?: { label: string; href: string }[] }[] = [
  { key: "navUseCases", href: "#usecases" },
  { key: "navInfra", href: "#infrastructure" },
  { key: "navAPI", href: "#developers" },
  { key: "navPricing", href: "#pricing" },
  { key: "", href: "/tools", label: "Tools",
    sublinks: [
      { label: "IP Detective", href: "/tools" },
      { label: "WebRTC Leak Test", href: "/tools" },
      { label: "DNS Leak Test", href: "/tools" },
      { label: "IP Reputation", href: "/tools" },
      { label: "Browser Fingerprint", href: "/tools" },
    ]
  },
  { key: "navTrial", href: "/trial" },
];

export default function Navbar() {
  const { lang, t, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navBg = scrolled
    ? "bg-[#030712]/80 backdrop-blur-xl border-b border-surface-border"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <Globe size={22} className="text-emerald-400" />
          <span className="text-white">
            IPMOBI<span className="text-emerald-400">.</span>
            <span className="text-slate-400 font-normal">NET</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {link.label || t(link.key as any)}
            </a>
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-surface-card"
            >
              <Globe size={14} />
              <span>{locales.find((l) => l.code === lang)?.label}</span>
              <ChevronRight
                size={12}
                className={`transition-transform ${langOpen ? "rotate-90" : ""}`}
              />
            </button>
            {langOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setLangOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-32 bg-surface-card border border-surface-border rounded-lg shadow-xl z-20 py-1">
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        lang === l.code
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-slate-400 hover:text-white hover:bg-surface-lighter"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Client Portal */}
          <Link
            href="/login"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            {t("clientPortal")}
          </Link>

          {/* Order Port */}
          <a
            href="#pricing"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            {t("orderPort")}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[2px] bg-slate-300 transition-transform ${
              mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-slate-300 transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-slate-300 transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-[#030712] z-40 transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-xl text-slate-300 hover:text-emerald-400 transition-colors"
            >
              {t(link.key as any)}
            </a>
          ))}

          <div className="flex gap-3 mt-4">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                }}
                className={`px-3 py-1.5 rounded text-sm border transition-colors ${
                  lang === l.code
                    ? "border-emerald-500 text-emerald-400"
                    : "border-surface-border text-slate-400 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="text-lg text-slate-400 hover:text-white transition-colors"
          >
            {t("clientPortal")}
          </Link>

          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="text-lg font-medium px-6 py-3 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            {t("orderPort")}
          </a>
        </div>
      </div>
    </header>
  );
}
