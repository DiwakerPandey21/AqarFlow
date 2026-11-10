"use client";

import React from "react";
import Link from "next/link";
import { Bed, Bath, Maximize2, MapPin, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { Property } from "@/lib/types";
import { formatPKR, formatArea, formatNumberFixed, formatUSD } from "@/lib/formatters";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const isRent = property.purpose === "rent";
  const whatsappMsg = encodeURIComponent(
    `Hello AqarFlow Private Office, I am inquiring about '${property.title}' (${property.reference_code}) listed at ${property.currency} ${formatNumberFixed(property.price)}. Please share complete documentation, floor plans, and inspection report.`
  );
  const agentPhone = property.assigned_agent?.phone || "+923008551234";
  const cleanPhone = agentPhone.replace(/[^0-9]/g, "");

  // Estimated USD for overseas Pakistani diaspora investors
  const usdPrice = Math.round(property.price / 278);

  return (
    <div className="group bg-white rounded-3xl border border-[#E8E4DC] overflow-hidden shadow-xs hover:shadow-2xl hover:border-amber-500/40 transition-all duration-500 flex flex-col justify-between">
      <div>
        {/* Editorial Image Showcase */}
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
          <img
            src={
              property.cover_image ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            }
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Gradient Lighting Veil */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

          {/* Badges Overlay — Architectural & Minimalist */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider backdrop-blur-md shadow-xs ${
                isRent
                  ? "bg-slate-950/80 text-amber-300 border border-amber-400/30"
                  : "bg-slate-950/80 text-white border border-white/20"
              }`}
            >
              {isRent ? "For Lease" : "For Sale"}
            </span>

            {property.is_featured && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-amber-950/60 text-amber-300 backdrop-blur-md border border-amber-500/30 shadow-xs">
                ✦ Curated
              </span>
            )}
          </div>

          {/* Verification Badge & Authority */}
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-xs">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified
            </span>
          </div>

          {/* Location & Ref on Image */}
          <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between text-white">
            <span className="text-[11px] font-mono tracking-wider opacity-85 px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs">
              {property.reference_code}
            </span>
            <span className="text-[11px] font-medium tracking-wide text-amber-200/90 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{property.locality}, {property.city}</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-serif font-extrabold text-slate-900 tracking-tight">
                {formatPKR(property.price)}
                {isRent && <span className="text-xs font-sans text-slate-500 font-normal"> / mo</span>}
              </span>
              <span suppressHydrationWarning className="block text-[11px] font-mono text-slate-400 mt-0.5">
                ≈ {formatUSD(usdPrice)}
              </span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
              {property.property_type}
            </span>
          </div>

          {/* Architectural Title */}
          <Link href={`/properties/${property.slug}`} className="block group-hover:text-amber-800 transition-colors mt-2">
            <h3 className="font-serif font-bold text-slate-900 line-clamp-1 text-lg leading-snug">
              {property.title}
            </h3>
          </Link>

          {/* Architectural Specs Strip */}
          <div className="grid grid-cols-3 gap-2 py-3.5 my-4 border-y border-[#EFECE6] text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">{formatArea(property.area_value, property.area_unit)}</span>
            </div>
            {property.bedrooms !== undefined && property.bedrooms > 0 ? (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-slate-400" />
                <span>{property.bedrooms} Beds</span>
              </div>
            ) : (
              <div className="text-slate-400 italic">Commercial / Plot</div>
            )}
            {property.bathrooms !== undefined && property.bathrooms > 0 ? (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-slate-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
            ) : (
              <div className="text-slate-400 italic">Direct Road Access</div>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-3">
        {/* WhatsApp Direct Agent Inquiry */}
        <a
          href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
          target="_blank"
          rel="noreferrer"
          className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-all border border-emerald-200/80 flex items-center justify-center shadow-xs"
          title="Inquire directly on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
        </a>

        {/* View Architectural Particulars */}
        <Link
          href={`/properties/${property.slug}`}
          className="flex-1 py-3 px-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all group/btn shadow-sm"
        >
          <span>View Residence Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-amber-400" />
        </Link>
      </div>
    </div>
  );
}
