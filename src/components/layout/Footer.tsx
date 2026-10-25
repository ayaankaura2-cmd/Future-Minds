import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BrandLogo } from '../brand/Logo';
import { ShieldCheck, Mail, HeartHandshake, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1a30] text-slate-200 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Organization Identity & Logo */}
          <div className="space-y-4">
            <div className="bg-white p-2 inline-block">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.jpg"
                  alt="Future Minds Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight uppercase block">
                Future Minds
              </span>
              <span className="text-xs font-bold text-[#0066FF] tracking-wider uppercase block">
                LEARN / BUILD / BELONG
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A student-led nonprofit organization making coding and artificial intelligence education more accessible to young learners around the world.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
              <span>Strict guardian consent and privacy protection enforced.</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/#mission" className="hover:text-white transition-colors">
                  Our Mission &amp; Values
                </Link>
              </li>
              <li>
                <Link href="/#programs" className="hover:text-white transition-colors">
                  Program Overview (1 Class/Week)
                </Link>
              </li>
              <li>
                <Link href="/#levels" className="hover:text-white transition-colors">
                  Beginner, Intermediate, &amp; Advanced
                </Link>
              </li>
              <li>
                <Link href="/#what-to-expect" className="hover:text-white transition-colors">
                  What Students Can Expect
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-[#0066FF] font-semibold hover:underline">
                  Student Registration Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Learning Tracks */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Learning Levels
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/#levels" className="hover:text-white transition-colors block">
                  <span className="font-semibold text-white">Beginner Level</span>
                  <span className="block text-[11px] text-slate-400">Logic, Scratch &amp; AI concepts (Ages ~8–11)</span>
                </Link>
              </li>
              <li>
                <Link href="/#levels" className="hover:text-white transition-colors block">
                  <span className="font-semibold text-white">Intermediate Level</span>
                  <span className="block text-[11px] text-slate-400">Python syntax &amp; algorithms (Ages ~11–14)</span>
                </Link>
              </li>
              <li>
                <Link href="/#levels" className="hover:text-white transition-colors block">
                  <span className="font-semibold text-white">Advanced Level</span>
                  <span className="block text-[11px] text-slate-400">Applied AI &amp; independent projects (Ages ~13–17)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Honest Contact Placeholders */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact &amp; Inquiries
            </h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white block">Admissions &amp; Registration:</span>
                  <a href="mailto:admissions@futureminds.org" className="text-slate-400 hover:text-white">
                    admissions@futureminds.org
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <HeartHandshake className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white block">Student Mentorship:</span>
                  <a href="mailto:mentors@futureminds.org" className="text-slate-400 hover:text-white">
                    mentors@futureminds.org
                  </a>
                </div>
              </div>
              <div className="bg-slate-900/60 p-3 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="font-semibold text-slate-300 block">Volunteer Response Time:</span>
                <p>As a student-led nonprofit, our volunteer team reviews inquiries weekly and typically responds within 24–48 hours.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Future Minds Initiative. Student-led nonprofit education.
          </div>
          <div className="flex items-center gap-6 text-slate-400 text-xs">
            <span>One class per week</span>
            <span>&bull;</span>
            <span>Zero tuition fees</span>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy &amp; Safeguarding
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
