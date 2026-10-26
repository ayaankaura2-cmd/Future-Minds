'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  BookOpen,
  CheckCircle2,
  FileText,
  KeyRound,
  ArrowLeft,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Registrations', href: '/admin/registrations', icon: Users },
    { label: 'Applications', href: '/admin/applications', icon: Users },
    { label: 'Programs & Cohorts', href: '/admin/programs', icon: BookOpen },
    { label: 'Project Moderation', href: '/admin/projects', icon: CheckCircle2 },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: FileText },
    { label: 'Admin Bootstrap', href: '/admin/bootstrap', icon: KeyRound },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#F4FAFF] flex flex-col">
      {/* Top Admin Topbar */}
      <aside aria-label="Admin Navigation" className="bg-[#10233F] text-white border-b border-[#18365A] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-bold text-[#7187A8] hover:text-white flex items-center gap-1 transition-colors mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </Link>
            <span className="text-[#18365A]">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="text-xs font-black text-white uppercase tracking-wider">
                Future Minds Admin Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="bg-[#18365A] text-[#19C6D2] font-mono px-3 py-1 rounded-full text-[11px] font-bold">
              Role: System Administrator
            </span>
            <Link
              href="/instructor"
              className="text-xs text-[#7187A8] hover:text-white"
            >
              Instructor Portal
            </Link>
          </div>
        </div>
      </aside>

      {/* Admin Nav Tabs */}
      <div className="bg-white border-b border-[#D2E4F0] sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${active
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

      {/* Main Admin View Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
