import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  PlayCircle,
  MessageSquare
} from 'lucide-react';

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#E5F4F6] text-[#10233F] text-xs font-bold px-2.5 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5 text-[#1877F2]" />
            <span>Pilot Cohort: Fall 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
            Welcome back, Jordan!
          </h1>
          <p className="text-xs sm:text-sm text-[#7187A8]">
            You are enrolled in <strong>AI Explorers: Virtual Cohort Alpha</strong>. Next live workshop is this Saturday.
          </p>
        </div>

        <Link
          href="/learn/lessons/lesson-101"
          className="inline-flex items-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex-shrink-0"
        >
          <PlayCircle className="w-4 h-4 text-[#19C6D2]" />
          <span>Resume Lesson 101</span>
        </Link>
      </div>

      {/* Progress & Upcoming Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Current Course Progress */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#D2E4F0] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#1877F2] uppercase">Active Course</span>
                <h2 className="text-xl font-black text-[#10233F] mt-0.5">
                  AI Foundations 101: How Computers Learn
                </h2>
              </div>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md">
                60% Completed
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#7187A8] font-medium">
                <span>Modules 1 &amp; 2 in progress</span>
                <span>2 of 3 Lessons Completed</span>
              </div>
              <div className="w-full bg-[#E5F4F6] rounded-full h-3 overflow-hidden">
                <div className="bg-[#1877F2] h-full rounded-full transition-all" style={{ width: '60%' }}></div>
              </div>
            </div>

            {/* Lesson Module Checklist */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#7187A8]">Course Checklist:</div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3.5 bg-[#F4FAFF] border border-[#D2E4F0] rounded-xl text-xs">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-[#10233F]">Lesson 101: Intro to AI &amp; Neural Networks</div>
                      <div className="text-[11px] text-[#7187A8]">Completed &bull; Quiz Score: 100%</div>
                    </div>
                  </div>
                  <Link
                    href="/learn/lessons/lesson-101"
                    className="font-bold text-[#1877F2] hover:underline"
                  >
                    Review
                  </Link>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#F4FAFF] border border-[#D2E4F0] rounded-xl text-xs">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-[#10233F]">Lesson 102: Computer Vision &amp; Pixels</div>
                      <div className="text-[11px] text-[#7187A8]">Completed &bull; Lab Completed</div>
                    </div>
                  </div>
                  <Link
                    href="/learn/lessons/lesson-102"
                    className="font-bold text-[#1877F2] hover:underline"
                  >
                    Review
                  </Link>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-white border-2 border-[#1877F2] rounded-xl text-xs shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-[#1877F2] flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#1877F2]"></div>
                    </div>
                    <div>
                      <div className="font-bold text-[#10233F]">Lesson 201: Tokenization &amp; Language Models</div>
                      <div className="text-[11px] text-[#1877F2] font-semibold">Up Next &bull; 30 mins</div>
                    </div>
                  </div>
                  <Link
                    href="/learn/lessons/lesson-201"
                    className="bg-[#10233F] text-white px-3 py-1.5 rounded-lg font-bold hover:bg-[#18365A]"
                  >
                    Start Lesson &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Instructor Feedback Box */}
          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#10233F] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#1877F2]" />
              <span>Mentor Feedback on Capstone Idea</span>
            </h3>
            <div className="bg-[#E5F4F6]/60 p-4 rounded-xl border border-[#D2E4F0] text-xs text-[#18365A] space-y-1">
              <div className="flex items-center justify-between font-bold text-[#10233F]">
                <span>Instructor: Samantha Chen</span>
                <span className="text-[11px] text-[#7187A8] font-normal">Yesterday at 4:15 PM</span>
              </div>
              <p className="leading-relaxed">
                &ldquo;Jordan, great work on your Teachable Machine classifier prototype! In your next exercise, be sure to document your training data bias audit. Remember to test against at least 3 distinct lighting conditions.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Schedule & Certificates */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Live Workshop */}
          <div className="bg-[#10233F] text-white rounded-2xl p-6 shadow-sm border border-[#18365A] space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#19C6D2] uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Next Supervised Workshop</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Live Lab: Computer Vision &amp; Model Fairness
              </h3>
              <p className="text-xs text-[#E5F4F6] mt-1">
                Virtual Cohort Alpha &bull; Group Session
              </p>
            </div>

            <div className="bg-[#18365A] p-3 rounded-xl space-y-1.5 text-xs text-[#F4FAFF]">
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#19C6D2]">
                <Clock className="w-3.5 h-3.5" />
                <span>Saturday, 11:00 AM &ndash; 12:30 PM EST</span>
              </div>
              <div className="text-[11px] text-[#7187A8]">
                Supervised meeting link will unlock 15 minutes before session.
              </div>
            </div>

            <button
              type="button"
              disabled
              className="w-full bg-[#18365A] text-[#7187A8] font-bold py-2.5 rounded-xl text-xs text-center cursor-not-allowed"
            >
              Session Link (Unlocks on Saturday)
            </button>
          </div>

          {/* Certificate Badge Card */}
          <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1877F2] uppercase">
              <Award className="w-4 h-4" />
              <span>Track Credentials</span>
            </div>
            <h4 className="text-sm font-bold text-[#10233F]">
              AI Foundations Certificate
            </h4>
            <p className="text-xs text-[#7187A8] leading-relaxed">
              Complete Module 2 and your capstone ethics review to earn your verified credential.
            </p>
            <Link
              href="/learn/certificates"
              className="text-xs font-bold text-[#1877F2] hover:underline inline-block pt-1"
            >
              View Certificate Status &rarr;
            </Link>
          </div>

          {/* Safeguarding Help */}
          <div className="bg-[#E5F4F6] border border-[#D2E4F0] rounded-2xl p-5 space-y-2 text-xs text-[#18365A]">
            <div className="flex items-center gap-2 font-bold text-[#10233F]">
              <ShieldCheck className="w-4 h-4 text-[#10233F]" />
              <span>Safety &amp; Privacy Notice</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Direct private messaging is disabled for your protection. Questions can be asked in live supervised workshops or shared in assignment comments.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
