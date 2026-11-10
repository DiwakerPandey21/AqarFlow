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
  ArrowLeft,
  CheckCircle2,
  MapPin
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
    description: "Complete agency oversight across Islamabad, Lahore, and Karachi portfolios, escrow ledgers, and team governance.",
    scope: "Executive Access • All Enclaves & Portfolios",
    buttonLabel: "Sign In as Agency Principal",
    icon: Building2,
    badgeColor: "text-amber-800 bg-amber-50 border-amber-200"
  },
  agent: {
    name: "Ayesha Khan",
    title: "Senior Associate & Licensed Realtor",
    email: "ayesha@aqarflow.com",
    description: "Agent workstation strictly isolated to assigned high-value residences, active buyer inquiries, and private viewings.",
    scope: "Field Access • Assigned Inventory & Inquiries Only",
    buttonLabel: "Sign In as Field Agent",
    icon: Users2,
    badgeColor: "text-emerald-800 bg-emerald-50 border-emerald-200"
  },
  manager: {
    name: "Hamza Farooq",
    title: "Property Operations & Facility Manager",
    email: "manager@aqarflow.com",
    description: "Operations command for residential tenancy agreements, monthly rental collection roll, and contractor maintenance triage.",
    scope: "Operations Scope • Tenancy, Leases & Maintenance",
    buttonLabel: "Sign In as Operations Manager",
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
        setError("Invalid credentials. Please verify your email and password.");
      }
    } catch {
      setError("Unable to authenticate. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  const activeProfile = ROLE_PROFILES[selectedRole];
  const ActiveIcon = activeProfile.icon;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl border border-[#E8E4DC] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.06)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
      {/* LEFT COLUMN: Real Estate Architectural Showcase */}
      <div className="lg:col-span-5 bg-[#0B0F17] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle Architectural Grid Vector Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#archGrid)" />
          </svg>
        </div>

        {/* Ambient Warm Lighting */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Logo & Secure Status */}
          <div className="flex items-center justify-between">
            <AqarFlowLogo variant="gold" size="sm" showTagline={false} href="/" />
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              PORTAL SECURE
            </span>
          </div>

          {/* Architectural Headline */}
          <div className="pt-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.24em] text-amber-400 block mb-2 font-mono">
              Institutional Asset Gateway
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
              Architecture of Distinction. <br />
              <span className="text-slate-400 font-light italic">Operations with Integrity.</span>
            </h2>
            <p className="text-xs text-slate-300 font-light mt-3 leading-relaxed">
              Serving registered real estate advisors, institutional funds, and property operations desks across Islamabad, Lahore, and Karachi.
            </p>
          </div>

          {/* Real Estate Featured Asset Card */}
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-4 relative overflow-hidden group">
            <div className="relative h-44 rounded-xl overflow-hidden mb-3">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Villa Margalla Luxury Real Estate Islamabad"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-[9px] font-mono text-amber-300">
                <MapPin className="w-2.5 h-2.5" />
                <span>Sector F-7 • Islamabad</span>
              </div>
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-300 block">Featured Listing</span>
                  <h4 className="font-serif font-bold text-sm text-white">Villa Margalla Residence</h4>
                </div>
                <span className="text-xs font-serif font-bold text-amber-300">PKR 14.5 Cr</span>
              </div>
            </div>

            {/* Real Estate Micro Specs */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-300 pt-1 border-t border-white/10 font-mono">
              <div>
                <span className="block font-bold text-white text-xs">1 Kanal</span>
                <span className="text-[9px] text-slate-400">Smart Villa</span>
              </div>
              <div>
                <span className="block font-bold text-emerald-400 text-xs">100%</span>
                <span className="text-[9px] text-slate-400">CDA Verified</span>
              </div>
              <div>
                <span className="block font-bold text-amber-400 text-xs">+18.4%</span>
                <span className="text-[9px] text-slate-400">YoY Yield</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Estate Regulatory Marks */}
        <div className="pt-6 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between font-mono">
          <span>PKR 4.5B+ Escrowed</span>
          <span>CDA • LDA • CBC Compliant</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Minimalist Operations Login Form */}
      <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
        <div>
          {/* Header Block */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-50/70 text-[10px] font-bold uppercase tracking-widest text-amber-900 mb-2 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Multi-Role Access Control</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 tracking-tight">
              Estate Operations Portal
            </h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              Select your clearance role to access verified portfolios, ledgers, and CRM pipelines.
            </p>
          </div>

          {/* 3-Role Clearance Selector */}
          <div className="mb-5">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
              Operational Clearance Level
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
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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

          {/* Active Role Brief Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#E2DDD3] flex items-center justify-center shrink-0 shadow-2xs">
              <ActiveIcon className="w-4 h-4 text-amber-700" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="text-xs font-bold text-slate-950">{activeProfile.name}</h3>
                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${activeProfile.badgeColor}`}>
                  {activeProfile.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-light">
                {activeProfile.description}
              </p>
              <div className="mt-1.5 text-[10px] font-mono text-slate-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>{activeProfile.scope}</span>
              </div>
            </div>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
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
                <span className="text-[10px] text-slate-500 font-mono">Demo: Password123!</span>
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
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
              className="w-full mt-3 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-slate-950/10 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
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
        </div>

        {/* Security & Compliance Footer */}
        <div className="mt-8 pt-4 border-t border-[#F0ECE1] text-center">
          <p className="text-[10px] text-slate-500 font-light">
            Authorized personnel only. Data access is strictly audited under Pakistani real estate escrow regulations.
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
      <header className="px-6 py-4 border-b border-[#E8E4DC] bg-white/80 backdrop-blur-md flex items-center justify-between">
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
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-[#E8E4DC] bg-white">
        © 2026 AqarFlow Real Estate & Asset Advisors • Islamabad • Lahore • Karachi
      </footer>
    </div>
  );
}
