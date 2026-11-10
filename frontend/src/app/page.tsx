"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Building2,
  Home,
  Building,
  LandPlot,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Users,
  Compass,
  KeyRound,
  FileCheck2,
  BadgeDollarSign,
  Calculator,
  Globe2,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Lock,
  ArrowUpRight,
  SlidersHorizontal,
  Check,
  Eye,
  Award,
  Crown
} from "lucide-react";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { PropertyCard } from "@/components/public/PropertyCard";
import { db } from "@/lib/db";
import { formatPKR, formatUSD, formatNumberFixed } from "@/lib/formatters";

const ENCLAVES = [
  {
    id: "islamabad",
    city: "Islamabad",
    title: "Islamabad Sectors F-6, F-7 & E-7",
    subtitle: "Capital Foothills & Diplomatic Quarters",
    authority: "CDA Approved",
    units: 18,
    priceRange: "PKR 14 Cr – 45 Cr",
    image: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1000&q=80",
    description: "Margalla Hills vistas, diplomatic zone residences, and custom 1 to 4 Kanal architectural villas.",
    yield: "+18.4% YoY",
    tag: "Capital Foothills"
  },
  {
    id: "lahore-dha",
    city: "Lahore",
    title: "DHA Phase 6 & Raya Golf Living, Lahore",
    subtitle: "Championship Fairways & Heritage Luxury",
    authority: "LDA Approved",
    units: 24,
    priceRange: "PKR 8 Cr – 35 Cr",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    description: "Signature golf course residences, luxury club villas, and contemporary minimalist estates.",
    yield: "+14.2% YoY",
    tag: "Heritage & Golf Living"
  },
  {
    id: "karachi-clifton",
    city: "Karachi",
    title: "Clifton & DHA Creek Vistas, Karachi",
    subtitle: "Arabian Sea Coastal Penthouses",
    authority: "CBC / KDA Approved",
    units: 16,
    priceRange: "PKR 12 Cr – 40 Cr",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    description: "Panoramic oceanfront penthouses, Emaar Crescent Bay luxury, and executive commercial towers.",
    yield: "+12.8% YoY",
    tag: "Waterfront & Marina"
  },
  {
    id: "rawalpindi-bahria",
    city: "Rawalpindi",
    title: "Bahria Safari & Golf City, Rawalpindi",
    subtitle: "Private Gated Valley Living",
    authority: "RDA Approved",
    units: 14,
    priceRange: "PKR 3.4 Cr – 18 Cr",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
    description: "Multi-tier security, championship club access, and modern designer residences.",
    yield: "+16.1% YoY",
    tag: "Gated Sanctuary"
  },
  {
    id: "lahore-gulberg",
    city: "Lahore",
    title: "Gulberg III & Main Boulevard, Lahore",
    subtitle: "Cosmopolitan High-Rise Living",
    authority: "LDA Approved",
    units: 19,
    priceRange: "PKR 4.5 Cr – 28 Cr",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
    description: "Luxury serviced apartments, corporate penthouses, and walking access to Lahore's culinary strip.",
    yield: "+15.5% YoY",
    tag: "Metropolitan Central"
  }
];

export default function HomePage() {
  const router = useRouter();
  const [purpose, setPurpose] = useState<"sale" | "rent">("sale");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResidenceCity, setSelectedResidenceCity] = useState<string>("all");

  const enclavesScrollRef = useRef<HTMLDivElement>(null);
  const residencesScrollRef = useRef<HTMLDivElement>(null);

  const scrollEnclaves = (direction: "left" | "right") => {
    if (enclavesScrollRef.current) {
      const scrollAmount = direction === "left" ? -420 : 420;
      enclavesScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollResidences = (direction: "left" | "right") => {
    if (residencesScrollRef.current) {
      const scrollAmount = direction === "left" ? -390 : 390;
      residencesScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const allPublicProperties = db.getProperties({ publicOnly: true });
  const displayedProperties =
    selectedResidenceCity === "all"
      ? allPublicProperties
      : allPublicProperties.filter((p) => p.city.toLowerCase() === selectedResidenceCity.toLowerCase());

  // Investment Simulator State
  const [calcCurrency, setCalcCurrency] = useState<"PKR" | "USD" | "AED">("PKR");
  const [calcPropertyValue, setCalcPropertyValue] = useState<number>(180000000); // 18 Crore
  const [calcMonthlyRent, setCalcMonthlyRent] = useState<number>(750000); // 7.5 Lakh / month

  // Featured Properties from database
  const featuredProperties = db.getProperties({ is_featured: true, publicOnly: true }).slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (purpose) params.set("purpose", purpose);
    if (city) params.set("city", city);
    if (propertyType) params.set("property_type", propertyType);
    if (searchQuery) params.set("search", searchQuery);
    router.push(`/properties?${params.toString()}`);
  };

  const handleQuickTag = (tagCity: string, tagType: string, tagKeyword: string) => {
    const params = new URLSearchParams();
    params.set("purpose", purpose);
    if (tagCity) params.set("city", tagCity);
    if (tagType) params.set("property_type", tagType);
    if (tagKeyword) params.set("search", tagKeyword);
    router.push(`/properties?${params.toString()}`);
  };

  // Yield calculations
  const annualRent = calcMonthlyRent * 12;
  const grossYield = ((annualRent / Math.max(calcPropertyValue, 1)) * 100).toFixed(2);
  const estimatedFiveYearGain = Math.round(calcPropertyValue * 0.72); // 72% over 5 years historical prime enclave appreciation

  // Currency conversion rates
  const PKR_TO_USD = 278;
  const PKR_TO_AED = 75.7;

  const formatCalcCurrency = (amountPkr: number) => {
    if (calcCurrency === "USD") {
      const inUsd = Math.round(amountPkr / PKR_TO_USD);
      return `$${formatNumberFixed(inUsd)}`;
    }
    if (calcCurrency === "AED") {
      const inAed = Math.round(amountPkr / PKR_TO_AED);
      return `AED ${formatNumberFixed(inAed)}`;
    }
    return formatPKR(amountPkr, true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 font-sans selection:bg-amber-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Section - Curated Architectural Presentation */}
      <section className="relative pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF8F5]">
        {/* Subtle architectural ambient lighting */}
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Editorial Narrative & Statement */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              {/* Monogram Micro Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#E8E4DC] text-slate-800 text-xs font-medium tracking-wide shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="uppercase text-[10px] tracking-[0.2em] font-bold text-slate-600">
                  Curated Pakistani Real Estate
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-amber-800 font-serif italic text-xs">Private Office & ERP</span>
              </div>

              {/* Master Headline (Playfair Display / Serif Luxury) */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-normal tracking-tight text-slate-950 leading-[1.08]">
                Homes for life.{" "}
                <span className="italic font-light text-amber-900/90 block sm:inline">
                  Investments
                </span>{" "}
                for generations.
              </h1>

              {/* Editorial Paragraph */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-light leading-relaxed">
                A strictly vetted private collection of verified architectural estates across Islamabad, Lahore, and Karachi.
                Uncompromising registry checks, clean title deeds, and connected agency CRM workflows.
              </p>

              {/* Primary Call to Action buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/properties"
                  className="px-7 py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-lg shadow-slate-950/20 hover:scale-[1.01] active:scale-[0.99] transition-all group"
                >
                  <span>Explore Curated Residences</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm tracking-wide flex items-center justify-center gap-2 border border-[#E8E4DC] shadow-xs transition-colors"
                >
                  <Compass className="w-4 h-4 text-slate-500" />
                  <span>Private Consultation</span>
                </Link>
              </div>

              {/* Micro-Metrics Bar */}
              <div className="pt-6 border-t border-[#EAE6DE] grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="block text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">
                    PKR 4.5B+
                  </span>
                  <span className="text-[11px] font-sans text-slate-500 font-medium">
                    Private Portfolio Escrowed
                  </span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-serif font-extrabold text-emerald-800">
                    100%
                  </span>
                  <span className="text-[11px] font-sans text-slate-500 font-medium">
                    CDA & LDA Verified Titles
                  </span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">
                    0%
                  </span>
                  <span className="text-[11px] font-sans text-slate-500 font-medium">
                    Ghost / Duplicate Listings
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Architectural Viewport */}
            <div className="lg:col-span-6 relative">
              {/* Architectural Frame with Soft Editorial Shadow */}
              <div className="relative mx-auto max-w-lg lg:max-w-none rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="Villa Margalla Luxury Residence in Islamabad F-7"
                  className="w-full h-[480px] sm:h-[600px] object-cover scale-[1.01] group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/20 pointer-events-none" />

                {/* Top Location Badge */}
                <div className="absolute top-5 left-5 z-10 bg-slate-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white flex items-center gap-2 shadow-lg">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-medium tracking-wide">Sector F-7 • Islamabad</span>
                </div>

                {/* Top Verification Pill */}
                <div className="absolute top-5 right-5 z-10 bg-emerald-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/30 text-emerald-300 flex items-center gap-1.5 shadow-lg text-[10px] font-mono font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CDA Title Verified</span>
                </div>

                {/* Bottom Floating Minimalist Editorial Showcase (Vero Estate Masterpiece) */}
                <Link
                  href="/properties/prop-1001-1-kanal-villa-dha-phase-6-lahore"
                  className="absolute bottom-6 right-6 left-6 sm:left-auto sm:max-w-sm z-10 bg-[#0B0F17]/85 hover:bg-[#0B0F17]/95 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-white/15 text-white shadow-2xl transition-all duration-300 hover:scale-[1.02] group/card block text-left"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[9px] uppercase tracking-[0.24em] text-amber-300 font-mono font-bold">
                      Curated Masterpiece
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      +18.4% YoY Yield
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover/card:text-amber-200 transition-colors">
                    Villa Margalla
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    1 Kanal Smart Architecture • Foothills Enclave
                  </p>

                  <div className="mt-3.5 pt-3.5 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-white font-serif font-bold text-base sm:text-lg">
                        PKR 14.5 Crore
                      </span>
                      <span className="block text-[10px] text-slate-400 font-mono">
                        ≈ $521,500 USD
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 group-hover/card:text-amber-200 transition-colors">
                      <span className="text-[11px] uppercase tracking-wider font-mono">Explore</span>
                      <div className="w-8 h-8 rounded-full bg-white/10 group-hover/card:bg-amber-500 group-hover/card:text-slate-950 text-white flex items-center justify-center transition-all border border-white/20 shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Integrated Luxury Search Capsule with Seamless Breathing Room */}
          <div className="mt-16 sm:mt-20 max-w-5xl mx-auto bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/20">
            {/* Purpose Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPurpose("sale")}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
                    purpose === "sale"
                      ? "bg-slate-950 text-amber-300 shadow-md border border-amber-500/30"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                  }`}
                >
                  Acquisition (For Sale)
                </button>
                <button
                  type="button"
                  onClick={() => setPurpose("rent")}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
                    purpose === "rent"
                      ? "bg-slate-950 text-amber-300 shadow-md border border-amber-500/30"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                  }`}
                >
                  Tenancy (For Lease)
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>CDA / LDA Validated Inventory Only</span>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* City */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  City Hub
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="">All Metros in Pakistan</option>
                  <option value="Islamabad">Islamabad Capital</option>
                  <option value="Lahore">Lahore Heritage</option>
                  <option value="Karachi">Karachi Waterfront</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Asset Classification
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="">All Asset Types</option>
                  <option value="House">Architectural Villa</option>
                  <option value="Apartment">Luxury Penthouse & Flat</option>
                  <option value="Commercial Plot">Commercial Land & Tower</option>
                  <option value="Residential Plot">Residential Plot</option>
                  <option value="Office">Corporate Headquarters</option>
                </select>
              </div>

              {/* Locality */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Enclave Locality
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. F-7, DHA Raya, Clifton"
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              {/* Search CTA */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Search className="w-4 h-4 text-slate-950" />
                  <span>Search Portfolio</span>
                </button>
              </div>
            </form>

            {/* Quick Luxury Filter Tags */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap text-[11px] text-slate-500">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                Quick Enclaves:
              </span>
              <button
                type="button"
                onClick={() => handleQuickTag("Islamabad", "House", "F-7")}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-900 transition-colors font-medium"
              >
                ✦ Sector F-7 Villas
              </button>
              <button
                type="button"
                onClick={() => handleQuickTag("Islamabad", "Apartment", "Centaurus")}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-900 transition-colors font-medium"
              >
                ✦ Centaurus Penthouses
              </button>
              <button
                type="button"
                onClick={() => handleQuickTag("Lahore", "House", "DHA")}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-900 transition-colors font-medium"
              >
                ✦ DHA Raya Golf Living
              </button>
              <button
                type="button"
                onClick={() => handleQuickTag("Karachi", "Commercial Plot", "Clifton")}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-900 transition-colors font-medium"
              >
                ✦ Clifton Waterfront Land
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Prime Pakistani Enclaves Section - Interactive Smooth Scroll Carousel */}
      <section id="enclaves" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-800 block mb-1 font-mono">
              Geographic Exclusivity
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 tracking-tight">
              Prime Metropolitan Enclaves
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl font-light">
              Carefully curated territories with maximum institutional security, strict zoning laws, and historic capital appreciation.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Scroll Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollEnclaves("left")}
                className="w-10 h-10 rounded-full border border-[#DCD6CA] bg-white hover:bg-slate-950 hover:text-white hover:border-slate-950 text-slate-700 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
                title="Previous Enclave"
                aria-label="Previous Enclave"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollEnclaves("right")}
                className="w-10 h-10 rounded-full border border-[#DCD6CA] bg-white hover:bg-slate-950 hover:text-white hover:border-slate-950 text-slate-700 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
                title="Next Enclave"
                aria-label="Next Enclave"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/properties"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-amber-800 transition-colors ml-2 group"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Smooth Horizontal Carousel Track */}
        <div
          ref={enclavesScrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {ENCLAVES.map((enclave) => (
            <Link
              key={enclave.id}
              href={`/properties?city=${enclave.city}`}
              className="group relative rounded-3xl overflow-hidden shadow-xl border border-[#E8E4DC] bg-slate-900 w-[320px] sm:w-[390px] h-[450px] shrink-0 snap-start flex flex-col justify-end p-7 transition-all duration-500 hover:shadow-2xl hover:border-amber-400/50 hover:-translate-y-1 block text-left"
            >
              <img
                src={enclave.image}
                alt={enclave.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-amber-400/20 font-mono">
                    {enclave.tag}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {enclave.authority}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                  {enclave.title}
                </h3>
                <p className="text-xs text-slate-300 font-light line-clamp-2 leading-relaxed">
                  {enclave.description}
                </p>

                <div className="pt-3 flex items-center justify-between text-xs text-amber-300/95 font-mono border-t border-white/15">
                  <div>
                    <span className="block text-white font-bold">{enclave.priceRange}</span>
                    <span className="text-[10px] text-slate-400 font-sans">{enclave.units} Active Listings</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold group-hover:translate-x-1 transition-transform">
                    Inspect &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Curated Properties - Interactive Carousel with City Filtering */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#EAE6DE]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-800 block mb-1 font-mono">
              Curated Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 tracking-tight">
              Featured Architectural Residences
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl font-light">
              Every listing is pre-screened for title cleanliness, physical structural condition, and represented by certified AqarFlow partner brokers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#F0ECE1] border border-[#E0DBD0] overflow-x-auto">
              {[
                { id: "all", label: "All Residences" },
                { id: "Islamabad", label: "Islamabad" },
                { id: "Lahore", label: "Lahore" },
                { id: "Karachi", label: "Karachi" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedResidenceCity(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedResidenceCity === tab.id
                      ? "bg-white text-slate-950 shadow-2xs font-bold"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => scrollResidences("left")}
                className="w-10 h-10 rounded-full border border-[#DCD6CA] bg-white hover:bg-slate-950 hover:text-white hover:border-slate-950 text-slate-700 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
                title="Scroll Left"
                aria-label="Previous Properties"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollResidences("right")}
                className="w-10 h-10 rounded-full border border-[#DCD6CA] bg-white hover:bg-slate-950 hover:text-white hover:border-slate-950 text-slate-700 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
                title="Scroll Right"
                aria-label="Next Properties"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Smooth Horizontal Carousel Track */}
        <div
          ref={residencesScrollRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayedProperties.map((property) => (
            <div key={property.id} className="w-[310px] sm:w-[380px] shrink-0 snap-start">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* Bottom Portfolio Link */}
        <div className="mt-4 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-[#DCD6CA] hover:border-slate-950 text-slate-800 hover:text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-2xs hover:shadow-md"
          >
            <span>View Full Portfolio ({allPublicProperties.length} Properties)</span>
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </Link>
        </div>
      </section>

      {/* The AqarFlow Standard: Contrast with Traditional Portals */}
      <section id="standard" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#EAE6DE]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block">
              The AqarFlow Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950">
              Why We Are Not a Traditional Classifieds Site
            </h2>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Pakistan&apos;s real estate market has long been plagued by fake listings, unverified broker claims, and opaque pricing.
              AqarFlow was built as an institutional private office where every property has verified legal status.
            </p>
          </div>

          {/* Comparison Matrix Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Traditional Portals */}
            <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-slate-200/90 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-bold text-slate-500 uppercase tracking-widest text-xs">
                  Conventional Pakistani Portals
                </span>
                <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Unregulated & Speculative
                </span>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold text-base leading-none">✕</span>
                  <span>Over 60% listings are expired, ghost ads, or speculative teaser prices.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold text-base leading-none">✕</span>
                  <span>Duplicate listings by 15 different unverified brokers with conflicting prices.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold text-base leading-none">✕</span>
                  <span>Your private phone number is leaked to dozens of unsolicited call agents.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold text-base leading-none">✕</span>
                  <span>No title deed checks or municipal authority regulatory zoning validation.</span>
                </li>
              </ul>
            </div>

            {/* AqarFlow Standard */}
            <div className="p-8 rounded-3xl bg-slate-950 text-white border border-amber-500/40 shadow-2xl space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-serif font-bold text-amber-300 uppercase tracking-widest text-xs">
                  The AqarFlow Standard
                </span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> Institutional Grade
                </span>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Verified Deeds:</strong> Land registry stamps validated with CDA, LDA, and SBCA before publishing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Sole Dedicated Broker:</strong> Single certified agency accountability with verified direct owner pricing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Phone Spam:</strong> Controlled WhatsApp encrypted concierge inquiry routing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Connected ERP Operations:</strong> Direct integration with tenancy ledgers, maintenance, and digital escrow.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Capital Yield & Rental Simulator */}
      <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#E8E4DC] p-8 sm:p-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block mb-1">
                    Financial Intelligence
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-slate-950">
                    Property Yield & Return Simulator
                  </h2>
                </div>

                {/* Currency Switcher */}
                <div className="flex items-center p-1 bg-white rounded-xl border border-slate-200 self-start sm:self-auto text-xs font-bold">
                  {(["PKR", "USD", "AED"] as const).map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setCalcCurrency(curr)}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        calcCurrency === curr
                          ? "bg-slate-950 text-amber-300 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 font-light">
                Estimate recurring annual rent roll and projected 5-year capital appreciation for prime Pakistani residential and commercial assets.
              </p>

              {/* Slider 1: Property Value */}
              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700 uppercase tracking-wider">Asset Acquisition Value</span>
                  <span className="font-serif font-extrabold text-base text-slate-900">
                    {formatCalcCurrency(calcPropertyValue)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000000"
                  max="500000000"
                  step="5000000"
                  value={calcPropertyValue}
                  onChange={(e) => setCalcPropertyValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>{formatCalcCurrency(20000000)}</span>
                  <span>{formatCalcCurrency(250000000)}</span>
                  <span>{formatCalcCurrency(500000000)}</span>
                </div>
              </div>

              {/* Slider 2: Monthly Rent */}
              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700 uppercase tracking-wider">Expected Monthly Rental Inflow</span>
                  <span className="font-serif font-extrabold text-base text-emerald-800">
                    {formatCalcCurrency(calcMonthlyRent)} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="3000000"
                  step="50000"
                  value={calcMonthlyRent}
                  onChange={(e) => setCalcMonthlyRent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>{formatCalcCurrency(100000)}/mo</span>
                  <span>{formatCalcCurrency(1500000)}/mo</span>
                  <span>{formatCalcCurrency(3000000)}/mo</span>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated Yield Outputs */}
            <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-8 border border-amber-500/30 shadow-2xl space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
                Projected Investment Output
              </span>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Gross Rental Yield</span>
                  <span className="text-3xl font-serif font-extrabold text-emerald-400 mt-1 block">
                    {grossYield}%
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Annual cash-on-cash</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Annual Rent Roll</span>
                  <span className="text-xl font-bold text-white mt-2 block">
                    {formatCalcCurrency(annualRent)}
                  </span>
                  <span className="text-[10px] text-slate-400">Recurring 12-mo roll</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                  Estimated 5-Year Capital Appreciation
                </span>
                <span className="text-2xl font-serif font-bold text-amber-300 mt-1 block">
                  +{formatCalcCurrency(estimatedFiveYearGain)}
                </span>
                <p className="text-[11px] text-slate-400 mt-1 font-light leading-relaxed">
                  Based on historical 72% capital expansion rates across Sector F-7, DHA Raya, and Clifton Waterfront.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/workspace/rentals"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider text-center block shadow-md transition-all"
                >
                  Manage Tenancy in Workspace &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Non-Resident Pakistani (NRP) Overseas Investor Desk */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/15">
                <Globe2 className="w-3.5 h-3.5" /> Overseas Pakistani Diaspora Desk
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
                Secure Property Acquisition for Overseas Pakistanis
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-xl">
                Whether residing in London, Manchester, Toronto, or New York, acquire verified high-yield Pakistani real estate without needing to travel.
                Full State Bank Roshan Digital Account (RDA) repatriation compliance and legal Power of Attorney guidance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-amber-400 block uppercase tracking-wider text-[10px]">
                    4K Virtual Walkthroughs
                  </span>
                  <p className="text-slate-300 font-light">
                    Every room, structure, and locality inspected via private live video stream with your assigned broker.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-amber-400 block uppercase tracking-wider text-[10px]">
                    Institutional Escrow
                  </span>
                  <p className="text-slate-300 font-light">
                    Protected funds transfer via Meezan Bank escrow until title registry deeds are legally transferred.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/15 space-y-6">
              <h3 className="font-serif font-bold text-xl text-white">
                Book a Private VIP Video Consultation
              </h3>
              <p className="text-xs text-slate-300 font-light">
                Connect with our Senior Property Director for bespoke portfolio allocation.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you. Your overseas concierge request has been received. Our senior advisor will reach out on WhatsApp within 30 minutes.");
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">WhatsApp Mobile (with Country Code)</label>
                  <input
                    type="text"
                    required
                    placeholder="+44 7911 123456 / +971 50 1234567"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Target Enclave / City</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Islamabad F-7/E-7">Islamabad Foothills (F-6, F-7, E-7)</option>
                    <option value="Lahore DHA Raya">Lahore DHA Phase 6 & Raya Golf Club</option>
                    <option value="Karachi Clifton">Karachi Clifton & Creek Vistas</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Schedule Private Showing
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
