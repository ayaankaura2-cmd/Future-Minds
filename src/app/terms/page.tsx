import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FileText, Info, Scale, CheckCircle2, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Participation (Draft) | Future Minds',
  description: 'Terms governing student participation, volunteer mentorship, and intellectual property in Future Minds pilot programs.',
};

export default function TermsPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#E5F4F6] to-[#F4FAFF] py-16 border-b border-[#D2E4F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">Community Standards</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#10233F] tracking-tight">
            Terms of Participation (Draft)
          </h1>
          <p className="text-base sm:text-lg text-[#18365A] max-w-2xl mx-auto leading-relaxed">
            Guidelines and expectations for students, guardians, volunteers, and partnering organizations.
          </p>
        </div>
      </section>

      {/* Draft Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E5F4F6] border-l-4 border-[#10233F] rounded-r-xl p-5 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-[#10233F] flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#18365A] space-y-1">
            <p className="font-bold text-[#10233F]">Notice Regarding Legal Status</p>
            <p>
              These Terms of Participation are a draft prepared for pilot operations and qualified adult review. By registering for or participating in any Future Minds program, students, guardians, and volunteers agree to these community standards.
            </p>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-[#18365A] leading-relaxed">
        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-[#10233F]">1. Pilot Program Nature</h2>
          <p>
            Future Minds educational tracks are currently offered as structured pilot programs. While our curriculum is rigorous and pedagogical standards are strictly maintained, cohorts are subject to schedule adjustments, continuous curriculum iteration, and capacity limits.
          </p>
        </div>

        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-[#10233F]">2. Student Code of Conduct &amp; Academic Integrity</h2>
          <p>
            All participants are expected to maintain an encouraging, inclusive learning environment:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm">
            <li><strong>Respect:</strong> Harassment, bullying, hate speech, or derogatory remarks regarding race, gender, nationality, or skill level result in immediate dismissal from the cohort.</li>
            <li><strong>Responsible AI Use:</strong> Students must practice intellectual honesty. When utilizing generative AI tools to assist in coding or writing, students must explicitly cite and explain the AI&apos;s contribution. Simply copying and pasting code without understanding its operation violates our core educational purpose.</li>
            <li><strong>Safe Sharing:</strong> Students must never share private contact details, home addresses, or passwords in digital classrooms or peer project comments.</li>
          </ul>
        </div>

        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-[#10233F]">3. Intellectual Property of Student Work</h2>
          <p>
            Students retain 100% full intellectual property ownership of the code, digital art, models, and projects they build during Future Minds programs. Future Minds does not claim ownership over student creations. By submitting a project for the public showcase, the student and guardian grant Future Minds a non-exclusive license to display the project under the student&apos;s approved pseudonym for educational showcase purposes.
          </p>
        </div>

        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-[#10233F]">4. Disclaimers &amp; Limitation of Liability</h2>
          <p>
            Future Minds provides educational materials and workshops on an &quot;as-is&quot; basis. We do not warrant that our code sandboxes or third-party tools will operate uninterrupted or error-free. To the maximum extent permitted by applicable law, Future Minds and its volunteers shall not be liable for indirect or consequential damages resulting from platform participation.
          </p>
        </div>
      </section>
    </div>
  );
}
