import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getImpactMetrics } from '@/lib/db/repository';
import { 
  BarChart3, 
  Users, 
  GraduationCap, 
  Code, 
  Building2, 
  Clock, 
  ShieldCheck, 
  Info,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verified Impact Metrics | Future Minds',
  description: 'Explore live, verified data on Future Minds pilot cohorts, student completions, and community participation.',
};

export default async function ImpactPage() {
  const metrics = await getImpactMetrics();

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#E5F4F6] to-[#F4FAFF] py-16 border-b border-[#D2E4F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">Accountability &amp; Transparency</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#10233F] tracking-tight">
            Verified Pilot Impact
          </h1>
          <p className="text-base sm:text-lg text-[#18365A] max-w-2xl mx-auto leading-relaxed">
            We believe in radical data honesty. All metrics on this page reflect current live database records from our pilot programs.
          </p>
        </div>
      </section>

      {/* Provenance Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E5F4F6] border-l-4 border-[#10233F] rounded-r-xl p-5 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-[#10233F] flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#18365A] space-y-1">
            <p className="font-bold text-[#10233F]">Data Provenance Notice</p>
            <p>
              Future Minds is currently running in its inaugural pilot cohort phase. We do not inflate numbers with hypothetical projections or unverified estimates. These figures are calculated directly from active enrollment registries, moderated project submissions, and verified mentor onboarding.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-8 space-y-2 shadow-sm text-center">
            <div className="text-4xl sm:text-5xl font-black text-[#10233F] font-mono">
              {metrics.studentsEnrolled}
            </div>
            <div className="text-sm font-bold text-[#1877F2] uppercase tracking-wider">Students Enrolled</div>
            <p className="text-xs text-[#7187A8]">Participating in pilot curriculum</p>
          </div>

          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-8 space-y-2 shadow-sm text-center">
            <div className="text-4xl sm:text-5xl font-black text-[#10233F] font-mono">
              {metrics.programsCompleted}
            </div>
            <div className="text-sm font-bold text-[#1877F2] uppercase tracking-wider">Educational Tracks</div>
            <p className="text-xs text-[#7187A8]">Active hands-on curriculum modules</p>
          </div>

          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-8 space-y-2 shadow-sm text-center">
            <div className="text-4xl sm:text-5xl font-black text-[#10233F] font-mono">
              {metrics.projectsCompleted}
            </div>
            <div className="text-sm font-bold text-[#1877F2] uppercase tracking-wider">Projects Built</div>
            <p className="text-xs text-[#7187A8]">Approved community capstones</p>
          </div>

          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-8 space-y-2 shadow-sm text-center">
            <div className="text-4xl sm:text-5xl font-black text-[#10233F] font-mono">
              {metrics.activeVolunteers}
            </div>
            <div className="text-sm font-bold text-[#1877F2] uppercase tracking-wider">Active Mentors</div>
            <p className="text-xs text-[#7187A8]">Screened instructors &amp; TAs</p>
          </div>

          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-8 space-y-2 shadow-sm text-center">
            <div className="text-4xl sm:text-5xl font-black text-[#10233F] font-mono">
              {metrics.partnerOrganizations}
            </div>
            <div className="text-sm font-bold text-[#1877F2] uppercase tracking-wider">Community Partners</div>
            <p className="text-xs text-[#7187A8]">Schools, libraries &amp; youth centers</p>
          </div>

          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-8 space-y-2 shadow-sm text-center">
            <div className="text-4xl sm:text-5xl font-black text-[#10233F] font-mono">
              {metrics.hoursOfInstruction}
            </div>
            <div className="text-sm font-bold text-[#1877F2] uppercase tracking-wider">Hours of Instruction</div>
            <p className="text-xs text-[#7187A8]">Supervised group learning delivered</p>
          </div>
        </div>
      </section>

      {/* Pilot Milestones Timeline */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-black text-[#10233F] tracking-tight">
          Pilot Program Milestones
        </h2>

        <div className="space-y-4">
          <div className="bg-white border border-[#D2E4F0] rounded-xl p-5 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#10233F] text-[#19C6D2] flex items-center justify-center font-bold text-xs flex-shrink-0">
              Q1
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#10233F]">Curriculum Architecture &amp; Ethics Sandbox Completed</h3>
              <p className="text-xs text-[#7187A8] mt-0.5">Developed core syllabi for AI Explorers, Code Creators, and Python Foundations with child-safety sandboxing.</p>
            </div>
          </div>

          <div className="bg-white border border-[#D2E4F0] rounded-xl p-5 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              Q2
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#10233F]">Inaugural Virtual Pilot Cohorts Launched</h3>
              <p className="text-xs text-[#7187A8] mt-0.5">Enrolled initial students across North America with adult-supervised digital classrooms and guardian verification.</p>
            </div>
          </div>

          <div className="bg-white border border-[#D2E4F0] rounded-xl p-5 flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#19C6D2] text-[#10233F] flex items-center justify-center font-bold text-xs flex-shrink-0">
              Q3
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#10233F]">Student Capstone Showcase &amp; Community Expansion</h3>
              <p className="text-xs text-[#7187A8] mt-0.5">Showcase of 68 student-built AI social impact projects with open-source publication and library partnerships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4">
        <Link
          href="/apply/student"
          className="inline-flex items-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all"
        >
          <span>Be Part of Our Next Pilot Cohort</span>
          <ArrowRight className="w-4 h-4 text-[#19C6D2]" />
        </Link>
      </section>
    </div>
  );
}
