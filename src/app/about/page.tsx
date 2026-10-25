import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, BookOpen, Code2, HeartHandshake, ShieldCheck, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our Mission | Future Minds',
  description:
    'Future Minds is a student-led nonprofit making coding and AI education accessible to young learners around the world. LEARN / BUILD / BELONG.',
};

export default function AboutPage() {
  return (
    <div className="bg-white text-[#0b1a30] min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb / Top link */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0b1a30] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] block">
            About Future Minds
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b1a30] tracking-tight">
            Student-Led. Mission-Driven. Accessible to All.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Future Minds is a student-led nonprofit making coding and artificial intelligence education accessible to young learners around the world. We believe that understanding how technology works is a superpower that should belong to everyone.
          </p>
        </div>

        {/* Authentic Photo */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[16/9] w-full">
          <Image
            src="/students-coding.jpg"
            alt="Students collaborating together on computer programming in a library"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* The Slogan: LEARN / BUILD / BELONG */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#0b1a30]">
            Our Slogan &amp; Philosophy: LEARN / BUILD / BELONG
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1a30]">LEARN</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Breaking down algorithms, computational logic, and artificial intelligence into clear, engaging, intuitive lessons suitable for young minds.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1a30]">BUILD</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Putting concepts into practice immediately. From interactive visual games to text-based Python utilities and responsible AI experiments.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1a30]">BELONG</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A warm, encouraging community where every student is welcomed, mentored by relatable peers, and inspired to keep exploring.
              </p>
            </div>
          </div>
        </div>

        {/* Why Student-Led? */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 space-y-4">
          <h2 className="text-xl font-bold text-[#0b1a30]">Why Student-Led?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Many traditional coding courses are either prohibitively expensive or taught through dry, uninspiring formats. Because our instructors are high school and university students, they bridge the generation gap naturally. They remember the confusion of being a beginner, they understand modern tools, and they create an encouraging environment where young learners aren&apos;t afraid to make mistakes and experiment.
          </p>
          <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 border-t border-slate-200">
            <span>Weekly 60–75 minute classes</span>
            <span>&bull;</span>
            <span>Small cohorts</span>
            <span>&bull;</span>
            <span>Zero tuition fees</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-2xl font-bold text-[#0b1a30]">Ready to enroll your student?</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Registration takes about two minutes. Submit your student&apos;s details and our team will match them with an upcoming cohort.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white px-7 py-3 rounded-lg text-sm font-bold shadow-xs transition-colors"
          >
            <span>Complete Registration Form</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
