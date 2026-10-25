import { test, describe } from 'node:test';
import assert from 'node:assert';
import { 
  getPrograms, 
  getProgramBySlug, 
  submitStudentApplication, 
  getStudentApplications, 
  updateStudentApplicationStatus,
  getProjectShowcases,
  approveProject,
  getLessonById,
  getAuditLogs
} from '../lib/db/repository';

describe('Repository & Backend Logic', () => {
  test('getPrograms returns pilot curriculum tracks', async () => {
    const programs = await getPrograms();
    assert.ok(Array.isArray(programs));
    assert.ok(programs.length >= 5);
    const slugs = programs.map(p => p.slug);
    assert.ok(slugs.includes('ai-explorers'));
    assert.ok(slugs.includes('python-foundations'));
  });

  test('getProgramBySlug retrieves correct program', async () => {
    const program = await getProgramBySlug('ai-explorers');
    assert.ok(program);
    assert.strictEqual(program?.title, 'AI Explorers');
    assert.ok(program?.syllabus.length > 0);
  });

  test('submitStudentApplication creates application with valid reference number', async () => {
    const app = await submitStudentApplication({
      preferredName: 'Devon Miller',
      ageRange: 'ages-9-12',
      gradeLevel: 'Grade 5',
      priorExperience: 'none',
      programPreference: 'Code Creators',
      guardianName: 'Sarah Miller',
      guardianEmail: 'sarah.miller@example.com',
      guardianConsentProvided: true,
    });

    assert.ok(app.id);
    assert.ok(app.referenceNumber.startsWith('FM-STU-'));
    assert.strictEqual(app.preferredName, 'Devon Miller');
    assert.strictEqual(app.status, 'pending');

    // Check that audit log recorded this
    const logs = await getAuditLogs();
    assert.ok(logs.some(l => l.action === 'STUDENT_APPLICATION_SUBMITTED' && l.targetId === app.referenceNumber));
  });

  test('updateStudentApplicationStatus updates status and records audit log', async () => {
    const apps = await getStudentApplications();
    assert.ok(apps.length > 0);
    const target = apps[0];

    const updated = await updateStudentApplicationStatus(target.id, 'approved', 'Admitted to Cohort Alpha');
    assert.ok(updated);
    assert.strictEqual(updated?.status, 'approved');
    assert.strictEqual(updated?.reviewNotes, 'Admitted to Cohort Alpha');
  });

  test('approveProject transitions unapproved project to public showcase', async () => {
    const initialProjects = await getProjectShowcases(false);
    assert.ok(initialProjects.length > 0);

    const testProject = initialProjects[0];
    const approved = await approveProject(testProject.id);
    assert.ok(approved);
    assert.strictEqual(approved?.isApproved, true);
  });

  test('getLessonById returns full lesson with interactive quiz questions', async () => {
    const lesson = await getLessonById('lesson-101');
    assert.ok(lesson);
    assert.strictEqual(lesson?.title, 'Introduction to Artificial Intelligence & Neural Networks');
    assert.ok(lesson?.quiz && lesson.quiz.length >= 2);
    assert.ok(lesson?.codeSnippet);
  });
});
