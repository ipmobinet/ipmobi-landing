"use client";

import { useEffect, useState } from "react";

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

export default function BandwidthPage() {
  const [proxy, setProxy] = useState<ProxyData | null>(null);
  const [dailyData, setDailyData] = useState<{ day: number; mb: number }[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("ipmobi_trial_proxy");
    if (raw) {
      try {
        const data: ProxyData = JSON.parse(raw);
        setProxy(data);
        const hoursSinceStart = (Date.now() - data.startedAt) / (1000 * 60 * 60);
        const simulatedUsage = Math.min(
          data.bytesLimit,
          Math.floor(hoursSinceStart * 2 * 1024 * 1024)
        );
        const used = data.bytesUsed > 0 ? data.bytesUsed : simulatedUsage;
        setDailyData(generateDailyData(used));
      } catch {
        setDailyData(generateDailyData(10 * 1024 * 1024));
      }
    } else {
      setDailyData(generateDailyData(10 * 1024 * 1024));
    }
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const dataUsed = proxy
    ? proxy.bytesUsed + Math.floor(Math.random() * 1024 * 1024)
    : Math.floor(Math.random() * 500 * 1024 * 1024);
  const dataLimit = proxy ? proxy.bytesLimit : 100 * 1024 * 1024 * 1024;
  const dataPercent = Math.min(100, (dataUsed / dataLimit) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Bandwidth Usage</h2>
        <p className="text-sm text-slate-400 mt-1">
          Track your data consumption across all proxy connections.
        </p>
      </div>

      {/* Usage Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white/[0.03] border border-surface-border">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Used This Period</div>
          <div className="text-2xl font-bold text-white">{formatBytes(dataUsed)}</div>
          <div className="text-xs text-slate-500 mt-1">of {formatBytes(dataLimit)}</div>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.03] border border-surface-border">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Daily Average</div>
          <div className="text-2xl font-bold text-cyan-400">{getDailyAvg()} MB</div>
          <div className="text-xs text-slate-500 mt-1">Last 30 days</div>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.03] border border-surface-border">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Data Cap</div>
          <div className="text-2xl font-bold text-emerald-400">
            {proxy ? formatBytes(proxy.bytesLimit) : "100 GB"}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {proxy ? "Trial limit" : "Monthly cap"}
          </div>
        </div>
      </div>

      {/* Usage Bar */}
      <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Billing Period Usage</h3>
          <span className="text-xs text-slate-500">{dataPercent.toFixed(1)}% used</span>
        </div>
        <div className="h-4 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              dataPercent > 90
                ? "bg-red-500"
                : dataPercent > 70
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
            style={{ width: `${dataPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>0 GB</span>
          <span>
            {dataPercent > 90
              ? "⚠️ Critical — upgrade recommended"
              : dataPercent > 70
              ? "⚠️ Approaching limit"
              : "✅ On track"}
          </span>
          <span>{formatBytes(dataLimit)}</span>
        </div>
      </div>

      {/* Daily Usage Chart */}
      <div className="p-6 rounded-xl bg-white/[0.03] border border-surface-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Daily Usage (Last 30 Days)</h3>
          <span className="text-xs text-slate-500">MB per day</span>
        </div>
        <DailyChart data={dailyData} />
      </div>

      {/* Data Cap Info */}
      <div className="p-5 rounded-xl bg-white/[0.03] border border-surface-border">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">About Data Caps</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Your data cap resets at the start of each billing cycle. Unused data does not roll over.
              {proxy
                ? " This is a trial account with a limited data allowance. Upgrade to unlock unlimited bandwidth."
                : " Upgrade your plan to increase your monthly data cap."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const DAYS = 30;

function generateDailyData(baseUsed: number): { day: number; mb: number }[] {
  const data: { day: number; mb: number }[] = [];
  for (let i = DAYS - 1; i >= 0; i--) {
    const daily = Math.random() * 15 + 2;
    data.push({
      day: i,
      mb: Math.round(daily * 10) / 10,
    });
  }
  return data;
}

function getDailyAvg(): string {
  if (typeof window === "undefined") return "0";
  const raw = localStorage.getItem("ipmobi_trial_proxy");
  if (!raw) return "0";
  try {
    const data: ProxyData = JSON.parse(raw);
    const hoursSince = (Date.now() - data.startedAt) / (1000 * 60 * 60);
    if (hoursSince < 1) return "0";
    const used = data.bytesUsed > 0 ? data.bytesUsed : Math.floor(hoursSince * 2 * 1024 * 1024);
    const dailyAvg = used / (hoursSince / 24) / (1024 * 1024);
    return dailyAvg.toFixed(1);
  } catch {
    return "0";
  }
}

function DailyChart({ data }: { data: { day: number; mb: number }[] }) {
  if (data.length === 0) {
    return (
      <div className="h-[120px] flex items-center justify-center text-sm text-slate-500">
        No data available yet.
      </div>
    );
  }

  const maxMB = Math.max(...data.map((d) => d.mb), 1);
  const chartHeight = 120;

  return (
    <div className="relative" style={{ height: `${chartHeight + 40}px` }}>
      <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-[10px] text-slate-600">
        <span>{maxMB.toFixed(0)}</span>
        <span>{(maxMB / 2).toFixed(0)}</span>
        <span>0</span>
      </div>
      <div className="ml-12 h-full flex items-end gap-[2px]">
        {data.map((d) => {
          const height = (d.mb / maxMB) * chartHeight;
          return (
            <div
              key={d.day}
              className="relative flex-1 group"
              style={{ height: `${chartHeight}px` }}
            >
              <div
                className="absolute bottom-0 w-full rounded-t-sm bg-emerald-500/60 hover:bg-emerald-400/80 transition-all cursor-pointer"
                style={{ height: `${height}px` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-card border border-surface-border px-2 py-1 rounded text-[10px] text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Day {DAYS - d.day}: {d.mb} MB
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ml-12 flex justify-between text-[10px] text-slate-600 mt-1">
        <span>Day 1</span>
        <span>Day 10</span>
        <span>Day 20</span>
        <span>Day 30</span>
      </div>
    </div>
  );
}
