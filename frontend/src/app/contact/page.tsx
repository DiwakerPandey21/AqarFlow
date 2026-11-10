"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Building2,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  MessageCircle
} from "lucide-react";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Islamabad",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const offices = [
    {
      city: "Islamabad Private Office",
      address: "Executive Floor, ISE Towers, Jinnah Avenue, Blue Area",
      zone: "CDA Margalla Sectors (F-6, F-7, E-7, DHA Phase 2)",
      phone: "+92 51 289 4400",
      whatsapp: "+92 300 855 1234",
      hours: "Mon – Sat, 9:00 AM – 7:00 PM PKT"
    },
    {
      city: "Lahore Client Gallery",
      address: "Signature Commercial Complex, DHA Phase 6 Main Boulevard",
      zone: "DHA Phases 1-9, Raya Golf Club, Gulberg III",
      phone: "+92 42 357 8890",
      whatsapp: "+92 321 445 5667",
      hours: "Mon – Sat, 9:30 AM – 7:30 PM PKT"
    },
    {
      city: "Karachi Waterfront Desk",
      address: "Ocean Tower, 14th Floor, Block 9, Clifton",
      zone: "Clifton Waterfront, DHA Phase 8 & Creek Vistas",
      phone: "+92 21 353 7720",
      whatsapp: "+92 333 556 6778",
      hours: "Mon – Sat, 9:00 AM – 7:00 PM PKT"
    }
  ];

  const faqs = [
    {
      q: "How does AqarFlow verify land titles and property ownership?",
      a: "Every listing on AqarFlow undergoes document verification including allotment letters, mutation certificates (Intiqal), non-encumbrance records, and society transfer endorsements (CDA, LDA, SBCA, DHA) before gaining 'Title Verified' status."
    },
    {
      q: "Can I inspect properties in person or request 4K live video showings?",
      a: "Yes. Simply click 'Schedule a Visit' on any property page. Our automated scheduling calendar coordinates directly with the assigned certified agent to ensure conflict-free private showings or live 4K video walkthroughs for overseas buyers."
    },
    {
      q: "How do overseas Pakistanis safely remit funds and complete acquisitions?",
      a: "We facilitate State Bank of Pakistan Roshan Digital Account (RDA) repatriation protocols, bank-to-bank escrow deposits, and legally validated Special Power of Attorney (PoA) attested by Pakistani embassies or high commissions."
    },
    {
      q: "How can my real estate agency or brokerage use the AqarFlow Workspace?",
      a: "Agency admins can access inventory control, lead assignment, visit tracking, lease agreements, and sales pipeline management. Click 'Agency Workspace' in the top navigation to test the live demo in both Light Mode (default) and Dark Mode."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/v1/public/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          preferred_contact_method: "Phone",
          message: `[Contact Inquiry - City: ${formData.city}] ${formData.message}`
        })
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 font-sans selection:bg-amber-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="bg-[#0B0F17] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Private Office & Client Advisory
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Connect With Our Real Estate Advisors
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Whether seeking private representation for high-value estate acquisitions, legal deed verification, or enterprise brokerage solutions, our advisory desk is at your disposal.
          </p>
        </div>
      </section>

      {/* Main Content: Form & Offices */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form (Left) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E4DC] shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block mb-1">
                Direct Inquiry
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                Schedule a Consultation
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-light">
                Our certified asset managers respond within 30 minutes during standard market operating hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-500/20 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-serif font-bold text-emerald-950">
                  Inquiry Dispatched Successfully
                </h4>
                <p className="text-xs text-emerald-800 font-light leading-relaxed">
                  Thank you, {formData.name}. Your inquiry has been routed to our senior advisory desk in {formData.city}. An authorized representative will contact you via WhatsApp or phone shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", phone: "", email: "", city: "Islamabad", message: "" });
                  }}
                  className="mt-3 text-xs font-bold text-emerald-900 underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-[#FAF8F5] text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:bg-white transition-all font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +92 300 8551234"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-[#FAF8F5] text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:bg-white transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@domain.com"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-[#FAF8F5] text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:bg-white transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Target Metropolitan Enclave *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-[#FAF8F5] text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:bg-white font-sans"
                  >
                    <option value="Islamabad">Islamabad (Sectors F-6, F-7, E-7, DHA)</option>
                    <option value="Lahore">Lahore (DHA Phase 6, Raya Golf, Gulberg)</option>
                    <option value="Karachi">Karachi (Clifton, DHA Phase 8, Creek)</option>
                    <option value="Rawalpindi">Rawalpindi (Bahria Town, DHA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Acquisition Requirements / Inquiries *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify property preferences, budget range (e.g. PKR 3 to 10 Crore), or specific reference codes (e.g. AQ-1001)..."
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-[#FAF8F5] text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:bg-white transition-all font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>{loading ? "Transmitting Inquiry..." : "Submit Consultation Request"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Regional Offices (Right) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block mb-1">
                Geographic Presence
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                Metropolitan Private Offices
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-light">
                Strategically located across Pakistan&apos;s prime investment hubs to conduct deed inspections and private contract signings.
              </p>
            </div>

            <div className="space-y-4">
              {offices.map((office, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-[#E8E4DC] hover:border-amber-500/40 shadow-2xs transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-slate-950 text-lg">
                      {office.city}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Active
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-light flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </p>

                  <p className="text-[11px] text-slate-500 pl-6">
                    Coverage: <strong className="text-slate-700">{office.zone}</strong>
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {office.hours}
                    </span>
                    <a
                      href={`https://wa.me/${office.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{office.whatsapp}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 pt-16 border-t border-[#E8E4DC]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block mb-1">
              Assurance & Protocols
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-950">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-700 shrink-0 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 font-light leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
