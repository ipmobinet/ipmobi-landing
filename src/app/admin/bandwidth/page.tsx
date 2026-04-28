"use client";

import { useEffect, useState } from "react";
import { Server, Activity, XCircle, CheckCircle2, Shield, ChevronRight, Globe, Users, ArrowLeft, Terminal, Clock, Copy, Zap, ExternalLink, Wifi } from "@/components/ui/Icons";

interface BandwidthData {
  day: string;
  value: number;
  label: string;
}

interface TopUser {
  rank: number;
  email: string;
  bandwidth: string;
  bandwidthBytes: number;
  percentage: number;
}

export default function AdminBandwidth() {
  const [view, setView] = useState<"daily" | "monthly">("daily");
  const [chartData, setChartData] = useState<BandwidthData[]>([]);
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [totalBandwidth, setTotalBandwidth] = useState("847.3 GB");
  const [peakBandwidth, setPeakBandwidth] = useState("142.1 GB");

  useEffect(() => {
    const storedData = localStorage.getItem("ipmobi_admin_bandwidth_data");
    const storedUsers = localStorage.getItem("ipmobi_admin_bandwidth_users");
    const storedTotal = localStorage.getItem("ipmobi_admin_bandwidth_total");
    const storedPeak = localStorage.getItem("ipmobi_admin_bandwidth_peak");

    if (storedData && storedUsers) {
      try {
        setChartData(JSON.parse(storedData));
        setTopUsers(JSON.parse(storedUsers));
        if (storedTotal) setTotalBandwidth(storedTotal);
        if (storedPeak) setPeakBandwidth(storedPeak);
        return;
      } catch {}
    }

    const daily: BandwidthData[] = [
      { day: "2026-04-22", value: 45.2, label: "Apr 22" },
      { day: "2026-04-23", value: 62.8, label: "Apr 23" },
      { day: "2026-04-24", value: 38.5, label: "Apr 24" },
      { day: "2026-04-25", value: 91.3, label: "Apr 25" },
      { day: "2026-04-26", value: 78.9, label: "Apr 26" },
      { day: "2026-04-27", value: 142.1, label: "Apr 27" },
      { day: "2026-04-28", value: 112.4, label: "Apr 28" },
    ];

    const monthly: BandwidthData[] = [
      { day: "2026-01", value: 1200, label: "Jan" },
      { day: "2026-02", value: 1850, label: "Feb" },
      { day: "2026-03", value: 2100, label: "Mar" },
      { day: "2026-04", value: 980, label: "Apr" },
    ];

    const users: TopUser[] = [
      { rank: 1, email: "bob@enterprise.com", bandwidth: "45.2 GB", bandwidthBytes: 45.2 * 1024, percentage: 28 },
      { rank: 2, email: "sarah@dev.io", bandwidth: "22.1 GB", bandwidthBytes: 22.1 * 1024, percentage: 14 },
      { rank: 3, email: "alex@example.com", bandwidth: "12.4 GB", bandwidthBytes: 12.4 * 1024, percentage: 8 },
      { rank: 4, email: "client@corp.com", bandwidth: "5.7 GB", bandwidthBytes: 5.7 * 1024, percentage: 4 },
      { rank: 5, email: "jane@corp.net", bandwidth: "847 MB", bandwidthBytes: 847, percentage: 1 },
    ];

    setChartData(view === "daily" ? daily : monthly);
    setTopUsers(users);
    localStorage.setItem("ipmobi_admin_bandwidth_data", JSON.stringify(view === "daily" ? daily : monthly));
    localStorage.setItem("ipmobi_admin_bandwidth_users", JSON.stringify(users));
    localStorage.setItem("ipmobi_admin_bandwidth_total", "847.3 GB");
    localStorage.setItem("ipmobi_admin_bandwidth_peak", "142.1 GB");
  }, [view]);

  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Bandwidth Monitoring</h2>
          <p className="text-sm text-slate-400 mt-1">
            Track bandwidth usage across all proxy ports and users.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/[0.03] border border-surface-border rounded-lg p-1">
          {(["daily", "monthly"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === v
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {v === "daily" ? "Daily" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white/[0.03] border border-emerald-500/20">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Zap size={20} className="text-emerald-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{totalBandwidth}</div>
          <div className="text-xs text-slate-500 mt-1">Total Bandwidth (This Period)</div>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.03] border border-amber-500/20">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Activity size={20} className="text-amber-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{peakBandwidth}</div>
          <div className="text-xs text-slate-500 mt-1">Peak Daily Usage</div>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.03] border border-cyan-500/20">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Clock size={20} className="text-cyan-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">142</div>
          <div className="text-xs text-slate-500 mt-1">Active Proxies Today</div>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.03] border border-purple-500/20">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Users size={20} className="text-purple-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">28</div>
          <div className="text-xs text-slate-500 mt-1">Active Users Today</div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
        <h3 className="text-sm font-semibold text-white mb-6">
          {view === "daily" ? "Daily Bandwidth Usage (GB)" : "Monthly Bandwidth Usage (GB)"}
        </h3>
        <div className="flex items-end gap-3 h-48">
          {chartData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-xs text-slate-500">{d.value.toFixed(1)}</span>
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 transition-all cursor-pointer"
                style={{
                  height: `${(d.value / maxValue) * 100}%`,
                  minHeight: d.value > 0 ? "8px" : "0px",
                }}
              />
              <span className="text-xs text-slate-500 mt-1">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Users + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Users */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-white/[0.03] border border-surface-border">
          <h3 className="text-sm font-semibold text-white mb-4">Top Users by Bandwidth</h3>
          <div className="space-y-3">
            {topUsers.map((u) => (
              <div
                key={u.rank}
                className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.02] border border-surface-border"
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  u.rank === 1
                    ? "bg-amber-500/20 text-amber-400"
                    : u.rank === 2
                    ? "bg-slate-400/20 text-slate-300"
                    : u.rank === 3
                    ? "bg-amber-700/20 text-amber-600"
                    : "bg-white/5 text-slate-500"
                }`}>
                  {u.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{u.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                        style={{ width: `${u.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 w-16 text-right">{u.bandwidth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
            <h3 className="text-sm font-semibold text-white mb-4">Usage Insights</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-surface-border">
                <span className="text-xs text-slate-400">Avg. Daily Usage</span>
                <span className="text-sm font-medium text-white">81.6 GB</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-surface-border">
                <span className="text-xs text-slate-400">Busiest Day</span>
                <span className="text-sm font-medium text-white">Sunday</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-surface-border">
                <span className="text-xs text-slate-400">Top Carrier</span>
                <span className="text-sm font-medium text-white">CelcomDigi</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-surface-border">
                <span className="text-xs text-slate-400">Growth (MoM)</span>
                <span className="text-sm font-medium text-emerald-400">+14.2%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-surface-border">
                <span className="text-xs text-slate-400">Cost Estimate</span>
                <span className="text-sm font-medium text-white">$0.08/GB</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
            <h3 className="text-sm font-semibold text-white mb-4">Quick Filters</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                Last 7 Days
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                Last 30 Days
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                This Month
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                Custom Range
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
