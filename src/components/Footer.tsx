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
