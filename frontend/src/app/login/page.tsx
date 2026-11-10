"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Building2,
  Users2,
  KeyRound,
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AqarFlowLogo } from "@/components/ui/AqarFlowLogo";

type RoleKey = "admin" | "agent" | "manager";

const ROLE_PROFILES: Record<
  RoleKey,
  {
    name: string;
    title: string;
    email: string;
    description: string;
    scope: string;
    buttonLabel: string;
    icon: React.ElementType;
    badgeColor: string;
  }
> = {
  admin: {
    name: "Salman Tariq",
    title: "Agency Principal & Managing Partner",
    email: "admin@aqarflow.com",
    description: "Complete agency-wide oversight across Pakistan portfolios, transaction ledgers, agent commissions, and system governance.",
    scope: "Full Executive Access • All Enclaves & Portfolios",
    buttonLabel: "Enter Executive Command Center",
    icon: Building2,
    badgeColor: "text-amber-800 bg-amber-50 border-amber-200"
  },
  agent: {
    name: "Ayesha Khan",
    title: "Senior Associate & Licensed Realtor",
    email: "ayesha@aqarflow.com",
    description: "Personalized agent workstation with strict isolation to assigned high-value residences, active buyer inquiries, and private viewings.",
    scope: "Isolated Field Access • Assigned Inventory Only",
    buttonLabel: "Enter Agent Field Desk",
    icon: Users2,
    badgeColor: "text-emerald-800 bg-emerald-50 border-emerald-200"
  },
  manager: {
    name: "Hamza Farooq",
    title: "Property Operations & Facility Manager",
    email: "manager@aqarflow.com",
    description: "Operations command for residential tenancy agreements, monthly rental collection roll, security deposits, and contractor maintenance triage.",
    scope: "Operations Scope • Tenancy, Leases & Maintenance",
    buttonLabel: "Enter Property Operations Hub",
    icon: KeyRound,
    badgeColor: "text-blue-800 bg-blue-50 border-blue-200"
  }
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = (searchParams.get("role") || "admin").toLowerCase();
  const initialRole: RoleKey =
    roleParam === "agent" ? "agent" : roleParam === "manager" ? "manager" : "admin";
  const redirectPath = searchParams.get("redirect") || "/workspace";

  const { login, switchUser } = useAuth();
  const [selectedRole, setSelectedRole] = useState<RoleKey>(initialRole);
  const [email, setEmail] = useState(ROLE_PROFILES[initialRole].email);
  const [password, setPassword] = useState("Password123!");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = (role: RoleKey) => {
    setSelectedRole(role);
    setEmail(ROLE_PROFILES[role].email);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const ok = await login(email, password);
      if (ok) {
        if (selectedRole === "manager" || email.toLowerCase().includes("manager")) {
          switchUser("manager");
        } else if (selectedRole === "agent" || email.toLowerCase().includes("ayesha") || email.toLowerCase().includes("agent")) {
          switchUser("agent");
        } else {
          switchUser("agency_admin");
        }
        router.push(redirectPath);
      } else {
        setError("Invalid credentials. Please verify your email or use 1-click demo access below.");
      }
    } catch {
      setError("Unable to authenticate. Please select an instant demo profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleInstantDemoLogin = (role: RoleKey) => {
    setLoading(true);
    if (role === "manager") {
      switchUser("manager");
    } else if (role === "agent") {
      switchUser("agent");
    } else {
      switchUser("agency_admin");
    }
    setTimeout(() => {
      router.push("/workspace");
    }, 120);
  };

  const activeProfile = ROLE_PROFILES[selectedRole];
  const ActiveIcon = activeProfile.icon;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Refined Luxury Editorial Card */}
      <div className="bg-white rounded-3xl border border-[#E8E4DC] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.06)] p-6 sm:p-10 transition-all">
        {/* Header Block */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-50/70 text-[10px] font-bold uppercase tracking-widest text-amber-900">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Restricted Access • Institutional ERP</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 tracking-tight">
            Estate Operations Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light max-w-sm mx-auto leading-relaxed">
            Role-isolated access for licensed personnel, real estate partners, and property operations desks.
          </p>
        </div>

        {/* 3-Role Interactive Tab Selector */}
        <div className="mb-6">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Select Operational Clearance
          </label>
          <div className="grid grid-cols-3 p-1 rounded-2xl bg-[#F4F1EA] border border-[#E8E4DC] gap-1">
            {(["admin", "agent", "manager"] as RoleKey[]).map((roleKey) => {
              const item = ROLE_PROFILES[roleKey];
              const isSelected = selectedRole === roleKey;
              const Icon = item.icon;
              return (
                <button
                  key={roleKey}
                  type="button"
                  onClick={() => handleRoleChange(roleKey)}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-white text-slate-950 shadow-xs border border-[#E0DBD0] font-bold"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/50"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-600" : "text-slate-400"}`} />
                    <span className="capitalize">{roleKey === "admin" ? "Principal" : roleKey === "agent" ? "Agent" : "Operations"}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Role Context Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-white border border-[#E2DDD3] flex items-center justify-center shrink-0 shadow-2xs">
            <ActiveIcon className="w-4 h-4 text-amber-700" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="text-xs font-bold text-slate-950">{activeProfile.name}</h3>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${activeProfile.badgeColor}`}>
                {activeProfile.title}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-light">
              {activeProfile.description}
            </p>
            <div className="mt-2 text-[10px] font-mono text-slate-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>{activeProfile.scope}</span>
            </div>
          </div>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Authorized Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@aqarflow.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DCD6CA] bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-xs font-medium text-slate-900 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Security Password
              </label>
              <span className="text-[10px] text-slate-600 font-mono">Demo: Password123!</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#DCD6CA] bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-xs font-medium text-slate-900 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Toggle password view"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-slate-950/10 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>{activeProfile.buttonLabel}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Fast Pass Demo Access */}
        <div className="mt-8 pt-6 border-t border-[#E8E4DC]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              1-Click Fast Access (Verified Demos)
            </span>
            <span className="text-[10px] text-amber-900 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Pre-authorized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleInstantDemoLogin("admin")}
              className="p-3 rounded-xl border border-[#E0DBD0] bg-white hover:bg-amber-50/60 hover:border-amber-300 text-left transition-all group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-amber-950">
                  Principal
                </span>
                <Sparkles className="w-3 h-3 text-amber-600" />
              </div>
              <p className="text-[10px] text-slate-500">
                Salman Tariq • Full Access
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleInstantDemoLogin("agent")}
              className="p-3 rounded-xl border border-[#E0DBD0] bg-white hover:bg-emerald-50/60 hover:border-emerald-300 text-left transition-all group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-950">
                  Field Agent
                </span>
                <Sparkles className="w-3 h-3 text-emerald-600" />
              </div>
              <p className="text-[10px] text-slate-500">
                Ayesha Khan • My Portfolio
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleInstantDemoLogin("manager")}
              className="p-3 rounded-xl border border-[#E0DBD0] bg-white hover:bg-blue-50/60 hover:border-blue-300 text-left transition-all group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-950">
                  Operations
                </span>
                <Sparkles className="w-3 h-3 text-blue-600" />
              </div>
              <p className="text-[10px] text-slate-500">
                Hamza Farooq • Rent & Leases
              </p>
            </button>
          </div>
        </div>

        {/* Security & Compliance Footer */}
        <div className="mt-6 pt-4 border-t border-[#F0ECE1] text-center">
          <p className="text-[11px] text-slate-500 font-light">
            Authorized for registered brokers and tenancy administrators under Pakistani real estate escrow standards.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900 font-sans">
      {/* Top Header */}
      <header className="px-6 py-5 border-b border-[#E8E4DC] bg-white/80 backdrop-blur-md flex items-center justify-between">
        <AqarFlowLogo variant="default" size="md" showTagline={true} href="/" />
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Curated Residences</span>
        </Link>
      </header>

      {/* Main Container with Suspense */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <Suspense fallback={<div className="text-xs text-slate-500">Loading Operations Gateway...</div>}>
          <LoginForm />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-600 border-t border-[#E8E4DC] bg-white">
        © 2026 AqarFlow Real Estate & Asset Advisors • Islamabad • Lahore • Karachi
      </footer>
    </div>
  );
}
