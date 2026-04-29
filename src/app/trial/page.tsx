"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Zap, Shield, Clock } from "@/components/ui/Icons";

// Real OAuth URLs that work from static frontend
// These redirect to Google/GitHub auth and come back to /auth/callback
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=24703942746-k1n19h6fr5t1pm2rh53kflm8e6b53qio.apps.googleusercontent.com&redirect_uri=${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback&response_type=code&scope=email%20profile`;
const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=Ov23liRxVYCS1surSt30&redirect_uri=${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback&scope=user:email`;

export default function TrialPage() {
  const [hasToken, setHasToken] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
    
    const token = localStorage.getItem("ipmobi_trial_token");
    if (token) {
      setHasToken(true);
      // Redirect to active trial page
      window.location.href = "/trial/active";
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const err = params.get("error");
    if (err) {
      const errorMessages: Record<string, string> = {
        rate_limited: "Too many requests from your IP. Please try again in 24 hours.",
        blocklisted_email: "Please use a non-temporary email address.",
        account_too_new: "Your account is too new. It must be at least 30 days old.",
        blocked: "Your account has been blocked.",
        token_exchange_failed: "Authentication failed. Please try again.",
        no_access_token: "Could not authenticate. Please try again.",
        userinfo_failed: "Could not fetch user info. Please try again.",
        no_user_id: "Could not identify user. Please try again.",
        no_code: "Authentication was cancelled.",
      };
      setError(errorMessages[err] || err);
    }
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "https://api.ipmobi.net/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "https://api.ipmobi.net/auth/github";
  };

  if (hasToken) {
    // Will redirect via window.location.href in useEffect
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error banner */}
        {error && (
          <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-card/80 border border-surface-border text-xs sm:text-sm text-emerald-400 mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            No credit card required
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4">
            <span className="text-white">Try IPMobi Free —</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
              15 Minutes, 100MB
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed mb-10">
            Get instant access to a dedicated mobile proxy. Test our infrastructure
            with zero commitment — no credit card, no signup form, just click and go.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border text-center">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Dedicated Modem</h3>
            <p className="text-sm text-slate-400">Real Malaysian mobile IP on a dedicated physical modem. No VM sharing.</p>
          </div>

          <div className="p-6 rounded-xl bg-surface-card border border-surface-border text-center">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Credit Card</h3>
            <p className="text-sm text-slate-400">Free trial with zero commitment. Sign in with Google or GitHub and go.</p>
          </div>

          <div className="p-6 rounded-xl bg-surface-card border border-surface-border text-center">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mx-auto mb-4 text-purple-400">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Instant Setup</h3>
            <p className="text-sm text-slate-400">Your proxy is provisioned in seconds. Copy credentials and start using immediately.</p>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="max-w-md mx-auto space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-lg bg-white hover:bg-gray-100 text-gray-900 font-medium transition-all shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-surface-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#030712] px-4 text-slate-500">or</span>
            </div>
          </div>

          <button
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-lg bg-[#24292F] hover:bg-[#1b1f23] text-white font-medium transition-all border border-[#333] shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Sign in with GitHub
          </button>


        </div>

        {/* Back Link */}
        <div className="text-center mt-10">
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
