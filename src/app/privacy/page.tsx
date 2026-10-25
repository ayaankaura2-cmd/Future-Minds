import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, ArrowLeft, Lock, Eye, Trash2, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Privacy & Safeguarding | Future Minds',
  description: 'How Future Minds protects student and guardian data with strict data minimization principles.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-white text-[#0b1a30] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0b1a30] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] block mb-2">
            Data Protection &amp; Child Safety
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a30] tracking-tight">
            Student Privacy &amp; Data Safeguarding
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Future Minds is a student-led nonprofit. We collect only what is strictly necessary to run weekly educational classes safely.
          </p>
        </div>

        <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5 text-xs sm:text-sm text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#0b1a30]">
            <ShieldCheck className="w-5 h-5 text-[#0066FF]" />
            <span>Data Minimization Commitment</span>
          </div>
          <p className="leading-relaxed">
            In compliance with child privacy best practices (including COPPA in the United States and global youth privacy frameworks), we strictly limit the collection of personal information from minors.
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-3 shadow-xs">
            <h2 className="text-lg font-bold text-[#0b1a30]">1. What We Collect on Registration</h2>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li><strong>Student First Name:</strong> Used solely so mentors can address students respectfully during live sessions. We never collect minor surnames.</li>
              <li><strong>Student Age &amp; Country:</strong> Used to confirm eligibility (ages 8–17) and match students with cohort time zones.</li>
              <li><strong>Parent / Guardian Name &amp; Contact:</strong> Guardian name, email address, and optional phone number. All communications go through the authorized guardian.</li>
              <li><strong>Learning Placement &amp; Experience:</strong> Beginner, Intermediate, or Advanced track selection and coding background to build well-balanced groups.</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-3 shadow-xs">
            <h2 className="text-lg font-bold text-[#0b1a30]">2. What We NEVER Collect</h2>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>We <strong>never</strong> ask for home street addresses or postal codes.</li>
              <li>We <strong>never</strong> ask for school names, student ID numbers, or government IDs.</li>
              <li>We <strong>never</strong> ask for passwords or credentials to third-party accounts.</li>
              <li>We <strong>never</strong> ask for credit cards, bank accounts, or financial details. Future Minds is 100% free.</li>
              <li>We <strong>never</strong> sell, rent, or trade student or family contact information to third parties or advertisers.</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-3 shadow-xs">
            <h2 className="text-lg font-bold text-[#0b1a30]">3. Storage, Security, &amp; Row Level Security</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Registrations are stored in an encrypted database protected by PostgreSQL Row Level Security (RLS). Public visitors cannot query or inspect registration records. Only verified nonprofit administrative accounts and backend servers have access to registration entries.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-3 shadow-xs">
            <h2 className="text-lg font-bold text-[#0b1a30]">4. Guardian Rights &amp; Data Removal</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Parents and guardians retain full control over their family’s data. You may request to review, update, or permanently delete your student&apos;s registration information at any time by sending an email from your registered guardian address to{' '}
              <a href="mailto:admissions@futureminds.org" className="text-[#0066FF] font-semibold hover:underline">
                admissions@futureminds.org
              </a>. Requests are honored within 48 hours.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
