'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Code2, 
  Award, 
  UserCheck, 
  ShieldCheck, 
  ArrowLeft,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function LearnPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/learn/dashboard', icon: LayoutDashboard },
    { label: 'Courses', href: '/learn/courses', icon: BookOpen },
    { label: 'My Projects', href: '/learn/projects', icon: Code2 },
    { label: 'Certificates', href: '/learn/certificates', icon: Award },
    { label: 'Student Profile', href: '/learn/profile', icon: UserCheck },
  ];

  const isActive = (href: string) => {
    if (href === '/learn/dashboard') {
      return pathname === '/learn' || pathname === '/learn/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#F4FAFF] flex flex-col">
      {/* Student Portal Sub-Header */}
      <aside aria-label="Portal Navigation" className="bg-[#10233F] text-white border-b border-[#18365A] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-bold text-[#7187A8] hover:text-white flex items-center gap-1 transition-colors mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Site
            </Link>
            <span className="text-[#18365A]">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#19C6D2] animate-pulse"></span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Student Learning Portal
              </span>
            </div>
          </div>

          {/* Student Status Badge */}
          <div className="flex items-center gap-3">
            <div className="bg-[#18365A] border border-[#D2E4F0]/20 px-3 py-1 rounded-full flex items-center gap-2 text-xs">
              <div className="w-5 h-5 rounded-full bg-[#19C6D2] text-[#10233F] font-bold text-[10px] flex items-center justify-center font-mono">
                JK
              </div>
              <span className="text-[#E5F4F6] font-medium">Jordan K.</span>
              <span className="text-[10px] bg-[#10233F] text-[#19C6D2] px-2 py-0.5 rounded font-mono">
                Pilot Student
              </span>
            </div>

            <Link
              href="/instructor"
              className="text-xs font-semibold text-[#7187A8] hover:text-[#19C6D2] transition-colors"
            >
              Instructor View &rarr;
            </Link>
          </div>
        </div>
      </aside>

      {/* Portal Tabs Bar */}
      <div className="bg-white border-b border-[#D2E4F0] sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-[#10233F] text-white shadow-xs'
                    : 'text-[#18365A] hover:bg-[#E5F4F6]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#19C6D2]' : 'text-[#7187A8]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Portal Children Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
