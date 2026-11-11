"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
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
  ShieldCheck,
  KeyRound,
  Wrench,
  Sun,
  Moon
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAdmin, isManager, isLoading } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F3ED] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-10 h-10 rounded-sm bg-[#5D5839]/10 border border-[#5D5839]/20 flex items-center justify-center mb-3">
          <div className="w-5 h-5 border-2 border-[#5D5839] border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-xs text-[#767262] font-sans tracking-wide">Verifying clearance credentials...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F3ED] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-12 h-12 rounded-sm bg-[#5D5839]/10 border border-[#5D5839]/20 flex items-center justify-center mb-4">
          <ShieldCheck className="w-6 h-6 text-[#5D5839] animate-pulse" />
        </div>
        <h2 className="text-xl font-serif text-[#1F1E19] mb-1">Session Concluded</h2>
        <p className="text-xs text-[#767262] mb-4">Redirecting to operations login portal...</p>
        <Link href="/login" className="text-xs font-semibold text-[#5D5839] underline">
          Click here if not redirected automatically &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-200 ${
        isDark
          ? "dark bg-[#141310] text-[#F8F3ED] selection:bg-[#5D5839] selection:text-white"
          : "bg-[#F8F3ED] text-[#1F1E19] selection:bg-[#5D5839] selection:text-white"
      }`}
    >
      {/* Desktop Sidebar — Vellaro Warm Sand */}
      <aside
        className={`hidden md:flex flex-col w-64 shrink-0 transition-colors duration-200 ${
          isDark
            ? "bg-[#1A1D15] text-white border-r border-[#2E3025]"
            : "bg-[#FAF6F0] text-[#1F1E19] border-r border-[#E2DBD1] shadow-2xs"
        }`}
      >
        {/* Brand Header */}
        <div className={`p-5 border-b ${isDark ? "border-[#2E3025]" : "border-[#E2DBD1]"}`}>
          <Link href="/workspace" className="inline-block">
            <span
              className={`font-serif italic text-2xl tracking-tight transition-colors ${
                isDark ? "text-white" : "text-[#1F1E19]"
              }`}
            >
              AqarFlow
            </span>
          </Link>

          <Link
            href="/"
            className={`mt-3.5 flex items-center justify-between px-3 py-1.5 rounded-sm text-xs font-medium border transition-all ${
              isDark
                ? "bg-[#141310] hover:bg-[#25281E] text-white border-[#2E3025]"
                : "bg-white hover:bg-[#F8F3ED] text-[#1F1E19] border-[#E2DBD1]"
            }`}
          >
            <span>&larr; Public Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#5D5839]" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isRestricted = item.adminOnly && !isAdmin;

            if (isRestricted) {
              return null;
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#5D5839] text-white font-semibold shadow-xs"
                    : isDark
                    ? "text-[#767262] hover:text-white hover:bg-[#25281E]"
                    : "text-[#767262] hover:text-[#1F1E19] hover:bg-[#F8F3ED]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-white" : "text-[#5D5839]"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.adminOnly && (
                  <span
                    className={`text-[9px] uppercase px-1.5 py-0.5 rounded-sm border ${
                      isActive
                        ? "bg-white/20 text-white border-white/30"
                        : isDark
                        ? "bg-[#25281E] text-[#C4B487] border-[#2E3025]"
                        : "bg-[#F8F3ED] text-[#5D5839] border-[#E2DBD1] font-semibold"
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
            isDark ? "border-[#2E3025] bg-[#141310]" : "border-[#E2DBD1] bg-[#F8F3ED]"
          }`}
        >
          {/* Theme Quick Switcher in Sidebar */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#767262]">
              Appearance:
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-semibold border transition-all cursor-pointer ${
                isDark
                  ? "bg-[#1A1D15] text-[#C4B487] border-[#2E3025] hover:bg-[#25281E]"
                  : "bg-white text-[#1F1E19] border-[#E2DBD1] hover:bg-[#FAF6F0] shadow-2xs"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <>
                  <Sun className="w-3 h-3 text-[#C4B487]" />
                  <span className="text-[11px]">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-[#5D5839]" />
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
                  isDark ? "bg-[#25281E] ring-[#5D5839]" : "bg-white ring-[#E2DBD1]"
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
                    isDark ? "text-white" : "text-[#1F1E19]"
                  }`}
                >
                  {user?.full_name}
                </p>
                <p className="text-[10px] capitalize text-[#5D5839] font-semibold">
                  {user?.role?.replace("_", " ")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                isDark
                  ? "text-[#767262] hover:text-white hover:bg-[#25281E]"
                  : "text-[#767262] hover:text-[#1F1E19] hover:bg-white"
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
        {/* Top Header Bar */}
        <header
          className={`h-16 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-40 transition-colors duration-200 backdrop-blur-md ${
            isDark
              ? "bg-[#1A1D15]/90 border-b border-[#2E3025] text-white"
              : "bg-[#FAF6F0]/95 border-b border-[#E2DBD1] text-[#1F1E19] shadow-2xs"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className={`md:hidden p-2 rounded-sm ${
                isDark ? "text-white hover:bg-[#25281E]" : "text-[#1F1E19] hover:bg-[#F8F3ED]"
              }`}
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mode & Desk Badges */}
            <div
              className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-medium border ${
                isDark
                  ? "bg-[#141310] border-[#2E3025] text-white"
                  : "bg-white border-[#E2DBD1] text-[#1F1E19]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#5D5839] animate-pulse" />
              <span>{isAdmin ? "Agency Administrator Mode" : isManager ? "Operations Manager Mode" : "Agent Operational Mode"}</span>
              <span className="text-[#767262]">•</span>
              <span className="font-mono text-[11px] text-[#5D5839] font-semibold">
                {isManager ? "Tenancy & Maintenance Desk" : "National Operations Desk"}
              </span>
            </div>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-semibold transition-all cursor-pointer ${
                isDark
                  ? "bg-[#141310] text-[#C4B487] border-[#2E3025] hover:bg-[#25281E]"
                  : "bg-white text-[#1F1E19] border-[#E2DBD1] hover:bg-[#F8F3ED] shadow-2xs"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#C4B487]" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#5D5839]" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* Quick Public Link */}
            <Link
              href="/"
              target="_blank"
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-sm border transition-colors ${
                isDark
                  ? "text-[#C4B487] bg-[#141310] hover:bg-[#25281E] border-[#2E3025]"
                  : "text-[#1F1E19] bg-white hover:bg-[#F8F3ED] border-[#E2DBD1] shadow-2xs"
              }`}
            >
              <span>Public Discovery Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5D5839]" />
            </Link>

            {/* Authenticated user pill & logout */}
            <div className="flex items-center gap-2 pl-1 sm:pl-2">
              <span
                className={`text-xs font-bold hidden sm:inline ${
                  isDark ? "text-white" : "text-[#1F1E19]"
                }`}
              >
                {user?.full_name}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider border ${
                  isAdmin
                    ? "bg-[#5D5839] text-white border-[#5D5839]"
                    : "bg-[#FAF6F0] text-[#5D5839] border-[#E2DBD1]"
                }`}
              >
                {isAdmin ? "Admin" : isManager ? "Operations" : "Agent"}
              </span>
              <button
                type="button"
                onClick={logout}
                className="p-1.5 rounded-sm text-[#767262] hover:text-rose-600 transition-colors cursor-pointer"
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
              isDark ? "bg-[#1A1D15] text-white border-[#2E3025]" : "bg-[#FAF6F0] text-[#1F1E19] border-[#E2DBD1]"
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E2DBD1]">
              <Link
                href="/"
                className="text-xs font-semibold text-[#5D5839] py-1"
                onClick={() => setMobileNavOpen(false)}
              >
                &larr; View Public Discovery Portal
              </Link>
              <button
                type="button"
                onClick={toggleTheme}
                className="text-xs font-semibold px-2 py-1 rounded-sm bg-white border border-[#E2DBD1]"
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
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs font-medium ${
                      isActive
                        ? "bg-[#5D5839] text-white"
                        : "text-[#767262] hover:text-[#1F1E19]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[#E2DBD1] flex items-center justify-between text-xs">
              <span className="truncate mr-2 font-medium">{user?.full_name} ({user?.role?.replace("_", " ")})</span>
              <button
                type="button"
                onClick={logout}
                className="text-xs text-rose-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
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
                <div className="p-8 sm:p-12 max-w-xl mx-auto my-12 bg-white dark:bg-[#1A1D15] rounded-sm border border-rose-200 text-center space-y-4 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center border border-rose-200">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl font-serif text-[#1F1E19] dark:text-white">
                    Access Restricted (403 Forbidden)
                  </h2>
                  <p className="text-xs text-[#767262] dark:text-slate-400 leading-relaxed">
                    Under the VIRELEO Project 01 RBAC specification, <strong>{user?.full_name} ({user?.role?.replace("_", " ")})</strong> is strictly restricted to assigned operational scope.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <Link
                      href="/workspace"
                      className="px-4 py-2 rounded-sm bg-[#5D5839] text-white text-xs font-semibold hover:bg-[#4B472D] transition-all"
                    >
                      Return to Workspace
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="px-4 py-2 rounded-sm bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition-all flex items-center gap-1.5 cursor-pointer"
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
