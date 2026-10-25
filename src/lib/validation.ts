import { z } from 'zod';

export const studentApplicationSchema = z.object({
  preferredName: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be under 50 characters'),
  ageRange: z.enum(['ages-9-12', 'ages-13-15', 'ages-16-18'], {
    message: 'Please select an age range',
  }),
  gradeLevel: z.string().min(1, 'Please select current school grade or year'),
  priorExperience: z.enum(['none', 'beginner', 'intermediate'], {
    message: 'Please select prior coding experience',
  }),
  programPreference: z.string().min(1, 'Please select a preferred program'),
  accessibilityNeeds: z.string().max(500, 'Accessibility notes must be under 500 characters').optional().or(z.literal('')),
  guardianName: z.string().min(2, 'Parent/Guardian full name is required').max(80),
  guardianEmail: z.string().email('Please enter a valid guardian email address'),
  guardianPhoneOptional: z.string().max(20).optional().or(z.literal('')),
  guardianConsentProvided: z.boolean().refine((val) => val === true, {
    message: 'Parent or guardian acknowledgement and consent must be confirmed',
  }),
});

export type StudentApplicationInput = z.infer<typeof studentApplicationSchema>;

export const volunteerApplicationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required').max(80),
  email: z.string().email('Valid email address is required'),
  phoneOptional: z.string().max(20).optional().or(z.literal('')),
  cityCountry: z.string().min(2, 'City and country are required'),
  preferredRole: z.enum(['instructor', 'teaching_assistant', 'curriculum_developer', 'mentor', 'operations'], {
    message: 'Please select a preferred volunteer role',
  }),
  skills: z.array(z.string()).min(1, 'Please select at least one skill area'),
  subjectsCanTeach: z.array(z.string()).min(1, 'Please select at least one subject area'),
  weeklyAvailabilityHours: z.number().min(2, 'Minimum 2 hours per week').max(20, 'Maximum 20 hours per week'),
  motivation: z.string().min(20, 'Please tell us why you wish to mentor with Future Minds (min 20 characters)').max(1000),
  relevantExperience: z.string().min(20, 'Please briefly describe your relevant background (min 20 characters)').max(1000),
  agreedToCodeOfConduct: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Future Minds Safeguarding and Volunteer Code of Conduct',
  }),
});

export type VolunteerApplicationInput = z.infer<typeof volunteerApplicationSchema>;

export const contactMessageSchema = z.object({
  fullName: z.string().min(2, 'Full name is required').max(80),
  email: z.string().email('Valid email address is required'),
  organizationType: z.enum(['parent', 'student', 'school', 'nonprofit', 'sponsor', 'press', 'other'], {
    message: 'Please select your role or inquiry type',
  }),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(120),
  message: z.string().min(15, 'Message must be at least 15 characters').max(2000),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const assignmentSubmissionSchema = z.object({
  lessonId: z.string().min(1),
  studentName: z.string().min(1),
  submissionText: z.string().min(10, 'Submission must be at least 10 characters'),
  projectRepoUrl: z.string().url('Must be a valid URL (e.g. GitHub, Replit, or Google Drive)').optional().or(z.literal('')),
  notesForInstructor: z.string().max(500).optional().or(z.literal('')),
});

export type AssignmentSubmissionInput = z.infer<typeof assignmentSubmissionSchema>;

// Dedicated Google-Forms-style Registration Schema
export const registrationSchema = z.object({
  guardianName: z
    .string()
    .trim()
    .min(2, 'Guardian full name is required (minimum 2 characters)')
    .max(100, 'Name must be under 100 characters'),
  guardianEmail: z
    .string()
    .trim()
    .email('Please enter a valid guardian email address'),
  guardianPhone: z
    .string()
    .trim()
    .max(30, 'Phone number must be under 30 characters')
    .optional()
    .or(z.literal('')),
  preferredContactMethod: z.enum(['email', 'phone'], {
    message: 'Please choose either email or phone for notifications',
  }),
  studentFirstName: z
    .string()
    .trim()
    .min(1, 'Student first name is required')
    .max(50, 'Student first name must be under 50 characters'),
  studentAge: z.coerce
    .number()
    .min(6, 'Student must be at least 6 years old')
    .max(19, 'Student must be 19 years old or younger'),
  studentGrade: z
    .string()
    .trim()
    .max(50)
    .optional()
    .or(z.literal('')),
  studentCountry: z
    .string()
    .trim()
    .min(2, 'Country of residence is required')
    .max(80),
  timeZone: z
    .string()
    .trim()
    .max(80)
    .optional()
    .or(z.literal('')),
  learningLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
    message: 'Please select a learning level: Beginner, Intermediate, or Advanced',
  }),
  codingExperience: z.enum(['none', 'block_scratch', 'basic_syntax', 'intermediate_advanced'], {
    message: 'Please select prior coding & AI experience',
  }),
  learningGoals: z
    .string()
    .trim()
    .max(1000, 'Learning goals must be under 1,000 characters')
    .optional()
    .or(z.literal('')),
  additionalNotes: z
    .string()
    .trim()
    .max(1000, 'Additional notes must be under 1,000 characters')
    .optional()
    .or(z.literal('')),
  guardianConsent: z.boolean().refine((val) => val === true, {
    message: 'You must confirm that you are the parent, legal guardian, or authorized submitter.',
  }),
  contactConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to receive communications regarding class schedules and placement.',
  }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

