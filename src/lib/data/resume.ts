// Resume data structure - 只需維護這份資料，網頁和 PDF 會自動同步

export interface ResumeData {
  name: string;
  contact: {
    location?: string;
    phone?: string;
    email?: string;
    github?: string;
    linkedin?: string;
  };
  summary?: string;
  education: {
    degree: string;
    date: string;
    school: string;
  }[];
  experience: {
    title: string;
    period: string;
    company: string;
    highlights: string[];
  }[];
  skills: string[];
}

export const resumeData: ResumeData = {
  name: 'Your Name',
  contact: {
    location: 'Taipei, Taiwan',
    phone: '0912-345-678',
    email: 'your.email@example.com',
    github: 'github.com/yourusername',
  },
  summary: 'Experienced software engineer with expertise in web development and system design.',
  education: [
    {
      degree: "Bachelor's in Computer Science",
      date: 'June 2020',
      school: 'National Taiwan University',
    },
  ],
  experience: [
    {
      title: 'Software Engineer',
      period: 'Jan 2022 - Present',
      company: 'Tech Company - Taipei, Taiwan',
      highlights: [
        'Developed and maintained web applications using modern frameworks',
        'Improved system performance by 30%',
        'Collaborated with cross-functional teams',
      ],
    },
    {
      title: 'Junior Developer',
      period: 'Jul 2020 - Dec 2021',
      company: 'Startup Inc. - Taipei, Taiwan',
      highlights: [
        'Built RESTful APIs and database schemas',
        'Participated in code reviews and agile development',
      ],
    },
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'Svelte',
    'Node.js',
    'Go',
    'SQL',
    'Git',
    'Docker',
  ],
};
