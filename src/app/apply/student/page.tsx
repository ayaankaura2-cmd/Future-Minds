'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { studentApplicationSchema, StudentApplicationInput } from '@/lib/validation';
import { submitStudentApplication } from '@/lib/db/repository';
import { StudentApplication } from '@/types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  BookOpen, 
  Sparkles,
  Info
} from 'lucide-react';

function StudentApplicationForm() {
  const searchParams = useSearchParams();
  const initialProgram = searchParams.get('program') || 'AI Explorers';

  const [formData, setFormData] = useState<Partial<StudentApplicationInput>>({
    preferredName: '',
    ageRange: 'ages-13-15',
    gradeLevel: 'Grade 8',
    priorExperience: 'none',
    programPreference: initialProgram,
    accessibilityNeeds: '',
    guardianName: '',
    guardianEmail: '',
    guardianPhoneOptional: '',
    guardianConsentProvided: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<StudentApplication | null>(null);

  useEffect(() => {
    const prog = searchParams.get('program');
    if (prog) {
      setFormData(prev => ({ ...prev, programPreference: prog }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = studentApplicationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        if (issue.path[0]) {
          fieldErrors[String(issue.path[0])] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const app = await submitStudentApplication(result.data);
      setSubmittedApp(app);
    } catch {
      setErrors({ form: 'An unexpected error occurred while saving your application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#E5F4F6] to-[#F4FAFF] py-16 border-b border-[#D2E4F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#10233F] text-[#19C6D2] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-4 h-4" />
            <span>2026 Virtual Pilot Cohorts</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#10233F] tracking-tight">
            Student Pilot Application
          </h1>
          <p className="text-base sm:text-lg text-[#18365A] max-w-2xl mx-auto leading-relaxed">
            Free, hands-on artificial intelligence and coding education. Applications take approximately 3 minutes to complete.
          </p>
        </div>
      </section>

      {/* Main Application Container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {submittedApp ? (
          /* Success Screen */
          <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 sm:p-12 shadow-lg space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Application Received &bull; Pending Review
              </span>
              <h2 className="text-3xl font-black text-[#10233F]">
                Welcome, {submittedApp.preferredName}!
              </h2>
              <p className="text-sm text-[#18365A] max-w-md mx-auto">
                Your pilot application has been safely logged in our database with reference number:
              </p>
              <div className="font-mono text-xl font-black text-[#10233F] bg-[#E5F4F6] py-3 px-6 rounded-xl inline-block border border-[#D2E4F0] mt-2 select-all">
                {submittedApp.referenceNumber}
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="bg-[#F4FAFF] border border-[#D2E4F0] rounded-2xl p-6 text-left space-y-3 text-xs sm:text-sm text-[#18365A]">
              <h3 className="font-bold text-[#10233F] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#1877F2]" />
                <span>Next Step: Parent or Guardian Verification</span>
              </h3>
              <p>
                In accordance with our child safeguarding standards, an enrollment verification confirmation notice has been dispatched to <strong>{submittedApp.guardianEmail}</strong>.
              </p>
              <p className="text-xs text-[#7187A8]">
                Please ask your guardian to check their inbox. Once verified, our admissions team will confirm cohort scheduling details within 48 business hours.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/learn"
                className="bg-[#10233F] hover:bg-[#18365A] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-sm transition-colors"
              >
                Explore Student Portal
              </Link>
              <Link
                href="/programs"
                className="bg-white border border-[#D2E4F0] hover:bg-[#E5F4F6] text-[#10233F] font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-colors"
              >
                Review Track Syllabus
              </Link>
            </div>
          </div>
        ) : (
          /* Application Form */
          <div className="bg-white border border-[#D2E4F0] rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
            {/* Data Minimization Notice */}
            <div className="bg-[#E5F4F6]/70 border border-[#D2E4F0] rounded-xl p-4 flex items-start gap-3 text-xs text-[#18365A]">
              <Lock className="w-5 h-5 text-[#10233F] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#10233F]">Student Data Minimization Pledge:</strong> We do not collect home addresses, exact birth dates, or sensitive student records. All information is encrypted and accessible only to authorized cohort administrators.
              </div>
            </div>

            {errors.form && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* SECTION 1: Student Information */}
              <div className="space-y-4">
                <div className="border-b border-[#D2E4F0] pb-2">
                  <h2 className="text-lg font-black text-[#10233F] flex items-center gap-2">
                    <User className="w-5 h-5 text-[#1877F2]" />
                    <span>1. Student Information</span>
                  </h2>
                  <p className="text-xs text-[#7187A8]">Tell us how the student prefers to be addressed.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred Name */}
                  <div className="space-y-1">
                    <label htmlFor="preferredName" className="text-xs font-bold text-[#10233F]">
                      Preferred Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="preferredName"
                      type="text"
                      value={formData.preferredName}
                      onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
                      placeholder="e.g. Maya or Jordan"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] ${
                        errors.preferredName ? 'border-red-500 bg-red-50' : 'border-[#D2E4F0]'
                      }`}
                    />
                    {errors.preferredName && <p className="text-[11px] text-red-500">{errors.preferredName}</p>}
                  </div>

                  {/* Age Range */}
                  <div className="space-y-1">
                    <label htmlFor="ageRange" className="text-xs font-bold text-[#10233F]">
                      Age Range <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="ageRange"
                      value={formData.ageRange}
                      onChange={(e) => setFormData({ ...formData, ageRange: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D2E4F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] bg-white"
                    >
                      <option value="ages-9-12">Ages 9–12 (Middle School)</option>
                      <option value="ages-13-15">Ages 13–15 (Junior High / Early High)</option>
                      <option value="ages-16-18">Ages 16–18 (High School Senior / Capstone)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Current Grade Level */}
                  <div className="space-y-1">
                    <label htmlFor="gradeLevel" className="text-xs font-bold text-[#10233F]">
                      Current School Grade / Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="gradeLevel"
                      type="text"
                      value={formData.gradeLevel}
                      onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                      placeholder="e.g. Grade 7, Year 9, etc."
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] ${
                        errors.gradeLevel ? 'border-red-500 bg-red-50' : 'border-[#D2E4F0]'
                      }`}
                    />
                    {errors.gradeLevel && <p className="text-[11px] text-red-500">{errors.gradeLevel}</p>}
                  </div>

                  {/* Prior Experience */}
                  <div className="space-y-1">
                    <label htmlFor="priorExperience" className="text-xs font-bold text-[#10233F]">
                      Prior Coding Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="priorExperience"
                      value={formData.priorExperience}
                      onChange={(e) => setFormData({ ...formData, priorExperience: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D2E4F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] bg-white"
                    >
                      <option value="none">Brand New / No previous coding</option>
                      <option value="beginner">Beginner (Scratch, basic HTML, or Hour of Code)</option>
                      <option value="intermediate">Intermediate (Some Python, JavaScript, or CS class)</option>
                    </select>
                  </div>
                </div>

                {/* Program Preference */}
                <div className="space-y-1">
                  <label htmlFor="programPreference" className="text-xs font-bold text-[#10233F]">
                    Preferred Pilot Program <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="programPreference"
                    value={formData.programPreference}
                    onChange={(e) => setFormData({ ...formData, programPreference: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D2E4F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] bg-white"
                  >
                    <option value="AI Explorers">AI Explorers (Ages 9–12 &bull; Beginner Vision &amp; Ethics)</option>
                    <option value="Code Creators">Code Creators (Ages 9–12 &bull; Scratch &amp; Computational Thinking)</option>
                    <option value="Python Foundations">Python Foundations (Ages 13–15 &bull; Real-World Python)</option>
                    <option value="Web Innovators">Web Innovators (Ages 13–15 &bull; Accessible HTML, CSS &amp; JS)</option>
                    <option value="AI Project Lab">AI Project Lab (Ages 16–18 &bull; Advanced Community Capstone)</option>
                  </select>
                </div>

                {/* Optional Accessibility Needs */}
                <div className="space-y-1">
                  <label htmlFor="accessibilityNeeds" className="text-xs font-bold text-[#10233F]">
                    Learning Accessibility or Accommodation Needs (Optional)
                  </label>
                  <textarea
                    id="accessibilityNeeds"
                    rows={2}
                    value={formData.accessibilityNeeds}
                    onChange={(e) => setFormData({ ...formData, accessibilityNeeds: e.target.value })}
                    placeholder="e.g. Needs high contrast materials, captioning, or extra time on exercises."
                    className="w-full px-3.5 py-2 rounded-lg border border-[#D2E4F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2]"
                  />
                  <p className="text-[10px] text-[#7187A8]">Information is confidential and shared solely with assigned instructors.</p>
                </div>
              </div>

              {/* SECTION 2: Parent or Legal Guardian Information & Consent */}
              <div className="space-y-4 pt-4 border-t border-[#D2E4F0]">
                <div className="border-b border-[#D2E4F0] pb-2">
                  <h2 className="text-lg font-black text-[#10233F] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#1877F2]" />
                    <span>2. Parent or Legal Guardian Verification</span>
                  </h2>
                  <p className="text-xs text-[#7187A8]">Required for all minor participants under safeguarding rules.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Guardian Name */}
                  <div className="space-y-1">
                    <label htmlFor="guardianName" className="text-xs font-bold text-[#10233F]">
                      Parent / Guardian Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="guardianName"
                      type="text"
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      placeholder="e.g. Dr. Robert Chen or Sarah Jenkins"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] ${
                        errors.guardianName ? 'border-red-500 bg-red-50' : 'border-[#D2E4F0]'
                      }`}
                    />
                    {errors.guardianName && <p className="text-[11px] text-red-500">{errors.guardianName}</p>}
                  </div>

                  {/* Guardian Email */}
                  <div className="space-y-1">
                    <label htmlFor="guardianEmail" className="text-xs font-bold text-[#10233F]">
                      Parent / Guardian Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="guardianEmail"
                      type="email"
                      value={formData.guardianEmail}
                      onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                      placeholder="guardian.email@domain.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] ${
                        errors.guardianEmail ? 'border-red-500 bg-red-50' : 'border-[#D2E4F0]'
                      }`}
                    />
                    {errors.guardianEmail && <p className="text-[11px] text-red-500">{errors.guardianEmail}</p>}
                  </div>
                </div>

                {/* Optional Phone */}
                <div className="space-y-1">
                  <label htmlFor="guardianPhone" className="text-xs font-bold text-[#10233F]">
                    Guardian Contact Phone (Optional)
                  </label>
                  <input
                    id="guardianPhone"
                    type="tel"
                    value={formData.guardianPhoneOptional}
                    onChange={(e) => setFormData({ ...formData, guardianPhoneOptional: e.target.value })}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D2E4F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2]"
                  />
                  <p className="text-[10px] text-[#7187A8]">Used solely for emergency session communication if email is unreachable.</p>
                </div>

                {/* Consent Checkbox & Acknowledgment */}
                <div className="bg-[#F4FAFF] border border-[#D2E4F0] rounded-xl p-4 space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.guardianConsentProvided === true}
                      onChange={(e) => setFormData({ ...formData, guardianConsentProvided: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded text-[#10233F] focus:ring-[#19C6D2]"
                    />
                    <span className="text-xs text-[#18365A] leading-relaxed">
                      <strong>Guardian Consent Confirmation:</strong> I confirm that I am the parent or legal guardian of the applicant. I give permission for them to participate in Future Minds supervised virtual pilot cohorts, and I agree to the <Link href="/safeguarding" className="text-[#1877F2] underline">Child Safeguarding Commitments</Link> and <Link href="/privacy" className="text-[#1877F2] underline">Youth Privacy Notice</Link>.
                    </span>
                  </label>
                  {errors.guardianConsentProvided && (
                    <p className="text-[11px] text-red-500 pl-7">{errors.guardianConsentProvided}</p>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white py-4 px-8 rounded-xl font-black text-base shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Logging Application...</span>
                  ) : (
                    <>
                      <span>Submit Student Pilot Application</span>
                      <ArrowRight className="w-5 h-5 text-[#19C6D2]" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-[#7187A8] mt-2">
                  No credit card required. Free pilot program under adult educational oversight.
                </p>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

export default function StudentApplicationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#7187A8]">Loading student application...</div>}>
      <StudentApplicationForm />
    </Suspense>
  );
}
