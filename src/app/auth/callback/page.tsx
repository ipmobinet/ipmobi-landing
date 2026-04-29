"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const provider = params.get("provider") || "google";
      const error = params.get("error");

      if (error) {
        setStatus("error");
        setMessage(`Authentication failed: ${error}`);
        return;
      }

      if (!token) {
        setStatus("error");
        setMessage("No authentication token received.");
        return;
      }

      // Store the JWT token
      localStorage.setItem("ipmobi_jwt_token", token);
      localStorage.setItem("ipmobi_auth_provider", provider);

      // Try to start a trial via backend API
      try {
        const resp = await fetch("https://api.ipmobi.net/api/trial/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          signal: AbortSignal.timeout(15000),
        });

        const data = await resp.json();

        if (resp.ok && data.trial) {
          localStorage.setItem("ipmobi_trial_token", data.token || "");
          localStorage.setItem("ipmobi_trial_proxy", JSON.stringify({
            host: data.trial.proxy_host || "gw.ipmobi.net",
            port: data.trial.proxy_port || 10000,
            username: data.trial.proxy_user || "",
            password: data.trial.proxy_pass || "",
            bytesUsed: data.trial.bytes_used || 0,
            bytesLimit: data.trial.max_bytes || 104857600,
            startedAt: Date.now(),
            expiresAt: new Date(data.trial.expires_at).getTime() || (Date.now() + 15 * 60 * 1000),
          }));

          setStatus("success");
          setMessage("Trial activated! Redirecting...");
          setTimeout(() => window.location.href = "/trial/active", 1500);
          return;
        }

        // Trial not available (already used, blocked, etc.)
        if (resp.status === 403 || resp.status === 429) {
          setStatus("error");
          setMessage(data.detail || "Trial is not available. Your account may have already used the free trial.");
          return;
        }
      } catch {
        // Backend offline - can't start trial
      }

      // Still authenticated - redirect to dashboard
      setStatus("success");
      setMessage("Logged in! Redirecting to dashboard...");
      setTimeout(() => window.location.href = "/dashboard", 1500);
    };
    run();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712]">
      <div className="text-center max-w-md mx-auto px-6">
        {status === "processing" && (
          <>
            <div className="animate-spin inline-block w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full mb-6" />
            <h2 className="text-xl font-semibold text-white mb-2">Signing In...</h2>
            <p className="text-slate-400 text-sm">Completing authentication...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">{message}</h2>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Error</h2>
            <p className="text-slate-400 text-sm mb-6">{message}</p>
            <Link
              href="/trial"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-medium rounded-lg hover:bg-emerald-400 transition-all"
            >
              Try Again
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
