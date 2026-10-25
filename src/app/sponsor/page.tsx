import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  HeartHandshake, 
  Sparkles, 
  Laptop, 
  Cloud, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sponsorship & Support | Future Minds',
  description: 'Support youth AI and computer science literacy through hardware grants, cloud compute credits, or cohort sponsorship.',
};

export default function SponsorPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#E5F4F6] to-[#F4FAFF] py-16 border-b border-[#D2E4F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">Empower Youth</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#10233F] tracking-tight">
            Support Future Minds
          </h1>
          <p className="text-base sm:text-lg text-[#18365A] max-w-2xl mx-auto leading-relaxed">
            Help us keep AI education accessible, ethical, and completely tuition-free for students from all backgrounds.
          </p>
        </div>
      </section>

      {/* Honest Legal Disclosure */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E5F4F6] border-l-4 border-[#10233F] rounded-r-xl p-5 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-[#10233F] flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#18365A] space-y-1">
            <p className="font-bold text-[#10233F]">Transparency &amp; Legal Status Notice</p>
            <p>
              Future Minds is currently operating as a youth-led educational initiative running pilot cohorts. We do not claim to be an incorporated 501(c)(3) or registered charity unless formally verified. Contributions are currently directed toward direct program expenses: student learning resources, cloud compute API credits, and hardware access grants.
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">Impact Areas</span>
          <h2 className="text-3xl font-black text-[#10233F] tracking-tight">
            High-Impact Sponsorship Opportunities
          </h2>
          <p className="text-sm text-[#7187A8]">
            Directly empower students by sponsoring critical technical resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E5F4F6] text-[#10233F] flex items-center justify-center">
                <Cloud className="w-5 h-5 text-[#1877F2]" />
              </div>
              <h3 className="text-xl font-black text-[#10233F]">Cloud &amp; API Credits</h3>
              <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
                Provide inference credits and sandbox hosting for students training vision models and exploring natural language processing.
              </p>
              <div className="pt-2 text-xs text-[#7187A8]">
                Covers sandbox environments for up to 100 learners per cohort.
              </div>
            </div>
            <Link
              href="/contact?subject=Cloud%20Compute%20Sponsorship"
              className="text-xs font-bold text-[#1877F2] hover:underline"
            >
              Inquire about Compute Grants &rarr;
            </Link>
          </div>

          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E5F4F6] text-[#10233F] flex items-center justify-center">
                <Laptop className="w-5 h-5 text-[#1877F2]" />
              </div>
              <h3 className="text-xl font-black text-[#10233F]">Hardware Access Fund</h3>
              <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
                Help supply refurbished laptops and Wi-Fi hotspot access to students who lack computer access at home.
              </p>
              <div className="pt-2 text-xs text-[#7187A8]">
                Enables underserved students to join virtual evening cohorts.
              </div>
            </div>
            <Link
              href="/contact?subject=Hardware%20Fund%20Support"
              className="text-xs font-bold text-[#1877F2] hover:underline"
            >
              Inquire about Hardware Grants &rarr;
            </Link>
          </div>

          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E5F4F6] text-[#10233F] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-[#1877F2]" />
              </div>
              <h3 className="text-xl font-black text-[#10233F]">Community Cohort Sponsorship</h3>
              <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
                Fund a dedicated 8-week pilot cohort for a partnering community center or title-1 school library.
              </p>
              <div className="pt-2 text-xs text-[#7187A8]">
                Includes mentor training, guest speakers, and completion awards.
              </div>
            </div>
            <Link
              href="/contact?subject=Cohort%20Sponsorship%20Inquiry"
              className="text-xs font-bold text-[#1877F2] hover:underline"
            >
              Inquire about Cohort Sponsorship &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Fiscal Integrity Pledge */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10233F] text-white rounded-2xl p-8 sm:p-10 border border-[#18365A] space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#19C6D2]" />
            <h3 className="text-xl font-bold text-white">Our Fiscal Integrity Commitment</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#E5F4F6] leading-relaxed">
            Every dollar or resource contributed to Future Minds goes directly to educational tooling, safeguarding oversight, and student accessibility. We do not maintain extravagant overhead, and our leadership operates with full financial transparency.
          </p>
        </div>
      </section>
    </div>
  );
}
