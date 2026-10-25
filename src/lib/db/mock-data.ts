import { Program, CourseModule, ProjectShowcase, TeamMember, ImpactMetrics, StudentApplication, VolunteerApplication } from '@/types';

export const initialPrograms: Program[] = [
  {
    id: 'prog-1',
    slug: 'ai-explorers',
    title: 'AI Explorers',
    tagline: 'Discover how computers learn, see, and think through interactive experiments.',
    description: 'A hands-on entry point into artificial intelligence for middle school students. Students train vision models, explore neural network simulations, and discuss what it means to build AI that is fair and helpful.',
    level: 'beginner',
    ageGroup: 'ages-9-12',
    durationWeeks: 6,
    hoursPerWeek: 3,
    deliveryMode: 'virtual',
    status: 'enrolling',
    prerequisites: ['Curiosity to learn', 'Computer with modern browser and internet access'],
    learningOutcomes: [
      'Understand the difference between traditional code and trained machine learning models',
      'Train a Teachable Machine model to classify hand gestures and sounds',
      'Analyze algorithmic bias through interactive fairness simulations',
      'Present an ethical AI concept project solving a community issue'
    ],
    syllabus: [
      { week: 1, title: 'What is Artificial Intelligence?', description: 'Rule-based systems vs. learning systems; identifying AI in daily life.', topics: ['Pattern recognition', 'Training vs. Testing', 'Everyday algorithms'] },
      { week: 2, title: 'Teaching Computers to See', description: 'Computer vision fundamentals, pixels, bounding boxes, and image classifiers.', topics: ['Teachable Machine', 'Data collection', 'Image classification'] },
      { week: 3, title: 'Language and Speech Models', description: 'How chatbots process words, tokens, and basic natural language processing.', topics: ['Tokenization', 'Sentiment analysis', 'Prompt principles'] },
      { week: 4, title: 'AI Ethics, Bias and Safety', description: 'Examining training data quality, fairness, deepfakes, and responsible use.', topics: ['Data bias', 'Algorithmic accountability', 'Responsible AI pledge'] },
      { week: 5, title: 'Capstone Project Workshop', description: 'Brainstorming and prototyping a social-good AI concept.', topics: ['Problem framing', 'Model testing', 'Interface mockups'] },
      { week: 6, title: 'Showcase & Celebration', description: 'Demonstrating projects to peers, mentors, and guardians.', topics: ['Peer feedback', 'Certification', 'Next steps in coding'] }
    ],
    featured: true
  },
  {
    id: 'prog-2',
    slug: 'code-creators',
    title: 'Code Creators',
    tagline: 'Learn computational logic through game design, animation, and creative puzzles.',
    description: 'Designed for young students starting their coding journey. Using visual block-based programming, learners build interactive stories, mini-arcade games, and animated digital art.',
    level: 'beginner',
    ageGroup: 'ages-9-12',
    durationWeeks: 6,
    hoursPerWeek: 2.5,
    deliveryMode: 'virtual',
    status: 'enrolling',
    prerequisites: ['Basic reading and keyboard navigation skills'],
    learningOutcomes: [
      'Master loops, conditionals, and variables through visual programming',
      'Design and code 3 interactive playable arcade games',
      'Debug unexpected code behaviors methodically',
      'Publish a collaborative game portfolio'
    ],
    syllabus: [
      { week: 1, title: 'Sequence and Sprites', description: 'Coordinate systems, events, and sprite movement.', topics: ['Coordinates', 'Key bindings', 'Event loops'] },
      { week: 2, title: 'Loops and Repetition', description: 'Making characters repeat patterns and dance animations.', topics: ['Forever loops', 'Counter loops', 'Timing'] },
      { week: 3, title: 'Conditionals and Logic', description: 'If-else decision trees, collision detection, and score counters.', topics: ['If-then logic', 'Collisions', 'Variables'] },
      { week: 4, title: 'Game Mechanics & Sound', description: 'Lives, levels, audio cues, and win/lose states.', topics: ['Game state', 'Sound synthesis', 'Level design'] },
      { week: 5, title: 'Creative Game Studio', description: 'Building custom original games with instructor mentorship.', topics: ['Game balancing', 'Playtesting', 'Bug tracking'] },
      { week: 6, title: 'Community Arcade Launch', description: 'Peer testing and sharing projects with family.', topics: ['Playtesting party', 'Badges'] }
    ],
    featured: true
  },
  {
    id: 'prog-3',
    slug: 'python-foundations',
    title: 'Python Foundations',
    tagline: 'Transition from visual blocks to real-world textual programming with Python.',
    description: 'The industry-standard first programming language. Students build command-line tools, text adventures, data visualizations, and automated scripts with clean Pythonic syntax.',
    level: 'intermediate',
    ageGroup: 'ages-13-15',
    durationWeeks: 8,
    hoursPerWeek: 4,
    deliveryMode: 'virtual',
    status: 'enrolling',
    prerequisites: ['Prior block-based coding experience or basic algebra readiness'],
    learningOutcomes: [
      'Write clean, idiomatic Python using functions, lists, dictionaries, and file I/O',
      'Implement fundamental algorithms for searching, sorting, and game mechanics',
      'Analyze real datasets using simple math and visualization libraries',
      'Publish an open-source terminal application'
    ],
    syllabus: [
      { week: 1, title: 'Python Syntax & Variables', description: 'Types, inputs, outputs, string formatting, and mathematical operations.', topics: ['Primitive types', 'f-strings', 'input()'] },
      { week: 2, title: 'Control Flow & Logic', description: 'Boolean algebra, if/elif/else branches, while and for loops.', topics: ['Range()', 'Logical operators', 'Nested loops'] },
      { week: 3, title: 'Data Structures: Lists & Tuples', description: 'Indexing, slicing, list comprehensions, and mutating arrays.', topics: ['Lists', 'Methods', 'Iterables'] },
      { week: 4, title: 'Dictionaries & Structured Data', description: 'Key-value maps, nested JSON-like records, and inventory systems.', topics: ['Dict methods', 'Data lookup', 'JSON basics'] },
      { week: 5, title: 'Functions, Scope & Modularity', description: 'Writing reusable parameters, return values, and helper modules.', topics: ['DRY principle', 'Local vs global scope', 'Standard library'] },
      { week: 6, title: 'File Handling & Data Parsing', description: 'Reading CSVs, writing text logs, and handling runtime exceptions.', topics: ['Try/except', 'File streams', 'CSV parser'] },
      { week: 7, title: 'Mini-Game or Tool Capstone', description: 'Scaffolding a terminal game, cipher tool, or weather query client.', topics: ['Software architecture', 'Git basics', 'Refactoring'] },
      { week: 8, title: 'Code Review & Demo Day', description: 'Peer reviews, clean code practices, and next steps in Python.', topics: ['PEP 8', 'Project presentations'] }
    ],
    featured: true
  },
  {
    id: 'prog-4',
    slug: 'web-innovators',
    title: 'Web Innovators',
    tagline: 'Build modern, accessible websites that communicate ideas and empower communities.',
    description: 'Learn modern HTML5, CSS3 layout systems (Flexbox, Grid), and interactive JavaScript. Students create responsive web pages, understand digital accessibility (a11y), and deploy their work online.',
    level: 'intermediate',
    ageGroup: 'ages-13-15',
    durationWeeks: 8,
    hoursPerWeek: 3.5,
    deliveryMode: 'virtual',
    status: 'upcoming',
    prerequisites: ['Basic computer literacy, comfortable downloading files and using a code editor'],
    learningOutcomes: [
      'Author semantic HTML5 documents conforming to WCAG accessibility guidelines',
      'Craft responsive, mobile-first layouts using modern CSS Flexbox and Grid',
      'Manipulate the DOM dynamically using vanilla JavaScript and fetch APIs',
      'Deploy live static websites with custom domain hosting'
    ],
    syllabus: [
      { week: 1, title: 'Structure with Semantic HTML5', description: 'Document outlines, headings, links, forms, and accessibility tags.', topics: ['Semantic tags', 'ARIA basics', 'Meta tags'] },
      { week: 2, title: 'Styling with Modern CSS', description: 'Cascade, inheritance, box model, colors, and typography.', topics: ['Selectors', 'Box model', 'Custom properties'] },
      { week: 3, title: 'Responsive Layouts with Flexbox', description: 'Alignment, wrapping, navigation bars, and mobile menus.', topics: ['Flex direction', 'Justify & align', 'Media queries'] },
      { week: 4, title: 'Grid Systems & Component Cards', description: 'Multi-column editorial layouts and responsive image grids.', topics: ['CSS Grid', 'Minmax', 'Aspect ratios'] },
      { week: 5, title: 'Interactive JavaScript & DOM', description: 'Event listeners, toggling themes, and form input validation.', topics: ['addEventListener', 'querySelector', 'Class list'] },
      { week: 6, title: 'Connecting to Open Web APIs', description: 'Asynchronous fetch, displaying dynamic weather or quote cards.', topics: ['async/await', 'JSON parsing', 'Error handling'] },
      { week: 7, title: 'Personal Portfolio Project', description: 'Designing and coding a personal project showcase or cause website.', topics: ['Performance', 'Lighthouse audits', 'Git deployment'] },
      { week: 8, title: 'Web Showcase & Live Deployment', description: 'Deploying to Vercel/GitHub Pages and presenting live sites.', topics: ['DNS basics', 'Portfolio launch'] }
    ],
    featured: false
  },
  {
    id: 'prog-5',
    slug: 'ai-project-lab',
    title: 'AI Project Lab (Capstone)',
    tagline: 'An incubator for teen developers building impactful AI tools for their communities.',
    description: 'An advanced mentorship lab where student cohorts collaborate on practical, ethically evaluated technology projects: assistive tools, environmental monitors, homework helpers, or local non-profit solutions.',
    level: 'advanced',
    ageGroup: 'ages-16-18',
    durationWeeks: 10,
    hoursPerWeek: 5,
    deliveryMode: 'hybrid',
    status: 'planned',
    prerequisites: ['Proficiency in Python or JavaScript', 'Completion of a foundation course or equivalent self-study portfolio'],
    learningOutcomes: [
      'Architect an end-to-end software application integrating an AI/ML API or model',
      'Conduct rigorous bias and safety reviews before publishing',
      'Collaborate using professional GitHub pull request and code review workflows',
      'Pitch projects to industry mentors, educators, and community partners'
    ],
    syllabus: [
      { week: 1, title: 'Problem Discovery & Team Formation', description: 'Identifying real local problems and framing machine learning solutions.', topics: ['Human-centered design', 'Problem scoping'] },
      { week: 2, title: 'System Architecture & Data Strategy', description: 'Choosing APIs, open weights models, and curating ethical datasets.', topics: ['Hugging Face', 'API authentication', 'Data safety'] },
      { week: 3, title: 'Prototyping Sprint 1', description: 'Building the core prediction or inference pipeline.', topics: ['Rapid prototyping', 'Latency testing'] },
      { week: 4, title: 'Prototyping Sprint 2', description: 'Developing the user interface and responsive client.', topics: ['Frontend integration', 'Error states'] },
      { week: 5, title: 'Safeguarding & Red-Teaming', description: 'Testing models against harmful edge cases, jailbreaks, and false predictions.', topics: ['Adversarial testing', 'Content filtering'] },
      { week: 6, title: 'User Testing with Community Partners', description: 'Observing real users interact with the tool and collecting structured feedback.', topics: ['Usability testing', 'Telemetry'] },
      { week: 7, title: 'Refactoring & Performance Optimization', description: 'Optimizing token usage, database caching, and responsive design.', topics: ['Caching', 'Bundle optimization'] },
      { week: 8, title: 'Documentation & Open Source Prep', description: 'Writing clear READMEs, licenses, user guides, and architecture diagrams.', topics: ['Open source docs', 'MIT license'] },
      { week: 9, title: 'Mentorship Pitch Rehearsals', description: 'Presenting to technical advisors and refining slide decks.', topics: ['Communication', 'Demo craft'] },
      { week: 10, title: 'Demo Showcase & Graduation', description: 'Public livestreamed showcase celebrating student innovations.', topics: ['Showcase', 'Alumni network'] }
    ],
    featured: true
  }
];

export const sampleCourses: CourseModule[] = [
  {
    id: 'mod-1',
    courseId: 'ai-foundations-101',
    title: 'Module 1: How Computers Learn',
    order: 1,
    description: 'Explore the transition from hard-coded instructions to pattern-based machine learning.',
    lessons: [
      {
        id: 'lesson-101',
        moduleId: 'mod-1',
        courseId: 'ai-foundations-101',
        title: 'Introduction to Artificial Intelligence & Neural Networks',
        order: 1,
        durationMinutes: 25,
        summary: 'Learn what machine learning is, how data shapes models, and the difference between rules and patterns.',
        contentMarkdown: `## Welcome to AI Explorers!

Artificial Intelligence (AI) sounds complex, but at its heart, modern AI is about **pattern recognition**.

### Rules vs. Learning

When programming a classic calculator or video game:
- **Traditional Coding**: A human programmer writes explicit rules (\`if playerHitsObstacle then gameOver\`).
- **Machine Learning**: Instead of writing the rules manually, we show a computer thousands of examples. The algorithm figures out the statistical pattern on its own.

### The Three Core Ingredients of AI:
1. **Data**: The examples we feed into the system (e.g. photos of apples vs. oranges).
2. **Model**: The mathematical architecture that holds the learned parameters (weights).
3. **Training & Loss**: How the computer calculates its mistakes and updates itself to get better.

> **Responsible Tech Note**: A model can only ever be as fair as the data used to train it. If training data misses certain groups, the model will struggle to perform fairly for everyone.`,
        codeSnippet: {
          language: 'python',
          code: `# A simple mental model: Traditional vs Machine Learning
# Traditional logic
def can_wear_jacket(temperature):
    if temperature < 15:
        return True
    return False

# Machine learning prediction concept
# model.predict(current_weather_features) -> returns probability`
        },
        quiz: [
          {
            id: 'q1',
            prompt: 'In machine learning, what do we supply to an algorithm so it can discover patterns?',
            options: [
              'Manual hardcoded if-else statements for every situation',
              'Training data examples and feedback on mistakes',
              'A faster internet connection',
              'A mechanical robot arm'
            ],
            correctIndex: 1,
            explanation: 'Machine learning relies on training data (examples) from which the algorithm generalizes patterns.'
          },
          {
            id: 'q2',
            prompt: 'Why is training data quality critical for ethical AI?',
            options: [
              'It makes the code run in fewer lines',
              'Biased or incomplete data leads to models that make unfair decisions',
              'Computers will crash if data has any text in it',
              'It removes the need for human oversight entirely'
            ],
            correctIndex: 1,
            explanation: 'Because models learn from data, biases or omissions in the data directly translate into algorithmic bias.'
          }
        ],
        assignmentBrief: {
          id: 'asg-1',
          title: 'Observation Exercise: AI in Your Daily Life',
          instructions: 'Identify two systems you or your family interact with regularly that use machine learning (e.g., streaming recommendations, voice assistants, photo search, spam filters). Write 3-4 sentences for each describing: 1) What input data does it receive? 2) What decision or output does it produce? 3) What could go wrong if the training data was low quality?',
          rubricPoints: [
            'Identified two real-world machine learning systems',
            'Accurately described input data and outputs',
            'Provided thoughtful consideration of data quality or ethical edge cases'
          ]
        }
      },
      {
        id: 'lesson-102',
        moduleId: 'mod-1',
        courseId: 'ai-foundations-101',
        title: 'Computer Vision: How Machines See Images',
        order: 2,
        durationMinutes: 30,
        summary: 'Understand pixel matrices, color channels, convolutional layers, and feature maps.',
        contentMarkdown: `## How Computers Read Images

To our eyes, a photo of a puppy is filled with shapes, fur, and cute eyes. To a computer, an image is simply a giant **grid of numbers** (a matrix).

### The Pixel Grid
Every digital photo consists of pixels. In a standard color photo:
- **R (Red)** channel: values from 0 to 255
- **G (Green)** channel: values from 0 to 255
- **B (Blue)** channel: values from 0 to 255

When a computer vision model looks at an image, it runs **convolutional filters** (small mathematical matrices) over these pixels to detect:
1. Low-level edges and corners
2. Textures and simple shapes
3. High-level objects like eyes, wheels, and leaves

### Hands-on Experiment
In today's lab, you will use Google's Teachable Machine to train a real-time vision classifier directly in your web browser.`,
        codeSnippet: {
          language: 'javascript',
          code: `// Conceptual example: inspecting a 2x2 grayscale pixel matrix
const imageSample = [
  [0, 255],    // [black, white]
  [128, 64]    // [gray, dark gray]
];

console.log("Upper-right pixel intensity:", imageSample[0][1]); // 255`
        },
        quiz: [
          {
            id: 'q3',
            prompt: 'How does a digital computer fundamentally represent an image?',
            options: [
              'As painted physical brushstrokes',
              'As a numerical matrix of pixel values (e.g. RGB numbers 0-255)',
              'As audio soundwaves',
              'As plain English sentences'
            ],
            correctIndex: 1,
            explanation: 'Computers represent images as grids of numbers representing color intensity.'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-2',
    courseId: 'ai-foundations-101',
    title: 'Module 2: Natural Language & Ethics',
    order: 2,
    description: 'Investigate how language models tokenize text and why algorithmic accountability matters.',
    lessons: [
      {
        id: 'lesson-201',
        moduleId: 'mod-2',
        courseId: 'ai-foundations-101',
        title: 'Tokenization & Large Language Models',
        order: 1,
        durationMinutes: 30,
        summary: 'Explore how text is chopped into tokens, probabilities are computed, and context windows work.',
        contentMarkdown: `## Inside Language Models

Large Language Models (LLMs) do not "think" or experience emotions like humans. Instead, they are sophisticated statistical engines that predict **the most likely next token**.

### What is a Token?
A token is a chunk of text. In English:
- Common short words are usually 1 token (e.g. "robot", "cat").
- Longer or unusual words might be split into sub-words (e.g. "unbelievable" -> "un" + "believ" + "able").

### The Future Minds Responsible Use Creed
As young technologists, we must remember:
1. Always fact-check outputs from generative models.
2. Never input private or sensitive personal information into public tools.
3. Use AI to assist your creativity and critical thinking, not replace your own voice.`
      }
    ]
  }
];

export const sampleProjects: ProjectShowcase[] = [
  {
    id: 'proj-1',
    title: 'EcoSort AI: Smart Recycling Guide',
    slug: 'ecosort-ai',
    studentPseudonym: 'Kai L. (Grade 8)',
    ageGroup: 'ages-13-15',
    programName: 'AI Explorers',
    description: 'An interactive web app that uses a webcam classifier to identify whether food packaging is recyclable, compostable, or trash based on local municipal guidelines.',
    impactTag: 'Environmental Sustainability',
    techStack: ['Teachable Machine', 'JavaScript', 'HTML5 Canvas'],
    demoUrl: 'https://example.com/demo/ecosort',
    githubUrl: 'https://github.com/example/ecosort-demo',
    isApproved: true,
    featured: true,
    createdAt: '2026-09-12'
  },
  {
    id: 'proj-2',
    title: 'StudyBuddy Audio Flashcards',
    slug: 'studybuddy-audio',
    studentPseudonym: 'Zainab M. (Grade 10)',
    ageGroup: 'ages-13-15',
    programName: 'Python Foundations',
    description: 'A Python command-line utility with speech synthesis that quizzes students on biology terminology, tracks retention rate, and spaces out difficult flashcards.',
    impactTag: 'Learning Accessibility',
    techStack: ['Python', 'pyttsx3', 'JSON Storage'],
    demoUrl: 'https://example.com/demo/studybuddy',
    githubUrl: 'https://github.com/example/studybuddy-demo',
    isApproved: true,
    featured: true,
    createdAt: '2026-09-28'
  },
  {
    id: 'proj-3',
    title: 'SignSparks: Basic ASL Alphabet Recognizer',
    slug: 'signsparks-asl',
    studentPseudonym: 'Marcus R. (Grade 11)',
    ageGroup: 'ages-16-18',
    programName: 'AI Project Lab',
    description: 'A computer vision prototype that recognizes 10 American Sign Language hand shapes in real-time, providing instant feedback for beginners practicing finger spelling.',
    impactTag: 'Community Accessibility',
    techStack: ['MediaPipe', 'TensorFlow.js', 'React'],
    demoUrl: 'https://example.com/demo/signsparks',
    githubUrl: 'https://github.com/example/signsparks-demo',
    isApproved: true,
    featured: true,
    createdAt: '2026-10-04'
  }
];

export const sampleTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Executive Lead & Founder Role',
    role: 'Student Executive Director (Youth Leadership)',
    category: 'leadership',
    bio: 'Leads organizational vision, international curriculum partnerships, and youth engagement initiatives.',
    isPlaceholder: true
  },
  {
    id: 'team-2',
    name: 'Curriculum & Education Lead',
    role: 'Head of Pedagogy & Learning Design',
    category: 'curriculum',
    bio: 'Oversees student-centered curriculum frameworks, interactive exercises, and educator training resources.',
    isPlaceholder: true
  },
  {
    id: 'team-3',
    name: 'Child Safety & Safeguarding Officer',
    role: 'Safeguarding & Policy Advisor',
    category: 'advisor',
    bio: 'Advises on minor privacy (COPPA/PIPEDA), mentor screening, adult-supervised digital classrooms, and reporting.',
    isPlaceholder: true
  },
  {
    id: 'team-4',
    name: 'Technology & Platform Architect',
    role: 'Engineering Lead',
    category: 'leadership',
    bio: 'Architects secure web portals, Row Level Security databases, and accessible learning tools.',
    isPlaceholder: true
  }
];

export const initialImpactMetrics: ImpactMetrics = {
  studentsEnrolled: 145,
  programsCompleted: 4,
  projectsCompleted: 68,
  activeVolunteers: 26,
  partnerOrganizations: 8,
  hoursOfInstruction: 380,
  lastUpdated: '2026-10-15',
  isPilotDemonstration: true
};

export const sampleApplications: StudentApplication[] = [
  {
    id: 'app-stu-101',
    referenceNumber: 'FM-STU-26-4891',
    createdAt: '2026-10-12T14:20:00Z',
    status: 'pending',
    preferredName: 'Jordan K.',
    ageRange: 'ages-13-15',
    gradeLevel: 'Grade 9',
    priorExperience: 'beginner',
    programPreference: 'Python Foundations',
    accessibilityNeeds: 'Prefers high-contrast code examples and subtitles on all videos.',
    guardianName: 'Alex K.',
    guardianEmail: 'alex.k.parent@example.com',
    guardianPhoneOptional: '+1-555-0192',
    guardianConsentProvided: true,
    guardianConsentVerifiedAt: '2026-10-12T14:20:00Z',
    reviewNotes: 'Strong fit for Python Foundations virtual cohort.'
  },
  {
    id: 'app-stu-102',
    referenceNumber: 'FM-STU-26-5120',
    createdAt: '2026-10-14T09:15:00Z',
    status: 'under_review',
    preferredName: 'Elena P.',
    ageRange: 'ages-9-12',
    gradeLevel: 'Grade 6',
    priorExperience: 'none',
    programPreference: 'AI Explorers',
    guardianName: 'Sofia P.',
    guardianEmail: 'sofia.parent@example.com',
    guardianConsentProvided: true,
    guardianConsentVerifiedAt: '2026-10-14T09:15:00Z',
    reviewNotes: 'Verify cohort timing works for parent schedule.'
  }
];

export const sampleVolunteerApplications: VolunteerApplication[] = [
  {
    id: 'app-vol-201',
    referenceNumber: 'FM-VOL-26-8802',
    createdAt: '2026-10-11T16:45:00Z',
    status: 'under_review',
    fullName: 'Samantha Chen',
    email: 'samantha.chen@university.edu',
    cityCountry: 'Toronto, Canada',
    preferredRole: 'instructor',
    skills: ['Python', 'Machine Learning', 'Teaching / Tutoring'],
    subjectsCanTeach: ['Python Foundations', 'AI Explorers'],
    weeklyAvailabilityHours: 4,
    motivation: 'I am a 3rd-year CS student passionate about demystifying artificial intelligence for young students who do not have computer science programs in their schools.',
    relevantExperience: '2 years tutoring high school math and Python workshop volunteer for local youth library.',
    agreedToCodeOfConduct: true,
    backgroundCheckVerified: false,
    reviewNotes: 'Schedule screening interview for virtual instructor role.'
  }
];
