"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, X, CheckCircle2, AlertTriangle, Users } from "lucide-react";
import { Property, User } from "@/lib/types";

interface ScheduleVisitModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleVisitModal({ property, isOpen, onClose }: ScheduleVisitModalProps) {
  const [formData, setFormData] = useState({
    client_name: "",
    client_phone: "",
    date: "",
    time: "15:00",
    visitor_count: 1,
    meeting_point: `Main Entrance of ${property.locality}`,
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!formData.date) {
      setFormData((prev) => ({
        ...prev,
        date: new Date(Date.now() + 86400000).toISOString().split("T")[0]
      }));
    }
  }, [formData.date]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent, overrideConflict = false) => {
    e.preventDefault();
    if (!formData.client_name || !formData.client_phone) {
      setError("Please provide your name and phone number.");
      return;
    }

    setLoading(true);
    setError(null);
    setConflictWarning(null);

    const scheduled_at = new Date(`${formData.date}T${formData.time}:00`).toISOString();
    const agent_id = property.assigned_agent_id || "usr-agent-1";

    try {
      const url = `/api/v1/visits${overrideConflict ? "?ignore_conflict=true" : ""}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: property.id,
          agent_id,
          client_name: formData.client_name,
          client_phone: formData.client_phone,
          scheduled_at,
          duration_minutes: 45,
          visitor_count: Number(formData.visitor_count) || 1,
          meeting_point: formData.meeting_point,
          notes: formData.notes
        })
      });

      const data = await res.json();

      if (res.status === 409 && data.conflict) {
        setConflictWarning(data.message);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to schedule visit.");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error scheduling visit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Visit Scheduled!</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto mb-6">
              Your property visit appointment for{" "}
              <span className="font-semibold text-slate-800">{property.title}</span> has been
              recorded in our agency calendar for {formData.date} at {formData.time}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-md transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
            <div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200/80">
                In-Person Showing
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mt-2">
                Schedule a Private Property Visit
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                Property: {property.title} ({property.reference_code})
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                {error}
              </div>
            )}

            {conflictWarning && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-start gap-2 text-amber-800 text-xs font-semibold">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>Scheduling Overlap Detected:</span>
                </div>
                <p className="text-xs text-amber-700 leading-relaxed pl-6">
                  {conflictWarning}
                </p>
                <div className="pl-6 pt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold shadow-xs hover:bg-amber-700"
                  >
                    Confirm Anyway (Staff Override)
                  </button>
                  <button
                    type="button"
                    onClick={() => setConflictWarning(null)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-800 text-xs font-semibold"
                  >
                    Pick Different Time
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.client_phone}
                  onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Visitor Count</label>
                <select
                  value={formData.visitor_count}
                  onChange={(e) => setFormData({ ...formData, visitor_count: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value={1}>1 Person</option>
                  <option value={2}>2 People</option>
                  <option value={3}>3 People</option>
                  <option value={4}>4+ Family Members</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Meeting Point</label>
                <input
                  type="text"
                  value={formData.meeting_point}
                  onChange={(e) => setFormData({ ...formData, meeting_point: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Special Requirements / Notes</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Would like to inspect water pressure, electrical wiring, and solar panels."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{loading ? "Scheduling..." : "Confirm Visit Request"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
