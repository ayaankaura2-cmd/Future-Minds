import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Building2, 
  GraduationCap, 
  Laptop, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  Globe2,
  FileText
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'School & Community Partnerships | Future Minds',
  description: 'Collaborate with Future Minds to host AI and coding programs at your school, public library, or community center.',
};

export default function PartnersPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#E5F4F6] to-[#F4FAFF] py-16 border-b border-[#D2E4F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">Educational Alliances</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#10233F] tracking-tight">
            Bring Future Minds to Your Community
          </h1>
          <p className="text-base sm:text-lg text-[#18365A] max-w-2xl mx-auto leading-relaxed">
            We partner with schools, public libraries, and youth organizations to deliver turnkey, free AI and computer science education.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?subject=Partnership%20Proposal"
              className="inline-flex items-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all"
            >
              <span>Submit Partnership Inquiry</span>
              <ArrowRight className="w-4 h-4 text-[#19C6D2]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Collaboration Models */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">How We Collaborate</span>
          <h2 className="text-3xl font-black text-[#10233F] tracking-tight">
            Tailored Collaboration Models
          </h2>
          <p className="text-sm text-[#7187A8]">
            Flexible formats designed to integrate with your existing technology infrastructure and academic schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E5F4F6] text-[#10233F] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#1877F2]" />
              </div>
              <h3 className="text-xl font-black text-[#10233F]">Schools &amp; Districts</h3>
              <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
                Turnkey after-school coding clubs and AI exploration modules for middle and high schools, including slide decks and educator teacher guides.
              </p>
              <ul className="space-y-1.5 text-xs text-[#18365A] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#19C6D2]" />
                  <span>Aligns with CSTA standards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#19C6D2]" />
                  <span>Chromebook browser compatible</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E5F4F6] text-[#10233F] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#1877F2]" />
              </div>
              <h3 className="text-xl font-black text-[#10233F]">Public Libraries</h3>
              <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
                Weekend drop-in workshops and summer computational thinking bootcamps leveraging library public computer labs.
              </p>
              <ul className="space-y-1.5 text-xs text-[#18365A] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#19C6D2]" />
                  <span>Zero software installation required</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#19C6D2]" />
                  <span>Trained youth facilitators provided</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E5F4F6] text-[#10233F] flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-[#1877F2]" />
              </div>
              <h3 className="text-xl font-black text-[#10233F]">Youth Nonprofits</h3>
              <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
                Co-branded digital literacy cohorts for community centers, girl-in-STEM clubs, and underserved neighborhood centers.
              </p>
              <ul className="space-y-1.5 text-xs text-[#18365A] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#19C6D2]" />
                  <span>Customized scheduling &amp; cohorts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#19C6D2]" />
                  <span>Direct mentor matching</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment & Venue Support Guidelines */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10233F] text-white rounded-2xl p-8 sm:p-12 border border-[#18365A] space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#19C6D2]">Requirements</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              What Partners Provide &amp; What We Supply
            </h3>
            <p className="text-xs sm:text-sm text-[#E5F4F6]">
              A collaborative model designed to minimize administrative burden on educators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#18365A]/60 p-6 rounded-xl border border-[#18365A] space-y-3">
              <h4 className="text-base font-bold text-[#19C6D2]">What Future Minds Supplies:</h4>
              <ul className="space-y-2 text-xs text-[#F4FAFF]/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#19C6D2]" />
                  <span>Full digital curriculum, slides, and code sandboxes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#19C6D2]" />
                  <span>Trained, screened youth instructors and mentors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#19C6D2]" />
                  <span>Safeguarding protocols and parent consent forms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#19C6D2]" />
                  <span>Verifiable completion certificates for students</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#18365A]/60 p-6 rounded-xl border border-[#18365A] space-y-3">
              <h4 className="text-base font-bold text-[#19C6D2]">What Host Partners Provide:</h4>
              <ul className="space-y-2 text-xs text-[#F4FAFF]/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#19C6D2]" />
                  <span>Physical room/lab or supervised virtual meeting space</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#19C6D2]" />
                  <span>Internet-connected computers or student Chromebooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#19C6D2]" />
                  <span>Designated adult staff liaison on site</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#19C6D2]" />
                  <span>Promotion to students within the institution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-[#10233F]">
          Request a Partnership Proposal
        </h2>
        <p className="text-sm text-[#18365A] max-w-xl mx-auto">
          Contact our partnerships team to schedule an introductory call and receive our pilot curriculum overview packet.
        </p>
        <div className="pt-2">
          <Link
            href="/contact?subject=Partnership%20Proposal"
            className="inline-flex items-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            <span>Contact Partnership Team</span>
            <ArrowRight className="w-4 h-4 text-[#19C6D2]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
