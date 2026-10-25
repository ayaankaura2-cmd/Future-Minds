'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowLeft, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'parent',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill out all required fields.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-[#0b1a30] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0b1a30] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] block">
            Contact &amp; Inquiries
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b1a30] tracking-tight">
            Get in touch with Future Minds.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            We are a student-led nonprofit. Whether you are a parent asking about class schedules, or a high school / university student interested in mentoring, our volunteer team is happy to assist.
          </p>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0b1a30]">Parent &amp; Student Admissions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              For questions regarding cohort availability, weekly schedule times, level placement, or enrollment:
            </p>
            <a href="mailto:admissions@futureminds.org" className="text-sm font-bold text-[#0066FF] hover:underline block pt-1">
              admissions@futureminds.org
            </a>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0b1a30]">Volunteer &amp; Mentorship</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              For high school or college students wanting to mentor, teach, or support curriculum development:
            </p>
            <a href="mailto:mentors@futureminds.org" className="text-sm font-bold text-[#0066FF] hover:underline block pt-1">
              mentors@futureminds.org
            </a>
          </div>
        </div>

        {/* Simple Honest Message Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#0b1a30]">Send an Inquiry Message</h2>
            <p className="text-xs text-slate-500 mt-1">
              We respond to inquiries on a rolling basis, typically within 24–48 hours.
            </p>
          </div>

          {submitted ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#0066FF] mx-auto" />
              <h3 className="text-lg font-bold text-[#0b1a30]">Thank you for reaching out!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                We have received your message. A member of our student volunteer team will review it and reply to <strong>{formData.email}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', inquiryType: 'parent', message: '' });
                }}
                className="mt-3 text-xs font-semibold text-[#0066FF] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contactName" className="block text-xs font-bold text-[#0b1a30] uppercase tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-[#0b1a30] focus:ring-2 focus:ring-[#0066FF] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contactEmail" className="block text-xs font-bold text-[#0b1a30] uppercase tracking-wider">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-[#0b1a30] focus:ring-2 focus:ring-[#0066FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#0b1a30] uppercase tracking-wider">
                  Inquiry Topic
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-[#0b1a30] focus:ring-2 focus:ring-[#0066FF] focus:outline-none"
                >
                  <option value="parent">Parent / Guardian: Class Questions or Placement</option>
                  <option value="volunteer">Student / Volunteer: Mentoring &amp; Teaching</option>
                  <option value="school">School / Library Community Partner</option>
                  <option value="other">General Question</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contactMsg" className="block text-xs font-bold text-[#0b1a30] uppercase tracking-wider">
                  Your Message *
                </label>
                <textarea
                  id="contactMsg"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="How can our student team help you?"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-[#0b1a30] focus:ring-2 focus:ring-[#0066FF] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white px-6 py-3 rounded-lg text-sm font-bold shadow-xs transition-colors"
              >
                <span>Send Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
