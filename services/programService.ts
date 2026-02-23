import { Program } from '../types';
import { PROGRAMS as DEFAULT_PROGRAMS } from '../constants';

const STORAGE_KEY = 'astrovisa_programs';

export const getPrograms = (): Program[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initialize with default programs if empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRAMS));
    return DEFAULT_PROGRAMS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse programs", e);
    return DEFAULT_PROGRAMS;
  }
};

export const saveProgram = (program: Program): void => {
  const programs = getPrograms();
  const index = programs.findIndex(p => p.id === program.id);
  
  if (index >= 0) {
    programs[index] = program;
  } else {
    programs.push(program);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
  // Dispatch a custom event so the app knows to update
  window.dispatchEvent(new Event('programsUpdated'));
};

export const deleteProgram = (id: string): void => {
  const programs = getPrograms();
  const filtered = programs.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new Event('programsUpdated'));
};

// Helper to create a blank program
export const createEmptyProgram = (): Program => ({
  id: Date.now().toString(),
  slug: '',
  flag: '',
  country: { fr: '', en: '', ar: '' },
  title: { fr: '', en: '', ar: '' },
  shortDescription: { fr: '', en: '', ar: '' },
  longDescription: { fr: '', en: '', ar: '' },
  image: '',
  deadline: '',
  timeline: [],
  benefits: { fr: [], en: [], ar: [] },
  details: {
    overview: { fr: '', en: '', ar: '' },
    eligibility: { fr: [], en: [], ar: [] },
    documents: { fr: [], en: [], ar: [] }
  },
  faqs: []
});
