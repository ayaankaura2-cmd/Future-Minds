'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Send, 
  RotateCcw, 
  Info,
  FileCheck2
} from 'lucide-react';
import { RegistrationSubmission, RegistrationResponse, LearningLevel, CodingExperience } from '@/types/registration';

interface FormErrors {
  [key: string]: string | undefined;
}

const initialFormState: RegistrationSubmission = {
  guardianName: '',
  guardianEmail: '',
  guardianPhone: '',
  preferredContactMethod: 'email',
  studentFirstName: '',
  studentAge: 11,
  studentGrade: '',
  studentCountry: '',
  timeZone: '',
  learningLevel: 'beginner',
  codingExperience: 'none',
  learningGoals: '',
  additionalNotes: '',
  guardianConsent: false,
  contactConsent: false,
};

export const RegistrationForm: React.FC<{ initialLevel?: LearningLevel }> = ({ initialLevel }) => {
  const [formData, setFormData] = useState<RegistrationSubmission>({
    ...initialFormState,
    learningLevel: initialLevel || 'beginner',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<RegistrationResponse | null>(null);

  const validateClient = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.guardianName.trim() || formData.guardianName.trim().length < 2) {
      errs.guardianName = 'Guardian full name is required (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.guardianEmail.trim() || !emailRegex.test(formData.guardianEmail.trim())) {
      errs.guardianEmail = 'Please provide a valid guardian email address.';
    }

    if (!formData.studentFirstName.trim()) {
      errs.studentFirstName = 'Student first name is required.';
    }

    if (!formData.studentAge || formData.studentAge < 6 || formData.studentAge > 19) {
      errs.studentAge = 'Please enter a valid student age between 6 and 19.';
    }

    if (!formData.studentCountry.trim() || formData.studentCountry.trim().length < 2) {
      errs.studentCountry = 'Country of residence is required.';
    }

    if (!formData.learningLevel) {
      errs.learningLevel = 'Please select a preferred learning level.';
    }

    if (!formData.codingExperience) {
      errs.codingExperience = 'Please indicate prior coding and AI experience.';
    }

    if (!formData.guardianConsent) {
      errs.guardianConsent = 'You must confirm parent/guardian authority and registration consent.';
    }

    if (!formData.contactConsent) {
      errs.contactConsent = 'You must agree to receive class schedule communications.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'studentAge') {
      const numVal = parseInt(value, 10);
      setFormData((prev) => ({ ...prev, [name]: isNaN(numVal) ? 0 : numVal }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error on field edit
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleLevelSelect = (level: LearningLevel) => {
    setFormData((prev) => ({ ...prev, learningLevel: level }));
    if (errors.learningLevel) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.learningLevel;
        return next;
      });
    }
  };

  const handleExperienceSelect = (exp: CodingExperience) => {
    setFormData((prev) => ({ ...prev, codingExperience: exp }));
    if (errors.codingExperience) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.codingExperience;
        return next;
      });
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear this registration form?')) {
      setFormData(initialFormState);
      setErrors({});
      setSubmitResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent duplicate clicks
    
    const isValid = validateClient();
    if (!isValid) {
      const firstError = document.querySelector('.border-rose-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: RegistrationResponse = await response.json();

      if (!response.ok && data.fieldErrors) {
        setErrors(data.fieldErrors);
      } else {
        setSubmitResult(data);
      }
    } catch (err: unknown) {
      setErrors({
        form: 'An unexpected connection error occurred. Please verify your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS / RESULT STATE
  if (submitResult) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        {submitResult.configured && submitResult.success ? (
          // Live Supabase Saved State — Clean, natural, open
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-[#0066FF] flex-shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] block">
                  Registration Confirmed
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0b1a30] tracking-tight">
                  Registration Received for {formData.studentFirstName}
                </h2>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Thank you for registering with Future Minds. Your submission has been securely recorded in our database.
            </p>

            <div className="border-t border-b border-slate-200 py-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 uppercase font-semibold">Confirmation Reference</span>
                <span className="font-mono font-bold text-[#0b1a30] text-sm">
                  {submitResult.referenceNumber}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600 pt-1">
                <div>
                  <span className="text-slate-400 block">Guardian:</span>
                  <span className="font-medium text-[#0b1a30]">{formData.guardianName} ({formData.guardianEmail})</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Student &amp; Level:</span>
                  <span className="font-medium text-[#0b1a30] capitalize">{formData.studentFirstName} (Age {formData.studentAge}) &bull; {formData.learningLevel}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Country:</span>
                  <span className="font-medium text-[#0b1a30]">{formData.studentCountry}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Weekly Schedule:</span>
                  <span className="font-medium text-[#0b1a30]">1 Class Per Week (Online)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-600">
              <h4 className="font-bold text-[#0b1a30]">Next Steps:</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li>Our student-led education team reviews submissions on a rolling weekly basis.</li>
                <li>We will reach out to <strong>{formData.guardianEmail}</strong> with available weekly class time options that match your student’s level.</li>
                <li>Prior to the first session, you will receive our student portal link and cohort guidelines.</li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setSubmitResult(null);
                  setFormData(initialFormState);
                }}
                className="text-sm font-semibold text-[#0066FF] hover:underline"
              >
                Submit another student registration &rarr;
              </button>
              <span className="text-slate-300">&bull;</span>
              <Link
                href="/"
                className="text-sm font-semibold text-slate-600 hover:text-[#0b1a30]"
              >
                Return to homepage
              </Link>
            </div>
          </div>
        ) : (
          // Setup Notice — Honest persistence notice
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FileCheck2 className="w-8 h-8 text-amber-600 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block">
                  Validation Passed &bull; Setup Mode
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0b1a30] tracking-tight">
                  Form Successfully Validated
                </h2>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Your registration for <strong>{formData.studentFirstName}</strong> passed all client and server validations. 
              However, live Supabase database credentials have not been configured in <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">.env.local</code> yet.
            </p>

            <div className="space-y-2 text-xs text-slate-600 border-l-2 border-amber-500 pl-4 py-1">
              <p className="font-bold text-[#0b1a30]">Honest Persistence Notice:</p>
              <p className="leading-relaxed">
                In accordance with data integrity principles, the backend does not pretend a database write occurred without real Supabase keys.
                To permanently persist registrations into your Supabase PostgreSQL table, add your keys to <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">.env.local</code>:
              </p>
              <div className="font-mono text-[11px] text-slate-700 pt-1 space-y-0.5">
                <div>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</div>
                <div>SUPABASE_SERVICE_ROLE_KEY=your-service-role-key</div>
              </div>
            </div>

            <div className="border-t border-b border-slate-200 py-3 space-y-2 text-xs text-slate-600">
              <div className="font-bold text-[#0b1a30] uppercase text-[11px] tracking-wide">Validated Submission Payload:</div>
              <div className="grid grid-cols-2 gap-2">
                <div>Guardian: <span className="text-[#0b1a30] font-medium">{formData.guardianName}</span></div>
                <div>Email: <span className="text-[#0b1a30] font-medium">{formData.guardianEmail}</span></div>
                <div>Student: <span className="text-[#0b1a30] font-medium">{formData.studentFirstName} (Age {formData.studentAge})</span></div>
                <div>Level: <span className="text-[#0b1a30] font-medium capitalize">{formData.learningLevel}</span></div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setSubmitResult(null)}
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                Edit Registration
              </button>
              <Link
                href="/"
                className="text-sm font-semibold text-slate-600 hover:text-[#0b1a30]"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  // HUMAN-BUILT, UNIFIED FORM — NO STACKED BOXES
  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl mx-auto space-y-10 py-6">
      
      {/* 1. Header (Clean & Open, No Box Wrapper) */}
      <div className="space-y-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded overflow-hidden bg-white flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="Future Minds Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0b1a30] tracking-tight">
              Future Minds Student Registration
            </h1>
            <p className="text-xs font-bold text-[#0066FF] tracking-wider uppercase">
              LEARN / BUILD / BELONG &bull; Student-Led Nonprofit
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Welcome to Future Minds! We offer free, student-led coding and artificial intelligence classes for young learners worldwide. Classes meet for <strong>one live virtual session per week</strong> across Beginner, Intermediate, and Advanced tracks.
        </p>

        {/* Privacy Safeguarding Notice */}
        <div className="border-l-2 border-[#0066FF] pl-3.5 py-1 text-xs text-slate-600 space-y-1">
          <span className="font-bold text-[#0b1a30] block">Student Privacy &amp; Data Minimization:</span>
          <p className="leading-relaxed">
            We only collect the student&apos;s first name, age, and country of residence. 
            <strong> We never collect home addresses, school names, passwords, or financial details.</strong>
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>* Indicates required question</span>
          <span>Parent / Guardian Form</span>
        </div>
      </div>

      {/* Global Error Banner (if any) */}
      {errors.form && (
        <div className="bg-rose-50 border-l-2 border-rose-500 text-rose-800 p-4 rounded text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* 2. Guardian Information */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#0b1a30]">
            1. Parent or Guardian Information
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Class schedules and cohort placement links will be sent directly to the guardian.
          </p>
        </div>

        {/* Guardian Name */}
        <div className="space-y-1.5">
          <label htmlFor="guardianName" className="block text-sm font-semibold text-[#0b1a30]">
            Parent or Guardian Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="guardianName"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            placeholder="Jane Doe"
            className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#0b1a30] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF] ${
              errors.guardianName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
            }`}
          />
          {errors.guardianName && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.guardianName}</span>
            </p>
          )}
        </div>

        {/* Guardian Email */}
        <div className="space-y-1.5">
          <label htmlFor="guardianEmail" className="block text-sm font-semibold text-[#0b1a30]">
            Guardian Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="guardianEmail"
            name="guardianEmail"
            value={formData.guardianEmail}
            onChange={handleChange}
            placeholder="guardian@example.com"
            className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#0b1a30] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF] ${
              errors.guardianEmail ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
            }`}
          />
          {errors.guardianEmail && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.guardianEmail}</span>
            </p>
          )}
        </div>

        {/* Phone & Preferred Method Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="guardianPhone" className="block text-sm font-semibold text-[#0b1a30]">
              Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              id="guardianPhone"
              name="guardianPhone"
              value={formData.guardianPhone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 bg-white text-[#0b1a30] focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#0b1a30]">
              Preferred Contact Method <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-5 pt-2">
              <label className="flex items-center gap-2 text-sm text-[#0b1a30] cursor-pointer">
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value="email"
                  checked={formData.preferredContactMethod === 'email'}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#0066FF] focus:ring-[#0066FF]"
                />
                <span>Email</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-[#0b1a30] cursor-pointer">
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value="phone"
                  checked={formData.preferredContactMethod === 'phone'}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#0066FF] focus:ring-[#0066FF]"
                />
                <span>Phone / SMS</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Student Profile */}
      <div className="space-y-6 pt-8 border-t border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-[#0b1a30]">
            2. Student Profile
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            First name only. We do not ask for full legal names, home addresses, or school names.
          </p>
        </div>

        {/* Student First Name */}
        <div className="space-y-1.5">
          <label htmlFor="studentFirstName" className="block text-sm font-semibold text-[#0b1a30]">
            Student First Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="studentFirstName"
            name="studentFirstName"
            value={formData.studentFirstName}
            onChange={handleChange}
            placeholder="Alex"
            className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#0b1a30] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF] ${
              errors.studentFirstName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
            }`}
          />
          {errors.studentFirstName && (
            <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.studentFirstName}</span>
            </p>
          )}
        </div>

        {/* Age & Optional Grade Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="studentAge" className="block text-sm font-semibold text-[#0b1a30]">
              Student Age <span className="text-rose-500">*</span>
            </label>
            <select
              id="studentAge"
              name="studentAge"
              value={formData.studentAge}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#0b1a30] focus:outline-none focus:ring-2 focus:ring-[#0066FF] ${
                errors.studentAge ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
              }`}
            >
              {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((age) => (
                <option key={age} value={age}>
                  {age} years old
                </option>
              ))}
            </select>
            {errors.studentAge && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.studentAge}</span>
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="studentGrade" className="block text-sm font-semibold text-[#0b1a30]">
              Current Grade / Year <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="studentGrade"
              name="studentGrade"
              value={formData.studentGrade}
              onChange={handleChange}
              placeholder="e.g. 6th Grade, Year 7"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 bg-white text-[#0b1a30] focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            />
          </div>
        </div>

        {/* Country & Time Zone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="studentCountry" className="block text-sm font-semibold text-[#0b1a30]">
              Country of Residence <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="studentCountry"
              name="studentCountry"
              value={formData.studentCountry}
              onChange={handleChange}
              placeholder="e.g. United States, Canada, UK, etc."
              className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#0b1a30] focus:outline-none focus:ring-2 focus:ring-[#0066FF] ${
                errors.studentCountry ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300'
              }`}
            />
            {errors.studentCountry && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.studentCountry}</span>
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="timeZone" className="block text-sm font-semibold text-[#0b1a30]">
              Time Zone <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="timeZone"
              name="timeZone"
              value={formData.timeZone}
              onChange={handleChange}
              placeholder="e.g. EST (UTC-5), PST, GMT"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 bg-white text-[#0b1a30] focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            />
            <p className="text-[11px] text-slate-500">Helps us match you with a convenient weekly class slot.</p>
          </div>
        </div>
      </div>

      {/* 4. Preferred Learning Level (Clean Radio List, No Boxes) */}
      <div className="space-y-4 pt-8 border-t border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-[#0b1a30]">
            3. Preferred Learning Level <span className="text-rose-500">*</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            All tracks meet for <strong>one live virtual class per week</strong>.
          </p>
        </div>

        {errors.learningLevel && (
          <p className="text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.learningLevel}</span>
          </p>
        )}

        <div className="space-y-3 pt-1">
          {/* Beginner */}
          <label className="flex items-start gap-3 cursor-pointer py-1">
            <input
              type="radio"
              name="learningLevel"
              value="beginner"
              checked={formData.learningLevel === 'beginner'}
              onChange={() => handleLevelSelect('beginner')}
              className="mt-1 w-4 h-4 text-[#0066FF] focus:ring-[#0066FF]"
            />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#0b1a30]">Beginner Level</span>
                <span className="text-xs text-slate-500">&bull; Ages ~8–11</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                For students new to coding. Focuses on foundational logic, Scratch visual programming, and friendly introductory concepts of artificial intelligence.
              </p>
            </div>
          </label>

          {/* Intermediate */}
          <label className="flex items-start gap-3 cursor-pointer py-1">
            <input
              type="radio"
              name="learningLevel"
              value="intermediate"
              checked={formData.learningLevel === 'intermediate'}
              onChange={() => handleLevelSelect('intermediate')}
              className="mt-1 w-4 h-4 text-[#0066FF] focus:ring-[#0066FF]"
            />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#0b1a30]">Intermediate Level</span>
                <span className="text-xs text-slate-500">&bull; Ages ~11–14</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                For students ready to type real code. Focuses on Python fundamentals, web structure, algorithmic thinking, and machine learning predictions.
              </p>
            </div>
          </label>

          {/* Advanced */}
          <label className="flex items-start gap-3 cursor-pointer py-1">
            <input
              type="radio"
              name="learningLevel"
              value="advanced"
              checked={formData.learningLevel === 'advanced'}
              onChange={() => handleLevelSelect('advanced')}
              className="mt-1 w-4 h-4 text-[#0066FF] focus:ring-[#0066FF]"
            />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#0b1a30]">Advanced Level</span>
                <span className="text-xs text-slate-500">&bull; Ages ~13–17</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                For students with coding experience. Covers applied AI concepts, deeper programming structures, independent project development, and ethical AI considerations.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* 5. Coding & AI Experience (Clean Radio List, No Boxes) */}
      <div className="space-y-4 pt-8 border-t border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-[#0b1a30]">
            4. Prior Coding &amp; AI Experience <span className="text-rose-500">*</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            This helps our mentors group students into supportive, well-matched cohorts.
          </p>
        </div>

        {errors.codingExperience && (
          <p className="text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.codingExperience}</span>
          </p>
        )}

        <div className="space-y-2.5 pt-1">
          {[
            { id: 'none', label: 'No prior experience', desc: 'Completely new to coding and excited to start.' },
            { id: 'block_scratch', label: 'Some visual / block coding', desc: 'Experience with Scratch, Blockly, Code.org, or Lego robotics.' },
            { id: 'basic_syntax', label: 'Basic text coding', desc: 'Has written simple Python, HTML/CSS, or JavaScript programs.' },
            { id: 'intermediate_advanced', label: 'Intermediate or advanced', desc: 'Comfortable writing multi-file programs or building independent projects.' },
          ].map((exp) => (
            <label key={exp.id} className="flex items-start gap-3 cursor-pointer py-1">
              <input
                type="radio"
                name="codingExperience"
                value={exp.id}
                checked={formData.codingExperience === exp.id}
                onChange={() => handleExperienceSelect(exp.id as CodingExperience)}
                className="mt-1 w-4 h-4 text-[#0066FF] focus:ring-[#0066FF]"
              />
              <div>
                <span className="text-sm font-semibold text-[#0b1a30] block">{exp.label}</span>
                <span className="text-xs text-slate-500">{exp.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 6. Optional Goals & Notes */}
      <div className="space-y-5 pt-8 border-t border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-[#0b1a30]">
            5. Goals &amp; Accommodations <span className="text-slate-400 font-normal">(Optional)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Share what excites your student or any accommodations we should be mindful of.
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="learningGoals" className="block text-sm font-semibold text-[#0b1a30]">
            What is the student most curious or excited to learn?
          </label>
          <textarea
            id="learningGoals"
            name="learningGoals"
            rows={3}
            value={formData.learningGoals}
            onChange={handleChange}
            placeholder="e.g. Loves building games, curious how voice assistants work, wants to learn Python syntax..."
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 bg-white text-[#0b1a30] focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="additionalNotes" className="block text-sm font-semibold text-[#0b1a30]">
            Additional Notes or Learning Accommodations
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            rows={2}
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="e.g. Prefers visual demonstrations, scheduling considerations, accessibility notes..."
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 bg-white text-[#0b1a30] focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          />
        </div>
      </div>

      {/* 7. Consent & Acknowledgements */}
      <div className="space-y-5 pt-8 border-t border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-[#0b1a30]">
            6. Guardian Acknowledgements &amp; Consent <span className="text-rose-500">*</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Required for enrollment in our youth educational programs.
          </p>
        </div>

        {/* Checkbox 1: Guardian Authorization */}
        <div className="space-y-1">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="guardianConsent"
              checked={formData.guardianConsent}
              onChange={handleChange}
              className={`mt-1 w-4 h-4 text-[#0066FF] focus:ring-[#0066FF] ${
                errors.guardianConsent ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300'
              }`}
            />
            <span className="text-xs sm:text-sm text-[#0b1a30] leading-relaxed">
              <strong>Guardian Authority &amp; Enrollment Consent:</strong> I confirm that I am the parent, legal guardian, or authorized submitter for this student, and I give consent for their registration in Future Minds weekly educational classes. <span className="text-rose-500">*</span>
            </span>
          </label>
          {errors.guardianConsent && (
            <p className="text-xs text-rose-600 flex items-center gap-1 pl-7">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.guardianConsent}</span>
            </p>
          )}
        </div>

        {/* Checkbox 2: Contact Consent */}
        <div className="space-y-1 pt-1">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="contactConsent"
              checked={formData.contactConsent}
              onChange={handleChange}
              className={`mt-1 w-4 h-4 text-[#0066FF] focus:ring-[#0066FF] ${
                errors.contactConsent ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300'
              }`}
            />
            <span className="text-xs sm:text-sm text-[#0b1a30] leading-relaxed">
              <strong>Class Communication Agreement:</strong> I agree to receive communications from Future Minds via email (or phone) regarding weekly class schedules, mentor introductions, and cohort placement. <span className="text-rose-500">*</span>
            </span>
          </label>
          {errors.contactConsent && (
            <p className="text-xs text-rose-600 flex items-center gap-1 pl-7">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.contactConsent}</span>
            </p>
          )}
        </div>
      </div>

      {/* 8. Bottom Action Bar */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={handleReset}
          disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear form</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white transition-colors ${
            isSubmitting
              ? 'bg-[#0066FF]/70 cursor-not-allowed'
              : 'bg-[#0066FF] hover:bg-[#0052cc]'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Submitting registration...</span>
            </>
          ) : (
            <>
              <span>Submit Registration</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </form>
  );
};
