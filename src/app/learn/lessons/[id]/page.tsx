'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { sampleCourses } from '@/lib/db/mock-data';
import { Lesson, LessonQuizQuestion } from '@/types';
import { submitAssignment } from '@/lib/db/repository';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Code, 
  HelpCircle, 
  FileText, 
  Send, 
  Sparkles,
  BookOpen
} from 'lucide-react';

function LessonDetailContent() {
  const params = useParams();
  const lessonId = params ? (params.id as string) : 'lesson-101';

  // Find the lesson
  let currentLesson: Lesson | null = null;
  let prevLessonId: string | null = null;
  let nextLessonId: string | null = null;

  const allLessons: Lesson[] = [];
  sampleCourses.forEach(mod => {
    mod.lessons.forEach(l => allLessons.push(l));
  });

  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  if (currentIndex !== -1) {
    currentLesson = allLessons[currentIndex];
    if (currentIndex > 0) prevLessonId = allLessons[currentIndex - 1].id;
    if (currentIndex < allLessons.length - 1) nextLessonId = allLessons[currentIndex + 1].id;
  } else {
    currentLesson = allLessons[0]; // fallback
  }

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Assignment state
  const [submissionText, setSubmissionText] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [isSubmittingAsg, setIsSubmittingAsg] = useState(false);
  const [asgSubmitted, setAsgSubmitted] = useState(false);

  const handleSelectAnswer = (qId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const handleCheckQuiz = () => {
    if (!currentLesson?.quiz) return;
    let correct = 0;
    currentLesson.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    setQuizScore(Math.round((correct / currentLesson.quiz.length) * 100));
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim() || !currentLesson) return;
    setIsSubmittingAsg(true);
    try {
      await submitAssignment({
        lessonId: currentLesson.id,
        studentName: 'Jordan K. (Grade 9)',
        submissionText,
        projectRepoUrl: repoUrl,
      });
      setAsgSubmitted(true);
    } catch {
      // error handled
    } finally {
      setIsSubmittingAsg(false);
    }
  };

  if (!currentLesson) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-base text-[#10233F]">Lesson not found.</p>
        <Link href="/learn/courses" className="text-xs font-bold text-[#1877F2] underline">
          Return to course catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-16">
      {/* Top Nav Back */}
      <div className="flex items-center justify-between border-b border-[#D2E4F0] pb-4">
        <Link
          href="/learn/dashboard"
          className="text-xs font-bold text-[#1877F2] hover:text-[#10233F] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono text-[#7187A8]">
          <Clock className="w-3.5 h-3.5" />
          <span>{currentLesson.durationMinutes} Minutes</span>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#1877F2] bg-[#E5F4F6] px-2.5 py-0.5 rounded uppercase">
            Lesson {currentLesson.order}
          </span>
          <span className="text-xs text-[#7187A8] font-mono">
            Course: AI Foundations 101
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#10233F] tracking-tight">
          {currentLesson.title}
        </h1>
        <p className="text-sm sm:text-base text-[#18365A] leading-relaxed">
          {currentLesson.summary}
        </p>
      </div>

      {/* Lesson Content Body */}
      <article className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 text-[#18365A] leading-relaxed text-sm sm:text-base">
        <div className="prose max-w-none space-y-4 whitespace-pre-line font-normal">
          {currentLesson.contentMarkdown}
        </div>

        {/* Code Snippet Box */}
        {currentLesson.codeSnippet && (
          <div className="space-y-2 pt-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#7187A8] px-2">
              <span className="flex items-center gap-1.5">
                <Code className="w-4 h-4 text-[#1877F2]" />
                <span>Sandbox Code Example</span>
              </span>
              <span className="uppercase text-[11px] bg-[#E5F4F6] text-[#10233F] px-2 py-0.5 rounded font-bold">
                {currentLesson.codeSnippet.language}
              </span>
            </div>
            <div className="bg-[#10233F] text-[#F4FAFF] p-5 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto border border-[#18365A]">
              <code>{currentLesson.codeSnippet.code}</code>
            </div>
          </div>
        )}
      </article>

      {/* Knowledge-Check Quiz Section */}
      {currentLesson.quiz && currentLesson.quiz.length > 0 && (
        <section className="bg-white border-2 border-[#1877F2]/40 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#D2E4F0] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">Instant Knowledge Check</span>
              <h2 className="text-xl font-black text-[#10233F] mt-0.5">
                Lesson Quiz ({currentLesson.quiz.length} Questions)
              </h2>
            </div>
            {quizScore !== null && (
              <span className={`text-sm font-black px-3 py-1 rounded-lg font-mono ${
                quizScore >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                Score: {quizScore}%
              </span>
            )}
          </div>

          <div className="space-y-6">
            {currentLesson.quiz.map((q, qIndex) => {
              const selected = selectedAnswers[q.id];
              return (
                <div key={q.id} className="space-y-3">
                  <div className="text-sm font-bold text-[#10233F] flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#E5F4F6] text-[#1877F2] font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {qIndex + 1}
                    </span>
                    <span>{q.prompt}</span>
                  </div>

                  <div className="space-y-2 pl-7">
                    {q.options.map((opt, optIndex) => {
                      const isChosen = selected === optIndex;
                      const isCorrect = optIndex === q.correctIndex;

                      let btnStyle = 'bg-[#F4FAFF] border-[#D2E4F0] hover:bg-[#E5F4F6] text-[#18365A]';
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-red-50 border-red-500 text-red-900';
                        }
                      } else if (isChosen) {
                        btnStyle = 'bg-[#10233F] text-white border-[#10233F]';
                      }

                      return (
                        <button
                          key={optIndex}
                          type="button"
                          onClick={() => handleSelectAnswer(q.id, optIndex)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-colors flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-2" />
                          )}
                          {quizSubmitted && isChosen && !isCorrect && (
                            <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="pl-7 text-xs bg-[#E5F4F6]/50 p-3 rounded-lg border-l-2 border-[#1877F2] text-[#18365A]">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#D2E4F0] flex items-center justify-between">
            {quizSubmitted ? (
              <button
                type="button"
                onClick={handleResetQuiz}
                className="text-xs font-bold text-[#1877F2] underline"
              >
                Retake Quiz
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCheckQuiz}
                disabled={Object.keys(selectedAnswers).length < currentLesson.quiz.length}
                className="bg-[#10233F] hover:bg-[#18365A] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors disabled:opacity-40"
              >
                Check Answers
              </button>
            )}
          </div>
        </section>
      )}

      {/* Assignment Submission Section */}
      {currentLesson.assignmentBrief && (
        <section className="bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2 border-b border-[#D2E4F0] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1877F2]">Practical Exercise</span>
            <h2 className="text-xl font-black text-[#10233F]">
              {currentLesson.assignmentBrief.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#18365A] leading-relaxed">
              {currentLesson.assignmentBrief.instructions}
            </p>
          </div>

          <div className="bg-[#F4FAFF] p-4 rounded-xl border border-[#D2E4F0] space-y-2">
            <div className="text-xs font-bold text-[#10233F] uppercase tracking-wider">Evaluation Rubric:</div>
            <ul className="space-y-1 text-xs text-[#18365A]">
              {currentLesson.assignmentBrief.rubricPoints.map((pt, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#19C6D2]" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {asgSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="text-sm font-bold text-emerald-900">Assignment Submitted for Review!</div>
              <p className="text-xs text-emerald-800">
                Your submission has been logged. Your assigned instructor will review your work and provide constructive feedback within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitAssignment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#10233F]">
                  Your Reflection &amp; Answers <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Type your answers, observations, and ethical edge cases..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D2E4F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#10233F]">
                  Project Link / Code URL (Optional)
                </label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/... or https://replit.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D2E4F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#19C6D2]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingAsg || !submissionText.trim()}
                className="inline-flex items-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-40"
              >
                {isSubmittingAsg ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit to Instructor</span>
                    <Send className="w-3.5 h-3.5 text-[#19C6D2]" />
                  </>
                )}
              </button>
            </form>
          )}
        </section>
      )}

      {/* Previous / Next Lesson Navigation */}
      <div className="flex items-center justify-between border-t border-[#D2E4F0] pt-6">
        {prevLessonId ? (
          <Link
            href={`/learn/lessons/${prevLessonId}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#10233F] hover:text-[#1877F2] p-2 rounded-lg border border-[#D2E4F0] hover:bg-[#F4FAFF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Lesson</span>
          </Link>
        ) : (
          <div></div>
        )}

        {nextLessonId ? (
          <Link
            href={`/learn/lessons/${nextLessonId}`}
            className="inline-flex items-center gap-2 bg-[#10233F] hover:bg-[#18365A] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-colors"
          >
            <span>Next Lesson</span>
            <ArrowRight className="w-4 h-4 text-[#19C6D2]" />
          </Link>
        ) : (
          <Link
            href="/learn/certificates"
            className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#10233F] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-colors"
          >
            <span>Finish Track &amp; Claim Certificate</span>
            <ArrowRight className="w-4 h-4 text-[#19C6D2]" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function LessonDetailPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#7187A8]">Loading lesson content...</div>}>
      <LessonDetailContent />
    </Suspense>
  );
}
