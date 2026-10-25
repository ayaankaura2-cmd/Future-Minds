-- ==============================================================================
-- Future Minds Nonprofit - Registrations Schema & Row Level Security (RLS)
-- Dedicated registrations table for parent/guardian submissions
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number TEXT UNIQUE NOT NULL,
  
  -- Guardian Information (Required submitter)
  guardian_name TEXT NOT NULL,
  guardian_email TEXT NOT NULL,
  guardian_phone TEXT,
  preferred_contact_method TEXT NOT NULL CHECK (preferred_contact_method IN ('email', 'phone')),
  
  -- Student Profile (Privacy Preserved: First Name Only, No Address, No School Name)
  student_first_name TEXT NOT NULL,
  student_age INT NOT NULL CHECK (student_age >= 6 AND student_age <= 20),
  student_grade TEXT,
  student_country TEXT NOT NULL,
  time_zone TEXT,
  
  -- Educational Placement
  learning_level TEXT NOT NULL CHECK (learning_level IN ('beginner', 'intermediate', 'advanced')),
  coding_experience TEXT NOT NULL,
  learning_goals TEXT,
  additional_notes TEXT,
  
  -- Legal & Communication Acknowledgements
  guardian_consent BOOLEAN NOT NULL DEFAULT FALSE CHECK (guardian_consent = TRUE),
  contact_consent BOOLEAN NOT NULL DEFAULT FALSE CHECK (contact_consent = TRUE),
  
  -- Operational Workflow Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'placed', 'waitlist', 'archived')),
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- Protects child and family data strictly.
-- Public visitors CANNOT read or query any registration records.
-- Only the backend server (using SUPABASE_SERVICE_ROLE_KEY) or authenticated admins
-- have access.
-- ==============================================================================

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 1. Prevent any anonymous or public SELECT (reading)
CREATE POLICY "Public visitors cannot read registrations"
  ON public.registrations
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- 2. Prevent direct public updates or deletions
CREATE POLICY "Public visitors cannot modify registrations"
  ON public.registrations
  FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "Public visitors cannot delete registrations"
  ON public.registrations
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- 3. Service role (server-side Next.js backend) has full access
CREATE POLICY "Server service_role has full management access"
  ON public.registrations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Indexes for efficient administration and lookup
CREATE INDEX IF NOT EXISTS idx_registrations_ref_number ON public.registrations (reference_number);
CREATE INDEX IF NOT EXISTS idx_registrations_guardian_email ON public.registrations (guardian_email);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations (status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations (created_at DESC);

-- Helpful comments for administrators
COMMENT ON TABLE public.registrations IS 'Parent and guardian registration submissions for Future Minds weekly coding classes. Minimizes child data to first name only in compliance with privacy guidelines.';
COMMENT ON COLUMN public.registrations.reference_number IS 'Human-readable unique confirmation identifier (e.g. FM-REG-26-XXXX).';
COMMENT ON COLUMN public.registrations.guardian_consent IS 'Explicit acknowledgement of parent/guardian authority and registration consent.';
