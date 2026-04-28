"use client";

import { useEffect, useState } from "react";
import { Server, Activity, XCircle, CheckCircle2, Shield, ChevronRight, Globe, Users, ArrowLeft, Terminal, Clock, Copy, Zap, ExternalLink, Wifi } from "@/components/ui/Icons";

interface ProxyPort {
  id: number;
  port: number;
  modemId: string;
  user: string;
  status: "Active" | "Inactive" | "Suspended";
  bandwidthUsed: string;
  bandwidthLimit: string;
  ipAssigned: string;
  carrier: string;
  createdAt: string;
}

export default function AdminPorts() {
  const [ports, setPorts] = useState<ProxyPort[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive" | "Suspended">("All");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ipmobi_admin_ports");
    if (stored) {
      try {
        setPorts(JSON.parse(stored));
        return;
      } catch {}
    }

    const defaultPorts: ProxyPort[] = [
      { id: 1, port: 8080, modemId: "modem-01", user: "alex@example.com", status: "Active", bandwidthUsed: "847.3 MB", bandwidthLimit: "10 GB", ipAssigned: "124.13.45.12", carrier: "CelcomDigi", createdAt: "2026-04-20" },
      { id: 2, port: 8081, modemId: "modem-02", user: "jane@corp.net", status: "Active", bandwidthUsed: "2.1 GB", bandwidthLimit: "10 GB", ipAssigned: "115.134.22.87", carrier: "Maxis", createdAt: "2026-04-18" },
      { id: 3, port: 8082, modemId: "modem-03", user: "bob@enterprise.com", status: "Active", bandwidthUsed: "5.4 GB", bandwidthLimit: "20 GB", ipAssigned: "202.58.73.44", carrier: "CelcomDigi", createdAt: "2026-04-10" },
      { id: 4, port: 8083, modemId: "modem-04", user: "sarah@dev.io", status: "Active", bandwidthUsed: "1.2 GB", bandwidthLimit: "10 GB", ipAssigned: "124.13.78.91", carrier: "U Mobile", createdAt: "2026-04-01" },
      { id: 5, port: 8084, modemId: "modem-05", user: "client@corp.com", status: "Active", bandwidthUsed: "3.8 GB", bandwidthLimit: "15 GB", ipAssigned: "115.134.56.23", carrier: "Maxis", createdAt: "2026-03-28" },
      { id: 6, port: 8085, modemId: "modem-06", user: "—", status: "Inactive", bandwidthUsed: "0 B", bandwidthLimit: "—", ipAssigned: "—", carrier: "CelcomDigi", createdAt: "2026-03-15" },
      { id: 7, port: 8086, modemId: "modem-07", user: "abuse@example.com", status: "Suspended", bandwidthUsed: "389 MB", bandwidthLimit: "10 GB", ipAssigned: "202.58.12.67", carrier: "U Mobile", createdAt: "2026-03-10" },
      { id: 8, port: 8087, modemId: "modem-08", user: "test@spam.com", status: "Suspended", bandwidthUsed: "2.1 GB", bandwidthLimit: "—", ipAssigned: "124.13.33.44", carrier: "CelcomDigi", createdAt: "2026-03-05" },
    ];
    setPorts(defaultPorts);
    localStorage.setItem("ipmobi_admin_ports", JSON.stringify(defaultPorts));
  }, []);

  const filteredPorts = ports.filter((p) => {
    const matchesSearch =
      p.modemId.toLowerCase().includes(search.toLowerCase()) ||
      p.user.toLowerCase().includes(search.toLowerCase()) ||
      String(p.port).includes(search) ||
      p.ipAssigned.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRevoke = (id: number) => {
    setPorts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Suspended" as const, user: "—" } : p))
    );
  };

  const handleAddPort = () => {
    const newId = ports.length + 1;
    const newPort: ProxyPort = {
      id: newId,
      port: 8080 + newId,
      modemId: `modem-${String(newId).padStart(2, "0")}`,
      user: "—",
      status: "Inactive",
      bandwidthUsed: "0 B",
      bandwidthLimit: "—",
      ipAssigned: "—",
      carrier: "CelcomDigi",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setPorts((prev) => [...prev, newPort]);
    setShowAddModal(false);
  };

  const statusColors: Record<string, string> = {
    Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Inactive: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    Suspended: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const carrierColors: Record<string, string> = {
    CelcomDigi: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Maxis: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "U Mobile": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Proxy Port Management</h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage proxy ports, assign to users, and monitor status.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-black font-medium text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
        >
          <ChevronRight size={16} />
          Add Port
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Activity size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by modem ID, port, user, or IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/[0.03] border border-surface-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {(["All", "Active", "Inactive", "Suspended"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === f
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-slate-400 hover:text-white border border-transparent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Ports Table */}
      <div className="rounded-xl border border-surface-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/[0.02] border-b border-surface-border">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Port</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Modem</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Bandwidth</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">IP Assigned</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Carrier</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Created</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {filteredPorts.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-emerald-400">{p.port}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Server size={14} className="text-slate-500" />
                      <span className="text-sm text-white font-mono">{p.modemId}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">{p.user}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[p.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        p.status === "Active" ? "bg-emerald-500" :
                        p.status === "Inactive" ? "bg-slate-500" : "bg-red-500"
                      }`} />
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-white">{p.bandwidthUsed}</div>
                    {p.bandwidthLimit !== "—" && (
                      <div className="text-xs text-slate-500">/ {p.bandwidthLimit}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-slate-400">{p.ipAssigned}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${carrierColors[p.carrier] || "bg-slate-500/10 text-slate-400"}`}>
                      {p.carrier}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">{p.createdAt}</td>
                  <td className="px-4 py-3 text-right">
                    {p.status !== "Inactive" && (
                      <button
                        onClick={() => handleRevoke(p.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all"
                      >
                        <XCircle size={12} />
                        Revoke
                      </button>
                    )}
                    {p.status === "Inactive" && (
                      <span className="text-xs text-slate-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPorts.length === 0 && (
          <div className="p-12 text-center">
            <Server size={40} className="mx-auto text-slate-600 mb-3" />
            <p className="text-sm text-slate-500">No proxy ports found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Add Port Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-[#0a0e1a] border border-surface-border rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <ChevronRight size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Add Proxy Port</h3>
                <p className="text-xs text-slate-500">Provision a new proxy port to the pool</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Modem ID</label>
                <input
                  type="text"
                  value={`modem-${String(ports.length + 1).padStart(2, "0")}`}
                  disabled
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-surface-border text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Port Number</label>
                <input
                  type="text"
                  value={8080 + ports.length}
                  disabled
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-surface-border text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Carrier</label>
                <select className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-surface-border text-sm text-white focus:outline-none focus:border-emerald-500/40">
                  <option value="CelcomDigi">CelcomDigi</option>
                  <option value="Maxis">Maxis</option>
                  <option value="U Mobile">U Mobile</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white border border-surface-border hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPort}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-emerald-500 text-black hover:bg-emerald-400 transition-all"
              >
                Add Port
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
