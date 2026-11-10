"use client";

import React, { useState, useEffect, Suspense } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Users,
  Building2,
  X,
  Phone
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/db";
import { Visit, VisitStatus, Property, User } from "@/lib/types";
import { formatDate, formatDateTime } from "@/lib/formatters";

function WorkspaceVisitsContent() {
  const { user, isAdmin } = useAuth();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<User[]>([]);
  const [statusFilter, setStatusFilter] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);
  const [selectedVisitForOutcome, setSelectedVisitForOutcome] = useState<Visit | null>(null);
  const [outcomeText, setOutcomeText] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    property_id: "",
    agent_id: "usr-agent-1",
    client_name: "",
    client_phone: "",
    date: "",
    time: "16:00",
    duration_minutes: 45,
    meeting_point: "Society Main Commercial Gate",
    visitor_count: 2,
    notes: ""
  });

  useEffect(() => {
    if (!formData.date) {
      setFormData((prev) => ({
        ...prev,
        date: new Date(Date.now() + 86400000).toISOString().split("T")[0]
      }));
    }
  }, [formData.date]);

  const loadVisits = () => {
    if (!user) return;
    const list = db.getVisits(user, { status: statusFilter || undefined });
    setVisits(list);
    const props = db.getProperties({ publicOnly: false });
    setProperties(props);
    if (props.length > 0 && !formData.property_id) {
      setFormData((prev) => ({ ...prev, property_id: props[0].id }));
    }
    setAgents(db.getUsers().filter((u) => u.status === "active"));
  };

  useEffect(() => {
    loadVisits();
  }, [user, statusFilter]);

  const handleCreateVisit = (e: React.FormEvent, overrideConflict = false) => {
    e.preventDefault();
    if (!user) return;
    setConflictWarning(null);

    const scheduled_at = new Date(`${formData.date}T${formData.time}:00`).toISOString();

    const result = db.createVisit(
      {
        property_id: formData.property_id,
        agent_id: formData.agent_id,
        client_name: formData.client_name,
        client_phone: formData.client_phone,
        scheduled_at,
        duration_minutes: Number(formData.duration_minutes),
        meeting_point: formData.meeting_point,
        visitor_count: Number(formData.visitor_count),
        status: isAdmin ? "Confirmed" : "Requested",
        notes: formData.notes
      },
      user,
      overrideConflict
    );

    if (result.conflict && !overrideConflict) {
      setConflictWarning(result.conflict.message);
      return;
    }

    setIsModalOpen(false);
    loadVisits();
  };

  const handleUpdateStatus = (visitId: string, status: VisitStatus) => {
    if (!user) return;
    db.updateVisit(visitId, { status }, user);
    loadVisits();
  };

  const handleSaveOutcome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedVisitForOutcome) return;
    db.updateVisit(
      selectedVisitForOutcome.id,
      { status: "Completed", outcome: outcomeText },
      user
    );
    setSelectedVisitForOutcome(null);
    setOutcomeText("");
    loadVisits();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0D121F] p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full">
              Showing Calendar
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <span className="text-xs font-mono text-slate-400">Conflict-Free Coordination</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Visits & Showings Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-light">
            Coordinate verified client walkthroughs with automated conflict detection and WhatsApp reminders.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setConflictWarning(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Schedule Property Showing</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0D121F] p-4 rounded-2xl border border-slate-800/80 shadow-xl flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Filter by Status:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {["", "Requested", "Confirmed", "Completed", "Cancelled", "No-show"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? "bg-amber-500 text-slate-950 font-extrabold shadow-xs"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {st || "All Visits"}
            </button>
          ))}
        </div>
      </div>

      {/* Visits List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visits.length === 0 ? (
          <div className="col-span-2 bg-[#0D121F] rounded-3xl p-12 text-center border border-slate-800/80 shadow-xl">
            <Calendar className="w-10 h-10 text-amber-400/60 mx-auto mb-2" />
            <p className="text-sm font-serif font-bold text-white">No scheduled visits found.</p>
            <p className="text-xs text-slate-400 mt-1">
              Click &quot;Schedule Property Showing&quot; to coordinate an appointment.
            </p>
          </div>
        ) : (
          visits.map((visit) => {
            const isConfirmed = visit.status === "Confirmed";
            const isCompleted = visit.status === "Completed";
            return (
              <div
                key={visit.id}
                className="bg-[#0D121F] rounded-2xl p-5 border border-slate-800/80 shadow-xl space-y-3.5 hover:border-amber-500/30 transition-all text-white"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-serif font-extrabold text-white text-base block">
                      {visit.client_name}
                    </span>
                    <a
                      href={`tel:${visit.client_phone}`}
                      className="text-xs text-amber-300 font-mono flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{visit.client_phone}</span>
                    </a>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                      isConfirmed
                        ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/30"
                        : isCompleted
                        ? "bg-slate-800 text-slate-300 border-slate-700"
                        : visit.status === "Requested"
                        ? "bg-amber-950/80 text-amber-300 border-amber-500/30"
                        : "bg-rose-950/80 text-rose-300 border-rose-500/30"
                    }`}
                  >
                    {visit.status}
                  </span>
                </div>

                {/* Property & Time Specs */}
                <div className="p-3 bg-slate-900 rounded-xl space-y-1.5 text-xs text-slate-300 border border-slate-800">
                  <div className="font-bold text-white line-clamp-1">
                    {visit.property?.title}
                  </div>
                  <div className="flex items-center gap-2 text-amber-300/90 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      {formatDateTime(visit.scheduled_at)} ({visit.duration_minutes} min showing)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Meeting: {visit.meeting_point || "On-site"}</span>
                  </div>
                </div>

                {/* Broker Info */}
                <div className="flex items-center justify-between text-xs pt-1 text-slate-500">
                  <span>Assigned: <strong className="text-slate-800">{visit.agent?.full_name}</strong></span>
                  <span>{visit.visitor_count} visitor(s)</span>
                </div>

                {visit.outcome && (
                  <div className="p-2.5 bg-emerald-50 rounded-lg text-xs text-emerald-800 border border-emerald-200">
                    <strong>Visit Outcome:</strong> {visit.outcome}
                  </div>
                )}

                {/* Status Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  {visit.status === "Requested" && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(visit.id, "Confirmed")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                    >
                      Confirm Showing
                    </button>
                  )}

                  {visit.status !== "Completed" && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedVisitForOutcome(visit);
                        setOutcomeText(visit.outcome || "");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100"
                    >
                      Log Outcome / Complete
                    </button>
                  )}

                  {visit.status !== "Cancelled" && visit.status !== "Completed" && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(visit.id, "Cancelled")}
                      className="px-2.5 py-1.5 rounded-lg text-red-600 text-xs font-semibold hover:bg-red-50 ml-auto"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Schedule Visit Modal with Double-Booking Conflict Warning */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Schedule Property Showing</h3>
            <p className="text-xs text-slate-500 mb-5">
              Select property, assigned broker, and time slot.
            </p>

            {conflictWarning && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-800 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Agent Double-Booking Warning:</span>
                </div>
                <p className="text-amber-700 pl-6 leading-relaxed">{conflictWarning}</p>
                <div className="pl-6 pt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleCreateVisit(e, true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700"
                  >
                    Override Conflict & Schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => setConflictWarning(null)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-800 font-semibold"
                  >
                    Adjust Time
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={(e) => handleCreateVisit(e, false)} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Property *</label>
                <select
                  required
                  value={formData.property_id}
                  onChange={(e) => setFormData({ ...formData, property_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.reference_code} - {p.title} ({p.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Agent *</label>
                <select
                  required
                  value={formData.agent_id}
                  onChange={(e) => setFormData({ ...formData, agent_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                >
                  {agents.map((ag) => (
                    <option key={ag.id} value={ag.id}>
                      {ag.full_name} ({ag.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="e.g. Farhan Malik"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client Mobile *</label>
                  <input
                    type="tel"
                    required
                    value={formData.client_phone}
                    onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <select
                    value={formData.duration_minutes}
                    onChange={(e) =>
                      setFormData({ ...formData, duration_minutes: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60 Minutes</option>
                    <option value={90}>90 Minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Meeting Point</label>
                  <input
                    type="text"
                    value={formData.meeting_point}
                    onChange={(e) => setFormData({ ...formData, meeting_point: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md"
              >
                Schedule Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Outcome Modal */}
      {selectedVisitForOutcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedVisitForOutcome(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">Log Showing Outcome</h3>
            <p className="text-xs text-slate-500 mb-4">
              Visit with {selectedVisitForOutcome.client_name} ({selectedVisitForOutcome.property?.title})
            </p>

            <form onSubmit={handleSaveOutcome} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Client Feedback & Next Action *
                </label>
                <textarea
                  rows={4}
                  required
                  value={outcomeText}
                  onChange={(e) => setOutcomeText(e.target.value)}
                  placeholder="e.g. Client liked master bedroom and kitchen. Made verbal offer of 9.2 Crore. Follow up on Tuesday."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
              >
                Complete Showing & Save Notes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WorkspaceVisitsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500 font-medium">
          Loading visit schedules...
        </div>
      }
    >
      <WorkspaceVisitsContent />
    </Suspense>
  );
}
