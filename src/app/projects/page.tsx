'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { sampleProjects } from '@/lib/db/mock-data';
import { 
  Sparkles, 
  ExternalLink, 
  GitBranch, 
  ShieldCheck, 
  CheckCircle2, 
  Filter, 
  ArrowRight,
  Code2
} from 'lucide-react';

export default function ProjectsShowcasePage() {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const tags = ['all', 'Environmental Sustainability', 'Learning Accessibility', 'Community Accessibility'];

  const filtered = selectedTag === 'all' 
    ? sampleProjects 
    : sampleProjects.filter(p => p.impactTag === selectedTag);

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#E5F4F6] to-[#F4FAFF] py-16 border-b border-[#D2E4F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">Student Showcase</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#10233F] tracking-tight">
            Approved Pilot Projects
          </h1>
          <p className="text-base sm:text-lg text-[#18365A] max-w-2xl mx-auto leading-relaxed">
            Real software, machine learning experiments, and accessibility tools built by students in Future Minds pilot cohorts.
          </p>
        </div>
      </section>

      {/* Safety & Moderation Disclosure Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E5F4F6]/70 border border-[#D2E4F0] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#18365A]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#10233F] flex-shrink-0" />
            <span>
              <strong>Minor Privacy Protected:</strong> All featured works use guardian-approved pseudonyms. Every project undergoes instructor review and an algorithmic ethics audit before publication.
            </span>
          </div>
          <Link
            href="/safeguarding"
            className="font-bold text-[#1877F2] hover:underline flex-shrink-0"
          >
            Review Moderation Standards &rarr;
          </Link>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-[#D2E4F0] pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7187A8] mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors ${
                selectedTag === tag
                  ? 'bg-[#10233F] text-white'
                  : 'bg-white text-[#18365A] hover:bg-[#E5F4F6] border border-[#D2E4F0]'
              }`}
            >
              {tag === 'all' ? 'All Projects' : tag}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-[#D2E4F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-[#E5F4F6] text-[#10233F] px-2.5 py-0.5 rounded">
                    {proj.impactTag}
                  </span>
                  <span className="text-xs font-mono text-[#7187A8]">
                    {proj.programName}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-[#10233F] tracking-tight">
                    {proj.title}
                  </h2>
                  <div className="text-xs font-medium text-[#7187A8] mt-1">
                    Created by {proj.studentPseudonym}
                  </div>
                </div>

                <p className="text-sm text-[#18365A] leading-relaxed">
                  {proj.description}
                </p>

                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#7187A8] mb-2">Technologies Used:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono bg-[#F4FAFF] border border-[#D2E4F0] text-[#10233F] px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-[#F4FAFF] border-t border-[#D2E4F0] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#1877F2] hover:text-[#10233F] flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#7187A8] hover:text-[#10233F] flex items-center gap-1 transition-colors"
                    >
                      <GitBranch className="w-3.5 h-3.5" /> Source Code
                    </a>
                  )}
                </div>

                <span className="text-[11px] text-[#7187A8] font-mono">
                  Verified Pilot
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capstone Submission Callout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10233F] text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#18365A]">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Are you an enrolled student?
            </h3>
            <p className="text-xs sm:text-sm text-[#E5F4F6]">
              Submit your capstone code, demo link, and ethics checklist through the Student Learning Portal for instructor review.
            </p>
          </div>
          <Link
            href="/learn/projects"
            className="flex-shrink-0 bg-[#19C6D2] hover:bg-white text-[#10233F] font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Submit Project &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
