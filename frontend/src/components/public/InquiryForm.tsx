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
      <div className="bg-[#FAF6F0] border border-[#E2DBD1] rounded-sm p-6 text-center">
        <div className="w-12 h-12 bg-[#5D5839]/10 text-[#5D5839] rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h4 className="text-base font-bold text-[#1F1E19] mb-1">Inquiry Received</h4>
        <p className="text-xs text-[#767262] leading-relaxed mb-4">
          Thank you, <span className="font-semibold text-[#1F1E19]">{formData.client_name}</span>.
          Your inquiry has been logged with our senior advisors.{" "}
          {assignedAgent
            ? `Assigned broker ${assignedAgent.full_name} will contact you shortly.`
            : "Our specialist will reach out within 15 minutes."}
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
          className="text-xs font-semibold text-[#5D5839] hover:underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-xs text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1">
          Your Full Name *
        </label>
        <input
          type="text"
          required
          value={formData.client_name}
          onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
          placeholder="e.g. Tariq Mehmood"
          className="w-full px-3.5 py-2.5 rounded-sm border border-[#E2DBD1] bg-[#F8F3ED] text-xs text-[#1F1E19] focus:outline-none focus:border-[#5D5839]"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1">
          WhatsApp / Phone *
        </label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="e.g. +92 300 1234567"
          className="w-full px-3.5 py-2.5 rounded-sm border border-[#E2DBD1] bg-[#F8F3ED] text-xs text-[#1F1E19] focus:outline-none focus:border-[#5D5839]"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1">
          Email (Optional)
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="e.g. name@domain.com"
          className="w-full px-3.5 py-2.5 rounded-sm border border-[#E2DBD1] bg-[#F8F3ED] text-xs text-[#1F1E19] focus:outline-none focus:border-[#5D5839]"
        />
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1.5">
          Contact Preference
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
                className={`py-2 px-2 rounded-sm border text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#5D5839] border-[#5D5839] text-white shadow-xs"
                    : "border-[#E2DBD1] bg-[#F8F3ED] text-[#767262] hover:text-[#1F1E19]"
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
        <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1">
          Requirements / Inquiries
        </label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2 rounded-sm border border-[#E2DBD1] bg-[#F8F3ED] text-xs text-[#1F1E19] focus:outline-none focus:border-[#5D5839]"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 rounded-sm bg-[#5D5839] hover:bg-[#4B472D] text-white font-sans font-semibold text-xs uppercase tracking-[0.14em] shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{loading ? "TRANSMITTING..." : "SEND REQUEST"}</span>
      </button>

      <p className="text-[10px] text-center text-[#767262]">
        Discretion assured. Strictly audited under real estate escrow protocols.
      </p>
    </form>
  );
}
