"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ShieldCheck, ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react";
import { AqarFlowLogo } from "@/components/ui/AqarFlowLogo";

export function PublicFooter() {
  return (
    <footer className="bg-[#0B0F17] text-slate-300 border-t border-slate-800/80 relative overflow-hidden">
      {/* Subtle ambient gold & emerald glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Architectural Newsletter & Journal Band */}
      <div className="border-b border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 block mb-1">
              Private Market Intelligence
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              The AqarFlow Private Property Journal
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light leading-relaxed">
              Bi-weekly institutional analysis on Pakistani luxury land yields, CDA/LDA regulatory zoning updates, and off-market private acquisitions.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you. You have been enrolled in the AqarFlow Private Journal.");
            }}
            className="flex items-center gap-2 max-w-md w-full"
          >
            <input
              type="email"
              required
              placeholder="Enter your private email..."
              className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-slate-700/80 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 focus:bg-white/10 transition-all font-sans"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <AqarFlowLogo variant="light" size="lg" showTagline={true} />

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-light mt-3">
              Pakistan&apos;s verified real estate ERP and private acquisition portal. Curating prime architectural estates, diplomatic residences, and commercial assets across Islamabad, Lahore, and Karachi.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% CDA, LDA & SBCA Verified Title Deeds</span>
            </div>

            {/* VIRELEO Official Project Credit Card */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 max-w-sm space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  A VIRELEO PROJECT
                </span>
                <span className="text-[10px] font-mono text-slate-400">Project 01</span>
              </div>
              <p className="text-xs text-slate-300">
                Architected and engineered for VIRELEO. Real estate management & property operations platform.
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

          {/* Curated Portfolio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white mb-4">
              Curated Portfolio
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <Link href="/properties?purpose=sale" className="hover:text-amber-300 transition-colors">
                  Private Acquisitions (For Sale)
                </Link>
              </li>
              <li>
                <Link href="/properties?purpose=rent" className="hover:text-amber-300 transition-colors">
                  Diplomatic Tenancies (For Lease)
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
                <Link href="/properties?property_type=Commercial Plot" className="hover:text-amber-300 transition-colors">
                  Prime Commercial Plots & Towers
                </Link>
              </li>
              <li>
                <Link href="/workspace/rentals" className="hover:text-amber-300 transition-colors">
                  Tenancy Ledgers & Rent Roll
                </Link>
              </li>
            </ul>
          </div>

          {/* Prime Enclaves */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white mb-4">
              Prime Enclaves
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <Link href="/properties?city=Islamabad" className="hover:text-amber-300 transition-colors">
                  Islamabad (F-6, F-7, E-7, Eighteen)
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Lahore" className="hover:text-amber-300 transition-colors">
                  Lahore (DHA Phase 6/8 Raya, Gulberg)
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Karachi" className="hover:text-amber-300 transition-colors">
                  Karachi (Clifton, DHA Phase 8, Crescent Bay)
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Rawalpindi" className="hover:text-amber-300 transition-colors">
                  Rawalpindi (Bahria Town Phase 7 & 8)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Overseas Non-Resident Pakistani (NRP) Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Private Offices */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white mb-4">
              Private Offices
            </h4>
            <div className="space-y-3.5 text-xs text-slate-400 font-light">
              <div>
                <p className="font-bold text-white text-[11px] uppercase tracking-wider">
                  Islamabad Headquarters
                </p>
                <p className="mt-0.5">Floor 4, Beverly Centre, Blue Area, Islamabad</p>
                <p className="text-amber-400 font-mono text-[11px] mt-0.5">+92 51 289 9001</p>
              </div>

              <div>
                <p className="font-bold text-white text-[11px] uppercase tracking-wider">
                  Lahore Branch
                </p>
                <p className="mt-0.5">Mall 1, Main Boulevard, Gulberg III, Lahore</p>
              </div>

              <div>
                <p className="font-bold text-white text-[11px] uppercase tracking-wider">
                  Karachi Waterfront Office
                </p>
                <p className="mt-0.5">Ocean Tower, Clifton Block 9, Karachi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Regulatory Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AqarFlow Platform. Developed under VIRELEO Project 01. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Privacy Protocol
            </Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Title Escrow Terms
            </Link>
            <Link href="/workspace" className="hover:text-amber-300 font-semibold transition-colors">
              Agency Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
