"use client";

import { useState } from "react";
import { Shield, Zap, Server, CheckCircle2, ChevronRight } from "@/components/ui/Icons";

const plans = [
  {
    id: "scraper",
    name: "Scraper Node",
    price: 65,
    period: "month",
    subtitle: "For manual or low-frequency data extraction",
    features: [
      "1 dedicated physical 4G/5G modem",
      "Real Malaysian carrier IP (Maxis/Celcom/Digi)",
      "Unlimited bandwidth",
      "HTTP/SOCKS5 protocol support",
      "Manual IP rotation",
    ],
    cta: "Order Now",
    popular: false,
  },
  {
    id: "automation",
    name: "Automation Pro",
    price: 130,
    period: "month",
    subtitle: "For dynamic scraping & account management",
    features: [
      "1 dedicated physical 4G/5G modem",
      "Real Malaysian carrier IP",
      "Unlimited bandwidth",
      "HTTP/SOCKS5 protocol support",
      "REST API auto-rotation (<3 seconds)",
      "High concurrency allowed",
      "Priority support",
    ],
    cta: "Order Now",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    subtitle: "10+ modems or specific carrier targeting",
    features: [
      "Multiple dedicated modems",
      "Carrier-specific targeting (Maxis/Celcom/Digi)",
      "Unlimited bandwidth per port",
      "Dedicated API endpoints",
      "SLA guarantee",
      "Custom setup & support",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

export default function OrderPage() {
  const [selected, setSelected] = useState("automation");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", telegram: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const plan = plans.find((p) => p.id === selected) || plans[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send order to backend which will email you
    try {
      await fetch("https://api.ipmobi.net/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selected, ...form }),
      });
    } catch {}
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Order Received!</h1>
          <p className="text-slate-400 mb-6">
            We&apos;ll review your order and contact you within 24 hours with setup instructions and payment details.
          </p>
          <p className="text-sm text-slate-500">
            For urgent orders, contact us on Telegram.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200">
      {/* Simple Header */}
      <div className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-lg font-bold">
            <span className="text-white">IPMOBI</span>
            <span className="text-emerald-400">.</span>
            <span className="text-slate-400 font-normal">NET</span>
          </span>
          <a href="https://ipmobi.net" className="text-sm text-emerald-400 hover:text-emerald-300">
            ← Back to Home
          </a>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Order Your Proxy Port</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Select a plan. After ordering, we&apos;ll set up your dedicated modem and send you the connection details within 24 hours.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelected(p.id); setShowForm(false); }}
              className={`text-left p-6 rounded-xl border transition-all ${
                selected === p.id
                  ? "border-emerald-500 bg-emerald-500/5 shadow-lg shadow-emerald-500/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              } ${p.popular ? "relative" : ""}`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-emerald-500 text-black text-xs font-semibold">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-white mb-1">{p.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{p.subtitle}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">
                  {typeof p.price === "number" ? `$${p.price}` : p.price}
                </span>
                {p.period && <span className="text-slate-500 text-sm ml-1">/{p.period}</span>}
              </div>
              <ul className="space-y-2 mb-6">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* Order Form */}
        {!showForm ? (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-500 text-black font-semibold text-lg hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
            >
              {plan.cta} — {typeof plan.price === "number" ? `$${plan.price}` : "Custom"}{plan.period ? `/${plan.period}` : ""}
              <ChevronRight size={20} />
            </button>
            <p className="text-xs text-slate-600 mt-4">
              We accept bank transfer (Malaysia), crypto (USDT/BTC), and TNG eWallet
            </p>
          </div>
        ) : selected === "enterprise" ? (
          <div className="max-w-md mx-auto p-6 rounded-xl bg-white/[0.03] border border-white/10">
            <p className="text-slate-400 text-sm mb-4">
              For enterprise setups (10+ modems), please contact us directly:
            </p>
            <a
              href="mailto:support@ipmobi.net"
              className="block w-full text-center px-6 py-3 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-all"
            >
              Email: support@ipmobi.net
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Order Details</h3>
            <p className="text-sm text-slate-500 mb-4">
              Plan: <span className="text-emerald-400">{plan.name}</span> (${plan.price}/month)
            </p>
            <input
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            <input
              type="email"
              placeholder="Email address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            <input
              type="text"
              placeholder="Telegram username (optional)"
              value={form.telegram}
              onChange={(e) => setForm({ ...form, telegram: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            <textarea
              placeholder="Special requirements or questions..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
            />
            <p className="text-xs text-slate-600">
              After submitting, we&apos;ll contact you with payment instructions within 24 hours.
              Accepted: Bank transfer (MY), USDT/BTC, TNG eWallet.
            </p>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-all"
            >
              Submit Order
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
