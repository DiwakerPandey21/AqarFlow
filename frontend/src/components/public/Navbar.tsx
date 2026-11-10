"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Lock,
  ArrowRight
} from "lucide-react";
import { AqarFlowLogo } from "@/components/ui/AqarFlowLogo";

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Residences", href: "/properties" },
    { name: "Prime Enclaves", href: "/#enclaves" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Private Office", href: "/contact" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-xl border-b border-[#E8E4DC]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* AqarFlow Brandmark */}
          <AqarFlowLogo variant="default" size="md" showTagline={true} />

          {/* Desktop Navigation Links — Minimalist & Architectural */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-xs lg:text-[13px] tracking-tight transition-all duration-200 ${
                    active
                      ? "text-slate-950 font-bold bg-white shadow-2xs border border-slate-200/90"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/60 font-medium"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Elements */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Minimal Command Palette Trigger */}
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#E2DDD3] bg-white/80 hover:bg-white text-xs text-slate-500 font-sans transition-all shadow-2xs hover:border-slate-300"
              title="Global Search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden xl:inline text-[11px] font-medium">Search</span>
              <kbd className="text-[10px] font-mono bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-600 font-bold">
                ⌘K
              </kbd>
            </button>

            {/* Currency Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-amber-500/20 bg-amber-50/60 text-[11px] font-semibold text-amber-900">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>PKR</span>
            </div>

            {/* Dedicated Portal Login CTA — Clean, Professional, Secure */}
            <Link
              href="/login"
              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-semibold tracking-wide flex items-center gap-2 shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] border border-slate-900"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Portal Login</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-xl bg-slate-950 text-white text-xs font-semibold flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Login</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-white/80 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF8F5] border-b border-[#E8E4DC] px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200 shadow-xl">
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

          <div className="pt-3 border-t border-[#E8E4DC] flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-[#E2DDD3] text-xs font-medium text-slate-700"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search portfolio & enclaves</span>
              </span>
              <kbd className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-950 text-white text-xs font-semibold text-center flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Sign In to Agency Portal</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
