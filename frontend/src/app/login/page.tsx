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
  CheckCircle2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AqarFlowLogo } from "@/components/ui/AqarFlowLogo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") || "admin";
  const redirectPath = searchParams.get("redirect") || "/workspace";

  const { login, switchUser, user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"admin" | "agent" | "manager">(
    initialRole === "agent" ? "agent" : "admin"
  );
  const [email, setEmail] = useState(
    initialRole === "agent" ? "ayesha@aqarflow.com" : "admin@aqarflow.com"
  );
  const [password, setPassword] = useState("Password123!");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = (role: "admin" | "agent" | "manager") => {
    setSelectedRole(role);
    setError(null);
    if (role === "admin") {
      setEmail("admin@aqarflow.com");
    } else if (role === "agent") {
      setEmail("ayesha@aqarflow.com");
    } else {
      setEmail("manager@aqarflow.com");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const ok = await login(email, password);
      if (ok) {
        if (selectedRole === "agent") {
          switchUser("agent");
        } else {
          switchUser("agency_admin");
        }
        router.push(redirectPath);
      } else {
        setError("Invalid email or password. Please try demo credentials.");
      }
    } catch {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInstantDemoLogin = (role: "admin" | "agent") => {
    setLoading(true);
    if (role === "agent") {
      switchUser("agent");
    } else {
      switchUser("agency_admin");
    }
    setTimeout(() => {
      router.push("/workspace");
    }, 150);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl border border-[#E8E4DC] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
      {/* Left Panel: Role Scope Explanation */}
      <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 text-white p-8 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Multi-Tenant RBAC System
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mt-4 text-white">
            Role-Isolated Operations Portal
          </h2>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            AqarFlow enforces strict data isolation as specified in the VIRELEO Project 01 architecture. Each login type provides dedicated scope boundaries.
          </p>

          {/* Roles Breakdown */}
          <div className="space-y-3.5 mt-6">
            <div
              onClick={() => handleRoleSelect("admin")}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedRole === "admin"
                  ? "bg-amber-500/15 border-amber-400/60 shadow-inner"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    Agency Owner / Principal
                    {selectedRole === "admin" && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Full agency overview, all leads, complete sales pipeline, team management, and audit trail.
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleRoleSelect("agent")}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedRole === "agent"
                  ? "bg-emerald-500/15 border-emerald-400/60 shadow-inner"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-400/20 text-emerald-300 flex items-center justify-center">
                  <Users2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    Real Estate Agent
                    {selectedRole === "agent" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Strictly isolated: view ONLY your assigned leads, assigned properties, and personal deal pipeline.
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleRoleSelect("manager")}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedRole === "manager"
                  ? "bg-blue-500/15 border-blue-400/60 shadow-inner"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-400/20 text-blue-300 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    Property Operations Manager
                    {selectedRole === "manager" && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Rental leases, tenant ledgers, work orders, and contractor maintenance triage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>VIRELEO Project 01</span>
          <span>100% Pakistan Localized</span>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
        <div>
          {/* Role Indicator Banner */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Signing in as:
              </span>
              <h3 className="text-lg font-serif font-bold text-slate-950 mt-0.5">
                {selectedRole === "admin"
                  ? "Agency Principal / Administrator"
                  : selectedRole === "agent"
                  ? "Licensed Real Estate Agent"
                  : "Property Operations Desk"}
              </h3>
            </div>
            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleRoleSelect("admin")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === "admin"
                    ? "bg-white text-slate-950 shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect("agent")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === "agent"
                    ? "bg-white text-emerald-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Agent
              </button>
            </div>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@aqarflow.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-xs font-medium text-slate-900 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-xs font-medium text-slate-900 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-amber-600 focus:ring-amber-500" />
                <span>Remember my credentials</span>
              </label>
              <span className="text-amber-800 font-medium">Demo Password: Password123!</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-slate-950/10 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Enter {selectedRole === "admin" ? "Agency Command" : "Agent Desk"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Instant 1-Click Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              1-Click Role Demonstrations:
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleInstantDemoLogin("admin")}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50/60 hover:border-amber-300 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-amber-900">
                    Admin Demo
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <p className="text-[10px] text-slate-500">
                  Salman Tariq • Full Agency Access
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleInstantDemoLogin("agent")}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/60 hover:border-emerald-300 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-900">
                    Agent Demo
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[10px] text-slate-500">
                  Ayesha Khan • Isolated Portfolio
                </p>
              </button>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 text-center mt-6">
          Official VIRELEO Project 01 Submission • <a href="https://www.vireleo.me/" target="_blank" rel="noreferrer" className="underline hover:text-slate-600">vireleo.me</a>
        </p>
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
          <span>Back to Public Portal</span>
        </Link>
      </header>

      {/* Main Container with Suspense */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <Suspense fallback={<div className="text-xs text-slate-500">Loading Login Portal...</div>}>
          <LoginForm />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-[#E8E4DC] bg-white">
        © 2026 AqarFlow Pakistan. Enterprise Real Estate ERP & CRM.
      </footer>
    </div>
  );
}

