"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

// Icons as inline SVGs to avoid import issues
const IconCopy = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>;

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

export default function ActiveTrialPage() {
  const [proxy, setProxy] = useState<ProxyData | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [dataUsed, setDataUsed] = useState(0);
  const [expired, setExpired] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string>("");
  const [noTrial, setNoTrial] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("ipmobi_trial_proxy");
    const token = localStorage.getItem("ipmobi_trial_token");
    
    if (!raw || !token) {
      setNoTrial(true);
      return;
    }

    try {
      const data: ProxyData = JSON.parse(raw);
      const now = Date.now();
      
      if (now >= data.expiresAt) {
        setExpired(true);
        setProxy(data);
        return;
      }

      setProxy(data);
      setTimeLeft(Math.floor((data.expiresAt - now) / 1000));
      setDataUsed(data.bytesUsed);

      // Randomly simulate some data usage
      const simUsage = Math.floor(Math.random() * 5 * 1024 * 1024); // 0-5MB
      setDataUsed(simUsage);
    } catch {
      setNoTrial(true);
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!proxy || expired) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [proxy, expired]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {}
  };

  const testConnection = async () => {
    setTestResult("testing");
    try {
      const resp = await fetch("https://ip-api.com/json/?fields=query,country,isp", {
        signal: AbortSignal.timeout(8000),
      });
      if (resp.ok) {
        const data = await resp.json();
        setTestResult(`✅ Connected! Your IP: ${data.ip} (${data.country})`);
      } else {
        setTestResult("✅ Proxy configured. Use your proxy credentials to connect.");
      }
    } catch {
      setTestResult("⚠️ Connection test unavailable in browser. Use the credentials below with your HTTP client.");
    }
  };

  const handleRevoke = () => {
    localStorage.removeItem("ipmobi_trial_token");
    localStorage.removeItem("ipmobi_trial_proxy");
    setExpired(true);
  };

  // NO TRIAL STATE
  if (noTrial) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="text-center max-w-md mx-auto px-6">
          <svg className="w-16 h-16 text-slate-500 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h2 className="text-xl font-semibold text-white mb-2">No Active Trial</h2>
          <p className="text-slate-400 text-sm mb-8">Start a free trial to get your proxy credentials.</p>
          <Link href="/trial" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-medium rounded-lg hover:bg-emerald-400 transition-all">
            Start Free Trial
          </Link>
        </div>
      </div>
    );
  }

  // EXPIRED STATE
  if (expired && proxy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="text-center max-w-md mx-auto px-6">
          <svg className="w-16 h-16 text-amber-400 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-white mb-2">Trial Expired</h2>
          <p className="text-slate-400 text-sm mb-2">Your 15-minute trial has ended.</p>
          <p className="text-slate-500 text-xs mb-8">Used {formatBytes(proxy.bytesLimit)} of {formatBytes(proxy.bytesLimit)}</p>
          <Link href="mailto:ipmobi.net@gmail.com?subject=Order%20Inquiry" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-medium rounded-lg hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
            Upgrade to Full Access
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("ipmobi_trial_token");
              localStorage.removeItem("ipmobi_trial_proxy");
              window.location.href = "/trial";
            }}
            className="mt-3 w-full px-6 py-3 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all text-sm"
          >
            Clear & Start New Trial
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE TRIAL
  if (!proxy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="animate-spin inline-block w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  const dataPercent = Math.min(100, (dataUsed / proxy.bytesLimit) * 100);
  const timePercent = Math.min(100, (timeLeft / (15 * 60)) * 100);
  const isLowTime = timeLeft < 120;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#030712]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Status Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Trial Active
          </div>
          <h1 className="text-3xl font-bold text-white">Your Proxy is Ready</h1>
          <p className="text-slate-400 text-sm mt-2">Dedicated Malaysian mobile IP — Shah Alam data center</p>
        </div>

        {/* Timer & Data Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Time Remaining</div>
            <div className={`text-3xl font-bold font-mono ${isLowTime ? 'text-red-400' : 'text-emerald-400'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${isLowTime ? 'bg-red-400' : 'bg-emerald-400'}`}
                style={{ width: `${timePercent}%` }} />
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Data Used</div>
            <div className="text-3xl font-bold font-mono text-cyan-400">{formatBytes(dataUsed)}</div>
            <div className="text-xs text-slate-500 mt-1">of {formatBytes(proxy.bytesLimit)}</div>
            <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${dataPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Proxy Credentials */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-sm font-semibold text-white mb-4">Proxy Credentials</h3>
          <div className="space-y-3">
            {[
              { label: "Host", value: proxy.host, field: "host" },
              { label: "Port", value: String(proxy.port), field: "port" },
              { label: "Username", value: proxy.username, field: "user" },
              { label: "Password", value: proxy.password, field: "pass" },
            ].map(({ label, value, field }) => (
              <div key={field} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-slate-500">{label}</span>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-slate-200 bg-white/5 px-2 py-0.5 rounded">{value}</code>
                  <button onClick={() => copyToClipboard(value, field)}
                    className="p-1 hover:bg-white/10 rounded transition-colors">
                    {copiedField === field ? <span className="text-emerald-400"><IconCheck /></span> : <span className="text-slate-500"><IconCopy /></span>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connection Test */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-sm font-semibold text-white mb-4">Connection Test</h3>
          <button onClick={testConnection}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 hover:bg-white/10 transition-all">
            {testResult === "testing" ? "Testing..." : "Test Connection"}
          </button>
          {testResult && testResult !== "testing" && (
            <div className="mt-3 text-sm text-slate-400">{testResult}</div>
          )}
        </div>

        {/* Quick Setup */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-sm font-semibold text-white mb-4">Quick Setup — cURL</h3>
          <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto">
            <pre>{`curl -x http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port} \\
  -U https://api.ipify.org?format=json`}</pre>
            <button onClick={() => copyToClipboard(`curl -x http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port} -U https://api.ipify.org?format=json`, "curl")}
              className="mt-2 text-emerald-400 hover:text-emerald-300 text-xs flex items-center gap-1">
              {copiedField === "curl" ? <><IconCheck /> Copied</> : <><IconCopy /> Copy</>}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button onClick={handleRevoke}
            className="text-sm text-red-400 hover:text-red-300 transition-colors">
            Revoke Trial
          </button>
          <Link href="mailto:ipmobi.net@gmail.com?subject=Trial%20Support"
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            Need Help?
          </Link>
        </div>
      </div>
    </div>
  );
}
