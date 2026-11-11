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
  Compass
} from "lucide-react";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { InquiryForm } from "@/components/public/InquiryForm";
import { ScheduleVisitModal } from "@/components/public/ScheduleVisitModal";
import { db } from "@/lib/db";
import { formatPKR, formatArea, formatNumberFixed, formatUSD } from "@/lib/formatters";

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
    <div className="min-h-screen flex flex-col bg-[#F8F3ED] text-[#1F1E19] font-sans selection:bg-[#5D5839] selection:text-white">
      <PublicNavbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#FAF6F0] border-b border-[#E2DBD1] pt-24 pb-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#767262]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#1F1E19] transition-colors">
              Home
            </Link>
            <span className="text-[#E2DBD1]">/</span>
            <Link href="/properties" className="hover:text-[#1F1E19] transition-colors">
              Curated Portfolio
            </Link>
            <span className="text-[#E2DBD1]">/</span>
            <span className="text-[#1F1E19] font-medium truncate max-w-[200px] sm:max-w-md">
              {property.title}
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-[#5D5839] hover:underline font-semibold transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Link Copied!" : "Share Listing"}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-sm text-xs font-mono font-bold bg-[#1F1E19] text-white">
                {property.reference_code}
              </span>
              <span className="px-2.5 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider bg-[#5D5839] text-white">
                {property.purpose === "rent" ? "For Tenancy" : "For Acquisition"}
              </span>
              <span className="px-2.5 py-1 rounded-sm text-xs font-semibold bg-white border border-[#E2DBD1] text-[#1F1E19]">
                {property.property_type}
              </span>
              <span className="px-2.5 py-1 rounded-sm text-xs font-semibold bg-[#FAF6F0] text-[#5D5839] border border-[#E2DBD1] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5D5839]" />
                <span>CDA / LDA Title Verified</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-light uppercase tracking-tight text-[#1F1E19] leading-tight">
              {property.title}
            </h1>

            <p className="flex items-center gap-2 text-xs sm:text-sm text-[#767262] font-light">
              <MapPin className="w-4 h-4 text-[#5D5839] shrink-0" />
              <span>
                {property.address ? `${property.address}, ` : ""}
                {property.locality}, {property.city}
              </span>
            </p>
          </div>

          {/* Luxury Price Box */}
          <div className="bg-white p-6 rounded-sm border border-[#E2DBD1] shadow-xs md:text-right shrink-0">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.14em] text-[#767262] block mb-1">
              Valued Price
            </span>
            <div className="text-3xl sm:text-4xl font-serif italic text-[#1F1E19] tracking-tight">
              {formatPKR(property.price)}
              {property.purpose === "rent" && (
                <span className="text-sm font-sans text-[#767262] font-normal not-italic"> / mo</span>
              )}
            </div>
            <div className="text-xs text-[#767262] mt-1 font-light">
              ≈ ${formatUSD(usdPrice)} USD • {formatPKR(Math.round(property.price / (property.area_value || 1)))} / {property.area_unit}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-12 space-y-4">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-sm overflow-hidden bg-[#1F1E19] shadow-lg border border-[#E2DBD1]">
            <img
              src={allImages[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md text-white border border-white/20 px-3.5 py-1 rounded-sm text-xs font-mono">
              Photo {activeImageIndex + 1} of {allImages.length}
            </div>
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-28 h-20 rounded-sm overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-[#5D5839] scale-105 shadow-md"
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
          {/* Left Column (8 Cols): Overview, Specs, Description */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview Spec Grid */}
            <div className="bg-white rounded-sm border border-[#E2DBD1] p-6 sm:p-8 shadow-xs">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.14em] text-[#5D5839] block mb-4">
                Architectural Specifications
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-[#F8F3ED] rounded-sm border border-[#E2DBD1]">
                  <Maximize2 className="w-5 h-5 text-[#5D5839] mx-auto mb-1.5" />
                  <span className="text-[10px] text-[#767262] font-semibold uppercase tracking-wider block">
                    Dimensions
                  </span>
                  <span className="text-sm sm:text-base font-serif italic text-[#1F1E19]">
                    {formatArea(property.area_value, property.area_unit)}
                  </span>
                </div>

                <div className="p-4 bg-[#F8F3ED] rounded-sm border border-[#E2DBD1]">
                  <Bed className="w-5 h-5 text-[#5D5839] mx-auto mb-1.5" />
                  <span className="text-[10px] text-[#767262] font-semibold uppercase tracking-wider block">
                    Bedrooms
                  </span>
                  <span className="text-sm sm:text-base font-serif italic text-[#1F1E19]">
                    {property.bedrooms ? `${property.bedrooms} Suites` : "N/A"}
                  </span>
                </div>

                <div className="p-4 bg-[#F8F3ED] rounded-sm border border-[#E2DBD1]">
                  <Bath className="w-5 h-5 text-[#5D5839] mx-auto mb-1.5" />
                  <span className="text-[10px] text-[#767262] font-semibold uppercase tracking-wider block">
                    Bathrooms
                  </span>
                  <span className="text-sm sm:text-base font-serif italic text-[#1F1E19]">
                    {property.bathrooms ? `${property.bathrooms} Baths` : "N/A"}
                  </span>
                </div>

                <div className="p-4 bg-[#F8F3ED] rounded-sm border border-[#E2DBD1]">
                  <Compass className="w-5 h-5 text-[#5D5839] mx-auto mb-1.5" />
                  <span className="text-[10px] text-[#767262] font-semibold uppercase tracking-wider block">
                    Possession
                  </span>
                  <span className="text-sm sm:text-base font-serif italic text-[#1F1E19]">
                    {property.possession_status || "Immediate"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 pt-6 mt-6 border-t border-[#E2DBD1] text-xs">
                <div>
                  <span className="text-[#767262] block font-light">Furnishing Status:</span>
                  <span className="font-semibold text-[#1F1E19]">{property.furnishing}</span>
                </div>
                <div>
                  <span className="text-[#767262] block font-light">Construction Grade:</span>
                  <span className="font-semibold text-[#1F1E19]">{property.construction_status}</span>
                </div>
                <div>
                  <span className="text-[#767262] block font-light">Classification:</span>
                  <span className="font-semibold text-[#1F1E19] capitalize">{property.category}</span>
                </div>
                <div>
                  <span className="text-[#767262] block font-light">Civic Authority:</span>
                  <span className="font-semibold text-[#1F1E19]">{property.city} Municipal Desk</span>
                </div>
                <div>
                  <span className="text-[#767262] block font-light">Registry Code:</span>
                  <span className="font-mono font-semibold text-[#1F1E19]">{property.reference_code}</span>
                </div>
                <div>
                  <span className="text-[#767262] block font-light">Title Status:</span>
                  <span className="font-semibold text-[#5D5839] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#5D5839]" /> Title Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-sm border border-[#E2DBD1] p-6 sm:p-8 shadow-xs space-y-4">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.14em] text-[#5D5839] block">
                Architectural Monograph
              </span>
              <h3 className="text-xl sm:text-2xl font-sans font-light uppercase text-[#1F1E19]">
                Property Narrative & Provenance
              </h3>
              <p className="text-xs sm:text-sm text-[#1F1E19]/80 leading-relaxed font-light whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-sm border border-[#E2DBD1] p-6 sm:p-8 shadow-xs space-y-4">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.14em] text-[#5D5839] block">
                  Signature Features
                </span>
                <h3 className="text-xl font-sans font-light uppercase text-[#1F1E19]">
                  Estate Amenities & Inclusions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {property.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F8F3ED] rounded-sm border border-[#E2DBD1] text-xs text-[#1F1E19] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5D5839]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 Cols): Broker Card & Inquiry */}
          <div className="lg:col-span-4 space-y-6">
            {/* Broker Card */}
            <div className="bg-white rounded-sm border border-[#E2DBD1] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={
                    property.assigned_agent?.avatar_url ||
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                  }
                  alt={property.assigned_agent?.full_name || "Agent"}
                  className="w-14 h-14 rounded-full object-cover border border-[#E2DBD1]"
                />
                <div>
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#5D5839] block">
                    Certified Broker
                  </span>
                  <h4 className="font-sans font-bold text-[#1F1E19] text-base">
                    {property.assigned_agent?.full_name || "Ayesha Khan"}
                  </h4>
                  <p className="text-[11px] text-[#767262] font-mono">
                    Licensed Realtor • AqarFlow
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-sm bg-[#5D5839] hover:bg-[#4B472D] text-white font-sans font-semibold text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsVisitModalOpen(true)}
                  className="w-full py-3 rounded-sm bg-[#1F1E19] hover:bg-black text-white font-sans font-semibold text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#C4B487]" />
                  <span>Schedule Private Showing</span>
                </button>

                <a
                  href={`tel:${agentPhone}`}
                  className="w-full py-2.5 rounded-sm bg-[#F8F3ED] hover:bg-[#ECE5DC] text-[#1F1E19] font-medium text-xs flex items-center justify-center gap-2 border border-[#E2DBD1] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#5D5839]" />
                  <span>Direct Call: {agentPhone}</span>
                </a>
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <div className="bg-white rounded-sm border border-[#E2DBD1] p-6 shadow-xs">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.14em] text-[#5D5839] block mb-2">
                Priority Dispatch
              </span>
              <h4 className="font-sans font-light uppercase text-[#1F1E19] text-base mb-4">
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
        <div className="min-h-screen bg-[#F8F3ED] flex items-center justify-center text-[#767262] font-serif">
          Retrieving Architectural Dossier...
        </div>
      }
    >
      <PropertyDetailContent params={params} />
    </Suspense>
  );
}
