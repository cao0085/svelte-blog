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
  objective?: string;
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
  name: 'Tony Ko',
  contact: {
    location: 'New Taipei, Taiwan',
    email: 'codeing0085@gmail.com',
    github: 'github.com/cao0085',
  },
  summary: 'Full-Stack engineer comfortable working independently or following team coding standards to maintain existing systems. Adaptable to different tech stacks based on project needs (C# .Net, Golang Gin, Angular, React, Vue). Currently exploring high-concurrency and distributed systems.',
  objective: 'Seeking a Full-Stack / Backend Developer role with opportunities to work on challenging technical problems and grow with the team.',
  education: [
    {
      degree: "Department of International Business",
      date: 'June 2020',
      school: 'China University of Technology',
    },
    {
      degree: "TOEIC Listening & Reading",
      date: 'June 2023',
      school: '735/990',
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
      title: 'Software Solution Sales',
      period: 'Apr 2023 - Sep 2023',
      company: 'Tech Company - Taipei, Taiwan',
      highlights: [
        'Sold PCB design solutions to major electronics manufacturers in Taiwan',
        'Ranked 2nd in client appointments and cold outreach within the team',
        'Coordinated cross-departmental collaboration to deliver technical proposals',
      ],
    },
    {
      title: 'Project Manager',
      period: 'Apr 2021 - Sep 2022',
      company: 'Textile Inc. - Taipei, Taiwan',
      highlights: [
        'Managed garment sampling, cost analysis, and production scheduling',
        'Coordinated material procurement, shipment arrangements, and quality issues',
        'Handled projects for FILA, Nautica, Jeep, and government contracts',
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
