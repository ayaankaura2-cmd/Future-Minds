import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-white text-[#0b1a30]">
      
      {/* ==============================================================================
          1. HERO SECTION
          Heading: "Helping young minds explore the world of technology."
          Natural, human, crisp editorial layout — no round boxes
          ============================================================================== */}
      <section className="pt-12 sm:pt-16 lg:pt-24 pb-16 lg:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Brand Tagline — Crisp, classic text, no pill box */}
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#0066FF] uppercase">
                <span>LEARN / BUILD / BELONG &bull; Student-Led Nonprofit</span>
              </div>

              {/* Required Exact Heading — Warm editorial serif */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#0b1a30] tracking-tight leading-[1.15]">
                Helping young minds explore the world of technology.
              </h1>

              {/* Subheading / Description */}
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl font-sans">
                Future Minds is a student-led nonprofit making coding and artificial intelligence education more accessible to young learners around the world. We offer free, interactive weekly classes designed to nurture genuine curiosity and practical skills.
              </p>

              {/* Program Attributes Highlights — Clean typographical metrics */}
              <div className="flex flex-wrap items-center gap-8 pt-2 pb-2 text-sm text-[#0b1a30]">
                <div>
                  <span className="font-bold text-[#0066FF] block text-xl font-serif leading-tight">1 Class / Week</span>
                  <span className="text-slate-500 text-xs">Manageable weekend schedule</span>
                </div>
                <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                <div>
                  <span className="font-bold text-[#0b1a30] block text-xl font-serif leading-tight">3 Levels</span>
                  <span className="text-slate-500 text-xs">Beginner, Intermediate, Advanced</span>
                </div>
                <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                <div>
                  <span className="font-bold text-emerald-700 block text-xl font-serif leading-tight">100% Free</span>
                  <span className="text-slate-500 text-xs">Zero tuition or material fees</span>
                </div>
              </div>

              {/* Primary Call to Actions — Crisp rectangular button (no round box) */}
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white px-7 py-3.5 text-base font-bold transition-colors"
                >
                  <span>Register a Student</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="#levels"
                  className="inline-flex items-center gap-2 text-[#0b1a30] hover:text-[#0066FF] px-2 py-3.5 text-base font-semibold transition-colors underline-offset-4 hover:underline"
                >
                  <span>Explore Learning Levels</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Parent Assurance Note */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
                <span>Parent/guardian registration required &bull; Minimal student data collected</span>
              </div>
            </div>

            {/* Right Column: Authentic Student Learning Photo — Crisp editorial framing, no round box */}
            <div className="lg:col-span-5">
              <div className="space-y-3">
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src="/students-coding.jpg"
                    alt="Young learners working together on a programming project in a library"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Students working collaboratively during a weekly Future Minds session. Small cohorts ensure every learner is heard.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==============================================================================
          2. MISSION SECTION
          LEARN / BUILD / BELONG
          Open editorial layout — all round card boxes removed
          ============================================================================== */}
      <section id="mission" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 scroll-mt-20">
        <div className="space-y-14">
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#0b1a30] tracking-tight leading-tight">
              Democratizing technology education, one young learner at a time.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
              Future Minds was founded by students who experienced firsthand how early access to programming transforms a child&apos;s curiosity into creative confidence. As a student-led nonprofit, our mission is to eliminate barriers to computer science and AI education for learners everywhere through our core values:
            </p>
          </div>

          {/* Three Pillars: LEARN / BUILD / BELONG — Open Editorial Typography, Zero Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pt-8 border-t border-slate-200">
            
            {/* Pillar 1: LEARN */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold tracking-widest text-[#0066FF] uppercase">
                01 / LEARN
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#0b1a30] tracking-tight">
                Foundational understanding over memorization.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We break down complex technical topics into clear, intuitive concepts. Students develop logical thinking, computational problem-solving, and a grounded understanding of how computer software and AI tools really work.
              </p>
            </div>

            {/* Pillar 2: BUILD */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold tracking-widest text-[#0066FF] uppercase">
                02 / BUILD
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#0b1a30] tracking-tight">
                Hands-on projects that spark creative agency.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                True learning happens by creating. From interactive visual stories to text-based Python programs and machine learning experiments, every student builds original projects they can proudly show to family and friends.
              </p>
            </div>

            {/* Pillar 3: BELONG */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold tracking-widest text-[#0066FF] uppercase">
                03 / BELONG
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#0b1a30] tracking-tight">
                An inclusive, supportive peer community.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Technology is for everyone. We build a welcoming, respectful environment where no question is too basic, mistakes are celebrated as learning steps, and mentors guide younger learners with empathy and patience.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==============================================================================
          3. PROGRAM OVERVIEW SECTION
          Format: One class per week
          Open editorial structure — all card boxes removed
          ============================================================================== */}
      <section id="programs" className="border-t border-slate-200 py-20 sm:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">
              Program Overview
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#0b1a30] tracking-tight leading-tight">
              One class per week. Thoughtfully structured for young learners.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
              We know children and teenagers have busy school schedules and family commitments. Future Minds is intentionally structured around <strong>one live interactive class per week</strong> (60 to 75 minutes), giving students the optimal balance of live guidance and self-directed exploration.
            </p>
          </div>

          {/* 4 Open Editorial Points (No card boxes) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-4">
            
            <div className="space-y-2 border-l-2 border-[#0066FF] pl-4">
              <h3 className="text-base font-bold text-[#0b1a30]">Weekly Rhythm</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Classes meet once every week. Between sessions, students have optional, lightweight practice challenges to reinforce what they learned without homework stress.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#0066FF] pl-4">
              <h3 className="text-base font-bold text-[#0b1a30]">Small Cohorts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cohorts are kept small (typically 4–6 students per mentor) to ensure every student receives personalized attention and answers to their questions.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#0066FF] pl-4">
              <h3 className="text-base font-bold text-[#0b1a30]">Live Interactive Code</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No dry pre-recorded video lectures. Sessions feature hands-on coding together, live code walkthroughs, and collaborative debugging in a friendly space.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#0066FF] pl-4">
              <h3 className="text-base font-bold text-[#0b1a30]">Supervised &amp; Safe</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All classes are conducted under our Child Safeguarding Policy. Guardians receive regular progress updates and class schedules directly.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==============================================================================
          4. LEARNING LEVELS (Beginner, Intermediate, Advanced)
          Open syllabus tracks — all SaaS pricing cards removed
          ============================================================================== */}
      <section id="levels" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 border-t border-slate-200 scroll-mt-20">
        <div className="space-y-14">
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">
              Curriculum Tracks
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#0b1a30] tracking-tight leading-tight">
              Beginner, Intermediate, and Advanced learning levels.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
              Whether your student has never typed a single line of code or has already built simple programs, we offer a dedicated track tailored to their developmental stage and experience.
            </p>
          </div>

          {/* Three Open Syllabus Columns — Open Layout, Zero Box Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 pt-4">
            
            {/* Level 1: Beginner */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">
                    Level 1
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-xs text-slate-500 font-medium">Ages ~8–11</span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-xs text-slate-500 font-medium">1 Class / Week</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#0b1a30]">
                  Beginner Level
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Designed for students who are brand new to programming. We demystify computers through intuitive block coding and friendly explorations of artificial intelligence.
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0b1a30] block">
                    Curriculum Highlights:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>Computational logic, loops, variables, and conditionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>Interactive visual programming with Scratch and block tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>Introduction to AI: how computers recognize speech and images</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>Creative capstone: Building an animated interactive game</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/register?level=beginner"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors group"
                >
                  <span>Register for Beginner Level</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Level 2: Intermediate */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">
                    Level 2
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-xs text-slate-500 font-medium">Ages ~11–14</span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-xs text-slate-500 font-medium">1 Class / Week</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#0b1a30]">
                  Intermediate Level
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  For students ready to graduate from block coding to real typed syntax. Students learn Python fundamentals, explore web basics, and understand algorithm mechanics.
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0b1a30] block">
                    Curriculum Highlights:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>Python fundamentals: data types, lists, dictionaries, and functions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>Basic web concepts: HTML structure and CSS styling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>How AI models make predictions and classify data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>Project: Command-line utility tool or interactive text game</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/register?level=intermediate"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors group"
                >
                  <span>Register for Intermediate Level</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Level 3: Advanced */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF]">
                    Level 3
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-xs text-slate-500 font-medium">Ages ~13–17</span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-xs text-slate-500 font-medium">1 Class / Week</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#0b1a30]">
                  Advanced Level
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  For students with coding experience seeking deeper knowledge in algorithms, applied AI concepts, software design, and ethical engineering.
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0b1a30] block">
                    Curriculum Highlights:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>Object-oriented programming, data structures, and APIs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>Machine learning concepts: neural networks and language models</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>Ethics in AI: algorithmic bias, data privacy, and societal impact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span>Independent capstone: Custom AI-powered software application</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/register?level=advanced"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors group"
                >
                  <span>Register for Advanced Level</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==============================================================================
          5. WHAT STUDENTS CAN EXPECT
          Authentic photo + conversational, human journey
          ============================================================================== */}
      <section id="what-to-expect" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 border-t border-slate-200 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Authentic Mentor Photo — Crisp framing */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="space-y-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src="/student-mentor.jpg"
                  alt="High school student mentor helping a younger learner with coding"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-slate-500">
                Relatable, patient mentorship: student instructors who remember what it feels like to be a beginner.
              </p>
            </div>
          </div>

          {/* Copy and Details — Open list without heavy card boxes */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                Student Experience
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#0b1a30] tracking-tight leading-tight">
                What students and parents can expect.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-sans">
                We believe learning computer science should be an exciting exploration, not an intimidating hurdle. Here is what your student experiences when they join a Future Minds cohort:
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#0b1a30]">1. Approachable Student Mentors</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our instructors are high school and college students who are active programmers and passionate teachers. Because of the close age gap, young learners feel comfortable asking questions without fear of feeling judged.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#0b1a30]">2. Tangible Projects, Not Memorization</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every lesson includes active building. Students don&apos;t just memorize syntax; they code games, simulate systems, and create functional digital projects.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#0b1a30]">3. Zero Stress &amp; No High-Stakes Tests</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  There are no letter grades or stressful exams. Our goal is to foster genuine interest, self-reliance, and computational confidence.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#0b1a30]">4. Direct Guardian Transparency</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Guardians receive regular updates on what topics were covered in class, what their student built, and schedule confirmations for the upcoming week.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==============================================================================
          6. FREQUENTLY ASKED QUESTIONS (FAQ)
          Classic editorial list with hairline dividers — no card boxes around items
          ============================================================================== */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 border-t border-slate-200 scroll-mt-20">
        <div className="space-y-10">
          
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#0b1a30] tracking-tight">
              Common questions from parents and guardians.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Have a question that isn&apos;t covered here? Feel free to reach out to our team at{' '}
              <a href="mailto:admissions@futureminds.org" className="text-[#0066FF] hover:underline font-semibold">
                admissions@futureminds.org
              </a>.
            </p>
          </div>

          {/* Clean, open editorial accordion */}
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            
            <details className="group py-5 transition-colors">
              <summary className="font-bold text-[#0b1a30] text-base cursor-pointer list-none flex items-center justify-between gap-4">
                <span>Is Future Minds truly 100% free?</span>
                <span className="text-[#0066FF] font-mono text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <div className="pt-3 text-sm text-slate-600 leading-relaxed pr-8">
                Yes, completely. Future Minds is a student-led nonprofit educational organization run entirely by passionate volunteer instructors and mentors. We do not charge registration fees, monthly subscriptions, or software costs.
              </div>
            </details>

            <details className="group py-5 transition-colors">
              <summary className="font-bold text-[#0b1a30] text-base cursor-pointer list-none flex items-center justify-between gap-4">
                <span>How often do classes meet?</span>
                <span className="text-[#0066FF] font-mono text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <div className="pt-3 text-sm text-slate-600 leading-relaxed pr-8">
                Classes meet exactly once per week for 60 to 75 minutes. This predictable schedule ensures students make meaningful, continuous progress without feeling overwhelmed by their regular schoolwork.
              </div>
            </details>

            <details className="group py-5 transition-colors">
              <summary className="font-bold text-[#0b1a30] text-base cursor-pointer list-none flex items-center justify-between gap-4">
                <span>Who teaches the classes?</span>
                <span className="text-[#0066FF] font-mono text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <div className="pt-3 text-sm text-slate-600 leading-relaxed pr-8">
                Classes are taught by student mentors — talented high school and university students with real coding, competition, and engineering experience. All mentors are trained on our curriculum and follow strict Child Safeguarding rules.
              </div>
            </details>

            <details className="group py-5 transition-colors">
              <summary className="font-bold text-[#0b1a30] text-base cursor-pointer list-none flex items-center justify-between gap-4">
                <span>What computer or equipment is required?</span>
                <span className="text-[#0066FF] font-mono text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <div className="pt-3 text-sm text-slate-600 leading-relaxed pr-8">
                A desktop computer, laptop, or Chromebook with a working internet connection and a standard web browser (such as Google Chrome, Firefox, or Safari). No expensive software or high-end graphics cards are necessary.
              </div>
            </details>

            <details className="group py-5 transition-colors">
              <summary className="font-bold text-[#0b1a30] text-base cursor-pointer list-none flex items-center justify-between gap-4">
                <span>How is my student placed into the right level?</span>
                <span className="text-[#0066FF] font-mono text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <div className="pt-3 text-sm text-slate-600 leading-relaxed pr-8">
                Parents select their preferred level (Beginner, Intermediate, or Advanced) on the registration form and share their student&apos;s prior experience. Before the first session, our team reviews each submission and confirms the cohort match with the parent.
              </div>
            </details>

            <details className="group py-5 transition-colors">
              <summary className="font-bold text-[#0b1a30] text-base cursor-pointer list-none flex items-center justify-between gap-4">
                <span>How does Future Minds safeguard student privacy?</span>
                <span className="text-[#0066FF] font-mono text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <div className="pt-3 text-sm text-slate-600 leading-relaxed pr-8">
                We strictly minimize personal data collection. We only ask for the student&apos;s first name, age, and country of residence. We never ask for full legal names of minors, home addresses, school names, passwords, or payment cards. All communications go directly through the authorized guardian.
              </div>
            </details>

          </div>

        </div>
      </section>

      {/* ==============================================================================
          7. FINAL REGISTRATION CALL TO ACTION
          Open human invitation — crisp rectangular button, no round box
          ============================================================================== */}
      <section className="border-t border-slate-200 py-20 sm:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] block">
            Enrollment Open &bull; 100% Free
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#0b1a30] tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to explore coding and AI with Future Minds?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed font-sans">
            Register your student today. Classes meet once per week, cohorts are small, and all materials are completely free for accepted learners.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white text-base font-bold px-8 py-4 transition-colors"
            >
              <span>Go to Registration Form</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="text-xs text-slate-400 pt-1">
            Takes approximately 2 minutes &bull; Guardian submission required
          </div>
        </div>
      </section>

      {/* ==============================================================================
          8. CONTACT SECTION
          Open, sincere contact details — no container card box
          ============================================================================== */}
      <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 scroll-mt-20">
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">
              Get In Touch
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1a30]">
              Have questions or want to partner with us?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl font-sans">
              Future Minds is a student-led educational initiative. We welcome inquiries from parents, student volunteers interested in mentoring, and community organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
            <div className="space-y-1">
              <span className="font-bold text-[#0b1a30] block">Parent &amp; Student Inquiries</span>
              <p className="text-xs text-slate-500">Questions about class levels, cohort times, or registration:</p>
              <a href="mailto:admissions@futureminds.org" className="text-[#0066FF] font-semibold hover:underline block pt-1">
                admissions@futureminds.org
              </a>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-[#0b1a30] block">Volunteer &amp; Mentorship</span>
              <p className="text-xs text-slate-500">High school or college students looking to mentor with us:</p>
              <a href="mailto:mentors@futureminds.org" className="text-[#0066FF] font-semibold hover:underline block pt-1">
                mentors@futureminds.org
              </a>
            </div>
          </div>

          <div className="text-xs text-slate-400 border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span>Official response window: 24–48 hours</span>
            <span>All volunteer mentors undergo safeguarding screening</span>
          </div>
        </div>
      </section>

    </div>
  );
}
