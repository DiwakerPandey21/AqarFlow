"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Building2,
  Users,
  Calendar,
  DollarSign,
  Shield,
  Home,
  Plus,
  KeyRound,
  Wrench,
  FileText,
  X,
  ArrowRight,
  Sparkles,
  Command
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/db";
import { formatPKR } from "@/lib/formatters";

interface CommandItem {
  id: string;
  category: "Navigation" | "Action" | "Property" | "Account";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { user, switchUser } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global shortcut listener: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Construct items
  const properties = db.getProperties({ publicOnly: false });

  const defaultItems: CommandItem[] = [
    // Navigation
    {
      id: "nav-workspace",
      category: "Navigation",
      title: "Workspace Dashboard",
      subtitle: "Executive KPIs, sales metrics & funnel",
      icon: <Building2 className="w-4 h-4 text-blue-500" />,
      shortcut: "G W",
      action: () => router.push("/workspace")
    },
    {
      id: "nav-leads",
      category: "Navigation",
      title: "Leads CRM & Pipeline",
      subtitle: "Interactive Kanban board & customer timelines",
      icon: <Users className="w-4 h-4 text-indigo-500" />,
      shortcut: "G L",
      action: () => router.push("/workspace/leads")
    },
    {
      id: "nav-rentals",
      category: "Navigation",
      title: "Rental Operations & Leases",
      subtitle: "Tenant lease agreements & rent collection ledgers",
      icon: <KeyRound className="w-4 h-4 text-emerald-500" />,
      shortcut: "G R",
      action: () => router.push("/workspace/rentals")
    },
    {
      id: "nav-maintenance",
      category: "Navigation",
      title: "Maintenance Work Orders",
      subtitle: "Repair dispatch, contractor allocation & cost tracking",
      icon: <Wrench className="w-4 h-4 text-amber-500" />,
      shortcut: "G M",
      action: () => router.push("/workspace/maintenance")
    },
    {
      id: "nav-properties-workspace",
      category: "Navigation",
      title: "Property Inventory Manager",
      subtitle: "Manage agency listings, pricing & unit statuses",
      icon: <Building2 className="w-4 h-4 text-purple-500" />,
      shortcut: "G P",
      action: () => router.push("/workspace/properties")
    },
    {
      id: "nav-visits",
      category: "Navigation",
      title: "Visits & Appointments",
      subtitle: "Site inspection calendar with collision engine",
      icon: <Calendar className="w-4 h-4 text-rose-500" />,
      shortcut: "G V",
      action: () => router.push("/workspace/visits")
    },
    {
      id: "nav-deals",
      category: "Navigation",
      title: "Deals & Commission Pipeline",
      subtitle: "Transaction stages & printable receipts",
      icon: <DollarSign className="w-4 h-4 text-teal-500" />,
      shortcut: "G D",
      action: () => router.push("/workspace/deals")
    },
    {
      id: "nav-public-home",
      category: "Navigation",
      title: "Public Discovery Portal",
      subtitle: "Client-facing homepage with hero search",
      icon: <Home className="w-4 h-4 text-slate-500" />,
      shortcut: "G H",
      action: () => router.push("/")
    },

    // Actions
    {
      id: "act-new-property",
      category: "Action",
      title: "Add New Property Listing",
      subtitle: "Publish a residential, commercial, or plot inventory",
      icon: <Plus className="w-4 h-4 text-blue-600" />,
      action: () => router.push("/workspace/properties")
    },
    {
      id: "act-new-lease",
      category: "Action",
      title: "Draft New Lease Agreement",
      subtitle: "Register tenant, landlord, rent amount & schedule",
      icon: <FileText className="w-4 h-4 text-emerald-600" />,
      action: () => router.push("/workspace/rentals")
    },
    {
      id: "act-new-maint",
      category: "Action",
      title: "Dispatch Maintenance Work Order",
      subtitle: "Report repair issue and assign approved contractor",
      icon: <Wrench className="w-4 h-4 text-amber-600" />,
      action: () => router.push("/workspace/maintenance")
    },

    // Account Switcher
    {
      id: "acc-admin",
      category: "Account",
      title: "Switch to Salman Tariq (Agency Admin)",
      subtitle: "Full operational access across all listings & finances",
      icon: <Shield className="w-4 h-4 text-blue-600" />,
      action: () => switchUser("agency_admin")
    },
    {
      id: "acc-agent",
      category: "Account",
      title: "Switch to Ayesha Khan (Real Estate Agent)",
      subtitle: "Scoped agent view for assigned clients & pipeline",
      icon: <Users className="w-4 h-4 text-purple-600" />,
      action: () => switchUser("agent")
    }
  ];

  // Property matches
  const propertyItems: CommandItem[] = properties.map((p) => ({
    id: `prop-${p.id}`,
    category: "Property",
    title: p.title,
    subtitle: `${p.reference_code} • ${p.locality}, ${p.city} • ${formatPKR(p.price)}`,
    icon: <Building2 className="w-4 h-4 text-slate-400" />,
    action: () => router.push(`/properties/${p.slug}`)
  }));

  const allItems = [...defaultItems, ...propertyItems];

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : defaultItems;

  const handleSelect = (item: CommandItem) => {
    item.action();
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white/95 rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-150 flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, page, or search property (e.g. 'Leases', 'F-8', 'Admin')..."
            className="w-full bg-transparent border-0 outline-hidden text-sm text-slate-900 placeholder:text-slate-400 font-sans"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
            ESC
          </kbd>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="ml-2 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400 font-sans">
              No matching commands or properties found for &quot;{query}&quot;.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? "bg-blue-50/90 text-blue-900" : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-100 text-slate-500">
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-xs text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {item.shortcut && (
                      <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200">
                        {item.shortcut}
                      </kbd>
                    )}
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${
                        isSelected ? "text-blue-600 opacity-100" : "opacity-0"
                      } transition-opacity`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between font-sans">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-600 font-medium">
            <Command className="w-3 h-3" />
            <span>AqarFlow Command Center</span>
          </div>
        </div>
      </div>
    </div>
  );
}
