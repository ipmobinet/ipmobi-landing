"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      setStatus("error");
      setMessage(`Authentication failed: ${error}`);
      return;
    }

    if (!code) {
      setStatus("error");
      setMessage("No authorization code received.");
      return;
    }

    // For now, simulate successful trial creation and store a test token
    // In production, this would exchange the code with the FastAPI backend
    const mockToken = "trial_" + Math.random().toString(36).substring(2, 15);
    const mockExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    localStorage.setItem("ipmobi_trial_token", mockToken);
    localStorage.setItem("ipmobi_trial_expiry", String(mockExpiry));
    localStorage.setItem("ipmobi_trial_proxy", JSON.stringify({
      host: "gw.ipmobi.net",
      port: 10000 + Math.floor(Math.random() * 1000),
      username: "trial_" + Math.random().toString(36).substring(2, 8),
      password: Math.random().toString(36).substring(2, 12),
      bytesUsed: 0,
      bytesLimit: 104857600,
      startedAt: Date.now(),
      expiresAt: mockExpiry,
    }));

    setStatus("success");
    setMessage("Trial activated! Redirecting...");
    setTimeout(() => router.push("/trial/active"), 1500);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712]">
      <div className="text-center max-w-md mx-auto px-6">
        {status === "processing" && (
          <>
            <div className="animate-spin inline-block w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full mb-6" />
            <h2 className="text-xl font-semibold text-white mb-2">Activating Your Trial</h2>
            <p className="text-slate-400 text-sm">Provisioning your dedicated mobile proxy...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Trial Activated!</h2>
            <p className="text-slate-400 text-sm mb-6">{message}</p>
            <div className="animate-pulse text-xs text-slate-500">Redirecting to dashboard...</div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Trial Error</h2>
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
