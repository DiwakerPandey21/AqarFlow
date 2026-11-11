"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Lock,
  Building2,
  Sparkles,
  Globe2,
  MessageCircle,
  FileCheck2
} from "lucide-react";
import { AqarFlowLogo } from "@/components/ui/AqarFlowLogo";

export function PublicFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#070A12] text-slate-300 border-t border-slate-800/80 relative overflow-hidden font-sans">
      {/* Subtle ambient lighting for luxury architectural depth */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[300px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* TOP BAND: Private Client Advisory & Acquisition Desk */}
      <div className="border-b border-white/10 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono tracking-widest uppercase mb-3">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Private Client Advisory • Acquisition & Tenancy Desk</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-tight leading-snug">
              Direct Access to Pakistan&apos;s Foremost <br className="hidden sm:inline" />
              <span className="text-amber-200 italic font-light">Architectural & Diplomatic Portfolio</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-light leading-relaxed max-w-xl">
              Providing institutional escrow, CDA/LDA title deed due diligence, and discreet acquisition representation for private family offices, institutional funds, and overseas Non-Resident Pakistanis.
            </p>
          </div>

          {/* Quick Consultation Form & Concierge Contact */}
          <div className="w-full lg:max-w-md space-y-3">
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter private email for portfolio briefing..."
                className="flex-1 px-4 py-3.5 rounded-2xl bg-white/[0.06] border border-white/15 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/70 focus:bg-white/[0.1] transition-all font-sans"
              />
              <button
                type="submit"
                className="px-5 py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{subscribed ? "Enrolled ✓" : "Briefing"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 px-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VIP Concierge Active
              </span>
              <a
                href="https://wa.me/923008551234?text=Hello%20AqarFlow%2C%20I%20am%20requesting%20a%20private%20portfolio%20briefing."
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3 text-emerald-400" />
                <span>WhatsApp: +92 300 8551234</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER DIRECTORY: 5 Prestigious Architectural Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Regulatory Column (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <AqarFlowLogo variant="light" size="lg" showTagline={true} href="/" />

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mt-3 max-w-sm">
              Pakistan&apos;s verified real estate ERP and private acquisition portal. Curating prime architectural estates, diplomatic residences, and commercial assets across Islamabad, Lahore, and Karachi.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>100% CDA, LDA & SBCA Verified Title Deeds</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-400" />
                <span>SBP Overseas Foreign Remittance Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-slate-400" />
                <span>Institutional Audit Trail • Zero Ghost Listings</span>
              </div>
            </div>

            {/* Official VIRELEO Project Plaque */}
            <div className="p-4 bg-white/[0.04] rounded-2xl border border-white/10 max-w-sm space-y-2 mt-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
                  A VIRELEO PROJECT
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                  Project 01
                </span>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Architected and engineered for VIRELEO. Enterprise property operations, verified registry clearance & agency ERP management.
              </p>
              <a
                href="https://www.vireleo.me/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-amber-300 hover:text-amber-200 font-bold inline-flex items-center gap-1.5 transition-colors pt-1"
              >
                <span>Visit VIRELEO Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Curated Portfolio (Span 2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white font-mono">
              Curated Portfolio
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <Link href="/properties?purpose=sale" className="hover:text-amber-300 transition-colors">
                  Private Acquisitions (Sale)
                </Link>
              </li>
              <li>
                <Link href="/properties?purpose=rent" className="hover:text-amber-300 transition-colors">
                  Diplomatic Tenancies (Lease)
                </Link>
              </li>
              <li>
                <Link href="/properties?property_type=House" className="hover:text-amber-300 transition-colors">
                  Architectural Mansions & Villas
                </Link>
              </li>
              <li>
                <Link href="/properties?property_type=Apartment" className="hover:text-amber-300 transition-colors">
                  Luxury High-Rise Penthouses
                </Link>
              </li>
              <li>
                <Link href="/properties?property_type=Commercial+Plot" className="hover:text-amber-300 transition-colors">
                  Prime Commercial Plots & Towers
                </Link>
              </li>
              <li>
                <Link href="/properties?property_type=Office" className="hover:text-amber-300 transition-colors">
                  Corporate Headquarters Floors
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-300 transition-colors">
                  Tenancy & Corporate Leasing
                </Link>
              </li>
            </ul>
          </div>

          {/* Prime Enclaves (Span 3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white font-mono">
              Prime Enclaves
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <Link href="/properties?city=Islamabad" className="hover:text-amber-300 transition-colors">
                  Islamabad (Sectors F-6, F-7, E-7, Eighteen)
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Lahore" className="hover:text-amber-300 transition-colors">
                  Lahore (DHA Phase 6, Raya Golf, Gulberg III)
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Karachi" className="hover:text-amber-300 transition-colors">
                  Karachi (Clifton, DHA Creek Vistas, Emaar)
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Rawalpindi" className="hover:text-amber-300 transition-colors">
                  Rawalpindi (Bahria Town Phase 7 & 8)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-300/90 font-medium">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Overseas Pakistani (NRP) Wealth Desk</span>
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/about" className="hover:text-amber-300 transition-colors text-slate-400">
                  Institutional Escrow & Title Due Diligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Private Offices (Span 3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white font-mono">
              Private Offices
            </h4>
            <div className="space-y-4 text-xs text-slate-400 font-light">
              <div className="border-l-2 border-amber-500/40 pl-3">
                <p className="font-bold text-white text-[11px] uppercase tracking-wider font-mono">
                  Islamabad Headquarters
                </p>
                <p className="mt-0.5 text-slate-400">Floor 4, Beverly Centre, Jinnah Avenue, Blue Area</p>
                <p className="text-amber-400 font-mono text-[11px] mt-0.5">+92 51 289 9001</p>
              </div>

              <div className="border-l-2 border-white/20 pl-3">
                <p className="font-bold text-white text-[11px] uppercase tracking-wider font-mono">
                  Lahore Private Lounge
                </p>
                <p className="mt-0.5 text-slate-400">Mall 1, Main Boulevard, Gulberg III, Lahore</p>
                <p className="text-slate-300 font-mono text-[11px] mt-0.5">+92 42 3578 4401</p>
              </div>

              <div className="border-l-2 border-white/20 pl-3">
                <p className="font-bold text-white text-[11px] uppercase tracking-wider font-mono">
                  Karachi Waterfront Desk
                </p>
                <p className="mt-0.5 text-slate-400">Ocean Tower, Clifton Block 9, Karachi</p>
                <p className="text-slate-300 font-mono text-[11px] mt-0.5">+92 21 3587 9901</p>
              </div>

              <p className="text-[10px] text-slate-400 font-mono pt-1">
                Hours: Mon – Sat • 09:00 – 19:00 PKT
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM REGULATORY & SECURITY BAR */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 AqarFlow Platform. Developed under VIRELEO Project 01. All rights reserved.</p>

          <div className="flex items-center gap-6 flex-wrap">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Privacy Protocol
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Title Escrow Terms
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Regulatory Compliance
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-white/10 font-semibold text-[11px] transition-all"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Agency Staff Portal Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
