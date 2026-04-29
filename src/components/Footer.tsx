"use client";

import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";
import { Globe } from "@/components/ui/Icons";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-surface-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold tracking-tight mb-4"
            >
              <Globe size={22} className="text-emerald-400" />
              <span className="text-white">
                IPMOBI<span className="text-emerald-400">.</span>
                <span className="text-slate-400 font-normal">NET</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {t("ftDesc")}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t("ftPlat")}
            </h3>
            <ul className="space-y-3">
              {[
                { key: "navUseCases", href: "#usecases" },
                { key: "navInfra", href: "#infrastructure" },
                { key: "navAPI", href: "#developers" },
                { key: "navPricing", href: "#pricing" },
              ].map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    {t(item.key as any)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t("ftLegal")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  {t("ftTOS")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  {t("ftPriv")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Info */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@ipmobi.net"
                  className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  support@ipmobi.net
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/IPMobiNetBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.127.087.669.087.669l-1.488 7.013c-.123.555-.456.69-.771.44-.346-.275-2.148-1.4-2.574-1.666-.346-.216-.688-.324-.06-.58l3.123-2.1c.34-.25.174-.535-.19-.314l-4.656 3c-.29.175-.554.1-.647-.12l-1.26-3.123c-.225-.543.107-.766.44-.913.28-.123.547-.17.855-.034l4.198 1.685c.36.128.69-.043.542-.33L8.557 8.137c-.165-.307.034-.648.335-.733.53-.154 1-.333 1.677-.546.688-.218 1.288-.412 1.755-.662.54-.293.72-.12.72-.12s.273.048.462.132z"/>
                  </svg>
                  @IPMobiNetBot
                </a>
              </li>
              <li className="text-sm text-slate-500">
                Shah Alam, Selangor
                <br />
                Malaysia
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-xs text-slate-600 text-center lg:text-left">
            {t("ftCopy")}
          </p>
        </div>
      </div>
    </footer>
  );
}
