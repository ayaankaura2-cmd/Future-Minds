'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  CheckSquare, 
  FileText, 
  Send, 
  ArrowLeft,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface StudentRosterItem {
  id: string;
  name: string;
  grade: string;
  attendance: 'present' | 'absent' | 'excused';
  assignmentSubmitted: boolean;
  score: string;
}

export default function InstructorPortalPage() {
  const [students, setStudents] = useState<StudentRosterItem[]>([
    { id: 'st-1', name: 'Jordan K.', grade: 'Grade 9', attendance: 'present', assignmentSubmitted: true, score: '100%' },
    { id: 'st-2', name: 'Elena P.', grade: 'Grade 6', attendance: 'present', assignmentSubmitted: true, score: '95%' },
    { id: 'st-3', name: 'Devon M.', grade: 'Grade 8', attendance: 'present', assignmentSubmitted: false, score: 'Pending' },
    { id: 'st-4', name: 'Aisha T.', grade: 'Grade 9', attendance: 'present', assignmentSubmitted: true, score: '98%' },
    { id: 'st-5', name: 'Lucas W.', grade: 'Grade 7', attendance: 'excused', assignmentSubmitted: false, score: 'Excused' },
  ]);

  const [feedbackText, setFeedbackText] = useState('Great work exploring Teachable Machine. Remember to document your dataset balance in your final report.');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  const toggleAttendance = (id: string, status: 'present' | 'absent' | 'excused') => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, attendance: status } : s));
  };

  const handleSaveAttendance = () => {
    setAttendanceSaved(true);
    setTimeout(() => setAttendanceSaved(false), 3000);
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => setFeedbackSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F4FAFF] pb-20">
      {/* Instructor Header */}
      <header className="bg-[#10233F] text-white border-b border-[#18365A] px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-bold text-[#7187A8] hover:text-white flex items-center gap-1 transition-colors mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </Link>
            <span className="text-[#18365A]">|</span>
            <span className="text-sm font-black text-white uppercase tracking-wider">
              Instructor &amp; Mentor Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#18365A] px-3 py-1.5 rounded-full flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-white font-medium">Samantha Chen</span>
              <span className="text-[10px] bg-[#10233F] text-[#19C6D2] px-2 py-0.5 rounded font-mono">
                Lead Instructor
              </span>
            </div>

            <Link
              href="/admin"
              className="text-xs font-semibold text-[#7187A8] hover:text-[#19C6D2] transition-colors"
            >
              Admin View &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Cohort Overview Card */}
        <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#1877F2] uppercase bg-[#E5F4F6] px-2.5 py-0.5 rounded">
                Assigned Cohort
              </span>
              <span className="text-xs font-semibold text-[#7187A8]">
                Fall 2026 Virtual
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
              AI Explorers: Cohort Alpha
            </h1>
            <p className="text-xs sm:text-sm text-[#7187A8]">
              Weekly Live Workshop: Saturdays @ 11:00 AM EST &bull; 18 Students Enrolled
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/learn/lessons/lesson-101"
              className="bg-[#F4FAFF] hover:bg-[#E5F4F6] text-[#10233F] border border-[#D2E4F0] px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
            >
              Preview Student Lesson 101
            </Link>
          </div>
        </div>

        {/* Safeguarding Alert */}
        <div className="bg-[#10233F] text-white rounded-2xl p-6 border border-[#18365A] flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-[#19C6D2] flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-[#E5F4F6]">
            <span className="font-bold text-white text-sm">Instructor Safeguarding Mandate:</span>
            <p className="leading-relaxed">
              Always ensure at least two vetted facilitators are present during live video calls. Never communicate with minor students via personal social media or direct unmonitored private channels. All session recordings must be saved to the secure archive.
            </p>
          </div>
        </div>

        {/* Grid: Roster & Attendance + Feedback Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Attendance & Cohort Roster */}
          <div className="lg:col-span-8 bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#D2E4F0] pb-4">
              <div>
                <h2 className="text-lg font-black text-[#10233F]">
                  Session Attendance &amp; Student Roster
                </h2>
                <p className="text-xs text-[#7187A8]">Session: Week 2 - Computer Vision Lab</p>
              </div>

              <button
                type="button"
                onClick={handleSaveAttendance}
                className="bg-[#10233F] hover:bg-[#18365A] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                {attendanceSaved ? '✓ Logged' : 'Save Attendance Log'}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#D2E4F0] text-[#7187A8] uppercase tracking-wider text-[11px]">
                    <th className="pb-3 font-bold">Student (Pseudonym)</th>
                    <th className="pb-3 font-bold">Grade</th>
                    <th className="pb-3 font-bold">Attendance Status</th>
                    <th className="pb-3 font-bold">Assignment</th>
                    <th className="pb-3 font-bold">Quiz</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4FAFF]">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-[#F4FAFF]/80 transition-colors">
                      <td className="py-3 font-bold text-[#10233F]">{st.name}</td>
                      <td className="py-3 text-[#7187A8]">{st.grade}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => toggleAttendance(st.id, 'present')}
                            className={`px-2 py-1 rounded text-[11px] font-bold ${
                              st.attendance === 'present' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleAttendance(st.id, 'absent')}
                            className={`px-2 py-1 rounded text-[11px] font-bold ${
                              st.attendance === 'absent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            Absent
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleAttendance(st.id, 'excused')}
                            className={`px-2 py-1 rounded text-[11px] font-bold ${
                              st.attendance === 'excused' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            Excused
                          </button>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          st.assignmentSubmitted ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {st.assignmentSubmitted ? 'Submitted' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 font-mono font-bold text-[#10233F]">{st.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Instructor Feedback & Lesson Plans */}
          <div className="lg:col-span-4 space-y-6">
            {/* Feedback Dispatcher */}
            <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#10233F] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#1877F2]" />
                  <span>Send Constructive Feedback</span>
                </h3>
                <p className="text-xs text-[#7187A8] mt-0.5">
                  Sends feedback to Jordan K. on Lesson 101 exercise.
                </p>
              </div>

              {feedbackSent ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Feedback posted to student dashboard!</span>
                </div>
              ) : (
                <form onSubmit={handleSendFeedback} className="space-y-3">
                  <textarea
                    rows={4}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full p-3 text-xs border border-[#D2E4F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#19C6D2]"
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white py-2.5 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-[#19C6D2]" />
                    <span>Publish Feedback</span>
                  </button>
                </form>
              )}
            </div>

            {/* Approved Lesson Plans */}
            <div className="bg-white border border-[#D2E4F0] rounded-2xl p-6 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-[#10233F] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1877F2]" />
                <span>Instructor Teaching Guides</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#18365A]">
                <li className="flex items-center justify-between p-2.5 bg-[#F4FAFF] rounded-lg border border-[#D2E4F0]">
                  <span>Week 1: AI Concepts &amp; Icebreakers</span>
                  <span className="font-bold text-[#1877F2]">PDF Guide</span>
                </li>
                <li className="flex items-center justify-between p-2.5 bg-[#F4FAFF] rounded-lg border border-[#D2E4F0]">
                  <span>Week 2: Vision Classifier Lab Walkthrough</span>
                  <span className="font-bold text-[#1877F2]">PDF Guide</span>
                </li>
                <li className="flex items-center justify-between p-2.5 bg-[#F4FAFF] rounded-lg border border-[#D2E4F0]">
                  <span>Week 3: Ethics &amp; Bias Roleplay Prompt</span>
                  <span className="font-bold text-[#1877F2]">PDF Guide</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
