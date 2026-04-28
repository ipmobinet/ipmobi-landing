"use client";

import { useState } from "react";
import { Users, Shield, Terminal, ExternalLink, Globe } from "@/components/ui/Icons";

const faqs = [
  {
    q: "How do I connect to my proxy?",
    a: "Use the credentials shown in the My Proxies page. Configure your browser or application with HTTP/SOCKS5 proxy settings pointing to your allocated gateway and port. Authentication is HTTP Basic Auth using your username and password.",
  },
  {
    q: "What protocols are supported?",
    a: "We support HTTP, HTTPS, and SOCKS5 protocols. All traffic is tunneled through our dedicated mobile modems in Shah Alam, Malaysia.",
  },
  {
    q: "How do I rotate my IP?",
    a: "Click the 'Rotate IP' button on any active proxy in the My Proxies page. The rotation takes approximately 2 seconds. Your new IP will be from the same mobile carrier pool.",
  },
  {
    q: "What is my data cap?",
    a: "Your current data cap is displayed on the Bandwidth page. Trial accounts have a 100MB limit. Upgrade to full access for unlimited bandwidth.",
  },
  {
    q: "How do I upgrade from trial?",
    a: "Contact our sales team at ipmobi.net@gmail.com. We offer various plans based on the number of proxy ports, bandwidth requirements, and contract duration.",
  },
  {
    q: "Can I use the API for automation?",
    a: "Yes! Your API key is available in Settings. Use it to programmatically rotate IPs, check bandwidth usage, and manage proxy ports via our REST API.",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Support</h2>
        <p className="text-sm text-slate-400 mt-1">
          Get help with your proxy infrastructure. We&apos;re here to help.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          href="mailto:ipmobi.net@gmail.com"
          className="p-5 rounded-xl bg-white/[0.03] border border-surface-border hover:bg-white/[0.05] transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3 text-emerald-400 group-hover:scale-110 transition-transform">
            <Globe size={20} />
          </div>
          <h4 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Email Us</h4>
          <p className="text-xs text-slate-500 mt-1">ipmobi.net@gmail.com</p>
          <p className="text-xs text-slate-500">Response within 24 hours</p>
        </a>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="p-5 rounded-xl bg-white/[0.03] border border-surface-border hover:bg-white/[0.05] transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-3 text-cyan-400 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <h4 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Live Chat</h4>
          <p className="text-xs text-slate-500 mt-1">Coming soon</p>
          <p className="text-xs text-slate-500">Real-time support</p>
        </a>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="p-5 rounded-xl bg-white/[0.03] border border-surface-border hover:bg-white/[0.05] transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3 text-purple-400 group-hover:scale-110 transition-transform">
            <Shield size={20} />
          </div>
          <h4 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Documentation</h4>
          <p className="text-xs text-slate-500 mt-1">API reference &amp; guides</p>
          <p className="text-xs text-slate-500">In-depth technical docs</p>
        </a>
      </div>

      {/* FAQ */}
      <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
        <h3 className="text-base font-semibold text-white mb-4">Frequently Asked Questions</h3>
        <div className="space-y-1">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-surface-border last:border-0">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between py-3 text-left"
              >
                <span className="text-sm text-slate-300 hover:text-white transition-colors pr-4">
                  {faq.q}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`text-slate-500 flex-shrink-0 transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="pb-4 text-sm text-slate-400 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Still Need Help */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border border-emerald-500/20 text-center">
        <h3 className="text-base font-semibold text-white mb-2">Still Need Help?</h3>
        <p className="text-sm text-slate-400 mb-4">
          Our team is ready to assist with any technical questions or issues.
        </p>
        <a
          href="mailto:ipmobi.net@gmail.com?subject=Support%20Request"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 text-black font-medium text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Globe size={16} />
          Contact Support
        </a>
      </div>
    </div>
  );
}
