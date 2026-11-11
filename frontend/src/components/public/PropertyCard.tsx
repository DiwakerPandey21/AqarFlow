"use client";

import React from "react";
import Link from "next/link";
import { Bed, Bath, Maximize2, MapPin, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
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
  const usdPrice = Math.round(property.price / 278);

  return (
    <div className="group bg-white rounded-sm border border-[#E2DBD1] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Editorial Image Showcase */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF6F0]">
          <img
            src={
              property.cover_image ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            }
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="px-2.5 py-1 rounded-sm text-[10px] font-sans font-semibold uppercase tracking-wider bg-white text-[#1F1E19]">
              {isRent ? "For Lease" : "New Listing"}
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] font-sans font-medium bg-black/60 backdrop-blur-md text-white border border-white/20">
              <ShieldCheck className="w-3 h-3 text-[#C4B487]" /> CDA / LDA Verified
            </span>
          </div>

          {/* Location & Ref on Image */}
          <div className="absolute bottom-3.5 left-4 right-4 z-10 flex items-center justify-between text-white">
            <span className="text-[11px] font-medium tracking-wide flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C4B487] shrink-0" />
              <span>{property.locality}, {property.city}</span>
            </span>
            <span className="text-[10px] font-mono opacity-80">
              {property.reference_code}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xl font-serif italic text-[#1F1E19] tracking-tight">
                {formatPKR(property.price)}
                {isRent && <span className="text-xs font-sans text-[#767262] font-normal not-italic"> / mo</span>}
              </span>
              <span suppressHydrationWarning className="block text-[11px] font-sans text-[#767262] mt-0.5">
                ≈ {formatUSD(usdPrice)}
              </span>
            </div>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#F8F3ED] text-[#5D5839] border border-[#E2DBD1]">
              {property.property_type}
            </span>
          </div>

          {/* Architectural Title */}
          <Link href={`/properties/${property.slug}`} className="block group-hover:text-[#5D5839] transition-colors mt-2">
            <h3 className="font-sans font-medium uppercase tracking-tight text-[#1F1E19] line-clamp-1 text-base">
              {property.title}
            </h3>
          </Link>

          {/* Specs Strip */}
          <div className="grid grid-cols-3 gap-2 py-3.5 my-3 border-y border-[#E2DBD1] text-xs text-[#767262]">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#5D5839]" />
              <span className="font-medium text-[#1F1E19]">{formatArea(property.area_value, property.area_unit)}</span>
            </div>
            {property.bedrooms !== undefined && property.bedrooms > 0 ? (
              <div className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-[#5D5839]" />
                <span>{property.bedrooms} Beds</span>
              </div>
            ) : (
              <div className="text-[#767262] italic">Plot</div>
            )}
            {property.bathrooms !== undefined && property.bathrooms > 0 ? (
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-[#5D5839]" />
                <span>{property.bathrooms} Baths</span>
              </div>
            ) : (
              <div className="text-[#767262] italic">Commercial</div>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-3">
        <a
          href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 rounded-sm bg-[#F8F3ED] hover:bg-[#ECE5DC] text-[#5D5839] transition-all border border-[#E2DBD1] flex items-center justify-center"
          title="WhatsApp Concierge"
        >
          <MessageCircle className="w-4 h-4 text-[#5D5839]" />
        </a>

        <Link
          href={`/properties/${property.slug}`}
          className="flex-1 py-2.5 px-4 rounded-sm bg-[#5D5839] hover:bg-[#4B472D] text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all shadow-xs"
        >
          <span>VIEW PROPERTY</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
