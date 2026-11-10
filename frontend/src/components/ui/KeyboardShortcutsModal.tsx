"use client";

import React, { useState, useEffect } from "react";
import { Keyboard, X, Sparkles } from "lucide-react";

export function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const shortcuts = [
    {
      category: "Global Shortcuts",
      items: [
        { key: "Cmd + K / Ctrl + K", desc: "Open Command Palette & Global Search" },
        { key: "?", desc: "Open this Keyboard Shortcuts Guide" },
        { key: "ESC", desc: "Close any active modal or drawer" }
      ]
    },
    {
      category: "Direct Navigation (Press sequentially)",
      items: [
        { key: "G then W", desc: "Go to Workspace Dashboard" },
        { key: "G then L", desc: "Go to Leads CRM Pipeline" },
        { key: "G then R", desc: "Go to Rental Operations & Leases" },
        { key: "G then M", desc: "Go to Maintenance Work Orders" },
        { key: "G then P", desc: "Go to Property Listings" },
        { key: "G then V", desc: "Go to Visits Calendar" },
        { key: "G then D", desc: "Go to Deals & Commission" },
        { key: "G then H", desc: "Go to Public Homepage" }
      ]
    },
    {
      category: "Mobile & CRM Interaction",
      items: [
        { key: "Touch Drag", desc: "Drag lead cards directly across Kanban columns on mobile" },
        { key: "← / → Chevrons", desc: "1-Tap fast stage shift on any lead card" }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white/95 rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-400">Power user navigation for AqarFlow</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto font-sans">
          {shortcuts.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {section.category}
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span className="text-xs text-slate-700 font-medium">{item.desc}</span>
                    <kbd className="px-2 py-1 text-xs font-mono font-bold bg-white text-slate-800 rounded-lg border border-slate-200 shadow-2xs">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Tip: Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">?</kbd> anywhere to reopen</span>
          <span className="text-blue-600 font-medium">AqarFlow Efficiency Hub</span>
        </div>
      </div>
    </div>
  );
}
