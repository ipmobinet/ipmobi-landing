"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Globe,
  Server,
  Activity,
  Zap,
  Users,
  Shield,
  Terminal,
} from "@/components/ui/Icons";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Activity },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/ports", label: "Proxy Ports", icon: Server },
  { href: "/admin/bandwidth", label: "Bandwidth", icon: Zap },
  { href: "/admin/settings", label: "Settings", icon: Terminal },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("ipmobi_admin_auth");
      if (token === "true") {
        // Verify token is still valid with backend
        try {
          const res = await fetch("https://api.ipmobi.net/api/admin/check-session", {
            headers: { "Authorization": "Bearer ipmobi-admin-2026" }
          });
          if (!res.ok) {
            localStorage.removeItem("ipmobi_admin_auth");
            if (pathname !== "/admin") router.push("/admin");
          }
        } catch {
          // Backend unreachable — still allow access if token exists
          // (offline fallback)
        }
      } else if (pathname !== "/admin") {
        router.push("/admin");
      }
    };
    checkAuth();
  }, [pathname, router]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#030712] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0e1a] border-r border-surface-border transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-surface-border">
            <Link href="/admin" className="flex items-center gap-2">
              <Globe size={22} className="text-emerald-400" />
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">IPMOBI</span>
                <span className="text-emerald-400">.</span>
                <span className="text-slate-400 font-normal">NET</span>
              </span>
            </Link>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-emerald-400 font-medium">Admin Panel</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    active
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-surface-border">
            <Link
              href="/dashboard"
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-white hover:bg-white/5 transition-all"
            >
              <Shield size={16} />
              Back to Client Portal
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-surface-border bg-[#030712]/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-400 hover:text-white"
                aria-label="Open sidebar"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              <h1 className="text-base font-semibold text-white hidden sm:block">Admin Panel</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm font-medium">
                  A
                </div>
                <span className="text-sm text-slate-300 hidden sm:block">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
