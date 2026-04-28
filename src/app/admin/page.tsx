"use client";

import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "ipmobi-admin-2026";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authed = localStorage.getItem("ipmobi_admin_auth");
    if (authed === "true") {
      window.location.href = "/admin/dashboard";
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("ipmobi_admin_auth", "true");
      window.location.href = "/admin/dashboard";
    } else {
      setError("Wrong password");
      setPassword("");
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-sm text-slate-400 mt-1">IPMobi Management Panel</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {error && (
              <div className="mb-4 text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">{error}</div>
            )}
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors"
            >
              Access Panel
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Back to Home</a>
        </div>
      </div>
    </div>
  );
}
