"use client";

import React, { useState, useEffect } from "react";
import { History, ShieldCheck, Search, Filter, Clock, UserCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/db";
import { AuditLog } from "@/lib/types";
import { formatDateTime } from "@/lib/formatters";

export default function WorkspaceAuditLogsPage() {
  const { user, isAdmin } = useAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const loadLogs = () => {
    const list = db.getAuditLogs();
    setLogs(list);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  if (!isAdmin) {
    return (
      <div className="bg-white dark:bg-[#0D121F] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-xs max-w-md mx-auto my-12 text-slate-900 dark:text-white">
        <ShieldCheck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Restricted Access</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Only Agency Administrators are permitted to view the institutional system audit trail.
        </p>
      </div>
    );
  }

  const filtered = logs.filter((log) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        log.actor_name.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        (log.details && log.details.toLowerCase().includes(q)) ||
        log.entity_type.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0D121F] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-xs dark:shadow-2xl relative overflow-hidden text-slate-900 dark:text-white transition-colors">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-500/30 px-3 py-1 rounded-full">
              Governance & Security
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Immutable Audit Trail</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 dark:text-white tracking-tight">
            Institutional Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl font-light">
            Chronological record of status changes, user actions, deal milestones, and property updates.
          </p>
        </div>

        <div className="text-xs font-mono font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 px-3.5 py-2 rounded-xl">
          {logs.length} Logged Events
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white dark:bg-[#0D121F] p-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xs dark:shadow-xl transition-colors">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audit events by actor, action name, or details..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all font-sans"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white dark:bg-[#0D121F] rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-xs dark:shadow-2xl overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-4 text-amber-700 dark:text-amber-300/90 font-mono whitespace-nowrap">
                    {formatDateTime(log.created_at)}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-950 dark:text-white whitespace-nowrap">
                    {log.actor_name}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-medium">
                    {log.entity_type} ({log.entity_id})
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 max-w-md">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
