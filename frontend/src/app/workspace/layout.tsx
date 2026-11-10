"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  LayoutDashboard,
  Home,
  Users2,
  Calendar,
  Briefcase,
  UserCheck,
  History,
  Settings,
  ArrowUpRight,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ShieldCheck,
  User,
  KeyRound,
  Wrench,
  Sun,
  Moon
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AqarFlowLogo } from "@/components/ui/AqarFlowLogo";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, switchUser, isAdmin, isManager } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load saved theme preference (default to light)
  useEffect(() => {
    const saved = localStorage.getItem("aqarflow_theme") as "light" | "dark" | null;
    const initialTheme = saved === "dark" ? "dark" : "light";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("aqarflow_theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Navigation Links
  const navItems = [
    {
      name: "Dashboard",
      href: "/workspace",
      icon: LayoutDashboard,
      adminOnly: false
    },
    {
      name: "Properties",
      href: "/workspace/properties",
      icon: Home,
      adminOnly: false
    },
    {
      name: "Leads & CRM",
      href: "/workspace/leads",
      icon: Users2,
      adminOnly: false
    },
    {
      name: "Rental Leases",
      href: "/workspace/rentals",
      icon: KeyRound,
      adminOnly: false
    },
    {
      name: "Maintenance",
      href: "/workspace/maintenance",
      icon: Wrench,
      adminOnly: false
    },
    {
      name: "Visits & Calendar",
      href: "/workspace/visits",
      icon: Calendar,
      adminOnly: false
    },
    {
      name: "Deals & Pipeline",
      href: "/workspace/deals",
      icon: Briefcase,
      adminOnly: false
    },
    {
      name: "Agents & Team",
      href: "/workspace/agents",
      icon: UserCheck,
      adminOnly: true
    },
    {
      name: "Audit Trail",
      href: "/workspace/audit-logs",
      icon: History,
      adminOnly: true
    },
    {
      name: "Agency Settings",
      href: "/workspace/settings",
      icon: Settings,
      adminOnly: false
    }
  ];

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-200 ${
        isDark
          ? "dark bg-[#070A12] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200"
          : "bg-[#F8FAFC] text-slate-900 selection:bg-amber-100 selection:text-amber-900"
      }`}
    >
      {/* Desktop Sidebar - Estately Light (Default) / Estatelab Obsidian (Option) */}
      <aside
        className={`hidden md:flex flex-col w-64 shrink-0 transition-colors duration-200 ${
          isDark
            ? "bg-[#0A0E17] text-white border-r border-slate-800/80"
            : "bg-white text-slate-800 border-r border-slate-200/90 shadow-2xs"
        }`}
      >
        {/* Brand Header */}
        <div className={`p-5 border-b ${isDark ? "border-slate-800/80" : "border-slate-100"}`}>
          <AqarFlowLogo variant={isDark ? "gold" : "default"} size="md" showTagline={true} href="/workspace" />

          <Link
            href="/"
            className={`mt-3.5 flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shadow-2xs ${
              isDark
                ? "bg-slate-900/90 hover:bg-slate-800/80 text-amber-200/90 hover:text-amber-300 border-amber-500/20"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200"
            }`}
          >
            <span>&larr; Public Portal</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isDark ? "text-amber-400" : "text-slate-500"}`} />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isRestricted = item.adminOnly && !isAdmin;

            if (isRestricted) {
              return null; // hide admin only if agent
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? isDark
                      ? "bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-300 font-semibold border-l-2 border-amber-400 shadow-[inset_0_0_12px_rgba(245,158,11,0.06)]"
                      : "bg-amber-50/80 text-amber-900 font-bold border-l-2 border-amber-600 shadow-2xs"
                    : isDark
                    ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? isDark
                          ? "text-amber-400"
                          : "text-amber-700"
                        : isDark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.adminOnly && (
                  <span
                    className={`text-[9px] uppercase px-1.5 py-0.5 rounded border ${
                      isDark
                        ? "bg-amber-950/60 text-amber-400 border-amber-500/20"
                        : "bg-amber-50 text-amber-800 border-amber-200 font-semibold"
                    }`}
                  >
                    Admin
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Role Switcher */}
        <div
          className={`p-3 border-t space-y-3 ${
            isDark ? "border-slate-800/80 bg-[#070A11]" : "border-slate-100 bg-slate-50/70"
          }`}
        >
          {/* Theme Quick Switcher in Sidebar */}
          <div className="flex items-center justify-between px-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Appearance:
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                isDark
                  ? "bg-slate-900 text-amber-300 border-amber-500/30 hover:bg-slate-800"
                  : "bg-white text-slate-800 border-slate-200 hover:bg-slate-100 shadow-2xs"
              }`}
              title={isDark ? "Switch to Light Mode (Default)" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <>
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span className="text-[11px]">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-slate-600" />
                  <span className="text-[11px]">Dark Mode</span>
                </>
              )}
            </button>
          </div>

          {/* Current Profile */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2.5 truncate">
              <div
                className={`w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ${
                  isDark ? "bg-slate-800 ring-amber-400/40" : "bg-slate-200 ring-slate-300"
                }`}
              >
                <img
                  src={
                    user?.avatar_url ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  }
                  alt={user?.full_name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="truncate">
                <p
                  className={`text-xs font-bold truncate ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {user?.full_name}
                </p>
                <p
                  className={`text-[10px] capitalize ${
                    isDark ? "text-amber-400" : "text-amber-800 font-semibold"
                  }`}
                >
                  {user?.role?.replace("_", " ")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark
                  ? "text-slate-400 hover:text-amber-300 hover:bg-slate-800/80"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/80"
              }`}
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar - Estately Crisp White / Obsidian Frosted */}
        <header
          className={`h-16 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-40 transition-colors duration-200 backdrop-blur-md ${
            isDark
              ? "bg-[#0A0E17]/90 border-b border-slate-800/80 text-white"
              : "bg-white/95 border-b border-slate-200/90 text-slate-900 shadow-2xs"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className={`md:hidden p-2 rounded-lg ${
                isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mode & Desk Badges */}
            <div
              className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-slate-300"
                  : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isAdmin ? "Agency Administrator Mode" : isManager ? "Operations Manager Mode" : "Agent Operational Mode"}</span>
              <span className={isDark ? "text-slate-600" : "text-slate-300"}>•</span>
              <span
                className={`font-mono text-[11px] ${
                  isDark ? "text-amber-400" : "text-amber-800 font-semibold"
                }`}
              >
                {isManager ? "Tenancy & Maintenance Desk" : "National Operations Desk"}
              </span>
            </div>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button (Light Default + Dark Mode Option) */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isDark
                  ? "bg-slate-900 text-amber-300 border-amber-500/30 hover:bg-slate-800 shadow-xs"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900 shadow-2xs"
              }`}
              title={isDark ? "Switch to Light Mode (Default)" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* Quick Public Link */}
            <Link
              href="/"
              target="_blank"
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
                isDark
                  ? "text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30"
                  : "text-slate-800 bg-slate-100 hover:bg-slate-200/80 border-slate-200 shadow-2xs"
              }`}
            >
              <span>Public Discovery Portal</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isDark ? "text-amber-400" : "text-slate-600"}`} />
            </Link>

            {/* Authenticated user pill & logout */}
            <div className="flex items-center gap-2 pl-1 sm:pl-2">
              <span
                className={`text-xs font-bold hidden sm:inline ${
                  isDark ? "text-slate-200" : "text-slate-800"
                }`}
              >
                {user?.full_name}
              </span>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                  isAdmin
                    ? isDark
                      ? "bg-amber-950/80 text-amber-300 border-amber-500/30"
                      : "bg-amber-100 text-amber-900 border-amber-300/80"
                    : isManager
                    ? isDark
                      ? "bg-blue-950/80 text-blue-300 border-blue-500/30"
                      : "bg-blue-100 text-blue-900 border-blue-300/80"
                    : isDark
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/30"
                    : "bg-emerald-100 text-emerald-900 border-emerald-300/80"
                }`}
              >
                {isAdmin ? "Admin" : isManager ? "Operations" : "Agent"}
              </span>
              <button
                type="button"
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div
            className={`md:hidden p-4 border-b space-y-2 ${
              isDark ? "bg-[#0A0E17] text-white border-slate-800" : "bg-white text-slate-900 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <Link
                href="/"
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 py-1"
                onClick={() => setMobileNavOpen(false)}
              >
                &larr; View Public Discovery Portal
              </Link>
              <button
                type="button"
                onClick={toggleTheme}
                className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              >
                {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>
            <nav className="space-y-1 pt-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                if (item.adminOnly && !isAdmin) return null;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium ${
                      isActive
                        ? isDark
                          ? "bg-amber-500/20 text-amber-300 border-l-2 border-amber-400"
                          : "bg-amber-50 text-amber-900 font-bold border-l-2 border-amber-600"
                        : isDark
                        ? "text-slate-300 hover:bg-slate-800"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="truncate mr-2 font-medium">{user?.full_name} ({user?.role?.replace("_", " ")})</span>
              <button
                type="button"
                onClick={logout}
                className="text-xs text-rose-600 font-semibold hover:underline flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Routed Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {(() => {
            const adminOnlyPaths = ["/workspace/agents", "/workspace/audit-logs"];
            const isRestricted = adminOnlyPaths.some((p) => pathname.startsWith(p)) && !isAdmin;

            if (isRestricted) {
              return (
                <div className="p-8 sm:p-12 max-w-xl mx-auto my-12 bg-white dark:bg-[#0D121F] rounded-3xl border border-rose-200 dark:border-rose-900/40 p-8 shadow-xl text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center border border-rose-200 dark:border-rose-800">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                    Access Restricted (403 Forbidden)
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Under the VIRELEO Project 01 RBAC specification, <strong>{user?.full_name} ({user?.role?.replace("_", " ")})</strong> is strictly restricted to assigned operational scope.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <Link
                      href="/workspace"
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all"
                    >
                      Return to Workspace
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition-all flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              );
            }

            return children;
          })()}
        </main>
      </div>
    </div>
  );
}
