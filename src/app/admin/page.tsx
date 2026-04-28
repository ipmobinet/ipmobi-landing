"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Server,
  Zap,
  Activity,
  Clock,
  Shield,
  XCircle,
  CheckCircle2,
  ExternalLink,
} from "@/components/ui/Icons";

interface StatCard {
  label: string;
  value: string;
  icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  bg: string;
  border: string;
  change?: string;
  changePositive?: boolean;
}

interface ActivityLog {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  type: "success" | "warning" | "error" | "info";
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);

  useEffect(() => {
    // Load from localStorage or use defaults
    const stored = localStorage.getItem("ipmobi_admin_stats");
    if (stored) {
      try {
        setStats(JSON.parse(stored));
        return;
      } catch {}
    }

    setStats([
      {
        label: "Total Users",
        value: "1,247",
        icon: Users,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        change: "+12%",
        changePositive: true,
      },
      {
        label: "Active Trials",
        value: "38",
        icon: Activity,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        change: "+3",
        changePositive: true,
      },
      {
        label: "Active Proxies",
        value: "142",
        icon: Server,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        change: "-2",
        changePositive: false,
      },
      {
        label: "Bandwidth Today",
        value: "847.3 GB",
        icon: Zap,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        change: "+18%",
        changePositive: true,
      },
    ]);

    setRecentActivity([
      { id: 1, action: "New user registered", user: "alex@example.com", timestamp: "2 min ago", type: "success" },
      { id: 2, action: "Trial revoked", user: "test@spam.com", timestamp: "15 min ago", type: "error" },
      { id: 3, action: "Port 8084 activated", user: "modem-04", timestamp: "1 hour ago", type: "info" },
      { id: 4, action: "Bandwidth limit warning", user: "modem-07", timestamp: "2 hours ago", type: "warning" },
      { id: 5, action: "User blocked", user: "abuse@example.com", timestamp: "3 hours ago", type: "error" },
      { id: 6, action: "New proxy assigned", user: "client@corp.com", timestamp: "5 hours ago", type: "success" },
    ]);
  }, []);

  const typeStyles: Record<string, string> = {
    success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    warning: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    error: "text-red-400 bg-red-500/10 border-red-500/20",
    info: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  };

  const typeIcons: Record<string, React.FC<{ size?: number }>> = {
    success: CheckCircle2,
    warning: Clock,
    error: XCircle,
    info: Activity,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
          <p className="text-sm text-slate-400 mt-1">
            System overview and management at a glance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs text-emerald-400 font-medium">All systems operational</span>
        </div>
      </div>

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
                {stat.change && (
                  <span
                    className={`text-xs font-medium ${
                      stat.changePositive ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Log */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-white/[0.03] border border-surface-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
            <Link
              href="/admin/users"
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              View All <ExternalLink size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {recentActivity.map((log) => {
              const Icon = typeIcons[log.type] || Activity;
              return (
                <div
                  key={log.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${typeStyles[log.type]} text-sm`}
                >
                  <Icon size={16} />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">{log.action}</span>
                    <span className="text-slate-500 ml-1">— {log.user}</span>
                  </div>
                  <span className="text-xs text-slate-500 flex-shrink-0">{log.timestamp}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
            <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/admin/users"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-surface-border hover:bg-white/[0.05] transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                  <Shield size={16} />
                </div>
                <div>
                  <p className="text-sm text-white group-hover:text-emerald-400 transition-colors">Block User</p>
                  <p className="text-xs text-slate-500">Review and block abusive users</p>
                </div>
              </Link>
              <Link
                href="/admin/ports"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-surface-border hover:bg-white/[0.05] transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <XCircle size={16} />
                </div>
                <div>
                  <p className="text-sm text-white group-hover:text-emerald-400 transition-colors">Revoke Trial</p>
                  <p className="text-xs text-slate-500">Revoke active trial proxies</p>
                </div>
              </Link>
              <Link
                href="/admin/ports"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-surface-border hover:bg-white/[0.05] transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Server size={16} />
                </div>
                <div>
                  <p className="text-sm text-white group-hover:text-emerald-400 transition-colors">Add Proxy Port</p>
                  <p className="text-xs text-slate-500">Provision a new proxy port</p>
                </div>
              </Link>
              <Link
                href="/admin/bandwidth"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-surface-border hover:bg-white/[0.05] transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Zap size={16} />
                </div>
                <div>
                  <p className="text-sm text-white group-hover:text-emerald-400 transition-colors">View Bandwidth</p>
                  <p className="text-xs text-slate-500">Check bandwidth usage charts</p>
                </div>
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
            <h3 className="text-sm font-semibold text-white mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">API Server</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Database</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Proxy Pool</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  142/150
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Cloudflare Tunnel</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
