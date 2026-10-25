import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { sampleTeamMembers } from '@/lib/db/mock-data';
import { 
  Users, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  Info,
  GraduationCap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Leadership & Advisors | Future Minds',
  description: 'Meet the team steering Future Minds educational programs, curriculum safety, and platform development.',
};

export default function TeamPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#E5F4F6] to-[#F4FAFF] py-16 border-b border-[#D2E4F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">Governance &amp; Mentorship</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#10233F] tracking-tight">
            Leadership &amp; Advisory Council
          </h1>
          <p className="text-base sm:text-lg text-[#18365A] max-w-2xl mx-auto leading-relaxed">
            Future Minds combines youth initiative with adult educational oversight, curriculum scrutiny, and strict child safeguarding.
          </p>
        </div>
      </section>

      {/* Honest Transparency Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E5F4F6] border-l-4 border-[#10233F] rounded-r-xl p-5 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-[#10233F] flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#18365A] space-y-1">
            <p className="font-bold text-[#10233F]">Radical Honesty Disclosure</p>
            <p>
              In accordance with our organizational integrity rules, the leadership roles listed below represent active pilot governance functions. We do not invent fictional executives or claim unverified credentials. As appointed mentors and advisors complete formal onboarding, their verified profiles are published via the admin governance console.
            </p>
          </div>
        </div>
      </section>

      {/* Team Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sampleTeamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-[#D2E4F0] rounded-2xl p-8 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#1877F2] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1877F2] bg-[#E5F4F6] px-2.5 py-1 rounded">
                    {member.category.replace('_', ' ')}
                  </span>
                  {member.isPlaceholder && (
                    <span className="text-[11px] font-mono text-[#7187A8] bg-[#F4FAFF] border border-[#D2E4F0] px-2 py-0.5 rounded">
                      Pilot Role Structure
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="w-14 h-14 rounded-2xl bg-[#10233F] text-[#19C6D2] flex items-center justify-center font-bold text-lg font-mono">
                    FM
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#10233F]">
                      {member.name}
                    </h2>
                    <p className="text-xs font-medium text-[#7187A8]">
                      {member.role}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#18365A] leading-relaxed pt-2">
                  {member.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D2E4F0] text-xs text-[#7187A8] flex items-center justify-between">
                <span>Governed under Safeguarding Policy</span>
                <Link
                  href="/admin"
                  className="text-[#1877F2] hover:underline font-semibold"
                >
                  Admin Manage
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the Team / Advisory Call */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10233F] text-white rounded-2xl p-8 sm:p-12 text-center space-y-4 border border-[#18365A]">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Interested in Joining our Advisory Council?
          </h2>
          <p className="text-sm text-[#E5F4F6] max-w-xl mx-auto leading-relaxed">
            We are actively seeking experienced computer science educators, ethics researchers, and youth organization leaders to advise our pilot curriculum.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?subject=Advisory%20Council%20Inquiry"
              className="inline-flex items-center gap-2 bg-[#19C6D2] hover:bg-white text-[#10233F] px-6 py-3 rounded-xl text-sm font-bold shadow-sm transition-all"
            >
              <span>Get in Touch with Governance</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
