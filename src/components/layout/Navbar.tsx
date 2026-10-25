'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '../brand/Logo';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Mission', href: '/#mission' },
    { label: 'Program Overview', href: '/#programs' },
    { label: 'Learning Levels', href: '/#levels' },
    { label: 'What to Expect', href: '/#what-to-expect' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      {/* Top Welcome / Mission Notification Bar */}
      <aside aria-label="Nonprofit Announcement" className="bg-[#0b1a30] text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0066FF] uppercase tracking-wider text-[11px]">
              Nonprofit &bull;
            </span>
            <span className="text-slate-300">
              Student-led coding and AI education &bull; 1 class per week &bull; 100% free community cohorts
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">LEARN / BUILD / BELONG</span>
          </div>
        </div>
      </aside>

      {/* Main Header Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <BrandLogo size="md" showText={true} linkToHome={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-[#0b1a30] hover:text-[#0066FF] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Action — Crisp, classic rectangular button (no round box) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white text-sm font-bold px-5 py-2.5 transition-colors"
            >
              <span>Register Student</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/register"
              className="bg-[#0066FF] text-white text-xs font-bold px-3 py-2"
            >
              Register
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0b1a30] hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-[#0b1a30] hover:bg-slate-50 hover:text-[#0066FF] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#0066FF] text-white px-4 py-3 text-sm font-bold"
              >
                <span>Register a Student (Free)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
