"use client";

import { Suspense } from "react";
import AuthCallbackInner from "./AuthCallbackInner";

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-10 h-10 border-3 border-emerald-400 border-t-transparent rounded-full mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Loading...</h2>
        </div>
      </div>
    }>
      <AuthCallbackInner />
    </Suspense>
  );
}
