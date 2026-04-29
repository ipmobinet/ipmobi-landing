"use client";

import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import {
  Code,
  ChevronRight,
  CheckCircle2,
  Server,
  Lock,
  ArrowLeft,
  Activity,
  Zap,
  Terminal,
  Users,
  ShoppingCart,
  ExternalLink,
} from "@/components/ui/Icons";
import { codeSamples, jsonOutput } from "./constants";

const tabs = ["cURL", "Python", "Node.js"] as const;

export default function Home() {
  const { t, lang } = useLanguage();
  const [codeTab, setCodeTab] = useState<(typeof tabs)[number]>("cURL");

  const samples = codeSamples[lang] || codeSamples.en;
  const activeCode =
    codeTab === "cURL"
      ? samples.curl
      : codeTab === "Python"
        ? samples.python
        : samples.node;

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        {/* Gradient background blurs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] animate-glow-pulse" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] animate-glow-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-emerald-400/10 rounded-full blur-[80px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#030712_0%,transparent_70%)]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-card/80 border border-surface-border text-xs sm:text-sm text-slate-300 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            {t("heroBadge")}
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
            <span className="text-white">{t("heroTitle1")}</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
              {t("heroTitle2")}
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed mb-10">
            {t("heroDesc")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="/trial"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              Get Started
              <ChevronRight size={18} />
            </a>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-surface-border text-slate-300 font-medium hover:border-emerald-500/50 hover:text-white transition-all"
            >
              {t("deployBtn")}
              <ChevronRight size={18} />
            </a>
            <a
              href="https://docs.ipmobi.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-surface-border text-slate-300 font-medium hover:border-emerald-500/50 hover:text-white transition-all"
            >
              {t("apiBtn")}
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "stat1", value: "100%", sub: t("stat1") },
              { label: "stat2", value: "∞", sub: t("stat2") },
              { label: "stat3", value: "MY", sub: t("stat3") },
              { label: "stat4", value: "3s", sub: t("stat4") },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 p-4 rounded-xl bg-surface-card/50 border border-surface-border backdrop-blur-sm"
              >
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-slate-500">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== USE CASES SECTION ===== */}
      <section id="usecases" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              {t("ucTitle")}{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Production.
              </span>
            </h2>
            <p className="max-w-xl mx-auto text-slate-400 text-base sm:text-lg">
              {t("ucDesc")}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: E-Commerce Matrix */}
            <div className="group relative p-6 rounded-xl bg-surface-card border border-surface-border hover:border-emerald-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <ShoppingCart size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {t("uc1Title")}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t("uc1Desc")}
              </p>
            </div>

            {/* Card 2: Social Media Farming */}
            <div className="group relative p-6 rounded-xl bg-surface-card border border-surface-border hover:border-blue-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {t("uc2Title")}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t("uc2Desc")}
              </p>
            </div>

            {/* Card 3: Sneaker & Ticketing Bots */}
            <div className="group relative p-6 rounded-xl bg-surface-card border border-surface-border hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {t("uc3Title")}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t("uc3Desc")}
              </p>
            </div>

            {/* Card 4: Data Scraping */}
            <div className="group relative p-6 rounded-xl bg-surface-card border border-surface-border hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                <Code size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {t("uc4Title")}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t("uc4Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INFRASTRUCTURE SECTION ===== */}
      <section id="infrastructure" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              {t("infTitle")}
            </h2>
            <p className="max-w-xl mx-auto text-slate-400 text-base sm:text-lg">
              {t("infDesc")}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Featured Card: Dedicated Physical Hardware (spans 2 cols, 2 rows on large screens) */}
            <div className="lg:col-span-2 lg:row-span-2 p-8 rounded-xl bg-surface-card border border-surface-border hover:border-emerald-500/20 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 text-emerald-400">
                <Server size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t("inf1Title")}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                {t("inf1Desc")}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{t("inf1a")}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{t("inf1b")}</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Unlimited Traffic */}
            <div className="p-6 rounded-xl bg-surface-card border border-surface-border hover:border-cyan-500/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 text-cyan-400">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {t("inf2Title")}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t("inf2Desc")}
              </p>
            </div>

            {/* Card 3: Protocol Agnostic */}
            <div className="p-6 rounded-xl bg-surface-card border border-surface-border hover:border-blue-500/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
                <Lock size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {t("inf3Title")}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t("inf3Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DEVELOPERS SECTION ===== */}
      <section id="developers" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                {t("devTitle")}
              </h2>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8">
                {t("devDesc")}
              </p>

              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">
                      {t("dev1Title")}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {t("dev1Desc")}
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 text-cyan-400">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">
                      {t("dev2Title")}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {t("dev2Desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Code Window */}
            <div className="w-full">
              <div className="rounded-xl border border-surface-border bg-surface-lighter/80 overflow-hidden backdrop-blur-sm">
                {/* macOS Traffic Light Dots */}
                <div className="flex items-center gap-2 px-4 py-3 bg-surface-card border-b border-surface-border">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-slate-500 ml-2 font-mono">
                    api.ipmobi.net
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex border-b border-surface-border">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setCodeTab(tab)}
                      className={`px-4 py-2 text-xs font-mono transition-colors ${
                        codeTab === tab
                          ? "text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Code Content */}
                <div className="p-4 sm:p-6 overflow-x-auto">
                  <pre className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
                    <code>{activeCode}</code>
                  </pre>
                </div>

                {/* Output Section */}
                <div className="border-t border-surface-border">
                  <div className="px-4 sm:px-6 py-2 bg-surface-card/50">
                    <span className="text-xs text-slate-500 font-mono">
                      $ {t("devOut")}
                    </span>
                  </div>
                  <div className="p-4 sm:p-6 overflow-x-auto bg-surface-lighter">
                    <pre className="text-xs sm:text-sm font-mono text-emerald-400/90 leading-relaxed whitespace-pre-wrap">
                      <code>{jsonOutput}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section id="pricing" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              {t("prTitle")}
            </h2>
            <p className="max-w-xl mx-auto text-slate-400 text-base sm:text-lg">
              {t("prDesc")}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: Scraper Node */}
            <div className="relative p-8 rounded-xl bg-surface-card border border-surface-border hover:border-emerald-500/20 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-1">
                {t("pr1Name")}
              </h3>
              <p className="text-sm text-slate-500 mb-6">{t("pr1Sub")}</p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-slate-500 text-sm ml-1">
                  / {t("prPortMo")}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{t("prModem")}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{t("prUnlim")}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{t("prProto")}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-500">
                  <div className="w-[18px] flex-shrink-0 mt-0.5 flex justify-center">
                    <span className="block w-1.5 h-1.5 rounded-full bg-slate-600" />
                  </div>
                  <span>{t("prManual")}</span>
                </li>
              </ul>

              <a
                href="/trial"
                className="block w-full text-center py-3 rounded-lg border border-surface-border text-slate-300 font-medium hover:border-emerald-500/50 hover:text-white transition-all"
              >
                {t("prDeploy")}
              </a>
            </div>

            {/* Card 2: Automation Pro (Featured) */}
            <div className="relative p-8 rounded-xl bg-surface-card border-2 border-emerald-500/30 shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10 transition-all duration-300">
              {/* API Enabled Badge */}
              <div className="absolute -top-3 right-6">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-lg">
                  {t("prApiEn")}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-1">
                {t("pr2Name")}
              </h3>
              <p className="text-sm text-slate-500 mb-6">{t("pr2Sub")}</p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$89</span>
                <span className="text-slate-500 text-sm ml-1">
                  / {t("prPortMo")}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{t("prModem")}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{t("prUnlim")}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{t("prProto")}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{t("prApiRot")}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{t("prConc")}</span>
                </li>
              </ul>

              <a
                href="/trial"
                className="block w-full text-center py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25"
              >
                {t("pr2Deploy")}
              </a>
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="text-center mt-16">
            <p className="text-slate-400 mb-2">{t("prEnt1")}</p>
            <a
              href="mailto:enterprise@ipmobi.net"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              {t("prEnt2")}
              <ArrowLeft className="rotate-180" size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
