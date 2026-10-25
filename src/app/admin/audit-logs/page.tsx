'use client';

import React, { useState, useEffect } from 'react';
import { getAuditLogs } from '@/lib/db/repository';
import { AuditLog } from '@/types';
import { FileText, ShieldCheck, Clock, Search } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    getAuditLogs().then(data => setLogs(data));
  }, []);

  const filtered = logs.filter(l => 
    l.action.toLowerCase().includes(filterQuery.toLowerCase()) ||
    l.actorEmail.toLowerCase().includes(filterQuery.toLowerCase()) ||
    l.details.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="border-b border-[#D2E4F0] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
            Security &amp; Compliance Audit Logs
          </h1>
          <p className="text-xs sm:text-sm text-[#7187A8] mt-1">
            Immutable tracking of administrative actions, application status modifications, and consent events.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter logs by actor or action..."
            className="w-full px-3.5 py-2 text-xs border border-[#D2E4F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#19C6D2] bg-white"
          />
        </div>
      </div>

      <div className="bg-white border border-[#D2E4F0] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#F4FAFF] border-b border-[#D2E4F0] text-[#7187A8] uppercase tracking-wider text-[11px] font-sans">
                <th className="p-4 font-bold">Timestamp</th>
                <th className="p-4 font-bold">Action Event</th>
                <th className="p-4 font-bold">Actor</th>
                <th className="p-4 font-bold">Target</th>
                <th className="p-4 font-bold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4FAFF]">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-[#F4FAFF]/70 transition-colors">
                  <td className="p-4 text-[#7187A8] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'medium' })}
                  </td>
                  <td className="p-4">
                    <span className="bg-[#10233F] text-[#19C6D2] px-2 py-0.5 rounded text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-[#10233F] font-sans font-medium">
                    {log.actorEmail}
                  </td>
                  <td className="p-4 text-[#7187A8]">
                    {log.targetType}:{log.targetId}
                  </td>
                  <td className="p-4 text-[#18365A] font-sans">
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
