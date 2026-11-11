"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  KeyRound,
  Plus,
  Search,
  Filter,
  Calendar,
  Building2,
  Phone,
  MessageCircle,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  FileText,
  Printer,
  X,
  CreditCard,
  ChevronRight,
  TrendingUp,
  Receipt,
  Download,
  Check
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/db";
import { Lease, RentPayment, Property, LeaseStatus } from "@/lib/types";
import { formatPKR, formatDate } from "@/lib/formatters";

export default function WorkspaceRentalsPage() {
  const { user, isAdmin } = useAuth();
  const [leases, setLeases] = useState<Lease[]>(() => (user ? db.getLeases(user) : []));
  const [properties, setProperties] = useState<Property[]>(() => db.getProperties({ publicOnly: false }));
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  // Modals & Drawer States
  const [selectedLease, setSelectedLease] = useState<Lease | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activePaymentInstallment, setActivePaymentInstallment] = useState<RentPayment | null>(null);
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);

  // New Lease Form State
  const [formData, setFormData] = useState({
    property_id: "",
    tenant_name: "",
    tenant_phone: "+92 300 ",
    tenant_email: "",
    tenant_cnic: "",
    landlord_name: "Property Owner",
    landlord_phone: "+92 321 4455667",
    start_date: "2026-11-10",
    end_date: "2027-11-09",
    rent_amount_pkr: 250000,
    security_deposit_pkr: 500000,
    payment_frequency: "Monthly" as const,
    terms_notes: "Standard 11-month Islamabad / CDA registered lease with 10% annual escalation."
  });

  // Record Payment Form State
  const [paymentData, setPaymentData] = useState({
    amount_pkr: 0,
    paid_date: "2026-11-10",
    payment_method: "Bank Transfer (Raast / IBAN)",
    receipt_number: "",
    notes: ""
  });

  const loadData = () => {
    if (!user) return;
    const allLeases = db.getLeases(user);
    setLeases(allLeases);
    const allProps = db.getProperties();
    setProperties(allProps.filter((p) => p.purpose === "rent" || p.purpose === "lease"));

    if (selectedLease) {
      const refreshed = db.getLeaseById(selectedLease.id);
      if (refreshed) setSelectedLease(refreshed);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  // Metrics Calculations
  const activeLeases = leases.filter((l) => l.status === "Active");
  const totalRentRoll = activeLeases.reduce((acc, curr) => acc + curr.rent_amount_pkr, 0);
  const totalSecurityDeposits = activeLeases.reduce((acc, curr) => acc + curr.security_deposit_pkr, 0);

  // Overdue rent calculation across all schedules
  let overdueCount = 0;
  let overdueAmount = 0;
  leases.forEach((lease) => {
    lease.rent_schedule.forEach((pmt) => {
      if (pmt.status === "Overdue") {
        overdueCount++;
        overdueAmount += pmt.amount_pkr;
      }
    });
  });

  // Filtered Leases
  const filteredLeases = leases.filter((l) => {
    if (statusFilter !== "All" && l.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        l.tenant_name.toLowerCase().includes(q) ||
        l.property_title.toLowerCase().includes(q) ||
        l.tenant_phone.toLowerCase().includes(q) ||
        (l.tenant_cnic && l.tenant_cnic.toLowerCase().includes(q)) ||
        l.property_code.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Handle Add Lease
  const handleCreateLease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.property_id || !formData.tenant_name) return;

    // Generate 12 month schedule
    const schedule: RentPayment[] = [];
    const start = new Date(formData.start_date);
    for (let i = 0; i < 12; i++) {
      const dueDate = new Date(start);
      dueDate.setMonth(start.getMonth() + i);
      const isFirst = i === 0;
      schedule.push({
        id: `rp-${Date.now()}-${i + 1}`,
        lease_id: "",
        due_date: dueDate.toISOString().split("T")[0],
        amount_pkr: Number(formData.rent_amount_pkr),
        status: isFirst ? "Paid" : "Pending",
        paid_date: isFirst ? new Date().toISOString().split("T")[0] : undefined,
        payment_method: isFirst ? "Advance Pay Order" : undefined,
        receipt_number: isFirst ? `REC-${Date.now().toString().slice(-6)}` : undefined,
        notes: isFirst ? "Advance rent paid at agreement signing." : undefined
      });
    }

    const prop = properties.find((p) => p.id === formData.property_id);

    db.createLease(
      {
        property_id: formData.property_id,
        property_title: prop?.title || "Rental Property",
        property_code: prop?.reference_code || "PROP-RENT",
        tenant_name: formData.tenant_name,
        tenant_phone: formData.tenant_phone,
        tenant_email: formData.tenant_email,
        tenant_cnic: formData.tenant_cnic,
        landlord_name: formData.landlord_name,
        landlord_phone: formData.landlord_phone,
        start_date: formData.start_date,
        end_date: formData.end_date,
        rent_amount_pkr: Number(formData.rent_amount_pkr),
        security_deposit_pkr: Number(formData.security_deposit_pkr),
        payment_frequency: formData.payment_frequency,
        status: "Active",
        terms_notes: formData.terms_notes,
        rent_schedule: schedule
      },
      user || undefined
    );

    setIsAddModalOpen(false);
    loadData();
  };

  // Handle Open Record Payment
  const openPaymentModal = (pmt: RentPayment) => {
    setActivePaymentInstallment(pmt);
    setPaymentData({
      amount_pkr: pmt.amount_pkr,
      paid_date: new Date().toISOString().split("T")[0],
      payment_method: "Bank Transfer (Raast / IBAN)",
      receipt_number: `REC-${Date.now().toString().slice(-6)}`,
      notes: `Rent installment paid via online banking transfer.`
    });
    setIsPaymentModalOpen(true);
  };

  // Handle Submit Payment
  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLease || !activePaymentInstallment) return;

    db.recordRentPayment(
      selectedLease.id,
      activePaymentInstallment.id,
      paymentData,
      user || undefined
    );

    setIsPaymentModalOpen(false);
    setActivePaymentInstallment(null);
    loadData();
  };

  return (
    <div className="space-y-8">
      {/* Luxury Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0D121F] p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl relative overflow-hidden transition-colors">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 px-3 py-1 rounded-full">
              Rental Operations & Ledger
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Tenancy & Rent Roll Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
            Rental Leases & Tenancy Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-light">
            Maintain verified tenant agreements, automated 12-month payment schedules, security deposit escrows, and instant rent receipts across Pakistan.
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
            <span>New Lease Agreement</span>
          </button>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid (Estatelab / Estately Hybrid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Monthly Rent Roll */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all text-slate-900 dark:text-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Monthly Rent Roll
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xl sm:text-2xl font-serif font-extrabold text-emerald-700 dark:text-emerald-300">
              {formatPKR(totalRentRoll, true)}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-1">/ month</span>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Contracted recurring yield</span>
            </p>
          </div>
        </div>

        {/* Active Leases */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all text-slate-900 dark:text-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Active Leases
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-500/20">
              <KeyRound className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-950 dark:text-white">
              {activeLeases.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold ml-1">
              / {leases.length} registered
            </span>
            <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1">
              {Math.round((activeLeases.length / Math.max(leases.length, 1)) * 100)}% occupancy rate
            </p>
          </div>
        </div>

        {/* Security Deposits Held */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all text-slate-900 dark:text-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Deposits Held
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xl sm:text-2xl font-serif font-extrabold text-amber-700 dark:text-amber-300">
              {formatPKR(totalSecurityDeposits, true)}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
              Protected in agency escrow
            </p>
          </div>
        </div>

        {/* Overdue Collections */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all text-slate-900 dark:text-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Overdue Invoices
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              overdueCount > 0 ? "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
            }`}>
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-2xl sm:text-3xl font-serif font-extrabold ${overdueCount > 0 ? "text-rose-600 dark:text-rose-400" : "text-slate-950 dark:text-white"}`}>
              {overdueCount}
            </span>
            <span className="text-xs text-slate-400 font-semibold ml-1">
              ({formatPKR(overdueAmount, true)})
            </span>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              {overdueCount > 0 ? "Follow-up required" : "All collections up to date"}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0D121F] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {["All", "Active", "Pending", "Expired", "Terminated"].map((st) => (
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

        {/* Search & View Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tenant, property, CNIC, phone..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          <div className="flex items-center border border-slate-800 rounded-xl p-1 bg-slate-900 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === "cards" ? "bg-amber-500 text-slate-950 font-extrabold shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              Cards
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === "table" ? "bg-amber-500 text-slate-950 font-extrabold shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Leases Display */}
      {filteredLeases.length === 0 ? (
        <div className="bg-white dark:bg-[#0D121F] rounded-3xl border border-slate-200/90 dark:border-slate-800/80 p-12 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 mx-auto flex items-center justify-center border border-amber-200 dark:border-amber-500/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-950 dark:text-white text-base">No lease agreements found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Create a new tenant lease agreement to establish automated rent roll schedules and payment tracking.
          </p>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-slate-950 text-xs font-bold"
          >
            Add First Lease
          </button>
        </div>
      ) : viewMode === "cards" ? (
        /* Card Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeases.map((lease) => {
            const paidCount = lease.rent_schedule.filter((p) => p.status === "Paid").length;
            const hasOverdue = lease.rent_schedule.some((p) => p.status === "Overdue");

            return (
              <div
                key={lease.id}
                className="bg-white dark:bg-[#0D121F] rounded-3xl border border-slate-200/90 dark:border-slate-800/80 p-5 shadow-xs dark:shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 group text-slate-900 dark:text-white"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-amber-300">
                      {lease.property_code}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                        lease.status === "Active"
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                          : lease.status === "Pending"
                          ? "bg-amber-950/80 text-amber-300 border border-amber-500/30"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        lease.status === "Active" ? "bg-emerald-500" : "bg-amber-500"
                      }`} />
                      {lease.status}
                    </span>
                  </div>

                  {/* Property & Tenant */}
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                    {lease.property_title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-800">{lease.tenant_name}</span>
                    {lease.tenant_cnic && (
                      <span className="text-[10px] text-slate-400 font-mono">({lease.tenant_cnic})</span>
                    )}
                  </div>

                  {/* Financial Metrics */}
                  <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                        Monthly Rent
                      </span>
                      <span className="text-sm font-extrabold text-slate-900">
                        {formatPKR(lease.rent_amount_pkr)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                        Deposit Escrow
                      </span>
                      <span className="text-sm font-bold text-slate-700">
                        {formatPKR(lease.security_deposit_pkr)}
                      </span>
                    </div>
                  </div>

                  {/* Timeline & Schedule progress */}
                  <div className="mt-3.5 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{formatDate(lease.start_date)} &rarr; {formatDate(lease.end_date)}</span>
                      </span>
                      <span className="font-bold text-[11px] text-slate-700">
                        {paidCount}/{lease.rent_schedule.length} paid
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{
                          width: `${(paidCount / Math.max(lease.rent_schedule.length, 1)) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Overdue alert badge if any */}
                  {hasOverdue && (
                    <div className="mt-3 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-[11px] font-semibold flex items-center gap-1.5 border border-rose-200">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>Has overdue rent installment</span>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/${lease.tenant_phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hello ${lease.tenant_name}, this is AqarFlow property management regarding your lease at ${lease.property_title}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    title="WhatsApp Tenant"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedLease(lease)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Schedule & Ledger</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Property</th>
                <th className="py-3.5 px-4">Tenant</th>
                <th className="py-3.5 px-4">Monthly Rent</th>
                <th className="py-3.5 px-4">Deposit</th>
                <th className="py-3.5 px-4">Term</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeases.map((lease) => (
                <tr key={lease.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{lease.property_title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{lease.property_code}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{lease.tenant_name}</div>
                    <div className="text-[11px] text-slate-500">{lease.tenant_phone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {formatPKR(lease.rent_amount_pkr)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {formatPKR(lease.security_deposit_pkr)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {formatDate(lease.start_date)} &rarr; {formatDate(lease.end_date)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        lease.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {lease.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedLease(lease)}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold transition-colors"
                    >
                      Open Ledger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lease Details & Rent Schedule Drawer */}
      {selectedLease && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0D121F] w-full max-w-2xl h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300 text-slate-900 dark:text-white">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                    {selectedLease.property_code}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 px-2 py-0.5 rounded-full">
                    {selectedLease.status}
                  </span>
                </div>
                <h2 className="text-lg font-serif font-bold text-slate-950 dark:text-white mt-1">
                  {selectedLease.property_title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tenant: <strong className="text-slate-800 dark:text-slate-200">{selectedLease.tenant_name}</strong> • Phone: {selectedLease.tenant_phone}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsStatementModalOpen(true)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Generate Official Rent Statement"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLease(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Financial Particulars */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">Monthly Rent</span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                    {formatPKR(selectedLease.rent_amount_pkr)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">Security Deposit</span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                    {formatPKR(selectedLease.security_deposit_pkr)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">Payment Cycle</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedLease.payment_frequency}</span>
                </div>
              </div>

              {/* Tenant & Landlord Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    Tenant Particulars
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedLease.tenant_name}</p>
                  <p className="text-slate-500 dark:text-slate-400">{selectedLease.tenant_phone}</p>
                  <p className="text-slate-500 dark:text-slate-400">{selectedLease.tenant_email || "No email"}</p>
                  {selectedLease.tenant_cnic && (
                    <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">CNIC: {selectedLease.tenant_cnic}</p>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    Landlord / Representative
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedLease.landlord_name}</p>
                  <p className="text-slate-500 dark:text-slate-400">{selectedLease.landlord_phone}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">Escrow Account: Meezan Bank AqarFlow Escrow</p>
                </div>
              </div>

              {/* Rent Payment Schedule Ledger */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Rent Installment Schedule</span>
                  </h3>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {selectedLease.rent_schedule.filter((s) => s.status === "Paid").length} /{" "}
                    {selectedLease.rent_schedule.length} Collected
                  </span>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Due Date</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Payment Info</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedLease.rent_schedule.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors">
                          <td className="py-2.5 px-3 font-mono text-slate-400 dark:text-slate-500">{idx + 1}</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                            {formatDate(item.due_date)}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white font-mono">
                            {formatPKR(item.amount_pkr)}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                                item.status === "Paid"
                                  ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30"
                                  : item.status === "Overdue"
                                  ? "bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-500/30"
                                  : "bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                            {item.status === "Paid" ? (
                              <div>
                                <span className="font-semibold text-slate-700 dark:text-slate-300">{item.payment_method || "Paid"}</span>
                                {item.receipt_number && (
                                  <span className="block text-[10px] font-mono text-slate-400 dark:text-slate-500">
                                    {item.receipt_number}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-400 dark:text-slate-500 italic">Pending receipt</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            {item.status !== "Paid" ? (
                              <button
                                type="button"
                                onClick={() => openPaymentModal(item)}
                                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-[10px] shadow-xs transition-all"
                              >
                                Record
                              </button>
                            ) : (
                              <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-bold flex items-center justify-end gap-1">
                                <Check className="w-3 h-3" />
                                <span>Paid</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Lease Terms & Legal Clauses */}
              {selectedLease.terms_notes && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">Terms & Special Conditions</span>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{selectedLease.terms_notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {isPaymentModalOpen && activePaymentInstallment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#0D121F] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 space-y-5 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-1">
                  Escrow Collections
                </span>
                <h3 className="font-serif font-bold text-slate-950 dark:text-white text-base">Record Rent Payment</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                  Due: {formatDate(activePaymentInstallment.due_date)} • {formatPKR(activePaymentInstallment.amount_pkr)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Received Amount (PKR)</label>
                <input
                  type="number"
                  required
                  value={paymentData.amount_pkr}
                  onChange={(e) => setPaymentData({ ...paymentData, amount_pkr: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-mono font-bold text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Payment Method</label>
                <select
                  value={paymentData.payment_method}
                  onChange={(e) => setPaymentData({ ...paymentData, payment_method: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-sans transition-all"
                >
                  <option value="Bank Transfer (Raast / IBAN)">Bank Transfer (Raast / IBAN)</option>
                  <option value="Meezan Bank Direct Deposit">Meezan Bank Direct Deposit</option>
                  <option value="HBL Konnect / Online Transfer">HBL Konnect / Online Transfer</option>
                  <option value="Cash Receipt (Office Collection)">Cash Receipt (Office Collection)</option>
                  <option value="Crossed Cheque">Crossed Cheque</option>
                  <option value="Pay Order">Pay Order</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Receipt / Transaction Reference</label>
                <input
                  type="text"
                  required
                  value={paymentData.receipt_number}
                  onChange={(e) => setPaymentData({ ...paymentData, receipt_number: e.target.value })}
                  placeholder="e.g. RAAST-982143 / REC-00912"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Payment Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={paymentData.notes}
                  onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
                  placeholder="Additional audit remarks..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-sans transition-all"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all text-center"
                >
                  Confirm & Stamp Paid
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Print Statement Modal */}
      {isStatementModalOpen && selectedLease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/75 backdrop-blur-sm p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white dark:bg-[#0D121F] rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8 space-y-6 animate-in zoom-in-95 text-slate-900 dark:text-white">
            {/* Statement Header */}
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white font-serif">
                    Aqar<span className="text-amber-600 dark:text-amber-400">Flow</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">
                    Official Tenancy Ledger
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">A VIRELEO Real Estate Operations Project • vireleo.me</p>
              </div>

              <div className="text-right text-xs">
                <p className="font-bold text-slate-800 dark:text-slate-200">Statement Date: 10 Nov 2026</p>
                <p className="text-slate-400 dark:text-slate-500 font-mono text-[10px]">Doc: AF-LEADGER-{selectedLease.id}</p>
              </div>
            </div>

            {/* Particulars Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              <div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">Property Details</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{selectedLease.property_title}</p>
                <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">{selectedLease.property_code}</p>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Lease Period: {formatDate(selectedLease.start_date)} - {formatDate(selectedLease.end_date)}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">Tenant Particulars</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{selectedLease.tenant_name}</p>
                <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">CNIC: {selectedLease.tenant_cnic || "Unrecorded"}</p>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Contact: {selectedLease.tenant_phone}</p>
              </div>
            </div>

            {/* Installments Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                12-Month Installment Schedule
              </h4>
              <table className="w-full text-left border-collapse text-xs border border-slate-200 dark:border-slate-800">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                    <th className="p-2 border border-slate-200 dark:border-slate-800">#</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">Due Date</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">Amount</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">Status</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-800">Paid Date & Ref</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {selectedLease.rent_schedule.map((item, idx) => (
                    <tr key={item.id} className="border-t border-slate-200 dark:border-slate-800">
                      <td className="p-2 border border-slate-200 dark:border-slate-800 font-mono text-slate-500">{idx + 1}</td>
                      <td className="p-2 border border-slate-200 dark:border-slate-800">{formatDate(item.due_date)}</td>
                      <td className="p-2 border border-slate-200 dark:border-slate-800 font-bold font-mono">{formatPKR(item.amount_pkr)}</td>
                      <td className="p-2 border border-slate-200 dark:border-slate-800 font-semibold">{item.status}</td>
                      <td className="p-2 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[11px]">
                        {item.status === "Paid" ? `${formatDate(item.paid_date || "")} (${item.receipt_number || "Verified"})` : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Signature Rows */}
            <div className="pt-8 grid grid-cols-2 gap-12 text-xs border-t border-slate-200 dark:border-slate-800">
              <div className="border-t border-slate-300 dark:border-slate-700 pt-2 text-center text-slate-500 dark:text-slate-400">
                Authorized Signatory (AqarFlow Agency)
              </div>
              <div className="border-t border-slate-300 dark:border-slate-700 pt-2 text-center text-slate-500 dark:text-slate-400">
                Tenant Signature ({selectedLease.tenant_name})
              </div>
            </div>

            {/* Close / Print actions */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsStatementModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white dark:bg-gradient-to-r dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 dark:text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Statement</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Lease Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/75 backdrop-blur-sm p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white dark:bg-[#0D121F] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8 space-y-6 animate-in zoom-in-95 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-1">
                  Tenancy Protocol
                </span>
                <h3 className="font-serif font-bold text-slate-950 dark:text-white text-lg">Create New Tenancy Lease</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                  Registers official agreement and generates 12-month payment roll.
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

            <form onSubmit={handleCreateLease} className="space-y-4 text-xs">
              {/* Select Property */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Rental Property</label>
                <select
                  required
                  value={formData.property_id}
                  onChange={(e) => setFormData({ ...formData, property_id: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 font-semibold text-slate-800 dark:text-white font-sans transition-all"
                >
                  <option value="">Select available property...</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.reference_code} — {p.title} ({p.locality}, {p.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Tenant Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Tenant Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.tenant_name}
                    onChange={(e) => setFormData({ ...formData, tenant_name: e.target.value })}
                    placeholder="e.g. Asad Mehmood"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-sans transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Tenant CNIC (13-digit)</label>
                  <input
                    type="text"
                    required
                    value={formData.tenant_cnic}
                    onChange={(e) => setFormData({ ...formData, tenant_cnic: e.target.value })}
                    placeholder="e.g. 61101-1234567-1"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-mono transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Tenant Mobile (WhatsApp)</label>
                  <input
                    type="text"
                    required
                    value={formData.tenant_phone}
                    onChange={(e) => setFormData({ ...formData, tenant_phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-mono transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Tenant Email</label>
                  <input
                    type="email"
                    value={formData.tenant_email}
                    onChange={(e) => setFormData({ ...formData, tenant_email: e.target.value })}
                    placeholder="tenant@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-sans transition-all"
                  />
                </div>
              </div>

              {/* Financial Terms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Monthly Rent Amount (PKR)</label>
                  <input
                    type="number"
                    required
                    value={formData.rent_amount_pkr}
                    onChange={(e) => setFormData({ ...formData, rent_amount_pkr: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-mono font-bold transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Security Deposit (PKR)</label>
                  <input
                    type="number"
                    required
                    value={formData.security_deposit_pkr}
                    onChange={(e) => setFormData({ ...formData, security_deposit_pkr: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-mono font-bold transition-all"
                  />
                </div>
              </div>

              {/* Lease Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Lease Start Date</label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-sans transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Lease End Date</label>
                  <input
                    type="date"
                    required
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-sans transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Special Terms & Notes</label>
                <textarea
                  rows={2}
                  value={formData.terms_notes}
                  onChange={(e) => setFormData({ ...formData, terms_notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white font-sans transition-all"
                />
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
                  Generate Lease & Rent Roll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
