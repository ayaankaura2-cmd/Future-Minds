'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StudentProfilePage() {
  const [preferredName, setPreferredName] = useState('Jordan K.');
  const [accessibilityNotes, setAccessibilityNotes] = useState('Prefers high-contrast code examples and subtitles on all videos.');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="border-b border-[#D2E4F0] pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
          Student Profile &amp; Privacy
        </h1>
        <p className="text-xs sm:text-sm text-[#7187A8] mt-1">
          Manage your learning preferences. In accordance with child safeguarding rules, student profiles are private by default.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Profile preferences saved successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#10233F]">Preferred First Name</label>
              <input
                type="text"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D2E4F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#10233F]">Age Range</label>
              <input
                type="text"
                disabled
                value="Ages 13–15 (Junior High)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D2E4F0] text-sm bg-[#F4FAFF] text-[#7187A8] cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#10233F]">Active Enrolled Cohort</label>
              <input
                type="text"
                disabled
                value="AI Explorers: Virtual Cohort Alpha"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D2E4F0] text-sm bg-[#F4FAFF] text-[#7187A8] cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#10233F]">Linked Guardian Email</label>
              <input
                type="email"
                disabled
                value="alex.k.parent@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D2E4F0] text-sm bg-[#F4FAFF] text-[#7187A8] cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#10233F]">
              Learning Accessibility or Accommodation Needs
            </label>
            <textarea
              rows={3}
              value={accessibilityNotes}
              onChange={(e) => setAccessibilityNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D2E4F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2]"
            />
            <p className="text-[10px] text-[#7187A8]">
              Shared only with your assigned instructor to tailor code exercises.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-[#10233F] hover:bg-[#18365A] text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-colors"
            >
              Save Profile Preferences
            </button>
          </div>
        </form>
      </div>

      {/* Safeguarding Policy Callout */}
      <div className="bg-[#E5F4F6] border border-[#D2E4F0] rounded-2xl p-6 space-y-3 text-xs text-[#18365A]">
        <div className="flex items-center gap-2 font-bold text-[#10233F]">
          <Lock className="w-4 h-4 text-[#10233F]" />
          <span>Child Privacy by Design</span>
        </div>
        <p className="leading-relaxed">
          Future Minds strictly disallows public student directories, unsupervised direct messaging, or public friend lists. All student project publications require verified guardian approval.
        </p>
      </div>
    </div>
  );
}
