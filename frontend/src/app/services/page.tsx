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
  Scale
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
      title: "NRP Diaspora Investment Gateway",
      badge: "Overseas Desk",
      desc: "Complete remote concierge for expatriate Pakistanis: Roshan Digital Account (RDA) transaction routing, attested Power of Attorney representation, and video inspections."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F3ED] text-[#1F1E19] font-sans selection:bg-[#5D5839] selection:text-white">
      <PublicNavbar />

      {/* Header Banner */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-b border-[#E2DBD1]">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
            FULL SERVICE
          </h1>
          <span className="font-serif italic text-3xl sm:text-4xl text-[#5D5839] block mt-1">
            support & advisory
          </span>
          <p className="text-xs sm:text-sm text-[#767262] mt-3 font-light leading-relaxed">
            Institutional property management, conveyance diligence, and investment advisory tailored for private clients, corporate entities, and overseas investors.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-sm p-8 border border-[#E2DBD1] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#F8F3ED] border border-[#E2DBD1] flex items-center justify-center text-[#5D5839]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-sm text-[10px] font-sans font-semibold uppercase tracking-wider bg-[#F8F3ED] text-[#5D5839] border border-[#E2DBD1]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold uppercase tracking-tight text-[#1F1E19] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#767262] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E2DBD1]">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#5D5839] hover:underline"
                  >
                    <span>Request Service Briefing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
