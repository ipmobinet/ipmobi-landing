"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Globe,
  Server,
  Activity,
  Zap,
  Terminal,
  Users,
} from "@/components/ui/Icons";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Activity },
  { href: "/dashboard/proxies", label: "My Proxies", icon: Server },
  { href: "/dashboard/bandwidth", label: "Bandwidth", icon: Zap },
  { href: "/dashboard/settings", label: "Settings", icon: Terminal },
  { href: "/dashboard/support", label: "Support", icon: Users },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(null);
  const [hasTrial, setHasTrial] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("ipmobi_jwt_token");
    if (!token) {
      router.push("/trial");
      return;
    }
    const proxy = localStorage.getItem("ipmobi_trial_proxy");
    setHasTrial(true);

    // Try to extract user info from localStorage
    const stored = localStorage.getItem("ipmobi_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    } else {
      setUser({ email: "user@ipmobi.net", name: "Client User" });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("ipmobi_trial_token");
    localStorage.removeItem("ipmobi_trial_proxy");
    localStorage.removeItem("ipmobi_user");
    router.push("/trial");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  if (!hasTrial) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="animate-spin inline-block w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full" />
      </div>
    );
  }

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
            <Link href="/dashboard" className="flex items-center gap-2">
              <Globe size={22} className="text-emerald-400" />
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">IPMOBI</span>
                <span className="text-emerald-400">.</span>
                <span className="text-slate-400 font-normal">NET</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 mt-1">Client Portal</p>
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
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-surface-border bg-[#030712]/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            {/* Left: Hamburger + Title */}
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
              <h1 className="text-base font-semibold text-white hidden sm:block">Client Portal</h1>
            </div>

            {/* Right: User info + Logout */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-right">
                <div className="hidden sm:block">
                  <p className="text-sm text-slate-300">{user?.name || "User"}</p>
                  <p className="text-xs text-slate-500">{user?.email || "user@ipmobi.net"}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm font-medium">
                  {(user?.name || "U").charAt(0).toUpperCase()}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all border border-transparent hover:border-red-500/20"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
                Logout
              </button>
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
