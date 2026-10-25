import { 
  Program, 
  StudentApplication, 
  VolunteerApplication, 
  ContactMessage, 
  ProjectShowcase, 
  ImpactMetrics, 
  CourseModule, 
  Lesson,
  AuditLog,
  ApplicationStatus 
} from '@/types';
import { 
  initialPrograms, 
  sampleCourses, 
  sampleProjects, 
  initialImpactMetrics, 
  sampleApplications, 
  sampleVolunteerApplications,
  sampleTeamMembers
} from './mock-data';
import { StudentApplicationInput, VolunteerApplicationInput, ContactMessageInput, AssignmentSubmissionInput } from '../validation';
import { isSupabaseConfigured, supabase } from '../supabase';

// In-memory persistent stores for local evaluation
const memoryPrograms: Program[] = [...initialPrograms];
const memoryStudentApps: StudentApplication[] = [...sampleApplications];
const memoryVolunteerApps: VolunteerApplication[] = [...sampleVolunteerApplications];
const memoryProjects: ProjectShowcase[] = [...sampleProjects];
const memoryContacts: ContactMessage[] = [];
const memorySubmissions: { id: string; createdAt: string; lessonId: string; studentName: string; text: string; repoUrl?: string; grade?: string; feedback?: string }[] = [];
const memoryAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-16T18:00:00.000Z',
    action: 'SYSTEM_BOOTSTRAP',
    actorEmail: 'system@futureminds.internal',
    targetType: 'system',
    targetId: 'seed',
    details: 'Future Minds local platform repository initialized.'
  }
];

function generateRefNumber(prefix: string): string {
  const year = '26';
  const random = Math.floor(1000 + Math.random() * 9000);
  return `FM-${prefix}-${year}-${random}`;
}

export async function getPrograms(): Promise<Program[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) return data as Program[];
    } catch {
      // Fallback to memory
    }
  }
  return memoryPrograms;
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const programs = await getPrograms();
  return programs.find(p => p.slug === slug) || null;
}

export async function createProgram(program: Omit<Program, 'id'>): Promise<Program> {
  const newProgram: Program = {
    ...program,
    id: `prog-${Date.now()}`
  };
  memoryPrograms.push(newProgram);
  await recordAuditLog('PROGRAM_CREATED', 'admin@futureminds.org', 'program', newProgram.id, `Created program "${newProgram.title}"`);
  return newProgram;
}

export async function updateProgramStatus(id: string, status: Program['status']): Promise<Program | null> {
  const program = memoryPrograms.find(p => p.id === id);
  if (program) {
    program.status = status;
    await recordAuditLog('PROGRAM_STATUS_UPDATED', 'admin@futureminds.org', 'program', id, `Updated status to "${status}"`);
    return program;
  }
  return null;
}

export async function submitStudentApplication(input: StudentApplicationInput): Promise<StudentApplication> {
  const application: StudentApplication = {
    id: `app-stu-${Date.now()}`,
    referenceNumber: generateRefNumber('STU'),
    createdAt: new Date().toISOString(),
    status: 'pending',
    preferredName: input.preferredName,
    ageRange: input.ageRange,
    gradeLevel: input.gradeLevel,
    priorExperience: input.priorExperience,
    programPreference: input.programPreference,
    accessibilityNeeds: input.accessibilityNeeds || undefined,
    guardianName: input.guardianName,
    guardianEmail: input.guardianEmail,
    guardianPhoneOptional: input.guardianPhoneOptional || undefined,
    guardianConsentProvided: true,
    guardianConsentVerifiedAt: new Date().toISOString()
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('applications').insert({
        type: 'student',
        reference_number: application.referenceNumber,
        preferred_name: application.preferredName,
        age_range: application.ageRange,
        grade_level: application.gradeLevel,
        prior_experience: application.priorExperience,
        program_preference: application.programPreference,
        accessibility_needs: application.accessibilityNeeds,
        guardian_name: application.guardianName,
        guardian_email: application.guardianEmail,
        guardian_phone: application.guardianPhoneOptional,
        guardian_consent: true,
        status: 'pending'
      });
    } catch {
      // Continue with memory store
    }
  }

  memoryStudentApps.unshift(application);
  await recordAuditLog('STUDENT_APPLICATION_SUBMITTED', input.guardianEmail, 'application', application.referenceNumber, `Application received for ${input.preferredName}`);
  return application;
}

export async function submitVolunteerApplication(input: VolunteerApplicationInput): Promise<VolunteerApplication> {
  const application: VolunteerApplication = {
    id: `app-vol-${Date.now()}`,
    referenceNumber: generateRefNumber('VOL'),
    createdAt: new Date().toISOString(),
    status: 'pending',
    fullName: input.fullName,
    email: input.email,
    phoneOptional: input.phoneOptional || undefined,
    cityCountry: input.cityCountry,
    preferredRole: input.preferredRole,
    skills: input.skills,
    subjectsCanTeach: input.subjectsCanTeach,
    weeklyAvailabilityHours: input.weeklyAvailabilityHours,
    motivation: input.motivation,
    relevantExperience: input.relevantExperience,
    agreedToCodeOfConduct: true,
    backgroundCheckVerified: false
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('applications').insert({
        type: 'volunteer',
        reference_number: application.referenceNumber,
        full_name: application.fullName,
        email: application.email,
        phone: application.phoneOptional,
        city_country: application.cityCountry,
        preferred_role: application.preferredRole,
        skills: application.skills,
        subjects_can_teach: application.subjectsCanTeach,
        weekly_hours: application.weeklyAvailabilityHours,
        motivation: application.motivation,
        experience: application.relevantExperience,
        agreed_code_of_conduct: true,
        status: 'pending'
      });
    } catch {
      // Continue with memory store
    }
  }

  memoryVolunteerApps.unshift(application);
  await recordAuditLog('VOLUNTEER_APPLICATION_SUBMITTED', input.email, 'application', application.referenceNumber, `Volunteer application from ${input.fullName}`);
  return application;
}

export async function getStudentApplications(): Promise<StudentApplication[]> {
  return [...memoryStudentApps];
}

export async function getVolunteerApplications(): Promise<VolunteerApplication[]> {
  return [...memoryVolunteerApps];
}

export async function updateStudentApplicationStatus(id: string, status: ApplicationStatus, notes?: string): Promise<StudentApplication | null> {
  const app = memoryStudentApps.find(a => a.id === id || a.referenceNumber === id);
  if (app) {
    app.status = status;
    if (notes !== undefined) app.reviewNotes = notes;
    await recordAuditLog('APPLICATION_STATUS_UPDATED', 'admin@futureminds.org', 'application', app.referenceNumber, `Status set to ${status}. Notes: ${notes || 'none'}`);
    return app;
  }
  return null;
}

export async function updateVolunteerApplicationStatus(id: string, status: ApplicationStatus, notes?: string, verifiedBackground?: boolean): Promise<VolunteerApplication | null> {
  const app = memoryVolunteerApps.find(a => a.id === id || a.referenceNumber === id);
  if (app) {
    app.status = status;
    if (notes !== undefined) app.reviewNotes = notes;
    if (verifiedBackground !== undefined) app.backgroundCheckVerified = verifiedBackground;
    await recordAuditLog('VOLUNTEER_STATUS_UPDATED', 'admin@futureminds.org', 'volunteer_application', app.referenceNumber, `Status set to ${status}. Verified check: ${app.backgroundCheckVerified}`);
    return app;
  }
  return null;
}

export async function submitContactMessage(input: ContactMessageInput): Promise<ContactMessage> {
  const message: ContactMessage = {
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    fullName: input.fullName,
    email: input.email,
    organizationType: input.organizationType,
    subject: input.subject,
    message: input.message,
    status: 'new'
  };
  memoryContacts.unshift(message);
  await recordAuditLog('CONTACT_MESSAGE_RECEIVED', input.email, 'contact', message.id, `Subject: ${input.subject}`);
  return message;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  return [...memoryContacts];
}

export async function getProjectShowcases(onlyApproved = true): Promise<ProjectShowcase[]> {
  if (onlyApproved) {
    return memoryProjects.filter(p => p.isApproved);
  }
  return [...memoryProjects];
}

export async function approveProject(id: string): Promise<ProjectShowcase | null> {
  const project = memoryProjects.find(p => p.id === id);
  if (project) {
    project.isApproved = true;
    await recordAuditLog('PROJECT_APPROVED', 'admin@futureminds.org', 'project', project.id, `Approved project "${project.title}" for public showcase.`);
    return project;
  }
  return null;
}

export async function getCourseModules(courseId = 'ai-foundations-101'): Promise<CourseModule[]> {
  return sampleCourses.filter(c => c.courseId === courseId);
}

export async function getLessonById(lessonId: string): Promise<Lesson | null> {
  for (const module of sampleCourses) {
    const found = module.lessons.find(l => l.id === lessonId);
    if (found) return found;
  }
  return null;
}

export async function submitAssignment(input: AssignmentSubmissionInput): Promise<{ id: string; success: boolean }> {
  const record = {
    id: `sub-${Date.now()}`,
    createdAt: new Date().toISOString(),
    lessonId: input.lessonId,
    studentName: input.studentName,
    text: input.submissionText,
    repoUrl: input.projectRepoUrl || undefined,
    grade: 'Pending Review',
    feedback: 'Instructor will review your submission within 48 hours.'
  };
  memorySubmissions.unshift(record);
  await recordAuditLog('ASSIGNMENT_SUBMITTED', input.studentName, 'submission', record.id, `Lesson ID: ${input.lessonId}`);
  return { id: record.id, success: true };
}

export async function getImpactMetrics(): Promise<ImpactMetrics> {
  return {
    ...initialImpactMetrics,
    studentsEnrolled: initialImpactMetrics.studentsEnrolled + (memoryStudentApps.length - sampleApplications.length)
  };
}

export async function getTeamMembers() {
  return sampleTeamMembers;
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  return [...memoryAuditLogs].reverse();
}

export async function recordAuditLog(action: string, actorEmail: string, targetType: string, targetId: string, details: string) {
  memoryAuditLogs.push({
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    action,
    actorEmail,
    targetType,
    targetId,
    details
  });
}
