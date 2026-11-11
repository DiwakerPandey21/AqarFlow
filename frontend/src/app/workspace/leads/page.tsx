"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users2,
  Plus,
  Search,
  Filter,
  Kanban,
  Table,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  Calendar,
  Briefcase,
  X,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Send,
  ChevronLeft,
  ChevronRight,
  GripVertical
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/db";
import { Lead, LeadStage, User, Activity } from "@/lib/types";
import { formatPKR, formatDate, formatDateTime } from "@/lib/formatters";

export default function WorkspaceLeadsPage() {
  const { user, isAdmin } = useAuth();
  const [leads, setLeads] = useState<Lead[]>(() => (user ? db.getLeads(user) : []));
  const [agents, setAgents] = useState<User[]>(() => db.getUsers().filter((u) => u.status === "active"));
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Drawer state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New activity form inside drawer
  const [newActivity, setNewActivity] = useState({
    activity_type: "note" as Activity["activity_type"],
    body: ""
  });

  // Add lead form state
  const [formData, setFormData] = useState({
    client_name: "",
    phone: "",
    email: "",
    preferred_contact_method: "WhatsApp",
    purpose: "Buy",
    budget_min: 20000000,
    budget_max: 40000000,
    preferred_location: "Islamabad F-8 / Centaurus",
    property_type: "Apartment",
    source: "Walk-in",
    notes: "Client visited office inquiring about ready properties.",
    assigned_agent_id: "usr-agent-1"
  });

  const loadLeads = () => {
    if (!user) return;
    const list = db.getLeads(user);
    setLeads(list);
    setAgents(db.getUsers().filter((u) => u.status === "active"));
    if (selectedLead) {
      const refreshed = db.getLeadById(selectedLead.id);
      if (refreshed) setSelectedLead(refreshed);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [user]);

  const stages: LeadStage[] = [
    "New",
    "Contacted",
    "Qualified",
    "Visit Scheduled",
    "Negotiation",
    "Converted",
    "Lost"
  ];

  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<LeadStage | null>(null);

  const handleStageChange = (leadId: string, newStage: LeadStage) => {
    if (!user) return;
    db.updateLead(leadId, { stage: newStage }, user);
    loadLeads();
  };

  const handleStageAdvance = (e: React.MouseEvent, leadId: string, currentStage: LeadStage, direction: "prev" | "next") => {
    e.stopPropagation();
    const currentIndex = stages.indexOf(currentStage);
    if (direction === "next" && currentIndex < stages.length - 1) {
      handleStageChange(leadId, stages[currentIndex + 1]);
    } else if (direction === "prev" && currentIndex > 0) {
      handleStageChange(leadId, stages[currentIndex - 1]);
    }
  };

  const handleAssignAgent = (leadId: string, agentId: string) => {
    if (!user || !isAdmin) return;
    db.assignLead(leadId, agentId, user);
    loadLeads();
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedLead || !newActivity.body) return;
    db.addLeadActivity(selectedLead.id, newActivity, user);
    setNewActivity({ activity_type: "note", body: "" });
    loadLeads();
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    db.createLead(
      {
        client_name: formData.client_name,
        phone: formData.phone,
        email: formData.email,
        preferred_contact_method: formData.preferred_contact_method as any,
        purpose: formData.purpose as any,
        budget_min: Number(formData.budget_min),
        budget_max: Number(formData.budget_max),
        preferred_location: formData.preferred_location,
        property_type: formData.property_type,
        source: formData.source as any,
        stage: "New",
        notes: formData.notes,
        assigned_agent_id: formData.assigned_agent_id
      },
      user
    );
    setIsAddModalOpen(false);
    loadLeads();
  };

  const filtered = leads.filter((l) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        l.client_name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.preferred_location && l.preferred_location.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0D121F] p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl relative overflow-hidden transition-colors">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-500/30">
              Cross-Border CRM
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">• High Net Worth Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
            Client Inquiries & CRM Pipeline
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {leads.length} active leads. Seamlessly advance overseas and domestic buyers from first WhatsApp touch to contract closing.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* View toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === "kanban"
                  ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950 font-extrabold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === "table"
                  ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950 font-extrabold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white dark:bg-gradient-to-r dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 dark:text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-slate-950/10 dark:shadow-amber-500/20 hover:scale-[1.02] transition-all"
          >
            <Plus className="w-4 h-4 text-amber-400 dark:text-slate-950" />
            <span>New Lead</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white dark:bg-[#0D121F] p-3 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl transition-colors">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by client name, mobile number, location..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-sans"
          />
        </div>
      </div>

      {/* View: Kanban vs Table */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 overflow-x-auto pb-4">
          {stages.map((stage, stageIndex) => {
            const stageLeads = filtered.filter((l) => l.stage === stage);
            const isDragTarget = dragOverStage === stage;
            return (
              <div
                key={stage}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  if (dragOverStage !== stage) setDragOverStage(stage);
                }}
                onDragLeave={() => {
                  if (dragOverStage === stage) setDragOverStage(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const leadId = e.dataTransfer.getData("text/plain") || draggedLeadId;
                  if (leadId) {
                    handleStageChange(leadId, stage);
                  }
                  setDraggedLeadId(null);
                  setDragOverStage(null);
                }}
                className={`rounded-2xl p-3 border transition-all flex flex-col min-w-[230px] ${
                  isDragTarget
                    ? "bg-amber-50/60 dark:bg-[#0D121F] border-amber-500 ring-2 ring-amber-400/40 shadow-xl"
                    : "bg-white dark:bg-[#0D121F] border-slate-200/90 dark:border-slate-800/80 shadow-2xs dark:shadow-xl"
                }`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight">{stage}</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-800 dark:text-amber-300 text-[10px] font-bold flex items-center justify-center font-mono">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-3 flex-1 min-h-[140px]">
                  {stageLeads.length === 0 ? (
                    <div className="h-full min-h-[100px] flex items-center justify-center border-2 border-dashed border-slate-800 rounded-xl text-[11px] text-slate-500">
                      Drop here
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        draggable={true}
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", lead.id);
                          setDraggedLeadId(lead.id);
                        }}
                        onDragEnd={() => {
                          setDraggedLeadId(null);
                          setDragOverStage(null);
                        }}
                        onClick={() => setSelectedLead(lead)}
                        className={`bg-slate-900/90 rounded-xl p-3.5 border transition-all cursor-pointer space-y-2.5 shadow-xs hover:border-amber-500/40 select-none ${
                          draggedLeadId === lead.id
                            ? "opacity-50 ring-2 ring-amber-400 scale-[0.98] border-amber-400"
                            : "border-slate-800 hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className="flex items-center gap-1.5 truncate">
                            <GripVertical className="w-3.5 h-3.5 text-slate-500 hover:text-slate-300 cursor-grab shrink-0" />
                            <span className="font-bold text-white text-xs leading-snug truncate">
                              {lead.client_name}
                            </span>
                          </div>
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-bold bg-slate-800 text-amber-300 border border-amber-500/20 shrink-0">
                            {lead.source}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3 text-slate-500" />
                          <span>{lead.phone}</span>
                        </p>

                        {lead.budget_max && lead.budget_max > 0 ? (
                          <div className="text-[11px] font-semibold text-amber-300 bg-amber-950/80 border border-amber-500/20 px-2 py-0.5 rounded inline-block font-mono">
                            Budget: {formatPKR(lead.budget_max, true)}
                          </div>
                        ) : null}

                        {lead.preferred_location && (
                          <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                            <span className="truncate">{lead.preferred_location}</span>
                          </p>
                        )}

                        {/* Card Footer with Mobile 1-Tap Advance */}
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                          <span className="truncate max-w-[85px] text-slate-400">{lead.assigned_agent?.full_name?.split(" ")[0] || "Unassigned"}</span>
                          
                          {/* 1-Tap Stage Shift Buttons */}
                          <div className="flex items-center gap-1">
                            {stageIndex > 0 && (
                              <button
                                type="button"
                                title={`Move back to ${stages[stageIndex - 1]}`}
                                onClick={(e) => handleStageAdvance(e, lead.id, lead.stage, "prev")}
                                className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              >
                                <ChevronLeft className="w-3 h-3" />
                              </button>
                            )}
                            {stageIndex < stages.length - 1 && (
                              <button
                                type="button"
                                title={`Advance to ${stages[stageIndex + 1]}`}
                                onClick={(e) => handleStageAdvance(e, lead.id, lead.stage, "next")}
                                className="w-5 h-5 rounded flex items-center justify-center bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold transition-colors border border-amber-500/30"
                              >
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-[#0D121F] rounded-3xl border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl overflow-hidden transition-colors">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Budget / Locality</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Assigned Broker</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{lead.client_name}</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">
                    <div>{lead.phone}</div>
                    <div className="text-[11px] text-slate-400">{lead.email || "-"}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-500/20 font-semibold text-[10px]">
                      {lead.source}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-amber-300 font-mono">
                      {lead.budget_max ? formatPKR(lead.budget_max, true) : "Unspecified"}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-xs">
                      {lead.preferred_location || "-"}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={lead.stage}
                      onChange={(e) => handleStageChange(lead.id, e.target.value as LeadStage)}
                      className="px-2.5 py-1 rounded-lg border border-slate-700 font-bold text-xs bg-slate-900 text-amber-300 focus:outline-none"
                    >
                      {stages.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-300">
                    {lead.assigned_agent?.full_name || "Unassigned"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedLead(lead)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lead Detail Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0D121F] w-full max-w-lg h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300 text-slate-900 dark:text-white">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                  Lead Details & Activity History
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-950 dark:text-white mt-0.5">
                  {selectedLead.client_name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-light">
                  Created {formatDate(selectedLead.created_at)} • Source: {selectedLead.source}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* Stage & Agent Controls */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Current Stage
                  </label>
                  <select
                    value={selectedLead.stage}
                    onChange={(e) => handleStageChange(selectedLead.id, e.target.value as LeadStage)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                  >
                    {stages.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Assigned Agent
                  </label>
                  {isAdmin ? (
                    <select
                      value={selectedLead.assigned_agent_id || ""}
                      onChange={(e) => handleAssignAgent(selectedLead.id, e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="">Unassigned</option>
                      {agents.map((ag) => (
                        <option key={ag.id} value={ag.id}>
                          {ag.full_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {selectedLead.assigned_agent?.full_name || "Unassigned"}
                    </span>
                  )}
                </div>
              </div>

              {/* Direct Contact Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Client</span>
                </a>
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {selectedLead.phone}</span>
                </a>
              </div>

              {/* Specifications */}
              <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
                <h4 className="font-bold text-slate-950 dark:text-white text-sm">Lead Requirements</h4>
                <div className="grid grid-cols-2 gap-2 pt-2 text-slate-600 dark:text-slate-400">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Purpose:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedLead.purpose}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Property Type:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {selectedLead.property_type || "Any"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Budget Range:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {selectedLead.budget_max ? formatPKR(selectedLead.budget_max) : "Not specified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Preferred Area:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {selectedLead.preferred_location || "Open"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Linked Property (if inquiry from website) */}
              {selectedLead.property && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                    Inquired Property
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm block">
                    {selectedLead.property.title}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">
                    Ref: {selectedLead.property.reference_code} • {formatPKR(selectedLead.property.price)}
                  </p>
                </div>
              )}

              {/* Communication Timeline */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-950 dark:text-white text-sm">Communication & Activity Trail</h4>
                <div className="space-y-2.5">
                  {selectedLead.activities?.length === 0 ? (
                    <p className="text-slate-400 dark:text-slate-500 text-center py-4">No activities logged yet.</p>
                  ) : (
                    selectedLead.activities?.map((act) => (
                      <div
                        key={act.id}
                        className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">{act.activity_type}</span>
                          <span className="text-slate-400 dark:text-slate-500 font-mono">{formatDateTime(act.occurred_at)}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{act.body}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Add Activity Form */}
              <form onSubmit={handleAddActivity} className="space-y-2 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <h5 className="font-bold text-slate-900 dark:text-white text-xs">Log Call, Note or Meeting</h5>
                <div className="flex gap-2">
                  <select
                    value={newActivity.activity_type}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        activity_type: e.target.value as Activity["activity_type"]
                      })
                    }
                    className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="call">Phone Call</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="meeting">Site Meeting</option>
                    <option value="note">Internal Note</option>
                  </select>

                  <input
                    type="text"
                    required
                    value={newActivity.body}
                    onChange={(e) => setNewActivity({ ...newActivity, body: e.target.value })}
                    placeholder="Enter activity summary..."
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Convert to Deal Button */}
              <div className="pt-2">
                <Link
                  href="/workspace/deals"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Advance to Deal & Sales Pipeline &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0D121F] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-1">
              Client Acquisition
            </span>
            <h3 className="text-xl font-serif font-bold text-slate-950 dark:text-white mb-1">Create New CRM Lead</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-light">
              Manually log a walk-in, phone call, or referral client inquiry.
            </p>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="e.g. Asad Mehmood"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Purpose</label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  >
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                    <option value="Invest">Invest</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Lead Source</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  >
                    <option value="Walk-in">Walk-in</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Portal">Portal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Max Budget (PKR)</label>
                  <input
                    type="number"
                    value={formData.budget_max}
                    onChange={(e) => setFormData({ ...formData, budget_max: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred Location</label>
                  <input
                    type="text"
                    value={formData.preferred_location}
                    onChange={(e) => setFormData({ ...formData, preferred_location: e.target.value })}
                    placeholder="e.g. DHA Phase 6, Lahore"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned Agent</label>
                <select
                  value={formData.assigned_agent_id}
                  onChange={(e) => setFormData({ ...formData, assigned_agent_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                >
                  {agents.map((ag) => (
                    <option key={ag.id} value={ag.id}>
                      {ag.full_name} ({ag.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Inquiry Notes</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all text-center"
                >
                  Save Lead to CRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
