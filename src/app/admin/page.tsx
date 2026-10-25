import React from 'react';
import Link from 'next/link';
import { 
  getStudentApplications, 
  getVolunteerApplications, 
  getPrograms, 
  getProjectShowcases, 
  getAuditLogs,
  getImpactMetrics 
} from '@/lib/db/repository';
import { isSupabaseConfigured } from '@/lib/supabase';
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  Sparkles,
  AlertCircle,
  FileText
} from 'lucide-react';

export default async function AdminOverviewPage() {
  const studentApps = await getStudentApplications();
  const volunteerApps = await getVolunteerApplications();
  const programs = await getPrograms();
  const allProjects = await getProjectShowcases(false);
  const auditLogs = await getAuditLogs();
  const metrics = await getImpactMetrics();
  const supabaseActive = isSupabaseConfigured();

  const pendingStudent = studentApps.filter(a => a.status === 'pending' || a.status === 'under_review').length;
  const pendingVolunteers = volunteerApps.filter(a => a.status === 'pending' || a.status === 'under_review').length;
  const pendingProjects = allProjects.filter(p => !p.isApproved).length;

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#1877F2] uppercase bg-[#E5F4F6] px-2.5 py-0.5 rounded">
              Administration Center
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              supabaseActive 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {supabaseActive ? '🟢 Supabase PostgreSQL Connected' : '🟡 Resilient Local Dev Store Active'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
            Platform Overview &amp; Control
          </h1>
          <p className="text-xs sm:text-sm text-[#7187A8]">
            Manage student applications, volunteer reviews, curriculum publishing, and student safeguarding audits.
          </p>
        </div>

        <Link
          href="/admin/applications"
          className="bg-[#10233F] hover:bg-[#18365A] text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-2 flex-shrink-0"
        >
          <span>Review Applications</span>
          <ArrowRight className="w-4 h-4 text-[#19C6D2]" />
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7187A8]">
            <span className="font-bold uppercase tracking-wider">Student Applications</span>
            <Users className="w-4 h-4 text-[#1877F2]" />
          </div>
          <div className="text-3xl font-black text-[#10233F] font-mono">
            {studentApps.length}
          </div>
          <div className="text-xs font-medium text-amber-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>{pendingStudent} pending review</span>
          </div>
        </div>

        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7187A8]">
            <span className="font-bold uppercase tracking-wider">Volunteer Applicants</span>
            <Users className="w-4 h-4 text-[#19C6D2]" />
          </div>
          <div className="text-3xl font-black text-[#10233F] font-mono">
            {volunteerApps.length}
          </div>
          <div className="text-xs font-medium text-amber-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>{pendingVolunteers} awaiting interview</span>
          </div>
        </div>

        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7187A8]">
            <span className="font-bold uppercase tracking-wider">Active Programs</span>
            <BookOpen className="w-4 h-4 text-[#1877F2]" />
          </div>
          <div className="text-3xl font-black text-[#10233F] font-mono">
            {programs.length}
          </div>
          <div className="text-xs font-medium text-emerald-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All pilot syllabi published</span>
          </div>
        </div>

        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7187A8]">
            <span className="font-bold uppercase tracking-wider">Showcase Moderation</span>
            <CheckCircle2 className="w-4 h-4 text-[#10233F]" />
          </div>
          <div className="text-3xl font-black text-[#10233F] font-mono">
            {allProjects.length}
          </div>
          <div className="text-xs font-medium text-emerald-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{allProjects.filter(p => p.isApproved).length} approved public</span>
          </div>
        </div>
      </div>

      {/* Split Grid: Recent Applications & Audit Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Student & Volunteer Submissions */}
        <div className="lg:col-span-7 bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#D2E4F0] pb-4">
            <h2 className="text-lg font-black text-[#10233F]">
              Recent Student Applications
            </h2>
            <Link
              href="/admin/applications"
              className="text-xs font-bold text-[#1877F2] hover:underline"
            >
              View All ({studentApps.length}) &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {studentApps.slice(0, 4).map((app) => (
              <div
                key={app.id}
                className="p-4 bg-[#F4FAFF] border border-[#D2E4F0] rounded-xl flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-[#10233F] text-sm">
                    {app.preferredName} ({app.gradeLevel})
                  </div>
                  <div className="text-[#7187A8]">
                    Program: <span className="text-[#10233F] font-medium">{app.programPreference}</span> &bull; Guardian: {app.guardianEmail}
                  </div>
                  <div className="font-mono text-[11px] text-[#1877F2]">
                    Ref: {app.referenceNumber}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
                    app.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    app.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {app.status.replace('_', ' ')}
                  </span>
                  <Link
                    href={`/admin/applications?ref=${app.referenceNumber}`}
                    className="text-[11px] font-bold text-[#1877F2] hover:underline"
                  >
                    Review Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Immutable Audit Log Snippet */}
        <div className="lg:col-span-5 bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#D2E4F0] pb-4">
            <h2 className="text-lg font-black text-[#10233F] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1877F2]" />
              <span>Security Audit Trail</span>
            </h2>
            <Link
              href="/admin/audit-logs"
              className="text-xs font-bold text-[#1877F2] hover:underline"
            >
              Full Log &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="p-3 bg-[#F4FAFF] border border-[#D2E4F0] rounded-lg text-xs space-y-1 font-mono"
              >
                <div className="flex items-center justify-between text-[#7187A8] text-[10px]">
                  <span className="font-bold text-[#10233F]">{log.action}</span>
                  <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="text-[#18365A] text-[11px] font-sans">
                  {log.details}
                </div>
                <div className="text-[10px] text-[#7187A8]">
                  Actor: {log.actorEmail}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
