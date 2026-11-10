"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Search,
  Sparkles,
  ArrowUpRight,
  PhoneCall,
  SlidersHorizontal,
  Building2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AqarFlowLogo } from "@/components/ui/AqarFlowLogo";

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();

  const navLinks = [
    { name: "Curated Portfolio", href: "/properties" },
    { name: "Prime Enclaves", href: "/#enclaves" },
    { name: "The Standard", href: "/#standard" },
    { name: "Yield Simulator", href: "/#calculator" },
    { name: "About", href: "/about" },
    { name: "Private Office", href: "/contact" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#E8E4DC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Bespoke AqarFlow Brandmark & Wordmark */}
          <AqarFlowLogo variant="default" size="md" showTagline={true} />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-medium tracking-tight transition-all duration-200 ${
                    active
                      ? "text-slate-900 bg-white font-bold shadow-2xs border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls & Workspace Action */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200/90 bg-white/70 hover:bg-white text-xs text-slate-500 font-sans transition-all shadow-2xs hover:border-slate-300"
              title="Global Command Palette (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden xl:inline">Search Portfolio</span>
              <kbd className="text-[10px] font-mono bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-600 font-bold">
                ⌘K
              </kbd>
            </button>

            {/* Currency / Market Indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-amber-500/20 bg-amber-50/50 text-[11px] font-semibold text-amber-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PKR • Pakistan</span>
            </div>

            {/* Workspace Portal CTA */}
            <Link
              href="/workspace"
              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md shadow-slate-950/20 transition-all hover:scale-[1.02] active:scale-[0.98] border border-slate-800"
            >
              <span>Agency Workspace</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/workspace"
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 text-white text-xs font-bold"
            >
              Workspace
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-white/80 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF8F5] border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200 shadow-xl">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-800 hover:bg-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search listings & commands</span>
              </span>
              <kbd className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>

            <Link
              href="/workspace"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5"
            >
              <span>Open Agency Operations Workspace</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
