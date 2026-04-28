"use client";

import { useState } from "react";
import { Server, Activity, XCircle, CheckCircle2, Shield, ChevronRight, Globe, Users, ArrowLeft, Terminal, Clock, Copy, Zap, ExternalLink, Wifi } from "@/components/ui/Icons";

export default function AdminSettings() {
  const [copied, setCopied] = useState(false);
  const [apiKey] = useState("ipmobi_admin_" + Array.from({ length: 32 }, () =>
    "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]
  ).join(""));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Admin Settings</h2>
          <p className="text-sm text-slate-400 mt-1">
            Configure admin panel preferences and API access.
          </p>
        </div>
      </div>

      {/* API Access */}
      <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Terminal size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">API Access</h3>
            <p className="text-xs text-slate-500">Admin API key for automated management</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02] border border-surface-border">
            <code className="flex-1 text-sm font-mono text-slate-400 truncate">{apiKey}</code>
            <button
              onClick={() => copyToClipboard(apiKey)}
              className="flex-shrink-0 p-2 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
            >
              {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            This key grants full admin access. Keep it secure and rotate periodically.
          </p>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Globe size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">API Endpoints</h3>
            <p className="text-xs text-slate-500">Available management endpoints</p>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { method: "GET", path: "/api/admin/users", desc: "List all users" },
            { method: "GET", path: "/api/admin/users/:id", desc: "Get user details" },
            { method: "POST", path: "/api/admin/users/:id/block", desc: "Block a user" },
            { method: "POST", path: "/api/admin/users/:id/unblock", desc: "Unblock a user" },
            { method: "GET", path: "/api/admin/ports", desc: "List proxy ports" },
            { method: "POST", path: "/api/admin/ports", desc: "Create proxy port" },
            { method: "DELETE", path: "/api/admin/ports/:id", desc: "Remove proxy port" },
            { method: "GET", path: "/api/admin/bandwidth", desc: "Get bandwidth stats" },
            { method: "POST", path: "/api/trial/start", desc: "Start trial" },
            { method: "POST", path: "/api/trial/revoke", desc: "Revoke trial" },
          ].map((ep) => (
            <div
              key={ep.path}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-surface-border"
            >
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                ep.method === "GET"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : ep.method === "POST"
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-red-500/10 text-red-400"
              }`}>
                {ep.method}
              </span>
              <code className="text-sm font-mono text-slate-300 flex-1">{ep.path}</code>
              <span className="text-xs text-slate-500">{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
            <Shield size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-400">Danger Zone</h3>
            <p className="text-xs text-slate-500">Irreversible actions — proceed with caution</p>
          </div>
        </div>
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 hover:bg-red-500/20 transition-all">
            Revoke All Active Trials
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 hover:bg-red-500/20 transition-all">
            Regenerate Admin API Key
          </button>
        </div>
      </div>
    </div>
  );
}
