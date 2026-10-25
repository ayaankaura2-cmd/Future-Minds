import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Clock, Users } from 'lucide-react';
import { RegistrationForm } from '@/components/registration/RegistrationForm';
import { LearningLevel } from '@/types/registration';

export const metadata: Metadata = {
  title: 'Student Registration | Future Minds',
  description:
    'Parent/guardian enrollment form for Future Minds weekly coding and AI classes. 100% free, student-led nonprofit education with Beginner, Intermediate, and Advanced tracks.',
};

function RegistrationPageContent({
  searchParams,
}: {
  searchParams: { level?: string };
}) {
  const initialLevel: LearningLevel =
    searchParams.level === 'intermediate'
      ? 'intermediate'
      : searchParams.level === 'advanced'
      ? 'advanced'
      : 'beginner';

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0b1a30] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>

      <RegistrationForm initialLevel={initialLevel} />

      {/* Trust & Safeguarding Footnote */}
      <div className="max-w-2xl mx-auto mt-8 text-center space-y-2 text-xs text-slate-400">
        <p>
          Future Minds is a registered student-led nonprofit educational initiative.
        </p>
        <p>
          Need assistance or have questions prior to submitting? Contact our admissions team at{' '}
          <a
            href="mailto:admissions@futureminds.org"
            className="text-[#0066FF] hover:underline"
          >
            admissions@futureminds.org
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default async function RegisterPage(props: {
  searchParams: Promise<{ level?: string }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-slate-500 font-medium">Loading registration form...</p>
          </div>
        </div>
      }
    >
      <RegistrationPageContent searchParams={searchParams} />
    </Suspense>
  );
}
