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
    'Full-stack engineer who works well solo or in a team, with a solid grasp of business system logic, and enjoys connecting ideas across domains. Learns whatever the project needs.',
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
      title: 'Audio Plugins',
      link: 'https://qingtandsp.com',
      highlights: [
        'Combined music domain expertise with software engineering to create a commercial audio plugin line.',
        'Defined and delivered one integrated product system spanning DSP, UI, licensing, payment, and release.',
        'Directed AI to fill expertise gaps (e.g., 3D, mathematics) while owning final decisions.',
      ],
    },
    {
      title: 'Claude Code Automation',
      link: '',
      highlights: [
        'Built skill-driven Claude Code bots to automate and improve recurring development work.',
        'Encoded team conventions into scaffolding skills for consistent code generation.',
        'Configured hooks for permission control, command blocking, and task notifications.',
      ],
    },
    {
      title: 'Backend Service Integration',
      link: 'https://github.com/cao0085/go-ddd-high-concurrency',
      highlights: [
        'Built a Go backend service with PostgreSQL, Redis, RabbitMQ, and Prometheus.',
        'Implemented asynchronous workflows with RabbitMQ to decouple services.',
        'Added Prometheus metrics to track request latency, throughput, and error rates.',
      ],
    },
    {
      title: 'ERP Architecture & Domain Modeling',
      link: 'https://github.com/cao0085/CleanDDD',
      highlights: [
        'Built a full-stack ERP system (Angular, .NET) using Clean Architecture and DDD.',
        'Split the system into bounded contexts with aggregates enforcing business rules.',
        'Designed role-based access control (RBAC) to manage permissions across ERP workflows.'
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
      items: ['C#', 'Go', 'Angular', 'Vue', 'React', 'EF Core', 'C++'],
    },
    {
      category: 'Data & Messaging',
      items: ['PostgreSQL', 'SQL Server', 'Redis', 'RabbitMQ'],
    },
    {
      category: 'Infrastructure & Tools',
      items: ['Docker', 'GitLab CI/CD', 'GCP', 'Prometheus', 'Vim', 'tmux'],
    },
  ],
  lastUpdate: '2026-11-01',
};
