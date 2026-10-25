import { test, describe } from 'node:test';
import assert from 'node:assert';
import { 
  studentApplicationSchema, 
  volunteerApplicationSchema, 
  contactMessageSchema,
  registrationSchema
} from '../lib/validation';

describe('Validation Schemas & Safeguarding Constraints', () => {
  test('studentApplicationSchema accepts valid minor application with guardian consent', () => {
    const validData = {
      preferredName: 'Maya Chen',
      ageRange: 'ages-13-15',
      gradeLevel: 'Grade 8',
      priorExperience: 'beginner',
      programPreference: 'Python Foundations',
      accessibilityNeeds: 'Prefers captioned videos',
      guardianName: 'Li Wei Chen',
      guardianEmail: 'li.chen@example.com',
      guardianPhoneOptional: '+1-555-0192',
      guardianConsentProvided: true,
    };

    const result = studentApplicationSchema.safeParse(validData);
    assert.strictEqual(result.success, true);
  });

  test('studentApplicationSchema rejects missing guardian consent', () => {
    const invalidData = {
      preferredName: 'Maya Chen',
      ageRange: 'ages-13-15',
      gradeLevel: 'Grade 8',
      priorExperience: 'beginner',
      programPreference: 'Python Foundations',
      guardianName: 'Li Wei Chen',
      guardianEmail: 'li.chen@example.com',
      guardianConsentProvided: false, // Must be true!
    };

    const result = studentApplicationSchema.safeParse(invalidData);
    assert.strictEqual(result.success, false);
    if (!result.success) {
      const err = result.error.flatten().fieldErrors;
      assert.ok(err.guardianConsentProvided);
    }
  });

  test('studentApplicationSchema rejects invalid email format', () => {
    const invalidData = {
      preferredName: 'Maya Chen',
      ageRange: 'ages-13-15',
      gradeLevel: 'Grade 8',
      priorExperience: 'beginner',
      programPreference: 'Python Foundations',
      guardianName: 'Li Wei Chen',
      guardianEmail: 'not-an-email',
      guardianConsentProvided: true,
    };

    const result = studentApplicationSchema.safeParse(invalidData);
    assert.strictEqual(result.success, false);
  });

  test('volunteerApplicationSchema requires agreedToCodeOfConduct = true', () => {
    const invalidVolunteer = {
      fullName: 'Alex Rivera',
      email: 'alex@college.edu',
      cityCountry: 'New York, USA',
      preferredRole: 'instructor',
      skills: ['Python', 'Machine Learning'],
      subjectsCanTeach: ['AI Explorers'],
      weeklyAvailabilityHours: 4,
      motivation: 'Passionate about computational thinking and youth AI education.',
      relevantExperience: 'Tutored high school computer science for 2 years.',
      agreedToCodeOfConduct: false, // Must agree!
    };

    const result = volunteerApplicationSchema.safeParse(invalidVolunteer);
    assert.strictEqual(result.success, false);
  });

  test('volunteerApplicationSchema enforces minimum 2 weekly hours', () => {
    const invalidHours = {
      fullName: 'Alex Rivera',
      email: 'alex@college.edu',
      cityCountry: 'New York, USA',
      preferredRole: 'instructor',
      skills: ['Python'],
      subjectsCanTeach: ['AI Explorers'],
      weeklyAvailabilityHours: 1, // Below minimum 2 hours
      motivation: 'Passionate about computational thinking and youth AI education.',
      relevantExperience: 'Tutored high school computer science for 2 years.',
      agreedToCodeOfConduct: true,
    };

    const result = volunteerApplicationSchema.safeParse(invalidHours);
    assert.strictEqual(result.success, false);
  });

  test('contactMessageSchema validates minimum message length', () => {
    const shortMessage = {
      fullName: 'John Doe',
      email: 'john@example.com',
      organizationType: 'school',
      subject: 'Hello',
      message: 'Too short', // under 15 chars
    };

    const result = contactMessageSchema.safeParse(shortMessage);
    assert.strictEqual(result.success, false);
  });

  test('registrationSchema accepts valid parent registration with required fields & consents', () => {
    const validRegistration = {
      guardianName: 'Sarah Jenkins',
      guardianEmail: 'sarah.jenkins@example.com',
      guardianPhone: '+1-555-0144',
      preferredContactMethod: 'email',
      studentFirstName: 'Liam',
      studentAge: 10,
      studentGrade: '5th Grade',
      studentCountry: 'Canada',
      timeZone: 'EST (UTC-5)',
      learningLevel: 'beginner',
      codingExperience: 'none',
      learningGoals: 'Wants to learn how to make animated stories and basic games',
      additionalNotes: 'Visual learner',
      guardianConsent: true,
      contactConsent: true,
    };

    const result = registrationSchema.safeParse(validRegistration);
    assert.strictEqual(result.success, true);
  });

  test('registrationSchema rejects missing guardian authorization consent', () => {
    const missingConsent = {
      guardianName: 'Sarah Jenkins',
      guardianEmail: 'sarah.jenkins@example.com',
      preferredContactMethod: 'email',
      studentFirstName: 'Liam',
      studentAge: 10,
      studentCountry: 'Canada',
      learningLevel: 'beginner',
      codingExperience: 'none',
      guardianConsent: false, // Required true
      contactConsent: true,
    };

    const result = registrationSchema.safeParse(missingConsent);
    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.ok(result.error.flatten().fieldErrors.guardianConsent);
    }
  });

  test('registrationSchema rejects missing contact consent', () => {
    const missingConsent = {
      guardianName: 'Sarah Jenkins',
      guardianEmail: 'sarah.jenkins@example.com',
      preferredContactMethod: 'email',
      studentFirstName: 'Liam',
      studentAge: 10,
      studentCountry: 'Canada',
      learningLevel: 'beginner',
      codingExperience: 'none',
      guardianConsent: true,
      contactConsent: false, // Required true
    };

    const result = registrationSchema.safeParse(missingConsent);
    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.ok(result.error.flatten().fieldErrors.contactConsent);
    }
  });

  test('registrationSchema rejects invalid email and out-of-range student age', () => {
    const invalidData = {
      guardianName: 'Sarah Jenkins',
      guardianEmail: 'invalid-email',
      preferredContactMethod: 'email',
      studentFirstName: 'Liam',
      studentAge: 3, // Out of range (<6)
      studentCountry: 'Canada',
      learningLevel: 'beginner',
      codingExperience: 'none',
      guardianConsent: true,
      contactConsent: true,
    };

    const result = registrationSchema.safeParse(invalidData);
    assert.strictEqual(result.success, false);
    if (!result.success) {
      const errs = result.error.flatten().fieldErrors;
      assert.ok(errs.guardianEmail);
      assert.ok(errs.studentAge);
    }
  });
});
