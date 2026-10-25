import React from 'react';
import Link from 'next/link';
import { KeyRound, ShieldCheck, Database, Terminal, CheckCircle2, Lock } from 'lucide-react';

export default function AdminBootstrapPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      <div className="border-b border-[#D2E4F0] pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
          Secure Administrator Bootstrap &amp; Database Architecture
        </h1>
        <p className="text-xs sm:text-sm text-[#7187A8] mt-1">
          Cryptographically grounded role assignment and Supabase migration documentation.
        </p>
      </div>

      {/* Security Principles */}
      <div className="bg-[#10233F] text-white rounded-2xl p-6 sm:p-8 border border-[#18365A] space-y-4">
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-[#19C6D2]" />
          <h2 className="text-lg font-bold text-white">Our Zero-Backdoor Security Rule</h2>
        </div>
        <p className="text-xs sm:text-sm text-[#E5F4F6] leading-relaxed">
          Future Minds rejects insecure practices such as hardcoding admin passwords into code, relying on obscure secret query parameters, or granting admin elevation purely based on an arbitrary email domain. The first administrator must be explicitly provisioned through database-level role assignment.
        </p>
      </div>

      {/* Step by Step Guide */}
      <div className="space-y-6">
        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-[#10233F] flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#1877F2] text-white font-mono text-xs flex items-center justify-center">1</span>
            <span>Configure Supabase Environment Variables</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
            Copy <code className="bg-[#E5F4F6] px-1.5 py-0.5 rounded font-mono text-xs">.env.example</code> to <code className="bg-[#E5F4F6] px-1.5 py-0.5 rounded font-mono text-xs">.env.local</code> in your project root and supply your credentials:
          </p>
          <div className="bg-[#10233F] text-[#F4FAFF] p-4 rounded-xl font-mono text-xs overflow-x-auto">
            <code>
              NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co<br />
              NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here<br />
              SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
            </code>
          </div>
        </div>

        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-[#10233F] flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#1877F2] text-white font-mono text-xs flex items-center justify-center">2</span>
            <span>Run SQL Schema Migrations</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
            Execute the complete database definition located at: <br />
            <code className="bg-[#E5F4F6] px-1.5 py-0.5 rounded font-mono text-xs">supabase/migrations/20261016_initial_schema.sql</code>.
          </p>
          <p className="text-xs text-[#7187A8]">
            This script provisions all 20+ relational tables, foreign key constraints, indexes, and comprehensive Row Level Security (RLS) policies.
          </p>
        </div>

        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-[#10233F] flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#1877F2] text-white font-mono text-xs flex items-center justify-center">3</span>
            <span>Bootstrap the First Administrator Account</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
            In your Supabase SQL Editor, run this script to assign the <code className="bg-[#E5F4F6] px-1.5 py-0.5 rounded font-mono text-xs">admin</code> role to your user profile:
          </p>
          <div className="bg-[#10233F] text-[#F4FAFF] p-4 rounded-xl font-mono text-xs overflow-x-auto space-y-1">
            <div className="text-[#7187A8]">-- Elevate user to administrator</div>
            <div>
              INSERT INTO user_roles (user_id, role)<br />
              SELECT id, &apos;admin&apos; FROM auth.users<br />
              WHERE email = &apos;your-email@futureminds.education&apos;<br />
              ON CONFLICT (user_id, role) DO NOTHING;
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-[#10233F] flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#1877F2] text-white font-mono text-xs flex items-center justify-center">4</span>
            <span>Verify Row Level Security Enforcement</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
            All tables enforce strict RLS:
          </p>
          <ul className="space-y-1.5 text-xs text-[#18365A] list-disc list-inside">
            <li><strong>Students</strong> can only read and update their own enrolled courses, submissions, and progress.</li>
            <li><strong>Guardians</strong> can access records associated with their verified child relationship.</li>
            <li><strong>Volunteers &amp; Instructors</strong> can record attendance and review assignments solely for assigned cohorts.</li>
            <li><strong>Administrators</strong> hold audited oversight across applications, curriculum publishing, and role provisioning.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
