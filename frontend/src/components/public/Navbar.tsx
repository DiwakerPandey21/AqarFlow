"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  MapPin
} from "lucide-react";

interface PublicNavbarProps {
  transparentOnTop?: boolean;
}

export function PublicNavbar({ transparentOnTop = false }: PublicNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "SOLUTIONS", href: "/properties" },
    { name: "CASES", href: "/#cases" },
    { name: "PROCESS", href: "/#process" },
    { name: "FOR INVESTORS", href: "/services" },
    { name: "ABOUT US", href: "/about" },
    { name: "FAQ", href: "/#faq" }
  ];

  const isTransparent = isHome && !scrolled && transparentOnTop;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-black/25 backdrop-blur-md text-white border-b border-white/10"
          : "bg-[#F8F3ED]/95 backdrop-blur-xl text-[#1F1E19] border-b border-[#E2DBD1] shadow-xs"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo — Vellaro Italic Serif */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={`font-serif italic text-2xl sm:text-3xl tracking-tight transition-colors ${
                isTransparent ? "text-white" : "text-[#1F1E19]"
              }`}
            >
              AqarFlow
            </span>
          </Link>

          {/* Desktop Navigation — Vellaro Upper Sans */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] font-sans font-medium tracking-[0.14em] uppercase transition-colors ${
                    active
                      ? isTransparent
                        ? "text-white font-bold"
                        : "text-[#5D5839] font-bold"
                      : isTransparent
                      ? "text-white/80 hover:text-white"
                      : "text-[#767262] hover:text-[#1F1E19]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Info & Action */}
          <div className="hidden sm:flex items-center gap-6">
            {/* Phone & Location */}
            <div className="flex flex-col text-right">
              <a
                href="tel:+92512899001"
                className={`flex items-center justify-end gap-1.5 text-xs font-medium tracking-tight hover:underline ${
                  isTransparent ? "text-white" : "text-[#1F1E19]"
                }`}
              >
                <Phone className="w-3 h-3 text-[#5D5839]" />
                <span>+92 (51) 289-9001</span>
              </a>
              <span
                className={`flex items-center justify-end gap-1 text-[10px] tracking-tight ${
                  isTransparent ? "text-white/70" : "text-[#767262]"
                }`}
              >
                <MapPin className="w-2.5 h-2.5 text-[#5D5839]" />
                <span>Based in Islamabad</span>
              </span>
            </div>

            {/* Action CTA Button — Vellaro Rectangular */}
            <Link
              href="/login"
              className={`px-5 py-2.5 rounded-sm text-xs font-sans font-semibold uppercase tracking-[0.12em] transition-all hover:scale-[1.02] active:scale-[0.98] ${
                isTransparent
                  ? "bg-white text-[#1F1E19] hover:bg-white/90 shadow-md"
                  : "bg-[#5D5839] text-white hover:bg-[#4B472D] shadow-xs"
              }`}
            >
              PORTAL LOGIN
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/login"
              className={`px-3 py-1.5 rounded-sm text-[11px] font-sans font-semibold uppercase tracking-wider ${
                isTransparent
                  ? "bg-white text-[#1F1E19]"
                  : "bg-[#5D5839] text-white"
              }`}
            >
              LOGIN
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-[#1F1E19] hover:bg-black/5"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F3ED] text-[#1F1E19] border-b border-[#E2DBD1] px-6 pt-4 pb-8 space-y-4 animate-in fade-in duration-200 shadow-xl">
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-xs font-sans font-semibold tracking-[0.12em] uppercase text-[#1F1E19] hover:text-[#5D5839] border-b border-[#E2DBD1]/60"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-3 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs text-[#767262]">
              <Phone className="w-3.5 h-3.5 text-[#5D5839]" />
              <span>+92 (51) 289-9001 (Islamabad HQ)</span>
            </div>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-sm bg-[#5D5839] text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] text-center shadow-xs"
            >
              PORTAL LOGIN &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
