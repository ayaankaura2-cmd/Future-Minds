'use client';

import React from 'react';
import { Award, ShieldCheck, Download, Printer, CheckCircle2, Sparkles } from 'lucide-react';
import { BrandLogo } from '@/components/brand/Logo';

export default function StudentCertificatesPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D2E4F0] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
            Verifiable Certificates
          </h1>
          <p className="text-xs sm:text-sm text-[#7187A8] mt-1">
            Official credentials earned through completion of pilot programs and capstones.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-[#19C6D2]" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Certificate Graphic Card */}
      <div className="bg-white border-8 border-[#10233F] rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden text-center space-y-6">
        {/* Subtle decorative border corners */}
        <div className="absolute top-4 left-4 text-xs font-mono text-[#7187A8] tracking-widest uppercase">
          Future Minds &bull; Youth AI Initiative
        </div>
        <div className="absolute top-4 right-4 text-xs font-mono text-[#7187A8]">
          ID: FM-CERT-26-9041
        </div>

        {/* Center Logo */}
        <div className="flex justify-center pt-4">
          <BrandLogo size="lg" showText={false} linkToHome={false} />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">
            Certificate of Achievement
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#10233F]">
            Jordan K.
          </h2>
          <p className="text-xs sm:text-sm text-[#7187A8] max-w-lg mx-auto pt-1">
            has successfully completed all requirements, coding labs, and ethical algorithmic reviews for
          </p>
        </div>

        <div className="bg-[#E5F4F6] py-3 px-6 rounded-xl inline-block border border-[#D2E4F0]">
          <h3 className="text-lg sm:text-xl font-black text-[#10233F] tracking-tight">
            AI Explorers: Foundational Computer Vision &amp; Ethics
          </h3>
          <div className="text-xs text-[#1877F2] font-semibold mt-0.5">
            6-Week Supervised Pilot Cohort &bull; Fall 2026
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-[#D2E4F0] max-w-lg mx-auto text-xs text-[#18365A]">
          <div className="space-y-1">
            <div className="font-serif italic text-base text-[#10233F]">Future Minds Education Council</div>
            <div className="border-t border-[#10233F] pt-1 text-[11px] font-bold text-[#7187A8] uppercase tracking-wider">
              Curriculum Director
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-serif italic text-base text-[#10233F]">Samantha Chen</div>
            <div className="border-t border-[#10233F] pt-1 text-[11px] font-bold text-[#7187A8] uppercase tracking-wider">
              Cohort Instructor
            </div>
          </div>
        </div>

        {/* Verification footer */}
        <div className="pt-4 flex items-center justify-center gap-2 text-[11px] text-[#7187A8] font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Digitally Verified Credential &bull; Cryptographic Hash: 8f4b...912a</span>
        </div>
      </div>
    </div>
  );
}
