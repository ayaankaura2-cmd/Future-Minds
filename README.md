# Future Minds Nonprofit Platform

> **Slogan**: LEARN / BUILD / BELONG  
> **Mission**: A student-led nonprofit making coding and AI education more accessible to young learners around the world.  
> **Program Format**: One live interactive virtual class per week across Beginner, Intermediate, and Advanced learning levels. 100% free community education.

---

## 🌟 Brand Identity & Human-Centered Design
- **Official Brand Mark**: Uses the uploaded Future Minds logo (`/logo.jpg`) preserved without distortion or recoloring.
- **Color Palette & Styling**: Warm white background, deep navy typography (`#0b1a30`), and bright blue accents (`#0066FF`) drawn directly from the logo.
- **Restrained, Authentic Aesthetics**: Clear typography, natural spacing, and genuine student-learning photography (`/students-coding.jpg`, `/student-mentor.jpg`). Strictly avoids artificial AI illustrations, floating shapes, glowing cards, glassmorphism, or invented statistics.
- **Dedicated Registration Form**: Single-column Google-Forms-style registration interface (`/register`) designed specifically for parents/guardians with data minimization (no home addresses, school names, passwords, or payment cards).

### 2. Complete Public Website Routes
- **`/` (Homepage)**: All 14 required editorial sections including hero with Python sandbox visual, mission/vision, varied curriculum showcase, 4-step pedagogical model (Discover, Learn, Build, Share), moderated student projects, mentor recruitment, school partnerships, verified pilot milestones, and searchable FAQ.
- **`/about`**: Core values, educational philosophy, commitment to responsible AI, and international expansion goals.
- **`/programs` & `/programs/[slug]`**: Filterable curriculum directory and rich detail pages with week-by-week syllabi, prerequisites, and pilot cohort enrollment buttons.
- **`/how-it-works`**: 4-phase roadmap detailing student journey and safeguarding oversight.
- **`/projects`**: Approved student project showcase protecting minor identities with guardian-approved pseudonyms.
- **`/team`**: Operational leadership and advisory roles transparently labeled as pilot placeholders.
- **`/volunteer`**: Mentor recruitment with role descriptions, availability expectations, and code of conduct.
- **`/partners`**: Partnership tiers for schools, districts, public libraries, and youth centers.
- **`/sponsor`**: Hardware access fund, compute grants, and fiscal integrity pledge.
- **`/impact`**: Verified pilot metrics dashboard with live database aggregation and data provenance notes.
- **`/faq`**: Categorized searchable accordion FAQ for students, parents, volunteers, and schools.
- **`/contact`**: Categorized contact form with server-side validation.
- **`/safeguarding`**: Child protection policy, two-adult rule, session recording rules, and incident reporting protocol.
- **`/privacy` & `/terms`**: Youth privacy notice aligned with COPPA, PIPEDA, and GDPR-K data minimization principles.

### 3. Application Workflows
- **`/apply/student`**: Accessible multi-step registration with data minimization (no home addresses or birth dates), Zod validation, reference number generator (`FM-STU-26-XXXX`), and guardian email consent workflow.
- **`/apply/volunteer`**: Mentor application with role selection, skills checklist, availability slider, and code of conduct agreement.

### 4. Interactive Student Learning Portal (`/learn/*`)
- **`/learn/dashboard`**: Active course progress bar, module checklist, next live workshop schedule, and instructor feedback console.
- **`/learn/courses`**: Course catalog with syllabus breakdown.
- **`/learn/lessons/[id]`**: Interactive lesson viewer with markdown content, code sandboxes, interactive knowledge-check quizzes with instant scoring, and assignment submissions.
- **`/learn/projects`**: Student capstone submission form and status tracker.
- **`/learn/certificates`**: Verifiable certificate of completion viewer with printable PDF layout and cryptographic ID.
- **`/learn/profile`**: Private student preferences and accessibility accommodations.

### 5. Instructor & Volunteer Portal (`/instructor`)
- Cohort roster, interactive session attendance logger (Present/Absent/Excused), assignment review queue, and feedback publisher.

### 6. Comprehensive Admin Console (`/admin/*`)
- **`/admin`**: KPI overview, recent applications, and audit log snippet.
- **`/admin/applications`**: Searchable filterable admissions queue with status management (Approve, Under Review, Waitlist, Reject) and reviewer internal notes.
- **`/admin/programs`**: Curriculum publishing controls and live enrollment toggles.
- **`/admin/projects`**: Student project moderation queue with minor safety verification.
- **`/admin/audit-logs`**: Immutable security audit trail recording all administrative actions.
- **`/admin/bootstrap`**: Step-by-step documentation for configuring Supabase and bootstrapping the first administrator.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 with custom brand tokens
- **Icons**: Lucide React
- **Validation**: Zod schema validation
- **Database**: Supabase PostgreSQL with 22 relational tables and full Row Level Security (RLS)
- **Data Layer**: Dual-mode repository architecture (graceful local store fallback when Supabase credentials are not configured)
- **Testing**: Node test runner + `tsx` with 12 passing unit & integration tests

---

## 🏃 Running Locally

1. Navigate to the project directory:
   ```bash
   cd scratch/future-minds
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Run tests:
   ```bash
   npm test
   ```
5. Build for production:
   ```bash
   npm run build
   ```

---

## 🗄️ Supabase PostgreSQL Setup & Bootstrapping

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env.local` and add your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. In the Supabase SQL Editor, execute `supabase/schema.sql` to create the `registrations` table with full Row Level Security (RLS) policies:
   - Ensures public visitors and anonymous requests cannot read any submitted registration records.
   - Grants write/manage access strictly to the server-side `SUPABASE_SERVICE_ROLE_KEY`.
4. (Optional) Run `supabase/migrations/20261016_initial_schema.sql` if you wish to enable the extended pilot modules (courses, assignments, showcases).
5. Restart your development server (`npm run dev`). Registrations submitted via `/register` will now persist directly into your private PostgreSQL database!
