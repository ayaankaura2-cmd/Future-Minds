'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { volunteerApplicationSchema, VolunteerApplicationInput } from '@/lib/validation';
import { submitVolunteerApplication } from '@/lib/db/repository';
import { VolunteerApplication } from '@/types';
import { 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  Clock, 
  Code,
  BookOpen
} from 'lucide-react';

function VolunteerApplicationForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');

  const defaultRole = (roleParam && roleParam.toLowerCase().includes('assistant'))
    ? 'teaching_assistant'
    : (roleParam && roleParam.toLowerCase().includes('curriculum'))
    ? 'curriculum_developer'
    : (roleParam && roleParam.toLowerCase().includes('mentor'))
    ? 'mentor'
    : 'instructor';

  const [formData, setFormData] = useState<Partial<VolunteerApplicationInput>>({
    fullName: '',
    email: '',
    phoneOptional: '',
    cityCountry: '',
    preferredRole: defaultRole as any,
    skills: ['Python'],
    subjectsCanTeach: ['Python Foundations'],
    weeklyAvailabilityHours: 3,
    motivation: '',
    relevantExperience: '',
    agreedToCodeOfConduct: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<VolunteerApplication | null>(null);

  const availableSkills = ['Python', 'Scratch / Block Coding', 'JavaScript / Web', 'Machine Learning / AI', 'Curriculum Writing', 'Public Speaking', 'Git & GitHub'];
  const availableSubjects = ['AI Explorers', 'Code Creators', 'Python Foundations', 'Web Innovators', 'AI Project Lab (Capstone)'];

  const toggleSkill = (skill: string) => {
    const current = formData.skills || [];
    if (current.includes(skill)) {
      setFormData({ ...formData, skills: current.filter(s => s !== skill) });
    } else {
      setFormData({ ...formData, skills: [...current, skill] });
    }
  };

  const toggleSubject = (subject: string) => {
    const current = formData.subjectsCanTeach || [];
    if (current.includes(subject)) {
      setFormData({ ...formData, subjectsCanTeach: current.filter(s => s !== subject) });
    } else {
      setFormData({ ...formData, subjectsCanTeach: [...current, subject] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = volunteerApplicationSchema.safeParse(formData);
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
      const app = await submitVolunteerApplication(result.data);
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
            <Heart className="w-4 h-4" />
            <span>Join Our Global Mentor Community</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#10233F] tracking-tight">
            Volunteer Mentor Application
          </h1>
          <p className="text-base sm:text-lg text-[#18365A] max-w-2xl mx-auto leading-relaxed">
            Help demystify artificial intelligence and code for children around the world. All volunteer positions include curriculum support and flexible scheduling.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {submittedApp ? (
          /* Success Screen */
          <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 sm:p-12 shadow-lg space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Application Received &bull; Under Review
              </span>
              <h2 className="text-3xl font-black text-[#10233F]">
                Thank You, {submittedApp.fullName}!
              </h2>
              <p className="text-sm text-[#18365A] max-w-md mx-auto">
                Your volunteer application has been logged in our mentor database with reference:
              </p>
              <div className="font-mono text-xl font-black text-[#10233F] bg-[#E5F4F6] py-3 px-6 rounded-xl inline-block border border-[#D2E4F0] mt-2 select-all">
                {submittedApp.referenceNumber}
              </div>
            </div>

            <div className="bg-[#F4FAFF] border border-[#D2E4F0] rounded-2xl p-6 text-left space-y-3 text-xs sm:text-sm text-[#18365A]">
              <h3 className="font-bold text-[#10233F] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#1877F2]" />
                <span>Onboarding Process Notice</span>
              </h3>
              <p>
                A receipt has been dispatched to <strong>{submittedApp.email}</strong>. Our volunteer coordinator reviews applications weekly and will contact you regarding an introductory interview and safeguarding orientation.
              </p>
              <p className="text-xs text-[#7187A8]">
                Note: In adherence to our safeguarding policy, background check verification is conducted during final onboarding before classroom access is granted.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/programs"
                className="bg-[#10233F] hover:bg-[#18365A] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-colors"
              >
                Review Curriculum Syllabi
              </Link>
              <Link
                href="/"
                className="bg-white border border-[#D2E4F0] hover:bg-[#E5F4F6] text-[#10233F] font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Application Form */
          <div className="bg-white border border-[#D2E4F0] rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
            {errors.form && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* SECTION 1: Personal & Contact */}
              <div className="space-y-4">
                <div className="border-b border-[#D2E4F0] pb-2">
                  <h2 className="text-lg font-black text-[#10233F]">1. Contact &amp; Background</h2>
                  <p className="text-xs text-[#7187A8]">Basic information for the volunteer coordination team.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label htmlFor="fullName" className="text-xs font-bold text-[#10233F]">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Samantha Chen"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] ${
                        errors.fullName ? 'border-red-500 bg-red-50' : 'border-[#D2E4F0]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-500">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-bold text-[#10233F]">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@university.edu"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-[#D2E4F0]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City & Country */}
                  <div className="space-y-1">
                    <label htmlFor="cityCountry" className="text-xs font-bold text-[#10233F]">
                      City &amp; Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="cityCountry"
                      type="text"
                      value={formData.cityCountry}
                      onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                      placeholder="e.g. Toronto, Canada"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] ${
                        errors.cityCountry ? 'border-red-500 bg-red-50' : 'border-[#D2E4F0]'
                      }`}
                    />
                    {errors.cityCountry && <p className="text-[11px] text-red-500">{errors.cityCountry}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-xs font-bold text-[#10233F]">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phoneOptional}
                      onChange={(e) => setFormData({ ...formData, phoneOptional: e.target.value })}
                      placeholder="e.g. +1 (555) 123-4567"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D2E4F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Role & Skills */}
              <div className="space-y-4 pt-4 border-t border-[#D2E4F0]">
                <div className="border-b border-[#D2E4F0] pb-2">
                  <h2 className="text-lg font-black text-[#10233F]">2. Role &amp; Subject Areas</h2>
                  <p className="text-xs text-[#7187A8]">Select where your talents can best support our students.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred Role */}
                  <div className="space-y-1">
                    <label htmlFor="preferredRole" className="text-xs font-bold text-[#10233F]">
                      Preferred Volunteer Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="preferredRole"
                      value={formData.preferredRole}
                      onChange={(e) => setFormData({ ...formData, preferredRole: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D2E4F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] bg-white"
                    >
                      <option value="instructor">Cohort Instructor (Lead workshops)</option>
                      <option value="teaching_assistant">Teaching Assistant (TA / Breakout mentor)</option>
                      <option value="curriculum_developer">Curriculum Developer (Lesson writing)</option>
                      <option value="mentor">Student Project Mentor (Capstone incubator)</option>
                      <option value="operations">Operations &amp; Outreach Volunteer</option>
                    </select>
                  </div>

                  {/* Availability */}
                  <div className="space-y-1">
                    <label htmlFor="hours" className="text-xs font-bold text-[#10233F]">
                      Weekly Availability: {formData.weeklyAvailabilityHours} Hours / Week <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="hours"
                      type="range"
                      min={2}
                      max={15}
                      step={1}
                      value={formData.weeklyAvailabilityHours}
                      onChange={(e) => setFormData({ ...formData, weeklyAvailabilityHours: Number(e.target.value) })}
                      className="w-full mt-2"
                    />
                    <div className="flex justify-between text-[10px] text-[#7187A8]">
                      <span>2 hrs (TA / Support)</span>
                      <span>4–6 hrs (Lead Instructor)</span>
                      <span>10+ hrs</span>
                    </div>
                  </div>
                </div>

                {/* Skills Checkboxes */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#10233F]">
                    Technical Skills &amp; Proficiencies <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.map((skill) => {
                      const isSelected = (formData.skills || []).includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${
                            isSelected
                              ? 'bg-[#10233F] text-white border-[#10233F]'
                              : 'bg-white text-[#18365A] border-[#D2E4F0] hover:bg-[#F4FAFF]'
                          }`}
                        >
                          {isSelected && '✓ '}
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                  {errors.skills && <p className="text-[11px] text-red-500">{errors.skills}</p>}
                </div>

                {/* Subjects can teach */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#10233F]">
                    Tracks You Can Teach or Assist <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableSubjects.map((sub) => {
                      const isSelected = (formData.subjectsCanTeach || []).includes(sub);
                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => toggleSubject(sub)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${
                            isSelected
                              ? 'bg-[#1877F2] text-white border-[#1877F2]'
                              : 'bg-white text-[#18365A] border-[#D2E4F0] hover:bg-[#F4FAFF]'
                          }`}
                        >
                          {isSelected && '✓ '}
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                  {errors.subjectsCanTeach && <p className="text-[11px] text-red-500">{errors.subjectsCanTeach}</p>}
                </div>
              </div>

              {/* SECTION 3: Motivation & Experience */}
              <div className="space-y-4 pt-4 border-t border-[#D2E4F0]">
                <div className="border-b border-[#D2E4F0] pb-2">
                  <h2 className="text-lg font-black text-[#10233F]">3. Motivation &amp; Safeguarding Agreement</h2>
                </div>

                <div className="space-y-1">
                  <label htmlFor="motivation" className="text-xs font-bold text-[#10233F]">
                    Why do you wish to volunteer with Future Minds? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="motivation"
                    rows={3}
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    placeholder="Tell us what excites you about empowering young people with AI and coding (min 20 characters)..."
                    className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] ${
                      errors.motivation ? 'border-red-500 bg-red-50' : 'border-[#D2E4F0]'
                    }`}
                  />
                  {errors.motivation && <p className="text-[11px] text-red-500">{errors.motivation}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="experience" className="text-xs font-bold text-[#10233F]">
                    Briefly describe your relevant educational or technical experience <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="experience"
                    rows={3}
                    value={formData.relevantExperience}
                    onChange={(e) => setFormData({ ...formData, relevantExperience: e.target.value })}
                    placeholder="Mention tutoring, coding projects, university coursework, or club leadership (min 20 characters)..."
                    className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2] ${
                      errors.relevantExperience ? 'border-red-500 bg-red-50' : 'border-[#D2E4F0]'
                    }`}
                  />
                  {errors.relevantExperience && <p className="text-[11px] text-red-500">{errors.relevantExperience}</p>}
                </div>

                {/* Code of Conduct Checkbox */}
                <div className="bg-[#F4FAFF] border border-[#D2E4F0] rounded-xl p-4 space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreedToCodeOfConduct === true}
                      onChange={(e) => setFormData({ ...formData, agreedToCodeOfConduct: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded text-[#10233F] focus:ring-[#19C6D2]"
                    />
                    <span className="text-xs text-[#18365A] leading-relaxed">
                      <strong>Safeguarding &amp; Code of Conduct Agreement:</strong> I agree to uphold the <Link href="/safeguarding" className="text-[#1877F2] underline">Future Minds Volunteer Safeguarding Code</Link>. I understand that all student sessions are recorded and supervised, that private 1-on-1 contact with minors is prohibited, and that background check verification is required prior to classroom placement.
                    </span>
                  </label>
                  {errors.agreedToCodeOfConduct && (
                    <p className="text-[11px] text-red-500 pl-7">{errors.agreedToCodeOfConduct}</p>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white py-4 px-8 rounded-xl font-black text-base shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Volunteer Application</span>
                      <ArrowRight className="w-5 h-5 text-[#19C6D2]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

export default function VolunteerApplicationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#7187A8]">Loading volunteer application...</div>}>
      <VolunteerApplicationForm />
    </Suspense>
  );
}
