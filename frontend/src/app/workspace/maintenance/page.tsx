"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wrench,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  Building2,
  Phone,
  MessageCircle,
  User,
  DollarSign,
  ChevronRight,
  X,
  Flame,
  Check,
  Zap,
  Droplets,
  Wind,
  Hammer,
  Paintbrush
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/db";
import {
  MaintenanceRequest,
  MaintenancePriority,
  MaintenanceCategory,
  MaintenanceStatus,
  Property
} from "@/lib/types";
import { formatPKR, formatDate, formatDateTime } from "@/lib/formatters";

export default function WorkspaceMaintenancePage() {
  const { user, isAdmin } = useAuth();
  const [requests, setRequests] = useState<MaintenanceRequest[]>(() => (user ? db.getMaintenanceRequests(user) : []));
  const [properties, setProperties] = useState<Property[]>(() => db.getProperties({ publicOnly: false }));
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  // Modals & Drawer States
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Request Form State
  const [formData, setFormData] = useState({
    property_id: "",
    property_title: "",
    unit_number: "",
    reported_by: "Resident Tenant",
    reporter_phone: "+92 300 1234567",
    priority: "Medium" as MaintenancePriority,
    category: "Plumbing" as MaintenanceCategory,
    description: "",
    contractor_name: "Islamabad Express Repairs",
    contractor_phone: "+92 333 9988776",
    estimated_cost_pkr: 15000,
    scheduled_date: "2026-11-15",
    notes: "Requires standard replacement parts and technician visit."
  });

  const loadData = () => {
    if (!user) return;
    const allRequests = db.getMaintenanceRequests(user);
    setRequests(allRequests);
    setProperties(db.getProperties());

    if (selectedRequest) {
      const refreshed = db.getMaintenanceRequestById(selectedRequest.id);
      if (refreshed) setSelectedRequest(refreshed);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  // Metrics
  const openRequests = requests.filter((r) => r.status !== "Resolved" && r.status !== "Cancelled");
  const emergencyRequests = requests.filter(
    (r) => r.priority === "Emergency" && r.status !== "Resolved"
  );
  const resolvedThisMonth = requests.filter((r) => r.status === "Resolved");
  const totalSpend = requests.reduce(
    (acc, curr) => acc + (curr.actual_cost_pkr || curr.estimated_cost_pkr || 0),
    0
  );

  // Filtered List
  const filteredRequests = requests.filter((r) => {
    if (statusFilter !== "All" && r.status !== statusFilter) return false;
    if (priorityFilter !== "All" && r.priority !== priorityFilter) return false;
    if (categoryFilter !== "All" && r.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        r.ticket_number.toLowerCase().includes(q) ||
        r.property_title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.reported_by.toLowerCase().includes(q) ||
        (r.contractor_name && r.contractor_name.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Handle Quick Status Advance
  const handleStatusAdvance = (requestId: string, currentStatus: MaintenanceStatus) => {
    const sequence: MaintenanceStatus[] = ["Reported", "Assigned", "In Progress", "Resolved"];
    const currIdx = sequence.indexOf(currentStatus);
    if (currIdx !== -1 && currIdx < sequence.length - 1) {
      const nextStatus = sequence[currIdx + 1];
      db.updateMaintenanceRequest(
        requestId,
        {
          status: nextStatus,
          resolved_at: nextStatus === "Resolved" ? new Date().toISOString() : undefined
        },
        user || undefined
      );
      loadData();
    }
  };

  // Handle Create Request
  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.property_id || !formData.description) return;

    const prop = properties.find((p) => p.id === formData.property_id);

    db.createMaintenanceRequest(
      {
        property_id: formData.property_id,
        property_title: prop?.title || "Property Unit",
        unit_number: formData.unit_number || undefined,
        reported_by: formData.reported_by,
        reporter_phone: formData.reporter_phone,
        priority: formData.priority,
        category: formData.category,
        description: formData.description,
        status: "Assigned",
        contractor_name: formData.contractor_name || undefined,
        contractor_phone: formData.contractor_phone || undefined,
        estimated_cost_pkr: Number(formData.estimated_cost_pkr) || undefined,
        scheduled_date: formData.scheduled_date || undefined,
        notes: formData.notes
      },
      user || undefined
    );

    setIsAddModalOpen(false);
    loadData();
  };

  const getCategoryIcon = (cat: MaintenanceCategory) => {
    switch (cat) {
      case "Plumbing":
        return <Droplets className="w-3.5 h-3.5 text-blue-500" />;
      case "Electrical":
        return <Zap className="w-3.5 h-3.5 text-amber-500" />;
      case "HVAC":
        return <Wind className="w-3.5 h-3.5 text-cyan-500" />;
      case "Carpentry":
        return <Hammer className="w-3.5 h-3.5 text-orange-500" />;
      case "Paint & Masonry":
        return <Paintbrush className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <Wrench className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Luxury Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0D121F] p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl relative overflow-hidden transition-colors text-slate-900 dark:text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full">
              Asset Preservation & Upkeep
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="text-xs font-mono text-slate-400">Maintenance & Work Orders</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
            Property Care & Contractor Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-light">
            Dispatch local contractors, monitor emergency HVAC/plumbing repairs, and maintain vendor expenditure audit logs for managed properties.
          </p>
        </div>

        {/* Action Button */}
        <div className="relative z-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>New Work Order</span>
          </button>
        </div>

        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Open Work Orders */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all text-slate-900 dark:text-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Open Work Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-500/20">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-950 dark:text-white">
              {openRequests.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold ml-1">
              / {requests.length} total
            </span>
            <p className="text-[11px] text-blue-400 font-semibold mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Active in pipeline</span>
            </p>
          </div>
        </div>

        {/* Emergency Tickets */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all text-slate-900 dark:text-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Emergency Urgency
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              emergencyRequests.length > 0 ? "bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 animate-pulse" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
            }`}>
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-2xl sm:text-3xl font-serif font-extrabold ${
              emergencyRequests.length > 0 ? "text-rose-600 dark:text-rose-400" : "text-slate-950 dark:text-white"
            }`}>
              {emergencyRequests.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold ml-1">tickets</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
              {emergencyRequests.length > 0 ? "Immediate dispatch required" : "No urgent emergencies"}
            </p>
          </div>
        </div>

        {/* Resolved This Month */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all text-slate-900 dark:text-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Resolved Tickets
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-950 dark:text-white">
              {resolvedThisMonth.length}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold ml-1">completed</span>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              Contractor verified repairs
            </p>
          </div>
        </div>

        {/* Total Spend */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all text-slate-900 dark:text-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Repair Spend
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xl sm:text-2xl font-serif font-extrabold text-amber-700 dark:text-amber-300">
              {formatPKR(totalSpend, true)}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
              Audited invoice expenditure
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0D121F] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {["All", "Reported", "Assigned", "In Progress", "Resolved"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                statusFilter === st
                  ? "bg-slate-950 text-white dark:bg-amber-500 dark:text-slate-950 font-extrabold shadow-xs"
                  : "bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Priority & Search */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Priority dropdown */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-white focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="Emergency">Emergency</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Search */}
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticket, property, issue..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* View Mode */}
          <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === "cards" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
              }`}
            >
              Cards
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === "table" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Requests Grid / Table */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">No work orders match the criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Dispatch a new maintenance work order to coordinate property repairs with trusted contractors.
          </p>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
          >
            Create Work Order
          </button>
        </div>
      ) : viewMode === "cards" ? (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                {/* Header Pills */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {req.ticket_number}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {getCategoryIcon(req.category)}
                      <span>{req.category}</span>
                    </span>
                  </div>

                  {/* Priority Badge */}
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      req.priority === "Emergency"
                        ? "bg-rose-100 text-rose-800 border border-rose-200"
                        : req.priority === "High"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : req.priority === "Medium"
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {req.priority}
                  </span>
                </div>

                {/* Property Title */}
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                  {req.property_title}
                </h3>
                {req.unit_number && (
                  <p className="text-[11px] text-slate-500 font-mono">Unit: {req.unit_number}</p>
                )}

                {/* Issue Description */}
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed bg-slate-50/60 p-2.5 rounded-xl border border-slate-100">
                  {req.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 mt-3.5 text-xs">
                  <div className="p-2 rounded-xl bg-slate-50">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Contractor
                    </span>
                    <span className="font-bold text-slate-800 truncate block">
                      {req.contractor_name || "Unassigned"}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Estimated Cost
                    </span>
                    <span className="font-bold text-slate-900">
                      {req.estimated_cost_pkr ? formatPKR(req.estimated_cost_pkr) : "TBD"}
                    </span>
                  </div>
                </div>

                {/* Scheduled / Reported info */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                  <span>Reported by: {req.reported_by.split(" ")[0]}</span>
                  <span>{formatDate(req.created_at)}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                {/* Contractor Phone */}
                {req.contractor_phone && (
                  <a
                    href={`https://wa.me/${req.contractor_phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hello, following up on AqarFlow maintenance ticket ${req.ticket_number} for ${req.property_title}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    title="WhatsApp Contractor"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}

                {/* Quick Advance Status */}
                {req.status !== "Resolved" && (
                  <button
                    type="button"
                    onClick={() => handleStatusAdvance(req.id, req.status)}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                    title="Advance to next status"
                  >
                    Status: <strong className="text-blue-600">{req.status}</strong> &rarr;
                  </button>
                )}

                {/* Open Drawer */}
                <button
                  type="button"
                  onClick={() => setSelectedRequest(req)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Ticket</th>
                <th className="py-3.5 px-4">Property</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Contractor</th>
                <th className="py-3.5 px-4">Cost</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {req.ticket_number}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{req.property_title}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-xs">
                      {req.description}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700 text-[11px]">
                      {getCategoryIcon(req.category)}
                      <span>{req.category}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        req.priority === "Emergency"
                          ? "bg-rose-100 text-rose-800"
                          : req.priority === "High"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {req.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {req.contractor_name || "Unassigned"}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {req.estimated_cost_pkr ? formatPKR(req.estimated_cost_pkr) : "-"}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        req.status === "Resolved"
                          ? "bg-emerald-100 text-emerald-800"
                          : req.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedRequest(req)}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold transition-colors"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Work Order Details Drawer */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0D121F] w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300 text-slate-900 dark:text-white">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                    {selectedRequest.ticket_number}
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                    {selectedRequest.category}
                  </span>
                </div>
                <h2 className="text-lg font-serif font-bold text-slate-950 dark:text-white mt-1">
                  {selectedRequest.property_title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Reported by: {selectedRequest.reported_by} ({selectedRequest.reporter_phone})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* Status Update Strip */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px] block">
                  Workflow Status
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["Reported", "Assigned", "In Progress", "Resolved"] as MaintenanceStatus[]).map(
                    (st) => {
                      const isActive = selectedRequest.status === st;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => {
                            db.updateMaintenanceRequest(
                              selectedRequest.id,
                              {
                                status: st,
                                resolved_at: st === "Resolved" ? new Date().toISOString() : undefined
                              },
                              user || undefined
                            );
                            loadData();
                          }}
                          className={`py-2 px-1 rounded-xl text-center font-bold text-[11px] transition-all ${
                            isActive
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm"
                              : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {st}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px] block">
                  Issue Description
                </label>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                  {selectedRequest.description}
                </div>
              </div>

              {/* Contractor & Cost Particulars */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    Assigned Contractor
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    {selectedRequest.contractor_name || "Unassigned"}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">{selectedRequest.contractor_phone || "No phone"}</p>
                  {selectedRequest.contractor_phone && (
                    <a
                      href={`https://wa.me/${selectedRequest.contractor_phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:underline font-bold text-[11px] pt-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  )}
                </div>

                <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    Financials & Spend
                  </span>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Estimate:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm font-mono">
                      {selectedRequest.estimated_cost_pkr ? formatPKR(selectedRequest.estimated_cost_pkr) : "TBD"}
                    </span>
                  </div>
                  {selectedRequest.actual_cost_pkr && (
                    <div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Actual Cost:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm font-mono">
                        {formatPKR(selectedRequest.actual_cost_pkr)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Dates */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold block">
                    Scheduled Visit
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedRequest.scheduled_date ? formatDate(selectedRequest.scheduled_date) : "Pending Schedule"}
                  </span>
                </div>
                {selectedRequest.resolved_at && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold block">
                      Resolved Date
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {formatDate(selectedRequest.resolved_at)}
                    </span>
                  </div>
                )}
              </div>

              {selectedRequest.notes && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">Technician & Agency Notes</span>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{selectedRequest.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add New Work Order Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/75 backdrop-blur-sm p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white dark:bg-[#0D121F] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8 space-y-6 animate-in zoom-in-95 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-1">
                  Asset Operations
                </span>
                <h3 className="font-serif font-bold text-slate-950 dark:text-white text-lg">Dispatch Maintenance Work Order</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                  Assign contractor and schedule repair visit for tenant or building.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
              {/* Select Property */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Target Property</label>
                <select
                  required
                  value={formData.property_id}
                  onChange={(e) => setFormData({ ...formData, property_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 font-semibold text-slate-800 dark:text-white font-sans transition-all"
                >
                  <option value="">Select property unit...</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.reference_code} — {p.title} ({p.locality}, {p.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Category & Priority */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Issue Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-sans transition-all"
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Paint & Masonry">Paint & Masonry</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Urgency Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-bold font-sans transition-all"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Issue Details & Scope</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe repair required, symptoms, or requested replacement..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-sans transition-all"
                />
              </div>

              {/* Reported By */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Reported By</label>
                  <input
                    type="text"
                    required
                    value={formData.reported_by}
                    onChange={(e) => setFormData({ ...formData, reported_by: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-sans transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Reporter Mobile</label>
                  <input
                    type="text"
                    required
                    value={formData.reporter_phone}
                    onChange={(e) => setFormData({ ...formData, reporter_phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-mono transition-all"
                  />
                </div>
              </div>

              {/* Contractor & Cost */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Assigned Contractor</label>
                  <input
                    type="text"
                    value={formData.contractor_name}
                    onChange={(e) => setFormData({ ...formData, contractor_name: e.target.value })}
                    placeholder="e.g. Tariq Electrician"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-sans transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Contractor Phone</label>
                  <input
                    type="text"
                    value={formData.contractor_phone}
                    onChange={(e) => setFormData({ ...formData, contractor_phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-mono transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Estimated Cost (PKR)</label>
                  <input
                    type="number"
                    value={formData.estimated_cost_pkr}
                    onChange={(e) => setFormData({ ...formData, estimated_cost_pkr: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-mono transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    value={formData.scheduled_date}
                    onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-sans transition-all"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
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
                  Dispatch Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
