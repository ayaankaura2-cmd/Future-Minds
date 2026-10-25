'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Plus, 
  ExternalLink, 
  GitBranch, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export default function StudentProjectsPage() {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [impactTag, setImpactTag] = useState('Environmental Sustainability');
  const [repoUrl, setRepoUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const myProjects = [
    {
      id: 'my-proj-1',
      title: 'EcoSort AI: Smart Recycling Guide',
      program: 'AI Explorers (Cohort Alpha)',
      status: 'approved_showcase',
      description: 'An interactive web app that uses a webcam classifier to identify whether food packaging is recyclable or compostable.',
      impactTag: 'Environmental Sustainability',
      techStack: ['Teachable Machine', 'JavaScript', 'HTML5 Canvas'],
      demoUrl: 'https://example.com/demo/ecosort',
      githubUrl: 'https://github.com/example/ecosort',
      feedback: 'Approved for Public Showcase with guardian consent under pseudonym "Jordan K. (Grade 9)".'
    }
  ];

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowSubmitModal(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D2E4F0] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
            My Capstone Projects
          </h1>
          <p className="text-xs sm:text-sm text-[#7187A8] mt-1">
            Build and submit real projects solving community problems.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowSubmitModal(true)}
          className="inline-flex items-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#19C6D2]" />
          <span>New Project Submission</span>
        </button>
      </div>

      {submitted && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Your new project draft has been submitted to your cohort instructor for moderation!</span>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {myProjects.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-[#E5F4F6] text-[#10233F] px-2.5 py-1 rounded">
                  {p.impactTag}
                </span>
                <span className="text-xs text-[#7187A8] font-mono">
                  {p.program}
                </span>
              </div>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Published in Showcase
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#10233F]">{p.title}</h2>
              <p className="text-xs sm:text-sm text-[#18365A] mt-1 leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {p.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs font-mono bg-[#F4FAFF] border border-[#D2E4F0] text-[#10233F] px-2.5 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="bg-[#F4FAFF] p-3 rounded-xl border border-[#D2E4F0] text-xs text-[#18365A] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1877F2] flex-shrink-0 mt-0.5" />
              <span><strong>Moderation Note:</strong> {p.feedback}</span>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs font-bold">
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#1877F2] hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Live App
              </a>
              <Link
                href="/projects"
                className="text-[#7187A8] hover:text-[#10233F]"
              >
                View on Public Showcase &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D2E4F0] pb-3">
              <h3 className="text-xl font-bold text-[#10233F]">Submit Project for Review</h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-[#7187A8] hover:text-[#10233F] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#10233F]">Project Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. StudyFlash AI"
                  className="w-full px-3.5 py-2 border rounded-lg text-sm border-[#D2E4F0]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#10233F]">Community Impact Category</label>
                <select
                  value={impactTag}
                  onChange={(e) => setImpactTag(e.target.value)}
                  className="w-full px-3.5 py-2 border rounded-lg text-sm border-[#D2E4F0]"
                >
                  <option value="Environmental Sustainability">Environmental Sustainability</option>
                  <option value="Learning Accessibility">Learning Accessibility</option>
                  <option value="Community Accessibility">Community Accessibility</option>
                  <option value="Youth Civic Tech">Youth Civic Tech</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#10233F]">Project Description &amp; Ethics Summary</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What does your project do and what datasets did you evaluate?"
                  className="w-full px-3.5 py-2 border rounded-lg text-sm border-[#D2E4F0]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#10233F]">Code Repository or Live Demo URL</label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/... or https://..."
                  className="w-full px-3.5 py-2 border rounded-lg text-sm border-[#D2E4F0]"
                />
              </div>

              <div className="text-[11px] text-[#7187A8] bg-[#F4FAFF] p-3 rounded-lg">
                Minor student names are always anonymized to an approved pseudonym before public showcase display.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#7187A8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#10233F] text-white px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Submit for Moderation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
