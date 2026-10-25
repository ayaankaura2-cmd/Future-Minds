import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2, BookOpen, Code2, BrainCircuit, ArrowLeft, Calendar, Users, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Levels & Programs | Future Minds',
  description:
    'Explore Future Minds Beginner, Intermediate, and Advanced coding and AI learning levels. 1 class per week. 100% free nonprofit education.',
};

export default function ProgramsPage() {
  return (
    <div className="bg-white text-[#0b1a30] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0b1a30] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] block">
            Curriculum &amp; Placement
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b1a30] tracking-tight">
            Learning Levels &amp; Program Structure
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Future Minds provides free, high-quality coding and artificial intelligence education across three dedicated tracks. Every program features <strong>one live virtual class per week</strong> led by patient student mentors.
          </p>
        </div>

        {/* Format highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#0b1a30] block">Weekly Rhythm</span>
              <p className="text-slate-600 mt-0.5">1 live interactive class per week (60–75 minutes) designed to fit alongside school schedules.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#0b1a30] block">Small Supportive Cohorts</span>
              <p className="text-slate-600 mt-0.5">4–6 students per mentor ensuring patient attention and plenty of time to ask questions.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#0b1a30] block">100% Free Nonprofit</span>
              <p className="text-slate-600 mt-0.5">Zero tuition, zero registration fees. Open to young learners ages 8 to 17 globally.</p>
            </div>
          </div>
        </div>

        {/* The 3 Levels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          
          {/* Beginner */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full">
                  Level 1
                </span>
                <span className="text-xs text-slate-500 font-medium">Ages ~8–11</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0b1a30]">Beginner Level</h2>
                <p className="text-xs font-bold text-[#0066FF] uppercase tracking-wider mt-1">
                  Logic &amp; Visual Coding &bull; 1 Class / Week
                </p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                For young learners brand new to programming. Students explore computational thinking, logic puzzles, and visual block coding (Scratch), along with gentle introductions to artificial intelligence.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <span className="font-bold text-[#0b1a30] block">Curriculum Highlights:</span>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>Algorithms, sequence, and loop fundamentals</li>
                  <li>Building animated stories and simple maze games</li>
                  <li>Introductory AI concepts: how machines recognize sounds and images</li>
                  <li>Sharing and presenting an original final project</li>
                </ul>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/register?level=beginner"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-[#0066FF] text-[#0b1a30] hover:text-white px-5 py-3 rounded-lg text-sm font-bold transition-all"
              >
                <span>Register for Beginner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Intermediate */}
          <div className="bg-white rounded-xl border-2 border-[#0066FF] p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#0066FF] px-3 py-1 rounded-full">
                  Level 2
                </span>
                <span className="text-xs text-slate-500 font-medium">Ages ~11–14</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0b1a30]">Intermediate Level</h2>
                <p className="text-xs font-bold text-[#0066FF] uppercase tracking-wider mt-1">
                  Text Syntax &amp; Python &bull; 1 Class / Week
                </p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                For students ready to type real code. Bridges the transition from block tools to text-based syntax in Python and core web technologies, alongside machine learning fundamentals.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <span className="font-bold text-[#0b1a30] block">Curriculum Highlights:</span>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>Python data structures: lists, dictionaries, functions</li>
                  <li>Fundamental algorithms and structured problem-solving</li>
                  <li>How predictive machine learning models work</li>
                  <li>Building command-line utilities and text adventures</li>
                </ul>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/register?level=intermediate"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white px-5 py-3 rounded-lg text-sm font-bold shadow-xs transition-all"
              >
                <span>Register for Intermediate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Advanced */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full">
                  Level 3
                </span>
                <span className="text-xs text-slate-500 font-medium">Ages ~13–17</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0b1a30]">Advanced Level</h2>
                <p className="text-xs font-bold text-[#0066FF] uppercase tracking-wider mt-1">
                  Applied AI &amp; Projects &bull; 1 Class / Week
                </p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                For experienced young programmers. Explores applied artificial intelligence, neural network fundamentals, ethical data practices, and independent software architecture.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <span className="font-bold text-[#0b1a30] block">Curriculum Highlights:</span>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>Object-oriented programming and working with APIs</li>
                  <li>Introduction to neural networks and natural language models</li>
                  <li>Ethics in AI: addressing bias, privacy, and safety</li>
                  <li>Independent capstone software project with mentor review</li>
                </ul>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/register?level=advanced"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-[#0066FF] text-[#0b1a30] hover:text-white px-5 py-3 rounded-lg text-sm font-bold transition-all"
              >
                <span>Register for Advanced</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
