"use client";

import React, { useState, useEffect } from "react";
import {
  UserCheck,
  Plus,
  Mail,
  Phone,
  Shield,
  Home,
  Users2,
  Briefcase,
  X,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/db";
import { User } from "@/lib/types";

export default function WorkspaceAgentsPage() {
  const { user, isAdmin } = useAuth();
  const [agents, setAgents] = useState<
    Array<User & { active_properties_count: number; active_leads_count: number; closed_deals_count: number }>
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "+92 300 0000000",
    role: "agent" as "agent" | "agency_admin"
  });

  const loadAgents = () => {
    const list = db.getAgentsWithStats();
    setAgents(list);
  };

  useEffect(() => {
    loadAgents();
  }, []);

  const handleInviteAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isAdmin) return;

    db.inviteAgent(formData, user);
    setIsModalOpen(false);
    setFormData({
      full_name: "",
      email: "",
      phone: "+92 300 0000000",
      role: "agent"
    });
    loadAgents();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D121F] p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full">
              Brokerage & Advisory Roster
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="text-xs font-mono text-slate-400">Team Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Certified Partner Brokers & Staff
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-light">
            Manage agency team members, permissions, workload distribution, and closed transactions.
          </p>
        </div>

        {isAdmin && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>Add Team Member</span>
          </button>
        )}
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white dark:bg-[#0D121F] rounded-3xl p-6 border border-slate-200 dark:border-slate-800/80 shadow-xs dark:shadow-xl space-y-5 flex flex-col justify-between hover:border-amber-500/40 transition-all text-slate-900 dark:text-white"
          >
            <div>
              {/* Avatar & Role Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 ring-1 ring-amber-400/40 shrink-0">
                    <img
                      src={
                        agent.avatar_url ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      }
                      alt={agent.full_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-slate-950 dark:text-white text-base">{agent.full_name}</h3>
                    <span
                      className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mt-1 border ${
                        agent.role === "agency_admin"
                          ? "bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/30"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {agent.role.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" title="Active Account" />
              </div>

              {/* Contact info */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <span>{agent.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="font-mono text-slate-700 dark:text-slate-300">{agent.phone || "+92 300 0000000"}</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-mono font-bold text-slate-900 dark:text-white block text-sm">
                  {agent.active_properties_count}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Listings</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-mono font-bold text-amber-600 dark:text-amber-300 block text-sm">
                  {agent.active_leads_count}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Leads</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 block text-sm">
                  {agent.closed_deals_count}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Closed</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Agent Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0D121F] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-1">
              Personnel Clearance
            </span>
            <h3 className="text-xl font-serif font-bold text-slate-950 dark:text-white mb-1">Add Agency Team Member</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 font-light">
              Grant workspace access and assign role permissions.
            </p>

            <form onSubmit={handleInviteAgent} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="e.g. Kashif Munir"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="kashif@aqarflow.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value as "agent" | "agency_admin" })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                >
                  <option value="agent">Real Estate Agent (Assigned leads & properties only)</option>
                  <option value="agency_admin">Agency Administrator (Full permissions)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all text-center"
                >
                  Add Member to Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
