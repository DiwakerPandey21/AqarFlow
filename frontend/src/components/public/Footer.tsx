"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  MapPin,
  Lock,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";

export function PublicFooter() {
  const navLinks = [
    { name: "SOLUTIONS", href: "/properties" },
    { name: "CASES", href: "/#cases" },
    { name: "PROCESS", href: "/#process" },
    { name: "FOR INVESTORS", href: "/services" },
    { name: "ABOUT US", href: "/about" },
    { name: "FAQ", href: "/#faq" }
  ];

  return (
    <footer className="bg-[#F8F3ED] text-[#1F1E19] border-t border-[#E2DBD1] font-sans">
      {/* Top Vellaro Signature Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#E2DBD1]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="inline-block">
            <span className="font-serif italic text-3xl text-[#1F1E19]">
              AqarFlow
            </span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-sans font-semibold tracking-[0.14em] uppercase text-[#767262] hover:text-[#1F1E19] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Phone & Button */}
          <div className="flex items-center gap-5">
            <div className="flex flex-col text-right">
              <a
                href="tel:+92512899001"
                className="text-xs font-semibold text-[#1F1E19] hover:underline"
              >
                +92 (51) 289-9001
              </a>
              <span className="text-[10px] text-[#767262]">
                Based in Islamabad & Lahore
              </span>
            </div>

            <Link
              href="/login"
              className="px-5 py-2.5 rounded-sm bg-[#5D5839] hover:bg-[#4B472D] text-white text-xs font-sans font-semibold uppercase tracking-[0.12em] transition-all shadow-xs"
            >
              PORTAL LOGIN
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Col 1: Overview */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#5D5839]">
              LUXURY REAL ESTATE WITH FULL SERVICE SUPPORT
            </span>
            <p className="text-xs text-[#767262] leading-relaxed max-w-sm">
              We find and verify the property, handle title due diligence with CDA, LDA & SBCA authorities, and manage post-sale property operations and high-yield tenancy portfolios across Pakistan.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#5D5839] font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-[#5D5839]" />
              <span>100% CDA & LDA Validated Title Deeds</span>
            </div>
          </div>

          {/* Col 2: Curated Portfolio */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#1F1E19]">
              Curated Portfolio
            </h4>
            <ul className="space-y-2 text-xs text-[#767262]">
              <li>
                <Link href="/properties?purpose=sale" className="hover:text-[#1F1E19] transition-colors">
                  Private Acquisitions (For Sale)
                </Link>
              </li>
              <li>
                <Link href="/properties?purpose=rent" className="hover:text-[#1F1E19] transition-colors">
                  Diplomatic Tenancies (For Lease)
                </Link>
              </li>
              <li>
                <Link href="/properties?type=villa" className="hover:text-[#1F1E19] transition-colors">
                  Architectural Mansions & Modernist Villas
                </Link>
              </li>
              <li>
                <Link href="/properties?type=penthouse" className="hover:text-[#1F1E19] transition-colors">
                  High-Rise Penthouses & Skyline Living
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#1F1E19] transition-colors">
                  Institutional Escrow & Title Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Prime Enclaves */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#1F1E19]">
              Prime Enclaves
            </h4>
            <ul className="space-y-2 text-xs text-[#767262]">
              <li>
                <Link href="/properties?city=Islamabad" className="hover:text-[#1F1E19] transition-colors">
                  Sector F-6, F-7, E-7
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Lahore" className="hover:text-[#1F1E19] transition-colors">
                  DHA Raya Golf & Phase 6
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Karachi" className="hover:text-[#1F1E19] transition-colors">
                  Clifton Waterfront & Emaar
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Islamabad" className="hover:text-[#1F1E19] transition-colors">
                  Eighteen Luxury Enclave
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Private Offices */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#1F1E19]">
              Private Offices
            </h4>
            <div className="space-y-3 text-xs text-[#767262]">
              <div className="border-l-2 border-[#5D5839] pl-3">
                <p className="font-semibold text-[#1F1E19]">Islamabad Headquarters</p>
                <p className="text-[11px] text-[#767262]">Floor 4, Beverly Centre, Blue Area</p>
                <p className="text-[11px] text-[#5D5839] font-medium">+92 51 289 9001</p>
              </div>

              <div className="border-l-2 border-[#E2DBD1] pl-3">
                <p className="font-semibold text-[#1F1E19]">Lahore Lounge</p>
                <p className="text-[11px] text-[#767262]">Mall 1, Main Boulevard, Gulberg III</p>
                <p className="text-[11px] text-[#767262]">+92 42 3578 4401</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#E2DBD1] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#767262]">
          <p>© 2026 AqarFlow Platform. Developed under VIRELEO Project 01. All rights reserved.</p>

          <div className="flex items-center gap-6 flex-wrap">
            <Link href="/about" className="hover:text-[#1F1E19] transition-colors">
              Privacy Protocol
            </Link>
            <Link href="/about" className="hover:text-[#1F1E19] transition-colors">
              Title Escrow Terms
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white border border-[#E2DBD1] text-[#1F1E19] font-semibold text-[11px] hover:border-[#5D5839] transition-colors"
            >
              <Lock className="w-3 h-3 text-[#5D5839]" />
              <span>Agency Staff Portal Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
