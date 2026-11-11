"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  List,
  MapPin,
  Building2
} from "lucide-react";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { PropertyCard } from "@/components/public/PropertyCard";
import { db } from "@/lib/db";

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
    <div className="min-h-screen flex flex-col bg-[#F8F3ED] text-[#1F1E19] font-sans selection:bg-[#5D5839] selection:text-white">
      <PublicNavbar />

      {/* Vellaro Header Banner */}
      <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-b border-[#E2DBD1]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
              CURATED
            </h1>
            <span className="font-serif italic text-3xl sm:text-4xl text-[#5D5839] block mt-1">
              residences
            </span>
            <p className="text-xs sm:text-sm text-[#767262] mt-2 max-w-xl font-light">
              Verified luxury architectural residences across Islamabad, Lahore, and Karachi. Showing {properties.length} active listings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#5D5839] text-white text-xs font-sans font-semibold uppercase tracking-wider shadow-sm cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({properties.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter Panel */}
          <aside
            className={`lg:w-80 shrink-0 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-sm border border-[#E2DBD1] p-6 shadow-xs sticky top-28 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2DBD1]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#5D5839]" />
                  <h3 className="font-sans font-semibold uppercase tracking-wider text-[#1F1E19] text-xs">
                    Search Filters
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-[#5D5839] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Keyword / Locality */}
              <div>
                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1.5">
                  Locality or Reference
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#767262] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. F-7, DHA Raya, Clifton"
                    className="w-full pl-9 pr-3.5 py-2 rounded-sm border border-[#E2DBD1] text-xs focus:outline-none focus:border-[#5D5839] font-sans bg-[#F8F3ED]"
                  />
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1.5">
                  Goal / Purpose
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F8F3ED] rounded-sm border border-[#E2DBD1]">
                  {[
                    { id: "", label: "All" },
                    { id: "sale", label: "Buy" },
                    { id: "rent", label: "Rent" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPurpose(p.id)}
                      className={`py-1.5 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                        purpose === p.id
                          ? "bg-[#5D5839] text-white shadow-xs"
                          : "text-[#767262] hover:text-[#1F1E19]"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1.5">
                  City Hub
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-[#E2DBD1] text-xs focus:outline-none focus:border-[#5D5839] font-sans bg-[#F8F3ED]"
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
                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1.5">
                  Asset Classification
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-[#E2DBD1] text-xs focus:outline-none focus:border-[#5D5839] font-sans bg-[#F8F3ED]"
                >
                  <option value="">All Asset Types</option>
                  <option value="House">House / Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Commercial Plot">Commercial Plot</option>
                  <option value="Residential Plot">Residential Plot</option>
                  <option value="Office">Office Floor</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1.5">
                  Price Boundary (PKR)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min PKR"
                    className="w-full px-3 py-2 rounded-sm border border-[#E2DBD1] text-xs focus:outline-none focus:border-[#5D5839] font-sans bg-[#F8F3ED]"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max PKR"
                    className="w-full px-3 py-2 rounded-sm border border-[#E2DBD1] text-xs focus:outline-none focus:border-[#5D5839] font-sans bg-[#F8F3ED]"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1F1E19] mb-1.5">
                  Bedrooms
                </label>
                <div className="flex gap-1">
                  {["", "1", "2", "3", "4", "5"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBedrooms(b)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-sm border transition-all cursor-pointer ${
                        bedrooms === b
                          ? "bg-[#5D5839] border-[#5D5839] text-white shadow-xs"
                          : "border-[#E2DBD1] text-[#767262] hover:bg-[#F8F3ED]"
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
                  className="w-full py-2.5 rounded-sm bg-[#5D5839] text-white font-sans font-semibold text-xs uppercase tracking-wider lg:hidden shadow-xs cursor-pointer"
                >
                  Apply Filters
                </button>
              )}
            </div>
          </aside>

          {/* Properties Grid */}
          <main className="flex-1">
            {/* Control Bar */}
            <div className="bg-white rounded-sm border border-[#E2DBD1] p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1F1E19]">
                <span className="font-serif italic text-base text-[#5D5839] mr-1">{properties.length}</span>{" "}
                Verified Residences Available
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#767262]">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-2.5 py-1 rounded-sm border border-[#E2DBD1] text-xs font-medium bg-[#F8F3ED] focus:outline-none focus:border-[#5D5839]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>

                <div className="flex items-center bg-[#F8F3ED] p-1 rounded-sm border border-[#E2DBD1]">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1 rounded-sm transition-all ${
                      viewMode === "grid" ? "bg-[#5D5839] text-white shadow-xs" : "text-[#767262]"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1 rounded-sm transition-all ${
                      viewMode === "list" ? "bg-[#5D5839] text-white shadow-xs" : "text-[#767262]"
                    }`}
                    title="List View"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid / List */}
            {properties.length === 0 ? (
              <div className="bg-white rounded-sm border border-[#E2DBD1] p-12 text-center shadow-xs">
                <div className="w-14 h-14 bg-[#F8F3ED] text-[#5D5839] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E2DBD1]">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif text-[#1F1E19] mb-1">No Matching Properties Found</h3>
                <p className="text-xs text-[#767262] max-w-md mx-auto mb-6">
                  We could not find any properties matching your current filter criteria. Try loosening price boundaries or resetting search filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-sm bg-[#5D5839] text-white font-sans font-semibold text-xs uppercase tracking-wider shadow-xs hover:bg-[#4B472D] transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                }`}
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
    <Suspense fallback={<div className="min-h-screen bg-[#F8F3ED] p-8 text-xs text-[#767262]">Loading residences...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
