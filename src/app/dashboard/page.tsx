"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Server, Zap, CheckCircle2, Clock, Shield, ExternalLink, Activity } from "@/components/ui/Icons";

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

export default function DashboardOverview() {
  const [proxy, setProxy] = useState<ProxyData | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [uptime, setUptime] = useState(99.8);
  const proxyCount = 1;

  useEffect(() => {
    const raw = localStorage.getItem("ipmobi_trial_proxy");
    if (raw) {
      try {
        const data: ProxyData = JSON.parse(raw);
        setProxy(data);
        const now = Date.now();
        if (data.expiresAt > now) {
          setTimeLeft(Math.floor((data.expiresAt - now) / 1000));
        }
      } catch {}
    }

    // Simulate small uptime variance
    setUptime(99.7 + Math.random() * 0.3);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!proxy || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [proxy, timeLeft]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const dataUsed = proxy ? proxy.bytesUsed + Math.floor(Math.random() * 1024 * 1024) : 0;
  const dataPercent = proxy ? Math.min(100, (dataUsed / proxy.bytesLimit) * 100) : 0;
  const expired = proxy ? Date.now() >= proxy.expiresAt : false;

  const stats = [
    {
      label: "Active Proxies",
      value: String(proxyCount),
      icon: Server,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      label: "Bandwidth Used",
      value: formatBytes(dataUsed),
      icon: Zap,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      label: "Uptime",
      value: `${uptime.toFixed(1)}%`,
      icon: Activity,
      color: dataPercent > 90 ? "text-emerald-400" : "text-amber-400",
      bg: dataPercent > 90 ? "bg-emerald-500/10" : "bg-amber-500/10",
      border: dataPercent > 90 ? "border-emerald-500/20" : "border-amber-500/20",
    },
    {
      label: "Active Since",
      value: proxy ? formatDate(proxy.startedAt) : "N/A",
      icon: Clock,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-sm text-slate-400 mt-1">
            Welcome back. Here&apos;s your proxy infrastructure at a glance.
          </p>
        </div>
        <Link
          href="/dashboard/proxies"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-black font-medium text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Shield size={16} />
          New Proxy
        </Link>
      </div>

      {/* Status Banner */}
      {proxy && !expired && (
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3">
          <span className="relative flex h-3 w-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-emerald-400">Trial Active</p>
            <p className="text-xs text-slate-500">
              {proxy.host}:{proxy.port} &bull; Time remaining: {formatTime(timeLeft)} &bull; Data: {formatBytes(dataUsed)} / {formatBytes(proxy.bytesLimit)}
            </p>
          </div>
          <Link
            href="/dashboard/proxies"
            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 flex-shrink-0"
          >
            Manage <ExternalLink size={12} />
          </Link>
        </div>
      )}

      {proxy && expired && (
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-amber-400 flex-shrink-0" />
          <p className="text-sm text-amber-400 font-medium">Trial has expired. Upgrade to continue using your proxies.</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`p-5 rounded-xl bg-white/[0.03] border ${stat.border} hover:bg-white/[0.05] transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon size={20} className={stat.color} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Data Usage Bar */}
      {proxy && (
        <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Billing Period Usage</h3>
            <span className="text-xs text-slate-500">
              {formatBytes(dataUsed)} / {formatBytes(proxy.bytesLimit)}
            </span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                dataPercent > 90
                  ? "bg-red-500"
                  : dataPercent > 70
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
              style={{ width: `${dataPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-slate-500">
              {dataPercent > 90
                ? "⚠️ Approaching limit"
                : dataPercent > 70
                ? "⚠️ Moderate usage"
                : "✅ Usage within limits"}
            </span>
            <span className="text-xs text-slate-500">{dataPercent.toFixed(1)}%</span>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/proxies"
          className="p-5 rounded-xl bg-white/[0.03] border border-surface-border hover:bg-white/[0.05] transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3 text-blue-400 group-hover:scale-110 transition-transform">
            <Server size={20} />
          </div>
          <h4 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Manage Proxies</h4>
          <p className="text-xs text-slate-500 mt-1">View and rotate your proxy ports</p>
        </Link>
        <Link
          href="/dashboard/bandwidth"
          className="p-5 rounded-xl bg-white/[0.03] border border-surface-border hover:bg-white/[0.05] transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-3 text-cyan-400 group-hover:scale-110 transition-transform">
            <Zap size={20} />
          </div>
          <h4 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Bandwidth Stats</h4>
          <p className="text-xs text-slate-500 mt-1">Detailed traffic and usage analytics</p>
        </Link>
        <Link
          href="/dashboard/settings"
          className="p-5 rounded-xl bg-white/[0.03] border border-surface-border hover:bg-white/[0.05] transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3 text-purple-400 group-hover:scale-110 transition-transform">
            <CheckCircle2 size={20} />
          </div>
          <h4 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Account Settings</h4>
          <p className="text-xs text-slate-500 mt-1">API keys, password, notifications</p>
        </Link>
      </div>
    </div>
  );
}
