"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"processing" | "error">("processing");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setErrorMsg(error);
      return;
    }

    if (!token) {
      setStatus("error");
      setErrorMsg("No authentication token received.");
      return;
    }

    // Store token in localStorage
    localStorage.setItem("ipmobi_trial_token", token);

    // Redirect to trial active page
    setTimeout(() => {
      router.push("/trial/active");
    }, 500);
  }, [searchParams, router]);

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-2xl">!</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Authentication Failed</h2>
          <p className="text-slate-400 mb-6">{errorMsg}</p>
          <button
            onClick={() => router.push("/trial")}
            className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin inline-block w-10 h-10 border-3 border-emerald-400 border-t-transparent rounded-full mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Signing you in...</h2>
        <p className="text-slate-400 text-sm">Redirecting to your trial dashboard</p>
      </div>
    </div>
  );
}

export default AuthCallbackInner;
