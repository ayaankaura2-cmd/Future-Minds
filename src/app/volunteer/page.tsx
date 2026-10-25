import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  GraduationCap, 
  Code, 
  BookOpen, 
  Sparkles,
  FileCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Volunteer & Mentor With Future Minds',
  description: 'Inspire youth around the world as an AI and coding instructor, teaching assistant, or curriculum mentor.',
};

export default function VolunteerPage() {
  const roles = [
    {
      title: 'Cohort Instructor',
      hours: '3–4 hrs / week',
      description: 'Lead interactive weekly virtual workshops, walk through coding exercises, answer live student questions, and inspire curiosity in computer science.',
      skills: ['Python, Scratch, or Web Development', 'Patient, encouraging communication', 'Passion for teaching young learners'],
      icon: GraduationCap
    },
    {
      title: 'Teaching Assistant (TA)',
      hours: '2–3 hrs / week',
      description: 'Provide 1-on-1 breakout assistance during live group sessions, help students debug syntax errors, and assist instructors in managing online classrooms.',
      skills: ['Basic coding literacy', 'Enthusiastic problem-solver', 'High school senior or undergrad'],
      icon: Users
    },
    {
      title: 'Curriculum Developer',
      hours: '2–4 hrs / week (Flexible)',
      description: 'Design interactive lesson notebooks, write age-appropriate coding challenges, and craft algorithmic ethics simulations for our open educational library.',
      skills: ['Curriculum design', 'Technical writing', 'AI/ML concepts clarity'],
      icon: BookOpen
    },
    {
      title: 'Student Project Mentor',
      hours: '2 hrs / week',
      description: 'Mentor students in the AI Project Lab capstone incubator, providing constructive code reviews and helping teens turn ideas into working software.',
      skills: ['Software development experience', 'Constructive feedback skills', 'Engineering best practices'],
      icon: Code
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#E5F4F6] to-[#F4FAFF] py-16 border-b border-[#D2E4F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">Community Mentorship</span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#10233F] tracking-tight">
            Empower Young Minds in AI &amp; Code
          </h1>
          <p className="text-base sm:text-lg text-[#18365A] max-w-2xl mx-auto leading-relaxed">
            Join a global community of university students, high school peer leaders, and software professionals teaching the next generation.
          </p>
          <div className="pt-2">
            <Link
              href="/apply/volunteer"
              className="inline-flex items-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all"
            >
              <span>Apply as Volunteer Mentor</span>
              <ArrowRight className="w-4 h-4 text-[#19C6D2]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">Available Positions</span>
          <h2 className="text-3xl font-black text-[#10233F] tracking-tight">
            How You Can Contribute
          </h2>
          <p className="text-sm text-[#7187A8]">
            We match your skills, availability, and interests with the cohorts that need you most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#1877F2] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#E5F4F6] text-[#10233F] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#1877F2]" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#7187A8] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#1877F2]" /> {r.hours}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#10233F]">{r.title}</h3>
                  <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
                    {r.description}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#7187A8]">Ideal Background:</div>
                    <ul className="space-y-1 text-xs text-[#18365A]">
                      {r.skills.map((s, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#19C6D2]" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D2E4F0]">
                  <Link
                    href={`/apply/volunteer?role=${encodeURIComponent(r.title)}`}
                    className="text-xs font-bold text-[#1877F2] hover:text-[#10233F] flex items-center gap-1"
                  >
                    <span>Apply for {r.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Code of Conduct & Safeguarding Requirements */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10233F] text-white rounded-2xl p-8 sm:p-10 border border-[#18365A] space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#19C6D2]" />
            <div>
              <h3 className="text-xl font-bold text-white">Volunteer Safeguarding Requirements</h3>
              <p className="text-xs text-[#E5F4F6]">Every volunteer upholds our strict child protection protocol</p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#F4FAFF]/90 leading-relaxed border-t border-[#18365A] pt-4">
            <p>
              Because our programs serve minors, all volunteers must review and sign the <strong>Future Minds Volunteer Code of Conduct</strong> and agree to:
            </p>
            <ul className="space-y-2 list-disc list-inside text-xs text-[#E5F4F6]">
              <li>Never engage in unmonitored private 1-on-1 communications or exchange personal phone numbers/social media with minor students.</li>
              <li>Conduct all digital classroom activities within officially recorded, organization-scheduled group sessions.</li>
              <li>Undergo onboarding background checks where required by local jurisdictional standards.</li>
              <li>Promptly report any safety, behavioral, or safeguarding concerns to the Safeguarding Officer.</li>
            </ul>
          </div>

          <div className="pt-2">
            <Link
              href="/safeguarding"
              className="text-xs font-bold text-[#19C6D2] hover:underline flex items-center gap-1"
            >
              <span>Read Full Safeguarding &amp; Reporting Policy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
