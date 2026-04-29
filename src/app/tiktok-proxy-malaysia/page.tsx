"use client";

import Link from "next/link";
import { Shield, Zap, Server, CheckCircle2, ChevronRight } from "@/components/ui/Icons";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-200">
      <div className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold">
            <span className="text-white">IPMOBI</span>
            <span className="text-emerald-400">.</span>
            <span className="text-slate-400 font-normal">NET</span>
          </Link>
          <Link href="/" className="text-sm text-emerald-400 hover:text-emerald-300">← Home</Link>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">TikTok Proxy Malaysia — Farm Accounts with Real Mobile IPs</h1>
        <p className="text-lg text-slate-400 mb-8 max-w-xl">Proxy for TikTok account farming in Malaysia. Real mobile IPs from physical 4G/5G modems. Avoid shadowbans with dedicated Malaysian carrier IPs.</p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/trial" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-all shadow-lg">
            <Zap size={18} />
            Free Trial — 15 Min
          </Link>
          <Link href="/order" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-slate-300 hover:border-emerald-500/50 transition-all">
            <Server size={18} />
            Order Now — $65/mo
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
            <Shield size={24} className="text-emerald-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Physical Hardware</h3>
            <p className="text-sm text-slate-400">Real 4G/5G modems with genuine Maxis, Celcom & Digi SIM cards. One dedicated modem per port.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
            <Zap size={24} className="text-emerald-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Unlimited Bandwidth</h3>
            <p className="text-sm text-slate-400">No per-GB billing. No throttling. Scrape and automate as much as you need.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
            <CheckCircle2 size={24} className="text-emerald-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">API Rotation</h3>
            <p className="text-sm text-slate-400">REST API rotates your IP in under 3 seconds when blocked. Full automation ready.</p>
          </div>
        </div>
        <div className="p-8 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Try?</h2>
          <p className="text-slate-400 mb-6">No credit card required. 15 minutes, 100MB free.</p>
          <Link href="/trial" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all shadow-xl">
            Start Free Trial <ChevronRight size={20} />
          </Link>
        </div>
      </main>
    </div>
  );
}
