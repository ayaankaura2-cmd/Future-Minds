-- ==============================================================================
-- Future Minds Initiative - Initial PostgreSQL Database Schema & RLS Policies
-- Migration: 20261016_initial_schema.sql
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_name TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  age_range TEXT,
  role TEXT DEFAULT 'student',
  accessibility_needs TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Roles & User Roles (RBAC)
CREATE TABLE IF NOT EXISTS roles (
  name TEXT PRIMARY KEY,
  description TEXT
);

INSERT INTO roles (name, description) VALUES
  ('admin', 'Platform administrator with full governance access'),
  ('coordinator', 'Cohort and program operations coordinator'),
  ('instructor', 'Verified cohort teacher and workshop lead'),
  ('volunteer', 'Teaching assistant or mentor'),
  ('student', 'Enrolled youth learner'),
  ('guardian', 'Verified parent or legal guardian')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT REFERENCES roles(name) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, role)
);

-- 3. Educational Programs
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  level TEXT NOT NULL,
  age_group TEXT NOT NULL,
  duration_weeks INT NOT NULL,
  hours_per_week NUMERIC NOT NULL,
  delivery_mode TEXT NOT NULL DEFAULT 'virtual',
  status TEXT NOT NULL DEFAULT 'enrolling',
  prerequisites TEXT[] DEFAULT '{}',
  learning_outcomes TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Cohorts
CREATE TABLE IF NOT EXISTS cohorts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  schedule_description TEXT NOT NULL,
  capacity INT NOT NULL DEFAULT 20,
  instructor_id UUID REFERENCES profiles(id),
  delivery_mode TEXT NOT NULL DEFAULT 'virtual',
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cohort_id UUID REFERENCES cohorts(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active',
  guardian_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cohort_id, student_id)
);

-- 6. Courses, Modules, Lessons
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INT NOT NULL,
  duration_minutes INT DEFAULT 30,
  summary TEXT,
  content_markdown TEXT NOT NULL,
  code_snippet JSONB,
  quiz_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Lesson Progress
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  quiz_score INT,
  completed_at TIMESTAMPTZ,
  UNIQUE(student_id, lesson_id)
);

-- 8. Assignments & Submissions
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  instructions TEXT NOT NULL,
  rubric_points TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  submission_text TEXT NOT NULL,
  repo_url TEXT,
  grade TEXT DEFAULT 'Pending Review',
  instructor_feedback TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Sessions & Attendance
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cohort_id UUID REFERENCES cohorts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  meeting_url TEXT,
  status TEXT DEFAULT 'scheduled'
);

CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'present',
  recorded_by UUID REFERENCES profiles(id),
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(session_id, student_id)
);

-- 10. Applications (Student & Volunteer)
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL, -- 'student' or 'volunteer'
  reference_number TEXT UNIQUE NOT NULL,
  preferred_name TEXT,
  full_name TEXT,
  age_range TEXT,
  grade_level TEXT,
  prior_experience TEXT,
  program_preference TEXT,
  accessibility_needs TEXT,
  guardian_name TEXT,
  guardian_email TEXT,
  guardian_phone TEXT,
  guardian_consent BOOLEAN DEFAULT FALSE,
  email TEXT,
  phone TEXT,
  city_country TEXT,
  preferred_role TEXT,
  skills TEXT[] DEFAULT '{}',
  subjects_can_teach TEXT[] DEFAULT '{}',
  weekly_hours INT,
  motivation TEXT,
  experience TEXT,
  agreed_code_of_conduct BOOLEAN DEFAULT FALSE,
  background_check_verified BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending',
  review_notes TEXT,
  reviewed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Guardian Relationships & Consent Records
CREATE TABLE IF NOT EXISTS guardian_relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  guardian_email TEXT NOT NULL,
  guardian_name TEXT NOT NULL,
  verification_token TEXT UNIQUE,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS consent_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guardian_email TEXT NOT NULL,
  student_identifier TEXT NOT NULL,
  program_name TEXT NOT NULL,
  consent_type TEXT NOT NULL, -- 'virtual_classroom', 'showcase_pseudonym', 'general'
  ip_address TEXT,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Project Showcases
CREATE TABLE IF NOT EXISTS project_showcases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  student_pseudonym TEXT NOT NULL,
  age_group TEXT NOT NULL,
  program_name TEXT NOT NULL,
  description TEXT NOT NULL,
  impact_tag TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  thumbnail_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  submitted_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Partnerships, Contacts, Announcements, Certificates, Audit Logs
CREATE TABLE IF NOT EXISTS partnerships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_name TEXT NOT NULL,
  organization_type TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  proposal_details TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  cohort_id UUID REFERENCES cohorts(id),
  is_global BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_code TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  program_name TEXT NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  verification_hash TEXT NOT NULL,
  student_id UUID REFERENCES profiles(id)
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  action TEXT NOT NULL,
  actor_email TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  details TEXT NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardian_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_showcases ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Is Admin?
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = user_uuid AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public can view published programs, courses, modules, lessons, and approved projects
CREATE POLICY "Public can view published programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Public can view courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Public can view modules" ON modules FOR SELECT USING (true);
CREATE POLICY "Public can view lessons" ON lessons FOR SELECT USING (true);
CREATE POLICY "Public can view approved projects" ON project_showcases FOR SELECT USING (is_approved = true);

-- Applications: Anyone can submit an application (INSERT), but only admins can VIEW
CREATE POLICY "Anyone can submit application" ON applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all applications" ON applications FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Admins can update applications" ON applications FOR UPDATE USING (is_admin(auth.uid()));

-- Student Submissions: Students see their own; Instructors & Admins can review
CREATE POLICY "Students see own submissions" ON submissions FOR SELECT USING (student_id = auth.uid() OR is_admin(auth.uid()));
CREATE POLICY "Students insert own submissions" ON submissions FOR INSERT WITH CHECK (student_id = auth.uid());

-- Lesson Progress: Only the student and admin
CREATE POLICY "Students manage own progress" ON lesson_progress FOR ALL USING (student_id = auth.uid() OR is_admin(auth.uid()));

-- Audit Logs: Only admins can view
CREATE POLICY "Admins can view audit logs" ON audit_logs FOR SELECT USING (is_admin(auth.uid()));
