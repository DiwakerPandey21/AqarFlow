"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  TrendingUp,
  FileText,
  Printer,
  X,
  CheckCircle2,
  DollarSign,
  Calendar,
  Building2,
  UserCheck
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/db";
import { Deal, DealStage, Property, User } from "@/lib/types";
import { formatPKR, formatDate } from "@/lib/formatters";

export default function WorkspaceDealsPage() {
  const { user, isAdmin } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<User[]>([]);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDealForReceipt, setSelectedDealForReceipt] = useState<Deal | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    property_id: "",
    agent_id: "usr-agent-1",
    client_name: "",
    client_phone: "",
    stage: "Negotiation" as DealStage,
    offer_amount: 18000000,
    agreed_amount: 18200000,
    token_amount: 1000000,
    commission_rate: 1.0,
    expected_close_date: "2026-12-15",
    notes: "Token deposit paid via pay order. Title transfer in progress at society office."
  });

  const loadDeals = () => {
    if (!user) return;
    const list = db.getDeals(user);
    setDeals(list);
    const props = db.getProperties({ publicOnly: false });
    setProperties(props);
    if (props.length > 0 && !formData.property_id) {
      setFormData((prev) => ({ ...prev, property_id: props[0].id }));
    }
    setAgents(db.getUsers().filter((u) => u.status === "active"));
  };

  useEffect(() => {
    loadDeals();
  }, [user]);

  const dealStages: DealStage[] = [
    "Inquiry",
    "Qualified",
    "Visit",
    "Offer",
    "Negotiation",
    "Booking",
    "Documentation",
    "Closed Won",
    "Closed Lost"
  ];

  const handleStageChange = (dealId: string, stage: DealStage) => {
    if (!user) return;
    db.updateDeal(dealId, { stage }, user);
    loadDeals();
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    db.createDeal(
      {
        property_id: formData.property_id,
        agent_id: formData.agent_id,
        client_name: formData.client_name,
        client_phone: formData.client_phone,
        stage: formData.stage,
        offer_amount: Number(formData.offer_amount),
        agreed_amount: Number(formData.agreed_amount),
        token_amount: Number(formData.token_amount),
        commission_rate: Number(formData.commission_rate),
        commission_amount: (Number(formData.agreed_amount) * Number(formData.commission_rate)) / 100,
        expected_close_date: formData.expected_close_date,
        notes: formData.notes
      },
      user
    );

    setIsAddModalOpen(false);
    loadDeals();
  };

  const totalPipeline = deals
    .filter((d) => d.stage !== "Closed Lost")
    .reduce((sum, d) => sum + (d.agreed_amount || d.offer_amount || 0), 0);

  const totalCommissions = deals
    .filter((d) => d.stage !== "Closed Lost")
    .reduce((sum, d) => sum + (d.commission_amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D121F] p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full">
              Transaction Operations
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="text-xs font-mono text-slate-400">Escrow & Settlement Workflow</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Sales Pipeline & Deal Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-light">
            Track transaction milestones from initial offer through token advance, escrow verification, and title deed execution.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>New Deal Record</span>
        </button>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0D121F] p-5 rounded-2xl border border-slate-800/80 shadow-xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Pipeline Volume
          </span>
          <span className="text-2xl font-serif font-extrabold text-amber-300 mt-1 block">
            {formatPKR(totalPipeline)}
          </span>
          <span className="text-xs text-slate-400 font-light">Sum of active deal valuations</span>
        </div>

        <div className="bg-[#0D121F] p-5 rounded-2xl border border-slate-800/80 shadow-xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Projected Brokerage
          </span>
          <span className="text-2xl font-serif font-extrabold text-emerald-400 mt-1 block">
            {formatPKR(totalCommissions)}
          </span>
          <span className="text-xs text-slate-400 font-light">Standard 1% brokerage basis</span>
        </div>

        <div className="bg-[#0D121F] p-5 rounded-2xl border border-slate-800/80 shadow-xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Active Deals
          </span>
          <span className="text-2xl font-serif font-extrabold text-cyan-400 mt-1 block">
            {deals.filter((d) => !["Closed Won", "Closed Lost"].includes(d.stage)).length}
          </span>
          <span className="text-xs text-slate-400 font-light">Under active negotiation or booking</span>
        </div>
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        {deals.map((deal) => {
          const isWon = deal.stage === "Closed Won";
          const isBooking = deal.stage === "Booking";
          const progressIndex = dealStages.indexOf(deal.stage);
          const progressPct = Math.round(((progressIndex + 1) / dealStages.length) * 100);

          return (
            <div
              key={deal.id}
              className="bg-white dark:bg-[#0D121F] rounded-3xl p-6 border border-slate-200 dark:border-slate-800/80 shadow-xs dark:shadow-xl space-y-4 hover:border-amber-500/40 transition-all text-slate-900 dark:text-white"
            >
              {/* Row 1: Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded">
                      DEAL-{deal.id.substring(deal.id.length - 4)}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        isWon
                          ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30"
                          : isBooking
                          ? "bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/30"
                          : "bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-500/30"
                      }`}
                    >
                      {deal.stage}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-slate-950 dark:text-white mt-1">
                    {deal.property?.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Buyer / Client: <strong className="text-slate-800 dark:text-slate-200 font-semibold">{deal.client_name}</strong> ({deal.client_phone})
                  </p>
                </div>

                {/* Amounts & Receipt Button */}
                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Agreed Amount
                    </span>
                    <span className="text-xl font-mono font-extrabold text-amber-600 dark:text-amber-300 block">
                      {formatPKR(deal.agreed_amount || deal.offer_amount)}
                    </span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                      Comm: {formatPKR(deal.commission_amount)} ({deal.commission_rate}%)
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDealForReceipt(deal)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
                    title="Generate Deal Summary Statement"
                  >
                    <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="hidden sm:inline">Receipt</span>
                  </button>
                </div>
              </div>

              {/* Row 2: Milestone Progress Bar */}
              <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <span>Transaction Progress ({deal.stage})</span>
                  <span>Target Close: {deal.expected_close_date || "Pending"}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isWon ? "bg-emerald-500" : "bg-blue-600"
                    }`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Row 3: Advance Stage & Notes */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">Advance Stage:</span>
                  <select
                    value={deal.stage}
                    onChange={(e) => handleStageChange(deal.id, e.target.value as DealStage)}
                    className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                  >
                    {dealStages.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-slate-600 dark:text-slate-400">
                  Responsible Broker: <strong className="text-slate-800 dark:text-slate-200">{deal.agent?.full_name}</strong>
                  {deal.token_amount && deal.token_amount > 0 ? (
                    <span className="ml-3 font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 px-2 py-0.5 rounded">
                      Token Paid: {formatPKR(deal.token_amount)}
                    </span>
                  ) : null}
                </div>
              </div>

              {deal.notes && (
                <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white">Transaction Notes:</strong> {deal.notes}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Deal Modal */}
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
              Transaction Sentry
            </span>
            <h3 className="text-xl font-serif font-bold text-slate-950 dark:text-white mb-1">Create Deal Record</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 font-light">
              Link property, buyer, agreed financials, and broker commission.
            </p>

            <form onSubmit={handleCreateDeal} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Property *</label>
                <select
                  required
                  value={formData.property_id}
                  onChange={(e) => setFormData({ ...formData, property_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans font-medium"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.reference_code} - {p.title} ({formatPKR(p.price)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Buyer / Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="e.g. Hamza Sheikh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Client Mobile *</label>
                  <input
                    type="tel"
                    required
                    value={formData.client_phone}
                    onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                    placeholder="+92 300 7766550"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Agreed Amount (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.agreed_amount}
                    onChange={(e) => setFormData({ ...formData, agreed_amount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Token Advance (PKR)</label>
                  <input
                    type="number"
                    value={formData.token_amount}
                    onChange={(e) => setFormData({ ...formData, token_amount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Commission Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.commission_rate}
                    onChange={(e) => setFormData({ ...formData, commission_rate: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Close Date</label>
                  <input
                    type="date"
                    value={formData.expected_close_date}
                    onChange={(e) => setFormData({ ...formData, expected_close_date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Initial Stage</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as DealStage })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  >
                    {dealStages.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Responsible Broker</label>
                  <select
                    value={formData.agent_id}
                    onChange={(e) => setFormData({ ...formData, agent_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  >
                    {agents.map((ag) => (
                      <option key={ag.id} value={ag.id}>
                        {ag.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Transaction Notes</label>
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
                  Create Deal Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction Statement / Receipt Modal */}
      {selectedDealForReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0D121F] rounded-3xl max-w-xl w-full p-8 shadow-2xl relative border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white print:m-0 print:p-4 print:shadow-none">
            <button
              type="button"
              onClick={() => setSelectedDealForReceipt(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Header */}
            <div className="border-b-2 border-slate-900 dark:border-slate-700 pb-5 mb-6 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  <span className="text-xl font-extrabold text-slate-950 dark:text-white font-serif">
                    AqarFlow Real Estate
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Executive Heights, Blue Area, Islamabad • Pakistan
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">NTN / STRN Verified Brokerage</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-900 text-amber-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded block">
                  STATEMENT #{selectedDealForReceipt.id.substring(selectedDealForReceipt.id.length - 6).toUpperCase()}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  Date: {formatDate(selectedDealForReceipt.created_at)}
                </span>
              </div>
            </div>

            {/* Statement Body */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 font-semibold block text-[10px] uppercase">
                    Client / Purchaser
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm block">
                    {selectedDealForReceipt.client_name}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">{selectedDealForReceipt.client_phone}</span>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-slate-500 font-semibold block text-[10px] uppercase">
                    Property Reference
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm block">
                    {selectedDealForReceipt.property?.reference_code}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 line-clamp-1">
                    {selectedDealForReceipt.property?.title}
                  </span>
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4">Financial Item</th>
                      <th className="py-2.5 px-4 text-right">Amount (PKR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="py-2.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                        Agreed Purchase Consideration
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-slate-900 dark:text-white">
                        {formatPKR(selectedDealForReceipt.agreed_amount)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">
                        Token / Advance Deposit Paid
                      </td>
                      <td className="py-2.5 px-4 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                        - {formatPKR(selectedDealForReceipt.token_amount)}
                      </td>
                    </tr>
                    <tr className="bg-amber-50/50 dark:bg-amber-500/10 font-bold">
                      <td className="py-2.5 px-4 text-amber-900 dark:text-amber-200">
                        Remaining Consideration on Registry Transfer
                      </td>
                      <td className="py-2.5 px-4 text-right text-amber-900 dark:text-amber-200 font-mono">
                        {formatPKR(
                          (selectedDealForReceipt.agreed_amount || 0) -
                            (selectedDealForReceipt.token_amount || 0)
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400">
                        Agency Brokerage Fee ({selectedDealForReceipt.commission_rate}%)
                      </td>
                      <td className="py-2.5 px-4 text-right font-medium text-slate-700 dark:text-slate-300">
                        {formatPKR(selectedDealForReceipt.commission_amount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] leading-relaxed">
                <strong>Legal Note:</strong> This statement documents commercial terms agreed through
                AqarFlow. Property title mutation and final possession remain subject to physical
                verification and execution before the respective registrar or development authority.
              </div>
            </div>

            {/* Print Button */}
            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center print:hidden">
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Printed via AqarFlow Platform • Pakistan
              </span>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white dark:bg-gradient-to-r dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 dark:text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Transaction Statement</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
