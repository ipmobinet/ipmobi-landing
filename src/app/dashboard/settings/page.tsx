"use client";

import { useEffect, useState } from "react";
import { Copy, CheckCircle2, Shield, Terminal, ExternalLink } from "@/components/ui/Icons";

interface ProxyData {
  host: string;
  port: number;
  username: string;
  password: string;
  bytesUsed: number;
  bytesLimit: number;
  startedAt: number;
  expiresAt: number;
}

export default function SettingsPage() {
  const [proxy, setProxy] = useState<ProxyData | null>(null);
  const [email, setEmail] = useState("user@ipmobi.net");
  const [name, setName] = useState("Client User");
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    usageWarnings: true,
    weeklyReport: false,
    productUpdates: true,
  });
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("ipmobi_trial_proxy");
    if (raw) {
      try {
        const data: ProxyData = JSON.parse(raw);
        setProxy(data);
      } catch {}
    }

    const stored = localStorage.getItem("ipmobi_user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        if (u.email) setEmail(u.email);
        if (u.name) setName(u.name);
      } catch {}
    }

    // Generate a mock API key
    const key = "ipm_" + Array.from({ length: 32 }, () =>
      "abcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 36))
    ).join("");
    setApiKey(key);
  }, []);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) {
      alert("New passwords do not match.");
      return;
    }
    if (passwordForm.newPass.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }
    setSaved("password");
    setTimeout(() => setSaved(null), 3000);
    setPasswordForm({ current: "", newPass: "", confirm: "" });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    localStorage.setItem("ipmobi_notifications", JSON.stringify(updated));
    setSaved("notifications");
    setTimeout(() => setSaved(null), 3000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Account Settings</h2>
        <p className="text-sm text-slate-400 mt-1">
          Manage your account details, security, and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">{name}</h3>
            <p className="text-sm text-slate-400">{email}</p>
            {proxy && (
              <p className="text-xs text-emerald-400 mt-0.5">
                Trial account &bull; {formatBytes(proxy.bytesUsed)} used
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Email</label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-surface-border rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-surface-border rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.setItem("ipmobi_user", JSON.stringify({ email, name }));
            setSaved("profile");
            setTimeout(() => setSaved(null), 3000);
          }}
          className="mt-4 px-4 py-2 rounded-lg bg-emerald-500 text-black font-medium text-sm hover:bg-emerald-400 transition-all"
        >
          {saved === "profile" ? "✓ Saved" : "Save Changes"}
        </button>
      </div>

      {/* Change Password */}
      <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
        <div className="flex items-center gap-3 mb-4">
          <Shield size={18} className="text-emerald-400" />
          <h3 className="text-base font-semibold text-white">Change Password</h3>
        </div>
        <form onSubmit={handlePasswordChange} className="space-y-3">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Current Password</label>
            <input
              type="password"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
              placeholder="Enter current password"
              className="w-full bg-white/5 border border-surface-border rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-slate-600"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">New Password</label>
              <input
                type="password"
                value={passwordForm.newPass}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                placeholder="Min. 8 characters"
                className="w-full bg-white/5 border border-surface-border rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-slate-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                placeholder="Re-enter new password"
                className="w-full bg-white/5 border border-surface-border rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-slate-600"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-white/5 border border-surface-border text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all"
          >
            {saved === "password" ? "✓ Password Updated" : "Update Password"}
          </button>
        </form>
      </div>

      {/* API Key */}
      <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
        <div className="flex items-center gap-3 mb-4">
          <Terminal size={18} className="text-cyan-400" />
          <h3 className="text-base font-semibold text-white">API Key</h3>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Use this key to authenticate with the IPMobi API for programmatic proxy management.
        </p>
        <div className="flex items-center gap-2 bg-black/30 border border-surface-border rounded-lg px-4 py-3">
          <code className="flex-1 text-sm font-mono text-slate-300 truncate select-all">
            {apiKey || "••••••••••••••••••••••••••••"}
          </code>
          <button
            onClick={() => copyToClipboard(apiKey, "apikey")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-xs text-slate-400 hover:text-emerald-400"
          >
            {copied === "apikey" ? (
              <>
                <CheckCircle2 size={14} className="text-emerald-400" />
                Copied
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <ExternalLink size={12} />
          <a href="#" className="hover:text-emerald-400 transition-colors" onClick={(e) => e.preventDefault()}>
            View API Documentation
          </a>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
        <div className="flex items-center gap-3 mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <h3 className="text-base font-semibold text-white">Notification Preferences</h3>
        </div>
        <div className="space-y-3">
          {([
            { key: "emailAlerts" as const, label: "Email Alerts", desc: "Receive email notifications for important account activity" },
            { key: "usageWarnings" as const, label: "Usage Warnings", desc: "Get notified when you approach your data cap" },
            { key: "weeklyReport" as const, label: "Weekly Report", desc: "Receive a weekly usage summary via email" },
            { key: "productUpdates" as const, label: "Product Updates", desc: "Stay informed about new features and improvements" },
          ]).map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between py-2 cursor-pointer group"
            >
              <div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  {item.label}
                </span>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => handleNotificationChange(item.key)}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-6 rounded-full transition-colors cursor-pointer ${
                    notifications[item.key] ? "bg-emerald-500" : "bg-white/10"
                  }`}
                  onClick={() => handleNotificationChange(item.key)}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform mt-1 ${
                      notifications[item.key] ? "translate-x-5 ml-0.5" : "translate-x-1"
                    }`}
                  />
                </div>
              </div>
            </label>
          ))}
        </div>
        {saved === "notifications" && (
          <p className="text-xs text-emerald-400 mt-3">Preferences saved!</p>
        )}
      </div>
    </div>
  );
}
