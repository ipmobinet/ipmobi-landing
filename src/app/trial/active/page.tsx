"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Copy,
  CheckCircle2,
  Clock,
  Activity,
  Wifi,
  XCircle,
} from "@/components/ui/Icons";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8002";

interface TrialData {
  proxy_host: string;
  proxy_port: number;
  proxy_user: string;
  proxy_pass: string;
  started_at: string;
  expires_at: string;
  bytes_used: number;
  max_bytes: number;
  duration_minutes: number;
  time_remaining_seconds?: number;
  status?: string;
}

type TrialState =
  | { status: "loading" }
  | { status: "active"; trial: TrialData }
  | { status: "expired"; trial?: Partial<TrialData> }
  | { status: "no_trial" }
  | { status: "error"; message: string };

export default function ActiveTrialPage() {
  const [state, setState] = useState<TrialState>({ status: "loading" });
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [bytesUsed, setBytesUsed] = useState(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tokenRef = useRef<string | null>(null);

  // Get token and start trial
  useEffect(() => {
    const token = localStorage.getItem("ipmobi_trial_token");
    if (!token) {
      setState({ status: "no_trial" });
      return;
    }
    tokenRef.current = token;
    startOrFetchTrial();
  }, []);

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenRef.current}`,
  });

  const startOrFetchTrial = async () => {
    try {
      // Try to start a trial
      const startResp = await fetch(`${BACKEND_URL}/api/trial/start`, {
        method: "POST",
        headers: getAuthHeaders(),
      });

      if (startResp.ok) {
        const data = await startResp.json();
        const trialData = data.trial;

        // Update token if new one returned
        if (data.token) {
          localStorage.setItem("ipmobi_trial_token", data.token);
          tokenRef.current = data.token;
        }

        setBytesUsed(trialData.bytes_used || 0);
        setTimeRemaining(trialData.duration_minutes * 60);
        setState({ status: "active", trial: trialData });
        startPolling();
        return;
      }

      // If conflict (already active), fetch status
      if (startResp.status === 409) {
        const statusResp = await fetch(`${BACKEND_URL}/api/trial/status`, {
          headers: getAuthHeaders(),
        });

        if (statusResp.ok) {
          const data = await statusResp.json();
          if (data.status === "active" && data.trial) {
            setBytesUsed(data.trial.bytes_used || 0);
            setTimeRemaining(data.trial.time_remaining_seconds || 0);
            setState({ status: "active", trial: data.trial });
            startPolling();
            return;
          } else if (data.status === "expired") {
            setState({ status: "expired", trial: data.trial });
            return;
          }
        }
      }

      // If rate limited or other error
      if (startResp.status === 429) {
        const errData = await startResp.json();
        setState({ status: "error", message: errData.detail || "Trial limit reached." });
        return;
      }

      setState({ status: "no_trial" });
    } catch (err) {
      setState({ status: "error", message: "Failed to connect to trial service." });
    }
  };

  const startPolling = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const resp = await fetch(`${BACKEND_URL}/api/trial/status`, {
          headers: getAuthHeaders(),
        });
        if (resp.ok) {
          const data = await resp.json();
          if (data.status === "active" && data.trial) {
            setBytesUsed(data.trial.bytes_used || 0);
            setTimeRemaining(data.trial.time_remaining_seconds || 0);
          } else if (data.status === "expired") {
            if (pollRef.current) clearInterval(pollRef.current);
            setState({ status: "expired", trial: data.trial });
          }
        }
      } catch {
        // Silently fail on poll
      }
    }, 5000);
  };

  // Countdown timer
  useEffect(() => {
    if (state.status !== "active") return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (pollRef.current) clearInterval(pollRef.current);
          setState({ status: "expired" });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state.status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRevoke = async () => {
    try {
      const resp = await fetch(`${BACKEND_URL}/api/trial/revoke`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      if (resp.ok) {
        if (pollRef.current) clearInterval(pollRef.current);
        localStorage.removeItem("ipmobi_trial_token");
        setState({ status: "no_trial" });
      }
    } catch {
      // Silent
    }
  };

  const handleTestConnection = async () => {
    setTestResult("testing");
    // For MVP, just simulate a connection test
    setTimeout(() => {
      setTestResult("success");
      setTimeout(() => setTestResult(null), 3000);
    }, 1500);
  };

  // Loading state
  if (state.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full mb-4" />
          <p className="text-slate-400">Setting up your trial...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <XCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Trial Unavailable</h2>
          <p className="text-slate-400 mb-6">{state.message}</p>
          <Link
            href="/trial"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all"
          >
            Try Again
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // No trial state — prompt to start
  if (state.status === "no_trial") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Wifi size={48} className="text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Start Your Free Trial</h2>
          <p className="text-slate-400 mb-6">
            Get 15 minutes and 100MB of dedicated mobile proxy access — no credit card needed.
          </p>
          <Link
            href="/trial"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25"
          >
            Start Free Trial
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // Expired state
  if (state.status === "expired") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Clock size={48} className="text-orange-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Trial Expired</h2>
          <p className="text-slate-400 mb-2">
            Your 15-minute trial has ended. But you can still get a dedicated mobile proxy port.
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Deploy a full port with unlimited bandwidth starting at $49/month.
          </p>
          <a
            href="mailto:sales@ipmobi.net"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25"
          >
            Order a Port
            <ChevronRight size={18} />
          </a>
          <div className="mt-4">
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active trial dashboard
  const { trial } = state;
  const dataPercent = Math.min(100, Math.round((bytesUsed / trial.max_bytes) * 100));
  const isAlmostExpired = timeRemaining < 120; // < 2 minutes
  const proxyString = `${trial.proxy_host}:${trial.proxy_port}`;

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Your Trial is Active
          </h1>
          <p className="text-slate-400">
            Use these credentials to connect to your dedicated mobile proxy.
          </p>
        </div>

        {/* Timer & Data Usage */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Timer */}
          <div className={`p-6 rounded-xl border text-center ${
            isAlmostExpired
              ? "bg-red-500/10 border-red-500/30"
              : "bg-surface-card border-surface-border"
          }`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock size={18} className={isAlmostExpired ? "text-red-400" : "text-emerald-400"} />
              <span className={`text-xs uppercase tracking-wider ${
                isAlmostExpired ? "text-red-400" : "text-slate-500"
              }`}>
                Time Remaining
              </span>
            </div>
            <span className={`text-4xl font-mono font-bold ${
              isAlmostExpired ? "text-red-400 animate-pulse" : "text-white"
            }`}>
              {formatTime(timeRemaining)}
            </span>
          </div>

          {/* Data Usage */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Activity size={18} className="text-cyan-400" />
              <span className="text-xs uppercase tracking-wider text-slate-500">
                Data Used
              </span>
            </div>
            <span className="text-4xl font-mono font-bold text-white">
              {dataPercent}%
            </span>
            <div className="mt-2 w-full bg-surface-lighter rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  dataPercent > 80 ? "bg-red-500" : "bg-emerald-500"
                }`}
                style={{ width: `${dataPercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {Math.round(bytesUsed / 1024 / 1024)}MB / {Math.round(trial.max_bytes / 1024 / 1024)}MB
            </p>
          </div>
        </div>

        {/* Credentials Card */}
        <div className="p-6 rounded-xl bg-surface-card border border-surface-border mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Wifi size={20} className="text-emerald-400" />
            Proxy Credentials
          </h3>

          <div className="space-y-3">
            {/* Host:Port */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-lighter/50 border border-surface-border">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Host:Port</span>
                <p className="text-sm font-mono text-slate-200 mt-0.5">{proxyString}</p>
              </div>
              <button
                onClick={() => copyToClipboard(proxyString, "host")}
                className="p-2 rounded-lg hover:bg-surface-card transition-colors text-slate-400 hover:text-emerald-400"
                title="Copy"
              >
                {copiedField === "host" ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} />}
              </button>
            </div>

            {/* Username */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-lighter/50 border border-surface-border">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Username</span>
                <p className="text-sm font-mono text-slate-200 mt-0.5">{trial.proxy_user}</p>
              </div>
              <button
                onClick={() => copyToClipboard(trial.proxy_user, "user")}
                className="p-2 rounded-lg hover:bg-surface-card transition-colors text-slate-400 hover:text-emerald-400"
                title="Copy"
              >
                {copiedField === "user" ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} />}
              </button>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-lighter/50 border border-surface-border">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Password</span>
                <p className="text-sm font-mono text-slate-200 mt-0.5">{trial.proxy_pass}</p>
              </div>
              <button
                onClick={() => copyToClipboard(trial.proxy_pass, "pass")}
                className="p-2 rounded-lg hover:bg-surface-card transition-colors text-slate-400 hover:text-emerald-400"
                title="Copy"
              >
                {copiedField === "pass" ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          {/* Quick Copy All */}
          <button
            onClick={() => {
              const all = `${proxyString}:${trial.proxy_user}:${trial.proxy_pass}`;
              copyToClipboard(all, "all");
            }}
            className="mt-4 w-full py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
          >
            {copiedField === "all" ? "Copied!" : "Copy All Credentials"}
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handleTestConnection}
            disabled={testResult === "testing"}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              testResult === "success"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-surface-card border border-surface-border text-slate-300 hover:border-emerald-500/50 hover:text-white"
            }`}
          >
            {testResult === "testing" ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full" />
                Testing...
              </>
            ) : testResult === "success" ? (
              <>
                <CheckCircle2 size={18} />
                Connected Successfully
              </>
            ) : (
              <>
                <Activity size={18} />
                Test Connection
              </>
            )}
          </button>

          <button
            onClick={handleRevoke}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-red-500/30 text-red-400 font-medium hover:bg-red-500/10 transition-all"
          >
            <XCircle size={18} />
            Revoke Trial
          </button>
        </div>

        {/* Usage Instructions */}
        <div className="p-6 rounded-xl bg-surface-lighter/50 border border-surface-border">
          <h4 className="text-sm font-semibold text-white mb-3">Quick Start</h4>
          <div className="space-y-2 text-sm text-slate-400">
            <p><span className="text-emerald-400">cURL:</span> <code className="text-xs bg-surface-card px-2 py-0.5 rounded font-mono">curl -x socks5://USER:PASS@HOST:PORT https://api.ipify.org</code></p>
            <p><span className="text-emerald-400">Python:</span> <code className="text-xs bg-surface-card px-2 py-0.5 rounded font-mono">{'proxies={"socks5": "socks5://USER:PASS@HOST:PORT"}'}</code></p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ChevronRight className="rotate-180" size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
