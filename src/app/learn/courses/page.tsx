import React from 'react';
import Link from 'next/link';
import { sampleCourses } from '@/lib/db/mock-data';
import { BookOpen, Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function StudentCoursesPage() {
  const courses = [
    {
      id: 'ai-foundations-101',
      slug: 'ai-foundations-101',
      title: 'AI Foundations 101: How Computers Learn',
      description: 'Understand neural networks, train computer vision classifiers, and conduct algorithmic fairness audits.',
      modulesCount: 2,
      lessonsCount: 3,
      duration: '6 Weeks',
      status: 'enrolled',
      progress: 60,
    },
    {
      id: 'python-foundations-101',
      slug: 'python-foundations-101',
      title: 'Python Foundations for Young Coders',
      description: 'Master variables, loops, lists, dictionaries, and command-line programs with clean Python syntax.',
      modulesCount: 4,
      lessonsCount: 8,
      duration: '8 Weeks',
      status: 'open',
      progress: 0,
    },
    {
      id: 'web-innovators-101',
      slug: 'web-innovators-101',
      title: 'Web Innovators: HTML, CSS & Accessible JavaScript',
      description: 'Build modern, responsive websites conforming to accessibility guidelines and deploy live portfolios.',
      modulesCount: 4,
      lessonsCount: 8,
      duration: '8 Weeks',
      status: 'upcoming',
      progress: 0,
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
          Course Catalog
        </h1>
        <p className="text-xs sm:text-sm text-[#7187A8] mt-1">
          Explore interactive curriculum modules, coding sandboxes, and capstone labs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-[#D2E4F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#1877F2] transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#1877F2] bg-[#E5F4F6] px-2.5 py-0.5 rounded">
                  {course.duration}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  course.status === 'enrolled'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-[#F4FAFF] text-[#7187A8] border border-[#D2E4F0]'
                }`}>
                  {course.status === 'enrolled' ? 'Enrolled' : 'Available in Pilot'}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#10233F]">
                {course.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
                {course.description}
              </p>

              <div className="text-xs text-[#7187A8] flex items-center gap-3 pt-2">
                <span>{course.modulesCount} Modules</span>
                <span>&bull;</span>
                <span>{course.lessonsCount} Interactive Lessons</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D2E4F0]">
              {course.status === 'enrolled' ? (
                <Link
                  href="/learn/lessons/lesson-101"
                  className="w-full flex items-center justify-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white py-2.5 rounded-xl font-bold text-xs transition-colors"
                >
                  <span>Continue Learning</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#19C6D2]" />
                </Link>
              ) : (
                <Link
                  href={`/programs`}
                  className="w-full flex items-center justify-center gap-2 bg-[#F4FAFF] hover:bg-[#E5F4F6] text-[#10233F] border border-[#D2E4F0] py-2.5 rounded-xl font-bold text-xs transition-colors"
                >
                  <span>View Program Info</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
