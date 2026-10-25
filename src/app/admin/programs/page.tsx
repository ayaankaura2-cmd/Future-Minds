'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { initialPrograms } from '@/lib/db/mock-data';
import { Program } from '@/types';
import { updateProgramStatus } from '@/lib/db/repository';
import { BookOpen, CheckCircle2, Clock, Plus, ExternalLink, ShieldCheck } from 'lucide-react';

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([...initialPrograms]);
  const [feedback, setFeedback] = useState('');

  const handleStatusToggle = async (id: string, currentStatus: Program['status']) => {
    const nextStatus = currentStatus === 'enrolling' ? 'planned' : 'enrolling';
    const updated = await updateProgramStatus(id, nextStatus);
    if (updated) {
      setPrograms(prev => prev.map(p => p.id === id ? { ...p, status: nextStatus } : p));
      setFeedback(`Program "${updated.title}" status changed to ${nextStatus}.`);
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D2E4F0] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
            Curriculum &amp; Program Control
          </h1>
          <p className="text-xs sm:text-sm text-[#7187A8] mt-1">
            Publish, unpublish, or archive educational tracks and pilot cohorts.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Program Management Cards */}
      <div className="space-y-4">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="bg-white border border-[#D2E4F0] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#1877F2] uppercase bg-[#E5F4F6] px-2.5 py-0.5 rounded">
                  {prog.level}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  prog.status === 'enrolling' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {prog.status === 'enrolling' ? '🟢 Live Enrollment Enabled' : '🟡 Planned / Pilot Preview'}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#10233F]">{prog.title}</h2>
              <p className="text-xs text-[#7187A8] max-w-2xl">{prog.tagline}</p>
              
              <div className="flex items-center gap-4 text-xs text-[#18365A] pt-1">
                <span>{prog.durationWeeks} Weeks</span>
                <span>&bull;</span>
                <span>{prog.syllabus.length} Modules</span>
                <span>&bull;</span>
                <span>{prog.deliveryMode.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href={`/programs/${prog.slug}`}
                className="text-xs font-bold text-[#1877F2] hover:underline flex items-center gap-1"
              >
                <span>View Public Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => handleStatusToggle(prog.id, prog.status)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  prog.status === 'enrolling'
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                    : 'bg-[#10233F] hover:bg-[#18365A] text-white'
                }`}
              >
                {prog.status === 'enrolling' ? 'Pause Enrollment' : 'Enable Enrollment'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
