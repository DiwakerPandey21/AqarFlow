"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Play,
  Check,
  Building2,
  Lock
} from "lucide-react";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";

export default function HomePage() {
  // Goal filter for Curated Residences
  const [activeGoal, setActiveGoal] = useState<"LIVE" | "INVEST" | "RENT">("LIVE");

  // Process Step Slider
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Lead Form State
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    goal: "Live / Buy Luxury Residence",
    notes: ""
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    setFormSubmitting(true);

    try {
      await fetch("/api/v1/public/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: leadForm.name,
          client_phone: leadForm.phone,
          client_email: `${leadForm.name.toLowerCase().replace(/\s+/g, ".")}@client.com`,
          inquiry_type: leadForm.goal,
          message: `Inquiry submitted via Vellaro consultation desk for ${leadForm.goal}.`
        })
      });
      setFormSuccess(true);
      setLeadForm({ name: "", phone: "", goal: "Live / Buy Luxury Residence", notes: "" });
      setTimeout(() => setFormSuccess(false), 5000);
    } catch {
      setFormSuccess(true);
    } finally {
      setFormSubmitting(false);
    }
  };

  const processSteps = [
    {
      number: "01",
      title: "Property selection",
      description:
        "We select properties based on your budget, goals, and lifestyle — only those that truly fit.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    },
    {
      number: "02",
      title: "Legal & Title Audit",
      description:
        "100% CDA, LDA, and Revenue record scrutiny. We verify deed ownership, tax clearances, and encumbrance certificates.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
    },
    {
      number: "03",
      title: "Private Viewings & Escrow",
      description:
        "Discreet on-site guided showings and transparent token deposit escrow protection through institutional banking.",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80"
    },
    {
      number: "04",
      title: "Handover & Facility Operations",
      description:
        "From key handover to post-sale facility management, maintenance triage, and ongoing tenancy lease management.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const faqs = [
    {
      q: "How can I be sure the property is legally verified?",
      a: "We only work with properties that have passed a full legal check: we verify ownership rights with CDA, LDA, or SBCA, clear tax status, encumbrance certificates, developer reputation, and clean transaction history. Each deal is supervised by an in-house conveyancing lawyer."
    },
    {
      q: "Can I buy property if I'm not from this country (Overseas Pakistani / NRP)?",
      a: "Yes. We specialize in Overseas Pakistani acquisitions via State Bank of Pakistan Roshan Digital Accounts (RDA) and verified Power of Attorney procedures with zero travel required."
    },
    {
      q: "Do I need to be present in person for the paperwork?",
      a: "No. All biometric verifications, title deed registrations, and conveyancing can be executed through embassy-attested powers of attorney or our licensed escrow desk."
    },
    {
      q: "How long does the whole process take?",
      a: "Typically 7 to 14 business days from verified token deposit to title deed execution, with complete stage-by-stage milestone tracking."
    },
    {
      q: "I'm afraid of losing my money — how is this protected?",
      a: "Your funds are placed into an institutional escrow holding account and are only disbursed upon verification of clear title and registered transfer deeds."
    },
    {
      q: "Can I rent out the property after I buy it?",
      a: "Yes. Our Property Operations Desk provides full-service corporate tenant vetting, monthly rent roll collection, and facility maintenance triage."
    },
    {
      q: "I don't understand legal details — who will explain everything?",
      a: "Our dedicated senior legal counsel explains every clause in plain language and issues a certified Title Audit Report before any contract is signed."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F3ED] text-[#1F1E19] font-sans selection:bg-[#5D5839] selection:text-white">
      {/* 1. HERO SECTION — Full Bleed Cinematic Photography */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85')`
          }}
        >
          {/* Subtle warm dusk vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/65" />
        </div>

        {/* Floating Navbar */}
        <PublicNavbar transparentOnTop={true} />

        {/* Hero Headline Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-40 sm:pt-48 pb-16 flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-light tracking-tight text-white leading-none">
              <span className="block font-medium tracking-tight">LUXURY</span>
              <span className="block font-medium tracking-tight mt-1">REAL ESTATE</span>
              <span className="block mt-3">
                <span className="text-xs sm:text-sm font-sans tracking-[0.2em] font-normal uppercase mr-3 align-middle text-white/90">
                  WITH
                </span>
                <span className="font-serif italic font-normal tracking-normal text-3xl sm:text-5xl lg:text-6xl text-white">
                  full service support
                </span>
              </span>
            </h1>
          </div>

          {/* Right Side Teaser */}
          <div className="max-w-xs text-left md:text-right pt-2">
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
              We&apos;ll find and verify the property, handle the deal and post-sale service
            </p>
          </div>
        </div>

        {/* Bottom Metrics Bar & Consultation CTA */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/20">
            {/* Metric Counters */}
            <div className="flex items-center gap-6 sm:gap-10">
              <div className="flex items-baseline gap-2">
                <span className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                  100+
                </span>
                <span className="text-[11px] font-sans font-light uppercase tracking-wider text-white/80">
                  successful deals
                </span>
              </div>

              <div className="w-px h-7 bg-white/30 hidden sm:block" />

              <div className="flex items-baseline gap-2">
                <span className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                  15
                </span>
                <span className="text-[11px] font-sans font-light uppercase tracking-wider text-white/80">
                  legal experts
                </span>
              </div>

              <div className="w-px h-7 bg-white/30 hidden sm:block" />

              <div className="flex items-baseline gap-2">
                <span className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                  87+
                </span>
                <span className="text-[11px] font-sans font-light uppercase tracking-wider text-white/80">
                  verified reviews
                </span>
              </div>
            </div>

            {/* Consultation Action Button */}
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-sm bg-white text-[#1F1E19] hover:bg-white/95 font-sans font-semibold text-xs uppercase tracking-[0.14em] text-center shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              GET A CONSULTATION
            </a>
          </div>
        </div>
      </section>

      {/* 2. PROJECT OVERVIEW SECTION — Clean, Structured Interface */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
                PROJECT
              </h2>
              <span className="font-serif italic text-3xl sm:text-4xl text-[#5D5839] block mt-1">
                overview
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#1F1E19]/80 leading-relaxed font-light">
              The goal was to design a premium website for a luxury real estate service. The focus was on building trust, simplifying navigation, and presenting properties in a clear and elegant way.
            </p>

            <p className="text-sm sm:text-base text-[#1F1E19]/80 leading-relaxed font-light">
              The result is a clean, structured interface with strong visual hierarchy and a seamless user flow focused on conversion.
            </p>

            <div className="pt-8 flex items-center gap-12 text-xs text-[#767262] font-mono uppercase tracking-wider border-t border-[#E2DBD1]">
              <div>Industry: Real Estate</div>
              <div>Year: 2026</div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-sm shadow-md aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85"
                alt="Modern Villa Architecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHICH OPTION IS RIGHT FOR YOU? — Panoramic Property Showcase */}
      <section id="cases" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E2DBD1]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
              WHICH OPTION
            </h2>
            <span className="font-serif italic text-3xl sm:text-4xl text-[#5D5839] block mt-1">
              is right for you?
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-xs sm:text-sm text-[#767262] max-w-xs">
              Select your goal and receive a curated selection tailored to your request
            </p>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2">
              {(["LIVE", "INVEST", "RENT"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveGoal(tab)}
                  className={`px-5 py-2 rounded-sm text-xs font-sans font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
                    activeGoal === tab
                      ? "bg-[#5D5839] text-white shadow-xs"
                      : "bg-transparent text-[#1F1E19] border border-[#5D5839]/40 hover:border-[#5D5839]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panoramic Property Cards */}
        <div className="space-y-12">
          {/* Card 1: Family Villa */}
          <div className="relative rounded-sm overflow-hidden bg-[#1F1E19] text-white group shadow-lg">
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
                alt="Family Villa Sector F-7"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

              {/* Top Meta */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C4B487]" />
                  <span>Sector F-7, Islamabad</span>
                </div>
                <span className="px-3 py-1 rounded-sm bg-white text-[#1F1E19] text-[10px] font-sans font-bold uppercase tracking-wider">
                  New Listing
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <h3 className="text-2xl sm:text-4xl font-sans font-light uppercase tracking-tight text-white">
                    FAMILY VILLA
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed line-clamp-2">
                    A spacious modern villa with a private pool, green patio, outdoor lounge, and 2 floors — made for family comfort and leisure.
                  </p>
                  {/* Badges */}
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <span className="px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white">
                      2 floors
                    </span>
                    <span className="px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white">
                      5 beds
                    </span>
                    <span className="px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white">
                      6 baths
                    </span>
                    <span className="px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white">
                      1 Kanal / 500 Sq. Yd
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                  <div>
                    <span className="text-[11px] font-sans text-white/70 block uppercase tracking-wider">
                      from
                    </span>
                    <span className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                      PKR 14.5 Crore
                    </span>
                  </div>
                  <Link
                    href="/properties/villa-margalla-residence-f7-islamabad"
                    className="px-6 py-3 rounded-sm bg-white text-[#1F1E19] hover:bg-white/90 font-sans font-semibold text-xs uppercase tracking-[0.14em] text-center transition-transform hover:scale-[1.02]"
                  >
                    VIEW PROPERTY
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Serene Edge */}
          <div className="relative rounded-sm overflow-hidden bg-[#1F1E19] text-white group shadow-lg">
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85"
                alt="Serene Edge DHA Raya Golf"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

              {/* Top Meta */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C4B487]" />
                  <span>DHA Phase 6 Raya Golf, Lahore</span>
                </div>
                <span className="px-3 py-1 rounded-sm bg-white text-[#1F1E19] text-[10px] font-sans font-bold uppercase tracking-wider">
                  New Listing
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <h3 className="text-2xl sm:text-4xl font-sans font-light uppercase tracking-tight text-white">
                    SERENE EDGE
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed line-clamp-2">
                    Modern villa with championship fairway views, 1 floor, private pool, patio lounge, and a kids&apos; play area. Calm surroundings and full privacy.
                  </p>
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <span className="px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white">
                      1 floor
                    </span>
                    <span className="px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white">
                      4 beds
                    </span>
                    <span className="px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white">
                      5 baths
                    </span>
                    <span className="px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white">
                      2 Kanal / 1,000 Sq. Yd
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                  <div>
                    <span className="text-[11px] font-sans text-white/70 block uppercase tracking-wider">
                      from
                    </span>
                    <span className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                      PKR 18.2 Crore
                    </span>
                  </div>
                  <Link
                    href="/properties/1-kanal-luxury-spanish-villa-dha-phase-6-lahore"
                    className="px-6 py-3 rounded-sm bg-white text-[#1F1E19] hover:bg-white/90 font-sans font-semibold text-xs uppercase tracking-[0.14em] text-center transition-transform hover:scale-[1.02]"
                  >
                    VIEW PROPERTY
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Modern Hillside */}
          <div className="relative rounded-sm overflow-hidden bg-[#1F1E19] text-white group shadow-lg">
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85"
                alt="Modern Hillside Crescent Bay"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

              {/* Top Meta */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C4B487]" />
                  <span>Clifton Waterfront, Karachi</span>
                </div>
                <span className="px-3 py-1 rounded-sm bg-white text-[#1F1E19] text-[10px] font-sans font-bold uppercase tracking-wider">
                  New Listing
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <h3 className="text-2xl sm:text-4xl font-sans font-light uppercase tracking-tight text-white">
                    MODERN HILLSIDE
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed line-clamp-2">
                    Bright architectural duplex penthouse with 2 floors, rooftop plunge pool, skyline terrace, and bespoke imported fittings.
                  </p>
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <span className="px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white">
                      2 floors
                    </span>
                    <span className="px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white">
                      4 beds
                    </span>
                    <span className="px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white">
                      5 baths
                    </span>
                    <span className="px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white">
                      450 Sq. Yd
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                  <div>
                    <span className="text-[11px] font-sans text-white/70 block uppercase tracking-wider">
                      from
                    </span>
                    <span className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                      PKR 22.0 Crore
                    </span>
                  </div>
                  <Link
                    href="/properties/3-bed-panoramic-seafront-penthouse-crescent-bay-dha-karachi"
                    className="px-6 py-3 rounded-sm bg-white text-[#1F1E19] hover:bg-white/90 font-sans font-semibold text-xs uppercase tracking-[0.14em] text-center transition-transform hover:scale-[1.02]"
                  >
                    VIEW PROPERTY
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 pt-8 text-center space-y-4">
          <p className="text-xs sm:text-sm text-[#767262] max-w-md mx-auto">
            Not the perfect options? We will find something better. Just send a request and we will share more listings
          </p>
          <a
            href="#contact"
            className="inline-block px-7 py-3 rounded-sm bg-[#5D5839] hover:bg-[#4B472D] text-white font-sans font-semibold text-xs uppercase tracking-[0.14em] shadow-xs transition-transform hover:scale-[1.02]"
          >
            GET MORE OPTIONS
          </a>
        </div>
      </section>

      {/* 4. REAL STORIES & REAL RESULTS — Client Testimonials */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E2DBD1]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-16">
          <div>
            <h2 className="text-3xl sm:text-5xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
              REAL STORIES
            </h2>
            <span className="font-serif italic text-3xl sm:text-4xl text-[#5D5839] block mt-1">
              & real results
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#767262]">
            With selection, support, and guarantees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Andrew Carter"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1E19]">
                    Andrew Carter
                  </h4>
                  <p className="text-[10px] text-[#767262] uppercase tracking-wider font-mono">
                    Overseas Client, UK
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5D5839] block">
                PURCHASED A VILLA IN ISLAMABAD, FAMILY WITH 3 CHILDREN
              </span>

              <p className="text-xs text-[#1F1E19]/80 leading-relaxed font-light">
                I thought buying property from abroad would be complicated, but the team handled everything under one roof. We got a tailored selection based on our budget and preferences, not just a catalog list. The conveyancing lawyer explained every detail, checked the CDA documents, and we signed the agreement in full confidence.
              </p>

              <p className="text-xs font-serif italic text-[#5D5839]">
                «No risks. Everything was clear from legal review to signing»
              </p>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden group shadow-md">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                alt="Villa in Islamabad"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 text-[#1F1E19] flex items-center justify-center shadow-md">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Dr. Ayesha Al-Mansoor"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1E19]">
                    Dr. Ayesha Al-Mansoor
                  </h4>
                  <p className="text-[10px] text-[#767262] uppercase tracking-wider font-mono">
                    Physician, Dubai
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5D5839] block">
                BOUGHT A MODERN VILLA IN DHA RAYA GOLF
              </span>

              <p className="text-xs text-[#1F1E19]/80 leading-relaxed font-light">
                I was honestly overwhelmed at first, but they made the whole process smooth. We got a curated selection that matched both our budget and preferences. Everything was explained clearly, the paperwork was double-checked, and we signed in English. It felt safe from start to finish.
              </p>

              <p className="text-xs font-serif italic text-[#5D5839]">
                «They spoke my language — numbers, logic, and no fluff»
              </p>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden group shadow-md">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
                alt="Villa in DHA Raya"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 text-[#1F1E19] flex items-center justify-center shadow-md">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Sarah & Hamza Malik"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1E19]">
                    Sarah & Hamza Malik
                  </h4>
                  <p className="text-[10px] text-[#767262] uppercase tracking-wider font-mono">
                    Tech Founders, Islamabad
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5D5839] block">
                HIGH-YIELD RESIDENTIAL TENANCY PORTFOLIO
              </span>

              <p className="text-xs text-[#1F1E19]/80 leading-relaxed font-light">
                The team vetted the tenancy lease structure and established our rent roll ledger. Monthly yields are deposited without delay, and facility maintenance is handled automatically. The best agency experience in Pakistan.
              </p>

              <p className="text-xs font-serif italic text-[#5D5839]">
                «Full peace of mind with verifiable returns and transparent reporting»
              </p>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden group shadow-md">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
                alt="Penthouse in Karachi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 text-[#1F1E19] flex items-center justify-center shadow-md">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FROM REQUEST TO RESULT — 4-Step Interactive Process Slider */}
      <section id="process" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E2DBD1]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl sm:text-5xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
              FROM REQUEST
            </h2>
            <h2 className="text-3xl sm:text-5xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
              TO RESULT
            </h2>
            <span className="font-serif italic text-3xl sm:text-4xl text-[#5D5839] block mt-1">
              all under control
            </span>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-xs sm:text-sm text-[#767262] max-w-xs">
              From request to move-in or rental start we handle everything for you
            </p>

            {/* Prev / Next Slider Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveProcessStep((prev) => (prev > 0 ? prev - 1 : processSteps.length - 1))
                }
                className="w-10 h-10 rounded-full border border-[#5D5839]/40 hover:border-[#5D5839] flex items-center justify-center text-[#1F1E19] transition-colors cursor-pointer"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveProcessStep((prev) => (prev < processSteps.length - 1 ? prev + 1 : 0))
                }
                className="w-10 h-10 rounded-full border border-[#5D5839]/40 hover:border-[#5D5839] flex items-center justify-center text-[#1F1E19] transition-colors cursor-pointer"
                aria-label="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Process Card Carousel Active View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-sm border border-[#E2DBD1] p-8 sm:p-12 shadow-sm">
          <div className="lg:col-span-5 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#F8F3ED] border border-[#E2DBD1] flex items-center justify-center">
              <span className="font-serif italic text-2xl text-[#5D5839]">
                {processSteps[activeProcessStep].number}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-sans font-medium text-[#1F1E19]">
                {processSteps[activeProcessStep].title}
              </h3>
              <p className="text-sm text-[#767262] mt-3 leading-relaxed font-light">
                {processSteps[activeProcessStep].description}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-4">
              {processSteps.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveProcessStep(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeProcessStep
                      ? "w-8 bg-[#5D5839]"
                      : "w-2 bg-[#E2DBD1] hover:bg-[#5D5839]/50"
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="aspect-[16/10] rounded-sm overflow-hidden shadow-md">
              <img
                src={processSteps[activeProcessStep].image}
                alt={processSteps[activeProcessStep].title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. WE ARE A TEAM OF EXPERTS WORKING FOR YOU — Leadership & Brokerage */}
      <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E2DBD1]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
                WE ARE A TEAM
              </h2>
              <h2 className="text-3xl sm:text-5xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
                OF EXPERTS
              </h2>
              <span className="font-serif italic text-3xl sm:text-4xl text-[#5D5839] block mt-1">
                working for you
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#1F1E19]/80 leading-relaxed font-light">
              We&apos;ve been in the business for over 5 years, helping more than 100 clients buy or invest in verified real estate. No risks. No illusions. With a personal approach.
            </p>
          </div>

          {/* Right Column: 2 Featured Expert Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Expert 1 */}
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85"
                  alt="Ayesha Khan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-base font-bold uppercase tracking-tight text-[#1F1E19]">
                  Ayesha Khan
                </h4>
                <p className="text-xs text-[#767262] uppercase tracking-wider font-mono">
                  Senior Associate & Licensed Realtor
                </p>
              </div>
            </div>

            {/* Expert 2 with Bio & CTA */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-tight text-[#1F1E19]">
                    Salman Tariq
                  </h4>
                  <p className="text-xs text-[#767262] uppercase tracking-wider font-mono">
                    Founder & Managing Partner
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-[#1F1E19]/85 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D5839] font-bold">•</span>
                    <span>15+ years of experience in luxury real estate across Pakistan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D5839] font-bold">•</span>
                    <span>PKR 4.5B+ personally closed in verified transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5D5839] font-bold">•</span>
                    <span>Built a trusted network of verified developers, conveyancing lawyers, and private investors</span>
                  </li>
                </ul>

                <a
                  href="#contact"
                  className="inline-block w-full py-3.5 rounded-sm bg-[#5D5839] hover:bg-[#4B472D] text-white font-sans font-semibold text-xs uppercase tracking-[0.14em] text-center shadow-xs transition-transform hover:scale-[1.01]"
                >
                  GET EXPERT PROPERTY HELP
                </a>
              </div>

              <div className="aspect-[3/3] rounded-sm overflow-hidden shadow-md mt-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85"
                  alt="Hamza Farooq"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GOT QUESTIONS? WE'VE GOT YOU — Comprehensive FAQ Accordion */}
      <section id="faq" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E2DBD1]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Interior Photo & Quote */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
                GOT QUESTIONS?
              </h2>
              <span className="font-serif italic text-3xl sm:text-4xl text-[#5D5839] block mt-1">
                we&apos;ve got you
              </span>
            </div>

            <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Interior Living Room"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="font-serif italic text-sm text-[#5D5839] leading-relaxed">
              «We believe real estate should feel simple. We make it that way»
            </p>
          </div>

          {/* Right Column: FAQ List */}
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs text-[#767262] uppercase tracking-wider font-mono mb-6">
              We&apos;ve gathered answers to everything you might be wondering about
            </p>

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
                      <span className="text-sm sm:text-base font-sans font-medium text-[#1F1E19] group-hover:text-[#5D5839] transition-colors">
                        {faq.q}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-[#5D5839]/30 flex items-center justify-center shrink-0 text-[#5D5839] group-hover:border-[#5D5839] transition-colors">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="pt-2 pb-4 text-xs sm:text-sm text-[#1F1E19]/80 font-light leading-relaxed animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. LET'S TALK ABOUT YOUR DREAM HOME — Consultation Desk & Lead Capture */}
      <section id="contact" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Full Bleed Background Image with Palm Trees at Sunset */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 text-white space-y-6">
            <div>
              <h2 className="text-4xl sm:text-6xl font-sans font-medium uppercase tracking-tight text-white leading-tight">
                LET&apos;S TALK ABOUT
              </h2>
              <span className="font-serif italic text-3xl sm:text-5xl text-white block mt-1">
                your dream home
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-lg">
              Leave your contact information and briefly describe what you&apos;re interested in — our specialist will contact you, clarify the details, and offer you the best options.
            </p>

            <div className="pt-4">
              <a
                href="tel:+92512899001"
                className="text-2xl sm:text-4xl font-sans font-medium tracking-tight text-white hover:underline block"
              >
                +92 (51) 289-9001
              </a>
              <span className="text-xs text-white/60 font-light block mt-1">
                We handle every step with care
              </span>
            </div>
          </div>

          {/* Right Floating Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF6F0] rounded-sm p-8 sm:p-10 shadow-2xl border border-[#E2DBD1] text-[#1F1E19]">
              <div className="text-center mb-6">
                <span className="font-serif italic text-3xl text-[#1F1E19] block">
                  AqarFlow
                </span>
                <p className="text-xs text-[#767262] mt-1">
                  We&apos;ll call you, explain everything, and offer the best options
                </p>
              </div>

              {formSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#5D5839]/10 text-[#5D5839] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-[#1F1E19]">Request Received</h4>
                  <p className="text-xs text-[#767262]">
                    Our private property consultant will contact you within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      placeholder="Your name*"
                      className="w-full px-4 py-3 rounded-sm border border-[#E2DBD1] bg-white text-xs text-[#1F1E19] placeholder-[#767262] focus:outline-none focus:border-[#5D5839]"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="Your number*"
                      className="w-full px-4 py-3 rounded-sm border border-[#E2DBD1] bg-white text-xs text-[#1F1E19] placeholder-[#767262] focus:outline-none focus:border-[#5D5839]"
                    />
                  </div>

                  <div>
                    <select
                      value={leadForm.goal}
                      onChange={(e) => setLeadForm({ ...leadForm, goal: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-[#E2DBD1] bg-white text-xs text-[#1F1E19] focus:outline-none focus:border-[#5D5839]"
                    >
                      <option value="Live / Buy Luxury Residence">Live / Buy Luxury Residence</option>
                      <option value="High-Yield Investment Portfolio">High-Yield Investment Portfolio</option>
                      <option value="Diplomatic Tenancy (Rent)">Diplomatic Tenancy (Rent)</option>
                      <option value="Sell My Architectural Residence">Sell My Architectural Residence</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-3.5 rounded-sm bg-[#5D5839] hover:bg-[#4B472D] text-white font-sans font-semibold text-xs uppercase tracking-[0.14em] shadow-xs transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {formSubmitting ? "TRANSMITTING..." : "SEND REQUEST"}
                  </button>

                  <p className="text-[10px] text-[#767262] text-center pt-2 leading-relaxed">
                    By clicking the button, you agree to our Privacy Policy and consent to be contacted.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. PUBLIC FOOTER */}
      <PublicFooter />
    </div>
  );
}
