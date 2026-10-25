import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { initialPrograms } from '@/lib/db/mock-data';
import { getProgramBySlug } from '@/lib/db/repository';
import { 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen, 
  Calendar, 
  Laptop, 
  HelpCircle,
  FileText
} from 'lucide-react';

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return initialPrograms.map((program) => ({
    slug: program.slug,
  }));
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: 'Program Not Found' };

  return {
    title: `${program.title} | Educational Program`,
    description: program.description,
  };
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#E5F4F6] to-[#F4FAFF] py-16 border-b border-[#D2E4F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/programs" className="text-xs font-bold text-[#1877F2] hover:underline">
              &larr; Back to all programs
            </Link>
            <span className="text-[#D2E4F0]">&bull;</span>
            <span className="text-xs font-bold uppercase tracking-wider bg-[#10233F] text-white px-2.5 py-0.5 rounded">
              {program.level}
            </span>
            <span className="text-xs font-semibold bg-[#1877F2]/10 text-[#1877F2] px-2.5 py-0.5 rounded">
              {program.ageGroup.replace('ages-', 'Ages ').replace('-', '–')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#10233F] tracking-tight">
            {program.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#18365A] max-w-3xl leading-relaxed">
            {program.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-[#18365A] font-medium border-t border-[#D2E4F0] pt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1877F2]" />
              <span>{program.durationWeeks} Weeks ({program.hoursPerWeek} hrs/week)</span>
            </div>
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-[#1877F2]" />
              <span>Format: {program.deliveryMode.toUpperCase()} Supervised Cohort</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Tuition: 100% Free Pilot</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Syllabus & Learning Outcomes */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Learning Outcomes */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-[#10233F] tracking-tight">
                What Students Will Master
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {program.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="bg-white border border-[#D2E4F0] rounded-xl p-4 flex items-start gap-3 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#19C6D2] flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#18365A] font-medium leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Week-by-Week Syllabus */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#D2E4F0] pb-3">
                <h2 className="text-2xl font-black text-[#10233F] tracking-tight">
                  Week-by-Week Curriculum
                </h2>
                <span className="text-xs font-mono text-[#7187A8]">{program.syllabus.length} Modules</span>
              </div>

              <div className="space-y-4">
                {program.syllabus.map((item) => (
                  <div key={item.week} className="bg-white border border-[#D2E4F0] rounded-xl p-6 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#1877F2] uppercase bg-[#E5F4F6] px-2.5 py-1 rounded">
                        Week {item.week}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#10233F]">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.topics.map((t, idx) => (
                        <span key={idx} className="text-[11px] font-mono bg-[#F4FAFF] border border-[#D2E4F0] text-[#10233F] px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-[#F4FAFF] border border-[#D2E4F0] rounded-xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-[#10233F] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#1877F2]" />
                <span>Prerequisites &amp; Equipment Needed</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#18365A]">
                {program.prerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1877F2] flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Enrollment Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white border-2 border-[#10233F] rounded-2xl p-6 shadow-md space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1877F2]">
                  Pilot Cohort
                </span>
                <h3 className="text-xl font-black text-[#10233F] mt-1">
                  Ready to Enroll?
                </h3>
                <p className="text-xs text-[#7187A8] mt-1">
                  Applications for our upcoming virtual cohort are currently open. Minor applications require parent or legal guardian confirmation.
                </p>
              </div>

              <div className="space-y-3 text-xs text-[#18365A] border-y border-[#D2E4F0] py-4">
                <div className="flex justify-between">
                  <span className="text-[#7187A8]">Duration:</span>
                  <span className="font-bold">{program.durationWeeks} Weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7187A8]">Commitment:</span>
                  <span className="font-bold">{program.hoursPerWeek} Hours / Week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7187A8]">Tuition Fee:</span>
                  <span className="font-bold text-emerald-600">Free ($0 Pilot)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7187A8]">Supervision:</span>
                  <span className="font-bold">Adult-Supervised</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href={`/apply/student?program=${encodeURIComponent(program.title)}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-sm transition-all"
                >
                  <span>Apply for this Program</span>
                  <ArrowRight className="w-4 h-4 text-[#19C6D2]" />
                </Link>
                <p className="text-[10px] text-center text-[#7187A8]">
                  Takes ~3 minutes to submit. Guardian will receive an email confirmation.
                </p>
              </div>

              <div className="bg-[#E5F4F6] p-3 rounded-lg text-[11px] text-[#18365A] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10233F] flex-shrink-0 mt-0.5" />
                <span>Need help with computer access? Mention this in your application.</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
