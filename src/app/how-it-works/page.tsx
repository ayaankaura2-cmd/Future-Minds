import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Lightbulb, 
  Code, 
  Layers, 
  Rocket, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  HelpCircle,
  Clock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works | Student Participation Process',
  description: 'Understand the Future Minds student journey from application to graduation: Discover, Learn, Build, and Share.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Discover & Apply',
      subtitle: 'Free Pilot Enrollment with Guardian Consent',
      description: 'Students choose an age-appropriate track and submit a short application with their parent or legal guardian. Because we prioritize data minimization, we only collect essential educational preferences and guardian contact information.',
      deliverable: 'Application Reference Number & Guardian Confirmation Email',
      icon: Lightbulb
    },
    {
      number: '02',
      title: 'Learn & Experiment',
      subtitle: 'Interactive Lessons & Supervised Virtual Sessions',
      description: 'Accepted learners join structured virtual cohorts led by dedicated youth mentors. Students work through weekly multimedia lessons, interactive code sandboxes, and automated quizzes with immediate guidance.',
      deliverable: 'Weekly coding exercises & knowledge-check badges',
      icon: Code
    },
    {
      number: '03',
      title: 'Build with Purpose',
      subtitle: 'Community Impact Project & Ethical AI Audit',
      description: 'Rather than copying generic tutorials, learners collaborate on real projects addressing environmental, accessibility, or educational challenges in their local communities, conducting safety audits on every model.',
      deliverable: 'Working prototype & ethics checklist',
      icon: Layers
    },
    {
      number: '04',
      title: 'Share & Celebrate',
      subtitle: 'Supervised Showcase & Completion Certificate',
      description: 'Students present their projects to peers, mentors, and guardians in a celebration showcase. Approved student works are featured on our website with privacy-protecting pseudonyms.',
      deliverable: 'Verifiable Certificate of Completion & Project Portfolio',
      icon: Rocket
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#E5F4F6] to-[#F4FAFF] py-16 border-b border-[#D2E4F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">The Learning Journey</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#10233F] tracking-tight">
            How Future Minds Works
          </h1>
          <p className="text-base sm:text-lg text-[#18365A] max-w-2xl mx-auto leading-relaxed">
            From your very first lesson to presenting an ethical AI capstone project, our structured four-phase model supports you every step of the way.
          </p>
        </div>
      </section>

      {/* 4 Steps Detailed Roadmap */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start gap-6 hover:border-[#1877F2] transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#10233F] text-[#19C6D2] flex flex-col items-center justify-center font-mono">
                  <span className="text-xl font-black">{s.number}</span>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-2xl font-black text-[#10233F] tracking-tight">
                      {s.title}
                    </h2>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1877F2] bg-[#E5F4F6] px-2.5 py-1 rounded">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-[#1877F2]">
                    {s.subtitle}
                  </div>

                  <p className="text-sm sm:text-base text-[#18365A] leading-relaxed">
                    {s.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#10233F] bg-[#F4FAFF] border border-[#D2E4F0] p-3 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-[#19C6D2]" />
                    <span>Outcome: {s.deliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Safeguarding Commitments in Practice */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10233F] text-white rounded-2xl p-8 sm:p-12 border border-[#18365A] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight text-white">
                Child Safety &amp; Guardian Oversight
              </h3>
              <p className="text-xs text-[#E5F4F6]">How we protect minors across our platform and digital classrooms</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-[#18365A]/60 p-5 rounded-xl border border-[#18365A] space-y-2">
              <h4 className="text-sm font-bold text-[#19C6D2]">Verified Consent</h4>
              <p className="text-xs text-[#F4FAFF]/80 leading-relaxed">
                Parents or guardians confirm registration via email and can review all course materials at any time.
              </p>
            </div>

            <div className="bg-[#18365A]/60 p-5 rounded-xl border border-[#18365A] space-y-2">
              <h4 className="text-sm font-bold text-[#19C6D2]">No Private Messaging</h4>
              <p className="text-xs text-[#F4FAFF]/80 leading-relaxed">
                Unsupervised 1-on-1 private messaging between adults and minors is barred. All sessions are group-based.
              </p>
            </div>

            <div className="bg-[#18365A]/60 p-5 rounded-xl border border-[#18365A] space-y-2">
              <h4 className="text-sm font-bold text-[#19C6D2]">Data Minimization</h4>
              <p className="text-xs text-[#F4FAFF]/80 leading-relaxed">
                We do not collect physical home addresses, exact birth dates, or phone numbers from minor students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-black text-[#10233F]">
          Ready to Start Your Journey?
        </h2>
        <p className="text-sm sm:text-base text-[#18365A] max-w-xl mx-auto">
          Enroll in our upcoming pilot cohorts today. Complete the 3-minute application form to reserve your spot.
        </p>
        <div>
          <Link
            href="/apply/student"
            className="inline-flex items-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-sm transition-all"
          >
            <span>Apply for Student Pilot</span>
            <ArrowRight className="w-5 h-5 text-[#19C6D2]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
