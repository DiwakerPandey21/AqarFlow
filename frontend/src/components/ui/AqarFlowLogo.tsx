"use client";

import React from "react";
import Link from "next/link";

interface AqarFlowLogoProps {
  variant?: "default" | "light" | "gold" | "mark-only";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  className?: string;
  href?: string;
}

export function AqarFlowLogo({
  variant = "default",
  size = "md",
  showTagline = true,
  className = "",
  href = "/"
}: AqarFlowLogoProps) {
  // Dimensions
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  };

  const isLight = variant === "light";
  const isGold = variant === "gold";

  const mark = (
    <div
      className={`relative ${iconSizes[size]} shrink-0 rounded-2xl flex items-center justify-center p-2 transition-all duration-300 ${
        isLight
          ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/20"
          : isGold
          ? "bg-gradient-to-br from-amber-900/90 to-slate-950 border border-amber-500/30 shadow-md shadow-amber-900/20"
          : "bg-slate-950 border border-slate-800 shadow-md shadow-slate-900/10"
      }`}
    >
      {/* Bespoke Architectural Portal + Flow Ribbon SVG */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="aqarGold" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5D061" />
            <stop offset="0.45" stopColor="#E5B552" />
            <stop offset="0.8" stopColor="#C48E2E" />
            <stop offset="1" stopColor="#8F6218" />
          </linearGradient>
          <linearGradient id="aqarEmerald" x1="12" y1="40" x2="36" y2="8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34D399" />
            <stop offset="0.6" stopColor="#10B981" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Outer Architectural Sanctuary Arch */}
        <path
          d="M12 40V22C12 15.3726 17.3726 10 24 10C30.6274 10 36 15.3726 36 22V40"
          stroke="url(#aqarGold)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Intersecting Flow Infinity Loop (Real Estate Workflows) */}
        <path
          d="M8 32C8 28 14 24 24 24C34 24 40 28 40 32C40 36 34 40 24 40C14 40 8 36 8 32Z"
          stroke="url(#aqarEmerald)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="1.5 2.5"
          className="opacity-90"
        />

        {/* Central Foundation Keystone / Star Emblem */}
        <circle cx="24" cy="22" r="3" fill="url(#aqarGold)" />
        <circle cx="24" cy="22" r="1.2" fill="#0B0F17" />

        {/* Subtle Horizon Ground Line */}
        <path d="M16 40H32" stroke="url(#aqarGold)" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </div>
  );

  if (variant === "mark-only") {
    return href ? <Link href={href}>{mark}</Link> : mark;
  }

  const content = (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {mark}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1">
          <span
            className={`font-serif tracking-[0.14em] font-extrabold uppercase ${textSizes[size]} transition-colors ${
              isLight
                ? "text-white"
                : isGold
                ? "text-amber-100"
                : "text-slate-900 group-hover:text-amber-900"
            }`}
          >
            AQAR
          </span>
          <span
            className={`font-sans tracking-[0.22em] font-light uppercase ${textSizes[size]} ${
              isLight
                ? "text-amber-300"
                : isGold
                ? "text-amber-400"
                : "text-amber-600"
            }`}
          >
            FLOW
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[9px] font-sans tracking-[0.24em] font-medium uppercase mt-0.5 ${
              isLight ? "text-slate-400" : isGold ? "text-amber-400/70" : "text-slate-500"
            }`}
          >
            ESTATE OPERATIONS • PAKISTAN
          </span>
        )}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="inline-block focus:outline-none">
      {content}
    </Link>
  ) : (
    content
  );
}
