"use client";

import { useEffect, useState } from "react";
import { Server, CheckCircle2, ExternalLink, Copy, Shield } from "@/components/ui/Icons";

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

interface ProxyRow {
  id: string;
  port: number;
  host: string;
  status: "Active" | "Inactive";
  bandwidthUsed: string;
  ip: string;
  created: string;
}

export default function ProxiesPage() {
  const [proxies, setProxies] = useState<ProxyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [rotating, setRotating] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("ipmobi_trial_proxy");
    const hosts = ["103.15.xx.xxx", "113.211.xx.xxx", "175.136.xx.xxx"];
    const usedHosts: string[] = [];

    if (raw) {
      try {
        const data: ProxyData = JSON.parse(raw);
        const formatBytes = (bytes: number) => {
          if (bytes === 0) return "0 B";
          const k = 1024;
          const sizes = ["B", "KB", "MB", "GB"];
          const i = Math.floor(Math.log(bytes) / Math.log(k));
          return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
        };

        const rows: ProxyRow[] = [
          {
            id: "main",
            port: data.port,
            host: data.host,
            status: "Active",
            bandwidthUsed: formatBytes(data.bytesUsed + Math.floor(Math.random() * 2 * 1024 * 1024)),
            ip: hosts[0],
            created: new Date(data.startedAt).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            }),
          },
        ];

        // Add some mock additional proxies
        for (let i = 1; i <= 3; i++) {
          const h = hosts[i % hosts.length];
          if (!usedHosts.includes(h)) usedHosts.push(h);
          rows.push({
            id: `mock-${i}`,
            port: data.port + i * 10,
            host: data.host,
            status: i < 2 ? "Active" : "Inactive",
            bandwidthUsed: formatBytes(Math.floor(Math.random() * 50 * 1024 * 1024)),
            ip: hosts[i % hosts.length],
            created: new Date(data.startedAt - i * 86400000).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            }),
          });
        }

        setProxies(rows);
      } catch {
        setProxies([]);
      }
    }
    setLoading(false);
  }, []);

  const handleRotate = (id: string) => {
    setRotating(id);
    setTimeout(() => {
      setProxies((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            const newIp = `103.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.xxx`;
            return { ...p, ip: newIp, status: "Active" };
          }
          return p;
        })
      );
      setRotating(null);
    }, 2000);
  };

  const handleNewProxy = () => {
    // In a real app, this would open a modal or navigate to order flow
    alert("New proxy ordering will be available soon. Contact sales at ipmobi.net@gmail.com");
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {}
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin inline-block w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">My Proxies</h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage your allocated proxy ports and IP addresses.
          </p>
        </div>
        <button
          onClick={handleNewProxy}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-black font-medium text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Shield size={16} />
          New Proxy
        </button>
      </div>

      {/* Proxy Table */}
      <div className="rounded-xl border border-surface-border overflow-hidden bg-white/[0.02]">
        {/* Table Header - hidden on mobile */}
        <div className="hidden sm:grid grid-cols-7 gap-4 px-6 py-3 bg-white/[0.03] border-b border-surface-border text-xs font-medium text-slate-500 uppercase tracking-wider">
          <div>Port</div>
          <div>Status</div>
          <div>Bandwidth Used</div>
          <div className="col-span-2">IP Address</div>
          <div>Created</div>
          <div className="text-right">Actions</div>
        </div>

        {/* Table Rows */}
        {proxies.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-500">
            <Server size={40} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No proxies allocated yet.</p>
            <button
              onClick={handleNewProxy}
              className="mt-3 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Request a new proxy port
            </button>
          </div>
        ) : (
          <div className="divide-y divide-surface-border">
            {proxies.map((proxy) => (
              <div
                key={proxy.id}
                className="grid grid-cols-1 sm:grid-cols-7 gap-2 sm:gap-4 px-4 sm:px-6 py-4 hover:bg-white/[0.02] transition-all"
              >
                {/* Mobile label + value */}
                <div className="sm:hidden text-xs text-slate-500">Port</div>
                <div className="sm:flex items-center">
                  <code className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {proxy.port}
                  </code>
                </div>

                <div className="sm:hidden text-xs text-slate-500 mt-2">Status</div>
                <div className="sm:flex items-center">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                      proxy.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        proxy.status === "Active" ? "bg-emerald-400" : "bg-slate-400"
                      }`}
                    />
                    {proxy.status}
                  </span>
                </div>

                <div className="sm:hidden text-xs text-slate-500 mt-2">Bandwidth</div>
                <div className="sm:flex items-center text-sm text-slate-300">
                  {proxy.bandwidthUsed}
                </div>

                <div className="sm:hidden text-xs text-slate-500 mt-2">IP</div>
                <div className="sm:col-span-2 sm:flex items-center">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded">
                      {proxy.ip}
                    </code>
                    <button
                      onClick={() => copyToClipboard(proxy.ip, `ip-${proxy.id}`)}
                      className="p-1 hover:bg-white/10 rounded transition-colors text-slate-500 hover:text-emerald-400"
                    >
                      {copiedField === `ip-${proxy.id}` ? (
                        <CheckCircle2 size={14} className="text-emerald-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="sm:hidden text-xs text-slate-500 mt-2">Created</div>
                <div className="sm:flex items-center text-sm text-slate-400">
                  {proxy.created}
                </div>

                <div className="sm:flex items-center justify-end mt-2 sm:mt-0">
                  {proxy.status === "Active" ? (
                    <button
                      onClick={() => handleRotate(proxy.id)}
                      disabled={rotating === proxy.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        rotating === proxy.id
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 cursor-not-allowed"
                          : "bg-white/5 text-slate-300 border border-surface-border hover:bg-white/10 hover:text-emerald-400"
                      }`}
                    >
                      {rotating === proxy.id ? (
                        <>
                          <div className="animate-spin w-3 h-3 border border-amber-400 border-t-transparent rounded-full" />
                          Rotating...
                        </>
                      ) : (
                        <>
                          <ExternalLink size={12} />
                          Rotate IP
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Connection Info */}
      {proxies.length > 0 && (
        <div className="p-5 rounded-xl bg-white/[0.03] border border-surface-border">
          <h3 className="text-sm font-semibold text-white mb-3">Connection Details</h3>
          <div className="space-y-2 text-sm">
            <p className="text-slate-400">
              <span className="text-slate-500">Gateway:</span>{" "}
              <code className="text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded">
                {proxies[0].host}
              </code>
            </p>
            <p className="text-slate-400">
              <span className="text-slate-500">Authentication:</span> HTTP Basic Auth
            </p>
            <p className="text-slate-400">
              <span className="text-slate-500">Protocol:</span> HTTP/HTTPS/SOCKS5
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
