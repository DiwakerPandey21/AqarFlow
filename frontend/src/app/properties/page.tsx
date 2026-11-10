"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  List,
  Sparkles,
  MapPin,
  Building2
} from "lucide-react";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { PropertyCard } from "@/components/public/PropertyCard";
import { db } from "@/lib/db";
import { Property } from "@/lib/types";

function PropertiesContent() {
  const searchParams = useSearchParams();

  // Search filter states initialized from URL query params
  const [purpose, setPurpose] = useState<string>(searchParams.get("purpose") || "");
  const [city, setCity] = useState<string>(searchParams.get("city") || "");
  const [propertyType, setPropertyType] = useState<string>(searchParams.get("property_type") || "");
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");
  const [minPrice, setMinPrice] = useState<string>(searchParams.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("max_price") || "");
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get("bedrooms") || "");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Retrieve properties from database
  const properties = useMemo(() => {
    let result = db.getProperties({
      purpose: purpose || undefined,
      city: city || undefined,
      property_type: propertyType || undefined,
      min_price: minPrice ? Number(minPrice) : undefined,
      max_price: maxPrice ? Number(maxPrice) : undefined,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      search: searchQuery || undefined,
      publicOnly: true
    });

    // Sorting
    if (sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [purpose, city, propertyType, minPrice, maxPrice, bedrooms, searchQuery, sortBy]);

  const resetFilters = () => {
    setPurpose("");
    setCity("");
    setPropertyType("");
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 font-sans selection:bg-amber-600 selection:text-white">
      <PublicNavbar />

      {/* Luxury Editorial Header Banner */}
      <div className="bg-[#FAF8F5] border-b border-[#E8E4DC] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block mb-1">
                Verified Architectural Catalog
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-slate-950">
                The Curated Residences Portfolio
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl font-light">
                Inspected, price-validated, and represented exclusively by certified AqarFlow partner brokers. Showing {properties.length} verified listings.
              </p>
            </div>

            {/* Quick stats or CTA */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-950 text-white text-xs font-bold shadow-sm"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Filter Options {properties.length > 0 && `(${properties.length})`}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter Panel (Desktop & Mobile Drawer) */}
          <aside
            className={`lg:w-80 shrink-0 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-3xl border border-[#E8E4DC] p-6 shadow-xs sticky top-28 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-amber-800" />
                  <h3 className="font-serif font-bold text-slate-900 text-base">Search Filters</h3>
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Keyword / Locality */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Search Keyword
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Locality, ref code, or title..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 font-sans"
                  />
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Purpose
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
                  {[
                    { id: "", label: "All" },
                    { id: "sale", label: "Buy" },
                    { id: "rent", label: "Rent" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPurpose(p.id)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                        purpose === p.id
                          ? "bg-slate-950 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 font-sans"
                >
                  <option value="">All Major Cities</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 font-sans"
                >
                  <option value="">All Property Types</option>
                  <option value="House">House / Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Commercial Plot">Commercial Plot</option>
                  <option value="Residential Plot">Residential Plot</option>
                  <option value="Office">Office Floor</option>
                </select>
              </div>

              {/* Price Range (PKR) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Price Range (PKR)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min PKR"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 font-sans"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max PKR"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 font-sans"
                  />
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {[
                    { label: "< 2 Cr", max: 20000000 },
                    { label: "< 5 Cr", max: 50000000 },
                    { label: "< 10 Cr", max: 100000000 },
                    { label: "10 Cr+", min: 100000000 }
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (preset.max) setMaxPrice(preset.max.toString());
                        if (preset.min) setMinPrice(preset.min.toString());
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bedrooms
                </label>
                <div className="flex gap-1">
                  {["", "1", "2", "3", "4", "5"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBedrooms(b)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        bedrooms === b
                          ? "bg-slate-950 border-slate-950 text-white shadow-xs"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {b ? `${b}+` : "Any"}
                    </button>
                  ))}
                </div>
              </div>

              {showMobileFilters && (
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-950 text-white font-bold text-sm lg:hidden shadow-sm"
                >
                  Apply Filters
                </button>
              )}
            </div>
          </aside>

          {/* Properties Grid / Results */}
          <main className="flex-1">
            {/* Control Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="text-sm font-semibold text-slate-700">
                <span className="font-extrabold text-slate-900">{properties.length}</span>{" "}
                Verified Residences Available
              </div>

              <div className="flex items-center gap-3">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-amber-400"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>

                {/* View toggle */}
                <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-md transition-all ${
                      viewMode === "grid" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-500"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-md transition-all ${
                      viewMode === "list" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-500"
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid / List */}
            {properties.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
                <div className="w-16 h-16 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-1">No Matching Properties Found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  We could not find any properties matching your current filter criteria. Try
                  loosening price boundaries or resetting search filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-sm shadow-md hover:bg-slate-900 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                    : "flex flex-col gap-6"
                }
              >
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-medium">
          Loading property listings...
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
