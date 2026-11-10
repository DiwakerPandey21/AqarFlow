"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Save,
  Globe,
  DollarSign,
  Clock,
  UserCheck
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/db";
import { Agency } from "@/lib/types";

export default function WorkspaceSettingsPage() {
  const { user, isAdmin } = useAuth();
  const [agency, setAgency] = useState<Agency | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setAgency(db.getAgency());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agency || !user || !isAdmin) return;
    db.updateAgency(agency, user);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!agency) return null;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D121F] p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full">
              System Configuration
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="text-xs font-mono text-slate-400">Regional Localization & Rules</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Agency Configuration & Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-light">
            Default operational currency, branch address, and regional localization.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Agency Details */}
        <div className="bg-[#0D121F] rounded-3xl p-6 sm:p-8 border border-slate-800/80 shadow-xl space-y-4 text-white">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-white text-base">Agency Particulars</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Agency Name *</label>
              <input
                type="text"
                disabled={!isAdmin}
                value={agency.name}
                onChange={(e) => setAgency({ ...agency, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium disabled:bg-slate-950/60"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Slug Identifier</label>
              <input
                type="text"
                disabled
                value={agency.slug}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-slate-400"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Primary Support Email</label>
              <input
                type="email"
                disabled={!isAdmin}
                value={agency.email || ""}
                onChange={(e) => setAgency({ ...agency, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium disabled:bg-slate-950/60"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Central Helpline / Phone</label>
              <input
                type="tel"
                disabled={!isAdmin}
                value={agency.phone || ""}
                onChange={(e) => setAgency({ ...agency, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium disabled:bg-slate-950/60"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-300 mb-1">Headquarters Office Address</label>
              <input
                type="text"
                disabled={!isAdmin}
                value={agency.address || ""}
                onChange={(e) => setAgency({ ...agency, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium disabled:bg-slate-950/60"
              />
            </div>
          </div>
        </div>

        {/* Localization & Currency */}
        <div className="bg-[#0D121F] rounded-3xl p-6 sm:p-8 border border-slate-800/80 shadow-xl space-y-4 text-white">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif font-bold text-white text-base">Regional Localization</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Default Currency</label>
              <input
                type="text"
                disabled
                value="PKR (Pakistani Rupee - Lakh & Crore formatting)"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Operational Time Zone</label>
              <input
                type="text"
                disabled
                value="Asia/Karachi (PKT - UTC+05:00)"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Demo Credentials Guide */}
        <div className="bg-[#0D121F] rounded-3xl p-6 border border-amber-500/20 text-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>Tester & Reviewer Accounts (Pre-configured)</span>
          </div>
          <p className="text-slate-300 leading-relaxed font-light">
            The platform is pre-seeded with two operational accounts to demonstrate full Role-Based
            Access Control (RBAC):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Agency Admin: Salman Tariq</span>
              <span className="text-slate-400 block font-mono">Email: admin@aqarflow.com</span>
              <span className="text-slate-400 block font-mono">Password: Password123!</span>
              <span className="text-[10px] text-amber-400 font-semibold mt-1 block">
                Access: Full inventory management, lead assignment, team invites, audit logs.
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white block">Real Estate Agent: Ayesha Khan</span>
              <span className="text-slate-400 block font-mono">Email: ayesha@aqarflow.com</span>
              <span className="text-slate-400 block font-mono">Password: Password123!</span>
              <span className="text-[10px] text-blue-400 font-semibold mt-1 block">
                Access: Assigned leads only, visit schedule, personal deal pipeline.
              </span>
            </div>
          </div>
        </div>

        {isAdmin && (
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Save className="w-4 h-4 text-slate-950" />
            <span>Save Agency Changes</span>
          </button>
        )}
      </form>
    </div>
  );
}
