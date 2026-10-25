-- ==============================================================================
-- Future Minds Initiative - Initial Seed Dataset
-- Note: Pilot demonstration content labeled explicitly.
-- ==============================================================================

-- Programs Seed
INSERT INTO programs (id, slug, title, tagline, description, level, age_group, duration_weeks, hours_per_week, delivery_mode, status, prerequisites, learning_outcomes, featured)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'ai-explorers',
    'AI Explorers',
    'Discover how computers learn, see, and think through interactive experiments.',
    'A hands-on entry point into artificial intelligence for middle school students. Students train vision models, explore neural network simulations, and discuss what it means to build AI that is fair and helpful.',
    'beginner',
    'ages-9-12',
    6,
    3,
    'virtual',
    'enrolling',
    ARRAY['Curiosity to learn', 'Computer with modern browser and internet access'],
    ARRAY['Understand traditional code vs machine learning', 'Train a Teachable Machine model', 'Analyze algorithmic bias', 'Present an ethical AI concept project'],
    true
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'python-foundations',
    'Python Foundations',
    'Transition from visual blocks to real-world textual programming with Python.',
    'The industry-standard first programming language. Students build command-line tools, text adventures, data visualizations, and automated scripts with clean Pythonic syntax.',
    'intermediate',
    'ages-13-15',
    8,
    4,
    'virtual',
    'enrolling',
    ARRAY['Comfort with keyboard navigation', 'Basic algebra concepts'],
    ARRAY['Master variables, loops, lists, and dicts', 'Implement basic sorting and searching', 'Parse structured data and files', 'Publish an open-source terminal app'],
    true
  )
ON CONFLICT (slug) DO NOTHING;

-- Sample Showcase Projects (Pilot Demonstration)
INSERT INTO project_showcases (id, title, slug, student_pseudonym, age_group, program_name, description, impact_tag, tech_stack, is_approved, featured)
VALUES
  (
    '00000000-0000-0000-0000-000000000010',
    'EcoSort AI: Smart Recycling Guide',
    'ecosort-ai',
    'Kai L. (Grade 8)',
    'ages-13-15',
    'AI Explorers',
    'An interactive web app that uses a webcam classifier to identify whether food packaging is recyclable, compostable, or trash based on local municipal guidelines.',
    'Environmental Sustainability',
    ARRAY['Teachable Machine', 'JavaScript', 'HTML5 Canvas'],
    true,
    true
  ),
  (
    '00000000-0000-0000-0000-000000000011',
    'StudyBuddy Audio Flashcards',
    'studybuddy-audio',
    'Zainab M. (Grade 10)',
    'ages-13-15',
    'Python Foundations',
    'A Python command-line utility with speech synthesis that quizzes students on biology terminology, tracks retention rate, and spaces out difficult flashcards.',
    'Learning Accessibility',
    ARRAY['Python', 'pyttsx3', 'JSON Storage'],
    true,
    true
  )
ON CONFLICT (slug) DO NOTHING;
