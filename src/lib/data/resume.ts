// Resume data structure - 提供給頁面與 PDF 產生器共用
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
  objective?: string;
  sideprojects: {
    title: string;
    link: string;
    highlights: string[];
  }[];
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
  skills: { category: string; items: string[] }[];
  lastUpdate: string;
}

export const resumeData: ResumeData = {
  name: 'Tony Ko',
  contact: {
    location: 'New Taipei, Taiwan',
    email: 'codeing0085@gmail.com',
    github: 'github.com/cao0085',
  },
  summary:
    'Full-stack engineer who ships, whether solo or embedded in a team. Built and maintained production systems across C#, Go, Angular, and Vue, picking up whatever the project demands. Now exploring system design and AI applications, looking for work that is interesting enough to keep me up.',
  objective:
    'Seeking a Full-Stack / Backend Developer role with opportunities to work on challenging technical problems and grow with the team.',
  education: [
    {
      degree: 'Department of International Business',
      date: 'June 2020',
      school: 'China University of Technology',
    },
    {
      degree: 'TOEIC Listening & Reading',
      date: 'June 2023',
      school: '735/990',
    },
  ],
  sideprojects: [
    {
      title: 'Claude Code Automation',
      link: '',
      highlights: [
        'A personal Claude Code skill library for automating repetitive development workflows.',
        'Includes project-specific DDD scaffolding chains and a phase-driven automation bot.',
        'Configured hooks for permission control, command blocking, and task notifications.',
      ],
    },
    {
      title: 'Golang-high-concurrency',
      link: 'https://github.com/cao0085/go-ddd-high-concurrency',
      highlights: [
        'Architected scalable services using Gin and Domain-Driven Design principles.',
        'Optimized data management and caching with PostgreSQL and Redis.',
        'Implemented RabbitMQ for messaging and Prometheus for system monitoring.',
      ],
    },
    {
      title: 'Angular20 ERP System',
      link: 'https://github.com/cao0085/angular-20',
      highlights: [
        'Developed an Angular 20 ERP system featuring Standalone Components and Signals-based reactivity.',
        'Designed a comprehensive RBAC system for secure, granular permission management across enterprise workflows.',
      ],
    },
    {
      title: 'C#.NET Domain-Driven Design',
      link: 'https://github.com/cao0085/CleanDDD',
      highlights: [
        'Implemented Clean Architecture and DDD patterns with C#.NET to ensure system scalability.',
        'Explored Bounded Contexts and Aggregates to define clear domain boundaries and business logic separation.',
      ],
    },
  ],
  experience: [
    {
      title: 'Full-Stack Software Engineer',
      period: 'Apr 2025 - Present',
      company: 'Parking Management Company - Taipei, Taiwan',
      highlights: [
        'Designed parking management system architecture and developed core features',
        'Integrated external payment systems (POS, online payment gateways)',
        'Developed data transformation tools for government platform compliance',
      ],
    },
    {
      title: 'Project Manager & Software Sales',
      period: 'Apr 2021 - Sep 2023',
      company: 'Textile Inc. / Tech Company - Taipei, Taiwan',
      highlights: [
        'Managed end-to-end garment production for clients including FILA, Nautica, and Jeep.',
        'Sold PCB design solutions to major electronics manufacturers in Taiwan.',
        'Coordinated cross-functional teams to deliver technical proposals and client projects.',
      ],
    },
  ],
  skills: [
    {
      category: 'Development',
      items: [
        'C#',
        'Go',
        'SQL Server',
        'PostgreSQL',
        'EF Core',
        'Redis',
        'RabbitMQ',
        'Angular',
        'Vue',
      ],
    },
    {
      category: 'Infrastructure',
      items: ['GitLab CI/CD', 'Docker', 'GCP (Compute Engine)', 'Vim', 'tmux'],
    },
  ],
  lastUpdate: '2026-04-01',
};
