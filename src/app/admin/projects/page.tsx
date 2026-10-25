'use client';

import React, { useState } from 'react';
import { sampleProjects } from '@/lib/db/mock-data';
import { ProjectShowcase } from '@/types';
import { approveProject } from '@/lib/db/repository';
import { CheckCircle2, ShieldCheck, ExternalLink, GitBranch, AlertTriangle } from 'lucide-react';

export default function AdminProjectModerationPage() {
  const [projects, setProjects] = useState<ProjectShowcase[]>([...sampleProjects]);
  const [successMsg, setSuccessMsg] = useState('');

  const handleApprove = async (id: string) => {
    const updated = await approveProject(id);
    if (updated) {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, isApproved: true } : p));
      setSuccessMsg(`Project "${updated.title}" approved for public showcase!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-[#D2E4F0] pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
          Project Moderation &amp; Safeguarding Queue
        </h1>
        <p className="text-xs sm:text-sm text-[#7187A8] mt-1">
          Review student capstone projects for minor privacy protection and ethical compliance before public publication.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Moderation Checklist */}
      <div className="bg-[#E5F4F6] border border-[#D2E4F0] rounded-2xl p-6 space-y-2 text-xs text-[#18365A]">
        <div className="flex items-center gap-2 font-bold text-[#10233F]">
          <ShieldCheck className="w-5 h-5 text-[#10233F]" />
          <span>Mandatory Moderation Rules:</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-[#18365A] text-xs">
          <li>Ensure no full real names, school names, or student faces appear without written guardian photo release.</li>
          <li>Verify that demo links and code repositories do not expose API secrets or private tokens.</li>
          <li>Confirm that training dataset sources and algorithmic ethics audits are cited in the project description.</li>
        </ul>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-[#E5F4F6] text-[#10233F] px-2.5 py-0.5 rounded">
                  {proj.impactTag}
                </span>
                <span className="text-xs text-[#7187A8] font-mono">
                  {proj.programName}
                </span>
              </div>

              <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                proj.isApproved ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {proj.isApproved ? '✓ Published on Website' : 'Awaiting Review'}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#10233F]">{proj.title}</h2>
              <div className="text-xs font-medium text-[#7187A8] mt-0.5">
                Pseudonym: <strong className="text-[#10233F]">{proj.studentPseudonym}</strong>
              </div>
              <p className="text-xs sm:text-sm text-[#18365A] mt-2 leading-relaxed">
                {proj.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {proj.techStack.map((tech, i) => (
                <span key={i} className="text-xs font-mono bg-[#F4FAFF] border border-[#D2E4F0] text-[#10233F] px-2 py-0.5 rounded">
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-[#D2E4F0] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-bold text-[#1877F2]">
                {proj.demoUrl && (
                  <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                    <ExternalLink className="w-3.5 h-3.5" /> Test Demo Link
                  </a>
                )}
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline text-[#7187A8]">
                    <GitBranch className="w-3.5 h-3.5" /> Source Code
                  </a>
                )}
              </div>

              {!proj.isApproved ? (
                <button
                  type="button"
                  onClick={() => handleApprove(proj.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors"
                >
                  ✓ Approve for Public Showcase
                </button>
              ) : (
                <span className="text-xs text-[#7187A8] font-medium">
                  Approved &amp; Visible in Showcase
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
