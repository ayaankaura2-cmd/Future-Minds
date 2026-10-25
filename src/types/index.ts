export type ProgramLevel = 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
export type ProgramAgeGroup = 'ages-9-12' | 'ages-13-15' | 'ages-16-18' | 'all-ages';
export type ProgramDeliveryMode = 'virtual' | 'hybrid' | 'in-person';
export type ApplicationStatus = 'pending' | 'under_review' | 'interview' | 'approved' | 'waitlisted' | 'rejected' | 'inactive';
export type UserRole = 'admin' | 'coordinator' | 'instructor' | 'volunteer' | 'student' | 'guardian';

export interface Program {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: ProgramLevel;
  ageGroup: ProgramAgeGroup;
  durationWeeks: number;
  hoursPerWeek: number;
  deliveryMode: ProgramDeliveryMode;
  status: 'planned' | 'upcoming' | 'enrolling' | 'active' | 'completed' | 'archived';
  prerequisites: string[];
  learningOutcomes: string[];
  syllabus: {
    week: number;
    title: string;
    description: string;
    topics: string[];
  }[];
  cohortsCount?: number;
  featured?: boolean;
}

export interface Cohort {
  id: string;
  programId: string;
  name: string;
  startDate: string;
  endDate: string;
  scheduleDescription: string;
  capacity: number;
  enrolledCount: number;
  instructorName: string;
  deliveryMode: ProgramDeliveryMode;
  status: 'upcoming' | 'open' | 'in_progress' | 'completed';
}

export interface Course {
  id: string;
  slug: string;
  programId: string;
  title: string;
  description: string;
  modulesCount: number;
  lessonsCount: number;
  estimatedHours: number;
  level: ProgramLevel;
}

export interface LessonQuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  order: number;
  durationMinutes: number;
  summary: string;
  contentMarkdown: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  quiz?: LessonQuizQuestion[];
  assignmentBrief?: {
    id: string;
    title: string;
    instructions: string;
    rubricPoints: string[];
  };
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  order: number;
  description: string;
  lessons: Lesson[];
}

export interface StudentApplication {
  id: string;
  referenceNumber: string;
  createdAt: string;
  status: ApplicationStatus;
  preferredName: string;
  ageRange: string;
  gradeLevel: string;
  priorExperience: 'none' | 'beginner' | 'intermediate';
  programPreference: string;
  accessibilityNeeds?: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhoneOptional?: string;
  guardianConsentProvided: boolean;
  guardianVerificationToken?: string;
  guardianConsentVerifiedAt?: string;
  reviewNotes?: string;
  reviewedBy?: string;
}

export interface VolunteerApplication {
  id: string;
  referenceNumber: string;
  createdAt: string;
  status: ApplicationStatus;
  fullName: string;
  email: string;
  phoneOptional?: string;
  cityCountry: string;
  preferredRole: 'instructor' | 'teaching_assistant' | 'curriculum_developer' | 'mentor' | 'operations';
  skills: string[];
  subjectsCanTeach: string[];
  weeklyAvailabilityHours: number;
  motivation: string;
  relevantExperience: string;
  agreedToCodeOfConduct: boolean;
  backgroundCheckVerified: boolean;
  reviewNotes?: string;
  reviewedBy?: string;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  slug: string;
  studentPseudonym: string; // Protects minor identity e.g. "Maya K. (Age 14)"
  ageGroup: string;
  programName: string;
  description: string;
  impactTag: string;
  techStack: string[];
  thumbnailUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  isApproved: boolean;
  featured: boolean;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'leadership' | 'advisor' | 'curriculum' | 'volunteer_lead';
  bio: string;
  isPlaceholder: boolean;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface ImpactMetrics {
  studentsEnrolled: number;
  programsCompleted: number;
  projectsCompleted: number;
  activeVolunteers: number;
  partnerOrganizations: number;
  hoursOfInstruction: number;
  lastUpdated: string;
  isPilotDemonstration: boolean;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  organizationType: 'parent' | 'student' | 'school' | 'nonprofit' | 'sponsor' | 'press' | 'other';
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'responded' | 'archived';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actorEmail: string;
  targetType: string;
  targetId: string;
  details: string;
}
