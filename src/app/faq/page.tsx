import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, HelpCircle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Future Minds',
  description:
    'Answers to common questions about Future Minds weekly coding and AI classes, 1 class per week format, Beginner, Intermediate, and Advanced levels, and guardian registration.',
};

export default function FAQPage() {
  const faqs = [
    {
      q: 'Is Future Minds completely free?',
      a: 'Yes, 100% free. Future Minds is a student-led, volunteer-driven nonprofit educational initiative. We do not charge tuition, registration fees, platform charges, or software costs.',
    },
    {
      q: 'How many classes are there per week?',
      a: 'There is exactly one class per week (60 to 75 minutes per session). We specifically chose this format so that students can explore coding and AI consistently without feeling burdened by extra school commitments.',
    },
    {
      q: 'What are the three learning levels?',
      a: 'We offer Beginner (approx. ages 8–11; computational logic, block programming, and basic AI concepts), Intermediate (approx. ages 11–14; Python fundamentals, text coding, and understanding machine learning algorithms), and Advanced (approx. ages 13–17; applied AI, neural network concepts, and capstone software building).',
    },
    {
      q: 'Who teaches and mentors the students?',
      a: 'Classes are taught by experienced high school and university student mentors. Being close in age allows mentors to relate easily to younger learners, explain challenging ideas patiently, and foster an inviting classroom dynamic.',
    },
    {
      q: 'What computer hardware or software is required?',
      a: 'Any standard computer (desktop, laptop, or Chromebook) with internet access and a web browser like Chrome or Safari. All coding tools and sandboxes are web-based, so no expensive computer or graphics card is needed.',
    },
    {
      q: 'How do you safeguard student privacy?',
      a: 'We strictly minimize the personal information collected from students. On the registration form, we only ask for the student’s first name, age, and country of residence. We never collect home addresses, school names, passwords, or payment cards. All communications go through the parent or legal guardian.',
    },
    {
      q: 'How are students assigned to classes?',
      a: 'Parents select their preferred level during registration. Our mentor team reviews each submission, takes into account the student’s time zone and experience, and sends available weekly time slot options to the guardian before classes begin.',
    },
    {
      q: 'Can a student switch levels if the material is too easy or too hard?',
      a: 'Yes! After the first session, mentors check in with each student. If a student is ready for a more challenging track or would feel more comfortable reviewing fundamentals, our team adjusts their placement easily.',
    },
  ];

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
            Common Inquiries
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b1a30] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Everything you need to know about Future Minds weekly classes, curriculum tracks, student privacy, and how our student-led mentorship works.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border border-slate-200 rounded-lg bg-white p-5 open:bg-slate-50/50 transition-colors"
            >
              <summary className="font-bold text-[#0b1a30] text-base cursor-pointer list-none flex items-center justify-between gap-4">
                <span>{faq.q}</span>
                <span className="text-[#0066FF] font-mono text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="pt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* Still have questions banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-[#0b1a30]">Still have questions?</h3>
            <p className="text-xs text-slate-600">
              Our volunteer team is happy to help answer any specific questions.
            </p>
          </div>
          <a
            href="mailto:admissions@futureminds.org"
            className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <span>Email Admissions</span>
          </a>
        </div>

      </div>
    </div>
  );
}
