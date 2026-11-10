import React from "react";
import Link from "next/link";
import {
  Home,
  Building,
  KeyRound,
  FileText,
  BadgeDollarSign,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Scale,
  Compass,
  CheckCircle2
} from "lucide-react";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";

export default function ServicesPage() {
  const services = [
    {
      icon: Home,
      title: "Prime Residential Acquisitions",
      badge: "Private Clients",
      desc: "Turnkey representation for custom architectural estates, Spanish villas, and diplomatic residences in Islamabad CDA Sectors (F-6, F-7, E-7) and Lahore DHA Raya."
    },
    {
      icon: Building,
      title: "Institutional Commercial Advisory",
      badge: "High Yield",
      desc: "Main boulevard commercial plazas, corporate headquarters, and retail anchor spaces in Clifton Karachi, Gulberg III Lahore, and Blue Area Islamabad with clear zoning approval."
    },
    {
      icon: KeyRound,
      title: "Corporate & Diplomatic Tenancy",
      badge: "Lease Management",
      desc: "Bespoke leasing contracts for embassies, multinational corporations, and high-net-worth tenants with standardized lease agreements, inventory audits, and security deposit escrow."
    },
    {
      icon: Scale,
      title: "Deed Scrutiny & Title Verification",
      badge: "100% Legal Clearance",
      desc: "Comprehensive vetting of mutation deeds (Intiqal), fard documents, society transfer letters, non-encumbrance certificates, and civic zoning clearances (CDA, LDA, SBCA)."
    },
    {
      icon: BadgeDollarSign,
      title: "Capital Valuation & Yield Feasibility",
      badge: "Market Analytics",
      desc: "Ground-truth real estate valuations and net rental yield simulations derived from authentic historical transaction registries rather than speculative asking prices."
    },
    {
      icon: TrendingUp,
      title: "Agency ERP & Operations Platform",
      badge: "SaaS Command",
      desc: "For premier brokerages, builders, and asset managers: end-to-end digital command covering property inventory, client CRM pipelines, showing schedules, and commission splits."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 font-sans selection:bg-amber-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="bg-[#0B0F17] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Institutional Rigor • Verified Assurance
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Comprehensive Real Estate & Asset Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Delivering statutory compliance, uncompromising title authentication, and transparent deal execution to homeowners, private family offices, and enterprise brokerages.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-[#E8E4DC] hover:border-amber-500/40 shadow-2xs hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-500/20 group-hover:bg-slate-950 group-hover:text-amber-300 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-slate-950 text-xl group-hover:text-amber-900 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-light">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 group-hover:translate-x-1 transition-all"
                  >
                    <span>Engage Advisory Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Due Diligence Guarantee */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-[#E8E4DC]">
        <div className="max-w-5xl mx-auto rounded-3xl p-8 sm:p-10 bg-[#FAF8F5] border border-[#E8E4DC] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block">
              The AqarFlow Protocol
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
              Need Deed Clearance on a Specific Parcel?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light max-w-xl leading-relaxed">
              Our legal verification desk provides an independent 72-hour audit of land records, registry mutations, and municipal approvals before you commit token money.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shrink-0 shadow-md transition-all"
          >
            Request Title Audit &rarr;
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
