export type LearningLevel = 'beginner' | 'intermediate' | 'advanced';

export type CodingExperience =
  | 'none'
  | 'block_scratch'
  | 'basic_syntax'
  | 'intermediate_advanced';

export type PreferredContactMethod = 'email' | 'phone';

export interface RegistrationSubmission {
  guardianName: string;
  guardianEmail: string;
  guardianPhone?: string;
  preferredContactMethod: PreferredContactMethod;
  studentFirstName: string;
  studentAge: number;
  studentGrade?: string;
  studentCountry: string;
  timeZone?: string;
  learningLevel: LearningLevel;
  codingExperience: CodingExperience;
  learningGoals?: string;
  additionalNotes?: string;
  guardianConsent: boolean;
  contactConsent: boolean;
}

export interface RegistrationResponse {
  success: boolean;
  configured: boolean;
  referenceNumber?: string;
  registrationId?: string;
  message: string;
  code?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
  receivedData?: Partial<RegistrationSubmission>;
}
