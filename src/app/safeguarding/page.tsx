import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Users, 
  Eye, 
  FileText,
  Mail,
  Info
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Child Safeguarding Policy & Reporting | Future Minds',
  description: 'Future Minds child protection standards, mentor code of conduct, and urgent incident reporting protocols.',
};

export default function SafeguardingPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#E5F4F6] to-[#F4FAFF] py-16 border-b border-[#D2E4F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#10233F] text-[#19C6D2] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Priority Child Protection Policy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#10233F] tracking-tight">
            Child Safeguarding Commitments
          </h1>
          <p className="text-base sm:text-lg text-[#18365A] max-w-2xl mx-auto leading-relaxed">
            Our comprehensive framework to ensure every child learns in a secure, supervised, and respectful digital and physical learning environment.
          </p>
        </div>
      </section>

      {/* Draft Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E5F4F6] border-l-4 border-[#10233F] rounded-r-xl p-5 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-[#10233F] flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#18365A] space-y-1">
            <p className="font-bold text-[#10233F]">Draft Policy for Qualified Adult Review</p>
            <p>
              This document represents Future Minds&apos; operational safeguarding guidelines formulated for our pilot phase. It is published for review by parents, school administrators, and legal advisors and does not replace statutory mandatory reporting obligations in applicable local jurisdictions.
            </p>
          </div>
        </div>
      </section>

      {/* Core Safeguarding Pillars */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-[#10233F] tracking-tight">
            1. Supervised Virtual Classrooms
          </h2>
          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 text-sm text-[#18365A] leading-relaxed shadow-sm">
            <p>
              All online workshops and cohort sessions must adhere to our digital classroom rules:
            </p>
            <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm">
              <li><strong>Two-Adult Rule:</strong> Virtual classrooms must include at least two vetted facilitators or an adult coordinator whenever minor students are present.</li>
              <li><strong>Session Recordings:</strong> Group workshops are recorded for safety auditing and educational review. Recordings are stored privately on encrypted servers with restricted access.</li>
              <li><strong>No Unsupervised Private Channels:</strong> Mentors, volunteers, and adult staff are strictly prohibited from engaging in private 1-on-1 direct messaging, chat channels, or video calls with minor students outside of official, monitored group learning platforms.</li>
              <li><strong>Personal Contact Information:</strong> Volunteers and instructors must never request or share personal phone numbers, home addresses, or personal social media handles with minor students.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-[#10233F] tracking-tight">
            2. Verified Guardian Consent
          </h2>
          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 text-sm text-[#18365A] leading-relaxed shadow-sm">
            <p>
              Minors (students under 18 or the age of majority in their jurisdiction) cannot enroll without verified parental or legal guardian consent:
            </p>
            <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm">
              <li><strong>Direct Email Verification:</strong> Upon application submission, a verification token and summary of requested permissions is transmitted to the parent/guardian email address.</li>
              <li><strong>Curriculum Transparency:</strong> Guardians receive access to the full syllabus, instructor credentials, and session schedules prior to cohort commencement.</li>
              <li><strong>Consent Revocation:</strong> Parents may revoke consent, review stored student records, or withdraw their child from any program at any time by contacting our safeguarding desk.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-[#10233F] tracking-tight">
            3. Volunteer Screening &amp; Code of Conduct
          </h2>
          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 text-sm text-[#18365A] leading-relaxed shadow-sm">
            <p>
              Every individual serving as an instructor, teaching assistant, or mentor must complete our vetting process:
            </p>
            <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm">
              <li>Formal application review and interview by the volunteer coordinator.</li>
              <li>Criminal background check (Vulnerable Sector Check / regional equivalent) where mandated by law.</li>
              <li>Mandatory training on recognizing signs of abuse, cyberbullying, and inappropriate behavior.</li>
              <li>Signed agreement to the <em>Future Minds Volunteer Code of Conduct</em>.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-[#10233F] tracking-tight">
            4. Student Work &amp; Identity Protection
          </h2>
          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 text-sm text-[#18365A] leading-relaxed shadow-sm">
            <p>
              We safeguard student anonymity across all public showcases:
            </p>
            <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm">
              <li>Full legal names, schools, or geographic locations of minor students are never published on our public website.</li>
              <li>Student works are displayed using approved first-name pseudonyms (e.g. &quot;Devon K., Grade 8&quot;).</li>
              <li>Separate explicit guardian permission is required before any student photograph, video snippet, or voice recording is utilized for community reporting.</li>
            </ul>
          </div>
        </div>

        {/* Incident Reporting Protocol Box */}
        <div className="bg-[#10233F] text-white rounded-2xl p-8 sm:p-10 border border-[#18365A] space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-[#19C6D2]" />
            <div>
              <h3 className="text-2xl font-black text-white">Incident Reporting Protocol</h3>
              <p className="text-xs text-[#E5F4F6]">How to report a safety concern immediately</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#F4FAFF]/90 leading-relaxed">
            If you witness, suspect, or experience any inappropriate conduct, harassment, bullying, or boundary violations during any Future Minds session:
          </p>

          <div className="bg-[#18365A] p-4 rounded-xl space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#19C6D2]">
              <Mail className="w-4 h-4" />
              <span>Email: safeguarding@futureminds.education</span>
            </div>
            <p className="text-[#E5F4F6]">
              All reports are treated with strict confidentiality and investigated immediately by the Safeguarding Lead. If a child is in immediate physical danger, please contact local emergency authorities immediately.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
