"use client";

import React, { useState, use, Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Share2,
  ArrowLeft,
  Sparkles,
  Info,
  Clock,
  Compass,
  FileCheck2,
  Calculator,
  ArrowUpRight
} from "lucide-react";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { InquiryForm } from "@/components/public/InquiryForm";
import { ScheduleVisitModal } from "@/components/public/ScheduleVisitModal";
import { db } from "@/lib/db";
import { formatPKR, formatArea, formatDate, formatNumberFixed, formatUSD } from "@/lib/formatters";

function PropertyDetailContent({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const property = db.getPropertyBySlug(slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!property) {
    notFound();
  }

  const allImages = [
    property.cover_image ||
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ...(property.gallery_images || [])
  ];

  const agentPhone = property.assigned_agent?.phone || "+923008551234";
  const cleanPhone = agentPhone.replace(/[^0-9]/g, "");
  const whatsappMsg = encodeURIComponent(
    `Hello AqarFlow, I am interested in '${property.title}' (${property.reference_code}) listed for ${property.currency} ${formatNumberFixed(property.price)}. Please arrange a private showing.`
  );

  const usdPrice = Math.round(property.price / 278);

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 font-sans selection:bg-amber-600 selection:text-white">
      <PublicNavbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-[#E8E4DC] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/properties" className="hover:text-slate-900 transition-colors">
              Curated Portfolio
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-md">
              {property.title}
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-slate-700 hover:text-slate-950 font-bold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-700" />
            <span>{copied ? "Deed Link Copied!" : "Share Dossier"}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950 text-amber-300 shadow-2xs">
                {property.reference_code}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/80">
                {property.purpose === "rent" ? "For Tenancy" : "For Acquisition"}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-800">
                {property.property_type}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300/80 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>CDA / LDA Title Verified</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
              {property.title}
            </h1>

            <p className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-light">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {property.address ? `${property.address}, ` : ""}
                {property.locality}, {property.city}
              </span>
            </p>
          </div>

          {/* Luxury Price Box */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E4DC] shadow-sm md:text-right shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block mb-1">
              Escrow Valued Price
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-950 tracking-tight">
              {formatPKR(property.price)}
              {property.purpose === "rent" && (
                <span className="text-sm font-sans text-slate-500 font-normal"> / mo</span>
              )}
            </div>
            <div className="text-xs font-mono text-slate-500 mt-1">
              ≈ ${formatUSD(usdPrice)} USD • {formatPKR(Math.round(property.price / (property.area_value || 1)))} / {property.area_unit}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-12 space-y-4">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-slate-800">
            <img
              src={allImages[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-5 right-5 bg-slate-950/80 backdrop-blur-md text-amber-200 border border-white/10 px-4 py-1.5 rounded-xl text-xs font-mono font-semibold">
              Archival Asset {activeImageIndex + 1} of {allImages.length}
            </div>
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-28 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-amber-600 scale-105 shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (8 Cols): Overview, Specs, Legal Deed Assurance */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview Spec Grid */}
            <div className="bg-white rounded-3xl border border-[#E8E4DC] p-6 sm:p-8 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block mb-4">
                Architectural Specifications
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-slate-200/70">
                  <Maximize2 className="w-5 h-5 text-amber-800 mx-auto mb-1.5" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                    Dimensions
                  </span>
                  <span className="text-sm sm:text-base font-serif font-bold text-slate-950">
                    {formatArea(property.area_value, property.area_unit)}
                  </span>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-slate-200/70">
                  <Bed className="w-5 h-5 text-amber-800 mx-auto mb-1.5" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                    Bedrooms
                  </span>
                  <span className="text-sm sm:text-base font-serif font-bold text-slate-950">
                    {property.bedrooms ? `${property.bedrooms} Suites` : "N/A"}
                  </span>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-slate-200/70">
                  <Bath className="w-5 h-5 text-amber-800 mx-auto mb-1.5" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                    Bathrooms
                  </span>
                  <span className="text-sm sm:text-base font-serif font-bold text-slate-950">
                    {property.bathrooms ? `${property.bathrooms} Baths` : "N/A"}
                  </span>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-slate-200/70">
                  <Compass className="w-5 h-5 text-amber-800 mx-auto mb-1.5" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                    Possession
                  </span>
                  <span className="text-sm sm:text-base font-serif font-bold text-slate-950">
                    {property.possession_status || "Immediate"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 pt-6 mt-6 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Furnishing Status:</span>
                  <span className="font-semibold text-slate-900">{property.furnishing}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Construction Grade:</span>
                  <span className="font-semibold text-slate-900">{property.construction_status}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Classification:</span>
                  <span className="font-semibold text-slate-900 capitalize">{property.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Civic Jurisdiction:</span>
                  <span className="font-semibold text-slate-900">{property.city} Municipal Desk</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Registry Code:</span>
                  <span className="font-mono font-semibold text-slate-900">{property.reference_code}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Title Status:</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Title Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-3xl border border-[#E8E4DC] p-6 sm:p-8 shadow-sm space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block">
                Architectural Monograph
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-950">
                Property Narrative & Provenance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E8E4DC] p-6 sm:p-8 shadow-sm space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block">
                  Signature Features
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-950">
                  Estate Amenities & Inclusions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {property.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 flex items-center gap-2 text-xs text-slate-800 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Statutory Title Verification Certificate Box */}
            <div className="bg-amber-50/50 rounded-3xl border border-amber-500/30 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-900 flex items-center justify-center border border-amber-500/30">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 block">
                    Assurance Guarantee
                  </span>
                  <h4 className="font-serif font-bold text-slate-950 text-lg">
                    AqarFlow Certified Title Clearance Deed
                  </h4>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-light">
                This asset has passed our statutory 3-tier inspection protocol: (1) Mutation scrutiny (Intiqal) in municipal land registry records, (2) Society allotment transfer clearance with zero outstanding dues, and (3) Physical boundary peg inspection matching layout demarcations.
              </p>
            </div>
          </div>

          {/* Right Column (4 Cols): Concierge Card, Schedule Viewing, Inquiry */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Broker Concierge Card */}
            <div className="bg-white rounded-3xl border border-[#E8E4DC] p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                  <img
                    src={
                      property.assigned_agent?.avatar_url ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    }
                    alt={property.assigned_agent?.full_name || "Agent"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 block">
                    Certified Broker
                  </span>
                  <h4 className="font-serif font-bold text-slate-950 text-base">
                    {property.assigned_agent?.full_name || "Ayesha Malik"}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    License: AQ-PK-{property.assigned_agent?.id?.replace("usr-", "") || "092"}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Chat</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsVisitModalOpen(true)}
                  className="w-full py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Schedule Private Showing</span>
                </button>

                <a
                  href={`tel:${agentPhone}`}
                  className="w-full py-2.5 rounded-2xl bg-[#FAF8F5] hover:bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>Direct Call: {agentPhone}</span>
                </a>
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <div className="bg-white rounded-3xl border border-[#E8E4DC] p-6 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block mb-2">
                Priority Dispatch
              </span>
              <h4 className="font-serif font-bold text-slate-950 text-lg mb-4">
                Express Interest in Listing
              </h4>
              <InquiryForm propertyId={property.id} propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Visit Modal */}
      <ScheduleVisitModal
        property={property}
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
      />

      <PublicFooter />
    </div>
  );
}

export default function PropertyDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-slate-600 font-serif">
          Retrieving Architectural Dossier...
        </div>
      }
    >
      <PropertyDetailContent params={params} />
    </Suspense>
  );
}
