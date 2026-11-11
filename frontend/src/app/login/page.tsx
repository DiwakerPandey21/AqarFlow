"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Building2,
  Users2,
  KeyRound,
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

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
  }
> = {
  admin: {
    name: "Salman Tariq",
    title: "Agency Principal & Managing Partner",
    email: "admin@aqarflow.com",
    description: "Complete agency oversight across Islamabad, Lahore, and Karachi portfolios, escrow ledgers, and team governance.",
    scope: "Executive Access • All Enclaves & Portfolios",
    buttonLabel: "Sign In as Agency Principal",
    icon: Building2
  },
  agent: {
    name: "Ayesha Khan",
    title: "Senior Associate & Licensed Realtor",
    email: "ayesha@aqarflow.com",
    description: "Agent workstation strictly isolated to assigned high-value residences, active buyer inquiries, and private viewings.",
    scope: "Field Access • Assigned Inventory & Inquiries Only",
    buttonLabel: "Sign In as Field Agent",
    icon: Users2
  },
  manager: {
    name: "Hamza Farooq",
    title: "Property Operations & Facility Manager",
    email: "manager@aqarflow.com",
    description: "Operations command for residential tenancy agreements, monthly rental collection roll, and contractor maintenance triage.",
    scope: "Operations Scope • Tenancy, Leases & Maintenance",
    buttonLabel: "Sign In as Operations Manager",
    icon: KeyRound
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
    <div className="w-full max-w-5xl mx-auto bg-white rounded-sm border border-[#E2DBD1] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 font-sans">
      {/* LEFT COLUMN: Vellaro Cinematic Showcase */}
      <div className="lg:col-span-5 relative text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[460px] lg:min-h-full">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85" />
        </div>

        <div className="relative z-10 space-y-6">
          <Link href="/" className="inline-block">
            <span className="font-serif italic text-3xl text-white">
              AqarFlow
            </span>
          </Link>

          <div>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white/80 block mb-1">
              Restricted Gateway
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-light uppercase tracking-tight text-white leading-tight">
              LUXURY REAL ESTATE
            </h2>
            <span className="font-serif italic text-2xl text-white/95 block mt-1">
              with full service support
            </span>
            <p className="text-xs text-white/80 mt-3 font-light leading-relaxed">
              Role-isolated operations command for licensed principals, senior realtors, and facility managers.
            </p>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 pt-8 border-t border-white/20">
          <div className="flex items-center justify-between text-[11px] text-white/90">
            <div>
              <span className="font-serif italic text-lg text-white block">100+</span>
              <span className="uppercase text-[9px] tracking-wider text-white/70">Deals Closed</span>
            </div>
            <div>
              <span className="font-serif italic text-lg text-white block">15</span>
              <span className="uppercase text-[9px] tracking-wider text-white/70">Legal Counsel</span>
            </div>
            <div>
              <span className="font-serif italic text-lg text-white block">87+</span>
              <span className="uppercase text-[9px] tracking-wider text-white/70">Reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Authentication Form */}
      <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-white text-[#1F1E19]">
        <div>
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#5D5839]">
                Operations Desk
              </span>
              <span className="text-[10px] font-mono text-[#767262]">Pakistan Clearance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
              PORTAL
            </h1>
            <span className="font-serif italic text-2xl text-[#5D5839] block mt-0.5">
              access clearance
            </span>
          </div>

          {/* Role Clearance Tabs */}
          <div className="mb-6">
            <label className="block text-[11px] font-sans font-semibold text-[#767262] uppercase tracking-wider mb-2">
              Select Clearance Tier
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#F8F3ED] rounded-sm border border-[#E2DBD1]">
              {(["admin", "agent", "manager"] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleChange(role)}
                  className={`py-2 text-xs font-semibold rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedRole === role
                      ? "bg-[#5D5839] text-white shadow-xs"
                      : "text-[#767262] hover:text-[#1F1E19]"
                  }`}
                >
                  <span className="capitalize">{role === "admin" ? "Principal" : role === "agent" ? "Agent" : "Operations"}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Profile Info */}
          <div className="mb-6 p-4 rounded-sm bg-[#FAF6F0] border border-[#E2DBD1] flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E2DBD1] flex items-center justify-center text-[#5D5839] shrink-0 mt-0.5">
              <ActiveIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xs uppercase tracking-tight text-[#1F1E19]">
                  {activeProfile.name}
                </h3>
                <span className="text-[10px] text-[#5D5839] font-mono">
                  {activeProfile.title}
                </span>
              </div>
              <p className="text-xs text-[#767262] mt-1 font-light leading-relaxed">
                {activeProfile.description}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-sm bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-sans font-semibold text-[#1F1E19] uppercase tracking-wider mb-1">
                Authorized Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#767262] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@aqarflow.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-sm border border-[#E2DBD1] bg-[#F8F3ED] text-xs text-[#1F1E19] focus:outline-none focus:border-[#5D5839]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-sans font-semibold text-[#1F1E19] uppercase tracking-wider">
                  Security Password
                </label>
                <span className="text-[10px] text-[#767262] font-mono">Demo: Password123!</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#767262] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-9 py-2.5 rounded-sm border border-[#E2DBD1] bg-[#F8F3ED] text-xs text-[#1F1E19] focus:outline-none focus:border-[#5D5839]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#767262] hover:text-[#1F1E19] cursor-pointer"
                  aria-label="Toggle password view"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-sm bg-[#5D5839] hover:bg-[#4B472D] text-white font-sans font-semibold text-xs uppercase tracking-[0.14em] shadow-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>AUTHENTICATING CLEARANCE...</span>
              ) : (
                <>
                  <span>{activeProfile.buttonLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 pt-4 border-t border-[#E2DBD1] text-center">
          <p className="text-[10px] text-[#767262] font-light">
            Authorized personnel only. Data access is strictly audited under Pakistani real estate escrow regulations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8F3ED] flex flex-col justify-between selection:bg-[#5D5839] selection:text-white font-sans">
      {/* Top Header */}
      <header className="px-6 py-4 border-b border-[#E2DBD1] bg-[#F8F3ED]/90 backdrop-blur-md flex items-center justify-between">
        <Link href="/" className="inline-block">
          <span className="font-serif italic text-2xl text-[#1F1E19]">
            AqarFlow
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5D5839] hover:underline transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Curated Residences</span>
        </Link>
      </header>

      {/* Main Container with Suspense */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <Suspense fallback={<div className="text-xs text-[#767262]">Loading Operations Gateway...</div>}>
          <LoginForm />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-[#767262] border-t border-[#E2DBD1] bg-[#F8F3ED]">
        © 2026 AqarFlow Real Estate & Asset Advisors • Islamabad • Lahore • Karachi
      </footer>
    </div>
  );
}
