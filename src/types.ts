export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'iot' | 'creative' | 'pdd' | 'programming' | 'design';
  description: string;
  extendedDescription: string;
  techStack: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  highlights: string[];
  featured?: boolean;
  role: string;
  year: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Organisasi' | 'Proyek Sekolah' | 'Praktikum Mandiri' | 'Volunteer';
  description: string[];
  skills: string[];
  image?: string;
}

export interface EducationEntry {
  institution: string;
  level: string;
  major: string;
  period: string;
  location: string;
  notes?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level?: string }[];
}

export interface ServicePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
}

export interface ProfileData {
  name: string;
  nim: string;
  prodi: string;
  university: string;
  kicker: string;
  headline: string;
  bio: string;
  avatar: string;
  location: string;
  phone: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  cvPdfUrl: string;
  activities: string[];
  services: ServicePillar[];
  stats: { label: string; value: string; detail: string }[];
  educationHistory: EducationEntry[];
  skills: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  callToAction: string;
}
