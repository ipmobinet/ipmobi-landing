"use client";

import { useEffect, useState } from "react";
import { Server, Activity, XCircle, CheckCircle2, Shield, ChevronRight, Globe, Users, ArrowLeft, Terminal, Clock, Copy, Zap, ExternalLink, Wifi } from "@/components/ui/Icons";

interface User {
  id: number;
  email: string;
  provider: "Google" | "GitHub" | "Email";
  createdAt: string;
  status: "Active" | "Blocked";
  trials: number;
  bandwidthUsed: string;
  lastActivity: string;
}

interface TrialDetail {
  id: number;
  port: string;
  startedAt: string;
  expiresAt: string;
  bandwidthUsed: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Blocked">("All");

  useEffect(() => {
    const stored = localStorage.getItem("ipmobi_admin_users");
    if (stored) {
      try {
        setUsers(JSON.parse(stored));
        return;
      } catch {}
    }

    const defaultUsers: User[] = [
      { id: 1, email: "alex@example.com", provider: "Google", createdAt: "2026-04-20", status: "Active", trials: 2, bandwidthUsed: "12.4 GB", lastActivity: "2 min ago" },
      { id: 2, email: "jane@corp.net", provider: "GitHub", createdAt: "2026-04-18", status: "Active", trials: 1, bandwidthUsed: "847 MB", lastActivity: "1 hour ago" },
      { id: 3, email: "test@spam.com", provider: "Email", createdAt: "2026-04-15", status: "Blocked", trials: 5, bandwidthUsed: "0 B", lastActivity: "3 days ago" },
      { id: 4, email: "bob@enterprise.com", provider: "Google", createdAt: "2026-04-10", status: "Active", trials: 3, bandwidthUsed: "45.2 GB", lastActivity: "30 min ago" },
      { id: 5, email: "abuse@example.com", provider: "GitHub", createdAt: "2026-04-08", status: "Blocked", trials: 8, bandwidthUsed: "2.1 GB", lastActivity: "1 week ago" },
      { id: 6, email: "client@corp.com", provider: "Email", createdAt: "2026-04-05", status: "Active", trials: 1, bandwidthUsed: "5.7 GB", lastActivity: "4 hours ago" },
      { id: 7, email: "sarah@dev.io", provider: "Google", createdAt: "2026-04-01", status: "Active", trials: 2, bandwidthUsed: "22.1 GB", lastActivity: "1 day ago" },
      { id: 8, email: "malicious@bad.net", provider: "GitHub", createdAt: "2026-03-28", status: "Blocked", trials: 12, bandwidthUsed: "389 MB", lastActivity: "2 weeks ago" },
    ];
    setUsers(defaultUsers);
    localStorage.setItem("ipmobi_admin_users", JSON.stringify(defaultUsers));
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleBlock = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === "Active" ? "Blocked" : "Active";
          return { ...u, status: newStatus as "Active" | "Blocked" };
        }
        return u;
      })
    );
  };

  const getTrialDetails = (userId: number): TrialDetail[] => {
    const trials: Record<number, TrialDetail[]> = {
      1: [
        { id: 1, port: "modem-01:8080", startedAt: "2026-04-20 10:30", expiresAt: "2026-04-21 10:30", bandwidthUsed: "847 MB" },
        { id: 2, port: "modem-03:8082", startedAt: "2026-04-22 14:00", expiresAt: "2026-04-23 14:00", bandwidthUsed: "1.2 GB" },
      ],
      4: [
        { id: 3, port: "modem-05:8084", startedAt: "2026-04-10 09:00", expiresAt: "2026-04-11 09:00", bandwidthUsed: "2.4 GB" },
      ],
    };
    return trials[userId] || [];
  };

  const providerColors: Record<string, string> = {
    Google: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    GitHub: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Email: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage all registered users, block abusive accounts, and review activity.
          </p>
        </div>
        <div className="text-sm text-slate-500">
          {users.length} total users
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Activity size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/[0.03] border border-surface-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {(["All", "Active", "Blocked"] as const).map((f) => (
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

      {/* Users Table */}
      <div className="rounded-xl border border-surface-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/[0.02] border-b border-surface-border">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Provider</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Created</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {filteredUsers.map((user) => (
                <>
                  <tr
                    key={user.id}
                    onClick={() => setExpandedId(expandedId === user.id ? null : user.id)}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 text-sm text-slate-400">#{user.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-medium">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-white">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${providerColors[user.provider] || providerColors.Email}`}>
                        {user.provider}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">{user.createdAt}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`} />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleBlock(user.id)}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            user.status === "Active"
                              ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                              : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20"
                          }`}
                        >
                          {user.status === "Active" ? (
                            <><XCircle size={12} /> Block</>
                          ) : (
                            <><CheckCircle2 size={12} /> Unblock</>
                          )}
                        </button>
                        <ChevronRight
                          size={16}
                          className={`text-slate-500 transition-transform ${
                            expandedId === user.id ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </td>
                  </tr>
                  {expandedId === user.id && (
                    <tr key={`${user.id}-expanded`}>
                      <td colSpan={6} className="px-4 py-4 bg-white/[0.01]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="p-3 rounded-lg bg-white/[0.02] border border-surface-border">
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                              <Activity size={12} />
                              Trials Used
                            </div>
                            <span className="text-lg font-semibold text-white">{user.trials}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white/[0.02] border border-surface-border">
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                              <Zap size={12} />
                              Bandwidth Used
                            </div>
                            <span className="text-lg font-semibold text-white">{user.bandwidthUsed}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-white/[0.02] border border-surface-border">
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                              <Clock size={12} />
                              Last Activity
                            </div>
                            <span className="text-lg font-semibold text-white">{user.lastActivity}</span>
                          </div>
                        </div>

                        {getTrialDetails(user.id).length > 0 && (
                          <>
                            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Trial History</h4>
                            <div className="space-y-2">
                              {getTrialDetails(user.id).map((trial) => (
                                <div
                                  key={trial.id}
                                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-surface-border text-sm"
                                >
                                  <div className="flex items-center gap-3">
                                    <Server size={14} className="text-slate-500" />
                                    <span className="text-white">{trial.port}</span>
                                  </div>
                                  <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span>{trial.startedAt}</span>
                                    <span>→</span>
                                    <span>{trial.expiresAt}</span>
                                    <span className="text-slate-400">{trial.bandwidthUsed}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <Users size={40} className="mx-auto text-slate-600 mb-3" />
            <p className="text-sm text-slate-500">No users found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
