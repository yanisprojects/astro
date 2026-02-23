import { Lead } from '../types';

const STORAGE_KEY = 'astrovisa_leads';

export const saveLead = (leadData: Omit<Lead, 'id' | 'createdAt'>): boolean => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    const leads: Lead[] = existingData ? JSON.parse(existingData) : [];
    
    const newLead: Lead = {
      ...leadData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    leads.push(newLead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    return true;
  } catch (error) {
    console.error("Failed to save lead", error);
    return false;
  }
};

export const getLeads = (): Lead[] => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    return existingData ? JSON.parse(existingData) : [];
  } catch (error) {
    console.error("Failed to fetch leads", error);
    return [];
  }
};

export const deleteLead = (id: string): void => {
    try {
        const existingData = localStorage.getItem(STORAGE_KEY);
        if(!existingData) return;
        let leads: Lead[] = JSON.parse(existingData);
        leads = leads.filter(l => l.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch(error) {
        console.error("Failed to delete lead", error);
    }
}