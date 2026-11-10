"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Users2,
  Calendar,
  Briefcase,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Phone,
  Clock,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  KeyRound,
  Wrench,
  Search,
  MessageCircle,
  Activity
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/db";
import { formatPKR, formatDate, formatDateTime } from "@/lib/formatters";

export default function WorkspaceDashboard() {
  const { user, isAdmin } = useAuth();
  const defaultAdmin = db.getUsers().find((u) => u.role === "agency_admin") || db.getUsers()[0];
  const currentUser = user || defaultAdmin;
  const [metrics, setMetrics] = useState(() => db.getDashboardMetrics(currentUser));
  const [deals, setDeals] = useState(() => db.getDeals(currentUser));
  const [activeTab, setActiveTab] = useState<"2026" | "2025">("2026");

  React.useEffect(() => {
    if (user) {
      setMetrics(db.getDashboardMetrics(user));
      setDeals(db.getDeals(user));
    }
  }, [user]);

  // Monthly income comparison data (Estatelab / Estately Inspired)
  const chartData2026 = [
    { month: "Jan", revenue: 42, commission: 2.8 },
    { month: "Feb", revenue: 58, commission: 3.9 },
    { month: "Mar", revenue: 75, commission: 5.1 },
    { month: "Apr", revenue: 64, commission: 4.3 },
    { month: "May", revenue: 95, commission: 6.4 },
    { month: "Jun", revenue: 110, commission: 7.5 }
  ];

  const chartData2025 = [
    { month: "Jan", revenue: 28, commission: 1.9 },
    { month: "Feb", revenue: 35, commission: 2.4 },
    { month: "Mar", revenue: 45, commission: 3.1 },
    { month: "Apr", revenue: 42, commission: 2.9 },
    { month: "May", revenue: 60, commission: 4.1 },
    { month: "Jun", revenue: 68, commission: 4.6 }
  ];

  const currentChart = activeTab === "2026" ? chartData2026 : chartData2025;

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Executive Operations Header */}
      <div className="bg-white dark:bg-[#0D121F] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl relative overflow-hidden transition-colors">
        {/* Subtle golden ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                {isAdmin ? "Institutional Portfolio & Asset Operations" : "Field Agent Operational Desk • Assigned Portfolio Only"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 hidden sm:inline-block" />
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {isAdmin ? "Live Sync • 100% CDA/LDA Verified Titles" : "Strict Record Isolation • Assigned Portfolio"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-950 dark:text-white tracking-tight mt-3">
              {isAdmin ? `Executive Command Center, ${user?.full_name}` : `Agent Personal Desk, ${user?.full_name}`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-light">
              {isAdmin
                ? "Full institutional command across luxury inventory, overseas buyer pipeline, rent roll ledgers, and contractor maintenance dispatches."
                : "Manage your assigned high-net-worth client leads, upcoming architectural showings, and personal deal closing pipeline."}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {isAdmin && (
              <Link
                href="/workspace/properties"
                className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white dark:bg-gradient-to-r dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 dark:text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-slate-950/10 dark:shadow-amber-500/20 hover:scale-[1.02] transition-all"
              >
                <Plus className="w-4 h-4 text-amber-400 dark:text-slate-950" />
                <span>Add Residence</span>
              </Link>
            )}

            <Link
              href="/workspace/rentals"
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-emerald-800 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-emerald-300 dark:border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <KeyRound className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Rental Roll</span>
            </Link>

            <Link
              href="/workspace/maintenance"
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-amber-800 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-amber-300 dark:border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Wrench className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Maintenance Hub</span>
            </Link>

            <Link
              href="/workspace/leads"
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Users2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>CRM Leads</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Estatelab / Estately Inspired Hero Metrics (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gauge 1: Occupancy & WAULT */}
        <div className="bg-white dark:bg-[#0D121F] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex items-center justify-between relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
              Portfolio WAULT
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-950 dark:text-white">94.2%</span>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-mono font-bold">+2.4%</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light">
              Avg Lease: 3.4 Yrs • 0% Vacancy in Margalla Enclaves
            </p>
          </div>

          {/* Circular Donut Meter */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-500 transition-all duration-1000"
                strokeDasharray="94, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-mono font-bold text-amber-700 dark:text-amber-300">8.62</span>
          </div>
        </div>

        {/* Gauge 2: Annual Contracted Yield */}
        <div className="bg-white dark:bg-[#0D121F] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex items-center justify-between relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
              Annual Contracted Yield
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-emerald-600 dark:text-emerald-400">PKR 2.1 Cr</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light">
              6.8% Net Yield • 100% Verified Escrow Collections
            </p>
          </div>

          {/* Circular Donut Meter */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500 transition-all duration-1000"
                strokeDasharray="82, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">3,250</span>
          </div>
        </div>

        {/* Gauge 3: Curated Units & Availability */}
        <div className="bg-white dark:bg-[#0D121F] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex items-center justify-between relative overflow-hidden group hover:border-blue-500/40 transition-all">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
              Curated Residences
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-950 dark:text-white">
                {metrics.available_properties}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">/ {metrics.total_properties} Units</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light">
              Islamabad F-7 • DHA Raya Lahore • Clifton Waterfront
            </p>
          </div>

          {/* Circular Donut Meter */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-500 transition-all duration-1000"
                strokeDasharray="75, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-mono font-bold text-amber-700 dark:text-amber-200">256</span>
          </div>
        </div>
      </div>

      {/* 3. Primary KPI Strip (6 Cards with Estately Light Design) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Available Inventory */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Inventory</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-500/20">
              <Building2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-serif font-extrabold text-slate-950 dark:text-white">
              {metrics.available_properties}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold ml-1">/ {metrics.total_properties}</span>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Ready Possession
            </p>
          </div>
        </div>

        {/* Sales Pipeline */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pipeline</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-base sm:text-lg font-serif font-extrabold text-amber-700 dark:text-amber-300 truncate block">
              {formatPKR(metrics.total_pipeline_value, true)}
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1 truncate">
              {deals.length} Active in closing
            </p>
          </div>
        </div>

        {/* CRM Leads */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">CRM Leads</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-500/20">
              <Users2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-serif font-extrabold text-slate-950 dark:text-white">
              {metrics.total_leads}
            </span>
            <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold ml-1">({metrics.new_leads} new)</span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1">
              {metrics.conversion_rate}% conversion
            </p>
          </div>
        </div>

        {/* Scheduled Showings */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Site Visits</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center border border-cyan-200 dark:border-cyan-500/20">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-serif font-extrabold text-slate-950 dark:text-white">
              {metrics.scheduled_visits}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold ml-1">upcoming</span>
            <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold mt-1">
              Conflict-free agenda
            </p>
          </div>
        </div>

        {/* Monthly Rent Roll */}
        <Link
          href="/workspace/rentals"
          className="bg-white dark:bg-[#0D121F] rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              Rent Roll
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-base sm:text-lg font-serif font-extrabold text-emerald-700 dark:text-emerald-300 truncate block">
              {formatPKR(metrics.total_rent_roll_pkr || 1750000, true)}
            </span>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <KeyRound className="w-3 h-3" /> {metrics.active_leases_count || 3} active leases
            </p>
          </div>
        </Link>

        {/* Maintenance Work Orders */}
        <Link
          href="/workspace/maintenance"
          className="bg-white dark:bg-[#0D121F] rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-amber-500/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
              Work Orders
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-500/20">
              <Wrench className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-serif font-extrabold text-slate-950 dark:text-white">
              {metrics.open_maintenance_count || 3}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold ml-1">tickets</span>
            <p className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold mt-1">
              Active SLA Sentry
            </p>
          </div>
        </Link>
      </div>

      {/* 4. Estatelab / Estately Dual Spline Chart & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Income Spline Graph */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0D121F] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl space-y-6 relative overflow-hidden transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
                  Financial Analytics
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Gross Volume vs Broker Yield</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-950 dark:text-white mt-1">
                Monthly Real Estate Revenue & Yield
              </h3>
            </div>

            {/* Year Selector Tabs */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("2026")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "2026"
                    ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950 font-extrabold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                2026 Live
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("2025")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "2025"
                    ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950 font-extrabold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                2025 Benchmark
              </button>
            </div>
          </div>

          {/* Floating Key Values Badge */}
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Gross Sales Volume</span>
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-300">PKR 95 Cr</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Agency Net Commission</span>
              <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400">PKR 64 Lakh</span>
            </div>
          </div>

          {/* Custom SVG Spline Graph */}
          <div className="relative h-60 w-full pt-4">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 200">
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[40, 80, 120, 160].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="600"
                  y2={y}
                  className="stroke-slate-100 dark:stroke-slate-800"
                  strokeDasharray="3 3"
                />
              ))}

              {/* Spline Area Fill (Gold - Gross) */}
              <path
                d="M 0 170 Q 50 140, 100 130 T 200 110 T 300 80 T 400 60 T 500 40 T 600 20 L 600 200 L 0 200 Z"
                fill="url(#goldGradient)"
              />

              {/* Spline Line (Gold - Gross) */}
              <path
                d="M 0 170 Q 50 140, 100 130 T 200 110 T 300 80 T 400 60 T 500 40 T 600 20"
                fill="none"
                stroke="#D97706"
                strokeWidth="3"
                className="drop-shadow-[0_0_10px_rgba(217,119,6,0.3)]"
              />

              {/* Spline Line (Blue - Net) */}
              <path
                d="M 0 185 Q 50 160, 100 150 T 200 140 T 300 120 T 400 100 T 500 80 T 600 60"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
                className="drop-shadow-[0_0_8px_rgba(37,99,235,0.3)]"
              />

              {/* Highlight Points */}
              <circle cx="300" cy="80" r="5" fill="#D97706" className="stroke-white dark:stroke-[#0B0F17]" strokeWidth="2" />
              <circle cx="300" cy="120" r="4" fill="#2563EB" className="stroke-white dark:stroke-[#0B0F17]" strokeWidth="2" />
              <circle cx="600" cy="20" r="6" fill="#D97706" className="stroke-white dark:stroke-[#0B0F17]" strokeWidth="2" />
            </svg>

            {/* X-Axis Months */}
            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-3">
              {currentChart.map((d) => (
                <span key={d.month}>{d.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Estatelab Performance Rate Radar & Pentagon Matrix (Right Section) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0D121F] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl space-y-6 flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
                Performance Rate
              </span>
              <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
                Top 1% Tier
              </span>
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-950 dark:text-white mt-1">
              Institutional Quality Index
            </h3>
          </div>

          {/* Pentagon Spider Radar Simulation */}
          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <polygon
                points="50,5 95,38 78,92 22,92 5,38"
                fill="none"
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="1"
              />
              <polygon
                points="50,25 75,43 65,75 35,75 25,43"
                fill="none"
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="1"
              />
              <polygon
                points="50,10 90,40 72,85 28,88 12,42"
                fill="rgba(245, 158, 11, 0.18)"
                stroke="#D97706"
                strokeWidth="2"
              />
              <circle cx="50" cy="50" r="2" fill="#D97706" />
            </svg>
          </div>

          {/* 5 Rated Attribute Dimensions */}
          <div className="space-y-2 pt-2 text-xs">
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Title Deed Cleanliness</span>
              </span>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">100%</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Rent Roll Realization</span>
              </span>
              <span className="font-mono font-bold text-amber-700 dark:text-amber-300">96.8%</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Users2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>NRP Client Retention</span>
              </span>
              <span className="font-mono font-bold text-blue-700 dark:text-blue-400">94.5%</span>
            </div>
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Days on Market Velocity</span>
              </span>
              <span className="font-mono font-bold text-cyan-700 dark:text-cyan-300">18.2 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Active Deals Pipeline & AI Intelligence Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Deals Table (8 Columns) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0D121F] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl space-y-4 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
                Transaction Tracking
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-950 dark:text-white mt-0.5">
                Active Closing Pipeline
              </h3>
            </div>
            <Link
              href="/workspace/deals"
              className="text-xs font-bold text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 flex items-center gap-1 transition-colors"
            >
              <span>Full Pipeline ({deals.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Deals Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-3">Client / Buyer</th>
                  <th className="py-3 px-3">Property Particulars</th>
                  <th className="py-3 px-3">Stage</th>
                  <th className="py-3 px-3">Agreed Amount</th>
                  <th className="py-3 px-3">Lead Broker</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-xs">
                {deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-colors">
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-900 dark:text-white block">{deal.client_name}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{deal.client_phone}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-slate-800 dark:text-slate-200 font-medium line-clamp-1 max-w-[200px]">
                        {deal.property?.title}
                      </span>
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono">
                        {deal.property?.reference_code}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          deal.stage === "Closed Won"
                            ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30"
                            : deal.stage === "Documentation" || deal.stage === "Booking"
                            ? "bg-amber-50 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-500/30"
                            : deal.stage === "Offer" || deal.stage === "Negotiation"
                            ? "bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-500/30"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        {deal.stage}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-mono font-bold text-amber-800 dark:text-amber-300">
                        {formatPKR(deal.agreed_amount, true)}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300 font-medium">
                      {deal.agent?.full_name}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Link
                        href="/workspace/deals"
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-semibold transition-colors"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Deal Intelligence Copilot */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0D121F] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl space-y-6 flex flex-col justify-between transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-950 dark:bg-gradient-to-tr dark:from-amber-500 dark:to-amber-300 text-amber-400 dark:text-slate-950 flex items-center justify-center font-bold shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 block">
                  AqarFlow AI Copilot
                </span>
                <h4 className="text-base font-serif font-bold text-slate-950 dark:text-white">
                  Cross-Border Deal Advisor
                </h4>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-900/90 border border-amber-300/80 dark:border-amber-500/20 text-xs text-slate-800 dark:text-slate-300 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 block">
                ✦ High Net Worth Match Detected
              </span>
              <p className="font-light leading-relaxed">
                Overseas investor <strong>Dr. Tariq Al-Hashmi (London)</strong> requested inquiry for 1-Kanal villas in DHA Phase 6 Lahore.
                Your listing <strong>AQ-1001 (PKR 9.50 Cr)</strong> has 98% parameter match.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <a
                  href="https://wa.me/447700900077?text=Hello%20Dr.%20Tariq%2C%20following%20up%20on%20your%20DHA%20Phase%206%20Villa%20inquiry%20from%20AqarFlow."
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Dispatch</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 block">
                ✦ Rental Yield Opportunity
              </span>
              <p className="font-light leading-relaxed">
                Centaurus Residencia 2-Bed suite rental is generating 7.8% yield, outperforming Islamabad commercial average by +1.4%.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Powered by AqarFlow Neural Match</span>
            <span className="text-amber-700 dark:text-amber-400 font-mono font-bold">99.4% Accuracy</span>
          </div>
        </div>
      </div>

      {/* 6. Recent Inquiries & Upcoming Showings Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries Feed */}
        <div className="bg-white dark:bg-[#0D121F] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl space-y-4 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
                Inbound Inquiries
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-950 dark:text-white mt-0.5">
                Client Leads Stream
              </h3>
            </div>
            <Link
              href="/workspace/leads"
              className="text-xs font-bold text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 flex items-center gap-1 transition-colors"
            >
              <span>View All CRM</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {metrics.recent_leads.map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-amber-500/40 transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-sm block">{lead.client_name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                      <Phone className="w-3 h-3 text-slate-400" /> {lead.phone}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      lead.stage === "New"
                        ? "bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-500/30"
                        : lead.stage === "Qualified"
                        ? "bg-cyan-50 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30"
                        : lead.stage === "Visit Scheduled"
                        ? "bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30"
                        : "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30"
                    }`}
                  >
                    {lead.stage}
                  </span>
                </div>

                {lead.property && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 line-clamp-1">
                    Inquiry on: <strong className="text-amber-800 dark:text-amber-300">{lead.property.title}</strong>
                  </p>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span>Assigned: {lead.assigned_agent?.full_name || "Unassigned"}</span>
                  <span className="font-mono">{formatDate(lead.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Showings */}
        <div className="bg-white dark:bg-[#0D121F] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl space-y-4 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
                Scheduled Walkthroughs
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-950 dark:text-white mt-0.5">
                Upcoming Site Showings
              </h3>
            </div>
            <Link
              href="/workspace/visits"
              className="text-xs font-bold text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 flex items-center gap-1 transition-colors"
            >
              <span>Calendar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {metrics.upcoming_visits.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 py-8 text-center">No upcoming visits scheduled.</p>
            ) : (
              metrics.upcoming_visits.map((visit) => (
                <div
                  key={visit.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-amber-500/40 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm block">
                        {visit.client_name} ({visit.client_phone})
                      </span>
                      <span className="text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1.5 mt-0.5 font-mono">
                        <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>{formatDateTime(visit.scheduled_at)}</span>
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        visit.status === "Confirmed"
                          ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30"
                          : "bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-500/30"
                      }`}
                    >
                      {visit.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-1">
                    Property: <strong className="text-slate-900 dark:text-white">{visit.property?.title}</strong>
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                    <span>Meeting point: {visit.meeting_point || "On-site"}</span>
                    <span>Broker: {visit.agent?.full_name}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
