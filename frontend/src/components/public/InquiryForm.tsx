"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, MessageCircle, Phone, Mail } from "lucide-react";
import { User } from "@/lib/types";

interface InquiryFormProps {
  propertyId?: string;
  propertyTitle?: string;
  assignedAgent?: User;
}

export function InquiryForm({ propertyId, propertyTitle, assignedAgent }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    client_name: "",
    phone: "",
    email: "",
    preferred_contact_method: "WhatsApp",
    message: propertyTitle
      ? `I am interested in "${propertyTitle}". Please share more details and arrange a site visit.`
      : "I am interested in your available properties. Please contact me."
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_name || !formData.phone) {
      setError("Please provide your name and phone number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/v1/public/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: propertyId,
          ...formData
        })
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error submitting inquiry.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h4 className="text-lg font-bold text-slate-900 mb-1">Inquiry Received!</h4>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Thank you, <span className="font-semibold text-slate-800">{formData.client_name}</span>.
          Your inquiry has been directly logged into our CRM.{" "}
          {assignedAgent
            ? `Assigned agent ${assignedAgent.full_name} will contact you shortly.`
            : "Our agent will reach out to you within 30 minutes."}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              ...formData,
              client_name: "",
              phone: "",
              email: ""
            });
          }}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Inquire About This Property</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Connect directly with the verified listing agent.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
        <input
          type="text"
          required
          value={formData.client_name}
          onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
          placeholder="e.g. Asad Mehmood"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone *</label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="e.g. +92 300 1234567"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Email (Optional)</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="e.g. asad@domain.pk"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
        />
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Preferred Contact Method
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "WhatsApp", icon: MessageCircle, label: "WhatsApp" },
            { id: "Phone", icon: Phone, label: "Call" },
            { id: "Email", icon: Mail, label: "Email" }
          ].map((method) => {
            const Icon = method.icon;
            const isSelected = formData.preferred_contact_method === method.id;
            return (
              <button
                type="button"
                key={method.id}
                onClick={() => setFormData({ ...formData, preferred_contact_method: method.id })}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isSelected
                    ? "bg-blue-50 border-blue-500 text-blue-700 shadow-xs"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{method.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-sm shadow-md shadow-blue-700/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
      </button>

      <p className="text-[11px] text-center text-slate-400">
        Your information is confidential and will never be shared with third parties.
      </p>
    </form>
  );
}
