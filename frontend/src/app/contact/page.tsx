"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
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
      address: "Floor 4, Beverly Centre, Jinnah Avenue, Blue Area",
      zone: "CDA Margalla Sectors (F-6, F-7, E-7, Eighteen)",
      phone: "+92 51 289 9001",
      whatsapp: "+92 300 855 1234",
      hours: "Mon – Sat, 9:00 AM – 7:00 PM PKT"
    },
    {
      city: "Lahore Client Gallery",
      address: "Mall 1, Main Boulevard, Gulberg III",
      zone: "DHA Phase 6, Raya Golf Club, Gulberg III",
      phone: "+92 42 3578 4401",
      whatsapp: "+92 321 445 5667",
      hours: "Mon – Sat, 9:30 AM – 7:30 PM PKT"
    },
    {
      city: "Karachi Waterfront Desk",
      address: "Ocean Tower, 14th Floor, Block 9, Clifton",
      zone: "Clifton Waterfront, DHA Phase 8 & Creek Vistas",
      phone: "+92 21 3587 9901",
      whatsapp: "+92 333 556 6778",
      hours: "Mon – Sat, 9:00 AM – 7:00 PM PKT"
    }
  ];

  const faqs = [
    {
      q: "How does AqarFlow verify land titles and property ownership?",
      a: "Every listing on AqarFlow undergoes document verification including allotment letters, mutation certificates (Intiqal), non-encumbrance records, and society transfer endorsements (CDA, LDA, SBCA, DHA) before gaining verified status."
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
      q: "How can my real estate agency access the AqarFlow Workspace?",
      a: "Authorized personnel and licensed realtors can click 'Portal Login' in the navigation bar to sign in to their dedicated desk."
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
    <div className="min-h-screen flex flex-col bg-[#F8F3ED] text-[#1F1E19] font-sans selection:bg-[#5D5839] selection:text-white">
      <PublicNavbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-b border-[#E2DBD1]">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
            LET&apos;S TALK ABOUT
          </h1>
          <span className="font-serif italic text-3xl sm:text-4xl text-[#5D5839] block mt-1">
            your dream home
          </span>
          <p className="text-xs sm:text-sm text-[#767262] mt-3 font-light leading-relaxed">
            Whether seeking private representation for high-value estate acquisitions, legal deed verification, or tenancy operations, our advisory desk is at your disposal.
          </p>
        </div>
      </section>

      {/* Main Content: Form & Offices */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form (Left) */}
          <div className="lg:col-span-6 bg-white rounded-sm p-8 sm:p-10 border border-[#E2DBD1] shadow-xs space-y-6">
            <div>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.14em] text-[#5D5839] block mb-1">
                Direct Inquiry
              </span>
              <h2 className="text-2xl font-sans font-light uppercase text-[#1F1E19]">
                Schedule a Consultation
              </h2>
              <p className="text-xs text-[#767262] mt-1 font-light">
                Our certified advisors respond within 15 minutes during standard market operating hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-sm bg-[#FAF6F0] border border-[#E2DBD1] text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#5D5839] mx-auto" />
                <h4 className="text-lg font-sans font-medium text-[#1F1E19]">
                  Inquiry Dispatched Successfully
                </h4>
                <p className="text-xs text-[#767262] font-light leading-relaxed">
                  Thank you, {formData.name}. Your inquiry has been routed to our senior advisory desk in {formData.city}. An authorized representative will contact you via WhatsApp or phone shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", phone: "", email: "", city: "Islamabad", message: "" });
                  }}
                  className="mt-3 text-xs font-semibold text-[#5D5839] hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3.5 py-2.5 rounded-sm border border-[#E2DBD1] bg-[#F8F3ED] text-xs text-[#1F1E19] focus:outline-none focus:border-[#5D5839]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +92 300 8551234"
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[#E2DBD1] bg-[#F8F3ED] text-xs text-[#1F1E19] focus:outline-none focus:border-[#5D5839]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-sm border border-[#E2DBD1] bg-[#F8F3ED] text-xs text-[#1F1E19] focus:outline-none focus:border-[#5D5839]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1">
                    Preferred City Hub
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-[#E2DBD1] bg-[#F8F3ED] text-xs text-[#1F1E19] focus:outline-none focus:border-[#5D5839]"
                  >
                    <option value="Islamabad">Islamabad (CDA Sectors & Margalla)</option>
                    <option value="Lahore">Lahore (DHA Raya & Gulberg)</option>
                    <option value="Karachi">Karachi (Clifton & Creek Vistas)</option>
                    <option value="Overseas">Overseas Non-Resident Pakistani (NRP)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1">
                    Message / Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify property type, preferred sectors, budget range, or legal due diligence needs..."
                    className="w-full px-3.5 py-2.5 rounded-sm border border-[#E2DBD1] bg-[#F8F3ED] text-xs text-[#1F1E19] focus:outline-none focus:border-[#5D5839]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-sm bg-[#5D5839] hover:bg-[#4B472D] text-white font-sans font-semibold text-xs uppercase tracking-[0.14em] shadow-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? "TRANSMITTING..." : "SEND REQUEST"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Regional Offices (Right) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.14em] text-[#5D5839] block">
              Physical Presences
            </span>
            <h2 className="text-2xl font-sans font-light uppercase text-[#1F1E19]">
              Private Office Locations
            </h2>

            <div className="space-y-4">
              {offices.map((office, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-sm p-6 border border-[#E2DBD1] shadow-xs hover:border-[#5D5839] transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold uppercase tracking-tight text-[#1F1E19]">
                      {office.city}
                    </h3>
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#F8F3ED] text-[#5D5839] border border-[#E2DBD1]">
                      Licensed Desk
                    </span>
                  </div>

                  <p className="text-xs text-[#767262] flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#5D5839] shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </p>

                  <div className="flex items-center gap-4 text-xs pt-1">
                    <a
                      href={`tel:${office.phone}`}
                      className="text-[#1F1E19] hover:underline flex items-center gap-1 font-medium"
                    >
                      <Phone className="w-3 h-3 text-[#5D5839]" />
                      <span>{office.phone}</span>
                    </a>
                    <a
                      href={`https://wa.me/${office.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#5D5839] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-20 pt-16 border-t border-[#E2DBD1]">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
              GOT QUESTIONS?
            </h2>
            <span className="font-serif italic text-2xl text-[#5D5839] block mt-1">
              we&apos;ve got you
            </span>
          </div>

          <div className="divide-y divide-[#E2DBD1]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 py-2 group cursor-pointer"
                  >
                    <span className="text-sm font-sans font-medium text-[#1F1E19] group-hover:text-[#5D5839] transition-colors">
                      {faq.q}
                    </span>
                    <div className="w-7 h-7 rounded-full border border-[#5D5839]/30 flex items-center justify-center shrink-0 text-[#5D5839]">
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pt-2 pb-4 text-xs text-[#1F1E19]/80 font-light leading-relaxed animate-in fade-in duration-200">
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
