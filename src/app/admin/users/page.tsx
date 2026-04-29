"use client";

import { useEffect, useState } from "react";
import { Server, Activity, XCircle, CheckCircle2, Shield, ChevronRight, Globe, Users as UsersIcon, ArrowLeft, Terminal, Clock, Copy, Zap, ExternalLink, Wifi } from "@/components/ui/Icons";

interface TrialInfo {
  status: string | null;
  started_at: string | null;
  expires_at: string | null;
  proxy_port: number | null;
  bytes_used: number;
}

interface UserRecord {
  id: number;
  email: string;
  name: string;
  provider: string;
  provider_id: string;
  created_at: string | null;
  is_blocked: boolean;
  trial_count: number;
  latest_trial: TrialInfo | null;
}

const formatBytes = (bytes: number) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const formatDate = (ts: string | null) => {
  if (!ts) return "N/A";
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function AdminUsers() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "blocked">("all");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const resp = await fetch("https://api.ipmobi.net/api/admin/users", {
        headers: { "Authorization": "Bearer ipmobi-admin-2026" },
      });
      if (!resp.ok) throw new Error("Failed to fetch users");
      const data = await resp.json();
      setUsers(data.users || []);
    } catch (e: any) {
      setError(e.message || "Could not load users");
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleUnbind = async (userId: number) => {
    if (!confirm("Unbind this user? They will be able to start a new trial.")) return;
    try {
      const resp = await fetch(`https://api.ipmobi.net/api/admin/users/${userId}/unbind`, {
        method: "POST",
        headers: { "Authorization": "Bearer ipmobi-admin-2026" },
      });
      if (resp.ok) {
        alert("User unbound successfully");
        fetchUsers();
      }
    } catch { alert("Failed to unbind user"); }
  };

  const handleBlock = async (userId: number) => {
    try {
      const resp = await fetch(`https://api.ipmobi.net/api/admin/users/${userId}/block`, {
        method: "POST",
        headers: { "Authorization": "Bearer ipmobi-admin-2026" },
      });
      if (resp.ok) {
        const data = await resp.json();
        alert(data.blocked ? "User blocked" : "User unblocked");
        fetchUsers();
      }
    } catch { alert("Failed"); }
  };

  const filtered = users.filter((u) => {
    const matchSearch = u.email.toLowerCase().includes(search.toLowerCase()) || u.name.toLowerCase().includes(search.toLowerCase());
    if (filter === "active") return matchSearch && !u.is_blocked;
    if (filter === "blocked") return matchSearch && u.is_blocked;
    return matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-sm text-slate-400 mt-1">View, block, or unbind users</p>
        </div>
        <button onClick={fetchUsers} className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 text-sm hover:bg-white/10 transition-all">
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by email or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
        />
        <div className="flex gap-2">
          {(["all", "active", "blocked"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                filter === f ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center py-20">
          <div className="animate-spin inline-block w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full mb-4" />
          <p className="text-slate-400 text-sm">Loading users...</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          <div className="text-xs text-slate-500 px-2">{filtered.length} user(s)</div>
          {filtered.map((user) => (
            <div key={user.id} className="rounded-xl bg-white/[0.03] border border-surface-border overflow-hidden">
              <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${user.is_blocked ? "bg-red-500/20" : "bg-emerald-500/20"} flex items-center justify-center`}>
                      <UsersIcon size={16} className={user.is_blocked ? "text-red-400" : "text-emerald-400"} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    {user.is_blocked && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs">Blocked</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{user.provider}</span>
                  <span>{user.trial_count} trial(s)</span>
                  <span>{formatDate(user.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {!user.is_blocked && (
                    <button onClick={() => handleBlock(user.id)} className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition-all">
                      Block
                    </button>
                  )}
                  {user.is_blocked && (
                    <button onClick={() => handleBlock(user.id)} className="px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-400 text-xs hover:bg-emerald-500/10 transition-all">
                      Unblock
                    </button>
                  )}
                  <button onClick={() => handleUnbind(user.id)} className="px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-400 text-xs hover:bg-amber-500/10 transition-all">
                    Unbind
                  </button>
                  <button onClick={() => setExpandedId(expandedId === user.id ? null : user.id)} className="text-slate-500 hover:text-white">
                    <ChevronRight size={16} className={`transition-transform ${expandedId === user.id ? "rotate-90" : ""}`} />
                  </button>
                </div>
              </div>

              {expandedId === user.id && user.latest_trial && (
                <div className="px-4 pb-4 border-t border-surface-border pt-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <p className="text-slate-500 mb-1">Status</p>
                      <p className="text-white">{user.latest_trial.status || "None"}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Port</p>
                      <p className="text-white">{user.latest_trial.proxy_port || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Started</p>
                      <p className="text-white">{formatDate(user.latest_trial.started_at)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Bandwidth</p>
                      <p className="text-white">{formatBytes(user.latest_trial.bytes_used)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
