export type Language = 'fr' | 'en' | 'ar';

export interface FAQ {
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export interface Testimonial {
  id: string;
  name: string;
  role: Record<Language, string>;
  content: Record<Language, string>;
  image: string;
}

export interface TimelineStep {
  title: Record<Language, string>;
  description?: Record<Language, string>;
  date?: string;
}

export interface SpecialtyCategory {
  name: Record<Language, string>;
  items: Record<Language, string[]>;
  icon: string;
}

export interface Program {
  id: string;
  slug: string;
  flag: string; // Emoji flag or image url
  country: Record<Language, string>;
  title: Record<Language, string>;
  shortDescription: Record<Language, string>;
  longDescription: Record<Language, string>;
  image: string;
  deadline: string;
  
  // Specific details
  cost?: Record<Language, string>;
  languageRequirement?: Record<Language, string>;
  ageRequirement?: Record<Language, string>;
  
  // Critical warnings (e.g., Referees)
  importantNote?: {
    icon: string;
    text: Record<Language, string>;
    variant: 'warning' | 'info';
  };

  timeline: TimelineStep[];
  
  // Benefits list
  benefits: Record<Language, string[]>;

  // For Parcoursup specifically
  specialties?: SpecialtyCategory[];
  
  details: {
    overview: Record<Language, string>;
    eligibility: Record<Language, string[]>;
    documents: Record<Language, string[]>;
  };
  faqs: FAQ[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  programInterest: string;
  message: string;
  createdAt: string;
}

export interface Translation {
  nav_home: string;
  nav_programs: string;
  nav_about: string;
  nav_contact: string;
  hero_title: string;
  hero_subtitle: string;
  cta_explore: string;
  cta_whatsapp: string;
  stats_students: string;
  stats_visas: string;
  stats_satisfaction: string;
  why_title: string;
  why_mentoring: string;
  why_strategy: string;
  why_files: string;
  why_visa: string;
  programs_title: string;
  form_title: string;
  form_name: string;
  form_email: string;
  form_phone: string;
  form_country: string;
  form_program: string;
  form_message: string;
  form_submit: string;
  form_success: string;
  footer_rights: string;
  apply_now: string;
  requirements: string;
  eligibility: string;
  timeline: string;
  admin_login: string;
  admin_password: string;
  admin_dashboard: string;
  admin_no_leads: string;
  admin_export: string;
  process_title: string;
  process_step1: string;
  process_step1_desc: string;
  process_step2: string;
  process_step2_desc: string;
  process_step3: string;
  process_step3_desc: string;
  faq_title: string;
  testimonials_title: string;
  program_benefits: string;
  program_cost: string;
  program_deadline: string;
  program_specialties: string;
  view_details: string;
}