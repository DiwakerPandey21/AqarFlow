"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  Edit2,
  Archive,
  Eye,
  CheckCircle2,
  X,
  ExternalLink,
  MapPin,
  Maximize2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/db";
import { Property, PropertyStatus, User } from "@/lib/types";
import { formatPKR, formatArea, formatDate } from "@/lib/formatters";

export default function WorkspacePropertiesPage() {
  const { user, isAdmin } = useAuth();
  const [properties, setProperties] = useState<Property[]>(() => db.getProperties({ publicOnly: false }));
  const [agents, setAgents] = useState<User[]>(() => db.getUsers().filter((u) => u.status === "active"));
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    purpose: "sale",
    category: "residential",
    property_type: "House",
    price: 35000000,
    currency: "PKR",
    area_value: 10,
    area_unit: "Marla",
    bedrooms: 4,
    bathrooms: 4,
    address: "",
    city: "Islamabad",
    locality: "DHA Phase 2",
    amenities: "Solar Backup, 24/7 Security, Lawn, Servant Quarter",
    furnishing: "Unfurnished",
    construction_status: "Ready",
    possession_status: "Immediate",
    description: "",
    cover_image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    assigned_agent_id: "usr-agent-1"
  });

  const loadProperties = () => {
    const list = db.getProperties({ publicOnly: false });
    setProperties(list);
    setAgents(db.getUsers().filter((u) => u.status === "active"));
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isAdmin) return;

    const amenitiesList = formData.amenities
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    db.createProperty(
      {
        title: formData.title,
        purpose: formData.purpose as any,
        category: formData.category as any,
        property_type: formData.property_type as any,
        price: Number(formData.price),
        currency: "PKR",
        area_value: Number(formData.area_value),
        area_unit: formData.area_unit as any,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        address: formData.address,
        city: formData.city,
        locality: formData.locality,
        amenities: amenitiesList,
        furnishing: formData.furnishing as any,
        construction_status: formData.construction_status as any,
        possession_status: formData.possession_status as any,
        description: formData.description,
        cover_image: formData.cover_image,
        gallery_images: [formData.cover_image],
        status: "Available",
        is_featured: true,
        is_published: true,
        assigned_agent_id: formData.assigned_agent_id
      },
      user
    );

    setIsAddModalOpen(false);
    loadProperties();
  };

  const handleUpdateStatus = (id: string, newStatus: PropertyStatus) => {
    if (!user || !isAdmin) return;
    db.updateProperty(id, { status: newStatus }, user);
    loadProperties();
  };

  const handleArchiveProperty = (id: string) => {
    if (!user || !isAdmin) return;
    if (confirm("Are you sure you want to archive this property?")) {
      db.deleteProperty(id, user);
      loadProperties();
    }
  };

  // Filtered properties
  const filtered = properties.filter((p) => {
    if (statusFilter && p.status !== statusFilter) return false;
    if (purposeFilter && p.purpose !== purposeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.reference_code.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0D121F] p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl relative overflow-hidden transition-colors">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-500/30">
              Verified Real Estate Portfolio
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">• Capital Enclaves</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
            Curated Property Inventory
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Total of {properties.length} agency-managed units in Islamabad, Lahore, Karachi, and
            Rawalpindi with 100% CDA/LDA land registry verification.
          </p>
        </div>

        {isAdmin ? (
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white dark:bg-gradient-to-r dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 dark:text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-slate-950/10 dark:shadow-amber-500/20 hover:scale-[1.02] transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-amber-400 dark:text-slate-950" />
            <span>Create New Listing</span>
          </button>
        ) : (
          <span className="text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/30 px-3 py-1.5 rounded-xl">
            Agent Mode (View-only for inventory)
          </span>
        )}
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white dark:bg-[#0D121F] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 transition-colors">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, ref code (e.g. AQ-1001), locality, or city..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-sans"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none font-sans"
          >
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Under Offer">Under Offer</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={purposeFilter}
            onChange={(e) => setPurposeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none font-sans"
          >
            <option value="">All Purposes</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>
      </div>

      {/* Property Table */}
      <div className="bg-white dark:bg-[#0D121F] rounded-3xl border border-slate-200/90 dark:border-slate-800/80 shadow-xs dark:shadow-2xl overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Ref Code & Property</th>
                <th className="py-3.5 px-4">City / Locality</th>
                <th className="py-3.5 px-4">Price (PKR)</th>
                <th className="py-3.5 px-4">Size & Specs</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Assigned Agent</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-xs">
              {filtered.map((property) => (
                <tr key={property.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                  {/* Title & Ref */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                        <img
                          src={property.cover_image}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="max-w-xs">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-mono text-[10px] font-bold bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded text-amber-800 dark:text-amber-300">
                            {property.reference_code}
                          </span>
                          <span
                            className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                              property.purpose === "rent"
                                ? "bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/30"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700"
                            }`}
                          >
                            {property.purpose}
                          </span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white block truncate">
                          {property.title}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* City */}
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">{property.locality}</span>
                    <span className="text-slate-400 text-[11px]">{property.city}</span>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-amber-800 dark:text-amber-300 text-sm block">
                      {formatPKR(property.price)}
                    </span>
                    {property.purpose === "rent" && (
                      <span className="text-[10px] text-slate-400">/ month</span>
                    )}
                  </td>

                  {/* Size */}
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {formatArea(property.area_value, property.area_unit)}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {property.bedrooms ? `${property.bedrooms} Bed` : property.property_type}
                    </span>
                  </td>

                  {/* Status Dropdown / Badge */}
                  <td className="py-3.5 px-4">
                    {isAdmin ? (
                      <select
                        value={property.status}
                        onChange={(e) =>
                          handleUpdateStatus(property.id, e.target.value as PropertyStatus)
                        }
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                          property.status === "Available"
                            ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/30"
                            : property.status === "Under Offer"
                            ? "bg-purple-950/80 text-purple-300 border-purple-500/30"
                            : property.status === "Reserved"
                            ? "bg-amber-950/80 text-amber-300 border-amber-500/30"
                            : property.status === "Sold"
                            ? "bg-slate-800 text-slate-400 border-slate-700"
                            : "bg-rose-950/80 text-rose-300 border-rose-500/30"
                        }`}
                      >
                        <option value="Available">Available</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Under Offer">Under Offer</option>
                        <option value="Sold">Sold</option>
                        <option value="Rented">Rented</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    ) : (
                      <span className="font-bold text-slate-800 dark:text-slate-200">{property.status}</span>
                    )}
                  </td>

                  {/* Agent */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-700 dark:text-slate-300 block">
                      {property.assigned_agent?.full_name || "Unassigned"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/properties/${property.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => handleArchiveProperty(property.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                          title="Archive Listing"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Property Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0D121F] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-1">
              Private Portfolio Onboarding
            </span>
            <h3 className="text-xl font-serif font-bold text-slate-950 dark:text-white mb-1">Create New Property Listing</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-light">
              Enter comprehensive architectural specifications with Pakistan-first currency and area units.
            </p>

            <form onSubmit={handleCreateProperty} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 1 Kanal Modern Spanish Bungalow"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Purpose</label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Type</label>
                  <select
                    value={formData.property_type}
                    onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  >
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial Plot">Commercial Plot</option>
                    <option value="Residential Plot">Residential Plot</option>
                    <option value="Office">Office</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Area Unit</label>
                  <select
                    value={formData.area_unit}
                    onChange={(e) => setFormData({ ...formData, area_unit: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  >
                    <option value="Marla">Marla</option>
                    <option value="Kanal">Kanal</option>
                    <option value="Sq. Ft">Sq. Ft</option>
                    <option value="Sq. Yd">Sq. Yd</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Area Value</label>
                  <input
                    type="number"
                    required
                    value={formData.area_value}
                    onChange={(e) => setFormData({ ...formData, area_value: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">City *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                  >
                    <option value="Islamabad">Islamabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Locality / Sector *</label>
                  <input
                    type="text"
                    required
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    placeholder="e.g. DHA Phase 6"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned Agent</label>
                <select
                  value={formData.assigned_agent_id}
                  onChange={(e) => setFormData({ ...formData, assigned_agent_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-sans"
                >
                  {agents.map((ag) => (
                    <option key={ag.id} value={ag.id}>
                      {ag.full_name} ({ag.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Highlight key design attributes, title clearance, and fittings..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all text-center"
                >
                  Publish Property to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
